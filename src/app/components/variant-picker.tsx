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
        onChange={(e) => {
          setVariantId(e.target.value);
          setAdded(false);
        }}
      >
        {design.variants.map((v) => (
          <option key={v.id} value={v.id}>
            {v.label}
          </option>
        ))}
      </select>

      <label className="mb-2 mt-6 block text-sm font-medium text-neutral-300">
        {t("product.cantidad")}
      </label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setQuantity((q) => Math.max(1, q - 1));
            setAdded(false);
          }}
          className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-sky-300/70"
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
          className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-sky-300/70"
          aria-label="+"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-6 w-full border-2 border-white py-3 font-[family-name:var(--font-display)] uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
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
  );
}
