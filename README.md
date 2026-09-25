# Guille — Portfolio

Static multi-page portfolio site. No build step — every page is a self-contained HTML file with a shared design-system stylesheet and page-specific CSS. Google Fonts is the only external dependency.

## Design system

The shared visual foundation lives in [`styles/design-system.css`](./styles/design-system.css). It is based on the `01 — DESIGN SYSTEM` page in the Portfolio Figma file and defines:

- Syne display typography and Inter body typography
- Background, surface, text, border and lime accent tokens
- 4px-based spacing tokens from 4px through 96px
- Content and article widths, responsive gutters and pill/card radii
- Shared focus, selection, motion and reduced-motion behaviour

Page-specific styles can still extend the shared primitives, but should use these tokens instead of introducing new colours or typography values.

## Pages
- `index.html` — homepage, curated selection of 3 projects
- `about.html` — About Me, capabilities and recommendations
- `work.html` — full project library (all projects, grouped by category, data-driven from a JS array at the top of the file)
- `tugo.html`, `standard.html`, `marea-verde.html`, `volkswagen.html`, `froya.html`, `null-wines.html`, `froken-dianas-salonger.html`, `goodlight.html` — case studies

## Adding a new project
1. Add a new case-study HTML file (copy an existing one as a starting template — they all share the same CSS tokens).
2. Add an entry to the `projects` array near the top of the `<script>` in `work.html`.
3. If it should appear on the homepage, add a project card inside `#work` in `index.html`.

## Local preview
No server needed — open `index.html` directly in a browser, or run a simple static server from this folder:

    npx serve .

## Deploying
Any static host works (GitHub Pages, Netlify, Vercel). For GitHub Pages: push this folder to a repo, then enable Pages on the `main` branch in repo Settings → Pages.
# guille-portfolio


## Adding case-study images and links

Keep project assets in the `img/` directory, inside a folder named for the relevant case study. Files without a number are hero images, such as `img/tugo/tugo-hero.jpg`; numbered files are supporting images, such as `img/tugo/tugo-screen-01.jpg`. Reference local assets from the relevant case-study HTML with a relative path. Prototype and video buttons should only be added once the final URLs are available.
