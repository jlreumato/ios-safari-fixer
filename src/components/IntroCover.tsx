import { useEffect, useState } from "react";

const navLinks = [
  { label: "Sobre Mim", href: "/#sobre" },
  { label: "A Clínica", href: "/#clinica" },
  { label: "Tratamentos", href: "/tratamentos" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Blog", href: "/#blog" },
  { label: "Contato", href: "/#contato" },
];

/**
 * Full-screen intro cover. The logotype animates in matching the header logo layout:
 *   DRA.  (small, top-left of the wordmark)
 *   JULIANA LEAL  (large, main)
 *   REUMATOLOGIA  (smaller, right-aligned under the name)
 *
 * "Dra. Juliana" slides in from the LEFT, "Leal" slides in from the RIGHT,
 * then "Reumatologia" and the nav menu fade in.
 * On scroll the cover slides UP revealing the Hero underneath.
 */
export default function IntroCover() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [nameDone, setNameDone] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    const done = window.setTimeout(() => setNameDone(true), 1600);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(t);
      window.clearTimeout(done);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const progress = Math.min(1, scrollY / vh);
  const translate = -progress * 100;
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
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-20 top-10 h-96 w-96 rounded-full bg-[#8e82b8]/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-[28rem] w-[28rem] rounded-full bg-[#e7d9b5]/15 blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e7d9b5]/50 to-transparent" />

      <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6">
        {/* Logotype — matches the header logo layout */}
        <div
          className="relative text-white"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {/* Row: DRA.  JULIANA LEAL */}
          <div className="flex items-start justify-center gap-3 sm:gap-4 md:gap-5">
            <span
              className="mt-1 sm:mt-2 md:mt-3 text-sm font-normal uppercase tracking-[0.18em] text-white/90 sm:text-base md:text-lg lg:text-xl"
              style={{
                transform: mounted ? "translateX(0)" : "translateX(-110vw)",
                opacity: mounted ? 1 : 0,
                transition:
                  "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out",
              }}
            >
              Dra.
            </span>

            <span
              className="whitespace-nowrap text-5xl font-normal uppercase tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
              style={{
                transform: mounted ? "translateX(0)" : "translateX(110vw)",
                opacity: mounted ? 1 : 0,
                transition:
                  "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out",
                transitionDelay: "150ms",
              }}
            >
              Juliana Leal
            </span>
          </div>

          {/* REUMATOLOGIA — right-aligned under the name */}
          <div
            className="mt-1 flex justify-end pr-1 sm:mt-2 sm:pr-2"
            style={{
              opacity: nameDone ? 1 : 0,
              transform: nameDone ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 700ms ease-out, transform 700ms ease-out",
            }}
          >
            <span className="text-base font-normal uppercase tracking-[0.28em] text-white/85 sm:text-xl md:text-2xl lg:text-3xl">
              Reumatologia
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-10 h-px w-28 bg-gradient-to-r from-transparent via-[#e7d9b5]/70 to-transparent"
          style={{
            opacity: nameDone ? 1 : 0,
            transform: nameDone ? "scaleX(1)" : "scaleX(0)",
            transition: "opacity 800ms ease-out 150ms, transform 800ms ease-out 150ms",
          }}
        />

        {/* Nav menu — fades in after name animation */}
        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8"
          style={{
            opacity: nameDone ? 1 : 0,
            transform: nameDone ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 800ms ease-out 300ms, transform 800ms ease-out 300ms",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-[#e7d9b5] sm:text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p
          className="mt-10 text-center text-xs font-medium uppercase tracking-[0.35em] text-white/55 sm:text-sm"
          style={{
            opacity: nameDone ? 1 : 0,
            transition: "opacity 800ms ease-out 600ms",
          }}
        >
          Role para continuar ↓
        </p>
      </div>
    </div>
  );
}
