import thumbInfiltracao from "@/assets/procedures/infiltracao.jpg.asset.json";
import thumbBloqueio from "@/assets/procedures/bloqueio.jpg.asset.json";
import thumbPrp from "@/assets/procedures/prp.jpg.asset.json";
import thumbConsultorio from "@/assets/clinic/consultorio.jpg.asset.json";
import thumbAutoimune from "@/assets/procedures/autoimune.jpg.asset.json";

export type HeroVideo = {
  id: string;
  /** Plataforma do vídeo — define como o embed é montado no lightbox. */
  platform: "youtube" | "instagram";
  /** ID do vídeo no YouTube ou o shortcode do post/reel no Instagram. */
  videoId: string;
  title: string;
  /** Etiqueta curta exibida no card (ex.: "Entrevista", "Procedimento"). */
  kind: string;
  thumb: string;
  aspect: "9/16" | "16/9";
};

/**
 * Substitua `videoId` pelos IDs reais:
 * - YouTube: https://youtu.be/ABC123  ->  videoId: "ABC123"
 * - Instagram: https://instagram.com/reel/XYZ789/  ->  videoId: "XYZ789"
 */
export const heroVideos: HeroVideo[] = [
  {
    id: "entrevista-tv",
    platform: "youtube",
    videoId: "dQw4w9WgXcQ",
    title: "Entrevista: quando procurar um reumatologista",
    kind: "Entrevista",
    thumb: thumbConsultorio.url,
    aspect: "16/9",
  },
  {
    id: "infiltracao-guiada",
    platform: "instagram",
    videoId: "C0000000000",
    title: "Infiltração guiada por ultrassom",
    kind: "Procedimento",
    thumb: thumbInfiltracao.url,
    aspect: "9/16",
  },
  {
    id: "bloqueio",
    platform: "instagram",
    videoId: "C1111111111",
    title: "Bloqueio para dor crônica",
    kind: "Procedimento",
    thumb: thumbBloqueio.url,
    aspect: "9/16",
  },
  {
    id: "prp",
    platform: "youtube",
    videoId: "dQw4w9WgXcQ",
    title: "PRP: regeneração articular",
    kind: "Procedimento",
    thumb: thumbPrp.url,
    aspect: "16/9",
  },
  {
    id: "autoimune",
    platform: "instagram",
    videoId: "C2222222222",
    title: "Doenças autoimunes: mitos e verdades",
    kind: "Entrevista",
    thumb: thumbAutoimune.url,
    aspect: "9/16",
  },
];

export function embedUrl(v: HeroVideo): string {
  return v.platform === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=1&rel=0&modestbranding=1`
    : `https://www.instagram.com/reel/${v.videoId}/embed/`;
}
