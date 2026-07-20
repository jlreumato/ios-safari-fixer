import { useEffect, useRef, useState } from "react";
import { AirVent, MapPin, Stethoscope, Clock, Building2 } from "lucide-react";
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
    cep: "CEP 57036-510 — Local principal de atendimento",
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

/** Carrossel em cubo 3D com rotação automática no eixo Y. */
function Cube3DCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(360);
  const [rotation, setRotation] = useState(0);

  // 4 faces do cubo — repete imagens caso haja menos de 4
  const faces = [0, 1, 2, 3].map((i) => images[i % Math.max(images.length, 1)]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => setSize(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setRotation((r) => r - 90), 3800);
    return () => window.clearInterval(id);
  }, [images]);

  const half = size / 2;

  return (
    <div className="mt-12 flex justify-center">
      <div
        ref={wrapperRef}
        className="relative w-full max-w-5xl"
        style={{ perspective: "2200px", WebkitPerspective: "2200px" }}
      >
        {/* 16:9 stage */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              transform: `translateZ(-${half}px) rotateY(${rotation}deg)`,
              WebkitTransform: `translateZ(-${half}px) rotateY(${rotation}deg)`,
              transition: "transform 1.4s cubic-bezier(0.65, 0, 0.35, 1)",
              WebkitTransition: "-webkit-transform 1.4s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            {faces.map((img, i) => (
              <div
                key={i}
                className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_20px_50px_-25px_rgba(60,50,90,0.4)] ring-1 ring-white/40"
                style={{
                  transform: `rotateY(${i * 90}deg) translateZ(${half}px)`,
                  WebkitTransform: `rotateY(${i * 90}deg) translateZ(${half}px)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <img
                  src={img?.src}
                  alt={img?.alt ?? ""}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Clinic() {
  const { ref, visible } = useReveal();
  const [activeTab, setActiveTab] = useState(0);

  const currentLocation = locations[activeTab];

  return (
    <section id="clinica" className="bg-secondary/50 py-20 lg:py-28">
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
                {i === 0 && (
                  <span className={`ml-2 rounded-full border px-2 py-0.5 text-sm font-semibold uppercase tracking-wider ${activeTab === i ? "border-primary/40 text-primary" : "border-primary/20 text-primary"}`}>
                    Principal
                  </span>
                )}
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

        {/* 3D Cube Carousel */}
        <Cube3DCarousel key={currentLocation.id} images={currentLocation.images} />

      </div>
    </section>
  );
}
