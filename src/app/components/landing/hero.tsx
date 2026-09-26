"use client";

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
    <section className="pb-8">
      <div className="hero-stage relative isolate overflow-hidden px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-40">
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-fashion-poster.png"
          preload="metadata"
          className="hero-film absolute inset-0 -z-30 h-full w-full object-cover object-[64%_center] sm:object-center"
        >
          <source src="/videos/nfp-eyes-in-dolphin.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[linear-gradient(0deg,rgba(3,6,12,0.9)_0%,rgba(3,7,16,0.7)_38%,rgba(3,7,16,0.12)_76%),linear-gradient(90deg,rgba(3,7,16,0.98)_0%,rgba(3,7,16,0.88)_32%,rgba(3,7,16,0.28)_60%,rgba(3,7,16,0.06)_100%)] sm:bg-[linear-gradient(90deg,rgba(3,7,16,0.98)_0%,rgba(3,7,16,0.9)_28%,rgba(3,7,16,0.4)_55%,rgba(3,7,16,0.04)_82%),linear-gradient(0deg,rgba(3,6,12,0.7)_0%,transparent_38%)]"
        />
        <div aria-hidden="true" className="grain absolute inset-0 -z-10 opacity-[0.07]" />

        <div className="mx-auto grid min-h-[570px] max-w-6xl items-end gap-12 sm:min-h-[600px] lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10">
          <div className="pb-2 text-center lg:pb-0 lg:text-left">
            <h1
              className="hero-in text-[clamp(2.1rem,10.5vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-[clamp(3.2rem,4.6vw,4rem)]"
              style={{ animationDelay: "80ms" }}
            >
              {/* Special Elite ships a single 400 weight — font-normal avoids a synthesized faux-bold. */}
              <span className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em]">
                {t("hero.titleLine1")}
              </span>
              <br />
              <span className="text-neutral-400">{t("hero.titleLine2")}</span>
            </h1>

            <p
              className="hero-in mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl lg:mx-0 lg:max-w-xl"
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

          <div aria-hidden="true" className="hidden lg:block" />
        </div>
      </div>

      <ul className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-3 px-4 sm:px-6 md:grid-cols-4 lg:mt-10">
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
