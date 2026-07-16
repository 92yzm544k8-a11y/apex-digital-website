"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo("footer", { opacity: 0, y: 12 }, {
          scrollTrigger: { trigger: "footer", start: "top 90%", end: "top 60%", scrub: 0.4 },
          opacity: 1, y: 0, ease: "none",
        });
      }, footerRef);
      return () => ctx.revert();
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef}>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="nav-logo"><span className="gradient-text">E</span>ryon</span>
            <p>Implementamos sistemas operativos para tu negocio. 16 verticales Eryon Ops impulsadas por Eryon OS, la plataforma modular que transforma la operación de las PyMEs mexicanas.</p>
          </div>
          <div className="footer-col">
            <h4>Verticales</h4>
            <a href="#">LegalOps</a>
            <a href="#">CivicOps</a>
            <a href="#">DealerOps</a>
            <a href="#">RetailOps</a>
            <a href="#">GastroOps</a>
            <a href="#">MediOps</a>
          </div>
          <div className="footer-col">
            <h4>Verticales</h4>
            <a href="#">EduOps</a>
            <a href="#">FinOps</a>
            <a href="#">RealtyOps</a>
            <a href="#">ManufOps</a>
            <a href="#">LogiOps</a>
            <a href="#">SalonOps</a>
          </div>
          <div className="footer-col">
            <h4>Más</h4>
            <a href="#">FitOps</a>
            <a href="#">HotelOps</a>
            <a href="#">ConstOps</a>
            <a href="#">CleanOps</a>
            <a href="/contact">Contacto</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Eryon. Todos los derechos reservados.</span>
          <div className="footer-socials">
            <a href="#">TW</a>
            <a href="#">LI</a>
            <a href="#">DR</a>
            <a href="#">GH</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
