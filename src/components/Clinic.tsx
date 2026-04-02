import { useEffect, useRef, useState } from "react";
import { AirVent, MapPin, Stethoscope, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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

const features = [
  { icon: AirVent, title: "Ambiente Climatizado", desc: "Consultório confortável e acolhedor para seu bem-estar." },
  { icon: MapPin, title: "Localização Privilegiada", desc: "Harmony Trade Center, com fácil acesso e estacionamento." },
  { icon: Stethoscope, title: "Equipamentos Modernos", desc: "Tecnologia de ponta para diagnóstico e acompanhamento." },
  { icon: Clock, title: "Pontualidade", desc: "Respeito ao seu tempo com atendimento dentro do horário." },
];

const clinicImages = [
  { src: "https://julianalealreumato.com.br/imagens/recepcao.jpg", alt: "Recepção da clínica" },
  { src: "https://julianalealreumato.com.br/imagens/consultorio.jpg", alt: "Consultório médico" },
  { src: "https://julianalealreumato.com.br/imagens/consultorio-detalhe.jpg", alt: "Equipamento médico moderno" },
  { src: "https://julianalealreumato.com.br/imagens/harmony-trade.jpg", alt: "Harmony Trade Center" },
];

export default function Clinic() {
  const { ref, visible } = useReveal();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((v) => (v !== null ? (v - 1 + clinicImages.length) % clinicImages.length : null));
  const next = () => setLightbox((v) => (v !== null ? (v + 1) % clinicImages.length : null));

  return (
    <section id="clinica" className="bg-secondary/50 py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">A Clínica</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Seu conforto é nossa prioridade
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Um espaço pensado para oferecer acolhimento e cuidado desde o primeiro momento.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clinicImages.map((img, i) => (
            <div
              key={i}
              className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md"
              onClick={() => openLightbox(i)}
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

        {/* Features */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
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
      <Dialog open={lightbox !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none [&>button]:hidden">
          <DialogTitle className="sr-only">
            {lightbox !== null ? clinicImages[lightbox].alt : "Foto da clínica"}
          </DialogTitle>
          {lightbox !== null && (
            <div className="relative flex items-center justify-center">
              <img
                src={clinicImages[lightbox].src}
                alt={clinicImages[lightbox].alt}
                className="max-h-[85vh] w-auto rounded-xl object-contain"
              />

              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute -top-3 -right-3 z-10 rounded-full bg-background/90 p-1.5 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                {lightbox + 1} / {clinicImages.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
