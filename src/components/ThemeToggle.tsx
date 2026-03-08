"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { FaMountain } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import styles from "@/app/styles/page.module.css";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.waveIcon} />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
      className={styles.waveIcon}
      style={{ cursor: "pointer", background: "transparent" }}
    >
      {theme === "dark" ? <FaMountainSun /> : <FaMountain />}
    </button>
  );
}
