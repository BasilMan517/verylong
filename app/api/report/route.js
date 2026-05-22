import { analyzeAnswers, createCaseId, findBestTwin, seededTwins } from "@/lib/doom";
import { supabaseRequest } from "@/lib/supabase-rest";

export async function POST(request) {
  const payload = await request.json();
  const answers = payload.answers || {};
  const alias = sanitizeAlias(payload.alias);
  const caseId = createCaseId();
  const profile = analyzeAnswers(answers);

  const recent = await supabaseRequest(
    "profiles?select=case_id,alias,tags,public_health_tags,archetype&order=created_at.desc&limit=80",
    { method: "GET" },
  );
  const candidates = recent.ok && Array.isArray(recent.data) && recent.data.length ? recent.data : seededTwins;
  const twin = findBestTwin(profile, candidates);

  const record = {
    case_id: caseId,
    alias,
    answers,
    scores: profile.scores,
    tags: profile.tags,
    public_health_tags: profile.publicHealthTags,
    archetype: profile.archetype,
    cause: profile.cause,
    estimated_age: profile.estimatedAge,
    report: profile.report,
  };

  const saved = await supabaseRequest("profiles", {
    method: "POST",
    prefer: "return=representation",
    body: JSON.stringify(record),
  });

  return Response.json({
    saved: saved.ok,
    caseId,
    alias,
    profile,
    twin,
  });
}

function sanitizeAlias(value) {
  const cleaned = String(value || "").trim().slice(0, 24);
  return cleaned || `匿名档案员 #${Math.floor(1000 + Math.random() * 9000)}`;
}
