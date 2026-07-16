"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.3 });
        tl.fromTo("#hero .overline", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
          .fromTo("#hero h1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.4")
          .fromTo("#hero p", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .fromTo(".hero-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
          .fromTo(".scroll-indicator", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.2");

        gsap.to("#hero .hero-content", {
          scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.5 },
          y: 30, opacity: 0.7, ease: "none",
        });
      }, heroRef);
      return () => ctx.revert();
    },
    { scope: heroRef }
  );

  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-content">
        <div className="overline">Sistemas Operativos para tu Negocio</div>
        <h1>
          Implementamos<br />
          <span className="gradient-text">Eryon Ops</span><br />
          para tu industria.
        </h1>
        <p>No vendemos sitios web. Implementamos el sistema operativo que tu negocio necesita para operar, vender y crecer. 16 verticales especializadas, una plataforma modular, cien por ciento personalizable.</p>
        <div className="hero-buttons">
          <a href="/contact" className="btn btn-primary" data-magnetic>
            <span className="btn-bg"></span>
            <span className="btn-text">Solicitar diagnóstico gratuito</span>
            <span>→</span>
          </a>
          <a href="/services" className="btn btn-secondary" data-magnetic>
            <span className="btn-bg"></span>
            <span className="btn-text">Ver verticales</span>
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Desplázate</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
