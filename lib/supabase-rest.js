export async function supabaseRequest(path, options = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return { ok: false, skipped: true, data: null, error: "Supabase env vars are not configured." };
  }

  const headers = {
    apikey: key,
    authorization: `Bearer ${key}`,
    "content-type": "application/json",
    ...(options.prefer ? { prefer: options.prefer } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    return { ok: false, data, error: data?.message || response.statusText };
  }

  return { ok: true, data, error: null };
}
