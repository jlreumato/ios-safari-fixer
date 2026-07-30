import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** Threshold of visibility that triggers the observer (0 → 1). */
  threshold?: number;
  /** Margin around the viewport used by the observer. */
  rootMargin?: string;
  /** If true, the observer disconnects after the first intersection. */
  triggerOnce?: boolean;
}

/**
 * Reusable IntersectionObserver hook.
 * Returns a ref to attach to an element and a boolean indicating whether
 * the element is inside the observer's viewport.
 */
export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px",
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (triggerOnce && inView) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) obs.disconnect();
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, triggerOnce, inView]);

  return { ref, inView };
}
