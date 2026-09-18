import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type MontageSettings = {
  sceneDuration: number;
  transition: TransitionKind;
  transitionDuration: number;
  lightIntensity: number;
  spinSpeed: number;
  playbackRate: number;
  shuffle: boolean;
};

export type TransitionKind = "spin360" | "spinSide" | "flash" | "zoom" | "dissolve";

export type MontageClip = {
  id: string;
  url: string;
  title: string | null;
  position: number;
  active: boolean;
  playbackRate: number;
  storagePath: string | null;
};

export const defaultSettings: MontageSettings = {
  sceneDuration: 4.5,
  transition: "spin360",
  transitionDuration: 1.1,
  lightIntensity: 0.6,
  spinSpeed: 1,
  playbackRate: 1,
  shuffle: false,
};

const BUCKET = "transformador";

/** Converte o caminho no armazenamento em URL assinada (bucket privado). */
export async function resolveUrl(clip: {
  url: string;
  storage_path: string | null;
}): Promise<string> {
  if (!clip.storage_path) return clip.url;
  const { data } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(clip.storage_path, 60 * 60 * 6);
  return data?.signedUrl ?? clip.url;
}

export function mapSettings(row: Record<string, unknown> | null): MontageSettings {
  if (!row) return defaultSettings;
  return {
    sceneDuration: Number(row.scene_duration ?? defaultSettings.sceneDuration),
    transition: (row.transition as TransitionKind) ?? defaultSettings.transition,
    transitionDuration: Number(
      row.transition_duration ?? defaultSettings.transitionDuration,
    ),
    lightIntensity: Number(row.light_intensity ?? defaultSettings.lightIntensity),
    spinSpeed: Number(row.spin_speed ?? defaultSettings.spinSpeed),
    playbackRate: Number(row.playback_rate ?? defaultSettings.playbackRate),
    shuffle: Boolean(row.shuffle ?? defaultSettings.shuffle),
  };
}

/** Busca os vídeos ativos e as configurações de efeito da montagem. */
export function useMontage(includeInactive = false) {
  const [clips, setClips] = useState<MontageClip[]>([]);
  const [settings, setSettings] = useState<MontageSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const query = supabase
      .from("transformador_videos")
      .select("*")
      .order("position", { ascending: true });
    const [{ data: videos }, { data: cfg }] = await Promise.all([
      includeInactive ? query : query.eq("active", true),
      supabase.from("transformador_settings").select("*").eq("id", 1).maybeSingle(),
    ]);

    const resolved = await Promise.all(
      (videos ?? []).map(async (v) => ({
        id: v.id,
        url: await resolveUrl(v),
        title: v.title,
        position: v.position,
        active: v.active,
        playbackRate: Number(v.playback_rate ?? 1),
        storagePath: v.storage_path,
      })),
    );

    setClips(resolved);
    setSettings(mapSettings(cfg as Record<string, unknown> | null));
    setLoading(false);
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeInactive]);

  return { clips, settings, loading, reload: load, setSettings };
}
