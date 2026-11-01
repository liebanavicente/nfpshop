import Hero from "@/app/components/landing/hero";
import Lookbook from "@/app/components/landing/lookbook";
import Collections from "@/app/components/landing/collections";
import ProductsPreview from "@/app/components/landing/products-preview";
import Music from "@/app/components/landing/music";
import ShippingReturns from "@/app/components/landing/shipping-returns";
import Directo from "@/app/components/landing/directo";
import PasaPorCaja from "@/app/components/landing/pasa-por-caja";
import CarritoViajero from "@/app/components/landing/carrito-viajero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Lookbook />
      <Directo />
      <Collections />
      <ProductsPreview />
      <Music />
      <ShippingReturns />
      <PasaPorCaja />
      <CarritoViajero />
    </main>
  );
}
