"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, locales } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { OFFICIAL_SITE } from "@/lib/band";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300";

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function LanguageMenu() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("nav.idioma")}
        className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-neutral-300 transition-colors duration-200 hover:bg-white/10 hover:text-white ${focusRing}`}
      >
        <GlobeIcon />
        {locale.toUpperCase()}
      </button>
      <div
        role="menu"
        className={`glass-strong absolute right-0 top-full mt-2 w-40 origin-top-right rounded-2xl p-1.5 transition-[opacity,transform,visibility] duration-150 ease-out ${
          open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        {locales.map(({ id, name }) => (
          <button
            key={id}
            type="button"
            role="menuitemradio"
            aria-checked={locale === id}
            onClick={() => {
              setLocale(id);
              setOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-neutral-200 transition-colors hover:bg-white/10"
          >
            {name}
            {locale === id && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sky-300" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function CartLink() {
  const { t } = useLocale();
  const { totalCount } = useCart();
  return (
    <Link
      href="/carrito"
      aria-label={t("nav.carrito")}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-200 transition-colors duration-200 hover:bg-white/10 hover:text-white ${focusRing}`}
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M6 7h12l-1 13H7L6 7z" strokeLinejoin="round" />
        <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
      </svg>
      {totalCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-300 px-1 text-[10px] font-bold text-black">
          {totalCount}
        </span>
      )}
    </Link>
  );
}

type NavItem = { href: string; label: string; external?: boolean };

function externalProps(item: NavItem) {
  return item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/** Desktop links with a highlight pill that slides between hovered items. */
function NavLinks({ links }: { links: NavItem[] }) {
  const [pos, setPos] = useState<{ left: number; width: number } | null>(null);
  const [visible, setVisible] = useState(false);

  return (
    <ul className="relative hidden items-center lg:flex" onMouseLeave={() => setVisible(false)}>
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 rounded-full bg-white/10 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          pos ? "transition-[transform,width,opacity] duration-300" : ""
        }`}
        style={{
          width: pos?.width ?? 0,
          transform: `translateX(${pos?.left ?? 0}px)`,
          opacity: visible ? 1 : 0,
        }}
      />
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            {...externalProps(link)}
            onMouseEnter={(e) => {
              setPos({ left: e.currentTarget.offsetLeft, width: e.currentTarget.offsetWidth });
              setVisible(true);
            }}
            className={`relative block whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium text-neutral-300 transition-colors duration-200 hover:text-white ${focusRing}`}
          >
            {link.label}
            {link.external && <span aria-hidden="true"> ↗</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, locale, setLocale } = useLocale();
  const scrolled = useScrolled();

  const links: NavItem[] = [
    { href: "/#colecciones", label: t("nav.colecciones") },
    { href: "/#productos", label: t("nav.productos") },
    { href: "/#musica", label: t("nav.musica") },
    { href: "/#envio", label: t("nav.envio") },
    { href: OFFICIAL_SITE, label: t("nav.webOficial"), external: true },
  ];

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto max-w-6xl rounded-2xl transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          solid ? "glass-strong" : "border border-transparent"
        }`}
      >
        <nav className="flex h-14 items-center justify-between pl-4 pr-2 sm:pl-5">
          <Link href="/" className={`flex items-center gap-2.5 rounded-full ${focusRing}`}>
            <Image src="/products/logo1-white-ink.png" alt="" width={28} height={28} className="h-7 w-7" />
            <span className="font-[family-name:var(--font-display)] text-[15px] text-white">
              No Flag Patriots
            </span>
          </Link>

          <NavLinks links={links} />

          <div className="flex items-center gap-1">
            <div className="hidden md:block">
              <LanguageMenu />
            </div>
            <CartLink />
            <Link
              href="/tienda"
              className={`ml-1 hidden rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-black transition-shadow duration-200 hover:shadow-[0_0_24px_rgba(125,211,252,0.5)] md:inline-block ${focusRing}`}
            >
              {t("nav.tienda")}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? t("nav.cerrarMenu") : t("nav.abrirMenu")}
              className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10 lg:hidden ${focusRing}`}
            >
              <span
                className={`absolute h-[1.5px] w-4 bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3.5px]"}`}
              />
              <span
                className={`absolute h-[1.5px] w-4 bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3.5px]"}`}
              />
            </button>
          </div>
        </nav>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="border-t border-white/10 px-4 pt-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...externalProps(link)}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-lg font-medium text-white"
                  >
                    {link.label}
                    {link.external && <span aria-hidden="true" className="text-neutral-400"> ↗</span>}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 px-4 pb-4 pt-3">
              <div
                className="grid grid-cols-3 gap-1 rounded-full border border-white/10 bg-white/5 p-1"
                role="radiogroup"
                aria-label={t("nav.idioma")}
              >
                {locales.map(({ id, name }) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={locale === id}
                    onClick={() => setLocale(id)}
                    className={`rounded-full py-1.5 text-sm transition-colors ${
                      locale === id ? "bg-white text-black" : "text-neutral-300"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <Link
                href="/tienda"
                onClick={() => setOpen(false)}
                className="rounded-full bg-white py-3 text-center text-sm font-semibold text-black"
              >
                {t("nav.tienda")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
