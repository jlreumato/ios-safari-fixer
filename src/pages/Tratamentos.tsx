import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LoadingSplash from "@/components/LoadingSplash";
import { treatments } from "@/data/treatments";

/**
 * Grid horizontal com parallax:
 * O container tem altura N * 100vh. Dentro há um palco `sticky h-screen`.
 * Cada card ocupa a tela e desliza da direita para a esquerda sobrepondo o
 * anterior conforme o scroll avança. Ao chegar no último, o scroll segue normal.
 */
export default function Tratamentos() {
  const navigate = useNavigate();
  const stageRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<number[]>(() =>
    treatments.map((_, i) => (i === 0 ? 0 : 100)),
  );
  const [pending, setPending] = useState<string | null>(null);

  const stepVh = 100; // uma "tela de scroll" por card

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
        return (1 - clamped) * 105;
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

  const openTreatment = (slug: string) => {
    setPending(slug);
  };

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5]">
        {/* Intro */}
        <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-gradient-to-br from-[#faf8f5] via-[#f5f0e8] to-[#ebe5db] pt-28 pb-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(142,130,184,0.10) 119px, rgba(142,130,184,0.10) 120px)",
            }}
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Tratamentos Reumatológicos
            </p>
            <h1
              className="mt-3 max-w-3xl text-balance text-4xl font-normal leading-[1.05] tracking-tight text-[#2b2540] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Cuidado especializado para cada condição{" "}
              <span className="italic text-[#8e82b8]">reumatológica.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5a5568] sm:text-lg">
              Deslize para conhecer os tratamentos. Clique em um card para ver os detalhes.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[#5a5568]/70">
              Role para explorar
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Parallax horizontal stack */}
        <div ref={stageRef} style={{ height: `${totalVh}vh` }} className="relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            {treatments.map((t, i) => (
              <div
                key={t.slug}
                className="absolute inset-0"
                style={{
                  transform: `translate3d(${offsets[i] ?? 0}%, 0, 0)`,
                  zIndex: i + 1,
                  willChange: "transform",
                }}
              >
                <TreatmentCard
                  index={i}
                  total={treatments.length}
                  treatment={t}
                  onOpen={() => openTreatment(t.slug)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />

      {pending && (
        <LoadingSplash
          duration={900}
          onDone={() => {
            navigate(`/tratamentos/${pending}`);
          }}
        />
      )}
    </>
  );
}

function TreatmentCard({
  index,
  total,
  treatment,
  onOpen,
}: {
  index: number;
  total: number;
  treatment: (typeof treatments)[number];
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative flex h-full w-full flex-col justify-end overflow-hidden bg-gradient-to-br ${treatment.gradient} px-6 py-12 text-left transition-transform sm:px-12 lg:px-24`}
      style={{ cursor: "pointer" }}
    >
      {/* Decorative circle */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-[70vmin] w-[70vmin] rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: treatment.accent }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 149px, rgba(255,255,255,0.35) 149px, rgba(255,255,255,0.35) 150px)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.24em] text-[#5a4d7a]">
          <span>Tratamento {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <span
            className="hidden h-px flex-1 max-w-[280px] sm:block"
            style={{ backgroundColor: `${treatment.accent}66` }}
          />
        </div>

        <h2
          className="text-balance text-4xl font-normal leading-[1.02] tracking-tight text-[#2b2540] sm:text-6xl lg:text-7xl xl:text-8xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {treatment.title}
        </h2>

        <p className="max-w-2xl text-base leading-relaxed text-[#4a4560] sm:text-lg lg:text-xl">
          {treatment.shortDesc}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-base font-medium shadow-sm transition-all group-hover:translate-x-1 group-hover:bg-white/10"
            style={{
              borderColor: treatment.accent,
              color: treatment.accent,
            }}
          >
            Ver detalhes
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Slide-in accent bar on the left edge (comes with the card) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1"
        style={{ backgroundColor: treatment.accent }}
      />
    </button>
  );
}
