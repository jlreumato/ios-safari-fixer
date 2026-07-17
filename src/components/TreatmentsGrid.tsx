import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { treatments } from "@/data/treatments";

/**
 * Tetris-style horizontal encaixe:
 * cards slide in laterally (alternating sides) as the user scrolls and
 * lock into a 4-column x 2-row grid inside a sticky viewport.
 * Images use randomized organic blob borders that undulate softly.
 */
export default function TreatmentsGrid() {
  const stageRef = useRef<HTMLDivElement>(null);
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
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Tratamentos
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Cuidado para cada condição
        </h2>
        <p className="mt-5 mx-auto max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Role a página — os cards deslizam lateralmente e se encaixam como peças em movimento.
        </p>
      </div>

      {/* Tetris slide stage */}
      <div ref={stageRef} style={{ height: `${totalVh}vh` }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-secondary/30 to-background">
          <div className="mx-auto grid h-full max-w-[1400px] grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8 content-center">
            {treatments.map((t, i) => {
              const p = easeOut(progress[i] ?? 0);
              const fromLeft = i % 2 === 0;
              const tx = (1 - p) * (fromLeft ? -120 : 120);
              const rot = (1 - p) * (fromLeft ? -6 : 6);
              const scale = 0.9 + 0.1 * p;
              return (
                <div
                  key={t.slug}
                  className="relative"
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
    </section>
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
}: {
  index: number;
  total: number;
  treatment: (typeof treatments)[number];
}) {
  // Randomized starting frame per card so undulation feels organic.
  const seed = (index * 7) % BLOB_KEYFRAMES.length;
  const duration = 14 + ((index * 3) % 6);
  const delay = -((index * 2) % 10);

  return (
    <Link
      to={`/tratamentos/${treatment.slug}`}
      className={`group relative flex h-full min-h-[38vh] flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${treatment.gradient} p-4 sm:p-5 shadow-[0_10px_30px_-20px_rgba(70,50,120,0.35)] transition-transform duration-500 hover:-translate-y-1`}
    >
      {/* accent glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: treatment.accent }}
      />

      {/* Organic wavy image */}
      <div className="relative mx-auto w-full">
        <div
          className="mx-auto overflow-hidden ring-1 ring-white/50"
          style={{
            borderRadius: BLOB_KEYFRAMES[seed],
            animation: `blob-morph ${duration}s ease-in-out ${delay}s infinite`,
            aspectRatio: "1 / 1",
            width: "100%",
            maxWidth: "300px",
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

      <div className="mt-4 flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#5a4d7a]/80">
        <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span className="h-px flex-1 mx-3" style={{ backgroundColor: `${treatment.accent}55` }} />
        <span>Tratamento</span>
      </div>

      <h3
        className="mt-2 text-balance text-xl sm:text-2xl leading-tight tracking-tight text-[#2b2540]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        {treatment.title}
      </h3>

      <p className="mt-2 line-clamp-3 text-xs sm:text-sm leading-relaxed text-[#4a4560]">
        {treatment.shortDesc}
      </p>

      <div className="mt-auto pt-3 flex items-center justify-between">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#3a3548]/70">
          Saiba mais
        </span>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white"
          style={{ color: treatment.accent }}
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}
