import { useEffect, useRef, useState } from "react";
import { ChevronUp, Hand } from "lucide-react";

const GOLD = "#e7d9b5";

/**
 * Full-screen intro cover. Page scroll is locked until the user "opens" the
 * curtain (via wheel / touch / tap). When fully opened, the halves stay
 * off-screen and normal page scrolling begins.
 */
export default function IntroCover() {
  const [progress, setProgress] = useState(0); // 0 closed → 1 fully open
  const [mounted, setMounted] = useState(false);
  const [nameDone, setNameDone] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const progressRef = useRef(0);
  const openRef = useRef(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    const done = window.setTimeout(() => setNameDone(true), 1600);
    // Detect touch primary input
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setIsTouch(touch);
    return () => {
      cancelAnimationFrame(t);
      window.clearTimeout(done);
    };
  }, []);

  // Lock page scroll while curtain is closed; drive progress via wheel/touch/tap.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;

    // If the user landed via a hash link (menu navigation from another page)
    // OR already opened the cover in this session, skip the curtain entirely.
    const hasHash = typeof window !== "undefined" && window.location.hash.length > 1;
    const alreadyOpened =
      typeof window !== "undefined" && sessionStorage.getItem("jl_intro_opened") === "1";

    if (hasHash || alreadyOpened) {
      progressRef.current = 1;
      setProgress(1);
      openRef.current = true;
      return;
    }

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const open = () => {
      if (openRef.current) return;
      progressRef.current = 1;
      setProgress(1);
      openRef.current = true;
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      try {
        sessionStorage.setItem("jl_intro_opened", "1");
      } catch {
        /* ignore */
      }
      window.scrollTo(0, 0);
    };

    const onWheel = (e: WheelEvent) => {
      if (openRef.current) return;
      e.preventDefault();
      if (e.deltaY > 0) open();
    };
    const onTouchStart = () => {
      // Any touch on mobile opens the cover instantly.
      if (openRef.current) return;
      open();
    };
    const onKey = (e: KeyboardEvent) => {
      if (openRef.current) return;
      if (["ArrowDown", "PageDown", " ", "Spacebar", "Enter"].includes(e.key)) {
        e.preventDefault();
        open();
      }
    };
    const onClick = () => {
      if (openRef.current) return;
      open();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
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

        {/* REUMATOLOGIA — slides in together with "Juliana Leal" */}
        <div className="mt-1 flex justify-end overflow-hidden pr-1 sm:mt-2 sm:pr-2">
          <span
            className="text-base font-normal uppercase tracking-[0.28em] sm:text-xl md:text-2xl lg:text-3xl"
            style={{
              color: GOLD,
              transform: mounted ? "translateX(0)" : "translateX(110vw)",
              opacity: mounted ? 1 : 0,
              transition:
                "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out",
              transitionDelay: "150ms",
            }}
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

      <div
        className="mt-12 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] sm:text-sm"
        style={{
          color: GOLD,
          opacity: nameDone ? 1 : 0,
          transition: "opacity 800ms ease-out 600ms",
        }}
      >
        <span>{isTouch ? "Toque para iniciar sua transformação" : "Deslize para continuar"}</span>
        <span className="relative inline-flex h-8 w-8 items-center justify-center sm:h-7 sm:w-7">
          <span
            className="absolute inset-0 rounded-full border border-[#e7d9b5]/60"
            style={{ animation: "intro-swipe-ring 1.8s ease-out infinite" }}
          />
          {isTouch ? (
            <Hand
              className="h-4 w-4"
              style={{ animation: "intro-swipe-tap 1.4s ease-in-out infinite" }}
            />
          ) : (
            <ChevronUp
              className="h-4 w-4"
              style={{ animation: "intro-swipe-up 1.4s ease-in-out infinite" }}
            />
          )}
        </span>
      </div>

      <style>{`
        @keyframes intro-swipe-up {
          0%   { transform: translateY(6px); opacity: 0.4; }
          50%  { transform: translateY(-4px); opacity: 1; }
          100% { transform: translateY(6px); opacity: 0.4; }
        }
        @keyframes intro-swipe-tap {
          0%,100% { transform: scale(0.9); opacity: 0.5; }
          50%     { transform: scale(1.1); opacity: 1; }
        }
        @keyframes intro-swipe-ring {
          0%   { transform: scale(0.85); opacity: 0.9; }
          100% { transform: scale(1.55); opacity: 0; }
        }
      `}</style>
    </div>
  );

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

  const halfTransition = "transform 1400ms cubic-bezier(0.65, 0, 0.35, 1)";

  return (
    <div
      aria-hidden={hidden}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ pointerEvents: hidden ? "none" : "auto" }}
    >
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
