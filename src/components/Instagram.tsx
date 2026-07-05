import { useEffect, useRef, useState } from "react";
import { Instagram as InstagramIcon, Play, Heart, Grid3x3, Film, Bookmark, UserSquare2, X } from "lucide-react";

const INSTAGRAM_URL = "https://instagram.com/julianalealreumato";

/**
 * Behold feed URL — set here to fetch the latest posts dynamically.
 * Ex.: "https://feeds.behold.so/xxxxxxxx"
 * Se vazio, usa o snapshot embutido abaixo (última atualização manual).
 */
const BEHOLD_FEED_URL = "";

type BeholdPost = {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  isReel?: boolean;
  caption?: string;
  prunedCaption?: string;
  likeCount?: number;
  commentsCount?: number;
  hashtags?: string[];
  sizes?: {
    small?: { mediaUrl: string };
    medium?: { mediaUrl: string };
    large?: { mediaUrl: string };
    full?: { mediaUrl: string };
  };
  thumbnailUrl?: string;
  mediaUrl?: string;
};

type BeholdFeed = {
  biography?: string;
  profilePictureUrl?: string;
  followersCount?: number;
  followsCount?: number;
  posts: BeholdPost[];
};

// Snapshot do feed (Behold) — 06/2026
const FEED_SNAPSHOT: BeholdFeed = {
  biography:
    "👩🏼‍⚕️ Médica • Maceió | União Palmares\n🩺 Reumatologista • RQE 4857\n🏥 Pós Graduação Dor Crônica USP\n👨‍👩‍👦‍👦 Mãe e esposa\n⬇️ Consultas",
  profilePictureUrl:
    "https://cdn2.behold.pictures/moP8GwHUGMgoUE6VwT2BrqOZmVy2/17841400873120857/profile.webp",
  followersCount: 1381,
  followsCount: 2118,
  posts: [
    {
      id: "18119520949699752",
      permalink: "https://www.instagram.com/reel/DaI6EtgRTxp/",
      mediaType: "VIDEO",
      isReel: true,
      caption:
        "Quem tem lúpus pode usar Mounjaro? Essa é uma dúvida muito comum no consultório.",
      likeCount: 31,
      commentsCount: 2,
      hashtags: ["Lúpus", "Mounjaro"],
      sizes: {
        medium: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxODExOTUyMDk0OTY5OTc1MiIsImgiOiIxZzZoejh6In0.jpg?class=originalMedium",
        },
        large: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxODExOTUyMDk0OTY5OTc1MiIsImgiOiIxZzZoejh6In0.jpg?class=originalLarge",
        },
      },
    },
    {
      id: "18106491170080492",
      permalink: "https://www.instagram.com/reel/DaIjdxCgLBg/",
      mediaType: "VIDEO",
      isReel: true,
      caption:
        "Muita gente acha que a infiltração é o primeiro tratamento para o dedo em gatilho, mas nem sempre é assim.",
      likeCount: 14,
      commentsCount: 1,
      hashtags: ["DedoEmGatilho", "Infiltração"],
      sizes: {
        medium: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxODEwNjQ5MTE3MDA4MDQ5MiIsImgiOiIxdnd1cGM4In0.jpg?class=originalMedium",
        },
        large: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxODEwNjQ5MTE3MDA4MDQ5MiIsImgiOiIxdnd1cGM4In0.jpg?class=originalLarge",
        },
      },
    },
    {
      id: "18536414638073489",
      permalink: "https://www.instagram.com/reel/DaIiF-pgvX8/",
      mediaType: "VIDEO",
      isReel: true,
      caption:
        "“Dra., por que corticoide engorda?” Uma das dúvidas que mais escuto no consultório.",
      likeCount: 20,
      commentsCount: 10,
      hashtags: ["Corticoide"],
      sizes: {
        medium: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxODUzNjQxNDYzODA3MzQ4OSIsImgiOiJmMDBiZG0ifQ.jpg?class=originalMedium",
        },
        large: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxODUzNjQxNDYzODA3MzQ4OSIsImgiOiJmMDBiZG0ifQ.jpg?class=originalLarge",
        },
      },
    },
    {
      id: "17990611385814017",
      permalink: "https://www.instagram.com/reel/DaBxH9XNXbm/",
      mediaType: "VIDEO",
      isReel: true,
      caption:
        "Nem tudo que o corpo sente é “energia negativa” ou inveja. Investigue causas clínicas.",
      likeCount: 38,
      commentsCount: 7,
      hashtags: ["Reumatologia", "Autoimunes"],
      sizes: {
        medium: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxNzk5MDYxMTM4NTgxNDAxNyIsImgiOiIxb3FzNmhxIn0.jpg?class=originalMedium",
        },
        large: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxNzk5MDYxMTM4NTgxNDAxNyIsImgiOiIxb3FzNmhxIn0.jpg?class=originalLarge",
        },
      },
    },
    {
      id: "17899056315467262",
      permalink: "https://www.instagram.com/p/DZxtS77pbUu/",
      mediaType: "IMAGE",
      caption:
        "📢 Pneumo 20 agora disponível pelo SUS. Prevenção é parte fundamental do tratamento reumatológico.",
      likeCount: 17,
      commentsCount: 2,
      hashtags: ["Vacinação", "SUS"],
      sizes: {
        medium: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxNzg5OTA1NjMxNTQ2NzI2MiIsImgiOiIxZzl4bDU1In0.jpg?class=originalMedium",
        },
        large: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxNzg5OTA1NjMxNTQ2NzI2MiIsImgiOiIxZzl4bDU1In0.jpg?class=originalLarge",
        },
      },
    },
    {
      id: "18121568170672436",
      permalink: "https://www.instagram.com/reel/DZsRB9sJXsP/",
      mediaType: "VIDEO",
      isReel: true,
      caption:
        "Dedo travando, estalando ou causando dor ao movimentar? Infiltração pode ajudar quando indicada.",
      likeCount: 7,
      commentsCount: 0,
      hashtags: ["Infiltração", "Ortopedia"],
      sizes: {
        medium: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxODEyMTU2ODE3MDY3MjQzNiIsImgiOiIxZjg3MnIifQ.jpg?class=originalMedium",
        },
        large: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxODEyMTU2ODE3MDY3MjQzNiIsImgiOiIxZjg3MnIifQ.jpg?class=originalLarge",
        },
      },
    },
  ],
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function getCover(p: BeholdPost) {
  return (
    p.sizes?.large?.mediaUrl ||
    p.sizes?.medium?.mediaUrl ||
    p.sizes?.small?.mediaUrl ||
    p.sizes?.full?.mediaUrl ||
    p.thumbnailUrl ||
    ""
  );
}

