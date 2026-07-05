import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin monochrome "journey" progress bar pinned to the top of the viewport —
 * shows how far along the spatial scroll experience the visitor is.
 * Transform-only (scaleX), springs for smoothness, costs nothing.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-white via-neutral-300 to-neutral-500 rtl:origin-right"
      style={{ scaleX }}
    />
  );
}
