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

const primaryButton = "boton-tira justify-center";

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
      <main className="fotocopia flex-1">
        <div className="mx-auto w-full max-w-xl px-4 pb-24 pt-36 text-center">
          <h1 className="titular text-[clamp(2.2rem,7vw,4rem)]">
            <span className="tira">{t("cart.heading")}</span>
          </h1>
          <p className="mt-6 text-lg">{t("cart.empty")}</p>
          <Link href="/tienda" className={`mt-10 ${primaryButton}`}>
            {t("cart.seguirComprando")} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
    );
  }

  if (checkingOut) {
    return (
      <main className="fotocopia flex-1">
        <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-32">
          <h1 className="titular mb-10 text-[clamp(2.2rem,7vw,4rem)]">
            <span className="tira">{t("cart.heading")}</span>
          </h1>
          {/* Stripe pinta su propia tarjeta clara: la ficha de papel con canto de tinta la integra en la página */}
          <div className="ficha ficha-azul overflow-hidden p-2">
            <Checkout lines={lines} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="fotocopia flex-1">
      <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-32 sm:px-6">
      <h1 className="titular mb-12 text-[clamp(2.2rem,7vw,4rem)]">
        <span className="tira">{t("cart.heading")}</span>
      </h1>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          {resolved.map(({ line, design, variant }) => (
            <div
              key={`${line.designSlug}-${line.variantId}`}
              className="ficha flex flex-wrap items-center gap-4 p-3 sm:flex-nowrap sm:p-4"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden border-2 border-[var(--tinta)] bg-neutral-100">
                <Image src={variant.imageUrl} alt={design.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1 basis-[calc(100%-6rem)] sm:basis-auto">
                <p className="truncate font-[family-name:var(--font-display)] uppercase">{design.name}</p>
                <p className="text-sm text-[#4a443d]">{variant.label}</p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-[var(--azul)]">
                  {formatPrice(variant.priceCents, variant.currency)}
                </p>
              </div>
              <div className="contador">
                <button
                  type="button"
                  onClick={() => setQuantity(line.designSlug, line.variantId, line.quantity - 1)}
                  aria-label="-"
                >
                  −
                </button>
                <span>{line.quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(line.designSlug, line.variantId, line.quantity + 1)}
                  aria-label="+"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(line.designSlug, line.variantId)}
                className="text-sm underline decoration-2 underline-offset-4 hover:text-[var(--azul)]"
              >
                {t("cart.eliminar")}
              </button>
            </div>
          ))}
        </div>

        <aside className="ficha ficha-azul p-6 lg:sticky lg:top-28">
          <div className="flex items-center justify-between">
            <span className="etiqueta-maquina text-xs">{t("cart.subtotal")}</span>
            <span className="font-[family-name:var(--font-display)] text-3xl">
              {formatPrice(subtotalCents, currency)}
            </span>
          </div>
          <p className="mt-4 border-t-2 border-dashed border-[var(--tinta)] pt-4 text-sm text-[#4a443d]">{t("cart.envioNota")}</p>
          <button
            type="button"
            onClick={() => setCheckingOut(true)}
            className={`mt-7 w-full ${primaryButton}`}
          >
            {t("cart.finalizarCompra")}
          </button>
          <Link
            href="/tienda"
            className="mt-5 block text-center text-sm underline decoration-2 underline-offset-4 hover:text-[var(--azul)]"
          >
            {t("cart.seguirComprando")}
          </Link>
        </aside>
      </div>
      </div>
    </main>
  );
}
