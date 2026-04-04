# Portfolio Deck 2026

Interactive web presentation for job applications, built on a fixed `1920x1080` stage.

## Stack

- React 19
- TypeScript
- Vite
- `@chenglou/pretext` for text measurement and layout prep
- General Sans variable font via Fontshare CDN

## Commands

```bash
npm install
npm run dev
npm run dev:host
npm run build
npm run typecheck
npm run lint
```

## Presentation setup

- The deck renders on a fixed `1920x1080` canvas and scales to the viewport.
- Arrow keys, `Space`, `Home`, and `End` navigate slides and steps.
- Slide state is synced to the URL query string for sharable deep links.
- `@chenglou/pretext` is wrapped in `src/lib/pretext.ts` and already wired into the slide summary block for text measurement.

## Fonts

The app currently loads `General Sans` from the official Fontshare CDN so development works immediately.

If you want to self-host later:

1. Export the variable font as `GeneralSans-Variable.woff2`
2. Put it in `public/fonts/`
3. Replace the CDN import in [`src/index.css`](/Users/ilwonyoon/Documents/Portfolio_deck_2026/src/index.css) with a local `@font-face`

## Video assets

Two paths are supported:

1. Local development assets in `public/media/`
2. Hosted assets via `VITE_MEDIA_BASE_URL`

Create `.env` from `.env.example` if you want a remote base URL:

```bash
cp .env.example .env
```

Examples:

- local: `public/media/case-study-02/room-planner.mp4`
- remote: `VITE_MEDIA_BASE_URL=https://cdn.example.com/portfolio`

The mobile prototype component accepts direct MP4/WebM URLs and renders them without player chrome.

## Suggested hosting for videos

For job applications, keep the playback path simple:

- start with direct MP4 files in `public/media` while iterating
- move to a CDN-backed absolute base URL when assets get heavy

Good options later:

- Cloudflare R2 + custom domain
- Mux if you want adaptive streaming and analytics
- plain object storage/CDN if the deck mostly uses short silent loops
