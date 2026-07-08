import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { treatments } from "@/data/treatments";

/**
 * Pilha horizontal com parallax:
 * cards de mesmo tamanho (80% da largura da tela), sobrepondo-se conforme o
 * usuário rola. Ao terminar o último, o scroll volta ao normal.
 */
export default function TreatmentsGrid() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<number[]>(() =>
    treatments.map((_, i) => (i === 0 ? 0 : 110)),
  );

  const stepVh = 85;

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
        if (i === 0) return 0;
        const p = (scrolled - (i - 1) * stepPx) / stepPx;
        const clamped = Math.max(0, Math.min(1, p));
        return (1 - clamped) * 110;
      });
      setOffsets(next);
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

  const totalVh = (treatments.length - 1) * stepVh + 100;

  return (
    <section id="tratamentos-resumo" className="relative">
      {/* Intro */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Tratamentos
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Cuidado para cada condição
        </h2>
        <p className="mt-5 mx-auto max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Role para conhecer as principais doenças reumatológicas que trato — cada card desliza sobre o anterior.
        </p>
      </div>

      {/* Parallax stack */}
      <div ref={stageRef} style={{ height: `${totalVh}vh` }} className="relative">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="relative mx-auto h-[78vh] w-[88%] sm:w-[85%] lg:w-[80%] max-w-[1400px]">
            {treatments.map((t, i) => (
              <div
                key={t.slug}
                className="absolute inset-0"
                style={{
                  transform: `translate3d(0, ${offsets[i] ?? 0}%, 0)`,
                  zIndex: i + 1,
                  willChange: "transform",
                }}
              >
                <TreatmentCard index={i} total={treatments.length} treatment={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TreatmentCard({
  index,
  total,
  treatment,
}: {
  index: number;
  total: number;
  treatment: (typeof treatments)[number];
}) {
  return (
    <Link
      to={`/tratamentos/${treatment.slug}`}
      className={`group relative flex h-full w-full overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br ${treatment.gradient} shadow-[0_10px_24px_-18px_rgba(60,50,90,0.22)] transition-transform duration-500`}
    >
      {/* accent glow */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[50vmin] w-[50vmin] rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: treatment.accent }}
      />

      {/* Text side */}
      <div className="relative flex flex-1 flex-col justify-between p-8 sm:p-12 lg:p-16">
        <div className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#5a4d7a]">
          <span>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span
            className="h-px flex-1 mx-4 max-w-[180px]"
            style={{ backgroundColor: `${treatment.accent}55` }}
          />
          <span>Tratamento</span>
        </div>

        <div className="max-w-xl">
          <span
            className="inline-block h-1.5 w-12 rounded-full"
            style={{ backgroundColor: treatment.accent }}
          />
          <h3
            className="mt-4 text-balance text-3xl font-normal leading-[1.05] tracking-tight text-[#2b2540] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {treatment.title}
          </h3>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#4a4560] sm:text-lg">
            {treatment.shortDesc}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#3a3548]/70">
            Saiba mais
          </span>
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white"
            style={{ color: treatment.accent }}
          >
            <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </div>
      </div>

      {/* Square image side */}
      <div className="relative hidden md:flex items-center justify-center p-6 lg:p-8">
        <div
          className="relative aspect-square h-[min(60vh,520px)] overflow-hidden rounded-[1.5rem] ring-1 ring-white/60"
          style={{ boxShadow: `0 12px 28px -20px ${treatment.accent}` }}
        >
          <img
            src={treatment.image}
            alt={treatment.title}
            width={1024}
            height={1024}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </Link>
  );
}

