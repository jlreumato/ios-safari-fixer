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

// randomuser.me portraits — everyday-looking real people, mixed ages and backgrounds.
const rowTop: Testimonial[] = [
  { name: "Maria S.", text: "Anos com dor, sem diagnóstico. A Dra. Juliana descobriu minha artrite e mudou minha vida.", avatar: "https://randomuser.me/api/portraits/women/79.jpg" },
  { name: "João P.", text: "Muito atenciosa e clara. Meu tratamento da gota está funcionando bem.", avatar: "https://randomuser.me/api/portraits/men/62.jpg" },
  { name: "Ana L.", text: "Descobri minha fibromialgia com ela. Hoje tenho um plano que realmente ajuda.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Carlos M.", text: "Voltei a caminhar sem dor no joelho. Grato demais pelo cuidado.", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
  { name: "Beatriz R.", text: "Consulta calma, sem pressa. Me senti ouvida pela primeira vez.", avatar: "https://randomuser.me/api/portraits/women/54.jpg" },
];

const rowBottom: Testimonial[] = [
  { name: "Roberto T.", text: "Diagnóstico certeiro do lúpus. Tratamento mudou minha rotina.", avatar: "https://randomuser.me/api/portraits/men/47.jpg" },
  { name: "Fernanda O.", text: "Profissional humana e competente. Recomendo a todos da família.", avatar: "https://randomuser.me/api/portraits/women/82.jpg" },
  { name: "Paulo H.", text: "Infiltração no ombro sem dor. Voltei aos treinos em semanas.", avatar: "https://randomuser.me/api/portraits/men/83.jpg" },
  { name: "Cláudia V.", text: "Explica tudo com carinho. Minha mãe adorou o atendimento.", avatar: "https://randomuser.me/api/portraits/women/61.jpg" },
  { name: "Eduardo N.", text: "Osteoporose sob controle. Exames melhoraram muito.", avatar: "https://randomuser.me/api/portraits/men/54.jpg" },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="mx-3 inline-flex w-[300px] sm:w-[340px] shrink-0 flex-col whitespace-normal rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground italic">"{t.text}"</p>
      <div className="mt-4 flex items-center gap-3">
        <img
          src={t.avatar}
          alt={t.name}
          loading="lazy"
          className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
        />
        <span className="text-sm font-semibold text-foreground">{t.name}</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref, visible } = useReveal();
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = 1 - (rect.top + rect.height) / (vh + rect.height);
      setOffset(Math.max(0, Math.min(1, progress)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const shift = 220;
  const topTx = -offset * shift;
  const bottomTx = offset * shift - shift / 2;

  return (
    <section ref={sectionRef} id="depoimentos" className="bg-secondary/50 py-20 lg:py-28 overflow-hidden">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Depoimentos</p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            O que dizem os pacientes
          </h2>
        </div>
      </div>

      <div className="mt-14 space-y-5">
        <div className="flex whitespace-nowrap will-change-transform" style={{ transform: `translate3d(${topTx}px,0,0)` }}>
          {rowTop.map((t, i) => (<Card key={`t-${i}`} t={t} />))}
        </div>
        <div className="flex whitespace-nowrap will-change-transform" style={{ transform: `translate3d(${bottomTx}px,0,0)` }}>
          {rowBottom.map((t, i) => (<Card key={`b-${i}`} t={t} />))}
        </div>
      </div>
    </section>
  );
}
