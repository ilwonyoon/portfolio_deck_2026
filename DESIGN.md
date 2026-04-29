# DESIGN.md — Ilwon Yoon Portfolio Deck

> Agent-readable design system for the `Portfolio_deck_2026` presentation deck. Any AI agent generating a new slide, component, or supporting asset must read this file first and conform to it. When this document and `src/index.css` disagree, `src/index.css` is the source of truth — update this file to match.

---

## 1. Visual Theme & Atmosphere

**Mood:** Cinematic editorial on a void-black stage. Quiet, dense, confident. The deck reads like a printed monograph projected at 1920×1080 — not a SaaS pitch deck.

**Design philosophy:**
- **Less is more.** Every slide does exactly one job: explain, prove, compare, transition, or stage. Cut content before adding layout.
- **Rhythm with patterns.** A small library of reusable slide patterns (`poster`, `offset`, `ledger`, `stage`, `essay`, `evidence-rail`, `before-after`, `metric`, `screen-Nup`) creates pacing and recognition. Invent a new pattern only when the communication need is genuinely different.
- **Motion with meaning.** Motion must improve comprehension, emphasis, sequencing, or emotional timing. Decorative motion is removed.
- **Evidence beats explanation.** One strong artifact over mixed headline + body + metric + screenshot.

**Density:** Low density on narrative slides (lots of black). High, disciplined density on evidence slides (metrics, case studies). Never both on the same slide.

**Canvas:** Fixed `1920×1080` stage, scaled to fit viewport. All type sizes and spacing values are absolute pixels on that canvas.

---

## 2. Color Palette & Roles

The deck is monochromatic by design — no brand color, no accent hue. Hierarchy comes from opacity-layered white on pure black, typography scale, and composition.

### Surface

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#000000` | Canvas background |
| `--surface` | `#000000` | Default card / panel |
| `--surface-soft` | `rgba(255,255,255,0.025)` | Lifted surface, barely visible |
| `--surface-soft-strong` | `rgba(255,255,255,0.04)` | Lifted surface, hover / emphasis |
| `--surface-line` | `rgba(255,255,255,0.08)` | Hairline divider, default border |
| `--surface-line-strong` | `rgba(255,255,255,0.14)` | Hairline divider, emphasis |

### Text

| Token | Value | Role |
|-------|-------|------|
| `--text-primary` | `rgba(255,255,255,0.96)` | Headlines, primary body |
| `--text-secondary` | `rgba(255,255,255,0.78)` | Supporting body, captions |
| `--text-tertiary` | `rgba(255,255,255,0.42)` | Meta, utility, labels |
| `--text-quaternary` | `rgba(255,255,255,0.24)` | Barely-present hints, grid guides |

### Accent

| Token | Value | Role |
|-------|-------|------|
| `--accent` | `rgba(255,255,255,0.96)` | **The accent is white.** Used for single-element emphasis against black. |
| `--accent-soft` | `rgba(255,255,255,0.06)` | Faint accent wash |

### Signature poster gradient

```css
--deck-poster-background:
  radial-gradient(circle at 14% 14%, rgba(255,255,255,0.05), transparent 32%),
  linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)),
  #020202;
```

Use for cover / section-index slides only. Never apply to body slides.

### Shadow

| Token | Value |
|-------|-------|
| `--shadow-strong` | `0 24px 64px rgba(0,0,0,0.3)` |

Shadows are rare. Prefer hairline borders and opacity over elevation.

### Hard rules

- Never introduce a colored accent (no brand color, no terracotta, no emerald). If the slide *requires* color, it must come from a media asset (photograph, Figma export, poster) — not from UI chrome.
- Never use pure `#FFFFFF` for text. Use `--text-primary` (96% white) so it sits against black without vibrating.
- Never lighten the background. The canvas is `#000000`.

---

## 3. Typography Rules

### Font families

| Token | Stack | Use |
|-------|-------|-----|
| `--font-sans` | `'General Sans', 'Inter', 'Segoe UI', -apple-system, …` | Default text, body, UI |
| `--font-display` | `'Instrument Sans', 'General Sans', 'Inter', …` | Display / editorial headlines (only where the slide pattern specifies) |
| `--font-ui` | `'SF Pro Text', 'SF Pro Display', -apple-system, …` | In-canvas UI mockups (device frames, pattern-screen) |
| `--font-mono` | `'SFMono-Regular', 'SF Mono', ui-monospace, …` | Timestamps, IDs, ledger data |

