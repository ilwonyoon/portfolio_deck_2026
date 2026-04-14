export const INTERACTION_SYSTEM = {
  focus: {
    defaultVariant: 'dim-shift',
    variants: {
      'dim-shift': {
        intent: 'Move attention without rebuilding layout.',
      },
      'focus-rail': {
        intent: 'Advance one dominant card through a stable sequence.',
      },
    },
  },
  image: {
    defaultVariant: 'resolve',
    variants: {
      'density-build': {
        intent: 'Accumulate multiple visuals into one fixed field.',
      },
      'mask-reveal': {
        intent: 'Reveal an image through crop or clipping.',
      },
      resolve: {
        intent: 'Resolve an image in place with restrained motion.',
      },
    },
  },
  number: {
    defaultVariant: 'counter',
    variants: {
      counter: {
        intent: 'Show a metric changing value without moving layout.',
      },
      instant: {
        intent: 'Replace a number without animation when proof is secondary.',
      },
    },
  },
  text: {
    defaultVariant: 'erase-type',
    variants: {
      crossfade: {
        duration: 0.32,
        intent: 'Replace short text blocks with a low-emphasis fade.',
        y: 6,
      },
      'erase-type': {
        blankPauseMs: 180,
        eraseCharMs: 34,
        intent: 'Replace copy in place with editorial sequencing.',
        typeCharMs: 26,
      },
      'fade-up': {
        duration: 0.36,
        intent: 'Bring in new copy with a subtle vertical resolve.',
        y: 8,
      },
      instant: {
        intent: 'Swap text with no animation.',
      },
    },
  },
} as const

export type InteractionSystem = typeof INTERACTION_SYSTEM
export type FocusVariant = keyof InteractionSystem['focus']['variants']
export type ImageVariant = keyof InteractionSystem['image']['variants']
export type NumberVariant = keyof InteractionSystem['number']['variants']
export type TextVariant = keyof InteractionSystem['text']['variants']
