import { supabaseRequest } from "@/lib/supabase-rest";

export async function POST(request) {
  const { senderCaseId, senderAlias, receiverCaseId, receiverAlias, body } = await request.json();

  if (!senderCaseId || !receiverCaseId || !body?.trim()) {
    return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  if (body.trim().length > 200) {
    return Response.json({ ok: false, error: "Message too long" }, { status: 400 });
  }

  const result = await supabaseRequest("messages", {
    method: "POST",
    prefer: "return=representation",
    body: JSON.stringify({
      sender_case_id: senderCaseId,
      sender_alias: senderAlias,
      receiver_case_id: receiverCaseId,
      receiver_alias: receiverAlias,
      body: body.trim(),
    }),
  });

  return Response.json({ ok: result.ok, error: result.error });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const caseId = searchParams.get("caseId");

  if (!caseId) {
    return Response.json({ ok: false, error: "Missing caseId" }, { status: 400 });
  }

  const received = await supabaseRequest(
    `messages?receiver_case_id=eq.${caseId}&order=created_at.desc&limit=20`,
    { method: "GET" },
  );

  const sent = await supabaseRequest(
    `messages?sender_case_id=eq.${caseId}&order=created_at.desc&limit=20`,
    { method: "GET" },
  );

  return Response.json({
    ok: true,
    received: received.ok ? received.data : [],
    sent: sent.ok ? sent.data : [],
  });
}
