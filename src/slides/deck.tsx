import { SlideShell } from '../components/SlideShell'
import type { SlideDefinition } from '../types/presentation'
import { AidoDemoSlide } from './AidoDemoSlide'
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
import { OhouseContentEcosystemBridgeProposalSlide } from './OhouseContentEcosystemBridgeProposalSlide'
import { OhouseContentEcosystemStatementSlide } from './OhouseContentEcosystemStatementSlide'
import { OhouseContentStatementBlocksSlide } from './OhouseContentStatementBlocksSlide'
import { OhouseContentStatementSlide } from './OhouseContentStatementSlide'
import { OhouseContentStatementSlideV2 } from './OhouseContentStatementSlideV2'
import { OhouseBrowseMotionSlide } from './OhouseBrowseMotionSlide'
import { OhouseAiVisionSlide } from './OhouseAiVisionSlide'
import { OhouseAiTransitionSlide } from './OhouseAiTransitionSlide'
import { OhouseAiRoleShiftSlide } from './OhouseAiRoleShiftSlide'
import { OhouseCs01ClosingSlide } from './OhouseCs01ClosingSlide'
import { OhouseContentSlide } from './OhouseContentSlide'
import { OhouseIntroSlide } from './OhouseIntroSlide'
import { OhouseJourneyFocusSlide } from './OhouseJourneyFocusSlide'
import { OhouseJourneySlide } from './OhouseJourneySlide'
import { OhouseJourneyPartASlide } from './OhouseJourneyPartASlide'
import { OhouseJourneyPartBSlide } from './OhouseJourneyPartBSlide'
import { OhouseMetricsSlide } from './OhouseMetricsSlide'
import { OhouseMetricsEditorialSlide } from './OhouseMetricsEditorialSlide'
import { OhouseNeedleGridSlide } from './OhouseNeedleGridSlide'
import { OhousePersonaSlide } from './OhousePersonaSlide'
import { OhousePersonaTransitionProposalSlide } from './OhousePersonaTransitionProposalSlide'
import { OhousePersonaSlideV2 } from './OhousePersonaSlideV2'
import { OhouseRoleBridgeProposalSlide } from './OhouseRoleBridgeProposalSlide'
import { OhouseRoleSlide } from './OhouseRoleSlide'
import { OhouseRoleSlideV2 } from './OhouseRoleSlideV2'
import { OhouseSlide } from './OhouseSlide'
import { ContributionStoryMonoSlide } from './ContributionStoryMonoSlide'
import { CommunityCombinedSlide } from './CommunityCombinedSlide'
import { CreatorEconomyResultsSlide } from './CreatorEconomyResultsSlide'
import { CreatorEconomyCombinedSlide } from './CreatorEconomyCombinedSlide'
import { ContentGrowthSlide } from './ContentGrowthSlide'
import { CreatorDashboardSlide } from './CreatorDashboardSlide'
import { CreatorOnboardingSlide } from './CreatorOnboardingSlide'
import { CommunityBridgeSlide } from './CommunityBridgeSlide'
import { CommunityIntroSlide } from './CommunityIntroSlide'
import { CommunityResultsSlide } from './CommunityResultsSlide'
import { CommunityStorySlide } from './CommunityStorySlide'
import { CommunityStory2Slide } from './CommunityStory2Slide'
import { CommunityStory3Slide } from './CommunityStory3Slide'
import { CommerceBuyerExperienceSlide } from './CommerceBuyerExperienceSlide'
import { CommerceSellerToolsSlide } from './CommerceSellerToolsSlide'
import { UploadExperienceSlide } from './UploadExperienceSlide'
import { CreatorProgramsGsapSlide } from './CreatorProgramsGsapSlide'
import { CreatorProgramsSlide } from './CreatorProgramsSlide'
import { DiscoverIntroSlide } from './DiscoverIntroSlide'
import { FeedResultsSlide } from './FeedResultsSlide'
import { FeedResultsStatementSlide } from './FeedResultsStatementSlide'
import { FeedRestructureSlide } from './FeedRestructureSlide'
import { FeedStructureSlide } from './FeedStructureSlide'
import { InstagramCommerceSlide } from './InstagramCommerceSlide'
import { InstagramCommerceSlideV2 } from './InstagramCommerceSlideV2'
import { InstagramSharedCollectionSlide } from './InstagramSharedCollectionSlide'
import { InstagramStoriesAddYoursSlide } from './InstagramStoriesAddYoursSlide'
import { InteriorWorkflowSlide } from './InteriorWorkflowSlide'
import { MessengerSelfieStickerSlide } from './MessengerSelfieStickerSlide'
import { MixOrMismatchSlide } from './MixOrMismatchSlide'
import { PersonalHoverSlide } from './PersonalHoverSlide'
import { PersonalizedDiscoveryCombinedSlide } from './PersonalizedDiscoveryCombinedSlide'
import { PersonalizedFeedIntroSlide } from './PersonalizedFeedIntroSlide'
import { PosterProfileSlide } from './PosterProfileSlide'
import { PromptCueDemoSlide } from './PromptCueDemoSlide'
import { PatternTemplateSlide } from './PatternTemplateSlide'
import { ProfileStatementSlideV2 } from './ProfileStatementSlideV2'
import { ProjectIntroSlide } from './ProjectIntroSlide'
import { RoomPlannerProofSlide } from './RoomPlannerProofSlide'
import { SaveBackDemoSlide } from './SaveBackDemoSlide'
import { SectionIndexSlide } from './SectionIndexSlide'
import { SectionIndexSlideV2 } from './SectionIndexSlideV2'
import { SideProjectsIntroSlide } from './SideProjectsIntroSlide'
import { SpaceAiResultsSlide } from './SpaceAiResultsSlide'
import { SpaceAiRoleSlide } from './SpaceAiRoleSlide'
import { TbdSideTitleSlide } from './TbdSideTitleSlide'
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
  'instagram-commerce-v2': {
    id: 'instagram-commerce-v2',
    navLabel: 'Instagram Commerce v2',
    steps: 1,
    render: () => <InstagramCommerceSlideV2 />,
  },
  'instagram-commerce': {
    id: 'instagram-commerce',
    navLabel: 'Instagram Commerce',
    steps: 1,
    render: () => <InstagramCommerceSlide />,
  },
  'commerce-buyer-experience': {
    id: 'commerce-buyer-experience',
    navLabel: 'Buyer Experience',
    steps: 1,
    render: () => <CommerceBuyerExperienceSlide />,
  },
  'commerce-seller-tools': {
    id: 'commerce-seller-tools',
    navLabel: 'Seller Tools',
    steps: 1,
    render: () => <CommerceSellerToolsSlide />,
  },
  'instagram-stories-add-yours': {
    id: 'instagram-stories-add-yours',
    navLabel: 'Add Yours',
    steps: 1,
    render: () => <InstagramStoriesAddYoursSlide />,
  },
  'instagram-shared-collection': {
    id: 'instagram-shared-collection',
    navLabel: 'Shared Collection',
    steps: 1,
    render: () => <InstagramSharedCollectionSlide />,
  },
  'messenger-selfie-sticker': {
    id: 'messenger-selfie-sticker',
    navLabel: 'Selfie Sticker',
    steps: 1,
    render: () => <MessengerSelfieStickerSlide />,
  },
  'side-projects-intro': {
    id: 'side-projects-intro',
    navLabel: 'Side Projects',
    steps: 2,
    render: ({ step }) => <SideProjectsIntroSlide step={step} />,
  },
  'side-projects-intro-copy': {
    id: 'side-projects-intro-copy',
    navLabel: 'AIDO',
    steps: 1,
    render: () => <AidoDemoSlide />,
  },
  'saveback-demo': {
    id: 'saveback-demo',
    navLabel: 'SaveBack',
    steps: 1,
    render: () => <SaveBackDemoSlide />,
  },
  'promptcue-demo': {
    id: 'promptcue-demo',
    navLabel: 'PromptCue Demo',
    steps: 1,
    render: () => <PromptCueDemoSlide />,
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
  'ohouse-cs01-close': {
    id: 'ohouse-cs01-close',
    navLabel: 'CS01 Close',
    steps: 1,
    render: () => <OhouseCs01ClosingSlide />,
  },
  'ohouse-ai-transition': {
    id: 'ohouse-ai-transition',
    navLabel: 'AI Transition',
    steps: 1,
    render: () => <OhouseAiTransitionSlide />,
  },
  'ohouse-ai-role-shift': {
    id: 'ohouse-ai-role-shift',
    navLabel: 'AI Role Shift',
    steps: 1,
    render: () => <OhouseAiRoleShiftSlide />,
  },
  'ohouse-ai-vision': {
    id: 'ohouse-ai-vision',
    navLabel: 'AI Vision',
    steps: 1,
    render: () => <OhouseAiVisionSlide />,
  },
  'space-ai-role': {
    id: 'space-ai-role',
    navLabel: 'Space AI Role',
    steps: 1,
    render: () => <SpaceAiRoleSlide />,
  },
  'space-ai-results': {
    id: 'space-ai-results',
    navLabel: 'Space AI Results',
    steps: 1,
    render: () => <SpaceAiResultsSlide />,
  },
  'tbd-side-title-1': {
    id: 'tbd-side-title-1',
    navLabel: 'TBD 1',
    steps: 1,
    render: () => <TbdSideTitleSlide />,
  },
  'tbd-side-title-2': {
    id: 'tbd-side-title-2',
    navLabel: 'TBD 2',
    steps: 1,
    render: () => <TbdSideTitleSlide />,
  },
  'tbd-side-title-3': {
    id: 'tbd-side-title-3',
    navLabel: 'TBD 3',
    steps: 1,
    render: () => <TbdSideTitleSlide />,
  },
  'tbd-side-title-4': {
    id: 'tbd-side-title-4',
    navLabel: 'TBD 4',
    steps: 1,
    render: () => <TbdSideTitleSlide />,
  },
  'mix-or-mismatch': {
    id: 'mix-or-mismatch',
    navLabel: 'Mix or Mismatch',
    steps: 1,
    render: () => <MixOrMismatchSlide />,
  },
  'interior-workflow': {
    id: 'interior-workflow',
    navLabel: 'Interior Workflow',
    steps: 1,
    render: () => <InteriorWorkflowSlide />,
  },
  'room-planner-proof': {
    id: 'room-planner-proof',
    navLabel: 'Room Planner Proof',
    steps: 1,
    render: () => <RoomPlannerProofSlide />,
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
    navLabel: 'Past Works',
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
    steps: 2,
    render: ({ step }) => <OhouseIntroSlide step={step} />,
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
  'case-study-02f-focus': {
    id: 'case-study-02f-focus',
    navLabel: 'Journey Focus',
    steps: 2,
    stepDisplay: 'none',
    render: ({ step }) => <OhouseJourneyFocusSlide step={step} />,
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
  'case-study-02g-blocks': {
    id: 'case-study-02g-blocks',
    navLabel: 'Content Blocks',
    steps: 1,
    render: () => <OhouseContentStatementBlocksSlide />,
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
  'case-study-02h-bridge-proposal': {
    id: 'case-study-02h-bridge-proposal',
    navLabel: 'My Role Bridge Proposal',
    steps: 1,
    render: () => <OhouseRoleBridgeProposalSlide />,
  },
  'case-study-02i': {
    id: 'case-study-02i',
    navLabel: 'Personas',
    steps: 3,
    stepDisplay: 'none',
    render: ({ step }) => <OhousePersonaSlide step={step} />,
  },
  'case-study-02i-transition-proposal': {
    id: 'case-study-02i-transition-proposal',
    navLabel: 'Personas Focus Proposal',
    steps: 4,
    stepDisplay: 'none',
    render: ({ step }) => <OhousePersonaTransitionProposalSlide step={step} />,
  },
  'case-study-02g-ecosystem-statement': {
    id: 'case-study-02g-ecosystem-statement',
    navLabel: 'Content 2.0 Statement',
    steps: 1,
    render: () => <OhouseContentEcosystemStatementSlide />,
  },
  'case-study-02g-ecosystem-bridge-proposal': {
    id: 'case-study-02g-ecosystem-bridge-proposal',
    navLabel: 'Content 2.0 Bridge',
    steps: 1,
    render: () => <OhouseContentEcosystemBridgeProposalSlide />,
  },
  'personalized-discovery-intro': {
    id: 'personalized-discovery-intro',
    navLabel: 'Personalized Discovery',
    steps: 1,
    render: () => (
      <ProjectIntroSlide
        index={1}
        nodeId="6381:275335"
        subtitle={[
          'Find content that fits your home',
          "not just what's popular.",
        ]}
        title="Personalized Discovery"
        total={3}
      />
    ),
  },
  'personalized-discovery-combined': {
    id: 'personalized-discovery-combined',
    navLabel: 'Personalized Discovery Combined',
    steps: 1,
    render: () => <PersonalizedDiscoveryCombinedSlide />,
  },
  'creator-economy-intro': {
    id: 'creator-economy-intro',
    navLabel: 'Creator Economy',
    steps: 1,
    render: () => (
      <ProjectIntroSlide
        index={2}
        nodeId="6381:301024"
        subtitle={["You don't need a new home to be a creator."]}
        title="Creator Economy"
        total={3}
      />
    ),
  },
  'creator-economy-combined': {
    id: 'creator-economy-combined',
    navLabel: 'Creator Economy Combined',
    steps: 1,
    render: () => <CreatorEconomyCombinedSlide />,
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
  'pattern-screen-1-copy': {
    id: 'pattern-screen-1-copy',
    navLabel: 'For You Video',
    steps: 1,
    render: () => (
      <PersonalizedFeedIntroSlide
        headline="For You feed"
        videoMp4="/media/personalized-feed.mp4"
        videoPoster="/media/personalized-feed-poster.jpg"
        videoWebm="/media/personalized-feed.webm"
      />
    ),
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
  'feed-results-statement': {
    id: 'feed-results-statement',
    navLabel: 'Feed Results Statement',
    steps: 1,
    render: () => <FeedResultsStatementSlide />,
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
  'creator-economy-results': {
    id: 'creator-economy-results',
    navLabel: 'Creator Results',
    steps: 1,
    render: () => <CreatorEconomyResultsSlide />,
  },
  'community-bridge': {
    id: 'community-bridge',
    navLabel: 'Community Bridge',
    steps: 1,
    render: () => <CommunityBridgeSlide />,
  },
  'community-intro': {
    id: 'community-intro',
    navLabel: 'Community',
    steps: 1,
    render: () => <CommunityIntroSlide />,
  },
  'community-combined': {
    id: 'community-combined',
    navLabel: 'Community Combined',
    steps: 1,
    render: () => <CommunityCombinedSlide />,
  },
  'community-story': {
    id: 'community-story',
    navLabel: 'Community Story',
    steps: 1,
    render: () => <CommunityStorySlide />,
  },
  'community-story-2': {
    id: 'community-story-2',
    navLabel: 'Community Story 2',
    steps: 1,
    render: () => <CommunityStory2Slide />,
  },
  'community-story-3': {
    id: 'community-story-3',
    navLabel: 'Community Story 3',
    steps: 1,
    render: () => <CommunityStory3Slide />,
  },
  'community-results': {
    id: 'community-results',
    navLabel: 'Community Results',
    steps: 1,
    render: () => <CommunityResultsSlide />,
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
