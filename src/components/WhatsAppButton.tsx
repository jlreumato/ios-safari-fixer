import { Phone } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--whatsapp))] text-white shadow-lg shadow-[hsl(142_70%_49%/0.3)] transition-all hover:scale-110 hover:shadow-xl active:scale-[0.95]"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
