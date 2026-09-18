import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowDown, ArrowUp, Loader2, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import MontageStage from "@/components/transformador/MontageStage";
import {
  defaultSettings,
  mapSettings,
  resolveUrl,
  type MontageClip,
  type MontageSettings,
  type TransitionKind,
} from "@/hooks/useMontage";

const BUCKET = "transformador";

const TRANSITIONS: { value: TransitionKind; label: string }[] = [
  { value: "spin360", label: "Giro 360°" },
  { value: "spinSide", label: "Giro lateral" },
  { value: "zoom", label: "Zoom" },
  { value: "flash", label: "Corte em flash" },
  { value: "dissolve", label: "Dissolver" },
];

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(false);
      return;
    }
    (async () => {
      const { data } = await supabase.rpc("claim_admin");
      setIsAdmin(Boolean(data));
    })();
  }, [session]);

  return (
    <main className="min-h-[100dvh] bg-[#faf7f2] px-6 py-14 text-[#2a2233]">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#a3813c]">
          Painel
        </p>
        <h1
          className="mt-3 text-4xl font-normal sm:text-5xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Montagem do TransformaDOR
        </h1>

        {checking ? (
          <p className="mt-10 text-sm text-[#4a4152]">Carregando…</p>
        ) : !session ? (
          <AuthCard />
        ) : !isAdmin ? (
          <div className="mt-10 border border-[#a3813c]/40 bg-white p-8">
            <p className="text-sm text-[#4a4152]">
              Sua conta não tem permissão de administradora. Peça acesso a quem já
              administra o painel.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => supabase.auth.signOut()}
            >
              Sair
            </Button>
          </div>
        ) : (
          <AdminPanel />
        )}
      </div>
    </main>
  );
}

function AuthCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    setBusy(false);
    if (res.error) {
      toast({ title: "Não foi possível entrar", description: res.error.message });
      return;
    }
    if (mode === "up" && !res.data.session) {
      toast({
        title: "Confirme seu e-mail",
        description: "Enviamos um link de confirmação para você.",
      });
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mt-10 max-w-md space-y-5 border border-[#a3813c]/30 bg-white p-8"
    >
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Aguarde…" : mode === "in" ? "Entrar" : "Criar conta"}
      </Button>
      <button
        type="button"
        className="text-xs uppercase tracking-[0.2em] text-[#a3813c]"
        onClick={() => setMode(mode === "in" ? "up" : "in")}
      >
        {mode === "in" ? "Criar uma conta" : "Já tenho conta"}
      </button>
    </form>
  );
}

