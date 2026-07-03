import { useEffect, useState } from "react";

/**
 * Returns true when the viewport matches the given media query (default: phones
 * and small tablets). Used to skip heavy desktop-only effects on mobile — most
 * importantly a second WebGL context, which iOS Safari refuses to create.
 */
export function useIsMobile(query = "(max-width: 768px)"): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
