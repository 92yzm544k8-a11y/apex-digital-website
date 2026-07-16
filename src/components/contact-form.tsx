"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".section-header", { opacity: 0, y: 16, scale: 0.97 }, {
          scrollTrigger: { trigger: "#contact .section-header", start: "top 93%", end: "top 55%", scrub: 0.5 },
          opacity: 1, y: 0, scale: 1, ease: "none",
        });
        gsap.fromTo(".contact-info", { opacity: 0, x: -16 }, {
          scrollTrigger: { trigger: "#contact", start: "top 85%", end: "top 55%", scrub: 0.5 },
          opacity: 1, x: 0, ease: "none",
        });
        gsap.fromTo("#contactForm", { opacity: 0, x: 16 }, {
          scrollTrigger: { trigger: "#contact", start: "top 85%", end: "top 55%", scrub: 0.5 },
          opacity: 1, x: 0, ease: "none",
        });
      }, sectionRef);
      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const btn = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ ¡Enviado!';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.pointerEvents = 'auto';
      (e.target as HTMLFormElement).reset();
    }, 2500);
  };

  return (
    <section id="contact" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-header">
          <div className="label">Contacto</div>
          <h2>¿Listo para implementar<br /><span className="gradient-text">Eryon</span> en tu negocio?</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Solicita un diagnóstico gratuito</h3>
            <p>Cuéntanos a qué te dedicas y en menos de 24 horas te presentamos la vertical Eryon Ops que necesita tu negocio, con una demo funcional y un plan de implementación claro.</p>
            <div className="contact-detail"><span className="icon">✉</span> eryon.mx@outlook.com</div>
            <div className="contact-detail"><span className="icon">📞</span> +52 (55) 4234 2675</div>
            <div className="contact-detail"><span className="icon">📍</span> San Luis Potosí, México</div>
          </div>
          <form id="contactForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="name" placeholder="Tu nombre" required />
              <label htmlFor="name">Tu nombre</label>
            </div>
            <div className="form-group">
              <input type="email" id="email" placeholder="Tu correo" required />
              <label htmlFor="email">Tu correo</label>
            </div>
            <div className="form-group">
              <input type="text" id="project" placeholder="¿A qué se dedica tu negocio?" />
              <label htmlFor="project">¿A qué se dedica tu negocio?</label>
            </div>
            <div className="form-group">
              <textarea id="message" placeholder="Cuéntanos sobre tu operación actual" required></textarea>
              <label htmlFor="message">Cuéntanos sobre tu operación actual</label>
            </div>
            <button type="submit" className="btn btn-primary" data-magnetic style={{ width: "100%", justifyContent: "center" }}>
              <span className="btn-bg"></span>
              <span className="btn-text">Quiero mi diagnóstico</span>
              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
