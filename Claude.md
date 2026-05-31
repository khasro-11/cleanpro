# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Always Do First

- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Commands

```bash
npm run dev           # Vite dev server at http://localhost:3000
npm run build         # Vite build → runs prerender.mjs to SSR-inject dist/index.html
npm run build:no-prerender  # Vite build only, skips SSR step
npm run preview       # Preview the built dist/ folder
```

No linting or test runner is configured.

## Architecture

This is a **React 18 SPA with optional SSR pre-rendering** built with Vite.

**Two separate design surfaces:**

1. **React app** (`src/`) — the homepage SPA. Components live in `src/components/`. `App.jsx` composes all sections in order and sets up a global `IntersectionObserver` for the `.rv` reveal-animation class. Entry point is `src/main.jsx`, which detects server-rendered HTML and uses `hydrateRoot` vs `createRoot` accordingly.

2. **Static HTML pages** (`public/`) — `impressum.html`, `datenschutz.html`, and all service subpages (e.g. `public/baureinigung/index.html`). These are standalone HTML files with their own inline styles, copied verbatim into `dist/` by Vite. They are **not** part of the React build.

**SSR pre-rendering flow:** `npm run build` calls `prerender.mjs`, which builds a server-side ESM bundle from `src/entry-server.jsx`, calls `render()` (→ `renderToString`), injects the output into `dist/index.html` at the `<!--ssr-outlet-->` placeholder, then deletes the temporary `dist-ssr/` bundle.

## Design System — React App (`src/`)

All custom styles are in `src/index.css`. The Tailwind config (`tailwind.config.js`) defines extended tokens but the primary design layer is the CSS-variable system in `index.css`.

**Primary CSS variables:**
```
--green: #2b90d9          (the brand accent — a blue, despite the name)
--green-deep: #1d6fb0
--green-tint: #e8f4fc     (light blue tint for backgrounds/icons)
--ink: #15202b            (primary text)
--ink-soft: #51606e
--ink-faint: #8a96a3
--bg: #ffffff
--bg-soft: #f4f7fa
--line: #e3e9ef           (borders)
--radius: 16px
--shadow: 0 2px 4px rgba(20,28,40,.04), 0 14px 34px -18px rgba(20,28,40,.18)
--maxw: 1180px
```

**Font:** `"Plus Jakarta Sans"` (loaded via Google Fonts in `index.html`). The Tailwind config lists Manrope/Instrument Serif but `index.css` overrides with Plus Jakarta Sans — the CSS file is authoritative.

**Key utility classes (index.css):**
- `.wrap` — max-width container (1180px, 28px side padding)
- `.rv` — reveal-on-scroll target; gains `.in` via IntersectionObserver in App.jsx
- `.btn`, `.btn-green`, `.btn-ghost`, `.btn-lg` — button variants
- `.eyebrow` — small uppercase pill label (blue dot + text)
- `.sec-head` / `.sec-head.center` — section heading container

## Design System — Static Pages (`public/`)

Static pages use an older Nordiva design with different tokens:
- Font: Manrope + Playfair Display
- Colors: `--ink: #0e1f33`, `--sky: #7fb3d5`, `--paper: #f5f7f8`
- Nav: dark pill (`background: var(--ink)`), floating at top
- Cards: white with layered box-shadows

When updating static pages, match **this** system, not the React app's.

## Local Server & Screenshot Workflow

- Dev server (Vite): `npm run dev` → `http://localhost:3000`
- Static file server (for built/legacy HTML): `node serve.mjs` → `http://localhost:3000` (serves project root)
- Screenshots: `node screenshot.mjs http://localhost:3000` — saves to `./temporary screenshots/screenshot-N.png`
  - Optional label: `node screenshot.mjs http://localhost:3000 label`
  - Default viewport: 1440×900, full-page
- After screenshotting, read the PNG with the Read tool to analyze it visually.
- Never screenshot a `file:///` URL.
- If the server is already running, do not start a second instance.

## Screenshot Comparison Rules

- Do at least 2 comparison rounds: screenshot → fix mismatches → re-screenshot.
- Be specific when comparing: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px".
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing.

## Reference Images

- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch using the existing design system tokens above.

## Brand Assets

- Real brand files are in `public/brand/` (logo.svg, logo-inverse.svg, logo-mono.svg, favicons).
- Always use these assets — do not use placeholders where real assets exist.

## Anti-Generic Guardrails

- **Colors:** Use the CSS variable palette above. Never use raw Tailwind default colors (indigo-500, blue-600, etc.) as primary brand colors.
- **Shadows:** Use layered, color-tinted shadows. Never flat `shadow-md`.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states.
- **Spacing:** Use the token system consistently — not arbitrary Tailwind steps.

## Hard Rules

- Do not add sections, features, or content not in the reference.
- Do not "improve" a reference design — match it.
- Do not stop after one screenshot pass.
- Do not use `transition-all`.
- Do not use default Tailwind blue/indigo as primary color.
