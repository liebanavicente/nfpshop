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

const primaryButton =
  "rounded-full bg-white px-6 py-3.5 font-[family-name:var(--font-display)] uppercase tracking-widest text-black transition-shadow duration-200 hover:shadow-[0_0_32px_rgba(125,211,252,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300";

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
      <main className="mx-auto w-full max-w-xl px-4 pb-20 pt-32">
        <div className="glass rounded-3xl px-6 py-12 text-center">
          <h1 className="mb-4 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
            {t("cart.heading")}
          </h1>
          <p className="text-neutral-400">{t("cart.empty")}</p>
          <Link href="/tienda" className={`mt-8 inline-block ${primaryButton}`}>
            {t("cart.seguirComprando")}
          </Link>
        </div>
      </main>
    );
  }

  if (checkingOut) {
    return (
      <main className="mx-auto w-full max-w-2xl px-4 pb-20 pt-28">
        <h1 className="mb-6 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
          {t("cart.heading")}
        </h1>
        {/* Stripe renders its own light card; the glass frame ties it into the page. */}
        <div className="glass overflow-hidden rounded-3xl p-2">
          <div className="overflow-hidden rounded-2xl">
            <Checkout lines={lines} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-28 sm:px-6">
      <h1 className="mb-8 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
        {t("cart.heading")}
      </h1>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          {resolved.map(({ line, design, variant }) => (
            <div
              key={`${line.designSlug}-${line.variantId}`}
              className="glass flex flex-wrap items-center gap-4 rounded-3xl p-3 sm:flex-nowrap sm:p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                <Image src={variant.imageUrl} alt={design.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{design.name}</p>
                <p className="text-sm text-neutral-400">{variant.label}</p>
                <p className="mt-1 text-sm text-sky-300">
                  {formatPrice(variant.priceCents, variant.currency)}
                </p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(line.designSlug, line.variantId, line.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                  aria-label="-"
                >
                  −
                </button>
                <span className="w-6 text-center text-white">{line.quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(line.designSlug, line.variantId, line.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
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

        <aside className="glass rounded-3xl p-6 lg:sticky lg:top-28">
          <div className="flex items-center justify-between">
            <span className="text-neutral-300">{t("cart.subtotal")}</span>
            <span className="text-2xl font-semibold text-white">
              {formatPrice(subtotalCents, currency)}
            </span>
          </div>
          <p className="mt-3 text-sm text-neutral-400">{t("cart.envioNota")}</p>
          <button
            type="button"
            onClick={() => setCheckingOut(true)}
            className={`mt-6 w-full ${primaryButton}`}
          >
            {t("cart.finalizarCompra")}
          </button>
          <Link
            href="/tienda"
            className="mt-4 block text-center text-sm text-neutral-400 transition-colors hover:text-white"
          >
            {t("cart.seguirComprando")}
          </Link>
        </aside>
      </div>
    </main>
  );
}
