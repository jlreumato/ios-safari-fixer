import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import heroVideoColor from "@/assets/hero-video-real-color.mp4.asset.json";
import heroVideoSlowmo from "@/assets/hero-video-slowmo.mp4.asset.json";
import heroPoster from "@/assets/dra-juliana-about.jpg.asset.json";
import heroPosterMobile from "@/assets/hero-poster-mobile.webp.asset.json";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

/** Raio da lanterna de cor que segue o mouse (px). */
const SPOT_RADIUS = 240;

/** Decide se devemos pular o vídeo (mobile em conexão lenta / save-data). */
function shouldSkipVideoInitially(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const slow = !!conn?.saveData || ["slow-2g", "2g", "3g"].includes(conn?.effectiveType ?? "");
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  return isMobile && slow;
}

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const [mountVideo, setMountVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [spotlightEnabled, setSpotlightEnabled] = useState(false);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });

  /** Teste A/B: ?video=slowmo usa a montagem com efeitos + slow motion no joelho. */
  const [variant, setVariant] = useState<"color" | "slowmo">("color");
  const [showToggle, setShowToggle] = useState(false);
  const heroVideo = variant === "slowmo" ? heroVideoSlowmo : heroVideoColor;



  const sectionRef = useRef<HTMLElement>(null);
  const baseVideoRef = useRef<HTMLVideoElement>(null);
  
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    // A lanterna de cor só faz sentido em ponteiro fino (mouse/trackpad).
    setSpotlightEnabled(
      window.matchMedia("(pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    if (shouldSkipVideoInitially()) return;
    // Adia a montagem do vídeo para depois do primeiro paint,
    // garantindo que o poster (LCP) apareça primeiro.
    const idle = (cb: () => void) => {
      const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number };
      if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(cb);
      else window.setTimeout(cb, 200);
    };
    idle(() => setMountVideo(true));
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!spotlightEnabled) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setSpot({ x, y, active: true }));
  };

  /** Máscara INVERSA: buraco (transparente) onde o mouse está —
      é ali que a camada dessaturada não é pintada, revelando a cor. */
  const holeMask = spot.active
    ? `radial-gradient(circle ${SPOT_RADIUS}px at ${spot.x}px ${spot.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.45) 62%, rgba(0,0,0,0.85) 82%, rgba(0,0,0,1) 100%)`
    : "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))";



  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden"
      onMouseMove={handleMove}
      onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
    >
      {/* Poster estático — LCP. Sempre renderizado (inclusive no iOS, onde o
          autoplay do vídeo pode ser adiado/bloqueado e deixaria a área vazia). */}
      <picture>
        <source media="(max-width: 767px)" srcSet={heroPosterMobile.url} />
        <img
          src={heroPoster.url}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"

        />
      </picture>


      {/* Vídeo carrega por trás; faz cross-fade quando pronto */}
      {mountVideo && (
        <video
          ref={baseVideoRef}
          src={heroVideo.url}
          poster={heroPoster.url}
          autoPlay
          loop
          muted
          playsInline
          {...{ "webkit-playsinline": "true" }}
          preload="metadata"
          onLoadedData={() => setVideoReady(true)}
          onTimeUpdate={(e) => {
            if (!isMobile) return;
            const v = e.currentTarget;
            if (v.currentTime >= 5) v.currentTime = 0;
          }}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: videoReady ? 1 : 0 }}
          aria-hidden="true"
        />
      )}

      {/* Lanterna de cor: uma camada dessaturada cobre tudo e tem um "buraco"
          (máscara inversa) no cursor — ali a cor original aparece. */}
      {spotlightEnabled && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              WebkitBackdropFilter: "grayscale(1) contrast(1.06) brightness(0.95)",
              backdropFilter: "grayscale(1) contrast(1.06) brightness(0.95)",
              WebkitMaskImage: holeMask,
              maskImage: holeMask,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              transition: "-webkit-mask-image 120ms linear, mask-image 120ms linear",
            }}
            aria-hidden="true"
          />

          {/* Halo luminoso suave na borda do foco */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: spot.active ? 1 : 0,
              background: `radial-gradient(circle ${SPOT_RADIUS * 1.1}px at ${spot.x}px ${spot.y}px, transparent 0%, transparent 48%, hsl(45 60% 90% / 0.10) 72%, transparent 92%)`,
            }}
            aria-hidden="true"
          />
        </>
      )}



      {/* Legibility overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0e0a1a]/80 via-[#0e0a1a]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />


      {/* Content over the video */}
      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/5 -webkit-backdrop-filter backdrop-filter backdrop-blur-md px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[#e7d9b5]/85 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards] sm:text-xs">
            Reumatologista · CRM/AL 6717 · RQE 4857
          </p>

          <h1
            className="text-balance text-4xl font-normal leading-[1.05] tracking-tight text-white opacity-0 animate-[fadeInUp_0.7s_ease-out_0.25s_forwards] sm:text-5xl lg:text-7xl xl:text-8xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Humanidade para transformar sua{" "}
            <span className="italic text-[#e7d9b5]">DOR</span>
            <span className="text-white"> em </span>
            <span className="italic text-[#e7d9b5]">LIBERDADE!</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.45s_forwards] sm:text-lg">
            Dra. Juliana Leal — Especialista em Dor e pós-graduada pela USP-SP. Atendimento humanizado em doenças reumáticas e autoimunes.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.6s_forwards] sm:flex-row sm:items-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="btn-champagne btn-glow-ring gap-2 px-8 text-base active:scale-[0.97]"
              >
                <WhatsAppIcon size={20} />
                Agendar Consulta
              </Button>
            </a>

            <a
              href="#sobre"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 -webkit-backdrop-filter backdrop-filter backdrop-blur-sm px-5 py-2.5 text-base font-medium text-white/90 transition-colors hover:bg-white/15"
            >
              Conheça a Dra. Juliana
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#sobre"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-base font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
        >
          Role para explorar
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </section>
  );
}