**General Sans** is loaded from Fontshare (`api.fontshare.com`). **Instrument Sans** is loaded from Google Fonts (weight 600 only). Both are imported at the top of `src/index.css` — do not re-import.

### Weight scale

| Token | Value | Notes |
|-------|-------|-------|
| `--font-weight-regular` | `400` | |
| `--font-weight-book` | `420` | Book body weight (between regular and medium) |
| `--font-weight-medium` | `500` | Default headline weight |
| `--font-weight-medium-strong` | `540` | Dense card overview |
| `--font-weight-semibold` | `560` | Poster display, H1 emphasis |
| `--font-weight-bold` | `600` | Metrics, dense card titles |

No `300` or `700+`. The deck lives in the 400–600 band.

### Primitive size scale (px)

| Token | Size | Line | Tracking |
|-------|------|------|----------|
| `--type-scale-12` | 12 | 1.2 | 0.08em |
| `--type-scale-14` | 14 | 1.4 | 0.15px |
| `--type-scale-22` | 22 | 1.4 | 0.15px |
| `--type-scale-28` | 28 | 1.3 | 0.1px |
| `--type-scale-36` | 36 | 1.2 | 0 |
| `--type-scale-48` | 48 | 1.2 | −0.01em |
| `--type-scale-72` | 72 | 1.08 | −0.03em |
| `--type-scale-88` | 88 | 0.96 | −0.046em |
| `--type-scale-114` | 114 | 0.94 | −0.045em |
| `--type-scale-122` | 122 | 0.92 | −0.05em |

Display type (72px+) is tightly tracked (negative em). Small UI type (≤14px) is positively tracked. Never invert this rule — large type set loose feels like a blog post, small type set tight feels broken.

### Semantic roles (always prefer these over primitives)

| Token | Size / Weight | Use |
|-------|---------------|-----|
| `--type-meta` | 14 / 500 | Slide chrome: brand mark, context, utility |
| `--type-overline` | 14 / 520, tracking 0.08em | Section eyebrows |
| `--type-body-sm` | 22 / 420 | Default body |
| `--type-body-md` | 28 / 500 | Lead body |
| `--type-body-lg` | 36 / 500 | Short statement body |
| `--type-ordinal` | 24 / 520 | Numbered list / step indicator |
| `--type-lead` | 48 / 550 | Slide-level lead sentence (H3) |
| `--type-case-intro` | 72 / 500 | Case-study intro headline |
| `--type-agenda` | 88 / 500 | Agenda / H1 |
| `--type-poster` | 114 / 560 | Poster / H2 |
| `--type-metric-label` | 88 / 600, tracking −0.042em | Metric label |
| `--type-metric-display` | 122 / 600 | Hero metric number |

### Hierarchy pattern

A slide has **at most one** element from the `poster` / `case-intro` / `metric-display` band. Breaking this rule means you are cramming two jobs into one slide — split the slide.

---

## 4. Component Stylings

The deck is not a component library. It's a slide library composed of patterns. Any "component" below is a slide-internal primitive.

### Slide chrome (`PatternHeader`)

Every pattern slide uses a three-cell header: brand mark (`Ilwon Yoon`) · context · utility. All three use `--type-meta` in `--text-tertiary`. Left-aligned brand, centered context, right-aligned utility. Never drop brand or utility — the repetition is the rhythm.

### Pattern modes (the slide library)

| Mode | Purpose |
|------|---------|
| `poster` | Single statement at display size. Cover, section break, or thesis. |
| `offset` | Asymmetric headline + supporting block. Used for lead paragraphs. |
| `ledger` | Dense tabular / numeric evidence. Mono accents for timestamps. |
| `stage` | Full-bleed media with minimal chrome. Used for hero artifacts. |
| `essay` | Long-form reflective text at `--type-essay` (34 / 1.28 / 0.1px). |
| `evidence-rail` | Horizontal strip of artifacts (3–5) sharing a caption. |
| `before-after` | Two-up comparison with a hairline divider. |
| `metric` | Single metric slide using `--type-metric-display`. |
| `screen-1up` / `screen-2up` / `screen-3up` / `screen-4up` | Device mockups arranged on the stage. |

