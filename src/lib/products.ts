export type Category = "camiseta" | "funda-iphone";

export interface Variant {
  id: string;
  label: string;
  priceCents: number;
  currency: string;
  imageUrl: string;
  /** productUid real del catálogo de Gelato (verificado vía API). */
  gelatoProductUid: string;
}

export interface Design {
  slug: string;
  name: string;
  description: string;
  category: Category;
  variants: Variant[];
}

const TEE_SIZES = ["s", "m", "l", "xl"] as const;
const TEE_COLORS = [
  { id: "white", label: "Blanca" },
  { id: "black", label: "Negra" },
] as const;

// Bella+Canvas 3001u, unisex, cuello redondo, estampado solo frontal (4-0).
// Confirmado contra la API real de catálogo de Gelato.
function teeProductUid(color: "white" | "black", size: (typeof TEE_SIZES)[number]) {
  return `apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_prm_gsi_${size}_gco_${color}_gpr_4-0_bella-and-canvas_3001u`;
}

function teeVariants(imageByColor: { white: string; black: string }): Variant[] {
  return TEE_COLORS.flatMap(({ id: color, label: colorLabel }) =>
    TEE_SIZES.map((size) => ({
      id: `${color}-${size}`,
      label: `${colorLabel} / ${size.toUpperCase()}`,
      priceCents: 2490,
      currency: "eur",
      imageUrl: imageByColor[color],
      gelatoProductUid: teeProductUid(color, size),
    })),
  );
}

const IPHONE_MODELS = [
  { id: "iphone-16", label: "iPhone 16" },
  { id: "iphone-16plus", label: "iPhone 16 Plus" },
  { id: "iphone-16pro", label: "iPhone 16 Pro" },
  { id: "iphone-16promax", label: "iPhone 16 Pro Max" },
] as const;

// Funda "tough" (doble capa, más protectora), impresión wrap a sangre completa.
// Confirmado contra la API real de catálogo de Gelato. Nota: el iPhone 17 aún
// no está en el catálogo de Gelato a fecha de hoy; estos son los más recientes disponibles.
function caseVariants(imageUrl: string): Variant[] {
  return IPHONE_MODELS.map(({ id: model, label }) => ({
    id: model,
    label,
    priceCents: 1990,
    currency: "eur",
    imageUrl,
    gelatoProductUid: `phonecase_apple_${model}_tough_white_glossy`,
  }));
}

export const designs: Design[] = [
  {
    slug: "delfin-bandera",
    name: "Delfín y bandera",
    description: "Diseño ilustrado de delfín con bandera, estampado frontal. Dolphins and Earthquakes.",
    category: "camiseta",
    variants: teeVariants({
      white: "/products/dolphinflag.png",
      black: "/products/dolphinflag.png",
    }),
  },
  {
    slug: "delfin-guitarra",
    name: "Delfín guitarrista",
    description: "Delfín tocando la guitarra, estampado frontal. Dolphins and Earthquakes.",
    category: "camiseta",
    variants: teeVariants({
      white: "/products/dolphinpizza.png",
      black: "/products/dolphinpizza.png",
    }),
  },
  {
    slug: "delfin-skate",
    name: "Delfín skater",
    description: "Delfín sobre un skate, estampado frontal. Dolphins and Earthquakes.",
    category: "camiseta",
    variants: teeVariants({
      white: "/products/dolphinskate.png",
      black: "/products/dolphinskate.png",
    }),
  },
  {
    slug: "no-flag-patriots-sello",
    name: 'No Flag Patriots — sello',
    description: "Logo circular del disco, estampado frontal.",
    category: "camiseta",
    variants: teeVariants({
      white: "/products/logo1-black-ink.png",
      black: "/products/logo1-white-ink.png",
    }),
  },
  {
    slug: "no-flag-patriots-clasico",
    name: "No Flag Patriots — clásico",
    description: "Logo del disco en formato bandera, estampado frontal.",
    category: "camiseta",
    variants: teeVariants({
      white: "/products/logoclassic-white-shirt.png",
      black: "/products/logoclassic-black-shirt.png",
    }),
  },
  {
    slug: "funda-delfin-bandera",
    name: "Funda — Delfín y bandera",
    description: "Funda de iPhone con estampado a sangre completa. Dolphins and Earthquakes.",
    category: "funda-iphone",
    variants: caseVariants("/products/case-delfin-bandera.jpg"),
  },
  {
    slug: "funda-delfin-guitarra",
    name: "Funda — Delfín guitarrista",
    description: "Funda de iPhone con estampado a sangre completa. Dolphins and Earthquakes.",
    category: "funda-iphone",
    variants: caseVariants("/products/case-guitarra.jpg"),
  },
  {
    slug: "funda-delfin-skate",
    name: "Funda — Delfín skater",
    description: "Funda de iPhone con estampado a sangre completa. Dolphins and Earthquakes.",
    category: "funda-iphone",
    variants: caseVariants("/products/case-skate.jpg"),
  },
];

export function getDesign(slug: string): Design | undefined {
  return designs.find((d) => d.slug === slug);
}

export function getVariant(design: Design, variantId: string): Variant | undefined {
  return design.variants.find((v) => v.id === variantId);
}
