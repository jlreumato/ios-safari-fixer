import { useEffect, useState } from "react";
import logoNome from "@/assets/nome-header.png.asset.json";

/**
 * Overlay de "carregamento" com a marca centralizada.
 * Fica visível por `duration` ms e chama `onDone` ao final.
 */
export default function LoadingSplash({
  duration = 900,
  onDone,
}: {
  duration?: number;
  onDone?: () => void;
}) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setLeaving(true), duration - 250);
    const t2 = window.setTimeout(() => onDone?.(), duration);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [duration, onDone]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-[#faf8f5] via-[#f5f0e8] to-[#ebe5db] transition-opacity duration-300 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src={logoNome.url}
          alt=""
          className="h-14 w-auto md:h-16 animate-[splash-pulse_1.4s_ease-in-out_infinite]"
        />
        <div className="h-[2px] w-32 overflow-hidden rounded-full bg-[hsl(249_22%_61%/0.15)]">
          <div className="h-full w-1/3 rounded-full bg-[hsl(249_22%_61%)] animate-[splash-bar_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
      <style>{`
        @keyframes splash-pulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.04); }
        }
        @keyframes splash-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
