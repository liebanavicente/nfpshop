"use client";

import { useSyncExternalStore } from "react";

// ¿El visitante ha pedido «reducir movimiento»? Se lee del sistema y se actualiza si lo cambia.
const consulta = "(prefers-reduced-motion: reduce)";

function suscribir(aviso: () => void) {
  const m = window.matchMedia(consulta);
  m.addEventListener("change", aviso);
  return () => m.removeEventListener("change", aviso);
}

export function useMovimientoReducido() {
  return useSyncExternalStore(suscribir, () => window.matchMedia(consulta).matches, () => false);
}
