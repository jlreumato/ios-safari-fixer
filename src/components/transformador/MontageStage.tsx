import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MontageClip, MontageSettings, TransitionKind } from "@/hooks/useMontage";

type Props = {
  clips: MontageClip[];
  settings: MontageSettings;
  /** Vídeo usado quando nenhuma cena foi enviada ainda. */
  fallbackSrc?: string;
  className?: string;
  playing?: boolean;
};

function variantsFor(kind: TransitionKind, spinSpeed: number) {
  const spin = Math.max(0.2, spinSpeed);
  switch (kind) {
    case "spin360":
      return {
        enter: { opacity: 0, rotateY: -360 / spin, scale: 0.86 },
        center: { opacity: 1, rotateY: 0, scale: 1 },
        exit: { opacity: 0, rotateY: 360 / spin, scale: 0.86 },
      };
    case "spinSide":
      return {
        enter: { opacity: 0, rotateY: -95, x: "18%", scale: 0.92 },
        center: { opacity: 1, rotateY: 0, x: "0%", scale: 1 },
        exit: { opacity: 0, rotateY: 95, x: "-18%", scale: 0.92 },
      };
    case "zoom":
      return {
        enter: { opacity: 0, scale: 1.35 },
        center: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.82 },
      };
    case "flash":
      return {
        enter: { opacity: 0, scale: 1.06, filter: "brightness(2.2)" },
        center: { opacity: 1, scale: 1, filter: "brightness(1)" },
        exit: { opacity: 0, scale: 1.02, filter: "brightness(2.2)" },
      };
    default:
      return {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      };
  }
}

/**
 * Montagem ao vivo do TransformaDOR: as cenas enviadas no painel entram em
 * sequência com giro 360°, brilho de luz e sem nenhum corte da imagem
 * (vídeos verticais aparecem inteiros sobre um fundo desfocado do próprio vídeo).
 */
export default function MontageStage({
  clips,
  settings,
  fallbackSrc,
  className = "",
  playing = true,
}: Props) {
  const reduce = useReducedMotion();
  const order = useMemo(() => {
    const list = clips.map((_, i) => i);
    if (!settings.shuffle) return list;
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [clips, settings.shuffle]);

  const [step, setStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => setStep(0), [clips.length, settings.shuffle]);

  useEffect(() => {
    if (!playing || clips.length < 2) return;
    const ms = Math.max(1200, settings.sceneDuration * 1000);
    const id = window.setInterval(() => setStep((s) => s + 1), ms);
    return () => window.clearInterval(id);
  }, [playing, clips.length, settings.sceneDuration]);

  const current = clips.length ? clips[order[step % order.length]] : null;
  const rate = (current?.playbackRate ?? 1) * settings.playbackRate;

  useEffect(() => {
    const el = videoRef.current;
    if (el) el.playbackRate = Math.min(4, Math.max(0.25, rate));
  }, [rate, step]);

  const kind: TransitionKind = reduce ? "dissolve" : settings.transition;
  const v = variantsFor(kind, settings.spinSpeed);
  const dur = Math.max(0.3, settings.transitionDuration);
  const light = Math.max(0, Math.min(1, settings.lightIntensity));

  if (!current) {
    return fallbackSrc ? (
      <video
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${className}`}
        src={fallbackSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
    ) : null;
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      style={{ perspective: 1400, WebkitPerspective: 1400 } as React.CSSProperties}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={`${current.id}-${step}`}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          variants={v}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: dur, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Fundo: mesmo vídeo ampliado e desfocado — preenche a tela sem cortar a cena */}
          <video
            className="absolute inset-0 h-full w-full scale-110 object-cover"
            src={current.url}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{ filter: "blur(38px) brightness(0.72) saturate(1.1)" }}
          />
          {/* Cena completa, sem recorte */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-contain"
            src={current.url}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </motion.div>
      </AnimatePresence>

      {/* Luz: brilho que acompanha cada virada de cena */}
      <motion.div
        key={`light-${step}`}
        className="absolute inset-0 mix-blend-screen"
        initial={{ opacity: 0.95 * light }}
        animate={{ opacity: 0 }}
        transition={{ duration: dur * 0.9, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, rgba(255,248,230,0.95) 0%, rgba(231,217,181,0.45) 45%, rgba(231,217,181,0) 72%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          opacity: 0.35 * light,
          background:
            "radial-gradient(40% 60% at 15% 20%, rgba(255,241,214,0.5), transparent 70%), radial-gradient(35% 50% at 85% 80%, rgba(255,236,196,0.4), transparent 70%)",
        }}
      />
    </div>
  );
}
