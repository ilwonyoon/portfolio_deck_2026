# Interaction System Plan

## Why this is needed

The deck is starting to accumulate local transition decisions per slide.
That improves individual moments, but it weakens the deck-level tone.

The main risk is not "too much animation" in isolation.
The real risk is **inconsistent behavior grammar**:

- text changes by crossfade on one slide, by typewriter on another
- numbers jump on one slide, count on another
- images reveal as stacks, rails, mosaics, or fades without a shared rule

For this deck, that breaks all three standing principles:

1. `Less is more`
2. `Rhythm with patterns`
3. `Motion with meaning`

The deck needs a constrained interaction language, not more one-off motion.

## Baseline reference

Use **slide 10 / `case-study-02e` / `OhouseMetricsSlide`** as the baseline interaction model.

Why:

- the text transition is in-place and sequential
- the number transition is functional, not decorative
- the layout stays stable while meaning changes
- the motion supports reading order rather than competing with it

This should become the reference system for all future step-based slides.

## Audit summary

### Good patterns already in the deck

- `OhouseMetricsSlide`
  - text changes in place
  - numbers animate as counters
  - structure stays fixed
- `OhouseSlide`
  - minimal intro reveal
  - one object enters, then one label follows
- `OhousePersonaSlide`
  - stable card layout
  - emphasis through dimming is directionally correct

### Risky patterns

- `OhousePersonaSlide`
  - copy currently changes by crossfade block replacement
  - this is readable, but it does not match the system tone set by slide 10
- `OhouseBrowseMotionSlide`
  - useful as exploration, but currently belongs to the lab bucket
  - too many motion grammars in one area: trail, stack, field
- GSAP study slides
  - good references, not yet a deck system
  - should not directly leak into the case study without normalization

## System decision

The interaction system should be built around **four primitives only**.
Each primitive can contain a small number of approved variants.
The constraint is at the primitive level, not at the single-effect level.

The four primitives are:

1. `Text Replace`
2. `Number Count`
3. `Image Reveal`
4. `Focus Shift`

Everything else should be treated as an exception and require justification.

## Primitive 1: Text Replace

### Use when

- a step changes the statement or interpretation
- the slide remains the same slide structurally
- the viewer should feel "the meaning updated" rather than "a new block appeared"

### Approved behavior

- text stays in the same box
- outgoing text erases or contracts
- incoming text types or resolves in place
- timing is short and linear enough to preserve reading

### Preferred reference

- `OhouseMetricsSlide`

### Rules

- do not crossfade full paragraphs as the primary pattern
- do not slide whole text blocks around between steps
- do not animate multiple text regions independently unless they have separate jobs
- use one active text focus region per slide

### Recommendation

Create a reusable `StepTextReplace` primitive and use it for:

- `OhouseMetricsSlide` as the canonical implementation
- `OhousePersonaSlide` step copy
- future problem / insight / conclusion slides

## Primitive 2: Number Count

### Use when

- the number itself is the proof
- the number changes between steps
- the viewer benefits from seeing magnitude transition

### Approved behavior

- count from old value to new value
- preserve width so layout does not shift
- ease out softly
- start after the text establishes context

### Rules

- never use odometer or slot-machine style numbers in this deck
- never animate numbers that are secondary labels
- if the number is not the point, do not animate it

### Recommendation

Create a reusable `MetricCounter` primitive extracted from `OhouseMetricsSlide`.

## Primitive 3: Image Reveal

### Use when

- the slide introduces a new visual artifact
- the slide needs to stage evidence
- the viewer should notice a visual gradually entering attention

### Approved behavior

- reveal in place
- use opacity, blur release, clip, or scale within a stable frame
- the image should resolve, not fly around

### Rules

- image reveal should not also relocate the layout unless the slide's job is reordering
- no more than one dominant image motion logic per slide
- background image motion should stay subordinate to the text story

### Recommended families

- `Resolve In Place`
  - opacity + slight blur release
- `Masked Reveal`
  - clip-path or crop opening
- `Density Build`
  - repeated tiles accumulate into a fixed field

### Not default

- free-floating parallax
- multi-axis choreography
- mixed stack + rail + field behaviors on one slide

## Primitive 4: Focus Shift

### Use when

- one object among many becomes important
- the layout should stay familiar while attention moves
- the story is comparison, not discovery of a new canvas

### Approved behavior

- keep object positions mostly stable
- dim non-focus items
- slightly sharpen, brighten, or scale the active item
- if needed, use one controlled positional emphasis

### Rules

- focus shift should feel editorial, not cinematic
- do not move every item when only one item needs emphasis
- if a card grid exists, preserve the grid unless the slide job is explicitly "reorder"

### Recommendation

This should be the default image/card interaction for persona and segmentation slides.

## What this means for the current deck

### Keep as system references

- `case-study-02e` / metrics
  - reference for text replace + counter
- `case-study-02i` / personas
  - reference for focus shift after text behavior is normalized

### Refactor to match the system

- `OhousePersonaSlide`
  - replace copy crossfade with in-place text replace
  - keep the card layout fixed
  - keep dim/active logic
- any future insight slide with step copy
  - adopt `StepTextReplace`

### Treat as exploration only

- `case-study-02g`
- `case-study-02g1`
- `case-study-02g2`
- `case-study-02g3`
- GSAP lab slides

These are useful as reference shelves, but they should not define the production deck grammar directly.

## Constraints for image-heavy slides

If an image-heavy slide is added later, choose only one of these jobs:

- `Show abundance`
- `Show focus`
- `Show mismatch`
- `Show transformation`

Then map it to one motion family only:

- abundance -> density build
- focus -> focus shift
- mismatch -> selective reveal or dimming
- transformation -> one controlled re-layout

If a slide tries to do two of these at once, split it.

## Production system to build

### Reusable primitives

Build these shared pieces instead of re-authoring motion per slide:

1. `StepTextReplace`
   - erase / type behavior
   - fixed box
   - configurable delay and speed
2. `MetricCounter`
   - fixed-width number slot
   - duration, easing, suffix
3. `FocusState`
   - dim, active, muted states for cards/images
   - shared tone model: `base / dim / active`
4. `ImageResolve`
   - shared opacity / blur / clip reveal

### Shared timing tokens

Use a small timing scale across the deck:

- `fast`: `220–280ms`
- `base`: `320–420ms`
- `slow`: `520–700ms`
- `step delay`: `120–180ms`

Avoid slide-specific arbitrary timings unless the slide is a lab experiment.

### Shared easing

Default to one easing family:

- `cubic-bezier(0.22, 1, 0.36, 1)`

Do not mix spring-like and GSAP power curves in production slides without need.

## Rollout plan

### Phase 1

Normalize text and numbers.

- extract `StepTextReplace`
- extract `MetricCounter`
- update `OhousePersonaSlide` copy transition to match slide 10

### Phase 2

Normalize emphasis.

- define shared dim/active/muted state tokens
- refactor persona and any card-based slides to use them consistently

### Phase 3

Select one image system for the case study.

Recommended default:

- use `Focus Shift` for explanatory slides
- reserve `Density Build` for one evidence slide only if the job is "there is a lot, but it does not convert"

### Phase 4

Quarantine experiments.

- keep GSAP studies in the lab section
- do not import a lab behavior into the core deck unless it can be expressed through the four primitives above

## Immediate next move

The best next step is not another image experiment.

The best next step is:

1. turn `slide 10` text behavior into a reusable `StepTextReplace`
2. apply it to `case-study-02i`
3. only then decide whether the content-browse slide should use `Focus Shift` or `Density Build`

That preserves deck rhythm before adding more motion.
