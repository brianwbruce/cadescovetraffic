-- Founding Cove Insider signup table
create table founding_insiders (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  signup_source text default 'homepage',
  referrer_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  position_number int,
  badge_eligible boolean default true,
  app_invited_at timestamptz,
  app_downloaded_at timestamptz,
  unsubscribed_at timestamptz,
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);

create index founding_insiders_email_idx on founding_insiders (email);
create index founding_insiders_created_at_idx on founding_insiders (created_at desc);

-- Atomic position-number assignment.
-- Uses a transaction-scoped advisory lock so concurrent inserts can't read
-- the same max(position_number) and produce duplicate positions.
create or replace function assign_founding_insider_position()
returns trigger as $$
begin
  perform pg_advisory_xact_lock(hashtext('founding_insider_position'));
  new.position_number := (select coalesce(max(position_number), 0) + 1 from founding_insiders);
  new.badge_eligible := new.position_number <= 1000;
  return new;
end;
$$ language plpgsql;

create trigger founding_insiders_position_trigger
  before insert on founding_insiders
  for each row
  execute function assign_founding_insider_position();

-- Row-level security: anonymous form submissions can insert, no public reads.
alter table founding_insiders enable row level security;

create policy "anyone can insert" on founding_insiders
  for insert with check (true);

-- Email event log (sent/opened/clicked/bounced/complained).
create table email_events (
  id uuid primary key default gen_random_uuid(),
  insider_id uuid references founding_insiders(id) on delete cascade,
  event_type text not null,
  email_template text,
  occurred_at timestamptz default now(),
  metadata jsonb
);

create index email_events_insider_idx on email_events (insider_id);
create index email_events_type_idx on email_events (event_type);

alter table email_events enable row level security;
-- No public policies. Service role only.
