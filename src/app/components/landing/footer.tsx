"use client";

import { useLocale } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-auto px-3 pb-4 sm:px-6 sm:pb-6">
      <div className="glass mx-auto max-w-6xl rounded-3xl px-6 py-8 text-center">
        <p className="font-[family-name:var(--font-display)] tracking-widest text-white">
          NO FLAG PATRIOTS
        </p>
        <p className="mt-2 text-xs text-neutral-400">
          © {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
