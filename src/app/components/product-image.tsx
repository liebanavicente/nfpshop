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
  // Tee artwork is a transparent PNG (ink only) — the swatch behind it must
  // match the garment color or dark-ink art disappears on a dark card and
  // light-ink art disappears on a light one.
  const swatchBg =
    design.category === "camiseta"
      ? variant.id.startsWith("black")
        ? "bg-neutral-950"
        : "bg-neutral-100"
      : "bg-neutral-900";

  return (
    <div className={`group relative aspect-square overflow-hidden ${swatchBg}`}>
      <Image
        src={variant.imageUrl}
        alt={design.name}
        fill
        className="object-cover transition-opacity duration-300 ease-out group-hover:opacity-0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-neutral-950 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
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
    </div>
  );
}
