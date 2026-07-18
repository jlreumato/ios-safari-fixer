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
        <p className="text-base font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
          Tratamentos
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Cuidado para cada condição
        </h2>
        <p className="mt-5 mx-auto max-w-2xl text-muted-foreground text-lg leading-relaxed sm:text-base">
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
 * Mobile Cover Flow 3D — horizontal swipeable carousel with the center card in
 * focus and neighbours tilted back in perspective, like Apple's classic
 * Cover Flow. Snap-scroll driven, GPU accelerated.
 */
function MobileStack() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [cardW, setCardW] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      setScrollX(el.scrollLeft);
      const first = el.querySelector<HTMLElement>("[data-cf-card]");
      if (first) setCardW(first.offsetWidth);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const total = treatments.length;
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  return (
    <div className="relative w-full" style={{ perspective: "1400px" }}>
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden pb-8 pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollPaddingInline: "20%" }}
      >
        {/* leading spacer to allow the first card to center */}
        <div className="shrink-0" style={{ width: "20%" }} aria-hidden />
        {treatments.map((t, i) => {
          // distance from center of this card to viewport center, in card widths
          const cardCenter = i * cardW + cardW / 2;
          const viewportCenter = scrollX + (cardW * 0.6) * 2.5; // approx; refined below
          // simpler: use scroller width
          const scroller = scrollerRef.current;
          const vc = scroller ? scrollX + scroller.clientWidth / 2 - scroller.clientWidth * 0.2 : 0;
          const delta = cardW > 0 ? (cardCenter - vc) / cardW : 0;
          const d = clamp(delta, -2, 2);
          const abs = Math.abs(d);
          const rotateY = -d * 45; // tilt neighbours
          const translateZ = -abs * 120;
          const translateX = -d * 12; // pull neighbours slightly toward center
          const scale = 1 - abs * 0.08;
          const opacity = 1 - abs * 0.25;
          return (
            <div
              key={t.slug}
              data-cf-card
              className="shrink-0 snap-center px-2"
              style={{ width: "60%" }}
            >
              <div
                className="relative h-[70dvh] w-full"
                style={{
                  transform: `translate3d(${translateX}%, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  transition: "transform 200ms cubic-bezier(0.22,1,0.36,1), opacity 200ms linear",
                  opacity,
                  willChange: "transform, opacity",
                  boxShadow: `0 30px 60px -30px rgba(70,50,120,${0.35 - abs * 0.1})`,
                  borderRadius: "1.75rem",
                }}
              >
                <TreatmentCard index={i} total={total} treatment={t} layout="mobile-stack" />
                {/* Reflection under the focused card */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 -bottom-6 h-6 rounded-full bg-black/25 blur-2xl"
                  style={{ opacity: (1 - abs) * 0.5 }}
                />
              </div>
            </div>
          );
        })}
        <div className="shrink-0" style={{ width: "20%" }} aria-hidden />
      </div>

      {/* Pagination dots */}
      <div className="mt-2 flex items-center justify-center gap-1.5">
        {treatments.map((_, i) => {
          const active = cardW > 0 ? Math.round(scrollX / cardW) === i : i === 0;
          return (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: active ? 20 : 6,
                backgroundColor: active ? "#8e82b8" : "rgba(142,130,184,0.35)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}


const BLOB_KEYFRAMES = [
  "58% 42% 47% 53% / 48% 46% 54% 52%",
  "48% 52% 56% 44% / 52% 55% 45% 48%",
  "53% 47% 44% 56% / 45% 52% 48% 55%",
  "44% 56% 53% 47% / 55% 45% 52% 48%",
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
            ? "h-[35%] px-6 pb-5 pt-4 justify-between gap-2"
            : "mt-3 flex-1"
        }`}
      >
        <div className={`flex items-center justify-between font-semibold uppercase tracking-[0.22em] text-[#5a4d7a]/80 ${isMobileCard ? "text-xs" : "text-[10px] sm:text-xs"}`}>
          <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <span className="h-px flex-1 mx-2" style={{ backgroundColor: `${treatment.accent}55` }} />
          <span>Tratamento</span>
        </div>

        <h3
          className={`text-balance leading-tight tracking-tight text-[#2b2540] ${isMobileCard ? "mt-0 text-[26px]" : "mt-1 text-lg sm:text-xl"}`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {treatment.title}
        </h3>

        <p className={`leading-snug text-[#4a4560] ${isMobileCard ? "text-[15px] line-clamp-2" : "mt-1 text-xs sm:text-sm line-clamp-2"}`}>
          {treatment.shortDesc}
        </p>

        <div className={`flex items-center justify-between ${isMobileCard ? "mt-1" : "mt-2 sm:mt-3"}`}>
          <span className={`font-semibold uppercase tracking-[0.22em] text-[#3a3548]/70 ${isMobileCard ? "text-xs" : "text-[10px] sm:text-xs"}`}>
            Saiba mais
          </span>
          <span
            className={`flex items-center justify-center rounded-full border-2 bg-transparent shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20 ${isMobileCard ? "h-10 w-10" : "h-8 w-8"}`}
            style={{ borderColor: treatment.accent, color: treatment.accent }}
          >
            <ArrowUpRight className={isMobileCard ? "h-5 w-5" : "h-4 w-4"} />
          </span>
        </div>
      </div>
    </Link>
  );
}
