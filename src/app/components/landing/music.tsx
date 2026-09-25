"use client";

import Image from "next/image";
import BrandIcon from "@/app/components/brand-icon";
import { useLocale } from "@/lib/i18n";
import { OFFICIAL_SITE, SPOTIFY_ALBUM_ID, listenLinks } from "@/lib/band";

export default function Music() {
  const { t } = useLocale();

  return (
    <section id="musica" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="reveal-on-scroll mx-auto max-w-6xl">
        <div className="glass relative overflow-hidden rounded-[2rem]">
          <Image src="/hero-bg.jpg" alt="" fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080c]/90 via-[#07080c]/75 to-[#07080c]/60 lg:bg-gradient-to-r lg:to-[#07080c]/40" />

          <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
            <div>
              <p className="text-sm font-medium text-sky-300">{t("music.eyebrow")}</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-white sm:text-5xl">
                {t("music.heading")}
              </h2>
              <p className="mt-4 max-w-md text-neutral-300">{t("music.body")}</p>

              <p className="mt-8 text-xs font-medium uppercase tracking-widest text-neutral-400">
                {t("music.listenOn")}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {listenLinks.map(({ name, icon, href }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-neutral-200 transition-colors duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                    >
                      <BrandIcon name={icon} className="h-4 w-4" />
                      {name}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={OFFICIAL_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-1 text-sm font-medium text-sky-300 transition-colors hover:text-sky-200"
              >
                {t("music.officialSite")}
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl">
              <iframe
                title={t("music.playerTitle")}
                src={`https://open.spotify.com/embed/album/${SPOTIFY_ALBUM_ID}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="block border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
