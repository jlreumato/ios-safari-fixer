import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { embedUrl, type HeroVideo } from "@/data/heroVideos";

type Props = { video: HeroVideo | null; onClose: () => void };

export default function VideoLightbox({ video, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!video) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [video, onClose]);

  if (!video) return null;

  const vertical = video.aspect === "9/16";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0b0813]/92 p-4 -webkit-backdrop-filter backdrop-filter backdrop-blur-sm animate-fade-in"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar vídeo"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#a3813c]/50 text-[#a3813c] transition-colors hover:bg-[#f2e9d8] focus-visible:ring-2 focus-visible:ring-[#a3813c]"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full overflow-hidden border border-[#a3813c]/25 bg-black shadow-[0_30px_80px_-30px_rgba(42,34,51,0.35)]"
        style={{
          maxWidth: vertical ? "min(420px, 92vw)" : "min(960px, 94vw)",
          aspectRatio: vertical ? "9 / 16" : "16 / 9",
          maxHeight: "86dvh",
        }}
      >
        {vertical ? (
          // Instagram: o embed vem com cabeçalho e rodapé (curtidas/comentários).
          // Ampliamos o iframe e deslocamos para enquadrar somente o vídeo.
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              src={embedUrl(video)}
              title={video.title}
              scrolling="no"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute left-0 w-full"
              style={{ border: 0, top: "-58px", height: "calc(100% + 520px)" }}
            />
          </div>
        ) : (

          <iframe
            src={embedUrl(video)}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full"
            style={{ border: 0 }}
          />
        )}
      </div>

    </div>
  );
}
