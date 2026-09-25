"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, locales } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-0.5 text-xs">
      {locales.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => setLocale(id)}
          aria-pressed={locale === id}
          className={`rounded-full px-2.5 py-1 transition-colors duration-200 ${
            locale === id
              ? "bg-white text-black"
              : "text-neutral-300 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
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
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-200 hover:border-sky-300/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9.5" cy="20.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="20.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
      {totalCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-sky-300 px-1 text-[10px] font-bold text-black shadow-[0_0_12px_rgba(125,211,252,0.7)]">
          {totalCount}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  const links = [
    { href: "/#colecciones", label: t("nav.colecciones") },
    { href: "/#productos", label: t("nav.productos") },
    { href: "/#envio", label: t("nav.envio") },
  ];

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <div className="glass-strong mx-auto max-w-6xl rounded-2xl">
        <nav className="flex items-center justify-between px-4 py-2.5 sm:px-5">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-lg tracking-wide text-white"
          >
            NO FLAG PATRIOTS
          </Link>
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link text-sm text-neutral-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <CartLink />
            <Link
              href="/tienda"
              className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold tracking-widest text-black transition-shadow duration-200 hover:shadow-[0_0_24px_rgba(125,211,252,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:inline-block"
            >
              {t("nav.entrar").toUpperCase()}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 md:hidden"
            >
              <span
                className={`h-0.5 w-4 bg-white transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-4 bg-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-4 bg-white transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </nav>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <ul className="flex flex-col gap-1 overflow-hidden px-4">
            {links.map((link) => (
              <li key={link.href} className="first:border-t first:border-white/10 first:pt-2">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-neutral-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex items-center justify-between gap-3 pb-3 pt-2">
              <LanguageSwitcher />
              <Link
                href="/tienda"
                onClick={() => setOpen(false)}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold tracking-widest text-black"
              >
                {t("nav.entrar").toUpperCase()}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
