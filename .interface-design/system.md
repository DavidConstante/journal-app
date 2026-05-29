# Journal — Design System ("Diario cálido · papel & tinta")

A warm, private journaling app. The interface should feel like a real notebook:
cream paper, sepia ink, a burgundy silk ribbon marking your page. Calm, unhurried, intimate.

## Direction & feel

- **World:** notebook · ink & pen · ribbon bookmark · ruled margins · the timeline of *days* · morning light / evening lamplight.
- **Voice:** expressive serif for the journal's voice, quiet sans for the tool's chrome.
- **Modes:** light (cream paper on a warm desk) + night ("lamplight" — warm espresso, never cold gray).

## Tokens (source of truth: `src/index.css`, OKLCH via Tailwind v4 `@theme inline`)

- Surfaces (light): `--background` desk → `--card`/`--popover` page (lighter). Sidebar shares the canvas hue, separated by a border.
- Text hierarchy: `--foreground` (sepia ink) · `--muted-foreground` (graphite). Use full opacity for body/captions (avoid `/70` — fails AA).
- Brand: `--ribbon` (burgundy) for fills/active marks, used **sparingly**. `--ribbon-strong` for accent **text/links** (lighter in dark for AA). Don't use ribbon as a success color.
- `--cover` / `--cover-foreground`: the auth "leather cover", intentionally constant across themes.
- `--destructive`: terracotta (distinct from the burgundy brand).
- `--rule`: faint red notebook margin line.

## Type

- `--font-display` **Fraunces** — dates, titles, headings, brand (often italic).
- `--font-body` **Newsreader** — the entry writing/reading surface (book-like).
- `--font-sans` **Figtree** — UI chrome, labels, buttons.
- `--font-mono` — timestamps / captions (use `tabular-nums`).
- Captions/eyebrows: one size, `text-[0.7rem]` mono uppercase tracked. Don't drift to 0.65/0.68.

## Depth — single strategy

- **Light:** soft warm shadows (`shadow-soft`, `shadow-page`); cards float with NO border.
- **Dark:** borders carry structure, shadows suppressed.
- Pattern for a "page" card: `border border-transparent shadow-page dark:border-border dark:shadow-none`.

## Spacing & radius

- Base unit 4px (Tailwind scale). `--radius: 0.75rem`; sm/md/lg/xl/2xl derive from it.

## Signature elements

1. **Ribbon bookmark** (`.ribbon-mark`) on the active timeline entry.
2. **Date-grouped timeline** sidebar (`.timeline-thread`), days as `Hoy`/`Ayer`/weekday.
3. Editor is a **page**: Fraunces date header + a left **margin rule** (`border-l border-rule`) beside Newsreader body.
4. **Paper grain** (`.paper-texture`) on page/card surfaces.

## Components

- Built on shadcn/ui (Radix) in `src/components/ui`, re-skinned to the palette. One `TooltipProvider` at the app root.
- Button variants: `default` (ink), `ribbon` (brand CTA), `outline`, `ghost`, `secondary`, `destructive`, `link`.
- Inputs are inset (`bg-muted/40` + inner shadow), focus ring in `ring/25`.
- Toasts: sonner, themed to popover/card.

## A11y rules to keep

- Associate field errors via `id` + `aria-describedby` + `role="alert"`.
- Icon-only buttons need `aria-label`. Save status in an `aria-live` region.
- Mobile drawer: `role="dialog"`, `inert` when closed, Escape closes, focus moves in.
- Keep accent text ≥ 4.5:1 (use `--ribbon-strong`, full-opacity `--muted-foreground`).
