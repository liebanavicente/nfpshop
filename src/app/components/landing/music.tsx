"use client";

import Image from "next/image";
import BrandIcon from "@/app/components/brand-icon";
import { useLocale } from "@/lib/i18n";
import { OFFICIAL_SITE, listenLinks } from "@/lib/band";
import { useMusic } from "@/app/components/music-player";

export default function Music() {
  const { t } = useLocale();
  const { isPlaying, playFromUser } = useMusic();

  return (
    <section id="musica" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="reveal-on-scroll mx-auto max-w-6xl">
        <div className="punk-card glass relative overflow-hidden">
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

            {/* One player for the whole site (the dock) — a second embed here would play over it. */}
            <div className="mx-auto w-full max-w-sm lg:max-w-md">
              <Image
                src="/album-dolphins-and-earthquakes.jpg"
                alt="Dolphins and Earthquakes"
                width={640}
                height={640}
                sizes="(min-width: 1024px) 448px, 384px"
                className="h-auto w-full rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              />
              <button
                type="button"
                onClick={playFromUser}
                disabled={isPlaying}
                className="glass glass-hover mt-4 flex w-full items-center gap-3 rounded-full py-2 pl-2 pr-5 text-sm font-medium text-white disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black">
                  {isPlaying ? (
                    <span aria-hidden="true" className="flex h-3 items-end gap-[2px]">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-full w-[3px] origin-bottom rounded-full bg-black"
                          style={{ animation: `eq-bar 900ms ease-in-out ${i * 150}ms infinite alternate` }}
                        />
                      ))}
                    </span>
                  ) : (
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                    </svg>
                  )}
                </span>
                {isPlaying ? t("player.nowPlaying") : t("music.playCta")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
