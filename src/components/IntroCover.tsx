import { useEffect, useState } from "react";

/**
 * Full-screen intro cover. The doctor's name splits into two lines:
 *  - "Dra. Juliana" slides in from the LEFT
 *  - "Leal Reumatologia" slides in from the RIGHT
 * As the user scrolls, the cover slides UP revealing the Hero underneath.
 */
export default function IntroCover() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger entrance animation on first paint
    const t = requestAnimationFrame(() => setMounted(true));
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const progress = Math.min(1, scrollY / vh);
  const translate = -progress * 100; // percentage upward
  const hidden = progress >= 0.999;

  return (
    <div
      aria-hidden={hidden}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{
        transform: `translate3d(0, ${translate}%, 0)`,
        transition: hidden ? "none" : "transform 80ms linear",
        pointerEvents: hidden ? "none" : "auto",
        background:
          "radial-gradient(circle at 30% 20%, hsl(260 45% 22%) 0%, hsl(258 40% 12%) 55%, hsl(255 45% 8%) 100%)",
      }}
    >
      {/* soft ambient glows */}
      <div className="pointer-events-none absolute -left-20 top-10 h-96 w-96 rounded-full bg-[#8e82b8]/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-[28rem] w-[28rem] rounded-full bg-[#e7d9b5]/15 blur-[140px]" />

      {/* thin champagne hairline at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e7d9b5]/50 to-transparent" />

      <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6">
        <p
          className={`mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#e7d9b5]/80 transition-all duration-1000 sm:text-sm ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          Reumatologia · Dor Crônica
        </p>

        <h1
          className="flex flex-col items-center leading-[0.9] text-white"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          <span
            className="block whitespace-nowrap text-5xl font-normal tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
            style={{
              transform: mounted ? "translateX(0)" : "translateX(-110vw)",
              opacity: mounted ? 1 : 0,
              transition:
                "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out",
            }}
          >
            Dra. Juliana
          </span>
          <span
            className="mt-1 block whitespace-nowrap bg-gradient-to-r from-[#f5e6c5] via-[#e7d9b5] to-[#c9b489] bg-clip-text text-5xl font-normal italic tracking-tight text-transparent sm:text-7xl md:text-8xl lg:text-9xl"
            style={{
              transform: mounted ? "translateX(0)" : "translateX(110vw)",
              opacity: mounted ? 1 : 0,
              transition:
                "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out",
              transitionDelay: "150ms",
            }}
          >
            Leal Reumatologia
          </span>
        </h1>

        <div
          className={`mt-10 h-px w-28 bg-gradient-to-r from-transparent via-[#e7d9b5]/70 to-transparent transition-all duration-1000 ${
            mounted ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
          style={{ transitionDelay: "1400ms" }}
        />

        <p
          className={`mt-6 text-center text-xs font-medium uppercase tracking-[0.35em] text-white/60 transition-all duration-700 sm:text-sm ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1800ms" }}
        >
          Role para continuar ↓
        </p>
      </div>
    </div>
  );
}