Reuse these modes before inventing a new one. A new pattern requires a distinct communication need, not novelty.

### Hairline borders

Default border is `1px solid var(--surface-line)`. Emphasis is `1px solid var(--surface-line-strong)`. The deck has no thicker borders. If a component needs more visual weight, increase contrast via opacity or typography — not stroke width.

### Radii

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 10px | Chips, small UI |
| `--radius-md` | 16px | Buttons, small cards |
| `--radius-lg` | 22px | Media frames, device mockups |
| `--radius-xl` | 28px | Hero cards, cover artifacts |

Pick the largest radius that fits the element. Inconsistent radii across a slide read as noise.

### Buttons / CTAs

There are no traditional CTAs. Navigation is keyboard-driven (Arrow / Space / PageUp / PageDown). Any in-canvas "button" exists inside a Figma-exported mockup and follows that mockup's spec — not this deck's tokens.

### Context Drawer

`ContextDrawer` is the only approved way to hide secondary rationale behind a primary slide title. It is not a tooltip, footnote, caption, or separate "learn more" row.

**Single job:** keep the slide clean while allowing optional context for the presenter or reviewer. The closed state must still communicate the slide's core message.

**Approved pattern:**

```tsx
<ContextDrawer
  variant="dot"
  title={<h2 className="example-slide__headline">Interest profiling</h2>}
>
  <div className="context-drawer__content">
    <ul>
      <li>Secondary rationale only.</li>
    </ul>
  </div>
</ContextDrawer>
```

**Usage rules:**

- The drawer trigger is always the primary title itself. Do not create a separate trigger such as "Why it mattered", "Context", or "Read more".
- The dot appears to the right of the title via `variant="dot"`. Do not use the `line` or `cursor` variants in deck slides unless a new pattern is explicitly approved.
- The title must use the exact typography of the slide pattern it belongs to. For screen intro slides, match `personalized-feed-intro-slide__headline`: 44px / 500 / 1.25 / 0.1px.
- Opening the drawer must not move the title. Do not vertically center a wrapper whose height changes when the drawer opens. Anchor the title group with fixed `top` / `left` coordinates, then let drawer content expand below.
- Drawer content must use `.context-drawer__content` unless the slide has a documented pattern-specific reason. Keep content to 1–3 short bullets or one short paragraph.
- Drawer copy is secondary. It should explain rationale, constraints, or implementation thinking. It should not contain the slide's main claim.
- Use `showHint={false}` on slides where the dot is already a learned deck pattern or where the hint would add visual noise.

**Failure cases:**

- A dot beside a separate label below the title.
- Title shifting when the drawer opens.
- Drawer content replacing necessary on-slide explanation.
- Long body copy hidden in a drawer because the slide is overfilled.

### Device mockups

Built from `<div>`s inside `PatternTemplateSlide`, not real screenshots. Variants: `profile`, `feed`, `detail`, `grid`. They use `--font-ui` (SF Pro) and `--radius-lg`. Never replace with real app screenshots unless the slide's single job is "show the real product" — in which case use the `stage` pattern with a full-bleed poster export.

---

## 5. Layout Principles

### Canvas geometry

| Token | Value | Meaning |
|-------|-------|---------|
| `--canvas-width` | 1920 | Fixed design width |
| `--canvas-height` | 1080 | Fixed design height |
| `--stage-padding-inline` | 96px | Left / right safe area |
| `--stage-padding-top` | 48px | Top safe area |
| `--stage-padding-bottom` | 72px | Bottom safe area |
| `--controls-safe-area` | 40px | Reserved for deck chrome in non-present mode |

### Grid

- **12 columns × 12 rows**, `--grid-gap: 20px`.
- Layout grid is horizontally inset: starts at `--layout-grid-left: 162px`, spans `--layout-grid-width: 1596px`.
- Vertical rhythm anchors:
  - `--layout-y-center: 50%` (centered hero content)
  - `--layout-y-agenda-top: 575px` (agenda / chapter list baseline)
- Frame edge inset: `--layout-frame-edge: 51px` for poster-style slides.
- Poster grid vertical bounds: top 99.6px, bottom 58px.

