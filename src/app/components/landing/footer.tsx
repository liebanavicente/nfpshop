"use client";

import { useLocale } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-white/10 bg-neutral-950 px-4 py-10 text-center sm:px-6">
      <p className="font-[family-name:var(--font-display)] tracking-widest text-white">
        NO FLAG PATRIOTS
      </p>
      <p className="mt-2 text-xs text-neutral-400">
        © {new Date().getFullYear()} {t("footer.rights")}
      </p>
    </footer>
  );
}
