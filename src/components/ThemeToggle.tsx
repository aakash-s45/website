"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: "2.5rem", height: "2.5rem" }} />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2.5rem",
        height: "2.5rem",
        border: "1px solid var(--primary-text2)",
        borderRadius: "9999px",
        fontSize: "1.2rem",
        color: "var(--secondary-text)",
        background: "transparent",
        cursor: "pointer",
        transition: "all 0.2s ease",
        marginRight: "1rem",
      }}
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}
