// Copyright 2024 the JSR authors. All rights reserved. MIT license.

import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

type Theme = "dark" | "light";
type ThemeMode = Theme | "system";
type SetTheme = { theme: ThemeMode; persist?: boolean };

const getSystemTheme = (): Theme =>
  globalThis.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

function ThemeButton(
  { children, isSelected, ...rest }: JSX.HTMLAttributes<HTMLButtonElement> & {
    isSelected: boolean;
  },
) {
  return (
    <button
      className="hover:link data-[active=true]:font-bold data-[active=true]:link"
      data-active={isSelected}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>("system");

  useEffect(() => {
    const defaultTheme = localStorage.getItem("theme") as ThemeMode || "system";

    setTheme({ theme: defaultTheme, persist: false });
  }, []);

  function setTheme({ theme, persist = true }: SetTheme) {
    const selectedTheme = (theme === "system" && getSystemTheme()) || theme;

    document.body.classList.toggle("dark", selectedTheme === "dark");
    document.body.classList.toggle("light", selectedTheme === "light");

    persist && localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
  }

  return (
    <p className="flex gap-2 items-center justify-center">
      Theme:
      <ThemeButton
        isSelected={currentTheme === "system"}
        onClick={() => setTheme({ theme: "system" })}
      >
        System
      </ThemeButton>
      <ThemeButton
        isSelected={currentTheme === "light"}
        onClick={() => setTheme({ theme: "light" })}
      >
        Light
      </ThemeButton>
      <ThemeButton
        isSelected={currentTheme === "dark"}
        onClick={() => setTheme({ theme: "dark" })}
      >
        Dark
      </ThemeButton>
    </p>
  );
}
