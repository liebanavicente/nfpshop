"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TshirtMockup, PhoneMockup } from "@/app/components/product-mockups";
import type { Design, Variant } from "@/lib/products";

export default function ProductImage({
  design,
  variant,
}: {
  design: Design;
  variant: Variant;
}) {
  const [canHover, setCanHover] = useState(true);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  // Tee artwork is a transparent PNG (ink only) — the swatch behind it must
  // match the garment color or dark-ink art disappears on a dark card and
  // light-ink art disappears on a light one.
  const swatchBg =
    design.category === "camiseta"
      ? variant.id.startsWith("black")
        ? "bg-neutral-950"
        : "bg-neutral-100"
      : "bg-neutral-900";

  // Devices without hover (touch) can't reveal the mockup by hovering, so a
  // tap toggles it instead — and must stop the tap reaching a wrapping <Link>.
  function handleClick(e: React.MouseEvent) {
    if (!canHover) {
      e.preventDefault();
      e.stopPropagation();
      setFlipped((v) => !v);
    }
  }

  return (
    <div
      className={`group relative aspect-square overflow-hidden ${swatchBg}`}
      onClick={handleClick}
    >
      <Image
        src={variant.imageUrl}
        alt={design.name}
        fill
        className={`object-cover transition-opacity duration-300 ease-out group-hover:opacity-0 ${
          flipped ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center bg-neutral-950 transition-opacity duration-300 ease-out group-hover:opacity-100 ${
          flipped ? "opacity-100" : "opacity-0"
        }`}
      >
        {design.category === "camiseta" ? (
          <TshirtMockup
            imageUrl={variant.imageUrl}
            color={variant.id.startsWith("black") ? "black" : "white"}
          />
        ) : (
          <PhoneMockup imageUrl={variant.imageUrl} />
        )}
      </div>
      {!canHover && (
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs text-white backdrop-blur-sm"
        >
          ⇄
        </span>
      )}
    </div>
  );
}
