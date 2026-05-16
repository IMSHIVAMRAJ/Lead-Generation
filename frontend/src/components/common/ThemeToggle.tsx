import { useEffect, useState } from "react";
import { Button } from "./Button";

const STORAGE_KEY = "leadgen.theme";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const prefersDark = stored ? stored === "dark" : systemPrefersDark;
    document.documentElement.classList.toggle("dark", prefersDark);
    setIsDark(prefersDark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  };

  return (
    <Button variant="ghost" onClick={toggle}>
      {isDark ? "Light" : "Dark"} mode
    </Button>
  );
};
