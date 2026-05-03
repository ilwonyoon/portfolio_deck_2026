# Mobile Responsive & Performance Plan

This plan defines the structural mobile pass for the portfolio deck. The goal is not to make the fixed `1920x1080` canvas fluid. The goal is to keep the deck composition stable while changing the surrounding shell, navigation, and media lifecycle so the site runs reliably on mobile Safari and Chrome.

## Current Diagnosis

The biggest mobile risk is architectural: the side slide index renders every slide as a real React slide tree.

- `DeckWorkspace` renders `SlideIndexPanel` whenever the deck is not in present mode.
- `SlideIndexPanel` maps over every slide and calls `slide.render({ isThumbnail: true })`.
- `SlideThumbnail` scales a full `1920x1080` slide into a small preview.
- Many slide components still mount real images and videos when rendered as thumbnails.

This means the app can mount dozens of full slide trees, hundreds of images, and multiple video elements just to show the left navigation. On desktop this is wasteful. On mobile this can crash or stall Safari.

Measured project state:

- `public/media`: about `138MB`
- media files: `23` videos, `248` images
- production JS bundle: about `705KB`, `212KB gzip`
- production CSS bundle: about `192KB`, `27KB gzip`
- Vite reports a large chunk warning for the main JS bundle

The main presentation viewport is less risky because it renders only the current slide. The navigation and media lifecycle are the primary problems.

## Product Goals

- Preserve the existing fixed `1920x1080` slide design system.
- Make `/portfolio` stable on mobile Safari and Chrome.
- Keep mobile navigation usable without rendering every slide.
- Keep desktop admin behavior intact unless deliberately changed.
- Avoid adding decorative motion or extra UI that weakens the deck rhythm.

## Design Principles

- One active slide should be the only heavy slide tree mounted.
- Mobile navigation should be lightweight and static.
- Thumbnails should be assets, not live slide renders.
- Videos should mount only when they are visible and needed.
- The public viewer and private admin shell should be structurally different on mobile.

## Target Architecture

### Desktop Admin

Route: `/admin`

- Keep left slide index.
- Keep center presentation viewport.
- Keep right inspector.
- Keep drag, delete, grid, and selection tools.
- Existing live thumbnails can remain temporarily, but should eventually move to static thumbnails for consistency.

### Desktop Viewer

Route: `/portfolio`

- Keep center presentation viewport.
- Left navigation can remain for now.
- No right inspector.
- No edit affordances.
- Can later use the same static thumbnail model as mobile.

### Mobile Viewer

Route: `/portfolio` on small or coarse-pointer devices

- Render only the main `PresentationViewport`.
- Do not render `SlideIndexPanel`.
- Do not render `DeckInspectorPanel`.
- Add a bottom horizontal slide rail.
- The slide rail uses text labels or static snapshot images only.
- Support left/right edge taps on the main deck area for previous/next slide or step.
- Respect safe-area insets.
- Use `100dvh`/`100svh` carefully for browser chrome changes.

### Mobile Admin

Route: `/admin` on small or coarse-pointer devices

- Prefer a review-oriented mode, not the full editor.
- Hide inspector and edit controls.
- Use the same bottom slide rail as mobile viewer.
- Keep URL slide/step state.
- Optionally show a small "desktop recommended" notice later, but do not block usage.

## Data Model Changes

Extend `SlideDefinition` with optional lightweight navigation metadata.

```ts
export type SlideDefinition = {
  id: string
  navLabel: string
  steps: number
  stepDisplay?: 'dots' | 'none'
  thumbnail?: {
    src: string
    alt?: string
  }
  render: (context: SlideRenderContext) => ReactNode
}
```

Rules:

- `thumbnail.src` should point to a compressed static image.
- If no thumbnail exists, navigation falls back to a text tile.
- Navigation must never call `slide.render`.

## Component Plan

Add:

```txt
src/hooks/useMediaQuery.ts
src/components/MobileSlideRail.tsx
src/components/DeckVideo.tsx
src/components/DeckImage.tsx
```

Update:

```txt
src/pages/DeckWorkspace.tsx
src/types/presentation.ts
src/components/SlideIndexPanel.tsx
```

### `useMediaQuery`

Single responsibility: determine mobile/coarse-pointer shell behavior.

Suggested query:

```ts
'(max-width: 768px), (pointer: coarse)'
```

### `MobileSlideRail`

Single responsibility: lightweight mobile navigation.

Behavior:

- fixed to the bottom
- horizontal scroll
- shows current slide state
- uses button elements
- uses static thumbnail image if available
- otherwise uses slide number and `navLabel`
- never renders slide contents

### Mobile Tap Navigation

Single responsibility: let the main slide area behave like a deck on touch devices without rendering extra neighboring slides.

Behavior:

- left edge tap moves to the previous step or slide
- right edge tap advances to the next step or slide
- center area remains open for slide content interaction
- bottom rail remains independently scrollable and tappable

### `DeckVideo`

Single responsibility: safe video lifecycle.

Defaults:

- `muted`
- `playsInline`
- `loop` only when needed
- `preload="none"` or `preload="metadata"`
- poster required for deck demo videos
- only render the `<video>` element for the active slide

### `DeckImage`

Single responsibility: safe image defaults.

Defaults:

- `decoding="async"`
- `loading="lazy"` unless explicitly marked eager
- optional responsive sources later

## Implementation Phases

### Phase 1: Structural Mobile Safety

Goal: stop mobile crashes first.

