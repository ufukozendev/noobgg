"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button variant="outline" className="opacity-0" size="icon">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = theme === "dark";
  const Icon = isDark ? Moon : Sun;
  const label = isDark ? "Karanlık" : "Aydınlık";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeSwitch}
      title={`Şu an: ${label} - Değiştirmek için tıklayın`}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
