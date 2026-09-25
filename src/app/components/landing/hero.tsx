"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
  "aria-hidden": true,
};

const valueProps = [
  {
    key: "onDemand",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
      </svg>
    ),
  },
  {
    key: "oneShipment",
    icon: (
      <svg {...iconProps}>
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 7v10l9 4 9-4V7M12 11v10" />
      </svg>
    ),
  },
  {
    key: "securePay",
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
  {
    key: "euShipping",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
];

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="px-4 pb-8 pt-32 sm:px-6 sm:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <p className="hero-in glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-neutral-300 sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(125,211,252,0.9)]" />
            {t("hero.eyebrow")}
          </p>

          <h1
            className="hero-in mt-7 text-[clamp(2.1rem,10.5vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-[clamp(3.2rem,4.6vw,4rem)]"
            style={{ animationDelay: "80ms" }}
          >
            {/* Special Elite ships a single 400 weight — font-normal avoids a synthesized faux-bold. */}
            <span className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em]">
              {t("hero.titleLine1")}
            </span>
            <br />
            <span className="text-neutral-500">{t("hero.titleLine2")}</span>
          </h1>

          <p
            className="hero-in mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl lg:mx-0 lg:max-w-xl"
            style={{ animationDelay: "160ms" }}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="hero-in mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7 lg:justify-start"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/tienda"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-[box-shadow,transform] duration-200 hover:shadow-[0_0_32px_rgba(125,211,252,0.5)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <a
              href="#colecciones"
              className="group inline-flex items-center gap-1 text-sm font-medium text-sky-300 transition-colors hover:text-sky-200"
            >
              {t("hero.ctaSecondary")}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                ›
              </span>
            </a>
          </div>
        </div>

        {/* Entrance fade on the wrapper, idle float on the inner element — two animations
            on one element would fight over `transform`. */}
        <div className="hero-in relative mx-auto w-full max-w-[440px] lg:max-w-none" style={{ animationDelay: "320ms" }}>
          <div
            aria-hidden="true"
            className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35)_0%,rgba(30,58,138,0.25)_45%,transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[2%] left-1/2 h-[7%] w-[70%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-xl"
          />
          <div className="relative" style={{ animation: "hero-float 7s ease-in-out infinite" }}>
            <Image
              src="/hero-dolphin-cart.png"
              alt={t("hero.imageAlt")}
              width={1297}
              height={1199}
              priority
              sizes="(min-width: 1024px) 560px, 440px"
              className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </div>

      <ul className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4 lg:mt-16">
        {valueProps.map(({ key, icon }) => (
          <li key={key} className="glass rounded-2xl p-5">
            <span className="text-sky-300">{icon}</span>
            <p className="mt-3 text-sm font-semibold text-white">{t(`valueProps.${key}`)}</p>
            <p className="mt-1 text-sm leading-snug text-neutral-400">{t(`valueProps.${key}Body`)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
