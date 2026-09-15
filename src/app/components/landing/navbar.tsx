"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, locales } from "@/lib/i18n";

function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="flex items-center gap-1 border border-white/20 text-xs">
      {locales.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => setLocale(id)}
          aria-pressed={locale === id}
          className={`px-2 py-1 transition-colors ${
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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  const links = [
    { href: "/#colecciones", label: t("nav.colecciones") },
    { href: "/#productos", label: t("nav.productos") },
    { href: "/#envio", label: t("nav.envio") },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg tracking-wide text-white"
        >
          NO FLAG PATRIOTS
        </Link>
        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link text-sm text-neutral-200">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/tienda"
            className="rounded-none border border-sky-300/70 px-4 py-2 text-xs font-semibold tracking-widest text-sky-200 transition-colors hover:bg-sky-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300"
          >
            {t("nav.entrar").toUpperCase()}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-white/20 sm:hidden"
          >
            <span
              className={`h-0.5 w-5 bg-white transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>
      <div
        className={`grid border-b border-white/10 bg-black/90 backdrop-blur-md transition-[grid-template-rows] duration-300 ease-out sm:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="flex flex-col gap-1 overflow-hidden px-4 py-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-neutral-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
}