function AdminPanel() {
  const [clips, setClips] = useState<MontageClip[]>([]);
  const [settings, setSettings] = useState<MontageSettings>(defaultSettings);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [{ data: videos }, { data: cfg }] = await Promise.all([
      supabase
        .from("transformador_videos")
        .select("*")
        .order("position", { ascending: true }),
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
  }, []);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    let pos = clips.length;
    for (const file of Array.from(files)) {
      const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const path = `${Date.now()}-${safe}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type || "video/mp4" });
      if (upErr) {
        toast({ title: `Falha ao enviar ${file.name}`, description: upErr.message });
        continue;
      }
      const { error } = await supabase.from("transformador_videos").insert({
        url: "",
        storage_path: path,
        title: file.name,
        position: pos++,
        active: true,
      });
      if (error) toast({ title: "Falha ao salvar o vídeo", description: error.message });
    }
    setUploading(false);
    await load();
    toast({ title: "Vídeos adicionados à montagem" });
  };

  const patch = async (id: string, values: Record<string, unknown>) => {
    const { error } = await supabase
      .from("transformador_videos")
      .update(values)
      .eq("id", id);
    if (error) toast({ title: "Não foi possível atualizar", description: error.message });
    await load();
  };

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= clips.length) return;
    const a = clips[index];
    const b = clips[target];
    await Promise.all([
      supabase.from("transformador_videos").update({ position: b.position }).eq("id", a.id),
      supabase.from("transformador_videos").update({ position: a.position }).eq("id", b.id),
    ]);
    await load();
  };

  const remove = async (clip: MontageClip) => {
    if (clip.storagePath) {
      await supabase.storage.from(BUCKET).remove([clip.storagePath]);
    }
    await supabase.from("transformador_videos").delete().eq("id", clip.id);
    await load();
  };

  const saveSettings = async (next: MontageSettings) => {
    setSettings(next);
    const { error } = await supabase
      .from("transformador_settings")
      .update({
        scene_duration: next.sceneDuration,
        transition: next.transition,
        transition_duration: next.transitionDuration,
        light_intensity: next.lightIntensity,
        spin_speed: next.spinSpeed,
        playback_rate: next.playbackRate,
        shuffle: next.shuffle,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    if (error) toast({ title: "Não foi possível salvar", description: error.message });
  };

  const activeClips = clips.filter((c) => c.active);

  return (
    <div className="mt-10">
      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm text-[#4a4152]">
          {loading ? "Carregando…" : `${activeClips.length} cena(s) na montagem`}
        </p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>
          Sair
        </Button>
      </div>

      <Tabs defaultValue="videos">
        <TabsList>
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
          <TabsTrigger value="efeitos">Efeitos</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-8 space-y-6">
          <label className="flex cursor-pointer items-center gap-3 border border-dashed border-[#a3813c]/60 bg-white px-6 py-8 text-sm text-[#4a4152]">
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-[#a3813c]" />
            ) : (
              <Upload className="h-5 w-5 text-[#a3813c]" />
            )}
            <span>
              {uploading
                ? "Enviando…"
                : "Escolher vídeos para entrar automaticamente na montagem"}
            </span>
            <input
              type="file"
              accept="video/*"
              multiple
              className="sr-only"
              onChange={(e) => void upload(e.target.files)}
            />
          </label>

          <ul className="space-y-3">
            {clips.map((clip, i) => (
              <li
                key={clip.id}
                className="flex flex-wrap items-center gap-4 border border-[#2a2233]/12 bg-white p-4"
              >
                <video
                  src={clip.url}
                  className="h-20 w-14 bg-[#f2e9d8] object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <span className="min-w-0 flex-1 truncate text-sm">
                  {clip.title ?? "Cena"}
                </span>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#4a4152]">
                  <Switch
                    checked={clip.active}
                    onCheckedChange={(v) => void patch(clip.id, { active: v })}
                  />
                  {clip.active ? "Ativa" : "Oculta"}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Subir"
                  onClick={() => void move(i, -1)}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Descer"
                  onClick={() => void move(i, 1)}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Excluir"
                  onClick={() => void remove(clip)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="efeitos" className="mt-8 space-y-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-3">
                <Label>Transição</Label>
                <Select
                  value={settings.transition}
                  onValueChange={(v) =>
                    void saveSettings({ ...settings, transition: v as TransitionKind })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSITIONS.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <SliderRow
                label={`Duração de cada cena — ${settings.sceneDuration.toFixed(1)}s`}
                value={settings.sceneDuration}
                min={1.5}
                max={12}
                step={0.5}
                onChange={(v) => void saveSettings({ ...settings, sceneDuration: v })}
              />
              <SliderRow
                label={`Duração da transição — ${settings.transitionDuration.toFixed(1)}s`}
                value={settings.transitionDuration}
                min={0.3}
                max={3}
                step={0.1}
                onChange={(v) =>
                  void saveSettings({ ...settings, transitionDuration: v })
                }
              />
              <SliderRow
                label={`Intensidade da luz — ${Math.round(settings.lightIntensity * 100)}%`}
                value={settings.lightIntensity}
                min={0}
                max={1}
                step={0.05}
                onChange={(v) => void saveSettings({ ...settings, lightIntensity: v })}
              />
              <SliderRow
                label={`Velocidade do giro — ${settings.spinSpeed.toFixed(1)}x`}
                value={settings.spinSpeed}
                min={0.4}
                max={3}
                step={0.1}
                onChange={(v) => void saveSettings({ ...settings, spinSpeed: v })}
              />
              <SliderRow
                label={`Velocidade do vídeo — ${settings.playbackRate.toFixed(2)}x`}
                value={settings.playbackRate}
                min={0.25}
                max={2}
                step={0.05}
                onChange={(v) => void saveSettings({ ...settings, playbackRate: v })}
              />
              <div className="flex items-center gap-4">
                <Switch
                  checked={settings.shuffle}
                  onCheckedChange={(v) => void saveSettings({ ...settings, shuffle: v })}
                />
                <Label>Ordem aleatória das cenas</Label>
              </div>
            </div>

            <div className="relative aspect-[9/16] w-full max-w-[320px] overflow-hidden border border-[#2a2233]/12 bg-[#2a2233]">
              <MontageStage clips={activeClips} settings={settings} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  );
}
