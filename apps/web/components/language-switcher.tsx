"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import Image from "next/image";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const switchLanguage = () => {
    const newLocale = locale === "tr" ? "en" : "tr";

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    router.refresh();
  };

  const currentLang = locale === "tr" ? "TR" : "EN";
  const nextLang = locale === "tr" ? "EN" : "TR";
  const flagSrc = locale === "tr" ? "/flags/tr.svg" : "/flags/en.svg";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={switchLanguage}
      title={`Şu an: ${currentLang} - ${nextLang} için tıklayın`}
      className="relative"
    >
      <Image
        src={flagSrc}
        alt={currentLang}
        width={16}
        height={16}
        className="h-5 w-5"
      />
    </Button>
  );
}
