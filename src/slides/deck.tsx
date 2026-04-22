import { SlideShell } from '../components/SlideShell'
import type { SlideDefinition } from '../types/presentation'
import { FigmaExportSlide } from './FigmaExportSlide'
import {
  CareerHoverSlide,
  CareerHoverSlideWithIntro,
  CareerHoverSlideWithSpotlight,
} from './CareerHoverSlide'
import { BeliefStatementSlideV2 } from './BeliefStatementSlideV2'
import { InspirationSlide } from './InspirationSlide'
import { GsapStudySlide } from './GsapStudySlide'
import { OhouseChartSlide } from './OhouseChartSlide'
import { OhouseConfidenceSlide } from './OhouseConfidenceSlide'
import { OhouseConfidenceSlideV2 } from './OhouseConfidenceSlideV2'
import { OhouseContentStatementSlide } from './OhouseContentStatementSlide'
import { OhouseContentStatementSlideV2 } from './OhouseContentStatementSlideV2'
import { OhouseBrowseMotionSlide } from './OhouseBrowseMotionSlide'
import { OhouseContentSlide } from './OhouseContentSlide'
import { OhouseIntroSlide } from './OhouseIntroSlide'
import { OhouseJourneySlide } from './OhouseJourneySlide'
import { OhouseJourneyPartASlide } from './OhouseJourneyPartASlide'
import { OhouseJourneyPartBSlide } from './OhouseJourneyPartBSlide'
import { OhouseMetricsSlide } from './OhouseMetricsSlide'
import { OhouseMetricsEditorialSlide } from './OhouseMetricsEditorialSlide'
import { OhouseNeedleGridSlide } from './OhouseNeedleGridSlide'
import { OhousePersonaSlide } from './OhousePersonaSlide'
import { OhousePersonaSlideV2 } from './OhousePersonaSlideV2'
import { OhouseRoleSlide } from './OhouseRoleSlide'
import { OhouseRoleSlideV2 } from './OhouseRoleSlideV2'
import { OhouseSlide } from './OhouseSlide'
import { ContributionStoryMonoSlide } from './ContributionStoryMonoSlide'
import { ContentGrowthSlide } from './ContentGrowthSlide'
import { CreatorDashboardSlide } from './CreatorDashboardSlide'
import { CreatorOnboardingSlide } from './CreatorOnboardingSlide'
import { CommunityIntroSlide } from './CommunityIntroSlide'
import { CommunityStorySlide } from './CommunityStorySlide'
import { UploadExperienceSlide } from './UploadExperienceSlide'
import { CreatorProgramsGsapSlide } from './CreatorProgramsGsapSlide'
import { CreatorProgramsSlide } from './CreatorProgramsSlide'
import { DiscoverIntroSlide } from './DiscoverIntroSlide'
import { FeedResultsSlide } from './FeedResultsSlide'
import { FeedRestructureSlide } from './FeedRestructureSlide'
import { FeedStructureSlide } from './FeedStructureSlide'
import { PersonalHoverSlide } from './PersonalHoverSlide'
import { PersonalizedFeedIntroSlide } from './PersonalizedFeedIntroSlide'
import { PosterProfileSlide } from './PosterProfileSlide'
import { PatternTemplateSlide } from './PatternTemplateSlide'
import { ProfileStatementSlideV2 } from './ProfileStatementSlideV2'
import { SectionIndexSlide } from './SectionIndexSlide'
import { SectionIndexSlideV2 } from './SectionIndexSlideV2'
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
  'profile-statement-v2': {
    id: 'profile-statement-v2',
    navLabel: 'Statement',
    steps: 1,
    render: () => <ProfileStatementSlideV2 />,
  },
  'section-index-01': {
    id: 'section-index-01',
    navLabel: 'Overview 1',
    steps: 1,
    render: ({ isThumbnail }) => (
      <SectionIndexSlide activeIndex={0} isThumbnail={Boolean(isThumbnail)} />
    ),
  },
  'section-index-01-v2': {
    id: 'section-index-01-v2',
    navLabel: 'Overview 1 v2',
    steps: 1,
    render: ({ isThumbnail }) => (
      <SectionIndexSlideV2 activeIndex={0} isThumbnail={Boolean(isThumbnail)} />
    ),
  },
  'section-index-01-settle': {
    id: 'section-index-01-settle',
    navLabel: 'Overview Settle',
    steps: 1,
    render: ({ isThumbnail }) => (
      <SectionIndexSlide
        activeIndex={0}
        isThumbnail={Boolean(isThumbnail)}
        motionVariant="settle"
      />
    ),
  },
  'section-index-01-marker': {
    id: 'section-index-01-marker',
    navLabel: 'Overview Marker',
    steps: 1,
    render: ({ isThumbnail }) => (
      <SectionIndexSlide
        activeIndex={0}
        isThumbnail={Boolean(isThumbnail)}
        motionVariant="marker-resolve"
      />
    ),
  },
  'section-index-02': {
    id: 'section-index-02',
    navLabel: 'Overview 2',
    steps: 1,
    render: ({ isThumbnail }) => (
      <SectionIndexSlide activeIndex={1} isThumbnail={Boolean(isThumbnail)} />
    ),
  },
  'section-index-02-v2': {
    id: 'section-index-02-v2',
    navLabel: 'Overview 2 v2',
    steps: 1,
    render: ({ isThumbnail }) => (
      <SectionIndexSlideV2 activeIndex={1} isThumbnail={Boolean(isThumbnail)} />
    ),
  },
  'section-index-03': {
    id: 'section-index-03',
    navLabel: 'Overview 3',
    steps: 1,
    render: ({ isThumbnail }) => (
      <SectionIndexSlide activeIndex={2} isThumbnail={Boolean(isThumbnail)} />
    ),
  },
  'section-index-04': {
    id: 'section-index-04',
    navLabel: 'Overview 4',
    steps: 1,
    render: ({ isThumbnail }) => (
      <SectionIndexSlide activeIndex={3} isThumbnail={Boolean(isThumbnail)} />
    ),
  },
  'belief-statement-v2': {
    id: 'belief-statement-v2',
    navLabel: 'Belief',
    steps: 2,
    stepDisplay: 'none',
    render: ({ step }) => <BeliefStatementSlideV2 step={step} />,
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
    render: ({ isThumbnail }) => (
      <PosterProfileSlide isThumbnail={Boolean(isThumbnail)} />
    ),
  },
  'contribution-story-mono': {
    id: 'contribution-story-mono',
    navLabel: 'Contrib',
    steps: 1,
    render: () => <ContributionStoryMonoSlide />,
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
  'case-study-02b': {
    id: 'case-study-02b',
    navLabel: 'Ohouse Intro',
    steps: 1,
    render: () => <OhouseIntroSlide />,
  },
  'case-study-02c': {
    id: 'case-study-02c',
    navLabel: 'Ohouse Content',
    steps: 1,
    render: () => <OhouseContentSlide />,
  },
  'case-study-02d': {
    id: 'case-study-02d',
    navLabel: 'Ohouse Proof',
    steps: 1,
    render: () => <OhouseConfidenceSlide />,
  },
  'case-study-02d-v2': {
    id: 'case-study-02d-v2',
    navLabel: 'Ohouse Proof v2',
    steps: 1,
    render: () => <OhouseConfidenceSlideV2 />,
  },
  'case-study-02e': {
    id: 'case-study-02e',
    navLabel: 'Ohouse Metrics',
    steps: 2,
    render: ({ advanceSlide, advanceStep, autoPlay, step }) => (
      <OhouseMetricsSlide
        advanceSlide={advanceSlide}
        advanceStep={advanceStep}
        autoPlay={autoPlay}
        step={step}
      />
    ),
  },
  'case-study-02e-alt': {
    id: 'case-study-02e-alt',
    navLabel: 'Ohouse Metrics 2',
    steps: 2,
    stepDisplay: 'none',
    render: ({ advanceSlide, advanceStep, autoPlay, isThumbnail, step }) => (
      <OhouseMetricsEditorialSlide
        advanceSlide={advanceSlide}
        advanceStep={advanceStep}
        autoPlay={autoPlay}
        isThumbnail={Boolean(isThumbnail)}
        step={step}
      />
    ),
  },
  'case-study-02f': {
    id: 'case-study-02f',
    navLabel: 'Ohouse Journey',
    steps: 1,
    render: () => <OhouseJourneySlide />,
  },
  'case-study-02f-part-a': {
    id: 'case-study-02f-part-a',
    navLabel: 'Journey A',
    steps: 1,
    render: () => <OhouseJourneyPartASlide />,
  },
  'case-study-02f-part-b': {
    id: 'case-study-02f-part-b',
    navLabel: 'Journey B',
    steps: 1,
    render: () => <OhouseJourneyPartBSlide />,
  },
  'case-study-02g': {
    id: 'case-study-02g',
    navLabel: 'Content 2.0',
    steps: 1,
    render: () => <OhouseContentStatementSlide />,
  },
  'case-study-02g-v2': {
    id: 'case-study-02g-v2',
    navLabel: 'Content 2.0 v2',
    steps: 1,
    render: () => <OhouseContentStatementSlideV2 />,
  },
  'case-study-02g1': {
    id: 'case-study-02g1',
    navLabel: 'Browse 01',
    steps: 1,
    render: () => <OhouseBrowseMotionSlide mode="trail" />,
  },
  'case-study-02g2': {
    id: 'case-study-02g2',
    navLabel: 'Browse 02',
    steps: 1,
    render: () => <OhouseBrowseMotionSlide mode="stack" />,
  },
  'case-study-02g3': {
    id: 'case-study-02g3',
    navLabel: 'Browse 03',
    steps: 1,
    render: () => <OhouseBrowseMotionSlide mode="field" />,
  },
  'case-study-02h': {
    id: 'case-study-02h',
    navLabel: 'My Role',
    steps: 1,
    render: () => <OhouseRoleSlide />,
  },
  'case-study-02h-v2': {
    id: 'case-study-02h-v2',
    navLabel: 'My Role v2',
    steps: 1,
    render: () => <OhouseRoleSlideV2 />,
  },
  'case-study-02i': {
    id: 'case-study-02i',
    navLabel: 'Personas',
    steps: 3,
    stepDisplay: 'none',
    render: ({ step }) => <OhousePersonaSlide step={step} />,
  },
  'case-study-02i-v2': {
    id: 'case-study-02i-v2',
    navLabel: 'Personas v2',
    steps: 3,
    stepDisplay: 'none',
    render: ({ step }) => <OhousePersonaSlideV2 step={step} />,
  },
  'case-study-02j': {
    id: 'case-study-02j',
    navLabel: 'Needle Grid',
    steps: 1,
    render: () => <OhouseNeedleGridSlide />,
  },
  'case-study-02j2': {
    id: 'case-study-02j2',
    navLabel: 'Needle Grid 1.5x',
    steps: 1,
    render: () => <OhouseNeedleGridSlide density="dense" />,
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
    navLabel: 'Personalized Feed',
    steps: 1,
    render: () => <PersonalizedFeedIntroSlide />,
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
  'personalized-feed-intro': {
    id: 'personalized-feed-intro',
    navLabel: 'Personalized Feed',
    steps: 1,
    render: () => <PersonalizedFeedIntroSlide />,
  },
  'feed-structure': {
    id: 'feed-structure',
    navLabel: 'Feed Structure',
    steps: 3,
    stepDisplay: 'none',
    render: ({ step }) => <FeedStructureSlide step={step} />,
  },
  'feed-restructure': {
    id: 'feed-restructure',
    navLabel: 'Feed Restructure',
    steps: 2,
    stepDisplay: 'none',
    render: ({ step }) => <FeedRestructureSlide step={step} />,
  },
  'discover-intro': {
    id: 'discover-intro',
    navLabel: 'Discover',
    steps: 1,
    render: () => <DiscoverIntroSlide />,
  },
  'feed-results': {
    id: 'feed-results',
    navLabel: 'Feed Results',
    steps: 1,
    render: () => <FeedResultsSlide />,
  },
  'content-growth': {
    id: 'content-growth',
    navLabel: 'Content Growth',
    steps: 1,
    render: () => <ContentGrowthSlide />,
  },
  'creator-onboarding': {
    id: 'creator-onboarding',
    navLabel: 'Creator Onboarding',
    steps: 1,
    render: () => <CreatorOnboardingSlide />,
  },
  'creator-dashboard': {
    id: 'creator-dashboard',
    navLabel: 'Creator Dashboard',
    steps: 1,
    render: () => <CreatorDashboardSlide />,
  },
  'creator-programs': {
    id: 'creator-programs',
    navLabel: 'Creator Programs',
    steps: 1,
    render: ({ autoPlay, isThumbnail }) => (
      <CreatorProgramsSlide
        autoPlay={Boolean(autoPlay)}
        isThumbnail={Boolean(isThumbnail)}
      />
    ),
  },
  'creator-programs-gsap': {
    id: 'creator-programs-gsap',
    navLabel: 'Creator Programs GSAP',
    steps: 1,
    render: () => <CreatorProgramsGsapSlide />,
  },
  'community-intro': {
    id: 'community-intro',
    navLabel: 'Community',
    steps: 1,
    render: () => <CommunityIntroSlide />,
  },
  'community-story': {
    id: 'community-story',
    navLabel: 'Community Story',
    steps: 1,
    render: () => <CommunityStorySlide />,
  },
  'upload-experience': {
    id: 'upload-experience',
    navLabel: 'Upload Experience',
    steps: 1,
    render: () => <UploadExperienceSlide />,
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
