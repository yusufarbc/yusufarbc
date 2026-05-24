# yusufarbc.dev (Astro)

This website is built with Astro and published as a static site.

## Requirements

- Node.js 20+

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Project structure

- `src/`: Astro pages, layouts, and application logic
- `content/`: Structured content used by pages
- `public/`: Static files served at the site root (`/images`, `/fonts`, etc.)

## Deployment

- GitHub Pages deployment is handled by `.github/workflows/deploy.yml`.
- Netlify deployment (optional) is configured via `netlify.toml`.
