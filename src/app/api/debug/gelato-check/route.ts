import { NextResponse } from "next/server";

// TEMPORARY: verifies GELATO_API_KEY authenticates against Gelato's API,
// without exposing the key or creating any order. Delete after checking.
export async function GET() {
  const apiKey = process.env.GELATO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, reason: "missing_key" });
  }

  const response = await fetch("https://order.gelatoapis.com/v4/orders?limit=1", {
    headers: { "X-API-KEY": apiKey },
  });

  const status = response.status;
  const ok = response.ok;
  let bodyPreview: string | undefined;
  if (!ok) {
    bodyPreview = (await response.text()).slice(0, 300);
  }

  return NextResponse.json({ ok, status, bodyPreview });
}
