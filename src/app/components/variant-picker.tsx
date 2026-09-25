"use client";

import { useState } from "react";
import Link from "next/link";
import ProductImage from "@/app/components/product-image";
import { useLocale } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import type { Design } from "@/lib/products";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(
    cents / 100,
  );
}

export default function VariantPicker({ design }: { design: Design }) {
  const { t } = useLocale();
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(design.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = design.variants.find((v) => v.id === variantId)!;

  function handleAdd() {
    addItem(design.slug, variantId, quantity);
    setAdded(true);
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8">
      <div className="glass rounded-3xl p-2">
        <div className="overflow-hidden rounded-2xl">
          <ProductImage design={design} variant={variant} />
        </div>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-8 md:sticky md:top-28">
        <h1 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
          {design.name}
        </h1>
        <p className="mt-2 text-neutral-400">{design.description}</p>
        <p className="mt-4 text-2xl font-semibold text-sky-300">
          {formatPrice(variant.priceCents, variant.currency)}
        </p>

        <label className="mb-2 mt-6 block text-sm font-medium text-neutral-300">
          {design.category === "camiseta" ? t("product.colorTalla") : t("product.modelo")}
        </label>
        <select
          className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white transition-colors focus:border-sky-300/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/25"
          value={variantId}
          onChange={(e) => {
            setVariantId(e.target.value);
            setAdded(false);
          }}
        >
          {design.variants.map((v) => (
            <option key={v.id} value={v.id} className="bg-neutral-900">
              {v.label}
            </option>
          ))}
        </select>

        <label className="mb-2 mt-6 block text-sm font-medium text-neutral-300">
          {t("product.cantidad")}
        </label>
        <div className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => {
              setQuantity((q) => Math.max(1, q - 1));
              setAdded(false);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            aria-label="-"
          >
            −
          </button>
          <span className="w-8 text-center text-white">{quantity}</span>
          <button
            type="button"
            onClick={() => {
              setQuantity((q) => Math.min(9, q + 1));
              setAdded(false);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            aria-label="+"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="mt-8 w-full rounded-full bg-white py-3.5 font-[family-name:var(--font-display)] uppercase tracking-widest text-black transition-shadow duration-200 hover:shadow-[0_0_32px_rgba(125,211,252,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
        >
          {t("product.añadirCarrito")}
        </button>

        {added && (
          <p className="mt-4 text-center text-sm text-sky-300">
            {t("product.añadido")} —{" "}
            <Link href="/carrito" className="nav-link">
              {t("product.verCarrito")}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
