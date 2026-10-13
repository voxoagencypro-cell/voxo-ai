-- Colonnes test / message portail (sans suppression de données)

alter table public.demo_requests
  add column if not exists is_test boolean not null default false;

alter table public.demo_requests
  add column if not exists original_intake_message text;

alter table public.prospect_intakes
  add column if not exists is_test boolean not null default false;

comment on column public.demo_requests.is_test is
  'Entrée générée par tests automatisés ou QA.';
comment on column public.demo_requests.original_intake_message is
  'Archive interne — ne pas afficher telle quelle dans le dashboard.';
comment on column public.prospect_intakes.is_test is
  'Entrée générée par tests automatisés ou QA.';

notify pgrst, 'reload schema';
