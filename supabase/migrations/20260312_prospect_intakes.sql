-- Migration prospect_intakes (sans suppression de données existantes)
-- Compatible API : app/api/prospect-intake/route.ts (supabaseAdmin / service_role)

create table if not exists public.prospect_intakes (
  id uuid primary key default gen_random_uuid(),
  prospect_id uuid not null unique default gen_random_uuid(),
  submitted_at timestamptz not null default now(),
  locale text,
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  employee_range text not null,
  sector text,
  priorities jsonb not null default '[]'::jsonb,
  channels jsonb not null default '[]'::jsonb,
  primary_channel text,
  main_difficulty text,
  primary_goal text,
  priority_other text,
  marketing_consent boolean not null default false,
  conditional_answers jsonb not null default '{}'::jsonb,
  raw_payload jsonb not null default '{}'::jsonb,
  status text not null default 'new'
);

create index if not exists prospect_intakes_email_idx
  on public.prospect_intakes (email);

create index if not exists prospect_intakes_submitted_at_idx
  on public.prospect_intakes (submitted_at desc);

alter table public.prospect_intakes enable row level security;

-- Le client service_role (SUPABASE_SECRET_KEY) contourne RLS : inserts API OK.
-- Aucune policy anon/authenticated : pas d'exposition publique via PostgREST.

grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on table public.prospect_intakes to postgres, service_role;

comment on table public.prospect_intakes is
  'Réponses formulaire portail VOXO AI (prospects marketing).';

-- Rafraîchir le cache PostgREST (évite PGRST205 juste après CREATE)
notify pgrst, 'reload schema';
