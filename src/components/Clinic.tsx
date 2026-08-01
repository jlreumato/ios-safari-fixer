import { useEffect, useRef, useState } from "react";
import { AirVent, MapPin, Stethoscope, Clock, Building2, X } from "lucide-react";
import reumatosFachada from "@/assets/reumatos-fachada.png.asset.json";
import harmonyTrade from "@/assets/clinic/harmony-trade.jpg.asset.json";
import recepcao from "@/assets/clinic/recepcao.jpg.asset.json";
import consultorio from "@/assets/clinic/consultorio.jpg.asset.json";
import consultorioDetalhe from "@/assets/clinic/consultorio-detalhe.jpg.asset.json";
import { useInView } from "@/hooks/useInView";

interface ClinicLocation {
  id: string;
  name: string;
  address: string;
  cep: string;
  features: { icon: typeof AirVent; title: string; desc: string }[];
  images: { src: string; alt: string }[];
}

const locations: ClinicLocation[] = [
  {
    id: "harmony",
    name: "Harmony Trade Center",
    address: "Harmony Trade Center, 3º Andar, Sala 318 — Maceió, AL",
    cep: "CEP 57036-510",
    features: [
      { icon: AirVent, title: "Ambiente Climatizado", desc: "Consultório confortável e acolhedor para seu bem-estar." },
      { icon: MapPin, title: "Localização Privilegiada", desc: "Fácil acesso e estacionamento no local." },
      { icon: Stethoscope, title: "Equipamentos Modernos", desc: "Tecnologia de ponta para diagnóstico e acompanhamento." },
      { icon: Clock, title: "Pontualidade", desc: "Respeito ao seu tempo com atendimento dentro do horário." },
    ],
    images: [
      { src: harmonyTrade.url, alt: "Harmony Trade Center — fachada" },
      { src: recepcao.url, alt: "Recepção — Harmony Trade Center" },
      { src: consultorio.url, alt: "Consultório — Harmony Trade Center" },
      { src: consultorioDetalhe.url, alt: "Equipamento médico moderno" },
    ],
  },
  {
    id: "reumatos",
    name: "Clínica Reumatos",
    address: "Centro Médico Imagem Plena, Av. João Davino, 766 — Mangabeiras, Maceió, AL",
    cep: "CEP 57037-590",
    features: [
      { icon: Building2, title: "Centro Médico Completo", desc: "Dentro do Centro Médico Imagem Plena, com infraestrutura de ponta." },
      { icon: MapPin, title: "Bairro Mangabeiras", desc: "Localização acessível com estacionamento disponível." },
      { icon: Stethoscope, title: "Atendimento Especializado", desc: "Foco em reumatologia com equipe multidisciplinar." },
      { icon: Clock, title: "Horários Flexíveis", desc: "Agenda compatível com diferentes perfis de pacientes." },
    ],
    images: [
      { src: reumatosFachada.url, alt: "Fachada do Centro Médico Imagem Plena — Clínica Reumatos" },
      { src: recepcao.url, alt: "Recepção — Reumatos" },
      { src: consultorio.url, alt: "Consultório — Reumatos" },
      { src: consultorioDetalhe.url, alt: "Equipamento moderno — Reumatos" },
    ],
  },
];

/**
 * Scroll-driven 4-image grid. Odd-indexed images enter floating DOWN from above,
 * even-indexed enter floating UP from below — one after another, forming a row.
 * Click an image to open the lightbox.
 */
