import { useEffect, useRef, useState } from "react";
import { Instagram as InstagramIcon, Play, Heart, MessageCircle, Grid3x3, Film, Bookmark, UserSquare2 } from "lucide-react";

const INSTAGRAM_URL = "https://instagram.com/julianalealreumato";
const PROFILE_IMG = "https://julianalealreumato.com.br/imagens/fotos/perfil-dra-juliana-leal.webp";

// Reels (capas) — links levam ao Instagram da Dra. Juliana
const reels = [
  {
    cover: "https://julianalealreumato.com.br/imagens/blog-artrite.jpg",
    title: "Artrite Reumatoide: sinais de alerta",
    views: "12,4k",
    likes: "1.2k",
  },
  {
    cover: "https://julianalealreumato.com.br/imagens/blog-lupus.jpg",
    title: "Lúpus: o que é e como tratar",
    views: "8,9k",
    likes: "892",
  },
  {
    cover: "https://julianalealreumato.com.br/imagens/blog-fibromialgia.jpg",
    title: "Fibromialgia além da dor",
    views: "15,2k",
    likes: "1.6k",
  },
  {
    cover: "https://julianalealreumato.com.br/imagens/gota.jpg",
    title: "Gota: a doença do ácido úrico",
    views: "9,7k",
    likes: "743",
  },
  {
    cover: "https://julianalealreumato.com.br/imagens/consultorio.jpg",
    title: "Bastidores do consultório",
    views: "6,3k",
    likes: "521",
  },
  {
    cover: "https://julianalealreumato.com.br/imagens/recepcao.jpg",
    title: "Conheça nosso espaço",
    views: "4,1k",
    likes: "389",
  },
];

