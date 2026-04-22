import type { SlideDefinition } from '../types/presentation'
import { DesignSystemSlide } from './DesignSystemSlide'
import { GsapStudySlide } from './GsapStudySlide'
import { PatternTemplateSlide } from './PatternTemplateSlide'

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
  {
    id: 'pattern-poster',
    navLabel: 'Pattern 01',
    steps: 1,
    render: () => <PatternTemplateSlide mode="poster" />,
  },
  {
    id: 'pattern-offset',
    navLabel: 'Pattern 02',
    steps: 1,
    render: () => <PatternTemplateSlide mode="offset" />,
  },
  {
    id: 'pattern-ledger',
    navLabel: 'Pattern 03',
    steps: 1,
    render: () => <PatternTemplateSlide mode="ledger" />,
  },
  {
    id: 'pattern-stage',
    navLabel: 'Pattern 04',
    steps: 1,
    render: () => <PatternTemplateSlide mode="stage" />,
  },
  {
    id: 'pattern-essay',
    navLabel: 'Pattern 05',
    steps: 1,
    render: () => <PatternTemplateSlide mode="essay" />,
  },
  {
    id: 'pattern-rail',
    navLabel: 'Pattern 06',
    steps: 1,
    render: () => <PatternTemplateSlide mode="evidence-rail" />,
  },
  {
    id: 'pattern-compare',
    navLabel: 'Pattern 07',
    steps: 1,
    render: () => <PatternTemplateSlide mode="before-after" />,
  },
  {
    id: 'pattern-metric',
    navLabel: 'Pattern 08',
    steps: 1,
    render: () => <PatternTemplateSlide mode="metric" />,
  },
  {
    id: 'pattern-screen-1',
    navLabel: 'Pattern 09',
    steps: 1,
    render: () => <PatternTemplateSlide mode="screen-1up" />,
  },
  {
    id: 'pattern-screen-2',
    navLabel: 'Pattern 10',
    steps: 1,
    render: () => <PatternTemplateSlide mode="screen-2up" />,
  },
  {
    id: 'pattern-screen-3',
    navLabel: 'Pattern 11',
    steps: 1,
    render: () => <PatternTemplateSlide mode="screen-3up" />,
  },
  {
    id: 'pattern-screen-4',
    navLabel: 'Pattern 12',
    steps: 1,
    render: () => <PatternTemplateSlide mode="screen-4up" />,
  },
  {
    id: 'gsap-split',
    navLabel: 'GSAP Split',
    steps: 1,
    render: () => <GsapStudySlide mode="split-headline" />,
  },
  {
    id: 'gsap-morph',
    navLabel: 'GSAP Morph',
    steps: 1,
    render: () => <GsapStudySlide mode="scramble-phrase" />,
  },
  {
    id: 'gsap-lockup',
    navLabel: 'GSAP Lockup',
    steps: 1,
    render: () => <GsapStudySlide mode="brand-lockup" />,
  },
  {
    id: 'gsap-chart',
    navLabel: 'GSAP Chart',
    steps: 1,
    render: () => <GsapStudySlide mode="chart-story" />,
  },
  {
    id: 'gsap-rail',
    navLabel: 'GSAP Rail',
    steps: 1,
    render: () => <GsapStudySlide mode="flip-rail" />,
  },
  {
    id: 'gsap-mosaic',
    navLabel: 'GSAP Mosaic',
    steps: 1,
    render: () => <GsapStudySlide mode="mosaic-resolve" />,
  },
]
