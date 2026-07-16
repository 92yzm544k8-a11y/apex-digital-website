"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  { id: "1", quote: "Eryon DealerOps transformó por completo nuestra operación. Pasamos de 5 sistemas aislados a una sola plataforma que controla inventario, taller, CRM y finanzas. Nuestro equipo vende el doble en la mitad del tiempo.", author: "Roberta Martínez", role: "Directora, Grupo Automotriz MX" },
  { id: "2", quote: "Llevábamos años buscando un sistema que entendiera cómo opera una asociación civil. Eryon CivicOps no solo nos dio control financiero total, sino que nos permitió conectar a nuestras familias, donadores y proyectos en un solo lugar.", author: "Andrés González", role: "Director, Intégrame Down AC" },
  { id: "3", quote: "Eryon LegalOps transformó la operación de nuestro despacho. Control de expedientes, diligencias automatizadas, facturación electrónica y dashboard de métricas en un solo sistema. Lo que antes nos tomaba días ahora lo hacemos en horas.", author: "Alejandro Villarreal", role: "Socio Director, AVK LegalOps" },
];

export function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".section-header", { opacity: 0, y: 16, scale: 0.97 }, {
          scrollTrigger: { trigger: "#testimonials .section-header", start: "top 93%", end: "top 55%", scrub: 0.5 },
          opacity: 1, y: 0, scale: 1, ease: "none",
        });
        gsap.utils.toArray(".testimonial-card").forEach((card: any) => {
          gsap.fromTo(card, { opacity: 0, y: 16, scale: 0.97 }, {
            scrollTrigger: { trigger: card, start: "top 93%", end: "top 55%", scrub: 0.5 },
            opacity: 1, y: 0, scale: 1, ease: "none",
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="testimonials" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-header centered">
          <div className="label">Resultados</div>
          <h2>Lo que dicen <span className="gradient-text">quienes</span><br /><span className="gradient-text">ya operan</span> con<br />Eryon.</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="quote">{t.quote}</div>
              <div className="author">
                <div className="author-avatar">{t.author.split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
                <div className="author-info">
                  <div className="name">{t.author}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
