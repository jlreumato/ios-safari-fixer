import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import MobileParallaxStack from "./MobileParallaxStack";
import imgGota from "@/assets/blog/gota.jpg.asset.json";
import imgArtrite from "@/assets/blog/blog-artrite.jpg.asset.json";
import imgLupus from "@/assets/blog/blog-lupus.jpg.asset.json";
import imgFibro from "@/assets/blog/blog-fibromialgia.jpg.asset.json";


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
    reading: "5 min de leitura",
    image: imgGota.url,
    href: "/tratamentos/gota",
  },
  {
    title: "Entendendo a Artrite Reumatoide",
    excerpt: "Doença autoimune crônica que causa inflamação nas articulações. Diagnóstico precoce preserva a qualidade de vida.",
    category: "Artrites",
    reading: "6 min de leitura",
    image: imgArtrite.url,
    href: "/tratamentos/artrite-reumatoide",
  },
  {
    title: "O que é Lúpus (LES)?",
    excerpt: "Doença autoimune complexa em que o sistema imunológico ataca tecidos saudáveis em vários órgãos.",
    category: "Doenças Autoimunes",
    reading: "7 min de leitura",
    image: imgLupus.url,
    href: "/tratamentos/outras-doencas-imunologicas",
  },
  {
    title: "Fibromialgia: muito além da dor",
    excerpt: "Síndrome de dor muscular generalizada e crônica, com fadiga, distúrbios do sono e ansiedade.",
    category: "Dores Crônicas",
    reading: "6 min de leitura",
    image: imgFibro.url,
    href: "/tratamentos/fibromialgia",
  },
];

export default function Blog() {
  const { ref, visible } = useReveal();
  const [featured, ...rest] = posts;

  return (
    <section id="blog" className="py-20 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Blog</p>
          <h1
            className="mt-3 text-balance text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Artigos sobre <span className="italic text-[#e7d9b5]">reumatologia</span> e dor crônica
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/70">
            Conteúdo escrito em linguagem simples pela Dra. Juliana Leal, reumatologista em Maceió — Alagoas,
            para você entender sua doença e as opções de tratamento.
          </p>
        </div>

        {/* Destaque */}
        <a
          href={featured.href}
          className="ios-clip group relative mt-12 hidden overflow-hidden border border-white/10 sm:grid sm:grid-cols-2"
        >
          <div className="relative h-[380px] overflow-hidden">
            <img
              src={featured.image}
              alt={featured.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(260_40%_10%)]/70" />
          </div>
          <div className="flex flex-col justify-center gap-4 bg-white/[0.03] p-8 lg:p-12">
            <span className="w-fit border border-[#e7d9b5]/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#e7d9b5]">
              Em destaque
            </span>
            <h2
              className="text-3xl font-normal leading-tight text-white lg:text-4xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {featured.title}
            </h2>
            <p className="text-base font-light leading-relaxed text-white/70">{featured.excerpt}</p>
            <p className="text-sm uppercase tracking-[0.18em] text-white/40">
              {featured.category} · {featured.reading}
            </p>
            <span className="mt-2 inline-flex w-fit items-center gap-2 border border-white/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors group-hover:border-[#e7d9b5] group-hover:text-[#e7d9b5]">
              Ler artigo
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </a>

        {/* Mobile: parallax stack — cada post entra da direita sobrepondo o anterior */}
        <div className="mt-12 sm:hidden">
          <MobileParallaxStack stepVh={85}>
            {posts.map((p, i) => (
              <a
                key={i}
                href={p.href}
                className="ios-clip group relative block h-[68dvh] overflow-hidden border border-white/10 shadow-2xl"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <span className="inline-block w-fit border border-white/40 bg-white/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider backdrop-blur">
                    {p.category}
                  </span>
                  <h2
                    className="mt-3 text-3xl font-normal leading-snug drop-shadow"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {p.title}
                  </h2>
                  <p className="mt-3 text-lg font-light leading-relaxed text-white/90">{p.excerpt}</p>
                  <span className="mt-4 inline-flex w-fit items-center gap-2 border border-white/70 px-4 py-2 text-base font-semibold uppercase tracking-wider text-white">
                    Ler artigo
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </MobileParallaxStack>
        </div>

        {/* Desktop: grid de artigos com cantos retos */}
        <div className="mt-6 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <a
              key={i}
              href={p.href}
              className={`ios-clip group relative flex flex-col overflow-hidden border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-[#e7d9b5]/40 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: visible ? `${150 + i * 120}ms` : "0ms" }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[700ms] group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/30 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                <span className="absolute left-4 top-4 border border-white/40 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h2
                  className="text-2xl font-normal leading-snug text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {p.title}
                </h2>
                <p className="text-base font-light leading-relaxed text-white/70">{p.excerpt}</p>
                <p className="mt-auto pt-3 text-xs uppercase tracking-[0.18em] text-white/40">{p.reading}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#e7d9b5]">
                  Ler artigo
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
