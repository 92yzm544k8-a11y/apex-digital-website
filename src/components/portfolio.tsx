"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  gradient: string;
  hint?: string;
}

interface PortfolioProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  { id: "1", title: "Eryon DealerOps", description: "Sistema para agencias automotrices — SemiPro", gradient: "linear-gradient(135deg,#1B3A4B,#1E7A9A)", hint: "Ver proyecto" },
  { id: "2", title: "Eryon CivicOps", description: "Sistema para asociaciones civiles — Intégrame Down AC", gradient: "linear-gradient(135deg,#2d6a4f,#52b788)", hint: "Ver proyecto" },
  { id: "3", title: "Tu Vertical Aquí", description: "Cualquiera de las 14 restantes — Personalizada para ti", gradient: "linear-gradient(135deg,#343440,#8c6b42)", hint: "Disponible" },
  { id: "4", title: "¿Otra Industria?", description: "Construimos la vertical que tu negocio necesita", gradient: "linear-gradient(135deg,#8c6b42,#f2df80)", hint: "Contáctanos" },
];

export function Portfolio({ projects = defaultProjects }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".section-header", { opacity: 0, y: 16, scale: 0.97 }, {
          scrollTrigger: { trigger: "#portfolio .section-header", start: "top 93%", end: "top 55%", scrub: 0.5 },
          opacity: 1, y: 0, scale: 1, ease: "none",
        });
        gsap.utils.toArray(".portfolio-item").forEach((item: any) => {
          gsap.fromTo(item, { opacity: 0, y: 16, scale: 0.97 }, {
            scrollTrigger: { trigger: item, start: "top 93%", end: "top 55%", scrub: 0.5 },
            opacity: 1, y: 0, scale: 1, ease: "none",
          });
          gsap.to(item.querySelector(".portfolio-bg"), {
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 0.5 },
            y: "-8%", ease: "none",
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="portfolio" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-header centered">
          <div className="label">Implementaciones Reales</div>
          <h2>Verticales <span className="gradient-text">en acción</span>.</h2>
          <p>Dos de nuestras 16 verticales ya operan como sistemas funcionales. El resto están listas para implementarse en tu negocio.</p>
        </div>
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-item">
              <div className="portfolio-bg" style={{ backgroundImage: project.gradient }}></div>
              <div className="portfolio-overlay">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="portfolio-hint">{project.hint || "Ver proyecto"}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
