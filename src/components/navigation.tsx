"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navigation = [
  { name: "Plataforma", href: "/#features" },
  { name: "Casos", href: "/#portfolio" },
  { name: "Verticales", href: "/services" },
  { name: "Contacto", href: "/contact" },
];

export function Navigation() {
  const [isHidden, setIsHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      const sy = window.scrollY;
      setIsHidden(sy > 120 && sy > lastScrollRef.current);
      lastScrollRef.current = sy;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(dh > 0 ? Math.min((sy / dh) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = `nav-glass fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${isClient && isHidden ? "nav-hidden" : ""}`;

  return (
    <nav className={navClass} role="navigation" aria-label="Main navigation" style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
      <div className="nav-progress" style={{ width: progress + "%" }} />
      <Link href="/" className="nav-logo" aria-label="Eryon Home">
        <span className="gradient-text">E</span>ryon
      </Link>
      <div className="nav-links" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className="nav-link" style={{ color: "#f5f5f1", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.02em", textTransform: "uppercase" }}>
            {item.name}
          </Link>
        ))}
        <button
          className="theme-toggle"
          id="themeToggle"
          aria-label="Toggle theme"
          onClick={() => {
            const html = document.documentElement;
            const isDark = html.getAttribute("data-theme") !== "light";
            html.setAttribute("data-theme", isDark ? "light" : "dark");
          }}
          style={{ background: "transparent", border: "1px solid rgba(245,245,241,0.3)", color: "#f5f5f1", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}
        >
          🌙
        </button>
      </div>
    </nav>
  );
}
