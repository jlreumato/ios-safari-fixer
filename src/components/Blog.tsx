import { useEffect, useRef, useState } from "react";
import MobileParallaxStack from "./MobileParallaxStack";

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
    excerpt: "Artropatia inflamatória causada pelo acúmulo de ácido úrico no organismo, que pode afetar qualquer pessoa.",
    category: "Artrites",
    image: "https://julianalealreumato.com.br/imagens/gota.jpg",
    href: "#blog",
  },
  {
    title: "Entendendo a Artrite Reumatoide",
    excerpt: "Doença autoimune crônica que causa inflamação nas articulações. Diagnóstico precoce preserva a qualidade de vida.",
    category: "Artrites",
    image: "https://julianalealreumato.com.br/imagens/blog-artrite.jpg",
    href: "#blog",
  },
  {
    title: "O que é Lúpus (LES)?",
    excerpt: "Doença autoimune complexa em que o sistema imunológico ataca tecidos saudáveis em vários órgãos.",
    category: "Doenças Autoimunes",
    image: "https://julianalealreumato.com.br/imagens/blog-lupus.jpg",
    href: "#blog",
  },
  {
    title: "Fibromialgia: muito além da dor",
    excerpt: "Síndrome de dor muscular generalizada e crônica, com fadiga, distúrbios do sono e ansiedade.",
    category: "Dores Crônicas",
    image: "https://julianalealreumato.com.br/imagens/blog-fibromialgia.jpg",
    href: "#blog",
  },
];

export default function Blog() {
  const { ref, visible } = useReveal();

  return (
    <section id="blog" className="py-20 lg:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center">
          <p className="text-base font-semibold uppercase tracking-[0.18em] text-primary">Blog</p>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Artigos e informações
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Passe o mouse sobre cada artigo para saber mais.
          </p>
        </div>

        {/* Mobile: parallax stack — cada post entra da direita sobrepondo o anterior */}
        <div className="mt-14 sm:hidden">
          <MobileParallaxStack stepVh={85}>
            {posts.map((p, i) => (
              <a
                key={i}
                href={p.href}
                className="group relative block h-[68vh] overflow-hidden rounded-2xl shadow-2xl"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <span className="inline-block w-fit rounded-full bg-white/20 backdrop-blur px-3 py-0.5 text-sm font-semibold uppercase tracking-wider">
                    {p.category}
                  </span>
                  <h3
                    className="mt-3 text-3xl font-semibold leading-snug drop-shadow"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/90">{p.excerpt}</p>
                  <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border-2 border-white/80 bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/15">
                    Saiba mais
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </MobileParallaxStack>
        </div>

        {/* Desktop: layout expansivo lado a lado (mantido) */}
        <div className="mt-14 hidden sm:flex flex-row gap-3 h-[460px]">
          {posts.map((p, i) => (
            <a
              key={i}
              href={p.href}
              className={`group relative block overflow-hidden rounded-2xl shadow-md transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex-1 hover:flex-[2.2] focus-within:flex-[2.2] h-full ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: visible ? `${200 + i * 100}ms` : "0ms" }}
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[600ms] group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/40 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="relative flex h-full flex-col justify-end p-6 text-white">
                <span className="inline-block w-fit rounded-full bg-white/20 backdrop-blur px-3 py-0.5 text-sm font-semibold uppercase tracking-wider">
                  {p.category}
                </span>
                <h3
                  className="mt-3 text-2xl sm:text-3xl font-semibold leading-snug drop-shadow"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {p.title}
                </h3>

                <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-3 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 group-focus-within:mt-3">
                  <div className="overflow-hidden">
                    <p className="text-base leading-relaxed text-white/90">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/15">
                      Saiba mais
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
