"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  variant?: "home" | "page";
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function Hero({
  variant = "home",
  title = "Digital Solutions That Drive Growth",
  subtitle = "We craft innovative digital experiences that transform businesses and delight users. From strategy to execution, we're your partner in digital transformation.",
  ctaText = "Start Your Project",
  ctaHref = "/contact",
  secondaryCtaText = "View Our Work",
  secondaryCtaHref = "/work",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const secondaryCtaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 }
        )
          .fromTo(
            titleRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.2"
          )
          .fromTo(
            subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.4"
          )
          .fromTo(
            ctaRef.current,
            { opacity: 0, y: 20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6 },
            "-=0.3"
          )
          .fromTo(
            secondaryCtaRef.current,
            { opacity: 0, y: 20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6 },
            "-=0.5"
          );

        if (variant === "home" && scrollIndicatorRef.current) {
          tl.fromTo(
            scrollIndicatorRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.2"
          );
        }

        if (shapesRef.current) {
          // @ts-ignore - GSAP fromTo with array targets has complex type signatures
          gsap.fromTo(
            shapesRef.current.querySelectorAll(".shape"),
            // @ts-ignore - GSAP fromTo with array targets has complex type signatures
            { opacity: 0, scale: 0, rotation: -45 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1,
              ease: "elastic.out(1, 0.5)",
              stagger: 0.2,
            },
            "-=0.5"
          );
        }

        if (variant === "home" && shapesRef.current) {
          const shapeFloats = shapesRef.current.querySelectorAll(".shape-float");
          // @ts-ignore - GSAP to with array targets has complex type signatures
          gsap.to(shapeFloats, {
            y: (i) => (i % 2 === 0 ? -30 : 30),
            x: (i) => (i % 3 === 0 ? 20 : -20),
            rotation: (i) => (i % 2 === 0 ? 180 : -180),
            duration: (i) => 15 + i * 5,
            ease: "none",
            repeat: -1,
            yoyo: true,
          });
        }

        if (variant === "home" && statsRef.current) {
          gsap.fromTo(
            statsRef.current.querySelectorAll(".stat-item"),
            { opacity: 0, y: 30, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              stagger: 0.1,
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          statsRef.current.querySelectorAll(".stat-value").forEach((el) => {
            const target = parseInt(el.getAttribute("data-value") || "0", 10);
            const suffix = el.getAttribute("data-suffix") || "";
            gsap.to({ value: 0 }, {
              value: target,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
              onUpdate: function () {
                el.textContent = Math.round(this.targets()[0].value) + suffix;
              },
            });
          });
        }
      }, heroRef);

      return () => ctx.revert();
    },
    { scope: heroRef }
  );

  const stats = [
    { value: "200+", label: "Projects Delivered" },
    { value: "50+", label: "Happy Clients" },
    { value: "15+", label: "Team Members" },
    { value: "98%", label: "Client Retention" },
  ];

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${variant === "page" ? "pt-20 pb-16" : ""}`}
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900" />
        <div ref={shapesRef} className="absolute inset-0" aria-hidden="true">
          <div className="shape shape-float absolute top-1/4 left-1/12 w-24 h-24 bg-primary-100/50 dark:bg-primary-900/20 rounded-full blur-3xl" style={{ transform: "translate(-50%, -50%)" }} />
          <div className="shape shape-float absolute top-1/2 right-1/6 w-32 h-32 bg-accent-100/50 dark:bg-accent-900/20 rounded-2xl blur-3xl rotate-12" style={{ transform: "translate(-50%, -50%)" }} />
          <div className="shape shape-float absolute bottom-1/4 left-1/4 w-20 h-20 bg-primary-100/50 dark:bg-primary-900/20 rounded-xl blur-3xl rotate-6" style={{ transform: "translate(-50%, -50%)" }} />
          <div className="shape shape-float absolute bottom-1/3 right-1/12 w-28 h-28 bg-accent-100/50 dark:bg-accent-900/20 rounded-full blur-3xl rotate--12" style={{ transform: "translate(-50%, -50%)" }} />
          <div className="shape absolute top-1/3 left-1/2 w-16 h-16 border-2 border-primary-200/50 dark:border-primary-800/50 rounded-full" style={{ transform: "translate(-50%, -50%)" }} />
          <div className="shape absolute bottom-1/2 right-1/3 w-12 h-12 border-2 border-accent-200/50 dark:border-accent-800/50 rounded-lg rotate-45" style={{ transform: "translate(-50%, -50%)" }} />
        </div>
      </div>

      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50/80 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
            </span>
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Award-winning Digital Agency
            </span>
          </div>

          <h1
            id="hero-title"
            ref={titleRef}
            className="heading-1 text-neutral-900 dark:text-neutral-100 mb-6 leading-tight"
          >
            {variant === "home" ? (
              <>
                Digital Solutions That
                <br />
                <span className="gradient-text">Drive Growth</span>
              </>
            ) : (
              title
            )}
          </h1>

          <p
            ref={subtitleRef}
            className="body-lg text-neutral-600 dark:text-neutral-400 mb-10 max-w-3xl mx-auto"
          >
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              ref={ctaRef}
              href={ctaHref}
              className="btn btn-primary text-base px-8 py-3"
            >
              {ctaText}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              ref={secondaryCtaRef}
              href={secondaryCtaHref}
              className="btn btn-secondary text-base px-8 py-3"
            >
              {secondaryCtaText}
            </Link>
          </div>

          {variant === "home" && (
            <>
              <div ref={statsRef} className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16" role="list" aria-label="Company statistics">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center animate-fade-in-up"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                    role="listitem"
                  >
                    <div className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 gradient-text mb-2 stat-value"
                         data-value={stat.value.replace(/\D/g, "")}
                         data-suffix={stat.value.replace(/\d/g, "")}
                         aria-label={`${stat.value} ${stat.label}`}>
                      0
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div ref={scrollIndicatorRef} className="animate-bounce-slow" aria-hidden="true">
                <div className="flex flex-col items-center gap-2 text-neutral-400 dark:text-neutral-600">
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Scroll to explore
                  </span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}