import { NextResponse } from "next/server";

// TEMPORARY: explores Gelato's Product Catalog API using the stored key.
// Not a secret endpoint (catalog data is public product info), but delete
// after investigation to keep the route surface clean.
async function proxy(request: Request, method: string) {
  const apiKey = process.env.GELATO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, reason: "missing_key" });
  }

  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") ?? "/v3/catalogs";
  const base = "https://product.gelatoapis.com";

  const res = await fetch(`${base}${path}`, {
    method,
    headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
    body: method === "POST" ? await request.text() : undefined,
  });

  const status = res.status;
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    body = await res.text();
  }

  return NextResponse.json({ status, body });
}

export async function GET(request: Request) {
  return proxy(request, "GET");
}

export async function POST(request: Request) {
  return proxy(request, "POST");
}
