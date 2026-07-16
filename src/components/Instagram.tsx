import { useEffect, useRef, useState } from "react";
import { Instagram as InstagramIcon, Play, Film, ChevronLeft, ChevronRight } from "lucide-react";

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

export default function Instagram() {
  const { ref, visible } = useReveal();
  const [feed, setFeed] = useState<BeholdFeed>(FEED_SNAPSHOT);
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

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

  const reels = feed.posts.filter((p) => p.mediaType === "VIDEO").slice(0, 7);

  // Detecta qual item está no centro do scroller e o marca como ativo
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let raf = 0;
    const update = () => {
      const rect = scroller.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      let best = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = Math.abs(c - centerX);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIdx((prev) => (prev === best ? prev : best));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reels.length]);

  const scrollToIdx = (i: number) => {
    const el = itemRefs.current[i];
    const scroller = scrollerRef.current;
    if (!el || !scroller) return;
    const target = el.offsetLeft - (scroller.clientWidth - el.clientWidth) / 2;
    scroller.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section
      id="instagram"
      className="relative bg-gradient-to-b from-background via-secondary/30 to-background py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br from-pink-300/30 to-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-200/30 to-primary/10 blur-3xl" />
      </div>

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
            Direto do Instagram
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Deslize o carrossel — o vídeo no centro é reproduzido automaticamente.
          </p>
        </div>

        {/* Carrossel horizontal — centro é o player ativo */}
        <div className="relative mt-14">
          {/* Máscara lateral */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

          <button
            type="button"
            onClick={() => scrollToIdx(Math.max(0, activeIdx - 1))}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-md backdrop-blur transition hover:bg-white sm:block"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIdx(Math.min(reels.length - 1, activeIdx + 1))}
            aria-label="Próximo"
            className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-md backdrop-blur transition hover:bg-white sm:block"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>

          <div
            ref={scrollerRef}
            className="flex items-center gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              paddingLeft: "calc(50% - 200px)",
              paddingRight: "calc(50% - 200px)",
            }}
          >
            {reels.map((p, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={p.id}
                  ref={(el) => (itemRefs.current[i] = el)}
                  type="button"
                  onClick={() => scrollToIdx(i)}
                  aria-label={`Selecionar vídeo: ${shortCaption(p)}`}
                  className={`group relative snap-center shrink-0 overflow-hidden rounded-[2rem] bg-black transition-all duration-500 ease-out ${
                    isActive
                      ? "h-[640px] w-[360px] shadow-[0_30px_80px_-30px_rgba(60,50,90,0.6)] ring-2 ring-primary"
                      : "h-[440px] w-[248px] opacity-55 hover:opacity-80"
                  }`}
                >
                  {isActive ? (
                    <iframe
                      key={p.id}
                      src={`${p.permalink.replace(/\/?$/, "/")}embed/captioned/`}
                      title={shortCaption(p) || "Instagram reel"}
                      className="absolute inset-0 h-full w-full"
                      frameBorder={0}
                      scrolling="no"
                      allow="autoplay; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={getCover(p)}
                        alt={shortCaption(p)}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/25 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-white backdrop-blur">
                        <Film className="h-3 w-3" /> Reel
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-white/90 p-4 shadow-md backdrop-blur-sm transition group-hover:scale-110">
                          <Play className="h-5 w-5 fill-black text-black" />
                        </div>
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-1.5">
            {reels.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIdx(i)}
                aria-label={`Ir para vídeo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIdx ? "w-6 bg-primary" : "w-1.5 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA seguir */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-pink-500/25 transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            <InstagramIcon className="h-5 w-5" />
            Seguir @julianalealreumato
          </a>
          <span className="text-sm text-muted-foreground">
            +{feed.followersCount?.toLocaleString("pt-BR")} seguidores
          </span>
        </div>
      </div>
    </section>
  );
}
