# John Kiriakou Interactive Site

A high-fidelity interactive 3D globe and timeline focused on key places connected to John Kiriakou's biography and public record.

## Stack

- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui component patterns
- Three.js via React Three Fiber for the globe scene

## Local Preview

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

## GitHub

```bash
git init
git add .
git commit -m "Initial John Kiriakou interactive site"
gh repo create john-kiriakou-interactive-site --public --source=. --remote=origin --push
```

## Cloudflare Pages Deploy

After authenticating with Cloudflare:

```bash
npx wrangler pages project create john-kiriakou-interactive-site --production-branch main
npm run build
npx wrangler pages deploy dist --project-name john-kiriakou-interactive-site
```

## Data Updates

Edit `src/data/locations.ts` to update timeline locations, metadata, and source links.
