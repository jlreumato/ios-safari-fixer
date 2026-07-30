import { type ReactNode, useEffect, useRef, useState } from "react";

interface LazySectionProps {
  children: ReactNode | ((mounted: boolean) => ReactNode);
  /** Margin around the viewport that triggers the mount. Larger values mount earlier. */
  rootMargin?: string;
  /** Minimum height of the placeholder so the page keeps its approximate shape before mount. */
  minHeight?: string;
  /** Section id — kept on the placeholder so anchor links work before mount. */
  id?: string;
  className?: string;
  /** Accessible label describing the section being loaded. */
  ariaLabel?: string;
}

/**
 * Mounts its children only when the section is near the viewport.
 * Preserves the section id on a placeholder so anchor links keep working.
 * The placeholder uses the same min-height as the real section to reduce CLS.
 */
export default function LazySection({
  children,
  rootMargin = "200px",
  minHeight,
  id,
  className = "",
  ariaLabel,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  /** True when the current URL hash points directly to this section. */
  const hashMatches = (hash: string) => id && hash.replace("#", "") === id;

  useEffect(() => {
    const el = ref.current;
    if (!el || mounted) return;

    // Mount immediately if the page was loaded with an anchor pointing here.
    if (hashMatches(window.location.hash)) {
      setMounted(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin }
    );

    obs.observe(el);

    // If a same-page anchor link targets this section, mount it before scrolling.
    const onHashChange = () => {
      if (hashMatches(window.location.hash)) setMounted(true);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      obs.disconnect();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [mounted, rootMargin, id]);

  return (
    <div
      ref={ref}
      id={id}
      className={`relative ${className}`}
      style={{ minHeight }}
      aria-label={ariaLabel}
      aria-busy={!mounted}
    >
      {mounted ? (typeof children === "function" ? children(mounted) : children) : null}
    </div>
  );
}
