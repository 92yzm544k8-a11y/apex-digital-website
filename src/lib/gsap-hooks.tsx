"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return <>{children}</>;
}

export function useScrollAnimation(
  triggerRef: React.RefObject<HTMLElement | null>,
  animationConfig: gsap.TweenVars,
  scrollTriggerConfig?: Record<string, unknown>
) {
  useGSAP(
    () => {
      if (!triggerRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          triggerRef.current!,
          { opacity: 0, y: 50, ...animationConfig },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              ...scrollTriggerConfig,
            },
          }
        );
      }, triggerRef);

      return () => ctx.revert();
    },
    { scope: triggerRef }
  );
}

export function useStaggerAnimation(
  containerRef: React.RefObject<HTMLElement | null>,
  itemSelector: string,
  animationConfig: gsap.TweenVars = {},
  scrollTriggerConfig?: Record<string, unknown>
) {
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          itemSelector,
          { opacity: 0, y: 30, ...animationConfig },
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
              ...scrollTriggerConfig,
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );
}

export function useParallax(
  elementRef: React.RefObject<HTMLElement | null>,
  speed: number = 0.5
) {
  useGSAP(
    () => {
      if (!elementRef.current) return;

      const ctx = gsap.context(() => {
        gsap.to(elementRef.current, {
          yPercent: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, elementRef);

      return () => ctx.revert();
    },
    { scope: elementRef }
  );
}

export function usePin(
  triggerRef: React.RefObject<HTMLElement | null>,
  pinConfig: Record<string, unknown> = {}
) {
  useGSAP(
    () => {
      if (!triggerRef.current) return;

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: triggerRef.current,
          pin: true,
          start: "top top",
          end: "+=500",
          pinSpacing: true,
          ...pinConfig,
        });
      }, triggerRef);

      return () => ctx.revert();
    },
    { scope: triggerRef }
  );
}

export function useTextReveal(
  elementRef: React.RefObject<HTMLElement | null>,
  options: {
    type?: "lines" | "words" | "chars";
    delay?: number;
    duration?: number;
    stagger?: number;
  } = {}
) {
  const { type = "lines", delay = 0, duration = 1, stagger = 0.05 } = options;

  useGSAP(
    () => {
      if (!elementRef.current) return;

      const ctx = gsap.context(() => {
        const elements = elementRef.current!.querySelectorAll(
          type === "lines" ? ".reveal-line" : type === "words" ? ".reveal-word" : ".reveal-char"
        );

        if (elements.length === 0) {
          const text = elementRef.current!.textContent || "";
          elementRef.current!.innerHTML = text
            .split(type === "lines" ? "\n" : type === "words" ? " " : "")
            .map(
              (part) =>
                `<span class="reveal-${type.slice(0, -1)}" style="display: inline-block; opacity: 0; transform: translateY(100%);">${part}${
                  type === "words" ? " " : type === "lines" ? "<br>" : ""
                }</span>`
            )
            .join("");
        }

        gsap.to(elementRef.current!.querySelectorAll(`.reveal-${type.slice(0, -1)}`), {
          opacity: 1,
          y: 0,
          duration,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }, elementRef);

      return () => ctx.revert();
    },
    { scope: elementRef }
  );
}