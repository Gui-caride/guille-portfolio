# Guille — Portfolio

Static multi-page portfolio site. No build step — every page is a self-contained HTML file (inline CSS/JS, Google Fonts only external dependency).

## Pages
- `index.html` — homepage, curated selection of 4 projects
- `work.html` — full project library (all projects, grouped by category, data-driven from a JS array at the top of the file)
- `tugo.html`, `standard.html`, `marea-verde.html`, `volkswagen.html`, `froya.html`, `null-wines.html`, `froken-dianas-salonger.html` — case studies

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
