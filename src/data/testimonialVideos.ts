/**
 * Depoimentos em vídeo vertical (9:16).
 *
 * Para publicar um depoimento real, basta preencher `platform` + `videoId`
 * (shortcode do reel do Instagram ou ID do YouTube Shorts) e, se quiser,
 * uma capa própria em `thumb`. Enquanto `videoId` estiver vazio, o card é
 * exibido como placeholder ("Depoimento em breve") e não abre o lightbox.
 */
export type TestimonialVideo = {
  id: string;
  /** Nome do paciente exibido no card. */
  name: string;
  /** Uma linha de contexto (condição/resultado). */
  context: string;
  platform: "instagram" | "youtube";
  /** Shortcode do reel ou ID do vídeo. Vazio = placeholder. */
  videoId: string;
  /** URL/import da capa. Vazio = capa neutra champagne. */
  thumb?: string;
};

export const testimonialVideos: TestimonialVideo[] = [
  { id: "t1", name: "Maria S.", context: "Artrite reumatoide · 2 anos sem diagnóstico", platform: "instagram", videoId: "" },
  { id: "t2", name: "João P.", context: "Gota · dor controlada", platform: "instagram", videoId: "" },
  { id: "t3", name: "Ana L.", context: "Fibromialgia · voltou a dormir bem", platform: "instagram", videoId: "" },
  { id: "t4", name: "Carlos M.", context: "Artrose de joelho · caminha sem dor", platform: "instagram", videoId: "" },
  { id: "t5", name: "Beatriz R.", context: "Lúpus · rotina de volta", platform: "instagram", videoId: "" },
];

export function testimonialEmbedUrl(v: TestimonialVideo): string | null {
  if (!v.videoId) return null;
  return v.platform === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=1&rel=0&modestbranding=1`
    : `https://www.instagram.com/reel/${v.videoId}/embed/`;
}
