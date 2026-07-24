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
        /* Desktop — static grid, todos os cards visíveis */
        <div className="mx-auto max-w-[1400px] px-3 sm:px-4 lg:px-6 pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {treatments.map((t, i) => (
              <div key={t.slug} className="relative aspect-[3/4]">
                <TreatmentCard index={i} total={total} treatment={t} active />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}


/**
 * Mobile — slider horizontal nativo com scroll-snap. Sem hijack de scroll
 * vertical e sem efeitos de transparência entre os cards.
 */
function MobileStack() {
  const total = treatments.length;
  const cardVW = 84;
  const sidePad = (100 - cardVW) / 2;

  return (
    <div className="relative">
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6"
        style={{
          paddingLeft: `${sidePad}vw`,
          paddingRight: `${sidePad}vw`,
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
      >
        {treatments.map((t, i) => (
          <div
            key={t.slug}
            className="shrink-0 snap-center"
            style={{ width: `${cardVW}vw`, height: "78dvh" }}
          >
            <div
              className="relative h-full w-full overflow-hidden"
              style={{ boxShadow: "0 30px 60px -30px rgba(70,50,120,0.5)" }}
            >
              <TreatmentCard index={i} total={total} treatment={t} active />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




function TreatmentCard({
  index,
  total,
  treatment,
  active = false,
}: {
  index: number;
  total: number;
  treatment: (typeof treatments)[number];
  active?: boolean;
}) {
  return (
    <Link
      to={`/tratamentos/${treatment.slug}`}
      className="group relative flex h-full min-h-0 flex-col overflow-hidden shadow-[0_10px_30px_-20px_rgba(70,50,120,0.35)] transition-transform duration-500 hover:-translate-y-1"
    >
      {/* Full-bleed image */}
      <img
        src={treatment.image}
        alt={treatment.title}
        width={800}
        height={800}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
        style={{ transform: active ? "scale(1.02)" : "scale(1)" }}
      />

      {/* Bottom scrim only when active, to keep text legible */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent transition-opacity duration-700"
        style={{ opacity: active ? 1 : 0 }}
      />

      {/* Top badge (index) always visible, floats over image */}
      <div className="absolute left-4 top-4 z-10 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2b2540] backdrop-blur sm:text-xs">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Sliding text block — rises from bottom when the card becomes active */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 text-white"
        style={{
          transform: active ? "translateY(0%)" : "translateY(110%)",
          opacity: active ? 1 : 0,
          transition:
            "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease-out",
          willChange: "transform, opacity",
        }}
      >
        <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e7d9b5] sm:text-xs">
          <span className="h-px w-8 bg-[#e7d9b5]/70" />
          <span>Tratamento</span>
        </div>
        <h3
          className="mt-2 text-balance text-2xl leading-tight tracking-tight sm:text-3xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {treatment.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-snug text-white/85 sm:text-base">
          {treatment.shortDesc}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80 sm:text-xs">
            Saiba mais
          </span>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#e7d9b5] text-[#e7d9b5] transition-transform duration-500 group-hover:scale-110"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

