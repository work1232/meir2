import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { TiltCard } from "@/components/TiltCard";
import { Magnetic } from "@/components/Magnetic";
import { useLang } from "@/i18n/LanguageProvider";

export function Hero() {
  const { t, lang } = useLang();
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;

  /* --- 3D journey: fly-through depth -------------------------------- */
  // As the visitor scrolls away from the hero, the title lines separate in
  // depth — the top line rushes toward the camera fastest, the bottom line
  // slowest — like flying THROUGH the headline into the site.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const s1 = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const s2 = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const s3 = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const depth = (y: typeof y1, scale: typeof s1) => ({
    y,
    scale,
    opacity: fade,
  });

  /* --- 3D journey: mouse parallax (desktop only) --------------------- */
  const parallaxRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = parallaxRef.current;
    if (!el) return;
    const mx = e.clientX / window.innerWidth - 0.5;
    const my = e.clientY / window.innerHeight - 0.5;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1200px) rotateX(${(-my * 2).toFixed(
        2
      )}deg) rotateY(${(mx * 2).toFixed(2)}deg)`;
    });
  };
  const onPointerLeave = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    if (parallaxRef.current) parallaxRef.current.style.transform = "";
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Video background */}
      <BackgroundVideo
        src="/8523640-hd_1920_1080_25fps.mp4"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlays — warm espresso wash, fading into the cream page below */}
      <div className="absolute inset-0 bg-[#0D1626]/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1626]/50 via-[#0D1626]/55 to-background" />
      <div className="absolute inset-0 halo" />
      <div className="pointer-events-none absolute inset-0 grain" />

      {/* Content (mouse-parallax target on desktop) */}
      <div
        ref={parallaxRef}
        className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pt-24 pb-14 transition-transform duration-200 ease-out will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <span className="text-sm font-medium text-white/90">
            {t.hero.badge}
          </span>
        </motion.div>

        <h1 className="mx-auto max-w-5xl text-center text-4xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          {/* Outer spans: scroll-linked depth (each line at a different
              "distance"). Inner spans: the one-time entrance animation. */}
          <motion.span className="block" style={depth(y1, s1)}>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.hero.titleTop}
            </motion.span>
          </motion.span>
          <motion.span className="block" style={depth(y2, s2)}>
            <motion.span
              className="block text-gradient-primary"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.hero.titleAccent}
            </motion.span>
          </motion.span>
          <motion.span className="block" style={depth(y3, s3)}>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.hero.titleBottom}
            </motion.span>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-7 max-w-2xl text-center text-base text-white/75 sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a href="#contact">
              <GlassButton
                className="glass-primary"
                size="lg"
                contentClassName="flex items-center gap-2"
              >
                {t.hero.ctaPrimary}
                <Arrow className="h-5 w-5" />
              </GlassButton>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#work">
              <GlassButton size="lg" contentClassName="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {t.hero.ctaSecondary}
              </GlassButton>
            </a>
          </Magnetic>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-10 grid w-full max-w-2xl grid-cols-3 gap-4"
        >
          {t.hero.stats.map((s) => (
            <TiltCard
              key={s.label}
              max={12}
              className="rounded-2xl border border-white/15 bg-white/[0.06] px-3 py-5 text-center"
            >
              <div className="font-display text-2xl font-bold text-white sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-white/65 sm:text-sm">
                {s.label}
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>

      {/* bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
