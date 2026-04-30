# Routing Plan

This plan defines the next app-structure pass for the portfolio deck. The goal is to separate the public viewing experience from the private editing experience, while adding a simple landing page as the first entry point.

## Goals

- Make `/` a full-page single-page portfolio intro.
- Make `/portfolio` the public share view for reviewers.
- Make `/admin` the working view for editing and inspection.
- Keep slide deep links shareable with `slide` and `step` query params.
- Move full screen / present mode access to the left navigation.
- Remove the left navigation collapse affordance and use that control position for full screen instead.
- Rename the left navigation header from `Slides` to `ilwonyoon portfolio`.

## Route Structure

| Route | Audience | UI | Notes |
| --- | --- | --- | --- |
| `/` | Public | Landing page only | Full-page intro with typed 01-04 statements and CTA to `/portfolio`. |
| `/portfolio` | Public reviewers | Left navigation + center deck preview | No right inspector. No edit tools. Shareable deck links live here. |
| `/portfolio?slide={id}&step={n}` | Public reviewers | Left navigation + center deck preview | Opens directly to a slide and step. |
| `/admin` | Author / editor | Left navigation + center deck preview + right inspector | Keeps selection inspector, grid toggle, and local edit affordances. |
| `/admin?slide={id}&step={n}` | Author / editor | Full admin workspace | Opens directly to a slide and step in admin context. |
| `/Admin` | Author / editor | Redirect or alias to `/admin` | Support the capitalized path to avoid friction. |

## Landing Page

Single job: introduce the portfolio and move the viewer into the deck.

Pattern:

- Full-page editorial intro, not a marketing site.
- One primary identity statement.
- Four numbered typed statements: `01`, `02`, `03`, `04` plus concise content.
- One CTA to enter `/portfolio`.

Content constraints:

- Keep copy short.
- Avoid adding metrics, project thumbnails, or long explanations.
- Do not make this a second portfolio page. It is only the entry point.

Motion:

- Typing / sequential reveal is allowed because it sets reading order.
- Do not add decorative motion beyond the 01-04 reveal and CTA state.
- Respect `prefers-reduced-motion`.

## Deck Workspace Modes

Extract the current deck experience from `App.tsx` into a workspace component with explicit mode behavior.

Suggested type:

```ts
type DeckWorkspaceMode = 'viewer' | 'admin' | 'present'
```

### Viewer Mode

Used by `/portfolio`.

- Show left navigation.
- Show center deck preview.
- Hide right inspector.
- Disable slide delete.
- Disable slide reorder.
- Disable selection inspection.
- Hide grid controls.
- Keep keyboard navigation.
- Keep URL query sync for `slide` and `step`.
- Allow full screen / present mode from the left navigation.

### Admin Mode

Used by `/admin`.

- Show left navigation.
- Show center deck preview.
- Show right inspector.
- Enable selection inspection.
- Show grid controls in the inspector.
- Keep local development-only edit affordances for delete/reorder unless explicitly changed later.
- Allow full screen / present mode from the left navigation.

### Present Mode

Used after pressing the full screen / present button from either `/portfolio` or `/admin`.

- Show only the centered slide canvas.
- Hide left navigation.
- Hide right inspector.
- Show a minimal `Exit` control.
- Exit should return to the originating route, preserving `slide` and `step`.

## Left Navigation Changes

The left navigation becomes the stable table of contents for both public and admin contexts.

Header:

- Replace the current document icon + `Slides` title with `ilwonyoon portfolio`.
- Keep a small secondary count such as `{n} frames`.
- Avoid adding extra explanatory text.

Controls:

- Remove the left panel collapse button as the primary header action.
- Put the full screen / present button in that position.
- Use an icon button with an accessible label such as `Enter full screen`.
- In admin mode, do not duplicate the present button in the right inspector.

Interaction:

- Slide thumbnails remain clickable.
- In viewer mode, thumbnails are navigation only.
- In admin mode, drag and delete can remain development-only edit tools.

