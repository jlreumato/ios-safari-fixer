import { useEffect, useRef, useState } from "react";

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

const posts = [
  {
    title: "Gota: causas, sintomas e tratamento",
    excerpt: "Entenda o que é a gota, como ela se manifesta e quais são as opções de tratamento disponíveis para controlar as crises.",
    category: "Artrites",
    image: "https://julianalealreumato.com.br/imagens/gota.jpg",
  },
  {
    title: "Artrite Reumatoide: diagnóstico precoce faz a diferença",
    excerpt: "Saiba por que identificar a artrite reumatoide nos estágios iniciais é fundamental para preservar suas articulações.",
    category: "Artrites",
    image: "https://julianalealreumato.com.br/imagens/blog-artrite.jpg",
  },
  {
    title: "Lúpus: convivendo com a doença",
    excerpt: "O lúpus é uma doença autoimune complexa. Conheça os sintomas mais comuns e como o tratamento pode melhorar sua qualidade de vida.",
    category: "Autoimunes",
    image: "https://julianalealreumato.com.br/wp-content/uploads/2024/10/lupus-reumatologia.webp",
  },
  {
    title: "Fibromialgia: mais do que 'apenas dor'",
    excerpt: "A fibromialgia vai além da dor muscular. Descubra como uma abordagem multidisciplinar pode transformar seu dia a dia.",
    category: "Dor Crônica",
    image: "https://julianalealreumato.com.br/wp-content/uploads/2024/10/fibromialgia-tratamento.webp",
  },
];

export default function Blog() {
  const { ref, visible } = useReveal();

  return (
    <section id="blog" className="py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Blog</p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Artigos e informações
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Conteúdo para ajudar você a entender melhor as doenças reumáticas.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {posts.map((p, i) => (
            <article
              key={i}
              className={`group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
                  {p.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