const gridPosts = reels.slice(0, 6);

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function IPhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ width: 340 }}>
      {/* Glow */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-primary/30 via-pink-300/20 to-amber-200/20 blur-3xl" />

      {/* Phone frame */}
      <div
        className="relative rounded-[3rem] bg-gradient-to-b from-zinc-800 to-zinc-950 p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]"
        style={{ aspectRatio: "9 / 19.5" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.85rem] bg-black">
          {/* Side buttons */}
          <span className="absolute left-[-3px] top-24 h-8 w-[3px] rounded-l bg-zinc-700" />
          <span className="absolute left-[-3px] top-36 h-14 w-[3px] rounded-l bg-zinc-700" />
          <span className="absolute left-[-3px] top-56 h-14 w-[3px] rounded-l bg-zinc-700" />
          <span className="absolute right-[-3px] top-40 h-20 w-[3px] rounded-r bg-zinc-700" />

          {/* Screen */}
          <div className="relative flex h-full w-full flex-col bg-white">
            {/* Dynamic Island */}
            <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />

            {/* Status bar */}
            <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-black">
              <span>9:41</span>
              <span className="w-28" />
              <span className="flex items-center gap-1">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><rect x="0" y="6" width="2" height="4" rx="0.5"/><rect x="3.5" y="4" width="2" height="6" rx="0.5"/><rect x="7" y="2" width="2" height="8" rx="0.5"/><rect x="10.5" y="0" width="2" height="10" rx="0.5"/></svg>
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1" y="1" width="11" height="8" rx="2"/><rect x="3" y="3" width="7" height="4" fill="currentColor"/><rect x="13" y="3.5" width="1.5" height="3" fill="currentColor"/></svg>
              </span>
            </div>

            {/* Instagram top bar */}
            <div className="mt-3 flex items-center justify-between border-b border-zinc-100 px-4 pb-2">
              <span className="text-base font-semibold text-black">julianalealreumato</span>
              <InstagramIcon className="h-5 w-5 text-black" />
            </div>

            {/* Profile header */}
            <div className="flex items-center gap-4 px-4 pt-4">
              <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                <div className="rounded-full bg-white p-[2px]">
                  <img src={PROFILE_IMG} alt="Dra. Juliana Leal" className="h-16 w-16 rounded-full object-cover object-top" />
                </div>
              </div>
              <div className="flex flex-1 justify-around text-center text-[11px] text-black">
                <div><div className="text-sm font-semibold">128</div><div className="text-zinc-500">posts</div></div>
                <div><div className="text-sm font-semibold">8.4k</div><div className="text-zinc-500">seguidores</div></div>
                <div><div className="text-sm font-semibold">312</div><div className="text-zinc-500">seguindo</div></div>
              </div>
            </div>

            {/* Bio */}
            <div className="px-4 pt-3 text-[11px] leading-snug text-black">
              <div className="font-semibold">Dra. Juliana Leal · Reumatologista</div>
              <div className="text-zinc-700">CRM-AL 6717 · RQE 4857</div>
              <div className="text-zinc-700">Maceió — AL · Especialista em Dor (USP)</div>
              <div className="text-blue-600">wa.me/5582999872509</div>
            </div>

            {/* Action buttons */}
            <div className="mt-3 flex gap-2 px-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-md bg-[#0095f6] py-1.5 text-center text-[11px] font-semibold text-white"
              >
                Seguir
              </a>
              <button className="flex-1 rounded-md bg-zinc-100 py-1.5 text-[11px] font-semibold text-black">Mensagem</button>
              <button className="rounded-md bg-zinc-100 px-2 py-1.5 text-[11px] font-semibold text-black">▾</button>
            </div>

            {/* Tabs */}
            <div className="mt-3 flex border-t border-zinc-200 text-zinc-500">
              <div className="flex flex-1 justify-center border-t-2 border-black py-2 text-black"><Grid3x3 className="h-4 w-4" /></div>
              <div className="flex flex-1 justify-center py-2"><Film className="h-4 w-4" /></div>
              <div className="flex flex-1 justify-center py-2"><UserSquare2 className="h-4 w-4" /></div>
              <div className="flex flex-1 justify-center py-2"><Bookmark className="h-4 w-4" /></div>
            </div>

            {/* Grid */}
            <div className="grid flex-1 grid-cols-3 gap-[2px] overflow-hidden">
              {gridPosts.map((p, i) => (
                <a key={i} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="relative block bg-zinc-100">
                  <img src={p.cover} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <Film className="absolute right-1 top-1 h-3 w-3 text-white drop-shadow" />
                </a>
              ))}
            </div>

            {/* Home indicator */}
            <div className="flex justify-center pb-2 pt-1">
              <span className="h-1 w-24 rounded-full bg-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Instagram() {
  const { ref, visible } = useReveal();

  return (
    <section id="instagram" className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-20 lg:py-28">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br from-pink-300/30 to-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-200/30 to-primary/10 blur-3xl" />

      <div
        ref={ref}
        className={`relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">@julianalealreumato</p>
          <h2
            className="mt-3 text-balance text-4xl font-normal tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Acompanhe no Instagram
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Conteúdo educativo sobre reumatologia, bastidores do consultório e dicas para conviver melhor com dores crônicas.
          </p>
        </div>

        {/* Mockup */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="flex justify-center">
            <IPhoneMockup />
          </div>

          <div className="text-center lg:text-left">
            <h3
              className="text-3xl font-normal text-foreground sm:text-4xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Informação que cuida de você
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              No perfil <strong className="text-foreground">@julianalealreumato</strong> você encontra explicações
              acessíveis sobre artrite, lúpus, fibromialgia e outras doenças reumáticas — direto da consulta da
              especialista para o seu dia a dia.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start lg:items-center lg:justify-start">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-pink-500/25 transition-transform hover:scale-[1.03] active:scale-[0.97]"
              >
                <InstagramIcon className="h-5 w-5" />
                Seguir no Instagram
              </a>
              <span className="text-sm text-muted-foreground">+8.4k seguidores</span>
            </div>
          </div>
        </div>

        {/* Reels grid */}
        <div className="mt-24">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Reels recentes</p>
              <h3
                className="mt-2 text-3xl font-normal text-foreground sm:text-4xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Últimos vídeos publicados
              </h3>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-sm font-semibold text-primary underline-offset-4 hover:underline sm:mt-0"
            >
              Ver todos →
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {reels.map((r, i) => (
              <a
                key={i}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl bg-zinc-900 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                style={{ aspectRatio: "9 / 16" }}
              >
                <img
                  src={r.cover}
                  alt={r.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Top gradient + reel icon */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent" />
                <Film className="absolute right-2.5 top-2.5 h-5 w-5 text-white drop-shadow" />

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 backdrop-blur-sm">
                    <Play className="h-6 w-6 fill-black text-black" />
                  </div>
                </div>

                {/* Bottom gradient + stats */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                  <p className="line-clamp-2 text-xs font-medium text-white">{r.title}</p>
                  <div className="mt-1.5 flex items-center gap-3 text-[10px] font-semibold text-white/90">
                    <span className="flex items-center gap-1"><Play className="h-3 w-3 fill-current" />{r.views}</span>
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3 fill-current" />{r.likes}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
