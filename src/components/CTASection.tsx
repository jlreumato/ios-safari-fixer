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
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });

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

      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-14 text-center transition-all duration-700 ease-out sm:pb-20 ${
          inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <h2
          className="max-w-[22ch] text-balance text-3xl font-normal uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Vou transformar sua <em className="italic text-[#e7d9b5]">dor</em> em{" "}
          <em className="italic text-[#e7d9b5]">liberdade!</em>
        </h2>

        <p className="mx-auto mt-6 max-w-[46ch] text-base font-light leading-relaxed text-white/85 sm:text-lg">
          Agende sua consulta e dê o primeiro passo rumo a uma vida com menos dor.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-9 inline-block"
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
