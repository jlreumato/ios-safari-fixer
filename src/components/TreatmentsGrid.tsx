import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { treatments } from "@/data/treatments";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function TreatmentsGrid() {
  const { ref, visible } = useReveal();

  return (
    <section id="tratamentos-resumo" className="relative py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Tratamentos
          </p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Cuidado para cada condição
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Conheça as principais doenças reumatológicas que trato. Clique para explorar cada uma em detalhes.
          </p>
        </div>

        {/* Bento-style dynamic grid */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-[repeat(3,minmax(140px,auto))] auto-rows-[minmax(140px,auto)]">
          {treatments.map((t, i) => {
            // Give some cards larger spans on desktop for a dynamic bento layout
            const spans = [
              "md:col-span-2 md:row-span-2", // 0 big
              "md:col-span-1 md:row-span-1",
              "md:col-span-1 md:row-span-2",
              "md:col-span-1 md:row-span-1",
              "md:col-span-1 md:row-span-1",
              "md:col-span-2 md:row-span-1", // 5 wide
              "md:col-span-1 md:row-span-1",
              "md:col-span-1 md:row-span-1",
            ];
            return (
              <Link
                key={t.slug}
                to={`/tratamentos/${t.slug}`}
                className={`group relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br ${t.gradient} p-5 sm:p-6 shadow-[0_10px_30px_-15px_rgba(142,130,184,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(142,130,184,0.5)] ${spans[i]}`}
                style={{
                  transitionDelay: `${100 + i * 60}ms`,
                }}
              >
                {/* Accent glow */}
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: t.accent }}
                />

                <div className="relative flex h-full flex-col justify-between gap-4">
                  <div>
                    <span
                      className="inline-block h-1.5 w-8 rounded-full transition-all duration-500 group-hover:w-14"
                      style={{ background: t.accent }}
                    />
                    <h3
                      className="mt-3 text-xl sm:text-2xl md:text-2xl font-semibold leading-tight text-[#3a3548]"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {t.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs sm:text-sm leading-relaxed text-[#5a5568]/90">
                      {t.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#3a3548]/70">
                      Saiba mais
                    </span>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#3a3548] transition-all duration-500 group-hover:bg-white group-hover:shadow-md"
                      style={{ color: t.accent }}
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
