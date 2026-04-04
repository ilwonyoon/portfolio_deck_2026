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
