# Taipei Ticket Scout

Build a SaaS landing page + authenticated app shell for Flight Price Notifier (機票降價通知), a product that watches popular flight routes from Taipei and emails the user when the cheapest fare drops to or below their target price — targeted at budget-driven travelers who don't care exactly when they fly, they just want a ticket under their budget.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ca71af9e-24df-4f1e-a393-b8e1ebf70bab).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Environment variables

Auth runs on this project's own Supabase. Both values are in `.env` (the publishable key is
browser-safe and protected by RLS):

| Variable | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | `https://jumpyfgaozzxzgjfyced.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase → Project Settings → API Keys → publishable key |

**Vercel:** add the same two variables under Project → Settings → Environment Variables
(Production, Preview and Development), then redeploy — Vite inlines them at build time.

## Build & deploy

This is a static Vite + React single-page app (React Router for client-side routing; no SSR).

```sh
npm run build   # outputs a static SPA to dist/
npm run preview # serve dist/ locally
```

Deploy `dist/` to any static host. On Vercel, `vercel.json` sets the Vite preset and rewrites
every path to `index.html`, so deep links such as `/app`, `/sign-in` and `/sign-up` resolve
client-side.
