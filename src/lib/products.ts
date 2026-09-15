export interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  imageUrl: string;
  /** The product UID from your Gelato dashboard (Products → this product → API). */
  gelatoProductUid: string;
}

// TODO: reemplaza estos productos de ejemplo por los tuyos.
// El `gelatoStoreProductUid` lo encuentras en el dashboard de Gelato,
// dentro de cada producto ya creado (pestaña "API" o similar).
export const products: Product[] = [
  {
    id: "camiseta-clasica",
    name: "Camiseta clásica",
    description: "Camiseta de algodón con estampado a medida.",
    priceCents: 2200,
    currency: "eur",
    imageUrl: "/products/placeholder.svg",
    gelatoProductUid: "REPLACE_WITH_REAL_UID",
  },
  {
    id: "taza-ceramica",
    name: "Taza de cerámica",
    description: "Taza de cerámica blanca, apta para microondas.",
    priceCents: 1400,
    currency: "eur",
    imageUrl: "/products/placeholder.svg",
    gelatoProductUid: "REPLACE_WITH_REAL_UID",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
