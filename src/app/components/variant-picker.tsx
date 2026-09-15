"use client";

import { useState } from "react";
import Checkout from "@/app/components/checkout";
import ProductImage from "@/app/components/product-image";
import { useLocale } from "@/lib/i18n";
import type { Design } from "@/lib/products";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(
    cents / 100,
  );
}

export default function VariantPicker({ design }: { design: Design }) {
  const { t } = useLocale();
  const [variantId, setVariantId] = useState(design.variants[0].id);
  const variant = design.variants.find((v) => v.id === variantId)!;

  return (
    <div>
      <div className="mb-6 overflow-hidden rounded-lg border border-white/10">
        <ProductImage design={design} variant={variant} />
      </div>

      <h1 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
        {design.name}
      </h1>
      <p className="mt-2 text-neutral-400">{design.description}</p>
      <p className="mt-4 text-xl font-semibold text-sky-300">
        {formatPrice(variant.priceCents, variant.currency)}
      </p>

      <label className="mb-2 mt-6 block text-sm font-medium text-neutral-300">
        {design.category === "camiseta" ? t("product.colorTalla") : t("product.modelo")}
      </label>
      <select
        className="w-full rounded-md border border-white/20 bg-neutral-900 px-3 py-2 text-white"
        value={variantId}
        onChange={(e) => setVariantId(e.target.value)}
      >
        {design.variants.map((v) => (
          <option key={v.id} value={v.id}>
            {v.label}
          </option>
        ))}
      </select>

      <div className="mt-8">
        <Checkout key={variantId} designSlug={design.slug} variantId={variantId} />
      </div>
    </div>
  );
}
