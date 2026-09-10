-- ============================================
-- WHAT THIS FILE DOES (plain English):
-- This creates the website's database rooms (tables) in a separate
-- schema named site so they can share a Supabase project without
-- bumping into other tools. It matches the plan in docs/07.
-- Do not apply this until docs/12 questions are answered.
-- ============================================

create schema if not exists site;

-- Projects shown on /projects
create table if not exists site.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'shipped', 'archived')),
  github_repo text,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Photos, audio, video, future podcast episodes
create table if not exists site.media_items (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  url text not null,
  caption text,
  alt_text text,
  tags text[] default '{}',
  visibility text not null default 'private'
    check (visibility in ('public', 'chatbot_only', 'private')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- External links (repos, press, writeups)
create table if not exists site.links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  project_id uuid references site.projects (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Social profile links rendered site-wide
create table if not exists site.socials (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  handle text,
  url text not null,
  sort_order int not null default 0
);

-- Contact form submissions (admin only)
create table if not exists site.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  topic text,
  crm_sync_status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Private chatbot knowledge (server-side only; never public)
create table if not exists site.knowledge_base (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  source_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Runtime feature toggles
create table if not exists site.feature_flags (
  key text primary key,
  enabled boolean not null default false,
  description text,
  updated_at timestamptz not null default now()
);

-- Social drafts from Grok Bot
create table if not exists site.social_drafts (
  id uuid primary key default gen_random_uuid(),
  channel text not null,
  body text not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Versioned chatbot instruction config (docs/11). Never hardcode live instructions in the repo.
create table if not exists site.agent_configs (
  id uuid primary key default gen_random_uuid(),
  version int not null,
  instructions text not null,
  status text not null default 'draft'
    check (status in ('draft', 'live', 'archived')),
  created_by text,
  created_at timestamptz not null default now(),
  unique (version)
);

-- Seed default feature flags (all off while the site is scaffold-only)
insert into site.feature_flags (key, enabled, description) values
  ('section_about', false, 'Show About in nav and routes'),
  ('section_projects', false, 'Show Projects'),
  ('section_blog', false, 'Show Blog'),
  ('section_poetry', false, 'Show Poetry'),
  ('section_photography', false, 'Show Photography'),
  ('section_civic_engagement', false, 'Show Civic Engagement'),
  ('section_contact', false, 'Show Contact'),
  ('chatbot_widget', false, 'Show site-wide chatbot widget'),
  ('section_podcast', false, 'Future podcast section'),
  ('crm_personal', false, 'Push leads to personal CRM'),
  ('crm_uspot', false, 'Push leads to Uspot')
on conflict (key) do nothing;
