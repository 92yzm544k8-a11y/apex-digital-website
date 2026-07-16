"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 12;

    let renderer!: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return; // WebGL not supported (e.g., Windows GPU driver, disabled)
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isLight = document.documentElement.getAttribute("data-theme") === "light";

    const ambient = new THREE.AmbientLight(isLight ? 0x8a8a96 : 0x343440, 0.8);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xf2df80, isLight ? 1.5 : 2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight(0xf2a194, isLight ? 0.6 : 1);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    const nnNodes: { mesh: THREE.Mesh; basePos: THREE.Vector3 }[] = [];
    const nnConnections: { a: number; b: number; strong: boolean }[] = [];
    const nnPulses: { connIdx: number; progress: number; speed: number; hue: number }[] = [];
    let nnLineSystem: { sys: THREE.LineSegments; conns: typeof nnConnections } | null = null;
    let nnLineSystemStrong: typeof nnLineSystem = null;
    const pulsePool: THREE.Sprite[] = [];
    const glowPool: THREE.Sprite[] = [];

    function makeGlowTex() {
      const c = document.createElement("canvas");
      c.width = 128; c.height = 128;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.08, "rgba(255,245,210,0.95)");
      g.addColorStop(0.25, "rgba(242,223,128,0.5)");
      g.addColorStop(0.5, "rgba(242,161,148,0.15)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    }
    const glowTex = makeGlowTex();

    const NN_NODES = 100;
    const CONNECT_DIST = 4.2;
    const HUB_COUNT = 12;
    const hubSet = new Set<number>();
    while (hubSet.size < HUB_COUNT) hubSet.add(Math.floor(Math.random() * NN_NODES));

    for (let i = 0; i < NN_NODES; i++) {
      const isHub = hubSet.has(i);
      const layer = Math.floor(Math.random() * 3);
      const zOff = (layer - 1) * 3;
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * (isHub ? 12 : 18),
        (Math.random() - 0.5) * (isHub ? 8 : 12),
        (Math.random() - 0.5) * (isHub ? 5 : 10) + zOff
      );
      const r = isHub ? 0.06 + Math.random() * 0.1 : 0.02 + Math.random() * 0.05;
      const geo = new THREE.SphereGeometry(r, isHub ? 16 : 8, isHub ? 16 : 8);
      const h = isHub ? 0.08 + Math.random() * 0.06 : 0.05 + Math.random() * 0.1;
      const sat = isHub ? 0.8 : 0.6 + Math.random() * 0.15;
      const light = isHub ? 0.65 : 0.4 + Math.random() * 0.2;
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(h, sat, isLight ? Math.min(light * 0.5, 0.45) : light),
        emissive: new THREE.Color().setHSL(h, 1, isLight ? Math.min(light * 0.35, 0.3) : light * 0.55),
        emissiveIntensity: isHub ? 0.6 : 0.2 + Math.random() * 0.3,
        metalness: isHub ? 0.3 : 0.1,
        roughness: isHub ? 0.2 : 0.4,
        transparent: true,
        opacity: isHub ? 0.9 : 0.5 + Math.random() * 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      mesh.userData = {
        hue: h, sat, isHub, layer,
        phase: Math.random() * Math.PI * 2,
        speed: 0.06 + Math.random() * 0.18,
        amp: 0.001 + Math.random() * 0.004,
        floatX: Math.random() * Math.PI * 2,
        floatY: Math.random() * Math.PI * 2,
        floatZ: Math.random() * Math.PI * 2,
        baseEmissive: mat.emissiveIntensity,
        fireTime: 0,
      };
      scene.add(mesh);
      nnNodes.push({ mesh, basePos: pos });
    }

    for (let i = 0; i < NN_NODES; i++) {
      for (let j = i + 1; j < NN_NODES; j++) {
        const dist = nnNodes[i].basePos.distanceTo(nnNodes[j].basePos);
        if (dist < CONNECT_DIST) {
          nnConnections.push({ a: i, b: j, strong: dist < CONNECT_DIST * 0.35 });
        }
      }
    }

    function buildLineSystem(conns: typeof nnConnections, color: number, opacity: number) {
      if (!conns.length) return null;
      const pos = new Float32Array(conns.length * 6);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      const sys = new THREE.LineSegments(geo, mat);
      scene.add(sys);
      return { sys, conns, pos };
    }

    const regular = nnConnections.filter(c => !c.strong);
    const strong = nnConnections.filter(c => c.strong);
    nnLineSystem = buildLineSystem(regular, 0xf2df80, 0.04) as any;
    nnLineSystemStrong = buildLineSystem(strong, 0xf2a194, 0.08) as any;

    for (let i = 0; i < 30; i++) {
      const cm = new THREE.SpriteMaterial({ map: glowTex, color: 0xffeedd, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      const core = new THREE.Sprite(cm);
      core.visible = false; core.scale.set(0.35, 0.35, 1);
      scene.add(core);
      pulsePool.push(core);
      const gm = new THREE.SpriteMaterial({ map: glowTex, color: 0xf2df80, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      const glow = new THREE.Sprite(gm);
      glow.visible = false; glow.scale.set(1.2, 1.2, 1);
      scene.add(glow);
      glowPool.push(glow);
    }

    // Particles
    const particleCount = 4000;
    const pPos = new Float32Array(particleCount * 3);
    const pCol = new Float32Array(particleCount * 3);
    const pSizes = new Float32Array(particleCount);
    const pSeeds: { h: number; s: number; l: number }[] = [];
    const pMeta: any[] = [];
    for (let i = 0; i < particleCount; i++) {
      const isWasp = i >= 2000;
      const range = isWasp ? 25 : 20;
      pPos[i * 3] = (Math.random() - 0.5) * range;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 5;
      const h = 0.02 + Math.random() * 0.12;
      const s = 0.6 + (isWasp ? Math.random() * 0.3 : 0);
      const l = 0.5 + Math.random() * 0.3;
      pSeeds.push({ h, s, l });
      const col = new THREE.Color().setHSL(h, s, isLight ? Math.min(l * 0.5, 0.4) : l);
      pCol[i * 3] = col.r; pCol[i * 3 + 1] = col.g; pCol[i * 3 + 2] = col.b;
      pSizes[i] = isWasp ? 0.03 + Math.random() * 0.08 : 0.015 + Math.random() * 0.04;
      if (isWasp) {
        pMeta.push({ type: 1, freq1: 0.4 + Math.random() * 1.8, freq2: 0.08 + Math.random() * 0.35, amp1: 0.002 + Math.random() * 0.005, amp2: 0.006 + Math.random() * 0.018, phase: Math.random() * Math.PI * 2, orbitSpeed: 0.1 + Math.random() * 0.3, orbitRadius: 2 + Math.random() * 6 });
      } else {
        pMeta.push({ type: 0, freq: 0.1 + Math.random() * 0.2, amp: 0.0003 + Math.random() * 0.0005, phase: Math.random() * Math.PI * 2 });
      }
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
    pGeo.setAttribute("size", new THREE.BufferAttribute(pSizes, 1));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, sizeAttenuation: true, depthWrite: false }));
    scene.add(particles);

    const clock = new THREE.Clock();
    let mouseX = 0, mouseY = 0;

    const handleMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener("mousemove", handleMouse);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    function updateLineSystemPos(ls: typeof nnLineSystem) {
      if (!ls) return;
      const lp = ls.sys.geometry.attributes.position.array;
      for (let c = 0; c < ls.conns.length; c++) {
        const { a, b } = ls.conns[c];
        const pA = nnNodes[a].mesh.position;
        const pB = nnNodes[b].mesh.position;
        const off = c * 6;
        lp[off] = pA.x; lp[off + 1] = pA.y; lp[off + 2] = pA.z;
        lp[off + 3] = pB.x; lp[off + 4] = pB.y; lp[off + 5] = pB.z;
      }
      ls.sys.geometry.attributes.position.needsUpdate = true;
    }

    let animId = 0;
    function animate() {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const tx = (-mouseX / window.innerWidth * 2 + 1) * 3;
      const ty = (mouseY / window.innerHeight * 2 - 1) * -2;
      camera.position.x += (tx - camera.position.x) * 0.02;
      camera.position.y += (ty - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      for (let i = 0; i < nnNodes.length; i++) {
        const { mesh, basePos } = nnNodes[i];
        const mat = mesh.material as THREE.MeshPhysicalMaterial;
        const d = mesh.userData;
        const ls = 1 + (d.layer - 1) * 0.15;
        mesh.position.x = basePos.x + Math.sin(t * d.speed + d.floatX) * d.amp * ls;
        mesh.position.y = basePos.y + Math.cos(t * d.speed * 0.7 + d.floatY) * d.amp * ls;
        mesh.position.z = basePos.z + Math.sin(t * d.speed * 0.5 + d.floatZ) * d.amp * ls * 0.5;
        if (d.isHub) {
          mesh.position.x += Math.sin(t * 0.1 + d.phase) * 0.08;
          mesh.position.y += Math.cos(t * 0.12 + d.phase * 1.3) * 0.08;
        }
        const bp = 0.5 + 0.5 * Math.sin(t * 0.6 + d.phase);
        const firing = Math.max(0, 1 - (t - d.fireTime) * 5);
        const intensity = d.baseEmissive * (0.5 + bp * 0.5 + (d.isHub ? 0.3 : 0) + firing * 1.2);
        mat.emissiveIntensity = intensity;
        const ob = d.isHub ? 0.9 : 0.5 + d.layer * 0.15;
        mat.opacity = Math.min(1, ob + bp * 0.2 + firing * 0.5);
        if (d.isHub) {
          const s = 1 + Math.sin(t * 0.5 + d.phase) * 0.06 + firing * 0.15;
          mesh.scale.setScalar(s);
        }
      }

      updateLineSystemPos(nnLineSystem);
      updateLineSystemPos(nnLineSystemStrong);

      if (Math.random() < 0.12 && nnConnections.length > 0) {
        const idx = Math.floor(Math.random() * nnConnections.length);
        const speed = 0.012 + Math.random() * 0.025;
        const hue = nnConnections[idx].strong ? 0.03 : 0.1;
        nnPulses.push({ connIdx: idx, progress: 0, speed, hue });
        if (nnPulses.length > pulsePool.length) nnPulses.shift();
      }
      if (Math.random() < 0.04 && nnConnections.length > 0) {
        const count = 2 + Math.floor(Math.random() * 2);
        for (let b = 0; b < count; b++) {
          const idx = Math.floor(Math.random() * nnConnections.length);
          nnPulses.push({ connIdx: idx, progress: Math.random() * 0.15, speed: 0.015 + Math.random() * 0.02, hue: nnConnections[idx].strong ? 0.03 : 0.1 });
          if (nnPulses.length > pulsePool.length) nnPulses.shift();
        }
      }

      for (let p = nnPulses.length - 1; p >= 0; p--) {
        const pulse = nnPulses[p];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          const conn = nnConnections[pulse.connIdx];
          nnNodes[conn.b].mesh.userData.fireTime = t;
          nnPulses.splice(p, 1);
          continue;
        }
        const conn = nnConnections[pulse.connIdx];
        nnNodes[conn.a].mesh.userData.fireTime = t;
        if (p < pulsePool.length) {
          const core = pulsePool[p];
          const glow = glowPool[p];
          const pA = nnNodes[conn.a].mesh.position;
          const pB = nnNodes[conn.b].mesh.position;
          const mid = new THREE.Vector3().lerpVectors(pA, pB, pulse.progress);
          const jit = Math.sin(pulse.progress * 40 + pulse.connIdx) * 0.015;
          const jit2 = Math.cos(pulse.progress * 35 + pulse.connIdx * 2) * 0.015;
          mid.x += jit; mid.y += jit2;
          core.position.copy(mid);
          core.visible = true;
          const intensity = Math.sin(pulse.progress * Math.PI);
          const si = 1 - Math.pow(1 - intensity, 2);
          const col = new THREE.Color().setHSL(pulse.hue, 0.8, 0.7 + si * 0.3);
          core.material.color.copy(col);
          core.material.opacity = 0.3 + si * 0.7;
          const cs = 0.2 + si * 0.5;
          core.scale.set(cs, cs, 1);
          const behind = Math.max(0, pulse.progress - 0.03);
          const bp2 = new THREE.Vector3().lerpVectors(pA, pB, behind);
          bp2.x += Math.sin(behind * 40 + pulse.connIdx) * 0.012;
          bp2.y += Math.cos(behind * 35 + pulse.connIdx * 2) * 0.012;
          glow.position.copy(bp2);
          glow.visible = true;
          const gm2 = Math.sin(behind * Math.PI);
          const gs2 = 1 - Math.pow(1 - gm2, 2);
          glow.material.color.setHSL(0.1, 0.5, 0.5 + gs2 * 0.3);
          glow.material.opacity = gs2 * 0.3;
          glow.scale.set(0.8 + gs2 * 1.4, 0.8 + gs2 * 1.4, 1);
        }
      }
      for (let p = nnPulses.length; p < pulsePool.length; p++) {
        pulsePool[p].visible = false;
        glowPool[p].visible = false;
      }

      const pp = particles.geometry.attributes.position.array;
      for (let i = 0; i < pMeta.length; i++) {
        const m = pMeta[i];
        if (m.type === 1) {
          pp[i * 3] += Math.sin(t * m.freq1 + m.phase) * m.amp1 + Math.sin(t * m.freq2) * m.amp2;
          pp[i * 3 + 1] += Math.cos(t * m.freq1 * 1.3 + m.phase) * m.amp1 + Math.sin(t * m.freq2 * 0.7 + m.phase) * m.amp2;
          pp[i * 3 + 2] += Math.sin(t * m.freq1 * 0.8 + m.phase * 1.5) * m.amp1 * 0.6 + Math.cos(t * m.orbitSpeed) * m.amp2 * 0.3;
        } else {
          pp[i * 3] += Math.cos(t * m.freq + m.phase) * m.amp;
          pp[i * 3 + 1] += Math.sin(t * m.freq * 0.8 + m.phase) * m.amp;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = Math.sin(t * 0.03) * 0.05;

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
