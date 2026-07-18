import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { treatments } from "@/data/treatments";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Tetris-style horizontal encaixe:
 * cards slide in laterally (alternating sides) as the user scrolls and
 * lock into a 4-column x 2-row grid inside a sticky viewport.
 * Images use randomized organic blob borders that undulate softly.
 */
export default function TreatmentsGrid() {
  const stageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  // progress per card, 0 → offscreen, 1 → docked
  const [progress, setProgress] = useState<number[]>(() => treatments.map(() => 0));

  const stepVh = 55; // scroll length per card
  const total = treatments.length;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const stepPx = (vh * stepVh) / 100;
      const scrolled = -rect.top;
      const next = treatments.map((_, i) => {
        const start = i * stepPx;
        const p = (scrolled - start) / stepPx;
        return Math.max(0, Math.min(1, p));
      });
      setProgress(next);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const totalVh = total * stepVh + 100;
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  return (
    <section id="tratamentos-resumo" className="relative">
      {/* SVG defs for organic wobble on images */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="wobble">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" />
            <feDisplacementMap in="SourceGraphic" scale="8" />
          </filter>
        </defs>
      </svg>

      {/* Intro */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-10 text-center">
        <p className="text-base font-semibold uppercase tracking-[0.22em] text-primary sm:text-lg">
          Tratamentos
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Cuidado para cada condição
        </h2>
        <p className="mt-5 mx-auto max-w-2xl text-muted-foreground text-lg leading-relaxed sm:text-xl">
          Atendimento humanizado e baseado em evidências nas principais áreas da reumatologia.
        </p>
      </div>

      {/* Mobile — 3D stacked cards driven by scroll */}
      {isMobile ? (
        <MobileStack />
      ) : (
        /* Desktop tetris slide stage */
        <div ref={stageRef} style={{ height: `${totalVh}vh` }} className="relative">
          <div className="sticky top-16 md:top-20 h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] w-full overflow-hidden bg-gradient-to-b from-secondary/30 to-background">
            <div className="mx-auto grid h-full max-w-[1400px] grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6">
              {treatments.map((t, i) => {
                const p = easeOut(progress[i] ?? 0);
                const fromLeft = i % 2 === 0;
                const tx = (1 - p) * (fromLeft ? -120 : 120);
                const rot = (1 - p) * (fromLeft ? -6 : 6);
                const scale = 0.9 + 0.1 * p;
                return (
                  <div
                    key={t.slug}
                    className="relative min-h-0"
                    style={{
                      transform: `translate3d(${tx}%,0,0) rotate(${rot}deg) scale(${scale})`,
                      opacity: 0.15 + 0.85 * p,
                      transition: "transform 120ms linear, opacity 120ms linear",
                      willChange: "transform, opacity",
                    }}
                  >
                    <TreatmentCard index={i} total={total} treatment={t} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Mobile 3D card stack driven by scroll.
 * Each card is absolutely positioned in a sticky viewport. As you scroll, the
 * next card slides up from the bottom while the current one scales down,
 * tilts back and dims — like a stack of cards being flipped through.
 */
function MobileStack() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const total = treatments.length;
  const stepVh = 85; // scroll length per transition

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setScrollY(-rect.top);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const totalHeight = `${(total - 1) * stepVh + 100}dvh`;
  const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  return (
    <div
      ref={ref}
      className="relative"
      style={{ height: totalHeight, perspective: "1200px" }}
    >
      <div
        className="sticky top-16 h-[calc(100dvh-4rem)] w-full overflow-hidden bg-gradient-to-b from-secondary/30 to-background"
        style={{ perspective: "1200px" }}
      >
        <div className="relative mx-auto h-full w-full max-w-md px-4 py-4">
          {treatments.map((t, i) => {
            const stepPx = (typeof window !== "undefined"
              ? window.innerHeight
              : 800) * (stepVh / 100);
            // Progress of the NEXT card covering this one (0 → not covered, 1 → fully covered).
            const outP = easeOut(clamp((scrollY - i * stepPx) / stepPx));
            // Entry progress of THIS card sliding in from below (0 → offscreen, 1 → docked).
            const inP =
              i === 0
                ? 1
                : easeOut(clamp((scrollY - (i - 1) * stepPx) / stepPx));

            const translateY =
              (1 - inP) * 100 + // enter from below
              outP * -6;         // slight lift when being covered
            const scale = 1 - outP * 0.12;
            const rotateX = outP * -8; // tilt back
            const opacity = 1 - outP * 0.45;

            return (
              <div
                key={t.slug}
                className="absolute inset-0 px-4 py-4"
                style={{
                  transform: `translate3d(0, ${translateY}%, 0) scale(${scale}) rotateX(${rotateX}deg)`,
                  transformOrigin: "center 20%",
                  opacity,
                  zIndex: i + 1,
                  transition: "transform 120ms linear, opacity 120ms linear",
                  willChange: "transform, opacity",
                  boxShadow:
                    outP > 0
                      ? `0 -20px 40px -20px rgba(70,50,120,${0.25 * outP})`
                      : undefined,
                }}
              >
                <TreatmentCard index={i} total={total} treatment={t} layout="mobile-stack" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const BLOB_KEYFRAMES = [
  "62% 38% 41% 59% / 45% 42% 58% 55%",
  "45% 55% 63% 37% / 55% 62% 38% 45%",
  "55% 45% 38% 62% / 40% 55% 45% 60%",
  "38% 62% 55% 45% / 60% 40% 55% 45%",
];

function TreatmentCard({
  index,
  total,
  treatment,
  layout = "default",
}: {
  index: number;
  total: number;
  treatment: (typeof treatments)[number];
  layout?: "default" | "mobile-stack";
}) {
  const isMobileCard = layout === "mobile-stack";
  // Randomized starting frame per card so undulation feels organic.
  const seed = (index * 7) % BLOB_KEYFRAMES.length;
  const duration = 14 + ((index * 3) % 6);
  const delay = -((index * 2) % 10);

  return (
    <Link
      to={`/tratamentos/${treatment.slug}`}
      className={`group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${treatment.gradient} shadow-[0_10px_30px_-20px_rgba(70,50,120,0.35)] transition-transform duration-500 hover:-translate-y-1 ${
        isMobileCard ? "p-0" : "p-3 sm:p-4"
      }`}
    >
      {/* accent glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: treatment.accent }}
      />

      {/* Organic wavy image */}
      <div
        className={`relative w-full overflow-hidden ${
          isMobileCard
            ? "h-[65%]"
            : "relative mx-auto min-h-0 flex-1 flex items-center justify-center"
        }`}
      >
        <div
          className="h-full w-full overflow-hidden ring-1 ring-white/50"
          style={{
            borderRadius: isMobileCard ? "1.5rem 1.5rem 0 0" : BLOB_KEYFRAMES[seed],
            animation: isMobileCard ? undefined : `blob-morph ${duration}s ease-in-out ${delay}s infinite`,
            boxShadow: `0 12px 28px -20px ${treatment.accent}`,
          }}
        >
          <img
            src={treatment.image}
            alt={treatment.title}
            width={512}
            height={512}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      <div
        className={`flex flex-col ${
          isMobileCard
            ? "h-[35%] px-5 pb-4 pt-3 justify-between"
            : "mt-3 flex-1"
        }`}
      >
        <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.22em] text-[#5a4d7a]/80 sm:text-base">
          <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <span className="h-px flex-1 mx-2" style={{ backgroundColor: `${treatment.accent}55` }} />
          <span>Tratamento</span>
        </div>

        <h3
          className="mt-1 text-balance text-xl leading-tight tracking-tight text-[#2b2540] sm:text-2xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {treatment.title}
        </h3>

        <p className={`mt-0.5 text-base leading-snug text-[#4a4560] sm:text-lg ${isMobileCard ? "line-clamp-1" : "line-clamp-2"}`}>
          {treatment.shortDesc}
        </p>

        <div className="mt-1 flex items-center justify-between sm:mt-3">
          <span className="text-base font-semibold uppercase tracking-[0.22em] text-[#3a3548]/70">
            Saiba mais
          </span>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 bg-transparent shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20"
            style={{ borderColor: treatment.accent, color: treatment.accent }}
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>
      </div>
    </Link>
  );
}
