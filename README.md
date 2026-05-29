# Journal

A warm, private journaling app — write your days, attach photos, and keep a quiet
timeline of your life. Built with a custom **“paper & ink”** design system.

![Light & night modes](public/journal.svg)

## ✨ Features

- **Paper & ink design system** — warm cream/sepia palette, a burgundy *ribbon
  bookmark* that marks your active entry, the editor styled as a notebook *page*
  with a margin rule. Light and night (“lamplight”) modes with a no-flash theme toggle.
- **Email/password & Google sign‑in** via Firebase Auth.
- **Date‑grouped timeline** sidebar with instant **search** across your entries.
- **Distraction‑free editor** — serif writing surface, live **word count**,
  **debounced autosave**, and an explicit save.
- **Image attachments** — drag‑and‑drop or pick files, uploaded to Cloudinary,
  with a lightbox viewer and per‑image removal.
- **Polished states everywhere** — loading skeletons, friendly empty states,
  Spanish error messages, and toasts.
- **Accessible & responsive** — Radix primitives, keyboard focus rings, a mobile
  drawer, and `prefers-reduced-motion` support.

## 🧰 Stack

| Area | Choice |
| --- | --- |
| Framework | React 19 + Vite 8 |
| Routing | React Router 7 |
| State | Redux Toolkit + React‑Redux |
| UI | shadcn/ui (Radix) + Tailwind CSS v4 (CSS‑first `@theme`, OKLCH tokens) |
| Icons | lucide-react |
| Toasts | sonner |
| Backend | Firebase Auth + Firestore (lite) |
| Images | Cloudinary (unsigned upload) |
| Tooling | ESLint 9 (flat) · Prettier · Vitest + Testing Library |

## 🚀 Getting started

```bash
pnpm install
pnpm dev
```

Open the URL Vite prints (default `http://localhost:5173`).

### Environment

The app ships with a public demo Firebase/Cloudinary config so it runs out of the
box. To use your own project, copy `.env.example` to `.env` and fill in:

```bash
cp .env.example .env
```

```ini
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

VITE_CLOUDINARY_CLOUD_NAME=...
VITE_CLOUDINARY_UPLOAD_PRESET=...   # an unsigned upload preset
```

> Firebase web keys are public client identifiers, not secrets — access is
> enforced by Firestore Security Rules.

## 📜 Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview the production build |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm lint` | Lint with ESLint |
| `pnpm format` | Format with Prettier |

## 🗂️ Project structure

```
src/
  auth/            Login / Register pages, layout & routes
  journal/         Sidebar timeline, editor, gallery, layout & routes
  components/
    ui/            shadcn/ui primitives (re-skinned: button, dialog, …)
    theme/         ThemeProvider + theme toggle
  store/           Redux Toolkit slices, thunks & selectors (auth, journal)
  firebase/        App config & auth providers
  helpers/         Cloudinary upload, note loading
  hooks/           useForm, useCheckAuth, useDebounce
  lib/             cn(), date formatting, friendly auth errors
  index.css        The paper & ink design tokens (Tailwind v4 @theme)
```

## 🎨 Design tokens

All color/spacing/typography lives in `src/index.css` as CSS variables
(`--background`, `--foreground`, `--ribbon`, …) mapped through Tailwind v4's
`@theme inline`. Change the palette there and the whole app follows — including
both themes.
