import Hero from "@/app/components/landing/hero";
import Lookbook from "@/app/components/landing/lookbook";
import Collections from "@/app/components/landing/collections";
import ProductsPreview from "@/app/components/landing/products-preview";
import Music from "@/app/components/landing/music";
import ShippingReturns from "@/app/components/landing/shipping-returns";

export default function Home() {
  return (
    <main>
      <Hero />
      <Lookbook />
      <Collections />
      <ProductsPreview />
      <Music />
      <ShippingReturns />
    </main>
  );
}
