-- AEON Store — Supabase schema
-- Run this once in your Supabase project's SQL Editor (Free plan is enough).

create extension if not exists "uuid-ossp";

-- ── Categories ────────────────────────────────────────────────
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  image text,
  hidden boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ── Products ──────────────────────────────────────────────────
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  category text not null references categories(slug),
  price numeric(10,2) not null,
  discount_price numeric(10,2),
  description text,
  specs jsonb default '[]',
  images text[] default '{}',
  in_stock boolean default true,
  featured boolean default false,
  is_new boolean default false,
  best_seller boolean default false,
  rating numeric(2,1) default 0,
  rating_count int default 0,
  views int default 0,
  likes int default 0,
  created_at timestamptz default now()
);

-- ── Analytics events (page views, whatsapp clicks) ──────────────
create table if not exists analytics_events (
  id uuid primary key default uuid_generate_v4(),
  event_type text not null, -- 'page_view' | 'whatsapp_click'
  path text,
  created_at timestamptz default now()
);

-- ── Orders (optional log of WhatsApp order clicks, for the dashboard) ──
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete set null,
  product_name text,
  price numeric(10,2),
  created_at timestamptz default now()
);

-- ── RPCs used by the storefront (views / likes counters) ────────
create or replace function increment_product_views(p_id uuid)
returns void as $$
  update products set views = views + 1 where id = p_id;
$$ language sql;

create or replace function adjust_product_likes(p_id uuid, delta int)
returns void as $$
  update products set likes = greatest(likes + delta, 0) where id = p_id;
$$ language sql;

-- ── Row Level Security ───────────────────────────────────────────
alter table categories enable row level security;
alter table products enable row level security;
alter table analytics_events enable row level security;
alter table orders enable row level security;

-- Public (anon) can read products & categories
create policy "public read categories" on categories for select using (true);
create policy "public read products" on products for select using (true);

-- Public (anon) can insert analytics events + orders (no read)
create policy "public insert analytics" on analytics_events for insert with check (true);
create policy "public insert orders" on orders for insert with check (true);

-- Only authenticated (admin) users can write products/categories, and read analytics/orders
create policy "admin write categories" on categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write products" on products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin read analytics" on analytics_events for select using (auth.role() = 'authenticated');
create policy "admin read orders" on orders for select using (auth.role() = 'authenticated');

-- ── Storage bucket for product images ────────────────────────────
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "public read product images" on storage.objects
  for select using (bucket_id = 'product-images');

create policy "admin upload product images" on storage.objects
  for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "admin update product images" on storage.objects
  for update using (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "admin delete product images" on storage.objects
  for delete using (bucket_id = 'product-images' and auth.role() = 'authenticated');

-- ── Seed categories (matches lib/data.ts) ────────────────────────
insert into categories (slug, name, description, image, sort_order) values
  ('watches', 'Watches', 'Smart watches built for everyday precision.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop', 1),
  ('earbuds', 'Earbuds & AirPods', 'True wireless sound, tuned for daily life.', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop', 2),
  ('chargers', 'Chargers', 'Fast, reliable power for every device.', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1200&auto=format&fit=crop', 3),
  ('cables', 'Cables', 'Durable cables that outlast the rest.', 'https://images.unsplash.com/photo-1601524909162-ae8725290836?q=80&w=1200&auto=format&fit=crop', 4),
  ('accessories', 'Accessories', 'The small details that complete the setup.', 'https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=1200&auto=format&fit=crop', 5),
  ('gadgets', 'Smart Gadgets', 'Considered tech for a considered life.', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop', 6)
on conflict (slug) do nothing;
