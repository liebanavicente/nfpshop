"use client";

import Image from "next/image";
import BrandIcon from "@/app/components/brand-icon";
import { useLocale } from "@/lib/i18n";
import { OFFICIAL_SITE, listenLinks, socialLinks } from "@/lib/band";

const linkClass =
  "text-sm text-neutral-400 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="mt-auto px-3 pb-4 pt-8 sm:px-6 sm:pb-6">
      <div className="glass mx-auto max-w-6xl rounded-3xl px-6 py-10 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/products/logo1-white-ink.png" alt="" width={32} height={32} className="h-8 w-8" />
              <span className="font-[family-name:var(--font-display)] text-lg text-white">No Flag Patriots</span>
            </div>
            <a
              href={OFFICIAL_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 inline-flex items-center gap-1 ${linkClass}`}
            >
              {t("footer.officialSite")} · noflagpatriots.com <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">{t("footer.listen")}</p>
            <ul className="mt-4 space-y-2.5">
              {listenLinks.map(({ name, icon, href }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 ${linkClass}`}>
                    <BrandIcon name={icon} className="h-4 w-4" />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">{t("footer.follow")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map(({ name, icon, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-colors duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
                  >
                    <BrandIcon name={icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-neutral-400">
          © {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
