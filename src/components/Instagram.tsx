import { useEffect, useRef, useState } from "react";
import { Instagram as InstagramIcon, Play, Film, Heart, MessageCircle } from "lucide-react";

const INSTAGRAM_URL = "https://instagram.com/julianalealreumato";
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

const FEED_SNAPSHOT: BeholdFeed = {
  biography:
    "👩🏼‍⚕️ Médica • Maceió | União Palmares\n🩺 Reumatologista • RQE 4857\n🏥 Pós Graduação Dor Crônica USP",
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
      caption: "Quem tem lúpus pode usar Mounjaro? Essa é uma dúvida muito comum no consultório.",
      likeCount: 31,
      commentsCount: 2,
      hashtags: ["Lúpus", "Mounjaro"],
      sizes: {
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
      caption: "Muita gente acha que a infiltração é o primeiro tratamento para o dedo em gatilho, mas nem sempre é assim.",
      likeCount: 14,
      commentsCount: 1,
      hashtags: ["DedoEmGatilho", "Infiltração"],
      sizes: {
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
      caption: "\u201CDra., por que corticoide engorda?\u201D Uma das dúvidas que mais escuto no consultório.",
      likeCount: 20,
      commentsCount: 10,
      hashtags: ["Corticoide"],
      sizes: {
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
      caption: "Nem tudo que o corpo sente é \u201Cenergia negativa\u201D ou inveja. Investigue causas clínicas.",
      likeCount: 38,
      commentsCount: 7,
      hashtags: ["Reumatologia", "Autoimunes"],
      sizes: {
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
      caption: "📢 Pneumo 20 agora disponível pelo SUS. Prevenção é parte fundamental do tratamento reumatológico.",
      likeCount: 17,
      commentsCount: 2,
      hashtags: ["Vacinação", "SUS"],
      sizes: {
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
      caption: "Dedo travando, estalando ou causando dor ao movimentar? Infiltração pode ajudar quando indicada.",
      likeCount: 7,
      commentsCount: 0,
      hashtags: ["Infiltração", "Ortopedia"],
      sizes: {
        large: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxODEyMTU2ODE3MDY3MjQzNiIsImgiOiIxZjg3MnIifQ.jpg?class=originalLarge",
        },
      },
    },
    {
      id: "18119520949699753",
      permalink: "https://www.instagram.com/reel/DaI6EtgRTxp/",
      mediaType: "VIDEO",
      isReel: true,
      caption: "Diagnóstico precoce muda a história de quem convive com doenças reumatológicas.",
      likeCount: 22,
      commentsCount: 3,
      hashtags: ["DiagnósticoPrecoce"],
      sizes: {
        large: {
          mediaUrl:
            "https://hop.behold.pictures/eyJ1IjoibW9QOEd3SFVHTWdvVUU2VndUMkJycU9abVZ5MiIsImYiOiJHMDBMWUNqU2NtbnRxZW1GQlZmRyIsInAiOiIxODExOTUyMDk0OTY5OTc1MiIsImgiOiIxZzZoejh6In0.jpg?class=originalLarge",
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

// Bento layout: 7 tiles across a 4-col × 3-row grid on desktop
const BENTO = [
  "md:col-span-2 md:row-span-2", // 0 — feature
  "md:col-span-1 md:row-span-1", // 1
  "md:col-span-1 md:row-span-1", // 2
  "md:col-span-1 md:row-span-1", // 3
  "md:col-span-1 md:row-span-1", // 4
  "md:col-span-2 md:row-span-1", // 5 — wide
  "md:col-span-2 md:row-span-1", // 6 — wide
];

export default function Instagram() {
  const { ref, visible } = useReveal();
  const [feed, setFeed] = useState<BeholdFeed>(FEED_SNAPSHOT);
  const [playing, setPlaying] = useState<BeholdPost | null>(null);

  useEffect(() => {
    if (!BEHOLD_FEED_URL) return;
    let cancelled = false;
    fetch(BEHOLD_FEED_URL)
      .then((r) => r.json())
      .then((data: BeholdFeed) => {
        if (!cancelled && data?.posts?.length) setFeed(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlaying(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  const posts = feed.posts.slice(0, 7);

  return (
    <section
      id="instagram"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Decorative ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-[10%] h-96 w-96 rounded-full bg-gradient-to-br from-primary/25 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-[5%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-amber-200/30 to-pink-200/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
      </div>

      <div
        ref={ref}
        className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              @julianalealreumato
            </p>
            <h2
              className="mt-3 text-balance text-4xl font-normal tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Direto do Instagram
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Conteúdo autoral sobre reumatologia, dor crônica, infiltrações e cuidado
              integrativo. Toque em qualquer publicação para assistir sem sair do site.
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#8e82b8] bg-transparent px-6 py-3 text-sm font-semibold text-[#8e82b8] transition-all hover:scale-[1.03] hover:bg-[#8e82b8]/10 active:scale-[0.97]"
          >
            <InstagramIcon className="h-4 w-4" />
            Seguir perfil
            <span className="ml-1 rounded-full border border-[#8e82b8]/30 px-2 py-0.5 text-[0.7rem]">
              +{feed.followersCount?.toLocaleString("pt-BR")}
            </span>
          </a>
        </div>

        {/* Bento grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[16rem] md:grid-cols-4 lg:auto-rows-[18rem]">
          {posts.map((p, i) => {
            const span = BENTO[i] || "md:col-span-1 md:row-span-1";
            const isFeature = i === 0;
            const isVideo = p.mediaType === "VIDEO";
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlaying(p)}
                className={`group relative overflow-hidden rounded-3xl bg-black text-left shadow-[0_20px_50px_-30px_rgba(70,50,120,0.35)] ring-1 ring-white/40 transition-all duration-500 hover:shadow-[0_30px_70px_-25px_rgba(70,50,120,0.5)] hover:ring-primary/40 ${span} ${
                  isFeature ? "min-h-[24rem] sm:min-h-0" : "min-h-[16rem] sm:min-h-0"
                }`}
                style={{
                  animation: visible
                    ? `fade-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 80}ms both`
                    : undefined,
                }}
              >
                <img
                  src={getCover(p)}
                  alt={shortCaption(p) || "Publicação Instagram"}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

                {/* Top-left badge */}
                <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {isVideo ? <Film className="h-3 w-3" /> : <InstagramIcon className="h-3 w-3" />}
                    {isVideo ? "Reel" : "Post"}
                  </span>
                </div>

                {/* Play button (center) */}
                {isVideo && (
                  <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-110">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur ring-4 ring-white/30 group-hover:bg-white">
                      <Play className={`h-5 w-5 fill-primary text-primary ${isFeature ? "translate-x-0.5" : "translate-x-0.5"}`} />
                    </span>
                  </span>
                )}

                {/* Caption + stats */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                  <p
                    className={`line-clamp-2 text-white ${
                      isFeature ? "text-lg sm:text-xl" : "text-sm sm:text-[0.95rem]"
                    }`}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {shortCaption(p)}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-[0.7rem] font-medium text-white/85">
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" /> {p.likeCount ?? 0}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" /> {p.commentsCount ?? 0}
                    </span>
                    {p.hashtags?.slice(0, 2).map((h) => (
                      <span
                        key={h}
                        className="rounded-full bg-white/15 px-2 py-0.5 text-[0.65rem] backdrop-blur"
                      >
                        #{h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover accent border */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-primary/0 transition-all duration-500 group-hover:ring-2 group-hover:ring-primary/50" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Player modal */}
      {playing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur"
          onClick={() => setPlaying(null)}
        >
          <button
            type="button"
            onClick={() => setPlaying(null)}
            aria-label="Fechar"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            ✕
          </button>
          <div
            className="relative w-full max-w-[400px] overflow-hidden rounded-2xl bg-black shadow-2xl"
            style={{ aspectRatio: "9 / 16" }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`${playing.permalink.replace(/\/?$/, "/")}embed/captioned/?cr=1&autoplay=1`}
              title={shortCaption(playing) || "Instagram"}
              className="absolute inset-0 h-full w-full"
              frameBorder={0}
              scrolling="no"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
