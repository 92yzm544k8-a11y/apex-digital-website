"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navigation = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Integrations", href: "/integrations" },
    { name: "Changelog", href: "/changelog" },
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api-reference" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Partners", href: "/partners" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Community", href: "/community" },
    { name: "Help Center", href: "/help" },
    { name: "Webinars", href: "/webinars" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Templates", href: "/templates" },
    { name: "Guides", href: "/guides" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Security", href: "/security" },
    { name: "GDPR", href: "/gdpr" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/apexdigital", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
  )},
  { name: "LinkedIn", href: "https://linkedin.com/company/apexdigital", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  )},
  { name: "GitHub", href: "https://github.com/apexdigital", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
  )},
  { name: "Dribbble", href: "https://dribbble.com/apexdigital", icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.627 4.416c-.82.424-2.371 1.804-2.584 2.125 1.575-.726 3.621-1.325 5.209-1.325 0 2.616-1.002 4.985-3.07 6.739-1.732 1.45-3.73 2.244-4.554 2.322v1.11c.926.065 2.923-.715 4.657-2.322 1.97-1.67 3.07-4.226 3.07-6.891v-.039zm-3.304 1.325c-.55 2.221-3.02 5.595-3.322 5.893v-1.086c.28-.265 2.493-3.684 2.632-5.719 1.265-.023 2.483.105 3.384.313-1.436-2.82-3.89-2.924-4.359-2.924-1.793 0-3.341 1.403-3.341 3.135 0 1.774 1.398 3.216 3.27 3.216v.972c-.994.033-3.217.893-3.546 3.082zm-11.117-4.177c.811-.419 2.261-1.732 2.465-2.033-1.516.732-3.365 1.26-4.744 1.26 0-2.569 1.022-4.922 3.203-6.718C8.82 2.45 10.94 3.22 11.77 3.294V2.187c-.935-.081-2.993.617-4.75 2.171C4.678 5.604 3.82 8.283 3.82 9.99v.038c1.585-.003 3.239-.08 4.613-.313zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z"/></svg>
  )},
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          footerRef.current!.querySelectorAll(".footer-column > *"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          footerRef.current!.querySelectorAll(".social-link"),
          { opacity: 0, y: 20, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.05,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, footerRef);

      return () => ctx.revert();
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="bg-neutral-950 text-neutral-300"
      role="contentinfo"
    >
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="footer-column col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-6" aria-label="Apex Digital Home">
              <span className="gradient-text">Apex</span>
              <span className="text-neutral-400">Digital</span>
            </Link>
            <p className="body text-neutral-400 mb-6 max-w-xs">
              We craft innovative digital experiences that transform businesses and delight users. From strategy to execution, we're your partner in digital transformation.
            </p>
            <div className="flex gap-4" role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="social-link w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-primary-500 hover:bg-primary-900/20 transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  role="listitem"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <nav className="footer-column" aria-labelledby="product-heading">
            <h3 id="product-heading" className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3" role="list">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-column" aria-labelledby="company-heading">
            <h3 id="company-heading" className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3" role="list">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-column" aria-labelledby="resources-heading">
            <h3 id="resources-heading" className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3" role="list">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} Apex Digital. All rights reserved.
            </p>

            <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Legal links">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-neutral-500 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span>Made with</span>
              <span className="text-red-500" aria-hidden="true">♥</span>
              <span>by Apex Digital</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}