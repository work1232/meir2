import { useEffect, useRef } from "react";

type BackgroundVideoProps = {
  src: string;
  className?: string;
  poster?: string;
};

/**
 * A muted, looping background video that only plays while it is on screen.
 * Pausing off-screen videos keeps decode work (and jank) down when several
 * heavy videos live on the same page.
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
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
