import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import VideoLightbox from "@/components/hero/VideoLightbox";
import type { HeroVideo } from "@/data/heroVideos";
import { testimonialVideos, type TestimonialVideo } from "@/data/testimonialVideos";

function toHeroVideo(v: TestimonialVideo): HeroVideo {
  return {
    id: v.id,
    platform: v.platform,
    videoId: v.videoId,
    title: `Depoimento — ${v.name}`,
    kind: "Depoimento",
    thumb: v.thumb ?? "",
    aspect: "9/16",
  };
}

function Reel({
  v,
  featured,
  onOpen,
}: {
  v: TestimonialVideo;
  featured: boolean;
  onOpen: () => void;
}) {
  const playable = Boolean(v.videoId);
  return (
    <button
      type="button"
      onClick={playable ? onOpen : undefined}
      aria-disabled={!playable}
      aria-label={playable ? `Assistir depoimento de ${v.name}` : `Depoimento de ${v.name} em breve`}
      className="group relative block w-[68vw] max-w-[300px] flex-shrink-0 overflow-hidden border text-left transition-all duration-700 ease-out sm:w-[260px]"
      style={{
        aspectRatio: "9 / 16",
        borderColor: featured ? "rgba(163,129,60,0.55)" : "rgba(42,34,51,0.12)",
        transform: featured ? "scale(1)" : "scale(0.9)",
        opacity: featured ? 1 : 0.62,
        cursor: playable ? "pointer" : "default",
        boxShadow: featured
          ? "0 30px 70px -35px rgba(42,34,51,0.35)"
          : "0 10px 30px -22px rgba(42,34,51,0.25)",
      }}
    >
      {v.thumb ? (
        <img src={v.thumb} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 22%, rgba(231,217,181,0.85), rgba(231,217,181,0) 70%), linear-gradient(180deg, #ffffff 0%, #f6efe2 60%, #eee2cd 100%)",
          }}
        />
      )}

      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/5"
        style={{
          background: v.thumb
            ? "linear-gradient(to top, rgba(20,16,26,0.82), rgba(20,16,26,0))"
            : "linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0))",
        }}
      />

      <span className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#a3813c]/70 bg-white/70 text-[#a3813c] transition-transform duration-300 group-hover:scale-110"
          style={{ WebkitBackdropFilter: "blur(4px)", backdropFilter: "blur(4px)" }}
        >
          <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
          {playable ? "Assistir" : "Em breve"}
        </span>
      </span>

      <span className="absolute inset-x-0 bottom-0 block p-5">
        <span
          className={`block text-xl font-normal ${v.thumb ? "text-white" : "text-[#2a2233]"}`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {v.name}
        </span>
        <span
          className={`mt-1 block text-[11px] font-light uppercase tracking-[0.18em] ${
            v.thumb ? "text-white/75" : "text-[#4a4152]/70"
          }`}
        >
          {v.context}
        </span>
      </span>
    </button>
  );
}

/** Carrossel de depoimentos em vídeo vertical. Desktop: 3 visíveis com o
 *  central em destaque. Mobile: swipe lateral com snap, um por vez. */
export default function ReelCarousel() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<TestimonialVideo | null>(null);
  const total = testimonialVideos.length;

  const go = (dir: number) => setActive((a) => (a + dir + total) % total);

  // Desktop: janela de 3 centrada no ativo.
  const window3 = [-1, 0, 1].map((o) => testimonialVideos[(active + o + total) % total]);

  return (
    <>
      {/* Mobile — trilha com snap */}
      <div
        className="flex gap-4 overflow-x-auto px-6 pb-4 md:hidden"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
      >
        {testimonialVideos.map((v) => (
          <div key={v.id} style={{ scrollSnapAlign: "center" }}>
            <Reel v={v} featured onOpen={() => setOpen(v)} />
          </div>
        ))}
      </div>

      {/* Desktop — 3 visíveis, central em destaque */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center gap-6">
          {window3.map((v, i) => (
            <Reel key={`${v.id}-${i}`} v={v} featured={i === 1} onOpen={() => (i === 1 ? setOpen(v) : go(i - 1))} />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Depoimento anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#a3813c]/50 text-[#a3813c] transition-colors hover:bg-[#f2e9d8]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonialVideos.map((v, i) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                className="h-px transition-all duration-500"
                style={{
                  width: i === active ? 40 : 18,
                  background: i === active ? "#a3813c" : "rgba(42,34,51,0.25)",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo depoimento"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#a3813c]/50 text-[#a3813c] transition-colors hover:bg-[#f2e9d8]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <VideoLightbox
        video={open && open.videoId ? toHeroVideo(open) : null}
        onClose={() => setOpen(null)}
      />
    </>
  );
}
