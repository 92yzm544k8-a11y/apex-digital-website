"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  caseStudyLink?: string;
  results?: Array<{ label: string; value: string }>;
}

interface PortfolioProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
  showFilter?: boolean;
}

const categories = ["Todos", "Automotriz", "Asociaciones", "Comercio", "Salud", "Educación"];

export function Portfolio({
  projects,
  title = "Verticales en Acción",
  subtitle = "Dos de nuestras 16 verticales ya operan como sistemas funcionales. El resto están listas para implementarse en tu negocio.",
  showFilter = true,
}: PortfolioProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !gridRef.current || !filterRef.current) return;

      const filterEl = filterRef.current;
      const gridEl = gridRef.current;
      const containerEl = containerRef.current;

      const ctx = gsap.context(() => {
        // @ts-ignore - GSAP fromTo with array targets has complex type signatures
        gsap.fromTo(
          filterEl.querySelectorAll(".filter-btn"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // @ts-ignore - GSAP fromTo with array targets has complex type signatures
        gsap.fromTo(
          gridEl.querySelectorAll(".project-card"),
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridEl,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, containerEl);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="section bg-neutral-50 dark:bg-neutral-950"
      aria-labelledby="portfolio-heading"
    >
      <div className="container">
        <header className="section-header mb-12">
          <h2 id="portfolio-heading" className="heading-2 text-neutral-900 dark:text-neutral-100">
            {title}
          </h2>
          <p className="body-lg text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        </header>

        {showFilter && (
          <div
            ref={filterRef}
            className="flex flex-wrap justify-center gap-3 mb-12"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {categories.map((category, index) => (
              <button
                key={category}
                role="tab"
                aria-selected={index === 0}
                aria-controls={`${category.toLowerCase().replace(/\s+/g, "-")}-panel`}
                className={`filter-btn px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  index === 0
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          role="list"
          aria-label="Projects"
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-card glass-card relative overflow-hidden group"
              role="listitem"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 py-2 px-4 bg-gradient-to-t from-neutral-900/60 to-transparent">
                  <span className="text-xs text-white/70 flex items-center gap-1 group-hover:opacity-0 transition-opacity duration-200">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    Ver detalle
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="heading-3 text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex gap-3">
                    {project.caseStudyLink && (
                      <a
                        href={project.caseStudyLink}
                        className="btn btn-primary text-sm px-4 py-2"
                      >
                        Caso de Estudio
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        className="btn btn-ghost text-sm px-4 py-2 text-white border-white/30 hover:bg-white/10"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Sitio Web
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <h3 className="heading-3 text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="body text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {project.results && project.results.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    {project.results.map((result) => (
                      <div key={result.label} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500" aria-hidden="true" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">{result.value}</span>
                          {' '}{result.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/work" className="btn btn-secondary">
            Ver Todos los Proyectos
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}