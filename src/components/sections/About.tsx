import { useEffect, useMemo, useRef, useState } from "react";
import { Check, MousePointer2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import SocialCards from "@/components/ui/card-fan-carousel";
import { useLang } from "@/i18n/LanguageProvider";
import { useIsMobile } from "@/hooks/useIsMobile";

const PERK_VIDEOS = ["/code1.mp4", "/code2.mp4", "/code3.mp4", "/code4.mp4"];

/** Touch-friendly services grid for mobile (the desktop fan needs a mouse). */
function MobileServices({
  perks,
  videos,
}: {
  perks: { label: string; desc: string }[];
  videos: string[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {perks.map((perk, i) => (
        <div
          key={perk.label}
          className="relative min-h-[160px] overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/40"
        >
          <video
            src={videos[i % videos.length]}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1626] via-[#0D1626]/85 to-[#0D1626]/30" />
          <div className="relative flex h-full flex-col justify-end p-3">
            <span className="mb-1.5 grid h-7 w-7 place-items-center rounded-full border border-primary/30 bg-primary/15 text-xs font-bold text-primary">
              {i + 1}
            </span>
            <h3 className="font-display text-sm font-bold leading-tight text-white">
              {perk.label}
            </h3>
            <p className="mt-1 text-[11px] leading-snug text-white/75">
              {perk.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

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
  const isMobile = useIsMobile();

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
    <section id="services" className="relative py-14 sm:py-20">
      <div className="container-x">
        {/* About — "מי אני" with interactive 3D scene */}
        <Reveal>
          <Card className="relative w-full overflow-hidden rounded-3xl border-[#0D1626] bg-[#0D1626] shadow-2xl shadow-[#0D1626]/40">
            <Spotlight
              className="-top-40 left-0 md:-top-20 md:left-60"
              fill="#C9D4E4"
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
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#C9D4E4] to-[#2968DB] text-[#0D1626]">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-base font-medium text-neutral-200">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive 3D (lazy-mounted + paused off-screen).
                  On mobile: push the robot down so it sits at the bottom of
                  the black card instead of floating with empty space below. */}
              {/* Mobile: a FIXED height (not min-h) — without it the Spline
                  canvas inflates the container and the robot floats in a huge
                  empty area instead of sitting at the card's bottom. */}
              <Spline3D
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="relative h-[280px] overflow-hidden md:h-auto md:min-h-[520px] md:flex-1 [&_canvas]:!h-full [&_canvas]:!w-full [&_canvas]:!translate-y-[22%] md:[&_canvas]:!translate-y-0"
              />
            </div>
          </Card>
        </Reveal>

        {/* Services */}
        <div className="mt-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {t.about.servicesKicker}
            </span>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
              {t.about.servicesTitle}
            </h2>
            {!isMobile && (
              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MousePointer2 className="h-4 w-4" />
                {lang === "he" ? "רחפו על הכרטיסים" : "Hover the cards"}
              </p>
            )}
          </Reveal>

          {/* Service perks — fanned deck on desktop, touch-friendly grid on mobile */}
          <Reveal className="mt-8">
            {isMobile ? (
              <MobileServices perks={t.about.perks} videos={PERK_VIDEOS} />
            ) : (
              <SocialCards cards={fanCards} />
            )}
          </Reveal>

          {/* Service names */}
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {t.about.services.map((s) => (
              <span
                key={s.title}
                className="lift-3d inline-block rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-foreground/85 hover:border-primary/50 hover:text-foreground"
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
