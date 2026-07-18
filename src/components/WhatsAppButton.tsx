import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg shadow-[#25D366]/25 ring-1 ring-[#25D366]/30 transition-all hover:scale-110 hover:shadow-xl active:scale-[0.95]"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
