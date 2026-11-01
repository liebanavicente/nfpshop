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

export default function VariantPicker({
  design,
  existencias,
}: {
  design: Design;
  /** Solo en productos de stock propio: unidades que quedan por variante. */
  existencias?: Record<string, number>;
}) {
  const { t } = useLocale();
  const { addItem } = useCart();
  const quedan = (id: string) => (existencias ? (existencias[id] ?? 0) : Infinity);
  const primera = design.variants.find((v) => quedan(v.id) > 0) ?? design.variants[0];
  const [variantId, setVariantId] = useState(primera.id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = design.variants.find((v) => v.id === variantId)!;
  const maximo = Math.min(9, quedan(variantId));
  const agotado = maximo <= 0;

  function handleAdd() {
    addItem(design.slug, variantId, quantity);
    setAdded(true);
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8">
      {/* la pieza pinchada en el papel, como en la mesa de merch */}
      <div className="relative rotate-[-1.2deg] bg-[#fbf8f1] p-3 shadow-[10px_10px_0_var(--tinta)]">
        <span aria-hidden="true" className="absolute -top-2 left-1/2 z-10 h-5 w-5 -translate-x-1/2 rounded-full bg-[var(--azul)] shadow-[1px_2px_0_var(--tinta)]" />
        <ProductImage design={design} variant={variant} />
      </div>

      <div className="ficha ficha-azul p-6 sm:p-8 md:sticky md:top-28">
        <h1 className="titular text-[clamp(1.9rem,4vw,2.75rem)]">
          <span className="tira">{design.name}</span>
        </h1>
        <p className="mt-5 leading-relaxed text-[#4a443d]">{design.description}</p>
        <p className="tira tira-azul mt-5 rotate-[-2deg] text-2xl">
          {formatPrice(variant.priceCents, variant.currency)}
        </p>

        <label className="etiqueta-maquina mb-2 mt-8 block text-xs">
          {design.category !== "funda-iphone" ? t("product.colorTalla") : t("product.modelo")}
        </label>
        <select
          className="selector"
          value={variantId}
          onChange={(e) => {
            setVariantId(e.target.value);
            setQuantity(1);
            setAdded(false);
          }}
        >
          {design.variants.map((v) => (
            <option key={v.id} value={v.id} disabled={quedan(v.id) <= 0}>
              {v.label}
              {quedan(v.id) <= 0 ? ` — ${t("product.agotada")}` : ""}
            </option>
          ))}
        </select>
        {existencias && !agotado && (
          <p className="mt-2 font-[family-name:var(--font-display)] text-sm text-[var(--azul)]">
            {t("product.quedan").replace("{n}", String(quedan(variantId)))}
          </p>
        )}

        <label className="etiqueta-maquina mb-2 mt-6 block text-xs">
          {t("product.cantidad")}
        </label>
        <div className="contador">
          <button
            type="button"
            onClick={() => {
              setQuantity((q) => Math.max(1, q - 1));
              setAdded(false);
            }}
            aria-label="-"
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={() => {
              setQuantity((q) => Math.min(maximo, q + 1));
              setAdded(false);
            }}
            aria-label="+"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={agotado}
          className="boton-tira mt-9 w-full justify-center text-base disabled:cursor-not-allowed disabled:opacity-40"
        >
          {agotado ? t("product.agotada") : t("product.añadirCarrito")}
        </button>
        {design.stock && <p className="mt-5 border-t-2 border-dashed border-[var(--tinta)] pt-4 text-sm leading-relaxed">{t("product.notaStock")}</p>}

        {added && (
          <p className="mt-5 text-center font-[family-name:var(--font-display)] text-sm">
            {t("product.añadido")} —{" "}
            <Link href="/carrito" className="underline decoration-2 underline-offset-4 hover:text-[var(--azul)]">
              {t("product.verCarrito")}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
