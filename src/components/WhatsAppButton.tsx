import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WHATSAPP_URL = "https://wa.me/5582999872509?text=Olá! Gostaria de agendar uma consulta com a Dra. Juliana Leal.";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-transparent border-[3px] border-[#e7d3a3] shadow-lg shadow-black/30 transition-all hover:scale-110 hover:border-[#f5e4b8] hover:shadow-xl active:scale-[0.95]"
      style={{ boxShadow: "0 10px 30px -8px rgba(0,0,0,0.5)" }}
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
