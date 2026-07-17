import { Phone } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#8e82b8] to-[#7a6fa3] text-white shadow-lg shadow-[#8e82b8]/30 transition-all hover:scale-110 hover:shadow-xl hover:from-[#7a6fa3] hover:to-[#6b5b9a] active:scale-[0.95]"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