### Whitespace philosophy

The stage is mostly empty. A well-composed slide uses 30–45% of the 1920×1080 canvas for content and leaves the rest as breathing room. If a slide exceeds ~55% content fill, reduce content before reducing padding.

### Spacing scale (informal)

Spacing values are composed from `--grid-gap` (20px) multiples and half-steps. Typical values: 8 · 12 · 20 · 40 · 60 · 96 · 120 · 160px. There is no 4/8/16/24/32 scale — the deck uses a 20-based grid.

---

## 6. Depth & Elevation

The deck is nearly flat. Elevation is expressed by:

1. **Opacity layering of white on black** (surface-soft, surface-soft-strong).
2. **Hairline borders** (surface-line, surface-line-strong) to separate panels.
3. **Type size + tracking** — larger, tighter type reads as "closer."
4. **Rare use of `--shadow-strong`** for cover poster artifacts that must float above the canvas.

There is no multi-level shadow system and no blurred backdrops (`backdrop-filter`). If a slide needs visual hierarchy beyond these four devices, it has too many jobs — split it.

---

## 7. Do's and Don'ts

### Do

- Treat the black canvas as a stage. Less content, larger type, more breath.
- Reuse the pattern modes listed in §4. Rhythm compounds across slides.
- Keep display type tight (negative tracking) and UI type loose.
- Put real evidence (Figma exports, product shots, charts) on `stage` slides, not on narrative slides.
- When adding a Figma-driven slide, fetch the node JSON + node screenshot and match inspector values exactly (position, dimensions, rotation).
- Let motion serve sequencing: fade-in a single element to pace a reveal, not to decorate.

### Don't

- Don't introduce a colored accent or brand palette. Color comes from content, not chrome.
- Don't pure-white (`#FFFFFF`) text. Use `--text-primary`.
- Don't stack headline + body + metric + screenshot on one slide. Split it.
- Don't add shadows where a hairline will do.
- Don't invent a new slide pattern unless an existing pattern genuinely cannot carry the message.
- Don't animate for novelty. If removing motion preserves the message, remove it.
- Don't wrap display type across more than 3 lines — cut copy instead.
- Don't mix font families within a single text block.

---

## 8. Responsive Behavior

The deck renders on a **fixed 1920×1080 canvas** that scales proportionally to the viewport via `PresentationViewport`. There are **no breakpoints** and **no layout reflows** — the entire stage zooms uniformly.

**Consequences for agents:**
- All spacing, type, and layout values are absolute pixels on the 1920×1080 canvas.
- Never write media queries for deck slides. The viewport handles scale.
- Touch / mobile interaction is not supported. Keyboard-only.
- Do not introduce responsive utility classes (no `sm:` / `md:` / `lg:` prefixes). Tailwind-style responsive APIs do not apply here.

Chrome (navigation, inspector, slide index) appears only when `?mode=present` is absent. Presentation mode (`?mode=present`) hides chrome entirely; Escape exits.

---

## 9. Motion System

### Easing

Primary easing is a single curve: `cubic-bezier(0.22, 1, 0.36, 1)` — a swift-out, soft-settle curve. Used for border / background / transform / opacity transitions across interactive slides.

Secondary easing: `cubic-bezier(0.16, 0.84, 0.22, 1)` for number counters (metric settle).

### Duration band

| Intent | Duration |
|--------|----------|
| Quick UI feedback (color, cursor hover) | 160–220ms |
| Standard reveal / settle | 260–360ms |
| Step transitions (element entrance) | 360–420ms |
| Width / scale reveals | 420–620ms |
| Ambient loop (float, glow, counter) | 6.8s (ease-in-out, infinite) |

### Libraries

`framer-motion` and `gsap` (`@gsap/react`) are installed. Use framer-motion for entrance / exit of DOM nodes tied to step state; use GSAP for choreographed sequences (`GsapStudySlide`, `TileEntranceStudySlide`).

### Hard rules

- Every animation must answer: *does this improve comprehension, emphasis, sequencing, or emotional timing?* If no, remove it.
- No parallax on content slides. No continuous background motion behind copy.
- No spring bounces with overshoot > 10%. The deck is composed, not playful.
- Respect `prefers-reduced-motion` — ambient loops (`poster-profile-float`, `poster-profile-glow`) and counter settles disable via media query.

