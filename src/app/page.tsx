import Hero from "@/app/components/landing/hero";
import Lookbook from "@/app/components/landing/lookbook";
import Collections from "@/app/components/landing/collections";
import ProductsPreview from "@/app/components/landing/products-preview";
import Music from "@/app/components/landing/music";
import ShippingReturns from "@/app/components/landing/shipping-returns";
import Directo from "@/app/components/landing/directo";
import PasaPorCaja from "@/app/components/landing/pasa-por-caja";
import CarritoViajero from "@/app/components/landing/carrito-viajero";

// La portada va en papel («fotocopia», ver globals.css); el resto de la tienda mantiene su tema.
export default function Home() {
  return (
    <main className="fotocopia">
      {/* tinta azul: luminancia → del azul del disco (#1b5a86) al papel (#efe9dc), con contraste de fotocopiadora */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <filter id="tinta-azul" colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.7" intercept="-0.32" />
            <feFuncG type="linear" slope="1.7" intercept="-0.32" />
            <feFuncB type="linear" slope="1.7" intercept="-0.32" />
          </feComponentTransfer>
          <feColorMatrix
            type="matrix"
            values="0.249 0.490 0.091 0 0.106  0.168 0.331 0.062 0 0.353  0.101 0.199 0.037 0 0.525  0 0 0 1 0"
          />
        </filter>
      </svg>
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
