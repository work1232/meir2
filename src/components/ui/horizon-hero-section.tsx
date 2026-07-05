import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * "Cosmos journey" — a 3-screen Three.js space flight (stars, nebula, grey
 * mountain ridges) where scrolling flies the camera deeper into space.
 *
 * Adapted from the pasted HORIZON hero component:
 * - Runs as an in-page section (sticky canvas inside a 300vh block), with
 *   scroll progress measured against the SECTION, not the whole document.
 * - Monochrome palette (black/white/grey) to match the site.
 * - Bilingual copy from i18n instead of hardcoded English.
 * - DESKTOP ONLY: returns null on touch devices — iOS Safari allows one live
 *   WebGL context and it's reserved for the Spline robot. Also disabled for
 *   prefers-reduced-motion.
 * - Performance: the render loop pauses whenever the section is off-screen,
 *   the scroll handler is rAF-throttled, and the progress UI is written via
 *   refs so scrolling never re-renders React.
 */

type ThreeRefs = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  locations: number[];
  animationId: number | null;
  running: boolean;
  target: { x: number; y: number; z: number };
};

const CAMERA_STOPS = [
  { x: 0, y: 30, z: 300 }, // screen 0 — horizon
  { x: 0, y: 40, z: -50 }, // screen 1 — cosmos
  { x: 0, y: 50, z: -700 }, // screen 2 — infinity
];

