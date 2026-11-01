import { notFound } from "next/navigation";
import { getDesign } from "@/lib/products";
import { leerStock, skuDe } from "@/lib/stock";
import VariantPicker from "@/app/components/variant-picker";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const design = getDesign(id);
  if (!design) {
    notFound();
  }

  // Edición limitada: cuántas quedan de cada talla, leído en cada visita.
  let existencias: Record<string, number> | undefined;
  if (design.stock) {
    const porSku = await leerStock(design.variants.map((v) => skuDe(design.slug, v.id)));
    existencias = Object.fromEntries(design.variants.map((v) => [v.id, porSku[skuDe(design.slug, v.id)] ?? 0]));
  }

  return (
    <main className="fotocopia flex-1">
      <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-32 sm:px-6">
        <VariantPicker design={design} existencias={existencias} />
      </div>
    </main>
  );
}
