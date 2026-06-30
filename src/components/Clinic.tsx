import { useEffect, useRef, useState } from "react";
import { AirVent, MapPin, Stethoscope, Clock, X, ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
    ],
  },
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
      { src: "https://julianalealreumato.com.br/imagens/recepcao.jpg", alt: "Recepção da clínica — Harmony Trade Center" },
      { src: "https://julianalealreumato.com.br/imagens/consultorio.jpg", alt: "Consultório médico — Harmony Trade Center" },
      { src: "https://julianalealreumato.com.br/imagens/consultorio-detalhe.jpg", alt: "Equipamento médico moderno" },
      { src: "https://julianalealreumato.com.br/imagens/harmony-trade.jpg", alt: "Harmony Trade Center — fachada" },
    ],
  },
];

function GalleryGrid({ images, onImageClick }: { images: { src: string; alt: string }[]; onImageClick: (i: number) => void }) {
  if (images.length === 0) {
    return (
      <div className="mt-12 flex items-center justify-center rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 p-12">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-primary/40" />
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Fotos do espaço em breve
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {images.map((img, i) => (
        <div
          key={i}
          className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md"
          onClick={() => onImageClick(i)}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20 rounded-xl" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </span>
          </div>
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export default function Clinic() {
  const { ref, visible } = useReveal();
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const currentLocation = locations[activeTab];
  const currentImages = currentLocation.images;

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((v) => (v !== null ? (v - 1 + currentImages.length) % currentImages.length : null));
  const next = () => setLightbox((v) => (v !== null ? (v + 1) % currentImages.length : null));

  return (
    <section id="clinica" className="bg-secondary/50 py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Locais de Atendimento</p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Seu conforto é nossa prioridade
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Espaços pensados para oferecer acolhimento e cuidado desde o primeiro momento.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-xl bg-background p-1 shadow-sm">
            {locations.map((loc, i) => (
              <button
                key={loc.id}
                onClick={() => { setActiveTab(i); setLightbox(null); }}
                className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeTab === i
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="mt-6 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-foreground font-medium">
            <MapPin className="h-4 w-4 text-primary" />
            {currentLocation.address}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{currentLocation.cep}</p>
        </div>

        {/* Gallery */}
        <GalleryGrid images={currentImages} onImageClick={openLightbox} />

        {/* Features */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {currentLocation.features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl bg-background p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      {currentImages.length > 0 && (
        <Dialog open={lightbox !== null} onOpenChange={(open) => !open && closeLightbox()}>
          <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none [&>button]:hidden">
            <DialogTitle className="sr-only">
              {lightbox !== null ? currentImages[lightbox].alt : "Foto da clínica"}
            </DialogTitle>
            {lightbox !== null && (
              <div className="relative flex items-center justify-center">
                <img
                  src={currentImages[lightbox].src}
                  alt={currentImages[lightbox].alt}
                  className="max-h-[85vh] w-auto rounded-xl object-contain"
                />
                <button
                  onClick={closeLightbox}
                  className="absolute -top-3 -right-3 z-10 rounded-full bg-background/90 p-1.5 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <X className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-2 rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-2 rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                  {lightbox + 1} / {currentImages.length}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
