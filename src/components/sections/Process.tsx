import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessagesSquare,
  Compass,
  PenTool,
  Code2,
  Rocket,
  LifeBuoy,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { useLang } from "@/i18n/LanguageProvider";

// One icon per step, in step order (reference: NEXARCH numbered process row).
const STEP_ICONS = [MessagesSquare, Compass, PenTool, Code2, Rocket, LifeBuoy];

export function Process() {
  const { t } = useLang();

  // "The road": a white light-line draws itself along the steps as the
  // visitor scrolls through — showing the distance travelled on the journey.
  const roadRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: roadRef,
    offset: ["start 85%", "end 55%"],
  });
  const roadScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background video — "code" */}
      <BackgroundVideo
        src="/code.mp4"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.7]"
      />
      <div className="absolute inset-0 bg-background/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/35 to-background" />

      <div className="container-x relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {t.process.kicker}
          </span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
            {t.process.title}
          </h2>
        </Reveal>

        <div ref={roadRef} className="relative mt-16">
          {/* connecting line (faint base track) */}
          <div className="absolute inset-x-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
          {/* the light-line that draws with scroll */}
          <motion.div
            aria-hidden="true"
            style={{ scaleX: roadScale }}
            className="absolute inset-x-0 top-8 hidden h-px origin-left bg-gradient-to-r from-white/0 via-white/70 to-white/0 shadow-[0_0_12px_rgba(255,255,255,0.35)] rtl:origin-right lg:block"
          />

          <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {t.process.steps.map((step, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <Reveal key={step.no} delay={i * 0.08}>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-background text-white shadow-lg shadow-black/40">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                      <span className="absolute inset-0 rounded-full bg-primary/10 blur-md" />
                    </div>
                    <span className="mt-4 font-mono text-xs font-bold tracking-widest text-neutral-400">
                      {step.no}
                    </span>
                    <h3 className="mt-2 text-base font-bold [text-shadow:0_2px_10px_rgba(0,0,0,0.7)] lg:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/75 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
