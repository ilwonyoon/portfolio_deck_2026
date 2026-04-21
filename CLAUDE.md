# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # start Vite dev server (includes deck editor middleware)
npm run dev:host      # dev server exposed on LAN
npm run build         # tsc -b && vite build (production bundle)
npm run typecheck     # tsc --noEmit -p tsconfig.app.json
npm run lint          # eslint .
npm run preview       # preview production build
```

Run `npm run build && npm run lint` before pushing UI or layout changes. There is no test suite — validation is typecheck + lint + build + manual browser verification of scaling/navigation.

## Architecture

Interactive presentation deck built as a React 19 + TypeScript + Vite SPA. The deck renders on a fixed `1920x1080` canvas and scales to the viewport.

### Slide system (the core abstraction)

Every slide conforms to `SlideDefinition` in `src/types/presentation.ts`:

- `id`, `navLabel`, `steps` (how many in-slide steps), optional `stepDisplay`
- `render(context)` — receives `{ advanceStep, advanceSlide, autoPlay, isThumbnail, step, slideIndex, totalSlides }`

Two layers compose the deck:

1. **`src/slides/deck.tsx`** — `slideRegistry: Record<string, SlideDefinition>` wires every slide component to a stable ID. Adding a new slide means registering it here.
2. **`src/slides/deckManifest.ts`** — ordered list of IDs that actually appear in the portfolio deck. `buildDeckSlides(deckManifest)` produces the sequence consumed by the app.

A second collection, `src/slides/systemDeck.tsx` → `designSystemSlides`, is shown when `?deck=system` is in the URL.

### Runtime state

- **`src/hooks/useDeckState.ts`** — single source of truth for `{slideIndex, step}`. Reads/writes `?slide=<id>&step=<n>` to the URL (deep links), clamps out-of-range values, and owns the global keyboard handler (Arrow/Space/PageUp/PageDown/Home/End/Backspace). Keyboard nav is suppressed when focus is inside an input/textarea/contentEditable.
- **`src/App.tsx`** — top-level shell. Manages presentation mode (`?mode=present` hides chrome; Escape exits), inspector/slide-index panel collapse, canvas selection, optional 12×12 grid, and wires delete/reorder handlers.

### Deck editor middleware (dev only)

`vite.config.ts` registers `deckEditorPlugin()` which exposes:

- `DELETE /__deck-editor/slides/:id` — removes a slide ID from `deckManifest.ts`
- `POST /__deck-editor/reorder` — rewrites the manifest in a new order

Client wrappers live in `src/lib/deckEditor.ts`. Editing is gated by `import.meta.env.DEV && mode === 'edit' && deck === 'portfolio'`. The plugin **rewrites `src/slides/deckManifest.ts` on disk** — be aware that manifest reorders/deletes from the UI produce real file diffs.

### Viewport & measurement

- **`src/components/PresentationViewport.tsx`** — hosts the fixed `1920x1080` stage, computes scale-to-fit, renders the optional grid, and emits `CanvasSelection` events (element rect + computed typography) to the inspector.
- **`src/lib/pretext.ts`** — memoized wrapper around `@chenglou/pretext`'s `prepare`/`layout` for text measurement; used by slides that need precise text layout.
- **`src/hooks/useTextMetrics.ts`** — React-side measurement hook.

### Media resolution

`src/lib/media.ts` → `resolveMediaUrl(path)`:

- absolute URL → returned as-is
- path starting with `/` → prefixed with `VITE_MEDIA_BASE_URL` if set, else left as-is (served from `public/`)
- bare filename → resolved under `/media/` (or the remote base)

Local assets live in `public/media/`, `public/posters/`, `public/fonts/`. `.env.example` documents `VITE_MEDIA_BASE_URL` for hosting assets on a CDN.

### Motion libraries

Both `framer-motion` and `gsap` (with `@gsap/react`) are installed. GSAP-driven slides live under `GsapStudySlide` and `TileEntranceStudySlide`.

## Conventions

- 2-space indent, `PascalCase` components, `camelCase` hooks/utilities
- Slide content belongs in `src/slides/`; generic layout and interaction code in `src/components/` or `src/hooks/`
- Global CSS lives in `src/index.css` — do not scatter global styles
- Keep the `1920x1080` aspect ratio unless a change is deliberate and repo-wide
- Slide IDs and `navLabel`s should stay short and stable (they appear in URLs and the index panel)

## Figma Workflow

When a slide is driven by a Figma node, always:

- Fetch the exact node JSON and node screenshot first
- Treat Figma inspector values (position, dimensions, rotation) as the source of truth
- Compare the exported asset against the Figma screenshot before finalizing
- Do not expand or rewrite on-slide copy beyond the Figma node unless the user explicitly asks

## Deck Constitution

Three operating rules for slide creation and review (from `AGENTS.md`):

1. **Less is more** — each slide does one job; cut content before adding layout
2. **Rhythm with patterns** — reuse existing slide patterns (see `PatternTemplateSlide` modes) before inventing new layouts
3. **Motion with meaning** — motion must improve comprehension, emphasis, sequencing, or emotional timing; remove decorative motion

Before revising any slide, define the slide's single job, the chosen pattern, the maximum content, and the reason any motion improves delivery. Push back on changes that overfill a slide or weaken pacing; default to editing, simplifying, or splitting rather than stacking.
