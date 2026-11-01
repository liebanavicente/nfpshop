"use client";

import Image from "next/image";
import BrandIcon from "@/app/components/brand-icon";
import { useLocale } from "@/lib/i18n";
import { OFFICIAL_SITE, listenLinks, socialLinks } from "@/lib/band";

const linkClass =
  "text-sm text-[#bdb5a6] transition-colors duration-150 hover:text-[var(--papel)] hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7fb4d6]";

export default function Footer() {
  const { t } = useLocale();

  return (
    // Contraportada en tinta negra: igual en la portada de papel y en las páginas de la tienda.
    <footer className="mt-auto bg-[var(--tinta)] px-4 pb-10 pt-14 text-[var(--papel)] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/products/logo1-white-ink.png" alt="" width={32} height={32} className="h-8 w-8" />
              <span className="font-[family-name:var(--font-display)] text-2xl uppercase">No Flag Patriots</span>
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
            <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.25em] text-[#7fb4d6]">{t("footer.listen")}</p>
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
            <p className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.25em] text-[#7fb4d6]">{t("footer.follow")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map(({ name, icon, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-10 w-10 items-center justify-center border-2 border-[var(--papel)] text-[var(--papel)] transition-colors duration-100 hover:bg-[var(--papel)] hover:text-[var(--tinta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7fb4d6]"
                  >
                    <BrandIcon name={icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t-2 border-dashed border-[#bdb5a6]/40 pt-6 text-xs text-[#bdb5a6]">
          © {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
