import { useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";

const navLinks = [
  { label: "Sobre Mim", href: "/#sobre" },
  { label: "A Clínica", href: "/#clinica" },
  { label: "Tratamentos", href: "/tratamentos" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/#contato" },
];

const GOLD = "#e7d9b5";

/**
 * Full-screen intro cover. Page scroll is locked until the user "opens" the
 * curtain (via wheel / touch). When fully opened, the halves stay off-screen
 * and normal page scrolling begins.
 */
export default function IntroCover() {
  const [progress, setProgress] = useState(0); // 0 closed → 1 fully open
  const [mounted, setMounted] = useState(false);
  const [nameDone, setNameDone] = useState(false);
  const progressRef = useRef(0);
  const openRef = useRef(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    const done = window.setTimeout(() => setNameDone(true), 1600);
    return () => {
      cancelAnimationFrame(t);
      window.clearTimeout(done);
    };
  }, []);

  // Lock page scroll while curtain is closed; drive progress via wheel/touch.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const OPEN_DISTANCE = 900; // px of accumulated delta needed to fully open
    let touchY: number | null = null;

    const bump = (delta: number) => {
      if (openRef.current) return;
      const next = Math.max(0, Math.min(1, progressRef.current + delta / OPEN_DISTANCE));
      progressRef.current = next;
      setProgress(next);
      if (next >= 0.999) {
        openRef.current = true;
        html.style.overflow = prevHtml;
        body.style.overflow = prevBody;
        window.scrollTo(0, 0);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (openRef.current) return;
      e.preventDefault();
      bump(e.deltaY);
    };
    const onTouchStart = (e: TouchEvent) => {
      if (openRef.current) return;
      touchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (openRef.current || touchY == null) return;
      e.preventDefault();
      const y = e.touches[0]?.clientY ?? touchY;
      const delta = touchY - y;
      touchY = y;
      bump(delta * 2.5);
    };
    const onKey = (e: KeyboardEvent) => {
      if (openRef.current) return;
      if (["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) {
        e.preventDefault();
        bump(120);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  const hidden = progress >= 0.999;
  const shift = progress * 100; // percentage

  const content = (
    <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6">
      <div
        className="relative text-white"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        {/* Row: DRA.  JULIANA LEAL */}
        <div className="flex items-start justify-center gap-3 sm:gap-4 md:gap-5">
          <span
            className="mt-2 sm:mt-3 md:mt-4 text-base font-normal uppercase tracking-[0.28em] sm:text-xl md:text-2xl lg:text-3xl"
            style={{
              color: GOLD,
              transform: mounted ? "translateX(0)" : "translateX(-110vw)",
              opacity: mounted ? 1 : 0,
              transition:
                "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out",
            }}
          >
            Dra.
          </span>

          <span
            className="whitespace-nowrap text-5xl font-normal uppercase tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
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
          <span
            className="text-base font-normal uppercase tracking-[0.28em] sm:text-xl md:text-2xl lg:text-3xl"
            style={{ color: GOLD }}
          >
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

      <div
        className="mt-10 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] sm:text-sm"
        style={{
          color: GOLD,
          opacity: nameDone ? 1 : 0,
          transition: "opacity 800ms ease-out 600ms",
        }}
      >
        <span>Deslize para continuar</span>
        {/* Premium animated swipe-up icon (mobile emphasis) */}
        <span className="relative inline-flex h-8 w-8 items-center justify-center sm:h-7 sm:w-7">
          <span
            className="absolute inset-0 rounded-full border border-[#e7d9b5]/60"
            style={{ animation: "intro-swipe-ring 1.8s ease-out infinite" }}
          />
          <ChevronUp
            className="h-4 w-4"
            style={{ animation: "intro-swipe-up 1.4s ease-in-out infinite" }}
          />
        </span>
      </div>

      <style>{`
        @keyframes intro-swipe-up {
          0%   { transform: translateY(6px); opacity: 0.4; }
          50%  { transform: translateY(-4px); opacity: 1; }
          100% { transform: translateY(6px); opacity: 0.4; }
        }
        @keyframes intro-swipe-ring {
          0%   { transform: scale(0.85); opacity: 0.9; }
          100% { transform: scale(1.55); opacity: 0; }
        }
      `}</style>
    </div>
  );

  // Seamless full-viewport background painted with fixed attachment so both
  // halves display the same continuous artwork — no visible seam when opening.
  const bg =
    "radial-gradient(ellipse 90% 60% at 15% 12%, rgba(120,95,175,0.35), transparent 60%)," +
    "radial-gradient(ellipse 80% 55% at 85% 35%, rgba(210,175,110,0.18), transparent 60%)," +
    "radial-gradient(ellipse 100% 60% at 20% 62%, rgba(130,100,180,0.26), transparent 60%)," +
    "radial-gradient(ellipse 90% 55% at 90% 82%, rgba(200,170,105,0.14), transparent 60%)," +
    "linear-gradient(180deg, #1a1229 0%, #221740 25%, #1c1533 55%, #241a44 80%, #17102a 100%)";

  const halfBgStyle: React.CSSProperties = {
    backgroundImage: bg,
    backgroundAttachment: "fixed",
    backgroundSize: "100vw 100vh",
    backgroundRepeat: "no-repeat",
  };

  const halfTransition = "transform 120ms linear";

  return (
    <div
      aria-hidden={hidden}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ pointerEvents: hidden ? "none" : "auto" }}
    >
      {/* LEFT HALF — slides left as user "opens" the curtain */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
        style={{
          ...halfBgStyle,
          backgroundPosition: "left top",
          transform: `translate3d(-${shift}%, 0, 0)`,
          transition: halfTransition,
        }}
      >
        <div className="absolute inset-y-0 left-0 h-full w-screen">{content}</div>
      </div>

      {/* RIGHT HALF — slides right */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
        style={{
          ...halfBgStyle,
          backgroundPosition: "right top",
          transform: `translate3d(${shift}%, 0, 0)`,
          transition: halfTransition,
        }}
      >
        <div className="absolute inset-y-0 right-0 h-full w-screen">{content}</div>
      </div>
    </div>
  );
}
