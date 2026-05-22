import { analyzeAnswers, createCaseId, findBestTwin, seededTwins } from "@/lib/doom";
import { supabaseRequest } from "@/lib/supabase-rest";

export async function POST(request) {
  const payload = await request.json();
  const answers = payload.answers || {};
  const alias = sanitizeAlias(payload.alias);
  const caseId = createCaseId();
  const profile = analyzeAnswers(answers);

  const aiReport = await generateReport(profile);
  if (aiReport) {
    profile.report.foreshadow = aiReport.foreshadow;
    profile.report.epitaph = aiReport.epitaph;
    profile.report.lastWords = aiReport.lastWords;
  }

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

async function generateReport(profile) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const prompt = `你是「升天档案局」的判官AI，负责给用户写一份黑色幽默的"结局报告"。

用户档案：
- 实际年龄：约${profile.userAge}岁
- 原型：${profile.archetype}
- 预计结局年龄：${profile.estimatedAge}岁（还剩约${profile.report.yearsLeft}年）
- 主要原因：${profile.cause}
- 标签：${profile.tags.join("、")}
- 风险维度得分：${JSON.stringify(profile.scores)}

请根据以上信息生成三段文案，风格要求：黑色幽默、毒舌但不冒犯、像一份正经公文里混入了段子。中文，不要用emoji。

返回严格JSON格式（不要markdown代码块）：
{
  "foreshadow": "病程伏笔，2-3句话，描述这个人的生活习惯如何像慢性bug一样积累，用比喻和夸张",
  "epitaph": "墓志铭草稿，1句话，像是写在墓碑上的一句毒鸡汤",
  "lastWords": "最后一句话，1句简短的话，像是这个人临终前最可能说的一句口头禅"
}`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 400,
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) return null;

    const cleaned = text.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

function sanitizeAlias(value) {
  const cleaned = String(value || "").trim().slice(0, 24);
  return cleaned || `匿名档案员 #${Math.floor(1000 + Math.random() * 9000)}`;
}
