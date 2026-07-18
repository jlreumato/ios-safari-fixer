import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-[hsl(260_30%_55%)] py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Pronta para cuidar de você!
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl lg:text-2xl">
          Agende sua consulta e dê o primeiro passo rumo a uma vida com menos dor e mais qualidade.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block">
          <Button
            size="lg"
            className="btn-champagne btn-glow-ring gap-3 px-12 py-7 text-lg sm:text-xl active:scale-[0.97]"
          >
            <Phone className="h-6 w-6" />
            Agendar pelo WhatsApp
          </Button>
        </a>
      </div>
    </section>
  );
}
