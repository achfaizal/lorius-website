# Lorius Website & Booking System

Production website for **Lorius** — photography for moments worth keeping.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui.
See [docs/BLUEPRINT_LORIUS_WEBSITE_BOOKING.md](./docs/BLUEPRINT_LORIUS_WEBSITE_BOOKING.md)
for the full product/design/technical spec, and
[docs/Lorius_Brand_Guideline_2026.pdf](./docs/Lorius_Brand_Guideline_2026.pdf)
for the official brand identity (logo usage, color, typography) — these are
the source of truth for this project. Development proceeds task-by-task per
the blueprint's §68.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (Next.js will pick the
next free port if 3000 is taken).

## How booking works

The site stores nothing and takes no payment. `/booking` is a 2-screen form
(service + package, then date/time + a short contact form); its last button
opens WhatsApp with the booking summary prefilled (`src/lib/booking-whatsapp.ts`)
and sends the customer back to the homepage. The Lorius admin confirms the
schedule, final price, and payment in that chat. The only environment
variables are the optional site URL and Google Analytics ID — see
`.env.example`.

## Stack

- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS v4 + shadcn/ui
- Poppins via `next/font` (the only typeface in the brand guideline)
- React Hook Form + Zod, date-fns, Framer Motion, Lucide icons

## Brand assets

Official logo files live in [public/logo/](./public/logo/) (`Logo.png` /
`Logo_bg.png` — primary/reverse wordmark, `Icon.png` / `Icon2.png` —
primary/reverse monogram), referenced by `LoriusLogo` / `LoriusMark`
([src/components/brand](./src/components/brand)). See the brand guideline
PDF above for usage rules (safe area, minimum size, backgrounds to avoid).

## Project structure

```text
src/
├── app/            # routes (App Router)
├── components/
│   ├── brand/      # LoriusLogo, LoriusMark
│   ├── layout/     # SiteContainer, Section, SectionHeading
│   ├── marketing/  # homepage sections (Navbar, Hero, Footer, ...)
│   ├── gallery/     # portfolio grid, filter, lightbox
│   └── ui/         # shadcn/ui primitives
├── data/           # content that's realistically CMS-editable later
├── constants/      # structural/site config (nav links, contact info)
└── lib/            # utils (cn, format, whatsapp, booking message, etc.)
```

`components/booking/` holds the booking flow and `components/gallery/` the
portfolio; photos live in [public/photos/](./public/photos/) (see its README).
