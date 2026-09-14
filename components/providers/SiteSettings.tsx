"use client";

import { createContext, useCallback, useContext, useEffect, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Theme = "day" | "night";

interface SiteSettings {
  fxEnabled: boolean;
  theme: Theme;
  toggleFx: () => void;
  toggleTheme: () => void;
}

const SettingsContext = createContext<SiteSettings>({
  fxEnabled: true,
  theme: "day",
  toggleFx: () => {},
  toggleTheme: () => {},
});

export function useSiteSettings() {
  return useContext(SettingsContext);
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [fxRaw, setFxRaw] = useLocalStorage("shankies-fx");
  const [themeRaw, setThemeRaw] = useLocalStorage("shankies-theme");

  const fxEnabled = fxRaw !== "off";
  const theme: Theme = themeRaw === "night" ? "night" : "day";

  useEffect(() => {
    document.documentElement.classList.toggle("fx-on", fxEnabled);
  }, [fxEnabled]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleFx = useCallback(() => setFxRaw(fxEnabled ? "off" : "on"), [fxEnabled, setFxRaw]);
  const toggleTheme = useCallback(
    () => setThemeRaw(theme === "day" ? "night" : "day"),
    [theme, setThemeRaw]
  );

  return (
    <SettingsContext.Provider value={{ fxEnabled, theme, toggleFx, toggleTheme }}>
      {children}
    </SettingsContext.Provider>
  );
}
