# Coastal Aesthetic — Headless E-Commerce (Next.js + Shopify Mock)

Warm, sun-bleached boutique lifestyle store for straw bags, suede sandals & woven hats. Built as production-ready, conversion-optimized headless commerce with editorial beach photography, linen textures, terracotta/sand palette and serif/sans typography.

Built from the **MASTER PROMPT** spec — all routes, responsive behavior, SEO and Core Web Vitals requirements implemented.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` + CSS `@theme`)
- **Images:** `next/image` with AVIF/WebP, explicit sizes, `priority` only for LCP
- **Fonts:** `next/font/google` — `Cormorant_Garamond` (serif display) + `Inter` (sans) with `display: swap`
- **CMS:** Shopify Storefront API shape — currently scaffolded with typed mock data (`src/lib/data.ts`) matching GraphQL `Product/Collection/Variant/Cart` types. Swap in real Shopify fetch where flagged `// TODO: Shopify`.
- **State:** React Server Components default, client components only for cart drawer, filters, gallery, Shop The Look hotspots (`"use client"`)
- **Deployment:** Vercel

## Routes

- `/` — Homepage (Hero, Curated Category Grid, Shop The Look, UGC Grid)
- `/collections/[handle]` — Category listing (`shop-all`, `beach-bags`, `footwear`, `sun-hats`) with responsive grid + filters
- `/products/[handle]` — PDP with gallery (hover zoom desktop, swipe mobile, 5s looping video stand-in), variant selector, sticky CTA, value prop strip, cross-sell
- `/pages/lookbook` — Editorial gallery
- `/cart` — Cart page (also accessible via slide-in drawer from any page)
- `/account` — Account shell (login/orders placeholder, ready for Shopify Customer Account API)

Global shell: dismissible sticky announcement bar, centered logo nav, right icon cluster (search/wishlist/account/cart with live badge), cart drawer (slide-in via CSS transform, no reflow), mobile hamburger drawer, sticky bottom nav on mobile (`position: sticky` / `fixed` without JS listeners).

## Responsive Grid (Tailwind breakpoints mapped exactly)

| Element | Mobile <768px | Tablet 768–1024px | Desktop >1024px |
|---|---|---|---|
| Catalog | 2 cols | 3 cols | 4 cols (`grid-cols-2 md:grid-cols-3 lg:grid-cols-4`) |
| Nav | Hamburger + bottom bar | Drawer | Full horizontal |
| PDP | Single col, carousel, sticky bottom CTA | 2 col (photo/details) | 2 col, right column `sticky` |
| Filters | Slide-up modal (bottom) | Slide-over (side) | Left sidebar persistent |

Sticky implemented via `position: sticky` (PDP detail column, header). Cart/bottom drawer uses `transform: translate` to avoid layout shift CLS.

## Design System

- **Palette:** `sand-50/100/200`, `driftwood`, `terracotta`, `clay`, `ocean-teal` — defined in `src/app/globals.css` `@theme inline`.
- **Type:** Serif (`Cormorant_Garamond`) for H1/hero/section titles, sans (`Inter`) for body/UI. Scale via Tailwind `font-display`.
- **Buttons:** Single reusable `<Button variant="primary|secondary|ghost|outline" size="sm|md|lg">` with consistent shape/hover — no per-page styles.
- **Spacing:** Generous desktop, tightened proportionally on mobile.

## SEO

- Clean hyphenated slugs (`/products/terracotta-suede-sandals`), stopwords stripped via `slugify`.
- `generateMetadata` per route: `Title pattern: [Product] - [Material] | Coastal Aesthetic`, conversion-oriented description <155 chars.
- All `next/image` have keyword-aware alt (e.g. “Model wearing terracotta suede sandals on a sandy beach…”). No empty alt.
- **JSON-LD:** `Product` schema (name, image, offers.price/currency/availability, aggregateRating, shippingDetails) + `BreadcrumbList` matching visible UI — validated for Rich Results required fields.
- Canonical URLs, OpenGraph images.

## Performance

- `next/image` with `width/height` or `fill`+sized parent to prevent CLS
- `loading="lazy"` for below-fold (default), only hero/LCP has `priority`
- `next/font` `display:'swap'`
- Announcement/cart drawer use `transform` not reflow
- Fonts, images served as WebP/AVIF via `next.config.ts` `images.formats`

## Getting Started

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # production check
npm start
```

## Project Structure

```
/src
  /app
    layout.tsx          # fonts, providers, shell
    page.tsx            # homepage
    globals.css         # design tokens
    /collections/[handle]
    /products/[handle]
    /pages/lookbook
    /account
    /cart
  /components
    /ui                 # Button, ProductCard, Badge
    /layout             # Header, Footer, CartDrawer, AnnouncementBar, BottomNav
    /home               # Hero, CategoryGrid, ShopTheLook, UgcGrid
    /product            # Gallery, VariantSelector, CrossSell, ProductClient
    /collection         # Filters
  /lib
    types.ts            # Product, Variant, Collection, CartLine typed interfaces
    data.ts             # Typed mock data (replace with Shopify Storefront API)
    utils.ts            # formatPrice, slugify, SEO helpers
    cart-context.tsx    # Cart + wishlist state (React context)
```

## Shopify Wiring (TODO)

- Replace `src/lib/data.ts` exports with `fetch` to `https://{store}.myshopify.com/api/2024-01/graphql.json` using `storefront` token from `SHOPIFY_STOREFRONT_TOKEN`.
- Keep same TypeScript interfaces — mock data already mirrors Storefront shape.
- Cart mutations (`cartCreate`, `cartLinesAdd`) map to `addToCart` context.

## Placeholder Content

All product copy, prices (`$32–$89`), and images (`picsum.photos` seeded) are clearly labeled placeholders in coastal tone — swap with real assets. Flagged in `data.ts`.

## License

Private — boutique brand placeholder.
