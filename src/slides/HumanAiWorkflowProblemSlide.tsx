import { useEffect, useMemo, useRef, useState } from 'react'
import { ContextDrawer } from '../components/ContextDrawer'
import { DeckVideo } from '../components/DeckVideo'

type HumanAiWorkflowProblemVariant =
  | 'opening'
  | 'memoryMcp'
  | 'capture'
  | 'backtickPanels'
  | 'steerDecision'
  | 'steerInbox'
  | 'loopOverview'
  | 'stepBack'
  | 'openField'

type Props = {
  step?: number
  variant: HumanAiWorkflowProblemVariant
}

type VideoSource = {
  mp4?: string
  webm?: string
  poster?: string
  caption?: string
  placeholder?: string
}

type MediaChip = {
  id: string
  label: string
  mp4: string
  poster: string
  webm?: string
}

type DemoSlideContent = {
  eyebrow: string
  title: string
  drawer: React.ReactNode
  media?: {
    mp4: string
    poster: string
  }
  mediaCaption?: string
  mediaList?: MediaChip[]
  mediaPair?: {
    left: VideoSource
    right: VideoSource
    ratio?: string
  }
}

const demoContent: Record<
  | 'memoryMcp'
  | 'capture'
  | 'backtickPanels'
  | 'steerDecision'
  | 'steerInbox',
  DemoSlideContent
> = {
  memoryMcp: {
    eyebrow: 'Backtick · Memory MCP',
    title: 'Selective memory. Persistent across agents.',
    drawer: (
      <p>
        To better manage multiple agents, I needed a place where my
        decisions live — not just the answer, but how I got there. The MCP
        layer makes it the handoff between agents.
      </p>
    ),
    media: {
      mp4: '/media/promptcue/actual-run.mp4',
      poster: '/media/promptcue/actual-run-poster.png',
    },
    mediaCaption: 'Sped up 4× for demo.',
  },
  capture: {
    eyebrow: 'Backtick · Capture → Stack',
    title: 'Capture instantly. Hand off prioritized.',
    drawer: (
      <p>
        Sending notes one by one pollutes the agent's context. So I capture
        scattered feedback first, then stack it into a single,
        action-oriented brief the agent can actually run on.
      </p>
    ),
    mediaPair: {
      left: {
        mp4: '/media/human-ai-agent-workflow/backtick-capture.mp4',
        webm: '/media/human-ai-agent-workflow/backtick-capture.webm',
        poster: '/media/human-ai-agent-workflow/backtick-capture.mp4',
        caption: 'Capture · scattered feedback in',
      },
      right: {
        mp4: '/media/human-ai-agent-workflow/backtick-stack-mcp.mp4',
        webm: '/media/human-ai-agent-workflow/backtick-stack-mcp.webm',
        poster: '/media/human-ai-agent-workflow/backtick-stack-mcp.mp4',
        caption: 'Stack → MCP · one brief out',
      },
    },
  },
  backtickPanels: {
    eyebrow: 'Backtick · Observability',
    title: 'Observability for the human in the loop.',
    drawer: (
      <p>
        Backtick is built to feed agents. But the human still needs to see
        what's in flight and fix what's wrong. Stack and Memory panels
        surface what's queued and what's been decided — each entry carries a
        vividness signal and stays directly editable.
      </p>
    ),
    mediaPair: {
      ratio: '1.5fr 2.5fr',
      left: {
        mp4: '/media/human-ai-agent-workflow/backtick-stack-panel.mp4',
        webm: '/media/human-ai-agent-workflow/backtick-stack-panel.webm',
        poster: '/media/human-ai-agent-workflow/backtick-stack-panel.mp4',
        caption: 'Stack · what is queued',
      },
      right: {
        mp4: '/media/human-ai-agent-workflow/backtick-memory-panel.mp4',
        webm: '/media/human-ai-agent-workflow/backtick-memory-panel.webm',
        poster: '/media/human-ai-agent-workflow/backtick-memory-panel.mp4',
        caption: 'Memory · what is decided, editable',
      },
    },
  },
  steerDecision: {
    eyebrow: 'Steer · Mac',
    title: 'The decision surface for AI agent workflows.',
    drawer: (
      <p>
        Multiple agents running. If I stay on one, the others stall. Steer
        surfaces only the moments an agent has stopped and needs me — one
        card per terminal stop event, with evidence to decide on.
      </p>
    ),
  },
  steerInbox: {
    eyebrow: 'Steer · Mobile',
    title: 'Unblock from anywhere.',
    drawer: (
      <p>
        The decision can't only live on the desk. A push lands on iPhone the
        moment an agent stops — same card, same surface. The AI doesn't wait
        for me to come back.
      </p>
    ),
  },
}