function FloatingGrid({
  images,
  onOpen,
}: {
  images: { src: string; alt: string }[];
  onOpen: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start when the row enters the viewport bottom, complete before it leaves the top.
      const start = vh * 0.9;
      const end = vh * 0.15;
      const t = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, t)));
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

  const four = [0, 1, 2, 3].map((i) => images[i % Math.max(images.length, 1)]);
  // Slightly overlapping stagger so images arrive one after the other in a single scroll.
  const perImage = 0.28;
  const spacing = (1 - perImage) / (four.length - 1); // 0.24

  return (
    <div ref={ref} className="mt-14">
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-6">
        {four.map((img, i) => {
          const start = i * spacing;
          const raw = (progress - start) / perImage;
          const p = Math.max(0, Math.min(1, raw));
          const eased = 1 - Math.pow(1 - p, 3);
          const fromY = i % 2 === 0 ? -70 : 70;
          const ty = fromY * (1 - eased);
          const opacity = eased;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onOpen(i)}
              className="group relative aspect-[3/4] overflow-hidden border border-[#e7d9b5]/25 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)] focus:outline-none focus-visible:border-[#e7d9b5]"
              style={{
                transform: `translate3d(0, ${ty}%, 0)`,
                opacity,
                transition: "transform 180ms linear, opacity 180ms linear",
                willChange: "transform, opacity",
              }}
              aria-label={`Ampliar imagem: ${img?.alt ?? ""}`}
            >
              <img
                src={img?.src}
                alt={img?.alt ?? ""}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              {/* corner brackets */}
              {(["tl", "tr", "bl", "br"] as const).map((c) => (
                <span
                  key={c}
                  aria-hidden
                  className="pointer-events-none absolute h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    top: c.startsWith("t") ? 6 : undefined,
                    bottom: c.startsWith("b") ? 6 : undefined,
                    left: c.endsWith("l") ? 6 : undefined,
                    right: c.endsWith("r") ? 6 : undefined,
                    borderTop: c.startsWith("t") ? "1.5px solid #e7d9b5" : undefined,
                    borderBottom: c.startsWith("b") ? "1.5px solid #e7d9b5" : undefined,
                    borderLeft: c.endsWith("l") ? "1.5px solid #e7d9b5" : undefined,
                    borderRight: c.endsWith("r") ? "1.5px solid #e7d9b5" : undefined,
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          );
        })}
      </div>
    </div>
  );
}


function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onNav: (dir: -1 | 1) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onNav]);

  const img = images[index];
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Fechar"
      >
        <X className="h-5 w-5" />
      </button>
      <img
        src={img?.src}
        alt={img?.alt ?? ""}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl animate-in zoom-in-95 duration-200"
      />
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/80">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

export default function Clinic() {
  const { ref, inView } = useInView();
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const currentLocation = locations[activeTab];
  const gridImages = [0, 1, 2, 3].map((i) => currentLocation.images[i % currentLocation.images.length]);

  return (
    <section id="clinica" className="relative py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Header — left-aligned, mirrors Etapas */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-14 bg-[#e7d9b5]" />
            <p className="text-base font-semibold uppercase tracking-[0.28em] text-[#e7d9b5]">
              Locais de Atendimento
            </p>
          </div>
          <h2
            className="mt-5 text-balance text-5xl font-normal tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Seu conforto é <span className="italic text-primary">nossa prioridade</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Espaços pensados para oferecer acolhimento e cuidado desde o primeiro momento.
          </p>
        </div>

        {/* Tabs + Address — modern outlined layout */}
        <div className="mt-12 flex flex-col gap-6 border-y border-white/10 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex flex-wrap gap-3">
            {locations.map((loc, i) => (
              <button
                key={loc.id}
                onClick={() => setActiveTab(i)}
                className={`border px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] transition-all duration-200 ${
                  activeTab === i
                    ? "border-[#e7d9b5] bg-[#e7d9b5]/[0.08] text-[#e7d9b5]"
                    : "border-white/15 text-muted-foreground hover:border-[#e7d9b5]/50 hover:text-foreground"
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
          <div className="text-left lg:text-right">
            <p className="flex items-center gap-2 text-base text-foreground lg:justify-end">
              <MapPin className="h-4 w-4 text-primary" />
              {currentLocation.address}
            </p>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {currentLocation.cep}
            </p>
          </div>
        </div>

        {/* Floating grid — larger, rectangular */}
        <FloatingGrid
          key={currentLocation.id}
          images={gridImages}
          onOpen={(i) => setLightbox(i)}
        />
      </div>


      {lightbox !== null && (
        <Lightbox
          images={gridImages}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNav={(dir) =>
            setLightbox((prev) =>
              prev === null ? prev : (prev + dir + gridImages.length) % gridImages.length
            )
          }
        />
      )}
    </section>
  );
}
