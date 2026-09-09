import thumbIg1 from "@/assets/hero-videos/cover-DaVcHNlpusr.jpg";
import thumbIg2 from "@/assets/hero-videos/cover-DXfMqDXDMyV.jpg";
import thumbIg3 from "@/assets/hero-videos/cover-DYiQJOYJ09g.jpg";
import thumbIg4 from "@/assets/hero-videos/cover-DcPO6dpJDDO.jpg";
import thumbIg5 from "@/assets/hero-videos/cover-Dc6vovFpJPM.jpg";
import thumbIg6 from "@/assets/hero-videos/cover-DcNBS2mNhvC.jpg";
import thumbIg7 from "@/assets/hero-videos/cover-Dca1P6PpXXK.jpg";
import thumbEntrevista1 from "@/assets/hero-videos/cover-jl-entrevista-1.jpg";
import thumbEntrevista2 from "@/assets/hero-videos/cover-jl-entrevista-2.jpg";
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
    thumb: thumbEntrevista1,
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
    thumb: thumbEntrevista2,
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
  {
    id: "ig-DcPO6dpJDDO",
    platform: "instagram",
    videoId: "DcPO6dpJDDO",
    title: "Orientações sobre dor crônica",
    kind: "Instagram",
    thumb: thumbIg4,
    aspect: "9/16",
  },
  {
    id: "ig-Dc6vovFpJPM",
    platform: "instagram",
    videoId: "Dc6vovFpJPM",
    title: "Reumatologia na prática",
    kind: "Instagram",
    thumb: thumbIg5,
    aspect: "9/16",
  },
  {
    id: "ig-DcNBS2mNhvC",
    platform: "instagram",
    videoId: "DcNBS2mNhvC",
    title: "Cuidado humanizado no consultório",
    kind: "Instagram",
    thumb: thumbIg6,
    aspect: "9/16",
  },
  {
    id: "ig-Dca1P6PpXXK",
    platform: "instagram",
    videoId: "Dca1P6PpXXK",
    title: "Dicas para viver sem dor",
    kind: "Instagram",
    thumb: thumbIg7,
    aspect: "9/16",
  },
];

export const heroVideoFallbackThumb = thumbAutoimune.url;

export function embedUrl(v: HeroVideo): string {
  return v.platform === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=1&rel=0&modestbranding=1`
    : `https://www.instagram.com/reel/${v.videoId}/embed/`;
}
