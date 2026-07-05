import { useEffect, useRef } from "react";

type BackgroundVideoProps = {
  src: string;
  className?: string;
  poster?: string;
};

/**
 * A muted, looping background video.
 * - The `autoplay` attribute is REQUIRED for iOS Safari to start playback
 *   (a programmatic-only `.play()` before any autoplay is blocked there).
 * - After that, an IntersectionObserver pauses the video off-screen and
 *   resumes it on-screen (allowed on iOS for muted+playsinline videos).
 *   Pausing off-screen videos is a big win for desktop smoothness.
 */
export function BackgroundVideo({ src, className, poster }: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    io.observe(video);

    // iOS suppresses autoplay in Low Power Mode. The first real user gesture
    // is allowed to start playback — use it to revive a visible, paused video.
    const revive = () => {
      const v = ref.current;
      if (!v || !v.paused) return;
      const r = v.getBoundingClientRect();
      const visible = r.bottom > 0 && r.top < window.innerHeight;
      if (visible) v.play().catch(() => {});
    };
    window.addEventListener("touchend", revive, { passive: true });
    window.addEventListener("click", revive, true);

    return () => {
      io.disconnect();
      window.removeEventListener("touchend", revive);
      window.removeEventListener("click", revive, true);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
