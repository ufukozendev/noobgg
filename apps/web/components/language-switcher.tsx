"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const switchLanguage = (newLocale: string) => {
    // Cookie'yi güvenlik flag'leri ile set et
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; secure; samesite=strict`;

    // Sayfayı yenile (routing olmadan)
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLanguage("tr")}
        className={`px-3 py-1 rounded ${locale === "tr" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        TR
      </button>
      <button
        onClick={() => switchLanguage("en")}
        className={`px-3 py-1 rounded ${locale === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        EN
      </button>
    </div>
  );
}