## Right Inspector Changes

The right inspector is admin-only.

- Render only on `/admin`.
- Keep selection metrics, typography metrics, grid toggle, and inspector sections.
- Remove present/full screen ownership from this panel once the button moves left.
- Do not render the panel at all on `/portfolio`.

## URL State

Current query-based slide state should remain, but path should define the experience.

Keep:

- `?slide={slideId}`
- `?step={stepIndex}`
- `?deck=system` if the system deck still needs to be reachable in development

Replace or de-emphasize:

- `?mode=present` should no longer be the main public/admin split.
- Path should determine viewer/admin.

Suggested behavior:

- `/portfolio?slide=saveback-demo&step=0` opens SaveBack in viewer mode.
- `/admin?slide=saveback-demo&step=0` opens SaveBack in admin mode.
- Pressing full screen can either set an internal present state or add a temporary query param, but exit must restore the same path.

## Component Plan

Recommended structure:

```txt
src/
  App.tsx
  pages/
    LandingPage.tsx
    DeckWorkspace.tsx
  components/
    SlideIndexPanel.tsx
    DeckInspectorPanel.tsx
    PresentationViewport.tsx
```

`App.tsx` responsibilities:

- Read `window.location.pathname`.
- Route `/`, `/portfolio`, `/admin`, and `/Admin`.
- Redirect or alias unknown routes to `/`.

`LandingPage.tsx` responsibilities:

- Render the intro page.
- Handle the 01-04 typing / reveal sequence.
- Link to `/portfolio`.

`DeckWorkspace.tsx` responsibilities:

- Own deck collection state.
- Own slide state via `useDeckState`.
- Decide which panels render based on mode.
- Own present/full screen state and return behavior.

`SlideIndexPanel.tsx` responsibilities:

- Render the `ilwonyoon portfolio` header.
- Render slide thumbnails.
- Own the full screen button placement.
- Keep edit actions conditional.

`DeckInspectorPanel.tsx` responsibilities:

- Admin-only inspector.
- No full screen / present mode button after this change.

## Implementation Sequence

1. Extract the current deck shell from `App.tsx` into `DeckWorkspace`.
2. Add path-based routing in `App.tsx`.
3. Add `/portfolio` viewer mode and confirm the right inspector is hidden.
4. Add `/admin` admin mode and keep the existing inspector behavior.
5. Move the full screen / present button from `DeckInspectorPanel` to `SlideIndexPanel`.
6. Remove or disable the left collapse button.
7. Rename the left navigation header to `ilwonyoon portfolio`.
8. Add the `/` landing page with the 01-04 typed statement pattern.
9. Verify deep links for both `/portfolio` and `/admin`.
10. Run `npm run build && npm run lint`.

## Verification Checklist

- `/` renders the landing page.
- Landing CTA navigates to `/portfolio`.
- `/portfolio` shows only left navigation and center preview.
- `/portfolio` does not render the right inspector.
- `/portfolio?slide=saveback-demo&step=0` opens the correct slide.
- `/admin` shows left navigation, center preview, and right inspector.
- `/admin?slide=saveback-demo&step=0` opens the correct slide.
- `/Admin` redirects or aliases to `/admin`.
- Full screen button is in the left navigation.
- Full screen works from `/portfolio`.
- Full screen works from `/admin`.
- Exiting full screen returns to the originating path.
- Left navigation header reads `ilwonyoon portfolio`.
- Left panel collapse icon is no longer the primary header action.
- `npm run build` passes.
- `npm run lint` passes.

## Open Questions

- Should `/admin` be protected before public deployment, or is it acceptable as a hidden authoring route for now?
- Should the system deck remain reachable through `?deck=system`, or should it move to an admin-only route later?
- Should full screen use the browser Fullscreen API, the existing present-mode layout, or both?
- What exact 01-04 landing statements should be used for the first version?

