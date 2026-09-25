"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Locale = "es" | "ca" | "en";

export const locales: { id: Locale; label: string; name: string }[] = [
  { id: "es", label: "ES", name: "Español" },
  { id: "ca", label: "CA", name: "Català" },
  { id: "en", label: "EN", name: "English" },
];

type Dict = Record<string, unknown>;

const dictionaries: Record<Locale, Dict> = {
  es: {
    nav: {
      colecciones: "Colecciones",
      productos: "Productos",
      envio: "Envío y devoluciones",
      tienda: "Tienda",
      carrito: "Carrito",
      idioma: "Idioma",
      abrirMenu: "Abrir menú",
      cerrarMenu: "Cerrar menú",
      musica: "Música",
      webOficial: "Web oficial",
    },
    hero: {
      eyebrow: "Nueva colección · Dolphins and Earthquakes",
      titleLine1: "No Flag Patriots.",
      titleLine2: "Merch oficial.",
      subtitle:
        "Camisetas y fundas con el arte de nuestro nuevo disco. Impresas bajo pedido y enviadas en un solo paquete.",
      ctaPrimary: "Comprar ahora",
      ctaSecondary: "Ver colecciones",
      imageAlt: "Delfín de No Flag Patriots montado en un carrito de la compra con la bandera XXX",
    },
    valueProps: {
      onDemand: "Impreso bajo pedido",
      onDemandBody: "Cada pieza se produce solo para ti.",
      oneShipment: "Un solo envío",
      oneShipmentBody: "Todo tu pedido llega en un paquete.",
      securePay: "Pago seguro",
      securePayBody: "Tarjeta, Klarna y más con Stripe.",
      euShipping: "Envío a la UE",
      euShippingBody: "España, Portugal, Francia, Italia y Alemania.",
    },
    music: {
      eyebrow: "Escucha el disco",
      heading: "Dolphins and Earthquakes",
      body: "El nuevo disco de No Flag Patriots, punk rock melódico desde Barcelona. Dale al play mientras eliges tu camiseta.",
      listenOn: "Escúchalo en",
      officialSite: "Visita la web oficial",
      playerTitle: "Reproductor de Spotify: Dolphins and Earthquakes",
    },
    collections: {
      heading: "Colecciones",
      camisetas: "Camisetas",
      fundas: "Fundas de iPhone",
    },
    products: {
      heading: "Productos",
      verTodo: "Ver todo",
    },
    shipping: {
      heading: "Envío y devoluciones",
      productionTitle: "Producción bajo demanda",
      productionBody:
        "Cada pedido se imprime especialmente para ti a través de nuestro partner de producción. Suele necesitar entre 2 y 5 días laborables antes de salir de fábrica.",
      shippingTitle: "Envío",
      shippingBody:
        "Los plazos varían según el destino — normalmente entre 3 y 10 días laborables adicionales dentro de la Unión Europea. Recibirás un email con el seguimiento en cuanto se despache.",
      returnsTitle: "Cambios y devoluciones",
      returnsBody:
        "Al ser productos personalizados hechos bajo pedido, no se aceptan devoluciones por cambio de opinión ni por talla. Si tu pedido llega dañado, defectuoso o con un error nuestro, escríbenos dentro de los 14 días siguientes a la entrega y lo solucionamos sin coste.",
      contact: "¿Dudas con tu pedido? Escríbenos a",
    },
    footer: {
      rights: "No Flag Patriots. Productos impresos bajo demanda.",
      listen: "Escucha",
      follow: "Síguenos",
      officialSite: "Web oficial",
    },
    tienda: {
      heading: "Nuestra tienda",
      subheading: "Productos personalizados, impresos y enviados bajo demanda.",
      camisetas: "Camisetas",
      fundas: "Fundas de iPhone",
      desde: "Desde",
    },
    product: {
      colorTalla: "Color y talla",
      modelo: "Modelo",
      cantidad: "Cantidad",
      añadirCarrito: "Añadir al carrito",
      añadido: "Añadido al carrito",
      verCarrito: "Ver carrito",
    },
    checkoutSuccess: {
      thanks: "¡Gracias por tu compra!",
      body: "Hemos recibido tu pago y estamos preparando tu pedido para producción y envío. Te llegará la confirmación a",
      notFound: "Pedido no encontrado",
    },
    cart: {
      heading: "Tu carrito",
      empty: "Tu carrito está vacío.",
      seguirComprando: "Seguir comprando",
      eliminar: "Eliminar",
      subtotal: "Subtotal",
      finalizarCompra: "Finalizar compra",
      envioNota: "El envío se calcula en un único pedido, aunque compres varios productos.",
    },
  },
  ca: {
    nav: {
      colecciones: "Col·leccions",
      productos: "Productes",
      envio: "Enviament i devolucions",
      tienda: "Botiga",
      carrito: "Cistella",
      idioma: "Idioma",
      abrirMenu: "Obre el menú",
      cerrarMenu: "Tanca el menú",
      musica: "Música",
      webOficial: "Web oficial",
    },
    hero: {
      eyebrow: "Nova col·lecció · Dolphins and Earthquakes",
      titleLine1: "No Flag Patriots.",
      titleLine2: "Merch oficial.",
      subtitle:
        "Samarretes i fundes amb l'art del nostre nou disc. Impreses sota comanda i enviades en un sol paquet.",
      ctaPrimary: "Compra ara",
      ctaSecondary: "Veure col·leccions",
      imageAlt: "Dofí de No Flag Patriots dins d'un carro de la compra amb la bandera XXX",
    },
    valueProps: {
      onDemand: "Imprès sota comanda",
      onDemandBody: "Cada peça es produeix només per a tu.",
      oneShipment: "Un sol enviament",
      oneShipmentBody: "Tota la comanda arriba en un paquet.",
      securePay: "Pagament segur",
      securePayBody: "Targeta, Klarna i més amb Stripe.",
      euShipping: "Enviament a la UE",
      euShippingBody: "Espanya, Portugal, França, Itàlia i Alemanya.",
    },
    music: {
      eyebrow: "Escolta el disc",
      heading: "Dolphins and Earthquakes",
      body: "El nou disc de No Flag Patriots, punk rock melòdic des de Barcelona. Dona-li al play mentre tries la teva samarreta.",
      listenOn: "Escolta'l a",
      officialSite: "Visita la web oficial",
      playerTitle: "Reproductor de Spotify: Dolphins and Earthquakes",
    },
    collections: {
      heading: "Col·leccions",
      camisetas: "Samarretes",
      fundas: "Fundes d'iPhone",
    },
    products: {
      heading: "Productes",
      verTodo: "Veure-ho tot",
    },
    shipping: {
      heading: "Enviament i devolucions",
      productionTitle: "Producció sota demanda",
      productionBody:
        "Cada comanda s'imprimeix especialment per a tu a través del nostre partner de producció. Sol necessitar entre 2 i 5 dies laborables abans de sortir de fàbrica.",
      shippingTitle: "Enviament",
      shippingBody:
        "Els terminis varien segons la destinació — normalment entre 3 i 10 dies laborables addicionals dins de la Unió Europea. Rebràs un correu amb el seguiment tan bon punt es despatxi.",
      returnsTitle: "Canvis i devolucions",
      returnsBody:
        "Com que són productes personalitzats fets sota comanda, no s'accepten devolucions per canvi d'opinió ni per talla. Si la teva comanda arriba danyada, defectuosa o amb un error nostre, escriu-nos dins dels 14 dies següents a l'entrega i ho solucionem sense cost.",
      contact: "Dubtes amb la teva comanda? Escriu-nos a",
    },
    footer: {
      rights: "No Flag Patriots. Productes impresos sota demanda.",
      listen: "Escolta",
      follow: "Segueix-nos",
      officialSite: "Web oficial",
    },
    tienda: {
      heading: "La nostra botiga",
      subheading: "Productes personalitzats, impresos i enviats sota demanda.",
      camisetas: "Samarretes",
      fundas: "Fundes d'iPhone",
      desde: "Des de",
    },
    product: {
      colorTalla: "Color i talla",
      modelo: "Model",
      cantidad: "Quantitat",
      añadirCarrito: "Afegeix a la cistella",
      añadido: "Afegit a la cistella",
      verCarrito: "Veure la cistella",
    },
    checkoutSuccess: {
      thanks: "Gràcies per la teva compra!",
      body: "Hem rebut el teu pagament i estem preparant la teva comanda per a producció i enviament. Rebràs la confirmació a",
      notFound: "Comanda no trobada",
    },
    cart: {
      heading: "La teva cistella",
      empty: "La teva cistella està buida.",
      seguirComprando: "Continua comprant",
      eliminar: "Elimina",
      subtotal: "Subtotal",
      finalizarCompra: "Finalitza la compra",
      envioNota: "L'enviament es calcula en una única comanda, encara que compris diversos productes.",
    },
  },
  en: {
    nav: {
      colecciones: "Collections",
      productos: "Products",
      envio: "Shipping & returns",
      tienda: "Shop",
      carrito: "Cart",
      idioma: "Language",
      abrirMenu: "Open menu",
      cerrarMenu: "Close menu",
      musica: "Music",
      webOficial: "Official site",
    },
    hero: {
      eyebrow: "New collection · Dolphins and Earthquakes",
      titleLine1: "No Flag Patriots.",
      titleLine2: "Official merch.",
      subtitle:
        "Tees and cases featuring the artwork from our new record. Printed on demand and shipped in a single package.",
      ctaPrimary: "Shop now",
      ctaSecondary: "View collections",
      imageAlt: "No Flag Patriots dolphin riding a shopping cart with the XXX flag",
    },
    valueProps: {
      onDemand: "Printed on demand",
      onDemandBody: "Every piece is made just for you.",
      oneShipment: "One shipment",
      oneShipmentBody: "Your whole order arrives in one package.",
      securePay: "Secure checkout",
      securePayBody: "Card, Klarna and more via Stripe.",
      euShipping: "EU shipping",
      euShippingBody: "Spain, Portugal, France, Italy and Germany.",
    },
    music: {
      eyebrow: "Listen to the record",
      heading: "Dolphins and Earthquakes",
      body: "The new record from No Flag Patriots, melodic punk rock from Barcelona. Hit play while you pick your tee.",
      listenOn: "Listen on",
      officialSite: "Visit the official site",
      playerTitle: "Spotify player: Dolphins and Earthquakes",
    },
    collections: {
      heading: "Collections",
      camisetas: "T-Shirts",
      fundas: "iPhone Cases",
    },
    products: {
      heading: "Products",
      verTodo: "See all",
    },
    shipping: {
      heading: "Shipping & returns",
      productionTitle: "Made to order",
      productionBody:
        "Every order is printed specially for you through our production partner. It usually takes 2 to 5 business days before it leaves the factory.",
      shippingTitle: "Shipping",
      shippingBody:
        "Delivery times vary by destination — usually an extra 3 to 10 business days within the EU. You'll get a tracking email as soon as it ships.",
      returnsTitle: "Exchanges & returns",
      returnsBody:
        "Since these are custom, made-to-order products, we don't accept returns for a change of mind or wrong size. If your order arrives damaged, defective, or with an error on our part, contact us within 14 days of delivery and we'll sort it out at no cost.",
      contact: "Questions about your order? Email us at",
    },
    footer: {
      rights: "No Flag Patriots. Products printed on demand.",
      listen: "Listen",
      follow: "Follow us",
      officialSite: "Official site",
    },
    tienda: {
      heading: "Our store",
      subheading: "Custom products, printed and shipped on demand.",
      camisetas: "T-Shirts",
      fundas: "iPhone Cases",
      desde: "From",
    },
    product: {
      colorTalla: "Color and size",
      modelo: "Model",
      cantidad: "Quantity",
      añadirCarrito: "Add to cart",
      añadido: "Added to cart",
      verCarrito: "View cart",
    },
    checkoutSuccess: {
      thanks: "Thanks for your order!",
      body: "We've received your payment and we're getting your order ready for production and shipping. Confirmation will be sent to",
      notFound: "Order not found",
    },
    cart: {
      heading: "Your cart",
      empty: "Your cart is empty.",
      seguirComprando: "Continue shopping",
      eliminar: "Remove",
      subtotal: "Subtotal",
      finalizarCompra: "Checkout",
      envioNota: "Shipping is calculated as a single order, even if you buy several products.",
    },
  },
};

function lookup(dict: Dict, path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>((acc, key) => (acc as Dict | undefined)?.[key], dict);
  return typeof value === "string" ? value : path;
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "nfp-locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "ca" || stored === "en") {
        setLocaleState(stored);
      }
    } catch {
      // localStorage unavailable — stay on default
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  const t = (path: string) => lookup(dictionaries[locale], path);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
