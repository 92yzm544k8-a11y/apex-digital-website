"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: string;
  label: string;
}

interface AboutProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  stats?: Stat[];
  values?: Array<{ title: string; description: string; icon: React.ReactNode }>;
}

export function About({
  title = "About Us",
  subtitle = "We're a team of passionate creators building digital experiences that matter",
  description = "Founded in 2015, Apex Digital has grown from a small design studio into a full-service digital agency. We believe that great digital products are born from the intersection of strategy, design, and technology.",
  imageSrc = "/about-image.jpg",
  imageAlt = "Our team collaborating",
  stats = [
    { value: "50+", label: "Team Members" },
    { value: "200+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Countries Served" },
  ],
  values = [
    {
      title: "Innovation First",
      description: "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Client Success",
      description: "Your success is our success. We're committed to delivering results that exceed expectations.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20l5-10 5 10M4 12a3 3 0 013-3h10a3 3 0 013 3v6a3 3 0 01-3 3H7a3 3 0 01-3-3v-6z" />
        </svg>
      ),
    },
    {
      title: "Transparency",
      description: "Open communication and honest feedback are at the core of every relationship we build.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Continuous Growth",
      description: "We never stop learning. Our team invests in constant skill development and knowledge sharing.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ],
}: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current!.querySelectorAll(".about-text > *"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: 50, scale: 0.95 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (statsRef.current) {
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
            const target = parseInt(el.getAttribute("data-value") || "0");
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

        gsap.fromTo(
          containerRef.current!.querySelectorAll(".value-card"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current!.querySelector(".values-grid"),
              start: "top 85%",
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
      className="section bg-white dark:bg-neutral-950"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="about-text">
            <header className="mb-8">
              <h2 id="about-heading" className="heading-2 text-neutral-900 dark:text-neutral-100 mb-4">
                {title}
              </h2>
              <p className="body-lg text-neutral-600 dark:text-neutral-400">
                {subtitle}
              </p>
            </header>

            <p className="body text-neutral-600 dark:text-neutral-400 mb-6">
              {description}
            </p>

            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-6 mb-8"
              role="list"
              aria-label="Company statistics"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="stat-item p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800"
                  role="listitem"
                >
                  <div
                    className="stat-value text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 gradient-text mb-1"
                    data-value={stat.value.replace(/\D/g, "")}
                    data-suffix={stat.value.replace(/\d/g, "")}
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    0
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" aria-hidden="true" />
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div
              className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 p-6 md:p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 max-w-xs"
              aria-hidden="true"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Excellence Award</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">2024 Winner</p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Recognized for outstanding digital innovation and client satisfaction.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="heading-3 text-center text-neutral-900 dark:text-neutral-100 mb-12">
            Our Core Values
          </h3>
          <div className="values-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <article
                key={value.title}
                className="value-card card p-6 md:p-8 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  {value.icon}
                </div>
                <h4 className="heading-3 text-neutral-900 dark:text-neutral-100 mb-2">
                  {value.title}
                </h4>
                <p className="body text-neutral-600 dark:text-neutral-400">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}