- Add `useMediaQuery`.
- In `DeckWorkspace`, compute `isMobileShell`.
- Do not render `SlideIndexPanel` on mobile.
- Do not render `DeckInspectorPanel` on mobile.
- Add `MobileSlideRail` using text-only tiles first.
- Add left/right tap-zone navigation on the main mobile deck area.
- Keep the fixed `1920x1080` stage scaled inside the available viewport.

Acceptance criteria:

- On mobile viewport, only one `.presentation-stage` exists.
- On mobile viewport, no `.slide-index__thumbnail-canvas` exists.
- On mobile viewport, the current slide can be changed from the bottom rail.
- On mobile viewport, left/right edge taps change the current step or slide.
- Build and lint pass.

### Phase 2: Static Slide Snapshots

Goal: make navigation visual without live slide rendering.

- Add `thumbnail` metadata to high-priority slides.
- Reuse existing poster or representative media first where it already exists.
- Generate compressed `webp` or `jpg` snapshots.
- Use lazy images in `MobileSlideRail`.
- Optionally update desktop `SlideIndexPanel` to use thumbnails instead of live renders.

Acceptance criteria:

- Slide navigation never calls `slide.render`.
- Mobile rail images load lazily.
- Missing thumbnails degrade to text labels.
- Desktop sidebar uses static thumbnails when a slide has thumbnail metadata.

### Phase 3: Media Lifecycle

Goal: reduce video and image decode pressure.

- Introduce `DeckVideo`.
- Move demo-video slides onto `DeckVideo`.
- Ensure thumbnail/mobile nav paths never mount `<video>`.
- Add posters to every video slide.
- Prefer MP4-safe playback for iOS Safari.
- Add `preload` explicitly.
- Render a poster image instead of a video when a video slide is reached through thumbnail rendering.

Acceptance criteria:

- Mobile has at most one active video element for the current slide.
- Non-current slides do not load video sources.
- Video slides show posters before playback.
- Video components use consistent `muted`, `playsInline`, `loop`, and `preload` defaults.

### Phase 4: Asset Loading Without Quality Loss

Goal: reduce unnecessary mobile work without lowering the visual quality of primary portfolio slides.

- Keep primary slide imagery at original/highest available resolution.
- Do not replace on-slide portfolio images with lower-quality compressed variants by default.
- Use lightweight assets only for navigation thumbnails, posters, and non-primary preview surfaces.
- Audit any media file above `2MB` for loading behavior, not automatic quality reduction.
- Prefer structural savings first: fewer mounted slides, no live thumbnail trees, no non-current videos.

Review candidates:

- `public/media/clp-topic-left-3x.png`
- `public/media/clp-topic-root-3x.png`
- `public/media/personal/hero-family.png`
- `public/media/personalized-feed.mp4`
- `public/media/aido/aido.mp4`

Acceptance criteria:

- Primary slide images remain visually high-resolution on both mobile and desktop.
- Mobile still mounts only the active slide and lightweight navigation.
- Any lower-quality derivative asset must be limited to thumbnails/posters or explicitly approved.

### Phase 5: Bundle Splitting

Goal: reduce initial JS parse cost.

- Split public landing page from deck workspace.
- Consider lazy-loading admin-only inspector/editor code.
- Consider splitting system deck from portfolio deck.
- Consider lazy-loading heavy experiment slides if they are not public-facing.

Acceptance criteria:

- Main public entry chunk no longer triggers a large chunk warning, or warning is consciously accepted with documented reason.
- `/` landing page does not import the full deck unless navigating to `/portfolio`.

## Mobile Layout Rules

- Do not change the `1920x1080` slide composition per slide.
- Scale the stage to fit inside the remaining viewport after the bottom rail.
- Use `env(safe-area-inset-bottom)` for the rail.
- Use `100dvh` for the active viewport area where supported.
- Avoid hover-only interactions on mobile.
- Keep touch targets at least `44px`.
- Bottom rail should be useful but visually quiet; the slide remains the focus.

## Performance Budgets

Initial mobile target:

- one active slide tree mounted
- zero live slide trees inside navigation
- at most one active video element
- no non-current slide video source loading
- image thumbnails lazy-loaded
- no forced layout loop across all slides

Asset budget:

- video demo target: under `5MB` per short loop, lower if possible
- primary slide image target: highest available quality; optimize loading behavior before quality
- thumbnail target: under `150KB` each

Bundle budget:

- keep public initial JS close to or below the current `212KB gzip`
- reduce after route/admin splitting if mobile remains unstable

## Verification Plan

Run locally:

```bash
npm run typecheck
npm run lint
npm run build
```

Manual browser checks:

- desktop `/portfolio`
- desktop `/admin`
- mobile-width `/portfolio`
- mobile-width `/admin`
- iPhone Safari if available
- mobile Chrome if available

Runtime checks:

- inspect DOM node count before and after Phase 1
- verify mobile has no `.slide-index__thumbnail-canvas`
- verify active slide navigation via URL query still works
- verify videos do not load on non-current slides
- verify orientation changes do not break stage scale

## Open Decisions

- Should desktop viewer also move from live thumbnails to static thumbnails immediately?
- Should mobile `/admin` be allowed, or should it redirect to `/portfolio` with a notice?
- Should slide snapshots be generated manually first or scripted later?
- Should video assets move to CDN before or after mobile shell work?

## Recommended First PR

Implement Phase 1 only.

Scope:

- add mobile shell detection
- skip desktop sidebars on mobile
- add bottom text-only slide rail
- preserve current deck rendering and slide content

Reason:

This directly removes the biggest crash vector without touching slide design, media files, or animation details.