function DemoSlide({
  variant,
}: {
  variant:
    | 'memoryMcp'
    | 'capture'
    | 'backtickPanels'
    | 'steerDecision'
    | 'steerInbox'
}) {
  const content = demoContent[variant]
  const rightVideoRef = useRef<HTMLVideoElement>(null)
  const listVideoRef = useRef<HTMLVideoElement>(null)
  const [activeChipId, setActiveChipId] = useState<string>(
    content.mediaList?.[0]?.id ?? '',
  )
  const activeChip = useMemo(
    () =>
      content.mediaList?.find((item) => item.id === activeChipId) ??
      content.mediaList?.[0],
    [content.mediaList, activeChipId],
  )

  useEffect(() => {
    const video = listVideoRef.current
    if (!video || !activeChip) return
    video.currentTime = 0
    void video.play().catch(() => {})
  }, [activeChip?.mp4])

  function handleLeftEnded() {
    const right = rightVideoRef.current
    if (!right) return
    right.currentTime = 0
    void right.play().catch(() => {})
  }

  function handleRightLoaded() {
    const right = rightVideoRef.current
    if (!right) return
    right.currentTime = 0.001
  }

  function handleRightClick() {
    const right = rightVideoRef.current
    if (!right) return
    if (right.paused) {
      void right.play().catch(() => {})
    } else {
      right.pause()
    }
  }

  return (
    <article className={`hai-thesis-slide hai-thesis-slide--${variant}`}>
      <section className="promptcue-demo-slide__copy">
        <p className="promptcue-demo-slide__eyebrow">{content.eyebrow}</p>
        <ContextDrawer
          showHint={false}
          title={<h1 className="promptcue-demo-slide__title">{content.title}</h1>}
          variant="dot"
        >
          <div className="context-drawer__content promptcue-demo-slide__drawer-content">
            {content.drawer}
          </div>
        </ContextDrawer>
      </section>

      <section
        className={`promptcue-demo-slide__stage${
          content.media || content.mediaPair || content.mediaList
            ? ''
            : ' hai-thesis-stage--placeholder'
        }${content.mediaPair ? ' hai-thesis-stage--pair' : ''}`}
        aria-label={content.title}
      >
        {content.media ? (
          <DeckVideo
            className="promptcue-demo-slide__video"
            mp4={content.media.mp4}
            poster={content.media.poster}
          />
        ) : content.mediaList && activeChip ? (
          <DeckVideo
            className="promptcue-demo-slide__video"
            key={activeChip.mp4}
            mp4={activeChip.mp4}
            poster={activeChip.poster}
            ref={listVideoRef}
            webm={activeChip.webm}
          />
        ) : content.mediaPair ? (
          <div
            className="hai-thesis-pair"
            style={
              content.mediaPair.ratio
                ? { gridTemplateColumns: content.mediaPair.ratio }
                : undefined
            }
          >
            <figure className="hai-thesis-pair__card">
              {content.mediaPair.left.mp4 ? (
                <DeckVideo
                  autoPlay
                  className="hai-thesis-pair__video"
                  loop={false}
                  mp4={content.mediaPair.left.mp4}
                  onEnded={handleLeftEnded}
                  poster=""
                  preload="auto"
                  webm={content.mediaPair.left.webm}
                />
              ) : (
                <div className="hai-thesis-pair__placeholder">
                  <span>{content.mediaPair.left.placeholder ?? 'Video'}</span>
                </div>
              )}
              {content.mediaPair.left.caption && (
                <figcaption>{content.mediaPair.left.caption}</figcaption>
              )}
            </figure>
            <figure className="hai-thesis-pair__card">
              {content.mediaPair.right.mp4 ? (
                <DeckVideo
                  autoPlay={false}
                  className="hai-thesis-pair__video hai-thesis-pair__video--click"
                  loop={false}
                  mp4={content.mediaPair.right.mp4}
                  onClick={handleRightClick}
                  onLoadedMetadata={handleRightLoaded}
                  poster=""
                  preload="auto"
                  ref={rightVideoRef}
                  webm={content.mediaPair.right.webm}
                />
              ) : (
                <div className="hai-thesis-pair__placeholder">
                  <span>{content.mediaPair.right.placeholder ?? 'Video'}</span>
                </div>
              )}
              {content.mediaPair.right.caption && (
                <figcaption>{content.mediaPair.right.caption}</figcaption>
              )}
            </figure>
          </div>
        ) : (
          <div className="hai-thesis-placeholder">
            <span>Content coming</span>
            <small>{content.eyebrow}</small>
          </div>
        )}
      </section>

      {content.mediaCaption && (
        <p className="hai-thesis-media-caption">{content.mediaCaption}</p>
      )}

      {content.mediaList && content.mediaList.length > 1 && (
        <div className="promptcue-demo-slide__chips" aria-label={content.eyebrow}>
          {content.mediaList.map((chip) => (
            <button
              aria-pressed={chip.id === activeChipId}
              className="promptcue-demo-slide__chip"
              key={chip.id}
              onClick={() => setActiveChipId(chip.id)}
              type="button"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </article>
  )
}

function OpeningSlide({ step }: { step: number }) {
  return (
    <article className="hai-thesis-slide hai-thesis-slide--origin hai-thesis-slide--center">
      <section className="hai-thesis-copy hai-thesis-copy--wide hai-thesis-copy--center">
        <p className="hai-thesis-eyebrow">Side project</p>
        <div className="hai-thesis-lines">
          <p data-visible="true">
            I use AI to push beyond my limit.
            <br />
            Soon the ceiling wasn't the model's capability —
            <br />
            it was me, as a human.
          </p>
          <p data-visible={step >= 1}>
            How can a human manage and orchestrate
            <br />
            a suite of AI agents to maximize outputs?
          </p>
          <p data-visible={step >= 2}>
            So I've been building tools to solve this problem.
          </p>
        </div>
      </section>
    </article>
  )
}

function StepBackSlide({ step }: { step: number }) {
  return (
    <article className="hai-thesis-slide hai-thesis-slide--origin">
      <section className="hai-thesis-copy hai-thesis-copy--wide">
        <p className="hai-thesis-eyebrow">Step back</p>
        <div className="hai-thesis-lines">
          <p data-visible="true">
            Three problems.
            <br />
            Three products.
          </p>
          <p data-visible={step >= 1}>
            One question underneath:
          </p>
          <p data-visible={step >= 2}>
            How do you survive
            <br />
            as a manager of AIs?
          </p>
        </div>
      </section>
    </article>
  )
}

function OpenFieldSlide({ step }: { step: number }) {
  return (
    <article className="hai-thesis-slide hai-thesis-slide--open">
      <section className="hai-thesis-copy hai-thesis-copy--wide">
        <p className="hai-thesis-eyebrow">Where this leads</p>
        <div className="hai-thesis-lines">
          <p data-visible="true">
            I'm still figuring this out.
          </p>
          <p data-visible={step >= 1}>
            Memory · Capture · Attention —
            <br />
            three pieces of something larger.
          </p>
          <p data-visible={step >= 2}>
            The question stays the same.
          </p>
        </div>
      </section>
    </article>
  )
}

function LoopOverviewSlide({ step }: { step: number }) {
  return (
    <article className="hai-thesis-slide hai-thesis-slide--loop hai-loop-stacked">
      <section className="hai-loop-stacked__table">
        <LoopDiagram />
      </section>
      <section
        className="hai-loop-stacked__copy"
        data-visible={step >= 1 ? 'true' : 'false'}
      >
        <p>
          The more AI can do, the more
          <br />
          one person ends up responsible for.
        </p>
        <p>
          I keep working on the loop between human and AI —
          <br />
          smoothing the friction so AI can be pushed further.
        </p>
      </section>
    </article>
  )
}

const loopStages: Array<{
  label: string
  bottom: string
}> = [
  { label: 'Intent', bottom: 'Backtick Capture' },
  { label: 'Context', bottom: 'Memory MCP' },
  { label: 'Handoff', bottom: 'Stack → MCP' },
  { label: 'Oversight', bottom: 'Memory panel + edit' },
  { label: 'Intervention', bottom: 'Steer (Mac + Mobile)' },
]

function LoopDiagram() {
  return (
    <div className="hai-loop-htable" aria-label="AI workflow orchestration">
      <p className="hai-loop-htable__eyebrow">AI workflow orchestration</p>
      <div className="hai-loop-htable__grid">
        {loopStages.map((stage) => (
          <div className="hai-loop-htable__col" key={stage.label}>
            <div className="hai-loop-htable__label">{stage.label}</div>
            <div className="hai-loop-htable__value">{stage.bottom}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HumanAiWorkflowProblemSlide({ step = 0, variant }: Props) {
  if (variant === 'opening') return <OpeningSlide step={step} />
  if (variant === 'stepBack') return <StepBackSlide step={step} />
  if (variant === 'openField') return <OpenFieldSlide step={step} />
  if (variant === 'loopOverview') return <LoopOverviewSlide step={step} />
  return <DemoSlide variant={variant} />
}
