# Portfolio

Portfolio site of **Taisiia Silkina**, product designer for B2B SaaS & AI.
Built with Astro and Tailwind, deployed to GitHub Pages: https://taisniklis.github.io/portfolio/

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # static site in dist/
```

## Where things live

- `src/data/site.ts`: all homepage copy and lists (hero tags, work, AI steps, Playground, experience, links)
- `src/content/cases/*.mdx`: case studies, one file each (written with the `case-study-writer` skill)
- `src/pages/index.astro`: homepage; `src/pages/work/[slug].astro`: case-study page
- `src/assets/`: logo and portrait
- `.claude/skills/case-study-writer/`: the Claude skill for writing case studies

## Add a case study

Write it with the `case-study-writer` skill, save it to `src/content/cases/<slug>.mdx`,
then add or update its card in `src/data/site.ts` with `slug: '<slug>'`.
Images go next to it and replace the `[TODO: file.png]` slots in `<Figure src=…>`.

## Deploy

Every push to `main` builds and publishes the site with `.github/workflows/deploy.yml`.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
