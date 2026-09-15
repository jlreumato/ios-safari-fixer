import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import RollingText from "@/components/ui/RollingText";
import { useInView } from "@/hooks/useInView";
import ctaPoster from "@/assets/cta-liberdade.jpg";
import ctaVideo from "@/assets/cta-liberdade.mp4.asset.json";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

/**
 * CTA em vídeo: a frase "Vou transformar sua dor em liberdade" é apresentada
 * no próprio vídeo, com o botão de agendamento sempre ativo sobre a cena.
 */
export default function CTASection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.28 });

  const phraseParts = [
    { text: "Vou transformar", from: "-translate-x-16 -translate-y-10" },
    { text: "sua dor", from: "translate-x-14 -translate-y-12" },
    { text: "em liberdade!", from: "-translate-x-10 translate-y-14" },
  ];

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] w-full overflow-hidden bg-[#f2e9d8]"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={ctaVideo.url}
        poster={ctaPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />

      {/* Véu suave para leitura do CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(42,34,51,0.72) 0%, rgba(42,34,51,0.25) 38%, rgba(42,34,51,0) 68%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="flex max-w-[18ch] flex-wrap justify-center gap-x-[0.22em] text-balance text-[clamp(2.5rem,7vw,6.75rem)] font-normal uppercase leading-[0.95] text-white [text-shadow:0_3px_28px_rgba(42,34,51,0.45)]">
          {phraseParts.map((part, index) => (
            <span
              key={part.text}
              className={`inline-block transition-all duration-1000 ease-out ${
                inView ? "translate-x-0 translate-y-0 opacity-100" : `${part.from} opacity-0`
              } ${index > 0 ? "italic text-[#e7d9b5]" : ""}`}
              style={{ transitionDelay: `${index * 180}ms` }}
            >
              {part.text}
            </span>
          ))}
        </h2>

        <p
          className={`mx-auto mt-7 max-w-[46ch] text-base font-light leading-relaxed text-white/90 transition-all delay-700 duration-700 sm:text-xl ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Agende sua consulta e dê o primeiro passo rumo a uma vida com menos dor.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`group mt-9 inline-block transition-all delay-1000 duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <Button
            size="lg"
            className="btn-champagne btn-glow-ring gap-3 px-12 py-7 text-base sm:text-lg active:scale-[0.97]"
          >
            <WhatsAppIcon size={22} />
            <RollingText>Agendar pelo WhatsApp</RollingText>
          </Button>
        </a>
      </div>
    </section>
  );
}
