"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

interface FeaturesProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
}

export function Features({ features, title = "Our Services", subtitle = "We deliver comprehensive digital solutions tailored to your business needs" }: FeaturesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current!.querySelectorAll(".feature-card"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          containerRef.current!.querySelectorAll(".feature-icon"),
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="section bg-neutral-50 dark:bg-neutral-950"
      aria-labelledby="features-heading"
    >
      <div className="container">
        <header className="section-header">
          <h2 id="features-heading" className="heading-2 text-neutral-900 dark:text-neutral-100">
            {title}
          </h2>
          <p className="body-lg text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        </header>

        <div className="grid-auto-fit" role="list">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="feature-card card p-8 relative overflow-hidden group"
              role="listitem"
            >
              <div
                className="feature-icon w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                aria-hidden="true"
              >
                {feature.icon}
              </div>

              <h3 className="heading-3 text-neutral-900 dark:text-neutral-100 mb-3">
                {feature.title}
              </h3>

              <p className="body text-neutral-600 dark:text-neutral-400 mb-6">
                {feature.description}
              </p>

              {feature.link && (
                <Link
                  href={feature.link}
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:gap-3 transition-all duration-200"
                >
                  Learn more
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              )}

              <div
                className="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}