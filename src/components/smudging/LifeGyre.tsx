import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./life-gyre.css";

export type LifeGyreProps = {
  className?: string;
  particleCount?: number;
  background?: string;
  particleColor?: string;
  accentColor?: string;
  speed?: number;
  smudgeRadius?: number;
  smudgeStrength?: number;
  clarityDuration?: number;
  showInterface?: boolean;
  thoughts?: string[];
  onClarityChange?: (clarity: number) => void;
  interactive?: boolean;
};

type SmudgePoint = {
  x: number;
  y: number;
  born: number;
  strength: number;
};

const DEFAULT_THOUGHTS = [
  "REPLY",
  "RENT",
  "DEADLINE",
  "CALL BACK",
  "PASSWORD",
  "FOLLOW UP",
  "INBOX",
  "APPOINTMENT",
  "WHAT NEXT?",
  "DON'T FORGET",
  "PAYMENT DUE",
  "UPDATE",
  "BUY",
  "POST",
  "PLAN",
  "DECIDE",
  "CATCH UP",
  "BE PRODUCTIVE",
];

/**
 * LIFE GYRE
 * An interactive visual metaphor for cognitive overload.
 * Move slowly to clear space. Hold/click to create a stronger "singing bowl" pulse.
 */
export function LifeGyre({
  className = "",
  particleCount = 6500,
  background = "#090908",
  particleColor = "#c8c1ad",
  accentColor = "#d6b56d",
  speed = 0.31,
  smudgeRadius = 1.05,
  smudgeStrength = 0.22,
  clarityDuration = 10,
  showInterface = true,
  thoughts = DEFAULT_THOUGHTS,
  onClarityChange,
  interactive = true,
}: LifeGyreProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [clarity, setClarity] = useState(0);
  const [isSmudging, setIsSmudging] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(background);

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    camera.position.set(0, 0, 7.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.prepend(renderer.domElement);

    const positions = new Float32Array(particleCount * 3);
    const base = new Float32Array(particleCount * 3);
    const velocity = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);
    const weights = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 0.6) * 5.2 + 0.12;
      const angle = Math.random() * Math.PI * 2;
      const arm = (i % 7) * ((Math.PI * 2) / 7);
      const spiral = angle + arm + radius * 1.62;
      const vertical = (Math.random() - 0.5) * (1.45 + radius * 0.18);

      const x = Math.cos(spiral) * radius;
      const y = vertical;
      const z = Math.sin(spiral) * radius * 0.7;

      positions[i3] = base[i3] = x;
      positions[i3 + 1] = base[i3 + 1] = y;
      positions[i3 + 2] = base[i3 + 2] = z;
      phases[i] = Math.random() * Math.PI * 2;
      weights[i] = 0.25 + Math.random() * 1.1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aWeight", new THREE.BufferAttribute(weights, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color(particleColor) },
        uPixelRatio: { value: pixelRatio },
      },
      vertexShader: `
        attribute float aWeight;
        uniform float uPixelRatio;
        varying float vAlpha;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float depthFade = smoothstep(12.0, 1.0, -mvPosition.z);
          gl_PointSize = (0.9 + aWeight * 2.15) * uPixelRatio * (7.2 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = (0.12 + aWeight * 0.6) * depthFade;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
          vec2 p = gl_PointCoord - 0.5;
          float d = length(p);
          float core = smoothstep(0.48, 0.0, d);
          float glow = exp(-12.0 * d * d);
          float alpha = (core * 0.7 + glow * 0.42) * vAlpha;
          if (alpha < 0.012) discard;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });

    const cloud = new THREE.Points(geometry, material);
    cloud.rotation.x = -0.12;
    scene.add(cloud);

    const pointerNdc = new THREE.Vector2(20, 20);
    const pointerWorld = new THREE.Vector3(20, 20, 0);
    const raycaster = new THREE.Raycaster();
    const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const smudgeTrail: SmudgePoint[] = [];
    let pointerInside = false;
    let pointerDown = false;
    let lastTrailTime = 0;
    let lastUiUpdate = 0;

    const updatePointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerNdc.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(pointerNdc, camera);
      raycaster.ray.intersectPlane(zPlane, pointerWorld);
      pointerInside = true;
      host.style.setProperty("--cursor-x", `${event.clientX - rect.left}px`);
      host.style.setProperty("--cursor-y", `${event.clientY - rect.top}px`);
    };

    const addSmudgePoint = (strength = 1) => {
      const now = performance.now() / 1000;
      if (!pointerInside || now - lastTrailTime < 0.035) return;
      smudgeTrail.push({
        x: pointerWorld.x,
        y: pointerWorld.y,
        born: now,
        strength,
      });
      lastTrailTime = now;
      if (smudgeTrail.length > 180) smudgeTrail.shift();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!interactive) return;
      updatePointer(event);
      addSmudgePoint(pointerDown ? 1.8 : 1);
    };
    const onPointerEnter = (event: PointerEvent) => {
      if (!interactive) return;
      updatePointer(event);
      pointerInside = true;
    };
    const onPointerLeave = () => {
      pointerInside = false;
      pointerDown = false;
      setIsSmudging(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!interactive) return;
      updatePointer(event);
      pointerDown = true;
      setIsSmudging(true);
      addSmudgePoint(3.5);
      host.classList.remove("life-gyre--pulse");
      void host.offsetWidth;
      host.classList.add("life-gyre--pulse");
    };
    const onPointerUp = () => {
      pointerDown = false;
      setIsSmudging(false);
    };

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerenter", onPointerEnter);
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const now = performance.now() / 1000;
      const t = clock.getElapsedTime() * (reducedMotion ? 0.045 : speed);
      const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const array = attr.array as Float32Array;

      for (let s = smudgeTrail.length - 1; s >= 0; s--) {
        if (now - smudgeTrail[s].born > clarityDuration) smudgeTrail.splice(s, 1);
      }

      let displaced = 0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const bx = base[i3];
        const by = base[i3 + 1];
        const bz = base[i3 + 2];
        const radius = Math.sqrt(bx * bx + bz * bz) + 0.001;
        const phase = phases[i];
        const localSpin = t * (0.48 + 1.35 / (radius + 0.72));
        const angle = Math.atan2(bz, bx) + localSpin;
        const breathing = 1 + Math.sin(t * 0.72 + phase + radius) * 0.05;
        const turbulence = Math.sin(t * 1.9 + phase + radius * 2.25) * 0.18;

        let tx = Math.cos(angle) * radius * breathing;
        let ty = by + turbulence + Math.sin(angle * 2 + phase) * 0.1;
        let tz = Math.sin(angle) * radius * 0.7 * breathing;

        let forceX = 0;
        let forceY = 0;

        for (let s = 0; s < smudgeTrail.length; s++) {
          const point = smudgeTrail[s];
          const age = now - point.born;
          const life = Math.max(0, 1 - age / clarityDuration);
          const dx = tx - point.x;
          const dy = ty - point.y;
          const distSq = dx * dx + dy * dy;
          const radiusNow = smudgeRadius * (0.88 + point.strength * 0.12);

          if (distSq < radiusNow * radiusNow) {
            const dist = Math.sqrt(distSq) + 0.001;
            const falloff = 1 - dist / radiusNow;
            const force = falloff * falloff * point.strength * life * smudgeStrength;
            forceX += (dx / dist) * force;
            forceY += (dy / dist) * force;
          }
        }

        if (pointerInside) {
          const dx = tx - pointerWorld.x;
          const dy = ty - pointerWorld.y;
          const distSq = dx * dx + dy * dy;
          const liveRadius = smudgeRadius * (pointerDown ? 1.35 : 0.78);
          if (distSq < liveRadius * liveRadius) {
            const dist = Math.sqrt(distSq) + 0.001;
            const falloff = 1 - dist / liveRadius;
            const force = falloff * falloff * smudgeStrength * (pointerDown ? 5.5 : 2.2);
            forceX += (dx / dist) * force;
            forceY += (dy / dist) * force;
          }
        }

        velocity[i3] = velocity[i3] * 0.9 + forceX;
        velocity[i3 + 1] = velocity[i3 + 1] * 0.9 + forceY;
        velocity[i3 + 2] *= 0.91;

        array[i3] += (tx + velocity[i3] - array[i3]) * 0.045;
        array[i3 + 1] += (ty + velocity[i3 + 1] - array[i3 + 1]) * 0.045;
        array[i3 + 2] += (tz + velocity[i3 + 2] - array[i3 + 2]) * 0.045;

        const displacement = Math.abs(velocity[i3]) + Math.abs(velocity[i3 + 1]);
        if (displacement > 0.025) displaced++;
      }

      if (now - lastUiUpdate > 0.18) {
        const trailScore = Math.min(1, smudgeTrail.length / 90);
        const displacementScore = Math.min(1, displaced / (particleCount * 0.24));
        const nextClarity = Math.round((trailScore * 0.62 + displacementScore * 0.38) * 100);
        setClarity(nextClarity);
        onClarityChange?.(nextClarity);
        lastUiUpdate = now;
      }

      attr.needsUpdate = true;
      cloud.rotation.z = Math.sin(t * 0.17) * 0.085;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [
    background,
    clarityDuration,
    particleColor,
    particleCount,
    smudgeRadius,
    smudgeStrength,
    speed,
    interactive,
    onClarityChange,
  ]);

  return (
    <section
      ref={hostRef}
      className={`life-gyre ${isSmudging ? "is-smudging" : ""} ${!interactive ? "life-gyre--passive" : ""} ${className}`.trim()}
      style={{ "--gyre-accent": accentColor } as React.CSSProperties}
      aria-label="Life Gyre: an interactive visualization of modern cognitive overload"
      aria-disabled={!interactive}
    >
      <div className="life-gyre__landscape" aria-hidden="true" />
      <div className="life-gyre__vignette" aria-hidden="true" />
      <div className="life-gyre__cursor" aria-hidden="true" />
      <div className="life-gyre__pulse" aria-hidden="true" />

      <div className="life-gyre__thoughts" aria-hidden="true">
        {thoughts.map((thought, index) => (
          <span
            key={`${thought}-${index}`}
            style={
              {
                "--i": index,
                "--x": `${8 + ((index * 37) % 84)}%`,
                "--y": `${9 + ((index * 53) % 78)}%`,
                "--r": `${-18 + ((index * 17) % 36)}deg`,
              } as React.CSSProperties
            }
          >
            {thought}
          </span>
        ))}
      </div>

      {showInterface && (
        <>
          <header className="life-gyre__header">
            <p className="life-gyre__eyebrow">DIGITAL SMUDGING · AN ATTENTION RITUAL</p>
            <h1>Life Gyre</h1>
            <p>
              The modern mind rarely rests. Move slowly through the noise to make room.
              Press and hold to ring the field clear.
            </p>
          </header>

          <div className="life-gyre__clarity" aria-live="polite">
            <span>OPEN SPACE</span>
            <strong>{clarity}%</strong>
            <div className="life-gyre__meter" aria-hidden="true">
              <i style={{ width: `${clarity}%` }} />
            </div>
          </div>

          <footer className="life-gyre__instruction">
            <span className="life-gyre__instruction-mark">○</span>
            <span>Move to smudge · hold to resonate · release to let life return</span>
          </footer>
        </>
      )}
    </section>
  );
}
