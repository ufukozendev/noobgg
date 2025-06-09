"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeSwitcher({ isScrolled }: { isScrolled: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSwitch = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  if (!mounted) {
    return (
      <Button variant="outline" className="opacity-0" size="icon">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";
  const Icon = isDark ? Moon : Sun;
  const label = isDark ? "Karanlık" : "Aydınlık";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeSwitch}
      title={`Şu an: ${label} - Değiştirmek için tıklayın`}
      className={cn(
        isScrolled
          ? "bg-transparent hover:bg-accent/30 border-foreground/10 text-foreground"
          : "bg-transparent hover:bg-accent/10 border-accent/20 text-white"
      )}
    >
      <Icon className="w-4 h-4" />
    </Button>
  );
}
