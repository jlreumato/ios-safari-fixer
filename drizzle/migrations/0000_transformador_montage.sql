-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can read own roles"
on public.user_roles for select to authenticated
using (user_id = auth.uid());

create policy "Admins manage roles"
on public.user_roles for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Vídeos da montagem
create table public.transformador_videos (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  storage_path text,
  title text,
  position integer not null default 0,
  active boolean not null default true,
  duration numeric,
  playback_rate numeric not null default 1,
  created_at timestamptz not null default now()
);

grant select on public.transformador_videos to anon;
grant select, insert, update, delete on public.transformador_videos to authenticated;
grant all on public.transformador_videos to service_role;

alter table public.transformador_videos enable row level security;

create policy "Public can read active videos"
on public.transformador_videos for select to anon
using (active = true);

create policy "Authenticated can read videos"
on public.transformador_videos for select to authenticated
using (true);

create policy "Admins manage videos"
on public.transformador_videos for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

-- Configurações de efeitos (linha única)
create table public.transformador_settings (
  id integer primary key default 1,
  scene_duration numeric not null default 4.5,
  transition text not null default 'spin360',
  transition_duration numeric not null default 1.1,
  light_intensity numeric not null default 0.6,
  spin_speed numeric not null default 1,
  playback_rate numeric not null default 1,
  shuffle boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint transformador_settings_single_row check (id = 1)
);

grant select on public.transformador_settings to anon;
grant select, insert, update on public.transformador_settings to authenticated;
grant all on public.transformador_settings to service_role;

alter table public.transformador_settings enable row level security;

create policy "Public can read settings"
on public.transformador_settings for select to anon
using (true);

create policy "Authenticated can read settings"
on public.transformador_settings for select to authenticated
using (true);

create policy "Admins manage settings"
on public.transformador_settings for all to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

insert into public.transformador_settings (id) values (1);
