-- ============================================
-- WHAT THIS FILE DOES (plain English):
-- This creates the one table that holds the site's visitor events
-- (page views, link clicks, how far people scroll). It stores no IP
-- address, name, email or cookie. "visitor" is a one-way code that
-- changes every day. Only the server can read or write it.
-- After applying, add the "site" schema under Supabase Settings,
-- API, Exposed schemas so the site can reach it.
-- ============================================

create schema if not exists site;

create table if not exists site.analytics_events (
  id bigserial primary key,
  at timestamptz not null default now(),
  visitor text not null,
  type text not null check (type in ('view', 'click', 'scroll')),
  path text not null,
  name text,
  referrer text,
  seen text[],
  depth integer check (depth is null or depth in (0, 25, 50, 75, 100)),
  device text check (device is null or device in ('mobile', 'tablet', 'desktop')),
  source text,
  country text
);

create index if not exists analytics_events_at_idx on site.analytics_events (at desc);
create index if not exists analytics_events_type_at_idx on site.analytics_events (type, at desc);

-- Only the server (service role) touches this table. No policies means no public access.
alter table site.analytics_events enable row level security;
revoke all on site.analytics_events from anon, authenticated;
grant usage on schema site to service_role;
grant all on site.analytics_events to service_role;
grant usage, select on sequence site.analytics_events_id_seq to service_role;
