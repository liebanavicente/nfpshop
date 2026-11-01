import "server-only";

import { EDICION_P62 } from "@/lib/edicion-limitada";

// Inventario de los productos de stock propio (la edición limitada).
// Con SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY usa las tablas de supabase/stock.sql.
// Sin ellas, en la vista previa usa unidades ficticias en memoria; en producción no vende nada.

export type LineaStock = { sku: string; cantidad: number };

export const skuDe = (designSlug: string, variantId: string) => `${designSlug}:${variantId}`;

const url = process.env.SUPABASE_URL;
const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;
const conSupabase = Boolean(url && clave);
const enProduccion = process.env.VERCEL_ENV === "production";

async function supabase(ruta: string, init?: RequestInit) {
  const res = await fetch(`${url}/rest/v1/${ruta}`, {
    ...init,
    cache: "no-store",
    headers: { apikey: clave!, Authorization: `Bearer ${clave}`, "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) throw new Error(`Supabase ${ruta}: ${res.status} ${await res.text()}`);
  const texto = await res.text();
  return texto ? JSON.parse(texto) : null;
}
const rpc = (fn: string, args: object) => supabase(`rpc/${fn}`, { method: "POST", body: JSON.stringify(args) });

// --- modo demo (solo vista previa): no se comparte entre instancias, vale para enseñar el flujo ---
const demo = new Map<string, number>();
const reservasDemo = new Map<string, LineaStock[]>();
function cantidadDemo(sku: string) {
  if (!demo.has(sku)) demo.set(sku, enProduccion ? 0 : EDICION_P62.stockDemo);
  return demo.get(sku)!;
}

export async function leerStock(skus: string[]): Promise<Record<string, number>> {
  if (!conSupabase) return Object.fromEntries(skus.map((s) => [s, cantidadDemo(s)]));
  const filas: { sku: string; cantidad: number }[] = await supabase(
    `stock?select=sku,cantidad&sku=in.(${skus.map((s) => `"${s}"`).join(",")})`,
  );
  return Object.fromEntries(skus.map((s) => [s, filas.find((f) => f.sku === s)?.cantidad ?? 0]));
}

/** Reserva todo o nada para una sesión de pago. Devuelve false si alguna talla no llega. */
export async function reservarStock(sessionId: string, lineas: LineaStock[]): Promise<boolean> {
  if (conSupabase) return Boolean(await rpc("reservar_stock", { p_session: sessionId, p_items: lineas }));
  if (lineas.some((l) => cantidadDemo(l.sku) < l.cantidad)) return false;
  lineas.forEach((l) => demo.set(l.sku, cantidadDemo(l.sku) - l.cantidad));
  reservasDemo.set(sessionId, lineas);
  return true;
}

/** El pago caducó o se canceló: las unidades vuelven al stock. */
export async function liberarStock(sessionId: string) {
  if (conSupabase) return void (await rpc("liberar_stock", { p_session: sessionId }));
  reservasDemo.get(sessionId)?.forEach((l) => demo.set(l.sku, cantidadDemo(l.sku) + l.cantidad));
  reservasDemo.delete(sessionId);
}

/** El pago se completó: la reserva pasa a venta. */
export async function confirmarStock(sessionId: string) {
  if (conSupabase) return void (await rpc("confirmar_stock", { p_session: sessionId }));
  reservasDemo.delete(sessionId);
}
