import { SlideShell } from '../components/SlideShell'
import type { SlideDefinition } from '../types/presentation'
import { FigmaExportSlide } from './FigmaExportSlide'
import {
  CareerHoverSlide,
  CareerHoverSlideWithIntro,
  CareerHoverSlideWithSpotlight,
} from './CareerHoverSlide'
import { BeliefStatementSlide } from './BeliefStatementSlide'
import { InspirationSlide } from './InspirationSlide'
import { GsapStudySlide } from './GsapStudySlide'
import { OhouseChartSlide } from './OhouseChartSlide'
import { OhouseSlide } from './OhouseSlide'
import { ContributionStorySlide } from './ContributionStorySlide'
import { PersonalHoverSlide } from './PersonalHoverSlide'
import { PosterProfileSlide } from './PosterProfileSlide'
import { PatternTemplateSlide } from './PatternTemplateSlide'
import { ProfileStatementSlide } from './ProfileStatementSlide'
import { SectionIndexSlide } from './SectionIndexSlide'
import { WinningStatementSlide } from './WinningStatementSlide'
import { TileEntranceStudySlide } from './TileEntranceStudySlide'
import { deckManifest } from './deckManifest'

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

export const slideRegistry: Record<string, SlideDefinition> = {
  intro: {
    id: 'intro',
    navLabel: 'Intro',
    steps: 1,
    render: (context) => {
      void context
      return renderIntroHeroSlide()
    },
  },
  'profile-statement': {
    id: 'profile-statement',
    navLabel: 'Statement',
    steps: 1,
    render: () => <ProfileStatementSlide />,
  },
  'section-index-01': {
    id: 'section-index-01',
    navLabel: 'Overview 1',
    steps: 1,
    render: () => <SectionIndexSlide activeIndex={0} />,
  },
  'section-index-02': {
    id: 'section-index-02',
    navLabel: 'Overview 2',
    steps: 1,
    render: () => <SectionIndexSlide activeIndex={1} />,
  },
  'section-index-03': {
    id: 'section-index-03',
    navLabel: 'Overview 3',
    steps: 1,
    render: () => <SectionIndexSlide activeIndex={2} />,
  },
  'section-index-04': {
    id: 'section-index-04',
    navLabel: 'Overview 4',
    steps: 1,
    render: () => <SectionIndexSlide activeIndex={3} />,
  },
  'belief-statement': {
    id: 'belief-statement',
    navLabel: 'Belief',
    steps: 1,
    render: () => <BeliefStatementSlide />,
  },
  'winning-statement': {
    id: 'winning-statement',
    navLabel: 'Winning',
    steps: 1,
    render: () => <WinningStatementSlide />,
  },
  'poster-profile': {
    id: 'poster-profile',
    navLabel: 'Profile',
    steps: 1,
    render: () => <PosterProfileSlide />,
  },
  'contribution-story': {
    id: 'contribution-story',
    navLabel: 'Contrib',
    steps: 1,
    render: () => <ContributionStorySlide />,
  },
  'case-study-01': {
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
  'case-study-02': {
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
  'case-study-03': {
    id: 'case-study-03',
    navLabel: 'Chart',
    steps: 1,
    render: () => <OhouseChartSlide />,
  },
  'case-study-04': {
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
  'case-study-05': {
    id: 'case-study-05',
    navLabel: 'Career',
    steps: 1,
    render: () => <CareerHoverSlide />,
  },
  'case-study-06b': {
    id: 'case-study-06b',
    navLabel: 'Career Text',
    steps: 1,
    render: () => <CareerHoverSlideWithIntro />,
  },
  'case-study-06c': {
    id: 'case-study-06c',
    navLabel: 'Career Glow',
    steps: 1,
    render: () => <CareerHoverSlideWithSpotlight />,
  },
  'case-study-07': {
    id: 'case-study-07',
    navLabel: 'Personal',
    steps: 1,
    render: () => <PersonalHoverSlide />,
  },
  'motion-sweep': {
    id: 'motion-sweep',
    navLabel: 'Sweep',
    steps: 1,
    render: () => <TileEntranceStudySlide mode="sweep-cascade" />,
  },
  'motion-cluster': {
    id: 'motion-cluster',
    navLabel: 'Cluster',
    steps: 1,
    render: () => <TileEntranceStudySlide mode="center-out-cluster" />,
  },
  'motion-ghost': {
    id: 'motion-ghost',
    navLabel: 'Ghost',
    steps: 1,
    render: () => <TileEntranceStudySlide mode="ghost-blocks" />,
  },
  'gsap-split': {
    id: 'gsap-split',
    navLabel: 'GSAP Split',
    steps: 1,
    render: () => <GsapStudySlide mode="split-headline" />,
  },
  'gsap-morph': {
    id: 'gsap-morph',
    navLabel: 'GSAP Morph',
    steps: 1,
    render: () => <GsapStudySlide mode="scramble-phrase" />,
  },
  'gsap-lockup': {
    id: 'gsap-lockup',
    navLabel: 'GSAP Lockup',
    steps: 1,
    render: () => <GsapStudySlide mode="brand-lockup" />,
  },
  'gsap-chart': {
    id: 'gsap-chart',
    navLabel: 'GSAP Chart',
    steps: 1,
    render: () => <GsapStudySlide mode="chart-story" />,
  },
  'gsap-rail': {
    id: 'gsap-rail',
    navLabel: 'GSAP Rail',
    steps: 1,
    render: () => <GsapStudySlide mode="flip-rail" />,
  },
  'gsap-mosaic': {
    id: 'gsap-mosaic',
    navLabel: 'GSAP Mosaic',
    steps: 1,
    render: () => <GsapStudySlide mode="mosaic-resolve" />,
  },
  'pattern-poster': {
    id: 'pattern-poster',
    navLabel: 'Pattern 01',
    steps: 1,
    render: () => <PatternTemplateSlide mode="poster" />,
  },
  'pattern-offset': {
    id: 'pattern-offset',
    navLabel: 'Pattern 02',
    steps: 1,
    render: () => <PatternTemplateSlide mode="offset" />,
  },
  'pattern-ledger': {
    id: 'pattern-ledger',
    navLabel: 'Pattern 03',
    steps: 1,
    render: () => <PatternTemplateSlide mode="ledger" />,
  },
  'pattern-stage': {
    id: 'pattern-stage',
    navLabel: 'Pattern 04',
    steps: 1,
    render: () => <PatternTemplateSlide mode="stage" />,
  },
  'pattern-essay': {
    id: 'pattern-essay',
    navLabel: 'Pattern 05',
    steps: 1,
    render: () => <PatternTemplateSlide mode="essay" />,
  },
  'pattern-rail': {
    id: 'pattern-rail',
    navLabel: 'Pattern 06',
    steps: 1,
    render: () => <PatternTemplateSlide mode="evidence-rail" />,
  },
  'pattern-compare': {
    id: 'pattern-compare',
    navLabel: 'Pattern 07',
    steps: 1,
    render: () => <PatternTemplateSlide mode="before-after" />,
  },
  'pattern-metric': {
    id: 'pattern-metric',
    navLabel: 'Pattern 08',
    steps: 1,
    render: () => <PatternTemplateSlide mode="metric" />,
  },
  'pattern-screen-1': {
    id: 'pattern-screen-1',
    navLabel: 'Pattern 09',
    steps: 1,
    render: () => <PatternTemplateSlide mode="screen-1up" />,
  },
  'pattern-screen-2': {
    id: 'pattern-screen-2',
    navLabel: 'Pattern 10',
    steps: 1,
    render: () => <PatternTemplateSlide mode="screen-2up" />,
  },
  'pattern-screen-3': {
    id: 'pattern-screen-3',
    navLabel: 'Pattern 11',
    steps: 1,
    render: () => <PatternTemplateSlide mode="screen-3up" />,
  },
  'pattern-screen-4': {
    id: 'pattern-screen-4',
    navLabel: 'Pattern 12',
    steps: 1,
    render: () => <PatternTemplateSlide mode="screen-4up" />,
  },
  'work-like-ai-native': {
    id: 'work-like-ai-native',
    navLabel: 'AI Native',
    steps: 1,
    render: ({ slideIndex, totalSlides }) => {
      return renderEmptySlide('Work Like AI Native', slideIndex, totalSlides)
    },
  },
}

export function buildDeckSlides(slideIds: readonly string[]): SlideDefinition[] {
  return slideIds.flatMap((slideId) => {
    const slide = slideRegistry[slideId]
    return slide ? [slide] : []
  })
}

export const deckSlides = buildDeckSlides(deckManifest)
