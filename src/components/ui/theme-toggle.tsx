"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative h-9 w-9 rounded-md border border-gray-300 bg-transparent",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "focus:outline-none focus:ring-2 focus:ring-tornomix-aco focus:ring-offset-2",
        "transition-colors duration-200",
        className
      )}
      aria-label={`Alternar para modo ${
        theme === "light" ? "escuro" : "claro"
      }`}
    >
      <Sun
        className={cn(
          "h-4 w-4 text-gray-600 dark:text-gray-400 transition-all duration-200",
          theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 text-gray-600 dark:text-gray-400 transition-all duration-200",
          theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        )}
      />
      <span className="sr-only">
        {theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
      </span>
    </Button>
  );
}

export { ThemeToggle as ThemeToggleSwitch };
