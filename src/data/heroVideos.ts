import thumbIg1 from "@/assets/hero-videos/cover-DaVcHNlpusr.jpg";
import thumbIg2 from "@/assets/hero-videos/cover-DXfMqDXDMyV.jpg";
import thumbIg3 from "@/assets/hero-videos/cover-DYiQJOYJ09g.jpg";
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

export const heroVideos: HeroVideo[] = [
  {
    id: "yt-ErEW-kzJleY",
    platform: "youtube",
    videoId: "ErEW-kzJleY",
    title: "Entrevista com a Dra. Juliana Leal",
    kind: "Entrevista",
    thumb: "https://i.ytimg.com/vi/ErEW-kzJleY/maxresdefault.jpg",
    aspect: "16/9",
  },
  {
    id: "ig-DaVcHNlpusr",
    platform: "instagram",
    videoId: "DaVcHNlpusr",
    title: "Cuidado com a dor no dia a dia",
    kind: "Instagram",
    thumb: thumbIg1,
    aspect: "9/16",
  },
  {
    id: "yt-jQ8avLicNz4",
    platform: "youtube",
    videoId: "jQ8avLicNz4",
    title: "Doenças reumáticas: quando procurar ajuda",
    kind: "Entrevista",
    thumb: "https://i.ytimg.com/vi/jQ8avLicNz4/maxresdefault.jpg",
    aspect: "16/9",
  },
  {
    id: "ig-DXfMqDXDMyV",
    platform: "instagram",
    videoId: "DXfMqDXDMyV",
    title: "Procedimento guiado no consultório",
    kind: "Instagram",
    thumb: thumbIg2,
    aspect: "9/16",
  },
  {
    id: "ig-DYiQJOYJ09g",
    platform: "instagram",
    videoId: "DYiQJOYJ09g",
    title: "Tratamento da dor articular",
    kind: "Instagram",
    thumb: thumbIg3,
    aspect: "9/16",
  },
];

export const heroVideoFallbackThumb = thumbAutoimune.url;

export function embedUrl(v: HeroVideo): string {
  return v.platform === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=1&rel=0&modestbranding=1`
    : `https://www.instagram.com/reel/${v.videoId}/embed/`;
}
