import { useEffect, useRef, useState } from "react";
import { AirVent, MapPin, Stethoscope, Clock, Building2, X } from "lucide-react";
import reumatosFachada from "@/assets/reumatos-fachada.png.asset.json";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

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
      { src: "https://julianalealreumato.com.br/imagens/harmony-trade.jpg", alt: "Harmony Trade Center — fachada" },
      { src: "https://julianalealreumato.com.br/imagens/recepcao.jpg", alt: "Recepção — Harmony Trade Center" },
      { src: "https://julianalealreumato.com.br/imagens/consultorio.jpg", alt: "Consultório — Harmony Trade Center" },
      { src: "https://julianalealreumato.com.br/imagens/consultorio-detalhe.jpg", alt: "Equipamento médico moderno" },
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
      { src: "https://julianalealreumato.com.br/imagens/recepcao.jpg", alt: "Recepção — Reumatos" },
      { src: "https://julianalealreumato.com.br/imagens/consultorio.jpg", alt: "Consultório — Reumatos" },
      { src: "https://julianalealreumato.com.br/imagens/consultorio-detalhe.jpg", alt: "Equipamento moderno — Reumatos" },
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
    <div ref={ref} className="mt-12">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {four.map((img, i) => {
          const start = i * spacing;
          const raw = (progress - start) / perImage;
          const p = Math.max(0, Math.min(1, raw));
          const eased = 1 - Math.pow(1 - p, 3);
          const fromY = i % 2 === 0 ? -70 : 70; // even → down from top, odd → up from bottom
          const ty = fromY * (1 - eased);
          const opacity = eased;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onOpen(i)}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-primary/25 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
  const { ref, visible } = useReveal();
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const currentLocation = locations[activeTab];
  const gridImages = [0, 1, 2, 3].map((i) => currentLocation.images[i % currentLocation.images.length]);

  return (
    <section id="clinica" className="relative py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center">
          <p className="text-base font-semibold uppercase tracking-[0.18em] text-primary">Locais de Atendimento</p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Seu conforto é nossa prioridade
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Espaços pensados para oferecer acolhimento e cuidado desde o primeiro momento.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-xl bg-background/50 p-2 shadow-sm">
            {locations.map((loc, i) => (
              <button
                key={loc.id}
                onClick={() => setActiveTab(i)}
                className={`rounded-lg border-2 px-5 py-2.5 text-base font-medium transition-all duration-200 ${
                  activeTab === i
                    ? "border-primary bg-transparent text-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.10)]"
                    : "border-transparent bg-transparent text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="mt-6 text-center">
          <p className="flex items-center justify-center gap-2 text-lg text-foreground font-medium sm:text-base">
            <MapPin className="h-5 w-5 text-primary" />
            {currentLocation.address}
          </p>
          <p className="mt-1 text-base text-muted-foreground sm:text-sm">{currentLocation.cep}</p>
        </div>

        {/* Floating grid — scroll-driven reveal, click to enlarge */}
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
