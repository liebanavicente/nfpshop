"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart, resolveCartLines } from "@/lib/cart";
import { useLocale } from "@/lib/i18n";
import Checkout from "@/app/components/checkout";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(
    cents / 100,
  );
}

export default function CarritoPage() {
  const { t } = useLocale();
  const { lines, removeItem, setQuantity } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  const resolved = resolveCartLines(lines);
  const subtotalCents = resolved.reduce(
    (sum, { variant, line }) => sum + variant.priceCents * line.quantity,
    0,
  );
  const currency = resolved[0]?.variant.currency ?? "eur";

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 text-center">
        <h1 className="mb-4 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
          {t("cart.heading")}
        </h1>
        <p className="text-neutral-400">{t("cart.empty")}</p>
        <Link
          href="/tienda"
          className="mt-6 inline-block border-2 border-white px-6 py-3 font-[family-name:var(--font-display)] uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
        >
          {t("cart.seguirComprando")}
        </Link>
      </main>
    );
  }

  if (checkingOut) {
    return (
      <main className="mx-auto max-w-2xl px-4 pb-20 pt-28">
        <h1 className="mb-6 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
          {t("cart.heading")}
        </h1>
        <Checkout lines={lines} />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-28">
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
        {t("cart.heading")}
      </h1>

      <div className="space-y-4">
        {resolved.map(({ line, design, variant }) => (
          <div
            key={`${line.designSlug}-${line.variantId}`}
            className="flex items-center gap-4 border border-white/10 bg-neutral-950 p-4"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-neutral-100">
              <Image src={variant.imageUrl} alt={design.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">{design.name}</p>
              <p className="text-sm text-neutral-400">{variant.label}</p>
              <p className="mt-1 text-sm text-sky-300">
                {formatPrice(variant.priceCents, variant.currency)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity(line.designSlug, line.variantId, line.quantity - 1)}
                className="flex h-8 w-8 items-center justify-center border border-white/20 text-white hover:border-sky-300/70"
                aria-label="-"
              >
                −
              </button>
              <span className="w-6 text-center text-white">{line.quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(line.designSlug, line.variantId, line.quantity + 1)}
                className="flex h-8 w-8 items-center justify-center border border-white/20 text-white hover:border-sky-300/70"
                aria-label="+"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeItem(line.designSlug, line.variantId)}
              className="nav-link text-sm text-neutral-400"
            >
              {t("cart.eliminar")}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="text-neutral-300">{t("cart.subtotal")}</span>
        <span className="text-xl font-semibold text-white">
          {formatPrice(subtotalCents, currency)}
        </span>
      </div>
      <p className="mt-2 text-sm text-neutral-500">{t("cart.envioNota")}</p>

      <button
        type="button"
        onClick={() => setCheckingOut(true)}
        className="mt-6 w-full border-2 border-white py-3 font-[family-name:var(--font-display)] uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
      >
        {t("cart.finalizarCompra")}
      </button>
    </main>
  );
}
