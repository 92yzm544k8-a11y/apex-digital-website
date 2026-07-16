"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  features?: Feature[];
}

const defaultFeatures = [
  { icon: "🧩", title: "Modular y Escalable", description: "Más de 260 módulos funcionales en catálogo. Tu sistema crece contigo: empieza con lo esencial y agrega módulos cuando los necesites, sin límites." },
  { icon: "🔐", title: "Control de Acceso por Roles", description: "Cada usuario ve solo lo que necesita. Permisos granulares por módulo: dueño, gerente, vendedor, operativo, cliente. Seguridad desde el diseño." },
  { icon: "📊", title: "Datos que gobiernan", description: "Catálogos con 30 industrias y 453 comercios. KPIs contextuales, paneles dinámicos y herramientas de inteligencia de negocio integradas en cada módulo." },
  { icon: "⚡", title: "Demo Funcional en Días", description: "SPA vanilla con Liquid Glass UI, datos semilla y estado reiniciable. Implementamos tu vertical y la ponemos en tus manos para prueba en tiempo récord." },
  { icon: "🎨", title: "Liquid Glass UI", description: "Interfaz moderna con efectos de vidrio, navegación responsive (sidebar + bottom nav) y experiencia de usuario premium en desktop y móvil." },
  { icon: "🚀", title: "Lista para Producción", description: "Arquitectura PWA desplegable en Cloudflare Pages o Netlify. De la demo a producción sin fricción. Backend real cuando lo necesites (Supabase, Postgres + RLS)." },
];

export function Features({ features = defaultFeatures }: FeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".section-header", { opacity: 0, y: 16, scale: 0.97 }, {
          scrollTrigger: { trigger: "#features .section-header", start: "top 93%", end: "top 55%", scrub: 0.5 },
          opacity: 1, y: 0, scale: 1, ease: "none",
        });
        gsap.utils.toArray(".feature-card").forEach((card: any, i: number) => {
          gsap.fromTo(card, { opacity: 0, y: 20, scale: 0.96 }, {
            scrollTrigger: { trigger: card, start: "top 93%", end: "top 50%", scrub: 0.5 },
            opacity: 1, y: 0, scale: 1, ease: "none", delay: i * 0.03,
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="features" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-header">
          <div className="label">¿Por qué Eryon?</div>
          <h2>Una plataforma.<br /><span className="gradient-text">16 industrias</span>.<br />Infinitas posibilidades.</h2>
          <p>Detrás de cada vertical Eryon Ops hay una plataforma modular probada: Eryon OS. Misma arquitectura, misma calidad, personalizada al 100% para tu operación.</p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
