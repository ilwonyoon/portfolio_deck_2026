# Repository Guidelines

## Project Structure & Module Organization

This repository is a React + TypeScript + Vite presentation app for an interactive portfolio deck. Core app code lives in `src/`.

- `src/components/`: reusable presentation UI such as `SlideShell`, `DeckNavigation`, and `MobilePrototype`
- `src/slides/`: slide definitions and deck sequencing (`deck.tsx`)
- `src/hooks/`: presentation state and measurement hooks
- `src/lib/`: shared helpers such as media resolution and `@chenglou/pretext` integration
- `src/types/`: shared TypeScript types
- `public/media/`, `public/posters/`, `public/fonts/`: static assets for video, posters, and optional self-hosted fonts

Keep slide content in `src/slides/` and generic layout or interaction logic in `src/components/` or `src/hooks/`.

## Build, Test, and Development Commands

- `npm run dev`: start the local Vite dev server
- `npm run dev:host`: start the dev server on the local network
- `npm run build`: run TypeScript build checks and create a production bundle
- `npm run typecheck`: run TypeScript without emitting files
- `npm run lint`: run ESLint across the repo
- `npm run preview`: preview the production build locally

Run `npm run build && npm run lint` before pushing UI or layout changes.

## Coding Style & Naming Conventions

Use TypeScript with React function components and hooks. Follow existing style:

- 2-space indentation
- `PascalCase` for components (`PresentationViewport.tsx`)
- `camelCase` for hooks and utilities (`useDeckState.ts`, `resolveMediaUrl`)
- keep slide IDs and navigation labels concise and stable

Prefer small, composable files. Put presentation-wide CSS in `src/index.css`; avoid scattering global styles.

## Testing Guidelines

There is no dedicated test suite yet. For now, validation is:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- manual browser verification for layout, scaling, and slide navigation

If tests are added later, colocate them with source files using `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines

Commit messages should be short, imperative, and specific, e.g. `Set up interactive portfolio deck shell`.

PRs should include:

- a clear summary of the change
- screenshots or recordings for slide/layout updates
- notes on viewport behavior if scaling or presentation logic changed
- any asset or env requirements, such as `VITE_MEDIA_BASE_URL`

## Configuration Notes

The deck assumes a fixed `1920x1080` presentation canvas. Preserve that ratio unless the change is deliberate and repository-wide. Use `.env` for hosted media configuration; keep secrets out of the repo.

## Figma Workflow Rules

When a slide is driven by a Figma node, always verify both the node payload and the rendered screenshot before implementing or marking the change complete.

- Fetch the exact node JSON and the node screenshot first.
- Treat Figma inspector values for position, dimensions, and rotation as the source of truth for image and poster layouts.
- Compare the exported asset against the Figma screenshot before finalizing the slide.
- Do not expand or rewrite on-slide copy beyond what the Figma node shows unless the user explicitly asks for new text.
- Do not rely on a visual guess or memory when the node JSON or screenshot is available; use both and keep them in sync with the browser render.

## Deck Constitution

This deck should be edited under three standing principles:

1. `Less is more`
2. `Rhythm with patterns`
3. `Motion with meaning`

These are not mood notes. They are operating rules for slide creation and review.

### Principle 1: Less is more

- Every slide should do one job only: explain, prove, compare, transition, or stage.
- When a slide starts doing multiple jobs, cut content before adding layout.
- Prefer one strong statement or one strong artifact over mixed headline + long body + metrics + screenshots on the same slide.
- If in doubt, remove content instead of adding supporting explanation.

### Principle 2: Rhythm with patterns

- Do not invent a new layout when an existing slide pattern can carry the message.
- Reuse established patterns to create pacing and recognition across the deck.
- New patterns must be justified by a genuinely different communication need, not novelty.
- Pattern repetition is a feature. It helps the viewer understand the story faster.

### Principle 3: Motion with meaning

- Motion must improve comprehension, emphasis, sequencing, or emotional timing.
- Do not add animation because it looks impressive in isolation.
- If the message is equally clear without motion, the default is to remove or simplify it.
- Prefer one intentional transition over multiple decorative motions competing for attention.

### Required Slide Check

Before making or revising any slide, define all four:

- the slide's single job
- the chosen pattern
- the maximum content allowed on the slide
- the reason any motion improves delivery

If any of these are unclear, the slide is not ready to expand.

### Review Guardrails

- `One slide, one job.`
- `Reuse patterns before inventing layouts.`
- `If motion does not improve comprehension, remove it.`
- `When in doubt, cut.`
- `Evidence beats explanation.`

### Assistant Behavior

- The assistant should actively push back on requests that overfill a slide or weaken the deck's pacing.
- The assistant should remind the user of the constitution when proposed changes violate these principles.
- The assistant should default toward editing, simplifying, or splitting content rather than stacking more onto one screen.
