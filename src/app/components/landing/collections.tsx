"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n";

export default function Collections() {
  const { t } = useLocale();

  const collections = [
    {
      href: "/tienda#camisetas",
      label: t("collections.camisetas"),
      image: "/products/dolphinflag.png",
      bg: "bg-neutral-900",
    },
    {
      href: "/tienda#fundas",
      label: t("collections.fundas"),
      image: "/products/case-guitarra.jpg",
      bg: "bg-neutral-950",
    },
  ];

  return (
    <section id="colecciones" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="reveal-on-scroll mb-10 font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide text-white sm:text-4xl">
          {t("collections.heading")}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {collections.map((c) => (
            <div key={c.href} className="reveal-on-scroll">
              <Link
                href={c.href}
                className={`glass glass-hover group relative flex aspect-[4/3] items-end overflow-hidden rounded-3xl ${c.bg} focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300`}
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  className="object-cover opacity-70 transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="glass-strong relative z-10 m-4 inline-flex items-center gap-3 rounded-full px-5 py-2.5 font-[family-name:var(--font-display)] text-lg uppercase tracking-wide text-white sm:m-5 sm:text-xl">
                  {c.label}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
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