---

## 10. Slide Authoring Checklist (for agents)

Before writing a new slide or revising an existing one, the agent must be able to state all four:

1. **The slide's single job** — explain / prove / compare / transition / stage.
2. **The chosen pattern** — one of the `PatternTemplateSlide` modes, or a registered slide type in `slideRegistry`.
3. **The maximum content** — headline char count, body word count, number of artifacts. If the upper bound is unclear, the slide is not ready.
4. **The reason any motion improves delivery** — if motion does not improve comprehension, it must be removed.

Registration workflow:
1. Create the slide component in `src/slides/` using the tokens above.
2. Register it in `src/slides/deck.tsx` (`slideRegistry`).
3. Add the ID to `src/slides/deckManifest.ts` at the correct narrative position.
4. Verify keyboard navigation, scale-to-fit, and the URL deep-link (`?slide=<id>&step=<n>`).
5. Run `npm run typecheck && npm run lint && npm run build`.
6. Manually verify in the browser against the Figma node, if applicable.

---

## 11. Agent Prompt Guide

### Quick reference

- **Canvas:** 1920 × 1080, fixed.
- **Background:** `#000000`, never lighten.
- **Text color ladder:** `rgba(255,255,255,0.96 / 0.78 / 0.42 / 0.24)`.
- **Accent:** white. No brand color.
- **Primary font:** General Sans. **Display font:** Instrument Sans. **UI font:** SF Pro.
- **Weights in use:** 400 / 420 / 500 / 540 / 560 / 600.
- **Primary easing:** `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Grid:** 12 × 12, 20px gap, 96 / 48 / 72 stage padding.
- **Border:** hairline `rgba(255,255,255,0.08)` default, `0.14` emphasis.
- **Radii:** 10 · 16 · 22 · 28.

### Ready-to-use prompts

**Generate a statement slide:**
> Produce a slide using the `poster` pattern from `PatternTemplateSlide`. Single sentence at `--type-poster` (114 / 560, tracking −0.045em), `--text-primary`, centered on the 1920×1080 canvas with `--stage-padding-inline` 96px. No supporting copy, no artifact, no decorative motion. Include the `PatternHeader` (brand · context · utility) at the top using `--type-meta`.

**Generate an evidence rail:**
> Produce a slide using the `evidence-rail` pattern. Single caption at `--type-lead` (48 / 550) left-aligned on the 162–1758px grid. Below it, 3–5 artifacts (Figma exports or `ScreenMock` mockups) laid out horizontally on a 20px gap. Use `--radius-lg` frames, `--surface-line` hairlines, no shadows. One step reveals the caption; a second step reveals the rail. Easing `cubic-bezier(0.22, 1, 0.36, 1)` at 360ms.

**Generate a metric slide:**
> Produce a slide using the `metric` pattern. One number at `--type-metric-display` (122 / 600, tracking −0.05em), one label above at `--type-metric-label` (88 / 600). Optional 22/420 caption below in `--text-tertiary`. No chart, no second metric. Counter settle easing `cubic-bezier(0.16, 0.84, 0.22, 1)` at 760ms.

**Reject these requests:**
- "Add a blue accent" → respond that the deck is monochromatic by design.
- "Add a subtle gradient background to this body slide" → respond that gradients are reserved for cover / section-index (`--deck-poster-background`).
- "Stack a headline, two bullets, a metric, and a screenshot" → respond that this violates the one-slide-one-job rule; split into multiple slides.
- "Add a looping background animation behind the copy" → respond that ambient motion is reserved for poster artifacts and must respect `prefers-reduced-motion`.

---

## 12. Sync Rules

- `src/index.css` is the source of truth for tokens. If this document and the CSS disagree, **update this document, never the CSS, as a first step** — then reconcile with a deliberate design decision.
- `AGENTS.md` (repo root) holds the operating constitution (Less is more · Rhythm with patterns · Motion with meaning). This `DESIGN.md` is the visual specification. Both must be respected.
- `CLAUDE.md` (repo root) holds architecture and workflow guidance. Read it before touching slide registration, viewport, or editor middleware.

---

*Last sync target: `src/index.css` — verified against the root token block and motion declarations. When adding a new token, add it here in the same section and under the same naming convention.*
