"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    };

    const onHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, .glass-card, input, textarea, select, [data-cursor='hover']"
      );
      ring.classList.toggle("is-hovering", !!target);
    };

    const onDown = () => dot.classList.add("is-clicking");
    const onUp = () => dot.classList.remove("is-clicking");

    function animate() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring!.style.left = ringX + "px";
      ring!.style.top = ringY + "px";
      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseover", onHover);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseover", onHover);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return null;
}
