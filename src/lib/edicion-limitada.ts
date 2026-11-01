// Camiseta edición limitada del bolo con Not Available (Paral·lel 62, 24/10/2026).
// A diferencia del resto de la tienda, NO es bajo pedido: es stock físico que envía la banda.
//
// Está apagada hasta que se active con NEXT_PUBLIC_EDICION_LIMITADA=1 en Vercel.
// Antes de activarla en producción hay que rellenar lo marcado como PENDIENTE y tener el
// inventario en Supabase (supabase/stock.sql); sin Supabase, en producción sale como agotada.
export const EDICION_P62 = {
  activa: process.env.NEXT_PUBLIC_EDICION_LIMITADA === "1",
  slug: "edicion-limitada-p62",
  precioCents: 2000, // PENDIENTE: precio real
  tallas: ["S", "M", "L", "XL", "XXL"], // PENDIENTE: tallas reales
  // Solo para la vista previa (sin Supabase): unidades ficticias por talla.
  stockDemo: 10,
  envio: {
    correosCents: 500, // PENDIENTE: precio del envío por Correos
    recogidaBarcelona: true, // PENDIENTE: confirmar que se ofrece
    paises: ["ES"] as const, // PENDIENTE: ¿solo España?
  },
} as const;

/** Mensaje con el que falla el pago cuando una talla de la edición limitada se ha agotado. */
export const AGOTADA = "AGOTADA";
