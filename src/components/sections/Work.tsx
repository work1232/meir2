import { useEffect, useRef, useState } from "react";
import { MoveHorizontal, ArrowUpRight } from "lucide-react";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";
import { GlassButton } from "@/components/ui/glass-button";
import { Magnetic } from "@/components/Magnetic";
import { Panel3D } from "@/components/Panel3D";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LanguageProvider";

const FEATURED_URL = "https://yosi1223.github.io/work/";
const FEATURED_HOST = "yosi1223.github.io/work";

export function Work() {
  const { t } = useLang();

  // Mount the live external site only when the user scrolls near it — a full
  // site running in an iframe from page load is a real drag on smoothness.
  const frameHostRef = useRef<HTMLDivElement>(null);
  const [frameReady, setFrameReady] = useState(false);

  useEffect(() => {
    const el = frameHostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFrameReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[420px] max-w-4xl -translate-y-1/2 rounded-full bg-primary/15 blur-[140px]" />

      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {t.work.kicker}
          </span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
            {t.work.title}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t.work.desc}</p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-5xl">
          <Panel3D from={-9}>
          <div className="rounded-[2rem] border border-black/10 bg-white p-2 shadow-2xl shadow-[#2E1E15]/15 sm:p-3">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <ImageComparison
                className="aspect-[16/10] w-full bg-[#0d0d14]"
                enableHover
                springOptions={{ stiffness: 280, damping: 32 }}
              >
                {/* AFTER — the finished website (shows on the right) */}
                <ImageComparisonImage
                  src="/website.jpg"
                  alt={t.work.after}
                  position="left"
                  className="object-cover object-center"
                />
                {/* BEFORE — the blank browser (shows on the left) */}
                <ImageComparisonImage
                  src="/white.jpg"
                  alt={t.work.before}
                  position="right"
                  className="object-cover object-top"
                />

                {/* Labels */}
                <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-md">
                  {t.work.before}
                </div>
                <div className="pointer-events-none absolute right-4 top-4 z-20 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  {t.work.after}
                </div>

                <ImageComparisonSlider className="w-0.5 bg-white/70 backdrop-blur-sm">
                  <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/90 text-[#0d0d14] shadow-xl shadow-black/40">
                    <MoveHorizontal className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                </ImageComparisonSlider>
              </ImageComparison>
            </div>
          </div>
          </Panel3D>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            <MoveHorizontal className="me-1 inline h-4 w-4 align-text-bottom" />
            {t.work.hint}
          </p>
        </Reveal>

        {/* Featured live project ------------------------------------------ */}
        <div className="mx-auto mt-24 max-w-5xl">
          <Reveal className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {t.work.featuredKicker}
              </span>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                {t.work.featuredTitle}
              </h3>
              <p className="mt-3 max-w-xl text-muted-foreground">
                {t.work.featuredDesc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.work.featuredTags.map((tag) => (
                  <span
                    key={tag}
                    className="lift-3d inline-block rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-foreground/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Magnetic className="shrink-0">
              <a href={FEATURED_URL} target="_blank" rel="noreferrer">
                <GlassButton
                  className="glass-primary"
                  contentClassName="flex items-center gap-2"
                >
                  {t.work.visitSite}
                  <ArrowUpRight className="h-5 w-5" />
                </GlassButton>
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <Panel3D from={9}>
            <div className="overflow-hidden rounded-2xl border border-[#2E1E15]/40 bg-[#2E1E15] shadow-2xl shadow-[#2E1E15]/30">
              {/* Browser chrome */}
              <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-neutral-400" />
                  <span className="h-3 w-3 rounded-full bg-neutral-500" />
                  <span className="h-3 w-3 rounded-full bg-neutral-600" />
                </div>
                <div className="mx-auto flex max-w-xs flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  <span className="truncate text-xs text-muted-foreground" dir="ltr">
                    {FEATURED_HOST}
                  </span>
                </div>
                <span className="hidden rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-200 sm:block">
                  {t.work.liveLabel}
                </span>
              </div>

              {/* Live embed (mounted only when scrolled near) */}
              <div ref={frameHostRef} className="relative aspect-[3/4] w-full sm:aspect-[16/10]">
                {frameReady ? (
                  <iframe
                    src={FEATURED_URL}
                    title={t.work.featuredTitle}
                    loading="lazy"
                    className="pointer-events-none absolute inset-0 h-full w-full bg-white md:pointer-events-auto"
                    sandbox="allow-scripts allow-same-origin"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-[#2E1E15]">
                    <span className="loader" />
                  </div>
                )}
                {/* On touch devices, tap opens the real site (avoids scroll trapping) */}
                <a
                  href={FEATURED_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.work.visitSite}
                  className="absolute inset-0 md:hidden"
                />
              </div>
            </div>
            </Panel3D>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
