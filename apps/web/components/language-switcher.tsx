"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  isScrolled,
}: {
  isScrolled: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const switchLanguage = () => {
    setIsLoading(true);
    const newLocale = locale === "tr" ? "en" : "tr";

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    setTimeout(() => {
      router.refresh();
      setIsLoading(false);
    }, 500);
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
      disabled={isLoading}
      className={cn(
        isScrolled
          ? "bg-transparent hover:bg-accent/30 border-foreground/10 text-foreground"
          : "bg-transparent hover:bg-accent/10 border-accent/20 text-white"
      )}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Image
          src={flagSrc}
          alt={currentLang}
          width={16}
          height={16}
          className="h-4 w-4"
        />
      )}
    </Button>
  );
}
