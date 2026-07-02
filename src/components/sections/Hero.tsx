import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { useLang } from "@/i18n/LanguageProvider";

export function Hero() {
  const { t, lang } = useLang();
  const Arrow = lang === "he" ? ArrowLeft : ArrowRight;

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Video background */}
      <BackgroundVideo
        src="/8523640-hd_1920_1080_25fps.mp4"
        poster="/website.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="absolute inset-0 halo" />
      <div className="pointer-events-none absolute inset-0 grain" />

      {/* Content */}
      <div className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm font-medium text-foreground/90">
            {t.hero.badge}
          </span>
        </motion.div>

        <h1 className="mx-auto max-w-5xl text-center text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.hero.titleTop}
          </motion.span>
          <motion.span
            className="block text-gradient-primary"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.hero.titleAccent}
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.hero.titleBottom}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-7 max-w-2xl text-center text-base text-muted-foreground sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
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
          <a href="#work">
            <GlassButton size="lg" contentClassName="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {t.hero.ctaSecondary}
            </GlassButton>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16 grid w-full max-w-2xl grid-cols-3 gap-4"
        >
          {t.hero.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-5 text-center backdrop-blur-sm"
            >
              <div className="font-display text-2xl font-bold text-foreground sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
