import type { SlideDefinition } from '../types/presentation'
import { DesignSystemSlide } from './DesignSystemSlide'

export const designSystemSlides: SlideDefinition[] = [
  {
    id: 'system-type-scale',
    navLabel: 'Type',
    steps: 1,
    render: () => <DesignSystemSlide mode="type-scale" />,
  },
  {
    id: 'system-pairings',
    navLabel: 'Pairings',
    steps: 1,
    render: () => <DesignSystemSlide mode="pairings" />,
  },
  {
    id: 'system-layout',
    navLabel: 'Layout',
    steps: 1,
    render: () => <DesignSystemSlide mode="layout" />,
  },
]