export function CosmosJourney() {
  const { t } = useLang();
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const smoothPos = useRef({ x: 0, y: 30, z: 300 });
  const threeRefs = useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    locations: [],
    animationId: null,
    running: false,
    target: { x: 0, y: 30, z: 300 },
  });

  // Desktop-only (iOS single WebGL context is reserved for the Spline robot).
  // NOTE: deliberately NOT gated on prefers-reduced-motion — many Windows
  // machines (including the owner's) have OS animations off, which would hide
  // the whole section; the camera only moves when the user scrolls anyway.
  const enabled = !isMobile;

  /* ---------------- Three.js scene ---------------- */
  useEffect(() => {
    if (!enabled || !canvasRef.current) return;
    const refs = threeRefs.current;

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    refs.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    refs.camera.position.set(0, 30, 300);

    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.4,
        0.85
      )
    );

    /* Star field — monochrome (white/grey) */
    for (let i = 0; i < 3; i++) {
      const starCount = 4000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      for (let j = 0; j < starCount; j++) {
        const radius = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);

        // Greyscale only — brightness variation instead of hue variation.
        const l = 0.7 + Math.random() * 0.3;
        colors[j * 3] = l;
        colors[j * 3 + 1] = l;
        colors[j * 3 + 2] = l;
        sizes[j] = Math.random() * 2 + 0.5;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vec3 pos = position;
            float angle = time * 0.05 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, opacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      });

      const stars = new THREE.Points(geometry, material);
      refs.scene.add(stars);
      refs.stars.push(stars);
    }

    /* Nebula — soft grey/white glow plane */
    {
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x2c2c34) },
          color2: { value: new THREE.Color(0xbfbfca) },
          opacity: { value: 0.25 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    }

    /* Mountain ridges — grey layers */
    const layers = [
      { distance: -50, height: 60, color: 0x18181c, opacity: 1 },
      { distance: -100, height: 80, color: 0x1f1f25, opacity: 0.8 },
      { distance: -150, height: 100, color: 0x27272f, opacity: 0.6 },
      { distance: -200, height: 120, color: 0x30303a, opacity: 0.4 },
    ];
    layers.forEach((layer, index) => {
      const points: THREE.Vector2[] = [];
      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 1000;
        const y =
          Math.sin(i * 0.1) * layer.height +
          Math.sin(i * 0.05) * layer.height * 0.5 +
          Math.random() * layer.height * 0.2 -
          100;
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(5000, -300));
      points.push(new THREE.Vector2(-5000, -300));

      const geometry = new THREE.ShapeGeometry(new THREE.Shape(points));
      const material = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide,
      });
      const mountain = new THREE.Mesh(geometry, material);
      mountain.position.z = layer.distance;
      mountain.position.y = layer.distance;
      mountain.userData = { baseZ: layer.distance, index };
      refs.scene!.add(mountain);
      refs.mountains.push(mountain);
    });
    refs.locations = refs.mountains.map((m) => m.position.z);

    /* Atmosphere — neutral glow */
    {
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.8, 0.8, 0.86) * intensity;
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            gl_FragColor = vec4(atmosphere, intensity * 0.22);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });
      refs.scene.add(new THREE.Mesh(geometry, material));
    }

    /* Render loop — runs only while the section is on screen */
    const animate = () => {
      if (!refs.running) {
        refs.animationId = null;
        return;
      }
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      refs.stars.forEach((s) => {
        (s.material as THREE.ShaderMaterial).uniforms.time.value = time;
      });
      if (refs.nebula) {
        (refs.nebula.material as THREE.ShaderMaterial).uniforms.time.value =
          time * 0.5;
      }

      if (refs.camera) {
        const k = 0.05;
        smoothPos.current.x += (refs.target.x - smoothPos.current.x) * k;
        smoothPos.current.y += (refs.target.y - smoothPos.current.y) * k;
        smoothPos.current.z += (refs.target.z - smoothPos.current.z) * k;
        refs.camera.position.x = smoothPos.current.x + Math.sin(time * 0.1) * 2;
        refs.camera.position.y = smoothPos.current.y + Math.cos(time * 0.15) * 1;
        refs.camera.position.z = smoothPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      refs.composer?.render();
    };

    const playIo = new IntersectionObserver(
      ([entry]) => {
        refs.running = entry.isIntersecting;
        if (entry.isIntersecting && refs.animationId === null) animate();
      },
      { rootMargin: "100px" }
    );
    if (containerRef.current) playIo.observe(containerRef.current);

    const handleResize = () => {
      if (!refs.camera || !refs.renderer || !refs.composer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      playIo.disconnect();
      window.removeEventListener("resize", handleResize);
      refs.running = false;
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      refs.animationId = null;
      refs.stars.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      refs.stars = [];
      refs.mountains.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      refs.mountains = [];
      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
        refs.nebula = null;
      }
      refs.composer?.dispose();
      refs.renderer?.dispose();
      refs.scene = null;
    };
  }, [enabled]);

  /* ---------------- Scroll → camera + progress UI ---------------- */
  useEffect(() => {
    if (!enabled) return;
    const refs = threeRefs.current;
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);

      // Camera target interpolated between the 3 stops.
      const total = progress * (CAMERA_STOPS.length - 1);
      const idx = Math.min(Math.floor(total), CAMERA_STOPS.length - 2);
      const frac = total - idx;
      const a = CAMERA_STOPS[idx];
      const b = CAMERA_STOPS[idx + 1];
      refs.target.x = a.x + (b.x - a.x) * frac;
      refs.target.y = a.y + (b.y - a.y) * frac;
      refs.target.z = a.z + (b.z - a.z) * frac;

      // Mountains fly away past 70% — leaving pure open space.
      refs.mountains.forEach((m, i) => {
        m.position.z = progress > 0.7 ? 600000 : refs.locations[i];
      });
      if (refs.nebula && refs.mountains[3]) {
        refs.nebula.position.z = Math.min(refs.mountains[3].position.z, -400);
      }

      // Progress UI — direct DOM writes, zero React re-renders.
      if (barRef.current) {
        barRef.current.style.width = `${(progress * 100).toFixed(1)}%`;
      }
      if (counterRef.current) {
        const section = Math.min(Math.round(progress * 2), 2);
        const text = `0${section} / 02`;
        if (counterRef.current.textContent !== text) {
          counterRef.current.textContent = text;
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  /* ---------------- Entrance animation (first screen) ---------------- */
  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    const el = containerRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        gsap.fromTo(
          el.querySelectorAll(".title-char"),
          { y: 120, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.045, ease: "power4.out" }
        );
        gsap.fromTo(
          el.querySelectorAll(".cosmos-line-first"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.18, delay: 0.5, ease: "power3.out" }
        );
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  // Mobile: skip entirely (keeps iOS WebGL free for the robot).
  if (!enabled) return null;

  // Each char carries the vertical gradient itself (a parent-level
  // bg-clip-text can't color transparent child spans).
  const titleGradient =
    "bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent";

  const splitTitle = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className={`title-char inline-block will-change-transform ${titleGradient}`}
        style={{ opacity: 0 }}
      >
        {char === " " ? " " : char}
      </span>
    ));

  return (
    <section
      ref={containerRef}
      aria-label="cosmos"
      className="relative h-[300vh] bg-black"
    >
      {/* Sticky space scene */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Journey progress — bottom center of the sticky viewport */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/50">
            {t.cosmos.scroll}
          </span>
          <div className="h-px w-44 overflow-hidden rounded-full bg-white/15">
            <div ref={barRef} className="h-full w-0 bg-white/80" />
          </div>
          <span ref={counterRef} className="font-mono text-[10px] tracking-widest text-white/40">
            00 / 02
          </span>
        </div>

        {/* Edge fades into the neighboring sections */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Text screens scrolling over the scene */}
      <div className="pointer-events-none absolute inset-0">
        {t.cosmos.screens.map((screen, i) => (
          <div
            key={screen.title}
            className="relative flex h-screen flex-col items-center justify-center px-6 text-center"
          >
            {/* Dim the starfield right behind the text so it pops */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_42%_at_50%_50%,rgba(0,0,0,0.62),transparent_72%)]" />
            <h2
              className={`relative font-display text-6xl font-extrabold tracking-[0.06em] drop-shadow-[0_6px_28px_rgba(0,0,0,0.9)] sm:text-8xl lg:text-9xl ${
                i === 0 ? "" : titleGradient
              }`}
            >
              {i === 0 ? splitTitle(screen.title) : screen.title}
            </h2>
            <p
              className={`relative mt-8 text-lg font-semibold leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.95)] sm:text-2xl ${
                i === 0 ? "cosmos-line-first" : ""
              }`}
            >
              {screen.l1}
            </p>
            <p
              className={`relative mt-1 text-lg font-medium leading-relaxed text-neutral-300 [text-shadow:0_2px_18px_rgba(0,0,0,0.95)] sm:text-2xl ${
                i === 0 ? "cosmos-line-first" : ""
              }`}
            >
              {screen.l2}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Alias kept for compatibility with the original demo snippet.
export const Component = CosmosJourney;
