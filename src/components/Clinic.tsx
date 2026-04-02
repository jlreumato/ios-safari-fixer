import { useEffect, useRef, useState } from "react";
import { AirVent, MapPin, Stethoscope, Clock } from "lucide-react";

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
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {clinicImages.map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl shadow-md">
              <img
                src={img.src}
                alt={img.alt}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
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
    </section>
  );
}
