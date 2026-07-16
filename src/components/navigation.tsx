"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Verticales", href: "/services" },
  { name: "Casos", href: "/work" },
  { name: "Eryon", href: "/about" },
  { name: "Contacto", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const lastScrollRef = useRef(0);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const sy = window.scrollY;
      setIsScrolled(sy > 20);
      setIsHidden(sy > 120 && sy > lastScrollRef.current);
      lastScrollRef.current = sy;

      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(dh > 0 ? Math.min((sy / dh) * 100, 100) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isClient) {
    return (
      <nav
        className="fixed top-0 left-0 right-0 z-50 nav-glass"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-neutral-900 dark:text-neutral-100"
              aria-label="Eryon Home"
            >
              <span className="gradient-text">Eryon</span> México
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/contact"
                className="btn btn-primary text-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 nav-glass transition-transform duration-500 ease-out ${
        isHidden ? "nav-hidden" : "translate-y-0"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-neutral-900 dark:text-neutral-100"
            aria-label="Eryon Home"
          >
            <span className="gradient-text">Eryon</span> México
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link relative text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="btn btn-primary text-sm"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="nav-progress" style={{ width: progress + "%" }} />

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden overflow-hidden bg-white border-b border-neutral-200 dark:bg-neutral-950 dark:border-neutral-800 animate-slide-up"
          role="dialog"
          aria-label="Mobile menu"
        >
          <div className="px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-primary-600 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-primary-400"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <Link
                href="/contact"
                className="btn btn-primary w-full justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
