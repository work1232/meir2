import { useEffect, useMemo, useRef, useState } from "react";
import { Check, MousePointer2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import SocialCards from "@/components/ui/card-fan-carousel";
import { useLang } from "@/i18n/LanguageProvider";

const PERK_VIDEOS = ["/code1.mp4", "/code2.mp4", "/code3.mp4", "/code4.mp4"];

type SplineApp = { play?: () => void; stop?: () => void };

/**
 * Loads the heavy Spline 3D scene only once it's about to enter the viewport,
 * and pauses its render loop while it's scrolled off-screen — both save a lot
 * of GPU/CPU without changing anything visible.
 */
function Spline3D({ scene, className }: { scene: string; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<SplineApp | null>(null);
  const visibleRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    // Preload the (heavy) scene shortly before it enters view.
    const mountIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          mountIo.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    mountIo.observe(el);

    // Run the render loop only while the scene is actually on screen.
    const playIo = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) appRef.current?.play?.();
        else appRef.current?.stop?.();
      },
      { rootMargin: "0px" }
    );
    playIo.observe(el);

    return () => {
      mountIo.disconnect();
      playIo.disconnect();
    };
  }, []);

  return (
    <div ref={hostRef} className={className}>
      {mounted ? (
        <SplineScene
          scene={scene}
          className="h-full w-full"
          onLoad={(app) => {
            appRef.current = app as SplineApp;
            if (visibleRef.current) appRef.current.play?.();
            else appRef.current.stop?.();
          }}
        />
      ) : null}
    </div>
  );
}

export function About() {
  const { t, lang } = useLang();

  // Memoize so the carousel's cards prop keeps a stable identity across
  // renders (otherwise its entry animation resets on every re-render).
  const fanCards = useMemo(
    () =>
      t.about.perks.map((perk, i) => ({
        videoUrl: PERK_VIDEOS[i % PERK_VIDEOS.length],
        title: perk.label,
        subtitle: perk.desc,
        alt: perk.label,
      })),
    [t]
  );

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-x">
        {/* About — "מי אני" with interactive 3D scene */}
        <Reveal>
          <Card className="relative w-full overflow-hidden rounded-3xl border-white/10 bg-black/[0.96] shadow-2xl shadow-black/60">
            <Spotlight
              className="-top-40 left-0 md:-top-20 md:left-60"
              fill="#b9a8ff"
            />

            <div className="flex flex-col md:flex-row">
              {/* Text */}
              <div className="relative z-10 flex flex-1 flex-col justify-center p-8 sm:p-10 md:p-12">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {t.about.kicker}
                </span>
                <h2 className="mt-5 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-bold leading-tight text-transparent sm:text-4xl md:text-5xl">
                  {t.about.title}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-300">
                  {t.about.body}
                </p>

                <ul className="mt-7 grid gap-3">
                  {t.about.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-[#5b3df5] text-white">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-base font-medium text-neutral-200">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive 3D (lazy-mounted + paused off-screen) */}
              <Spline3D
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="relative min-h-[320px] flex-1 md:min-h-[520px]"
              />
            </div>
          </Card>
        </Reveal>

        {/* Services */}
        <div className="mt-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {t.about.servicesKicker}
            </span>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
              {t.about.servicesTitle}
            </h2>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MousePointer2 className="h-4 w-4" />
              {lang === "he" ? "רחפו על הכרטיסים" : "Hover the cards"}
            </p>
          </Reveal>

          {/* Service perks — fanned deck of hover-play video cards */}
          <Reveal className="mt-8">
            <SocialCards cards={fanCards} />
          </Reveal>

          {/* Service names */}
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {t.about.services.map((s) => (
              <span
                key={s.title}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-foreground/85 transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
