"use client";

import { useState } from "react";
import Image from "next/image";
import Checkout from "@/app/components/checkout";
import type { Design } from "@/lib/products";

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(
    cents / 100,
  );
}

export default function VariantPicker({ design }: { design: Design }) {
  const [variantId, setVariantId] = useState(design.variants[0].id);
  const variant = design.variants.find((v) => v.id === variantId)!;

  return (
    <div>
      <div className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-6">
        <Image src={variant.imageUrl} alt={design.name} fill className="object-cover" />
      </div>

      <h1 className="text-2xl font-bold">{design.name}</h1>
      <p className="text-neutral-600 mt-2">{design.description}</p>
      <p className="text-xl font-semibold mt-4">
        {formatPrice(variant.priceCents, variant.currency)}
      </p>

      <label className="block mt-6 mb-2 text-sm font-medium">
        {design.category === "camiseta" ? "Color y talla" : "Modelo"}
      </label>
      <select
        className="w-full border border-neutral-300 rounded-md px-3 py-2"
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
