# Ohouse Content 2.0 Grid Motion Shortlist

## Slide Job

Make the viewer feel this user truth:

`I kept browsing beautiful homes, but none of them turned into a small action I could actually take.`

Not a content shortage.
An actionability failure.

## Best-Fit Motion Families

### 1. Single -> Many -> Replace

One image enters first.
It branches into many.
The field resets and another image takes over.

Why it fits:
It feels like repeated browsing behavior, not a gallery reveal.
This is the strongest match for `kept looking, still no move`.

Use for:
- one centered tile spawning related homes
- each spawn slightly offset like a memory trail
- old tiles fading but never fully resolving into a plan

References:
- Tiny Grid Layout Animation
  https://tympanus.net/codrops/2022/07/13/tiny-grid-layout-animation/
- Ideas for Image Motion Trail Animations
  https://tympanus.net/codrops/2023/10/18/ideas-for-image-motion-trail-animations/
- Sketch 010: Image Motion Trail (Perspective)
  https://tympanus.net/codrops/sketches/sketch-010-image-motion-trail-perspective/

### 2. Scroll-To-Find / Endless Browsing Wall

The user scrolls and more content keeps appearing.
Density increases, but clarity does not.

Why it fits:
This communicates the browsing loop well, but it says `too much` more than `not actionable`.
Best as an opener, not the final argument.

Use for:
- columns or staggered rows drifting at different speeds
- scroll-triggered reveals that never land on a clear next step
- subtle repetition to imply endless feed behavior

References:
- Scroll Animation Ideas for Image Grids
  https://tympanus.net/codrops/2022/05/31/scroll-animation-ideas-for-image-grids/
- On-Scroll Column & Row Animations
  https://tympanus.net/codrops/2023/08/15/on-scroll-column-row-animations/
- Connected Grid Layout Animation
  https://tympanus.net/Development/ConnectedGrid/

### 3. Grid -> Focus -> Too Big

An image gets selected and expands.
The focus state feels heavier, more expensive, more complete than the viewer wanted.
Then it collapses back into the field.

Why it fits:
This is the clearest way to show the mismatch between user intent and content scale.
Strongest option if we want to communicate `aspirational, but not followable`.

Use for:
- one tile expanding into a nearly full-bleed room
- brief metadata or visual cues implying full-home scope
- immediate retreat back to the grid, as if the user gives up

References:
- Animating Responsive Grid Layout Transitions with GSAP Flip
  https://tympanus.net/codrops/2026/01/20/animating-responsive-grid-layout-transitions-with-gsap-flip/
- Animated Product Grid Preview with GSAP & Clip-Path
  https://tympanus.net/codrops/2025/05/27/animated-product-grid-preview-with-gsap-clip-path/
- Effect Ideas for Image Grids
  https://tympanus.net/codrops/2015/10/15/effect-ideas-for-image-grids/

### 4. Hover / Cursor Search Behavior

The grid reacts to motion.
The viewer feels like they are scanning for something, but never locking onto it.

Why it fits:
Good for making the audience physically enact search behavior.
Weak if the whole story depends on hover alone.

Use for:
- cursor-following highlight window
- nearby tiles brighten while others recede
- no stable resolution, only temporary attention

References:
- Grid Layout with Motion Hover Effect and Content Preview
  https://tympanus.net/codrops/2018/05/23/grid-layout-with-motion-hover/
- How to Create a Motion Hover Effect for a Background Image Grid
  https://tympanus.net/codrops/2020/06/10/how-to-create-a-motion-hover-effect-for-a-background-image-grid/
- Stack Motion Hover Effects
  https://tympanus.net/Development/StackMotionHoverEffects/

## GSAP Primitives To Use

- Flip: for state-to-state transitions between one image, grid, and focus states
  https://gsap.com/docs/v3/Plugins/Flip/
- ScrollTrigger: for browse-like reveal pacing and scroll-linked image density
  https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Observer: if we want wheel/drag/touch to feel like deliberate browsing inside the slide
  https://gsap.com/docs/v3/Plugins/Observer/

## Recommendation

Start with one of these, not all three:

1. `Single -> Many -> Replace`
2. `Grid -> Focus -> Too Big`
3. `Scroll-To-Find / Endless Browsing Wall`

Best narrative order if this becomes one autoplay slide:

1. one beautiful room appears
2. it branches into many more
3. one tile gets chosen
4. it expands into a full-home commitment
5. it collapses
6. the browsing resumes

That sequence says:

`users did not stop because content was weak`

`they stopped because every answer was too big to act on`

## Local Asset Note

Available source set:

- `/Users/ilwonyoon/Downloads/ohouse_photos`
- 64 `.avif` files

These are enough for:

- 1 dense looping wall
- 1 branch/spawn sequence
- 1 focus/expand prototype
