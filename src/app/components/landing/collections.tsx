"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n";

// Las dos colecciones como dos recortes grandes: el arte en tinta azul y el nombre en una tira enorme.
export default function Collections() {
  const { t } = useLocale();

  const collections = [
    { href: "/tienda#camisetas", label: t("collections.camisetas"), image: "/products/dolphinflag.png", giro: -1.5, fondo: "bg-[var(--papel-2)]" },
    { href: "/tienda#fundas", label: t("collections.fundas"), image: "/products/case-guitarra.jpg", giro: 1.2, fondo: "bg-[var(--tinta)]" },
  ];

  return (
    <section id="colecciones" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="reveal-on-scroll titular">
          <span className="tira tira-azul">{t("collections.heading")}</span>
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8">
          {collections.map((c) => (
            <div key={c.href} className="reveal-on-scroll" style={{ "--hasta": `rotate(${c.giro}deg)` } as React.CSSProperties}>
              <Link href={c.href} className={`group celo relative block aspect-[4/3] ${c.fondo} shadow-[10px_10px_0_var(--tinta)]`}>
                <div className="absolute inset-3">
                  <div className="xerox relative h-full w-full">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  </div>
                </div>
                <span className="tira absolute -bottom-5 left-4 z-10 inline-flex items-center gap-3 text-2xl sm:text-4xl">
                  {c.label}
                  <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
