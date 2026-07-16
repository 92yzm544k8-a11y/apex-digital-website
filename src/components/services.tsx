"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Vertical {
  icon: string;
  title: string;
  description: string;
}

interface ServicesProps {
  services?: Vertical[];
}

export const defaultServices: Vertical[] = [
  { icon: "⚖️", title: "Eryon LegalOps", description: "Despachos jurídicos" },
  { icon: "🏛️", title: "Eryon CivicOps", description: "Asociaciones Civiles / ONGs" },
  { icon: "🚗", title: "Eryon DealerOps", description: "Agencias Automotrices" },
  { icon: "🏪", title: "Eryon RetailOps", description: "Comercio Minorista" },
  { icon: "🍽️", title: "Eryon GastroOps", description: "Restaurantes / Alimentos" },
  { icon: "🏥", title: "Eryon MediOps", description: "Clínicas / Salud" },
  { icon: "🎓", title: "Eryon EduOps", description: "Educación / Academias" },
  { icon: "💰", title: "Eryon FinOps", description: "Finanzas / Contabilidad" },
  { icon: "🏠", title: "Eryon RealtyOps", description: "Bienes Raíces" },
  { icon: "🏭", title: "Eryon ManufOps", description: "Manufactura / Talleres" },
  { icon: "🚚", title: "Eryon LogiOps", description: "Logística / Transporte" },
  { icon: "💇", title: "Eryon SalonOps", description: "Belleza / Barberías" },
  { icon: "💪", title: "Eryon FitOps", description: "Gimnasios / Fitness" },
  { icon: "🏨", title: "Eryon HotelOps", description: "Hoteles / Hospedaje" },
  { icon: "🔨", title: "Eryon ConstOps", description: "Construcción" },
  { icon: "🧹", title: "Eryon CleanOps", description: "Limpieza / Mantenimiento" },
];

export function Services({ services = defaultServices }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".section-header", { opacity: 0, y: 16, scale: 0.97 }, {
          scrollTrigger: { trigger: "#services .section-header", start: "top 93%", end: "top 55%", scrub: 0.5 },
          opacity: 1, y: 0, scale: 1, ease: "none",
        });
        gsap.utils.toArray(".vertical-card").forEach((card: any) => {
          gsap.fromTo(card, { opacity: 0, y: 10, scale: 0.985 }, {
            scrollTrigger: { trigger: card, start: "top 95%", end: "top 60%", scrub: 0.3 },
            opacity: 1, y: 0, scale: 1, ease: "none",
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="services" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-header">
          <div className="label">Verticales</div>
          <h2>16 sistemas <span className="gradient-text">especializados</span><br />para tu industria.</h2>
          <p>Cada vertical Eryon está diseñada desde cero para resolver los problemas operativos, comerciales y financieros de tu sector. Elige la tuya.</p>
        </div>
        <div className="verticals-grid">
          {services.map((svc) => (
            <div key={svc.title} className="vertical-card">
              <div className="vertical-icon">{svc.icon}</div>
              <div className="vertical-info">
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
              </div>
              <span className="vertical-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
