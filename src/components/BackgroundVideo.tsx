type BackgroundVideoProps = {
  src: string;
  className?: string;
  poster?: string;
};

/**
 * A muted, looping, autoplaying background video.
 * iOS Safari ONLY autoplays a video that has the `autoplay` attribute together
 * with `muted` + `playsinline` — a programmatic `.play()` is blocked. So we use
 * the attribute directly (the videos are compressed, so always-on is cheap).
 */
export function BackgroundVideo({ src, className, poster }: BackgroundVideoProps) {
  return (
    <video
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
