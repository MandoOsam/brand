# AEON — Premium E-commerce Storefront

Next.js 15 (App Router) + TypeScript + Tailwind + Supabase. Built to run **entirely free** on Vercel + Supabase's free tiers.

The site works immediately with built-in demo products (`lib/data.ts`) — you don't need Supabase to preview it. Connect Supabase when you're ready to manage products from a real admin dashboard instead of editing code.

## What's included

- Storefront: home, category/search/filter/sort product listing, product detail with gallery zoom, related products
- WhatsApp ordering: every "Order now" button opens WhatsApp with your number and a pre-filled message
- Dark/light mode with smooth transitions
- Wishlist + likes (stored per-browser, synced to Supabase when connected)
- View & click analytics (page views, product views, WhatsApp clicks) logged to Supabase
- Admin dashboard: login (Supabase Auth), overview stats + 14-day views chart, full product CRUD with multi-image upload to Supabase Storage
- SEO: metadata, Open Graph, JSON-LD product schema, sitemap.xml, robots.txt

## What's *not* fully built yet (be aware before you launch)

These were in the original brief but need real additional work to be production-solid — I did not fake them with placeholder code:

- **Image cropping in the dashboard** — uploads work, but there's no in-browser crop/resize tool yet
- **True infinite scroll** — the product grid uses simple pagination-ready fetching instead
- **Device-fingerprint like-deduping** — likes are deduped with `localStorage`, which is what the brief itself allowed as an alternative, but it resets if a customer clears their browser data
- **Category drag-to-reorder** — categories have a `sort_order` column in the database, but there's no drag UI yet, so you'd update the order by editing the number directly in Supabase's table editor

None of these block launch — they're good next iterations once real customers are using the site.

---

## 1. Run it locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. It'll work right away using the demo products in `lib/data.ts`.

## 2. Connect Supabase (free tier)

1. Create a project at [supabase.com](https://supabase.com) (free tier is enough).
2. In your Supabase project, open **SQL Editor**, paste the contents of `supabase/schema.sql`, and run it. This creates all tables, security policies, the storage bucket, and seeds your categories.
3. Go to **Settings → API** and copy the **Project URL** and **anon public key**.
4. Copy `.env.example` to `.env.local` and fill in those two values.
5. Restart `npm run dev`. The storefront now reads from Supabase — but the `products` table is empty until you add products from the dashboard.
6. Create your admin login: in Supabase go to **Authentication → Users → Add user**, set your email and a password. That's the account you'll use at `/admin/login`.

## 3. Add your products

Go to `/admin/login`, sign in, then **Products → Add product**. Upload images, set price, specs, and badges. Changes appear on the live site immediately — no redeploy needed.

## 4. Set your WhatsApp number

It's already set from what you gave me, in `lib/whatsapp.ts`:

```ts
export const WHATSAPP_NUMBER = "201278259732"; // your number, international format, no +
```

Change this if the number changes.

## 5. Update your social links

Edit `components/site-footer.tsx` — replace the placeholder Instagram/Facebook/TikTok URLs with your real profile links.

## 6. Deploy for free on Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo.
3. In the Vercel project settings, add the same two environment variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Vercel's free (Hobby) plan and Supabase's free plan cover this project's usage comfortably at small-to-medium traffic.
5. Once deployed, update `metadataBase` in `app/layout.tsx` and the URLs in `app/sitemap.ts` / `app/robots.ts` to your real Vercel (or custom) domain.

## Project structure

```
app/                    Routes (App Router)
  page.tsx              Homepage
  products/              Product listing + [slug] detail page
  admin/                 Login + dashboard (products CRUD, analytics)
  sitemap.ts, robots.ts  SEO
components/             UI building blocks
  ui/                    Hand-built shadcn-style primitives (button, card, input...)
  admin/                 Dashboard-only components
lib/
  data.ts                Demo/fallback product data
  supabase/               Browser + server Supabase clients, queries, admin actions
  whatsapp.ts             wa.me link builder
supabase/schema.sql      Full DB schema, RLS policies, storage bucket, seed categories
```

## Notes on the free-hosting constraint

- Vercel Hobby plan: free, no credit card, generous enough for a small brand's traffic.
- Supabase free plan: free Postgres database, 1GB file storage, and Auth — no card required at signup. It pauses a project after a week of no activity on the free tier; visiting the dashboard or site wakes it back up within seconds.
- No paid API keys or services are required anywhere in this codebase.
