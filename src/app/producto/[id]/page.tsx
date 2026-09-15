import { notFound } from "next/navigation";
import { getDesign } from "@/lib/products";
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

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <VariantPicker design={design} />
    </main>
  );
}
