import { MobilePrototype } from '../components/MobilePrototype'
import { SlideShell } from '../components/SlideShell'
import type { SlideDefinition } from '../types/presentation'

function revealClass(isVisible: boolean) {
  return `reveal${isVisible ? ' is-visible' : ''}`
}

function renderIntroSlide(
  step: number,
  slideIndex: number,
  totalSlides: number,
) {
  return (
    <SlideShell
      body="A web-first portfolio deck for job applications. The stage is fixed at 1920x1080, stays interactive, and is designed to hold large narrative slides, mobile prototype videos, and step-based reveals without changing the canvas ratio."
      eyebrow="Environment Setup"
      sectionLabel="Intro"
      slideIndex={slideIndex}
      summary="The deck now has a working presentation shell: fixed-ratio canvas, keyboard navigation, sharable slide state, General Sans, pretext-backed text measurement, and a clean path for mobile-video embeds."
      title="Interactive portfolio deck, not a PDF export."
      totalSlides={totalSlides}
    >
      <div className="stack">
        <div className="metric-strip">
          <div className="metric-card">
            <span className="metric-card__label">Canvas</span>
            <span className="metric-card__value">1920 × 1080</span>
            <span className="metric-card__subvalue">
              Fixed stage, auto-scaled to the viewport
            </span>
          </div>

          <div className="metric-card">
            <span className="metric-card__label">Typeface</span>
            <span className="metric-card__value">General Sans</span>
            <span className="metric-card__subvalue">
              Variable font loaded now, easy to self-host later
            </span>
          </div>

          <div className="metric-card">
            <span className="metric-card__label">Slides</span>
            <span className="metric-card__value">Interactive</span>
            <span className="metric-card__subvalue">
              URL-synced navigation and staged reveals
            </span>
          </div>
        </div>

        <div className="card-grid">
          <div className={revealClass(true)}>
            <article className="card">
              <span className="card__eyebrow">Content structure</span>
              <h2 className="card__title">Intro, Case Study 01, Case Study 02, and Work Like AI Native</h2>
              <p className="card__body">
                The shell is already organized around the four sections you want
                to present.
              </p>
            </article>
          </div>

          <div className={revealClass(step >= 1)}>
            <article className="card">
              <span className="card__eyebrow">Text system</span>
              <h2 className="card__title">Pretext is wired in where copy length starts to matter</h2>
              <p className="card__body">
                Summary blocks now use precomputed text layout instead of DOM
                reads, which gives you a clean base for measured editorial
                layouts later.
              </p>
            </article>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}

function renderCaseStudyOneSlide(
  step: number,
  slideIndex: number,
  totalSlides: number,
) {
  return (
    <SlideShell
      body="Case Study 01 needs breadth more than dense UI detail. The shell supports that by combining a strong narrative frame on the left with modular cards for strategy, supply-side design, and business outcomes on the right."
      eyebrow="Case Study 01"
      sectionLabel="Re-building the 3C Flywheel"
      slideIndex={slideIndex}
      summary="This environment is ready for the breadth case: Discovery 2.0, Creator Economy, Community, and Brand 2.0 can live as coordinated modules instead of being forced into a before/after case-study template."
      title="Build for narrative scope first."
      totalSlides={totalSlides}
    >
      <div className="stack">
        <div className="card-grid">
          <div className={revealClass(true)}>
            <article className="card">
              <span className="card__eyebrow">Demand side</span>
              <h2 className="card__title">Discovery 2.0</h2>
              <p className="card__body">
                Supports high-level storytelling around intent, browse depth,
                and the jump from inspiration to purchase.
              </p>
            </article>
          </div>

          <div className={revealClass(true)}>
            <article className="card">
              <span className="card__eyebrow">Supply side</span>
              <h2 className="card__title">Creator Economy</h2>
              <p className="card__body">
                Gives you a dedicated place for creator onboarding,
                monetization, and content supply growth.
              </p>
            </article>
          </div>

          <div className={revealClass(step >= 1)}>
            <article className="card">
              <span className="card__eyebrow">Confidence layer</span>
              <h2 className="card__title">Community & Reviews</h2>
              <p className="card__body">
                Designed for emotional confirmation and social proof, not just
                utilitarian review UI.
              </p>
            </article>
          </div>

          <div className={revealClass(step >= 1)}>
            <article className="card">
              <span className="card__eyebrow">Commercial depth</span>
              <h2 className="card__title">Brand 2.0</h2>
              <p className="card__body">
                A place to talk about assortment gaps, category depth, and where
                the strategy had mixed results.
              </p>
            </article>
          </div>
        </div>

        <div className={revealClass(step >= 2)}>
          <div className="metric-strip">
            <div className="metric-card">
              <span className="metric-card__label">Business frame</span>
              <span className="metric-card__value">BEP-ready</span>
              <span className="metric-card__subvalue">
                The layout is set up for high-level impact statements without
                drowning the deck in dashboards.
              </span>
            </div>

            <div className="metric-card">
              <span className="metric-card__label">Presentation mode</span>
              <span className="metric-card__value">Step reveals</span>
              <span className="metric-card__subvalue">
                Context can unfold live without forcing static slide bloat.
              </span>
            </div>

            <div className="metric-card">
              <span className="metric-card__label">Layout bias</span>
              <span className="metric-card__value">Narrative-first</span>
              <span className="metric-card__subvalue">
                Built for explanation-heavy strategy pages before UI details are
                added.
              </span>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}

function renderCaseStudyTwoSlide(
  step: number,
  slideIndex: number,
  totalSlides: number,
) {
  return (
    <SlideShell
      body="Case Study 02 needs a tighter 0→1 product narrative. The environment now has a dedicated mobile-video frame, phase structure, and a clean place to show that this was an AI-native opportunity you identified, pushed, and validated."
      eyebrow="Case Study 02"
      sectionLabel="AI Transformation"
      slideIndex={slideIndex}
      summary="The shell now supports the AI case in the right format: one strong framing slide, phase transitions, and device-sized motion prototypes that can be local during iteration or hosted remotely once you publish."
      title="Support mobile prototypes as first-class assets."
      totalSlides={totalSlides}
    >
      <div className="stack">
        <MobilePrototype
          caption="Use local files in development, then switch to a remote base URL when the asset count grows. The component is already sized for portrait product demos."
          label="Mobile prototype"
          title="Video-ready frame for Room Planner, image placement, or AI flow demos"
        />

        <div className="timeline">
          <div className={revealClass(true)}>
            <article className="timeline-card">
              <span className="timeline-card__eyebrow">Phase 1</span>
              <h2 className="timeline-card__title">KR integration</h2>
              <p className="timeline-card__body">
                Existing funnel validation inside the current product and
                business constraints.
              </p>
            </article>
          </div>

          <div className={revealClass(step >= 1)}>
            <article className="timeline-card">
              <span className="timeline-card__eyebrow">Phase 2</span>
              <h2 className="timeline-card__title">Standalone AI-native journey</h2>
              <p className="timeline-card__body">
                New interaction model, new business-model validation, and a more
                direct founding-designer signal.
              </p>
            </article>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}

function renderWorkLikeAiNativeSlide(
  step: number,
  slideIndex: number,
  totalSlides: number,
) {
  return (
    <SlideShell
      body="This section is not a classic case study. It needs an operating-system feel: how you prototype, automate, code, and use AI to compress iteration time while staying focused on outcomes instead of novelty."
      eyebrow="Operating model"
      sectionLabel="Work Like AI Native"
      slideIndex={slideIndex}
      summary="The deck is now set up to end on working principles instead of one more product case. That is the right shape for side projects, workflow experiments, and the credibility behind your AI-native positioning."
      title="Leave room for process, not just shipped screens."
      totalSlides={totalSlides}
    >
      <div className="card-grid">
        <div className={revealClass(true)}>
          <article className="card">
            <span className="card__eyebrow">Build</span>
            <h2 className="card__title">Indie tools and prototypes</h2>
            <p className="card__body">
              A place for Backtick, macOS utilities, or other internal tools
              that show you actually build with AI.
            </p>
          </article>
        </div>

        <div className={revealClass(true)}>
          <article className="card">
            <span className="card__eyebrow">Automate</span>
            <h2 className="card__title">Workflow acceleration</h2>
            <p className="card__body">
              Show how research, iteration, writing, prototyping, and technical
              execution now collapse into tighter loops.
            </p>
          </article>
        </div>

        <div className={revealClass(step >= 1)}>
          <article className="card">
            <span className="card__eyebrow">Judge</span>
            <h2 className="card__title">Outcome over tool novelty</h2>
            <p className="card__body">
              The section can bring the whole portfolio back to the core belief:
              better outcomes, not better tools.
            </p>
          </article>
        </div>

        <div className={revealClass(step >= 1)}>
          <article className="card">
            <span className="card__eyebrow">Extend</span>
            <h2 className="card__title">Future-facing hiring signal</h2>
            <p className="card__body">
              A compact end section that makes founding-designer or senior
              builder roles easier to map onto your portfolio.
            </p>
          </article>
        </div>
      </div>
    </SlideShell>
  )
}

export const deckSlides: SlideDefinition[] = [
  {
    id: 'intro',
    navLabel: 'Intro',
    steps: 2,
    render: ({ step, slideIndex, totalSlides }) =>
      renderIntroSlide(step, slideIndex, totalSlides),
  },
  {
    id: 'case-study-01',
    navLabel: 'Case 01',
    steps: 3,
    render: ({ step, slideIndex, totalSlides }) =>
      renderCaseStudyOneSlide(step, slideIndex, totalSlides),
  },
  {
    id: 'case-study-02',
    navLabel: 'Case 02',
    steps: 2,
    render: ({ step, slideIndex, totalSlides }) =>
      renderCaseStudyTwoSlide(step, slideIndex, totalSlides),
  },
  {
    id: 'work-like-ai-native',
    navLabel: 'AI Native',
    steps: 2,
    render: ({ step, slideIndex, totalSlides }) =>
      renderWorkLikeAiNativeSlide(step, slideIndex, totalSlides),
  },
]
