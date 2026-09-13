/**
 * Camada de fundo da capa: degradê champagne com brilho dourado em movimento
 * lento + grão de papel. Puramente decorativa.
 */
export default function CoverBackdrop({ offset = 0 }: { offset?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base clara */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #ffffff 0%, #fdfaf3 42%, #f4ecdc 100%)",
        }}
      />

      {/* Brilho dourado que respira e desliza */}
      <div
        className="cover-glow absolute -inset-[20%]"
        style={{
          transform: `translate3d(0, ${offset * 0.12}px, 0)`,
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 72% 22%, rgba(228,203,146,0.62), transparent 68%)," +
            "radial-gradient(ellipse 50% 40% at 18% 78%, rgba(142,130,184,0.14), transparent 70%)",
        }}
      />

      <div
        className="cover-glow-slow absolute -inset-[25%]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 40% 32% at 40% 55%, rgba(214,178,109,0.28), transparent 70%)",
        }}
      />

      {/* Grão de papel */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/* Véu inferior para a tipografia respirar */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(255,253,248,0.92), rgba(255,253,248,0))",
        }}
      />
    </div>
  );
}
