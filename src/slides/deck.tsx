import { SlideShell } from '../components/SlideShell'
import type { SlideDefinition } from '../types/presentation'
import { FigmaExportSlide } from './FigmaExportSlide'
import {
  CareerHoverSlide,
  CareerHoverSlideWithIntro,
  CareerHoverSlideWithSpotlight,
} from './CareerHoverSlide'
import { InspirationSlide } from './InspirationSlide'
import { GsapStudySlide } from './GsapStudySlide'
import { OhouseChartSlide } from './OhouseChartSlide'
import { OhouseSlide } from './OhouseSlide'
import { PersonalHoverSlide } from './PersonalHoverSlide'
import { PatternTemplateSlide } from './PatternTemplateSlide'
import { TileEntranceStudySlide } from './TileEntranceStudySlide'

function renderIntroHeroSlide() {
  return (
    <article className="intro-hero-slide">
      <header className="intro-hero-slide__header">
        <span className="intro-hero-slide__label">Portfolio</span>
        <span className="intro-hero-slide__label">Ilwon Yoon</span>
      </header>

      <span className="intro-hero-slide__marker intro-hero-slide__marker--left" />
      <span className="intro-hero-slide__marker intro-hero-slide__marker--left-center" />
      <span className="intro-hero-slide__marker intro-hero-slide__marker--right-center" />
      <span className="intro-hero-slide__marker intro-hero-slide__marker--right" />

      <div className="intro-hero-slide__headline-wrap">
        <h1 className="intro-hero-slide__headline">Hi,</h1>
      </div>

      <footer className="intro-hero-slide__footer">
        <span>2026</span>
        <span>CONFIDENTIAL | DO NOT SHARE</span>
      </footer>
    </article>
  )
}

function renderEmptySlide(
  sectionLabel: string,
  slideIndex: number,
  totalSlides: number,
) {
  return (
    <SlideShell
      sectionLabel={sectionLabel}
      slideIndex={slideIndex}
      totalSlides={totalSlides}
    />
  )
}

export const deckSlides: SlideDefinition[] = [
  {
    id: 'intro',
    navLabel: 'Intro',
    steps: 1,
    render: (context) => {
      void context
      return renderIntroHeroSlide()
    },
  },
  {
    id: 'case-study-01',
    navLabel: 'Case 01',
    steps: 5,
    stepDisplay: 'none',
    render: ({ advanceSlide, advanceStep, autoPlay, step }) => (
      <InspirationSlide
        advanceSlide={advanceSlide}
        advanceStep={advanceStep}
        autoPlay={autoPlay}
        step={step}
      />
    ),
  },
  {
    id: 'case-study-02',
    navLabel: 'Ohouse',
    steps: 2,
    stepDisplay: 'none',
    render: ({ advanceSlide, advanceStep, autoPlay, step }) => (
      <OhouseSlide
        advanceSlide={advanceSlide}
        advanceStep={advanceStep}
        autoPlay={autoPlay}
        step={step}
      />
    ),
  },
  {
    id: 'case-study-03',
    navLabel: 'Chart',
    steps: 1,
    render: () => <OhouseChartSlide />,
  },
  {
    id: 'case-study-04',
    navLabel: 'CLP Topic',
    steps: 1,
    render: () => (
      <FigmaExportSlide
        alt="Figma export of the CLP Topic frame"
        src="/media/clp-topic-root-3x.png"
      />
    ),
  },
  {
    id: 'case-study-05',
    navLabel: 'Career',
    steps: 1,
    render: () => <CareerHoverSlide />,
  },
  {
    id: 'case-study-06b',
    navLabel: 'Career Text',
    steps: 1,
    render: () => <CareerHoverSlideWithIntro />,
  },
  {
    id: 'case-study-06c',
    navLabel: 'Career Glow',
    steps: 1,
    render: () => <CareerHoverSlideWithSpotlight />,
  },
  {
    id: 'case-study-07',
    navLabel: 'Personal',
    steps: 1,
    render: () => <PersonalHoverSlide />,
  },
  {
    id: 'motion-sweep',
    navLabel: 'Sweep',
    steps: 1,
    render: () => <TileEntranceStudySlide mode="sweep-cascade" />,
  },
  {
    id: 'motion-cluster',
    navLabel: 'Cluster',
    steps: 1,
    render: () => <TileEntranceStudySlide mode="center-out-cluster" />,
  },
  {
    id: 'motion-ghost',
    navLabel: 'Ghost',
    steps: 1,
    render: () => <TileEntranceStudySlide mode="ghost-blocks" />,
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
    id: 'work-like-ai-native',
    navLabel: 'AI Native',
    steps: 1,
    render: ({ slideIndex, totalSlides }) => {
      return renderEmptySlide('Work Like AI Native', slideIndex, totalSlides)
    },
  },
]
