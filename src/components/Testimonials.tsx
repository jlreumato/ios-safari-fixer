import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

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

type Testimonial = { name: string; text: string; avatar: string };

const rowTop: Testimonial[] = [
  { name: "Maria S.", text: "Anos com dor, sem diagnóstico. A Dra. Juliana descobriu minha artrite e mudou minha vida.", avatar: "https://randomuser.me/api/portraits/women/90.jpg" },
  { name: "João P.", text: "Muito atenciosa e clara. Meu tratamento da gota está funcionando bem.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Ana L.", text: "Descobri minha fibromialgia com ela. Hoje tenho um plano que realmente ajuda.", avatar: "https://randomuser.me/api/portraits/women/74.jpg" },
  { name: "Carlos M.", text: "Voltei a caminhar sem dor no joelho. Grato demais pelo cuidado.", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Beatriz R.", text: "Consulta calma, sem pressa. Me senti ouvida pela primeira vez.", avatar: "https://randomuser.me/api/portraits/women/85.jpg" },
];

const rowBottom: Testimonial[] = [
  { name: "Roberto T.", text: "Diagnóstico certeiro do lúpus. Tratamento mudou minha rotina.", avatar: "https://randomuser.me/api/portraits/men/71.jpg" },
  { name: "Fernanda O.", text: "Profissional humana e competente. Recomendo a todos da família.", avatar: "https://randomuser.me/api/portraits/women/72.jpg" },
  { name: "Paulo H.", text: "Infiltração no ombro sem dor. Voltei aos treinos em semanas.", avatar: "https://randomuser.me/api/portraits/men/28.jpg" },
  { name: "Cláudia V.", text: "Explica tudo com carinho. Minha mãe adorou o atendimento.", avatar: "https://randomuser.me/api/portraits/women/50.jpg" },
  { name: "Eduardo N.", text: "Osteoporose sob controle. Exames melhoraram muito.", avatar: "https://randomuser.me/api/portraits/men/69.jpg" },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="mx-3 inline-flex w-[300px] sm:w-[340px] shrink-0 flex-col whitespace-normal rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mt-3 text-lg font-light leading-relaxed text-muted-foreground italic">"{t.text}"</p>
      <div className="mt-4 flex items-center gap-3">
        <img
          src={t.avatar}
          alt={t.name}
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
        />
        <span className="text-lg font-semibold text-foreground">{t.name}</span>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, duration = 60 }: { items: Testimonial[]; reverse?: boolean; duration?: number }) {
  // Duplicate content for seamless loop
  const loop = [...items, ...items];
  return (
    <div className="group overflow-hidden">
      <div
        className="flex w-max whitespace-nowrap"
        style={{
          animation: `marquee-x ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((t, i) => (
          <Card key={`${reverse ? "b" : "t"}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref, visible } = useReveal();

  return (
    <section id="depoimentos" className="bg-secondary/50 pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center">
          <p className="text-base font-semibold uppercase tracking-[0.18em] text-primary">Depoimentos</p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            O que dizem os pacientes
          </h2>
        </div>
      </div>

      <div className="mt-14 space-y-5">
        <MarqueeRow items={rowTop} duration={60} />
        <MarqueeRow items={rowBottom} reverse duration={75} />
      </div>

      <style>{`
        @keyframes marquee-x {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee-x"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
