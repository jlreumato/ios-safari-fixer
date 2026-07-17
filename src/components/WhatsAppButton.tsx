import { Phone } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#8e82b8] bg-white/95 text-[#8e82b8] shadow-lg shadow-[#8e82b8]/20 transition-all hover:scale-110 hover:bg-[#8e82b8]/10 hover:shadow-xl active:scale-[0.95]"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
