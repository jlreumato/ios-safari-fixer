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
    title: "Gota: A Doença do Ácido Úrico",
    excerpt: "A Gota é uma das formas mais antigas de artrite conhecidas, frequentemente associada a um estilo de vida de excessos. Hoje sabemos que ela pode afetar qualquer pessoa, sendo uma artropatia inflamatória causada pelo acúmulo de ácido úrico no organismo.",
    category: "Artrites",
    image: "https://julianalealreumato.com.br/imagens/gota.jpg",
  },
  {
    title: "Entendendo a Artrite Reumatoide",
    excerpt: "A Artrite Reumatoide (AR) é uma doença autoimune crônica que causa inflamação nas articulações, levando a dor, inchaço e rigidez. O diagnóstico precoce e o tratamento adequado são cruciais para controlar a doença e preservar a qualidade de vida.",
    category: "Artrites",
    image: "https://julianalealreumato.com.br/imagens/blog-artrite.jpg",
  },
  {
    title: "O que é Lúpus (LES)?",
    excerpt: "O Lúpus Eritematoso Sistêmico (LES) é uma doença autoimune complexa em que o sistema imunológico ataca tecidos saudáveis. Pode afetar pele, articulações, rins, cérebro e outros órgãos.",
    category: "Doenças Autoimunes",
    image: "https://julianalealreumato.com.br/imagens/blog-lupus.jpg",
  },
  {
    title: "Fibromialgia: muito além da dor",
    excerpt: "A fibromialgia é uma síndrome caracterizada por dor muscular generalizada e crônica. Além da dor, os pacientes frequentemente sentem fadiga intensa, distúrbios do sono, ansiedade e dificuldades de memória.",
    category: "Dores Crônicas",
    image: "https://julianalealreumato.com.br/imagens/blog-fibromialgia.jpg",
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
