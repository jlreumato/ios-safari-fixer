import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Imagens específicas das articulações
import quadrilImage from "@/assets/joints/quadril.jpg";
import joelhoImage from "@/assets/joints/joelho.jpg";
import ombroImage from "@/assets/joints/ombro.jpg";
import maosImage from "@/assets/joints/maos.jpg";
import pesImage from "@/assets/joints/pes.jpg";

const areas = [
  { label: "Quadril", image: quadrilImage, href: "/procedimentos" },
  { label: "Joelho", image: joelhoImage, href: "/procedimentos" },
  { label: "Ombro", image: ombroImage, href: "/procedimentos" },
  { label: "Punho e mãos", image: maosImage, href: "/procedimentos" },
  { label: "Pés e tornozelos", image: pesImage, href: "/procedimentos" },
];

export default function ArcImageCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const mid = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(mid - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const el = track.children[Math.max(0, Math.min(areas.length - 1, index))] as HTMLElement | undefined;
    if (!el) return;
    track.scrollTo({
      left: el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 lg:py-28">
      <header className="mx-auto w-full max-w-6xl px-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
          Procedimentos · Áreas em evidência
        </p>
        <h3
          className="mt-4 text-[clamp(2.25rem,5.5vw,4.25rem)] font-normal leading-none text-[#2a2233]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Cuidado preciso, onde dói.
        </h3>
      </header>

      <div className="relative mt-12">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1.5rem,calc((100vw-72rem)/2))] pb-6"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {areas.map((area, index) => (
            <a
              key={area.label}
              href={area.href}
              aria-label={`Ver procedimentos para ${area.label}`}
              className={`ios-clip group relative aspect-[4/5] w-[78vw] max-w-[22rem] shrink-0 snap-center overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_-32px_rgba(42,34,51,0.4)] transition-all duration-500 sm:w-[46vw] lg:w-[27vw] lg:max-w-[24rem] ${
                index === active ? "opacity-100" : "opacity-70"
              }`}
            >
              <img
                src={area.image}
                alt={`Área de ${area.label}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#2a2233]/80 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white sm:p-8">
                <span className="text-3xl font-normal sm:text-4xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {area.label}
                </span>
                <ChevronRight className="mb-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>

        {/* Setas */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-4 lg:flex">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Área anterior"
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-sm border border-[#a3813c]/50 bg-white/85 text-[#a3813c] shadow-md transition-colors hover:bg-[#a3813c] hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Próxima área"
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-sm border border-[#a3813c]/50 bg-white/85 text-[#a3813c] shadow-md transition-colors hover:bg-[#a3813c] hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mx-auto mt-2 flex items-center justify-center gap-2" aria-label={`Área ${active + 1} de ${areas.length}`}>
        {areas.map((area, index) => (
          <button
            key={area.label}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Ir para ${area.label}`}
            className={`h-1 transition-all duration-300 ${index === active ? "w-10 bg-[#a3813c]" : "w-4 bg-[#2a2233]/20"}`}
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="/procedimentos"
          className="inline-flex items-center gap-3 border-b border-[#a3813c] pb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a3813c] transition-colors hover:bg-[#a3813c]/5"
        >
          Ver todos os procedimentos
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
