-- =====================================================================
-- KHOKA TECH — 001 schema
-- Tables: profiles, templates, orders, order_status_history
-- Run in Supabase → SQL Editor, in file order (001 → 004), then seed.
-- =====================================================================

-- ---------------------------------------------------------------------
-- profiles: one row per Supabase Auth user (admins only — customers do
-- not have accounts). role can ONLY be changed by the project owner in
-- the SQL editor; app users can never change it (see 003_rls.sql).
-- ---------------------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text check (full_name is null or char_length(full_name) <= 80),
  role        text not null default 'none' check (role in ('none', 'admin')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
comment on table public.profiles is 'Staff accounts. role = admin grants access to orders and template management.';

-- ---------------------------------------------------------------------
-- templates: the public catalogue shown in the store.
-- content holds translated copy: {"short":{en,bn,hi}, "long":{…}, "sections":{…}, "features":{…}}
-- ---------------------------------------------------------------------
create table public.templates (
  id          text primary key check (id ~ '^[a-z0-9][a-z0-9-]{1,39}$'),
  name        text not null check (char_length(btrim(name)) between 2 and 60),
  category    text not null check (category ~ '^[a-z0-9-]{2,30}$'),
  price_usd   integer not null check (price_usd between 0 and 100000),
  is_active   boolean not null default true,
  sort_order  integer not null default 100,
  version     text not null default '1.0' check (char_length(version) <= 12),
  demo_url    text check (demo_url is null or demo_url ~ '^(https://|templates/)'),
  thumb_url   text check (thumb_url is null or thumb_url ~ '^(https://|assets/)'),
  paper       text check (paper  is null or paper  ~ '^#[0-9A-Fa-f]{6}$'),
  ink         text check (ink    is null or ink    ~ '^#[0-9A-Fa-f]{6}$'),
  accent      text check (accent is null or accent ~ '^#[0-9A-Fa-f]{6}$'),
  palette     text[] not null default '{}' check (cardinality(palette) <= 8),
  fonts       text check (fonts is null or char_length(fonts) <= 80),
  tech        text[] not null default '{}' check (cardinality(tech) <= 12),
  tags        text[] not null default '{}' check (cardinality(tags) <= 20),
  content     jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object'),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users (id) on delete set null
);
create index templates_active_sort_idx on public.templates (is_active, sort_order);
comment on table public.templates is 'Public template catalogue. Only active rows are visible to visitors.';

-- ---------------------------------------------------------------------
-- orders: one row per template order request.
-- Visitors can never read this table. They can only create rows through
-- public.submit_order(), which validates input and returns the reference.
-- template_name / listed_price_usd are snapshots taken at order time.
-- ---------------------------------------------------------------------
create table public.orders (
  id                uuid primary key default gen_random_uuid(),
  ref               text not null unique check (ref ~ '^KT-[0-9]{6}-[2-9A-HJKMNP-Z]{4}$'),
  status            text not null default 'new'
                    check (status in ('new', 'contacted', 'discussion', 'confirmed', 'completed', 'cancelled')),
  template_id       text references public.templates (id) on update cascade on delete set null,
  template_name     text not null check (char_length(template_name) <= 60),
  listed_price_usd  integer check (listed_price_usd is null or listed_price_usd between 0 and 100000),
  customer_name     text not null check (char_length(btrim(customer_name)) between 2 and 80),
  email             text not null check (char_length(email) <= 120 and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]{2,}$'),
  whatsapp          text not null check (regexp_replace(whatsapp, '[[:space:]()-]', '', 'g') ~ '^\+?[0-9]{8,15}$'),
  business_name     text check (business_name is null or char_length(business_name) <= 100),
  requirements      text not null check (char_length(btrim(requirements)) between 15 and 2000),
  message           text check (message is null or char_length(message) <= 1000),
  source            text not null default 'web' check (source in ('web', 'admin')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index orders_created_idx        on public.orders (created_at desc);
create index orders_status_created_idx on public.orders (status, created_at desc);
create index orders_template_idx       on public.orders (template_id);
create index orders_email_idx          on public.orders (lower(email));
comment on table public.orders is 'Customer order requests. Readable and editable by admins only (RLS).';

-- ---------------------------------------------------------------------
-- order_status_history: append-only audit trail of status changes and
-- internal admin notes. No one can update or delete rows from the app.
-- ---------------------------------------------------------------------
create table public.order_status_history (
  id           bigint generated always as identity primary key,
  order_id     uuid not null references public.orders (id) on delete cascade,
  from_status  text,
  to_status    text check (to_status is null or to_status in ('new', 'contacted', 'discussion', 'confirmed', 'completed', 'cancelled')),
  note         text check (note is null or char_length(note) <= 1000),
  created_by   uuid references auth.users (id) on delete set null,
  created_at   timestamptz not null default now(),
  check (to_status is not null or note is not null)
);
create index order_history_order_idx on public.order_status_history (order_id, created_at);
comment on table public.order_status_history is 'Audit log: status changes (to_status) and internal notes (note). Append-only.';