function shortCaption(p: BeholdPost) {
  const text = (p.prunedCaption || p.caption || "").split("\n")[0];
  return text.length > 130 ? text.slice(0, 127) + "…" : text;
}

function IPhoneMockup({ feed }: { feed: BeholdFeed }) {
  const gridPosts = feed.posts.slice(0, 6);
  return (
    <div className="relative mx-auto" style={{ width: 340 }}>
      <div className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-primary/30 via-pink-300/20 to-amber-200/20 blur-3xl" />

      <div
        className="relative rounded-[3rem] bg-gradient-to-b from-zinc-800 to-zinc-950 p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]"
        style={{ aspectRatio: "9 / 19.5" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.85rem] bg-black">
          <span className="absolute left-[-3px] top-24 h-8 w-[3px] rounded-l bg-zinc-700" />
          <span className="absolute left-[-3px] top-36 h-14 w-[3px] rounded-l bg-zinc-700" />
          <span className="absolute left-[-3px] top-56 h-14 w-[3px] rounded-l bg-zinc-700" />
          <span className="absolute right-[-3px] top-40 h-20 w-[3px] rounded-r bg-zinc-700" />

          <div className="relative flex h-full w-full flex-col bg-white">
            <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />

            <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-black">
              <span>9:41</span>
              <span className="w-28" />
              <span className="flex items-center gap-1">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
                  <rect x="0" y="6" width="2" height="4" rx="0.5" />
                  <rect x="3.5" y="4" width="2" height="6" rx="0.5" />
                  <rect x="7" y="2" width="2" height="8" rx="0.5" />
                  <rect x="10.5" y="0" width="2" height="10" rx="0.5" />
                </svg>
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between border-b border-zinc-100 px-4 pb-2">
              <span className="text-base font-semibold text-black">julianalealreumato</span>
              <InstagramIcon className="h-5 w-5 text-black" />
            </div>

            <div className="flex items-center gap-4 px-4 pt-4">
              <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                <div className="rounded-full bg-white p-[2px]">
                  <img
                    src={feed.profilePictureUrl}
                    alt="Dra. Juliana Leal"
                    className="h-16 w-16 rounded-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex flex-1 justify-around text-center text-[11px] text-black">
                <div>
                  <div className="text-sm font-semibold">{feed.posts.length}+</div>
                  <div className="text-zinc-500">posts</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {feed.followersCount?.toLocaleString("pt-BR")}
                  </div>
                  <div className="text-zinc-500">seguidores</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {feed.followsCount?.toLocaleString("pt-BR")}
                  </div>
                  <div className="text-zinc-500">seguindo</div>
                </div>
              </div>
            </div>

            <div className="px-4 pt-3 text-[11px] leading-snug text-black whitespace-pre-line">
              <div className="font-semibold">Dra. Juliana Leal · Reumatologista</div>
              <div className="text-zinc-700">{feed.biography}</div>
            </div>

            <div className="mt-3 flex gap-2 px-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-md bg-[#0095f6] py-1.5 text-center text-[11px] font-semibold text-white"
              >
                Seguir
              </a>
              <button className="flex-1 rounded-md bg-zinc-100 py-1.5 text-[11px] font-semibold text-black">
                Mensagem
              </button>
              <button className="rounded-md bg-zinc-100 px-2 py-1.5 text-[11px] font-semibold text-black">▾</button>
            </div>

            <div className="mt-3 flex border-t border-zinc-200 text-zinc-500">
              <div className="flex flex-1 justify-center border-t-2 border-black py-2 text-black">
                <Grid3x3 className="h-4 w-4" />
              </div>
              <div className="flex flex-1 justify-center py-2">
                <Film className="h-4 w-4" />
              </div>
              <div className="flex flex-1 justify-center py-2">
                <UserSquare2 className="h-4 w-4" />
              </div>
              <div className="flex flex-1 justify-center py-2">
                <Bookmark className="h-4 w-4" />
              </div>
            </div>

            <div className="grid flex-1 grid-cols-3 gap-[2px] overflow-hidden">
              {gridPosts.map((p) => (
                <a
                  key={p.id}
                  href={p.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block bg-zinc-100"
                >
                  <img
                    src={getCover(p)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  {p.isReel && <Film className="absolute right-1 top-1 h-3 w-3 text-white drop-shadow" />}
                </a>
              ))}
            </div>

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
  const [feed, setFeed] = useState<BeholdFeed>(FEED_SNAPSHOT);
  const [activePost, setActivePost] = useState<BeholdPost | null>(null);

  useEffect(() => {
    if (!activePost) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActivePost(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activePost]);

  useEffect(() => {
    if (!BEHOLD_FEED_URL) return;
    let cancelled = false;
    fetch(BEHOLD_FEED_URL)
      .then((r) => r.json())
      .then((data: BeholdFeed) => {
        if (!cancelled && data?.posts?.length) setFeed(data);
      })
      .catch(() => {
        /* mantém snapshot */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const reels = feed.posts.slice(0, 6);

  return (
    <section
      id="instagram"
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br from-pink-300/30 to-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-200/30 to-primary/10 blur-3xl" />

      <div
        ref={ref}
        className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            @julianalealreumato
          </p>
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

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="flex justify-center">
            <IPhoneMockup feed={feed} />
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
              <span className="text-sm text-muted-foreground">
                +{feed.followersCount?.toLocaleString("pt-BR")} seguidores
              </span>
            </div>
          </div>
        </div>

        {/* Reels — galeria expansiva estilo Blog */}
        <div className="mt-24">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Últimas publicações
              </p>
              <h3
                className="mt-2 text-3xl font-normal text-foreground sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Direto do Instagram
              </h3>
              <p className="mt-3 text-base text-muted-foreground">
                Passe o mouse sobre cada post para ver a legenda.
              </p>
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

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-3 sm:h-[520px]">
            {reels.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePost(p)}
                aria-label={`Reproduzir: ${shortCaption(p)}`}
                className={`group relative block overflow-hidden rounded-2xl shadow-md transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex-1 sm:hover:flex-[2.6] sm:focus-within:flex-[2.6] h-80 sm:h-full text-left cursor-pointer ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: visible ? `${200 + i * 90}ms` : "0ms" }}
              >
                <img
                  src={getCover(p)}
                  alt={shortCaption(p)}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[600ms] group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/40 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                {/* top badge */}
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/25 backdrop-blur px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
                    {p.isReel ? (
                      <>
                        <Film className="h-3 w-3" /> Reel
                      </>
                    ) : (
                      <>
                        <InstagramIcon className="h-3 w-3" /> Post
                      </>
                    )}
                  </span>
                </div>

                {/* play icon center for reels */}
                {p.isReel && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-70 transition-opacity duration-300 group-hover:opacity-0">
                    <div className="rounded-full bg-white/85 p-3 backdrop-blur-sm">
                      <Play className="h-6 w-6 fill-black text-black" />
                    </div>
                  </div>
                )}

                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-4 text-xs font-semibold text-white/90">
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 fill-current" />
                      {p.likeCount}
                    </span>
                    {typeof p.commentsCount === "number" && (
                      <span className="inline-flex items-center gap-1">💬 {p.commentsCount}</span>
                    )}
                  </div>
                  <h4
                    className="mt-2 text-xl sm:text-2xl font-semibold leading-snug drop-shadow line-clamp-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {shortCaption(p)}
                  </h4>

                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-3 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 group-focus-within:mt-3">
                    <div className="overflow-hidden">
                      {p.hashtags && p.hashtags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {p.hashtags.slice(0, 4).map((h) => (
                            <span
                              key={h}
                              className="rounded-full bg-white/15 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-white/90"
                            >
                              #{h}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary transition-transform hover:scale-105">
                        {p.isReel ? "Assistir vídeo" : "Ver publicação"}
                        <Play className="h-3 w-3 fill-current" />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de vídeo/post */}
      {activePost && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setActivePost(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setActivePost(null)}
            aria-label="Fechar"
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative w-full max-w-[420px] overflow-hidden rounded-2xl bg-black shadow-2xl"
            style={{ aspectRatio: "9 / 16", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`${activePost.permalink.replace(/\/?$/, "/")}embed/captioned/`}
              title="Instagram"
              className="absolute inset-0 h-full w-full"
              frameBorder={0}
              scrolling="no"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <a
            href={activePost.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/15 backdrop-blur px-4 py-2 text-xs font-semibold text-white hover:bg-white/25"
          >
            Abrir no Instagram ↗
          </a>
        </div>
      )}
    </section>
  );
}
