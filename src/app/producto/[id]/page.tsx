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
    <main className="fotocopia flex-1">
      <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-32 sm:px-6">
        <VariantPicker design={design} />
      </div>
    </main>
  );
}
