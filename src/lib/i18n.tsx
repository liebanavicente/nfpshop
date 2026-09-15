"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Locale = "es" | "ca" | "en";

export const locales: { id: Locale; label: string }[] = [
  { id: "es", label: "ES" },
  { id: "ca", label: "CA" },
  { id: "en", label: "EN" },
];

type Dict = Record<string, unknown>;

const dictionaries: Record<Locale, Dict> = {
  es: {
    nav: {
      colecciones: "Colecciones",
      productos: "Productos",
      envio: "Envío y devoluciones",
      entrar: "Entrar",
    },
    hero: {
      welcomeShort: "MERCH OFICIAL DE",
      welcomeLong: "BIENVENIDOS A LA TIENDA DE MERCH DE",
      cta: "Entrar",
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
    },
    checkoutSuccess: {
      thanks: "¡Gracias por tu compra!",
      body: "Hemos recibido tu pago y estamos preparando tu pedido para producción y envío. Te llegará la confirmación a",
      notFound: "Pedido no encontrado",
    },
  },
  ca: {
    nav: {
      colecciones: "Col·leccions",
      productos: "Productes",
      envio: "Enviament i devolucions",
      entrar: "Entra",
    },
    hero: {
      welcomeShort: "MERCH OFICIAL DE",
      welcomeLong: "BENVINGUTS A LA BOTIGA DE MERCH DE",
      cta: "Entra",
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
    },
    checkoutSuccess: {
      thanks: "Gràcies per la teva compra!",
      body: "Hem rebut el teu pagament i estem preparant la teva comanda per a producció i enviament. Rebràs la confirmació a",
      notFound: "Comanda no trobada",
    },
  },
  en: {
    nav: {
      colecciones: "Collections",
      productos: "Products",
      envio: "Shipping & returns",
      entrar: "Enter",
    },
    hero: {
      welcomeShort: "OFFICIAL MERCH OF",
      welcomeLong: "WELCOME TO THE MERCH STORE OF",
      cta: "Enter",
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
    },
    checkoutSuccess: {
      thanks: "Thanks for your order!",
      body: "We've received your payment and we're getting your order ready for production and shipping. Confirmation will be sent to",
      notFound: "Order not found",
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
