"use client";

import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigationItems, personalInfo } from "@/data/portfolio";

type Theme = "dark" | "light";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("robin-theme") as Theme | null;
    const initialTheme = savedTheme ?? "dark";

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("robin-theme", nextTheme);
  };

  return (
    <header className="site-header">
      <nav className="section-width flex h-20 items-center justify-between">
        <a
          href="#home"
          className="text-xl font-bold tracking-tight sm:text-2xl"
          aria-label="Go to homepage"
        >
          <span className="gradient-text">{personalInfo.shortName}</span>
          <span className="text-[var(--text)]">.</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--muted)] hover:text-violet-400"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="icon-button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <a
            href={personalInfo.resumePath}
            download
            className="button-primary hidden sm:inline-flex"
          >
            <Download size={17} />
            Resume
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="icon-button lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu lg:hidden">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] hover:bg-violet-500/10 hover:text-violet-400"
            >
              {item.label}
            </a>
          ))}

          <a
            href={personalInfo.resumePath}
            download
            className="button-primary mt-2 justify-center sm:hidden"
          >
            <Download size={17} />
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
}
