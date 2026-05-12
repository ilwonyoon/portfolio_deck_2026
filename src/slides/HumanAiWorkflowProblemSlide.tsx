import { useEffect, useState } from 'react'

type HumanAiWorkflowProblemVariant =
  | 'origin'
  | 'taskMemory'
  | 'captureStack'
  | 'contextLoss'
  | 'memoryMcp'
  | 'attentionRouting'
  | 'steer'
  | 'stepBack'
  | 'orchestration'
  | 'future'

type Props = {
  step?: number
  variant: HumanAiWorkflowProblemVariant
}

const liveTerminals = [
  {
    title: 'Claude Code — portfolio',
    status: 'needs direction',
    reply: 'Approve the edit.',
    lines: [
      'Read slide manifest',
      'Found CS03 sequence',
      'Waiting for copy decision',
    ],
  },
  {
    title: 'Codex — Backtick',
    status: 'running',
    reply: 'Use the Stack context.',
    lines: ['Edit capture stack', 'Update MCP prompt', 'Build passed'],
  },
  {
    title: 'Gemini — research',
    status: 'blocked',
    reply: 'Check sources first.',
    lines: [
      'Compare agent tools',
      'Missing target-company context',
      'Needs source',
    ],
  },
  {
    title: 'Claude — application',
    status: 'ready',
    reply: 'Save this decision.',
    lines: ['Drafted interview framing', 'Saved decision summary', 'Needs review'],
  },
]

const LIVE_LOOP_MS = 10000
const LIVE_SLOT_MS = LIVE_LOOP_MS / liveTerminals.length

function useLiveLoopTime() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = window.performance.now()
    const id = window.setInterval(() => {
      setElapsed((window.performance.now() - start) % LIVE_LOOP_MS)
    }, 80)

    return () => window.clearInterval(id)
  }, [])

  return elapsed
}

function getTypedLine(text: string, terminalTime: number, lineIndex: number) {
  const lineStart = 180 + lineIndex * 520

  if (terminalTime < lineStart) {
    return ''
  }

  const charCount = Math.floor((terminalTime - lineStart) / 18)
  return text.slice(0, Math.min(text.length, charCount))
}

const orchestrationJobs = [
  ['Remember', 'What context should carry forward?'],
  ['Prioritize', 'What matters right now?'],
  ['Route', 'Which agent or tool should handle it?'],
  ['Intervene', 'When does the human need to step in?'],
  ['Verify', 'Can this output be trusted?'],
  ['Continue', 'What should happen next?'],
]

function OriginSlide({ step }: { step: number }) {
  return (
    <article className="hai-thesis-slide hai-thesis-slide--origin">
      <section className="hai-thesis-copy hai-thesis-copy--wide">
        <p className="hai-thesis-eyebrow">Thesis area</p>
        <div className="hai-thesis-lines">
          <p data-visible="true">
            I started by using AI to build faster.
            <br />
            Then I became the bottleneck.
          </p>
          <p data-visible={step >= 1}>
            But I did not arrive at that thesis first.
          </p>
          <p data-visible={step >= 2}>
            I found it by running into the same workflow gaps,
            <br />
            then building into them one by one.
          </p>
        </div>
      </section>
    </article>
  )
}

function TaskMemorySlide({ step }: { step: number }) {
  const elapsed = useLiveLoopTime()
  const activeIndex = Math.floor(elapsed / LIVE_SLOT_MS)
  const activeLocalTime = elapsed - activeIndex * LIVE_SLOT_MS
  const replyVisible = step >= 1 && activeLocalTime > 1080 && activeLocalTime < 2250

  return (
    <article className="hai-thesis-slide hai-thesis-slide--discovery">
      <section className="hai-thesis-copy">
        <p className="hai-thesis-eyebrow">Bottleneck 01</p>
        <h1 className="hai-thesis-title">
          The first bottleneck was not model capability.
          <br />
          It was my own task memory.
        </h1>
        <p className="hai-thesis-body" data-visible={step >= 1}>
          With multiple agents and terminals running, the work kept splitting
          faster than I could hold it.
        </p>
      </section>

      <section className="hai-thesis-stage" aria-label="Task memory breakdown">
        <div className="hai-live-viewport">
          <div className="hai-live-menubar">
            <span>AI work desktop</span>
            <small>4 agents running · 10s loop</small>
          </div>
          {liveTerminals.map((terminal, index) => {
            const isActive = index === activeIndex
            const terminalTime = isActive
              ? activeLocalTime
              : index < activeIndex
                ? LIVE_SLOT_MS
                : 900

            return (
            <div
              className="hai-live-terminal"
              data-active={isActive}
              data-index={index}
              key={terminal.title}
            >
              <div className="hai-live-terminal__bar">
                <i />
                <i />
                <i />
                <span>{terminal.title}</span>
              </div>
              <div className="hai-live-terminal__body">
                <strong>{terminal.status}</strong>
                {terminal.lines.map((line, lineIndex) => {
                  const typedLine = getTypedLine(line, terminalTime, lineIndex)

                  return (
                  <p data-visible={typedLine.length > 0} key={line}>
                    <em>●</em>
                    {typedLine}
                  </p>
                  )
                })}
                <div className="hai-live-terminal__input" data-active={isActive}>
                  <span>❯</span>
                  <i />
                </div>
              </div>
            </div>
            )
          })}
          <div
            className="hai-live-reply"
            data-index={activeIndex}
            data-visible={replyVisible}
          >
            {liveTerminals[activeIndex]?.reply}
          </div>
          <div
            className="hai-live-attention-dot"
            data-index={activeIndex}
            data-visible={step >= 1}
          >
            me
          </div>
        </div>
      </section>
    </article>
  )
}

function CaptureStackSlide({ step }: { step: number }) {
  return (
    <article className="hai-thesis-slide hai-thesis-slide--discovery">
      <section className="hai-thesis-copy">
        <p className="hai-thesis-eyebrow">Backtick · Task formation</p>
        <h1 className="hai-thesis-title">
          The first missing layer was not memory.
          <br />
          It was task formation.
        </h1>
        <p className="hai-thesis-body" data-visible={step >= 1}>
          AI could execute fast, but my intent was not structured enough to keep
          up.
        </p>
      </section>

      <section className="hai-thesis-stage" aria-label="Backtick capture stack">
        <div className="hai-evidence-viewport">
          <div className="hai-live-menubar">
            <span>Backtick workflow</span>
            <small>Capture / Stack</small>
          </div>
          <div className="hai-evidence-video-grid">
            <figure className="hai-evidence-video-card">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source
                  src="/media/human-ai-agent-workflow/backtick-capture-stack.mp4"
                  type="video/mp4"
                />
              </video>
              <figcaption>
                <span>Capture</span>
                Loose intent before it disappears
              </figcaption>
            </figure>
            <figure
              className="hai-evidence-video-card hai-evidence-video-card--empty"
              data-visible={step >= 1}
            >
              <div className="hai-evidence-video-placeholder">
                <span>Next video</span>
              </div>
              <figcaption>
                <span>Stack</span>
                Agent-ready work queue
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </article>
  )
}

function ContextLossSlide({ step }: { step: number }) {
  return (
    <article className="hai-thesis-slide hai-thesis-slide--discovery">
      <section className="hai-thesis-copy">
        <p className="hai-thesis-eyebrow">Bottleneck 02</p>
        <h1 className="hai-thesis-title">
          Then context started breaking across agents.
        </h1>
        <p className="hai-thesis-body" data-visible={step >= 1}>
          ChatGPT and Claude knew the decision. Codex and Claude Code did not.
          I kept becoming the integration layer.
        </p>
      </section>

      <section className="hai-thesis-stage" aria-label="Cross-agent context loss">
        <div className="hai-context-map">
          <div className="hai-context-card hai-context-card--knows">
            <small>ChatGPT</small>
            <strong>Decision made</strong>
            <span>Use the 3-step narrative.</span>
          </div>
          <div className="hai-context-card hai-context-card--knows">
            <small>Claude</small>
            <strong>Strategy refined</strong>
            <span>Make it evidence-first.</span>
          </div>
          <div className="hai-context-gap" data-visible={step >= 1}>
            context loss
          </div>
          <div className="hai-context-card">
            <small>Codex</small>
            <strong>Missing intent</strong>
            <span>Repeats the wrong framing.</span>
          </div>
          <div className="hai-context-card">
            <small>Claude Code</small>
            <strong>Missing decision</strong>
            <span>Needs the same explanation again.</span>
          </div>
        </div>
      </section>
    </article>
  )
}

function MemoryMcpSlide({ step }: { step: number }) {
  return (
    <article className="hai-thesis-slide hai-thesis-slide--discovery">
      <section className="hai-thesis-copy">
        <p className="hai-thesis-eyebrow">Backtick · Memory MCP</p>
        <h1 className="hai-thesis-title">
          So Backtick became shared memory for AI agents.
        </h1>
        <p className="hai-thesis-body" data-visible={step >= 1}>
          The goal was not just saving notes. It was making durable project
          context readable by the tools doing the work.
        </p>
      </section>

      <section className="hai-thesis-stage" aria-label="Backtick memory MCP">
        <div className="hai-memory-mcp">
          <div className="hai-memory-mcp__poster">
            <img
              alt="Backtick Memory MCP demo"
              src="/media/promptcue/universal-memory-poster.png"
            />
          </div>
          <div className="hai-memory-hub" data-visible={step >= 1}>
            <strong>Backtick Memory MCP</strong>
            <span>decisions / project context / task graph</span>
          </div>
          {['Claude Code', 'Codex', 'ChatGPT', 'Claude'].map((label, index) => (
            <div className="hai-memory-agent" data-index={index} key={label}>
              {label}
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}

function AttentionRoutingSlide({ step }: { step: number }) {
  return (
    <article className="hai-thesis-slide hai-thesis-slide--discovery">
      <section className="hai-thesis-copy">
        <p className="hai-thesis-eyebrow">Bottleneck 03</p>
        <h1 className="hai-thesis-title">
          Then parallel agents created a new bottleneck: attention.
        </h1>
        <p className="hai-thesis-body" data-visible={step >= 1}>
          It was not yet full task routing. The immediate problem was knowing
          which agent needed me now.
        </p>
      </section>

      <section className="hai-thesis-stage" aria-label="Attention routing breakdown">
        <div className="hai-attention-grid">
          {['Claude Code', 'Codex', 'Gemini', 'Browser', 'cmux left', 'cmux right'].map(
            (label, index) => (
              <div className="hai-attention-pane" data-index={index} key={label}>
                <div className="hai-attention-pane__top">
                  <span>{label}</span>
                  <i>1</i>
                </div>
                <p>{index % 3 === 0 ? 'needs decision' : index % 3 === 1 ? 'review ready' : 'blocked'}</p>
              </div>
            ),
          )}
          <div className="hai-attention-callout" data-visible={step >= 1}>
            too many small signals
            <br />
            no clear attention queue
          </div>
        </div>
      </section>
    </article>
  )
}

function SteerSlide({ step }: { step: number }) {
  return (
    <article className="hai-thesis-slide">
      <section className="hai-thesis-copy">
        <p className="hai-thesis-eyebrow">Steer</p>
        <h1 className="hai-thesis-title">
          So I started building an attention layer for AI coding agents.
        </h1>
        <p className="hai-thesis-body" data-visible={step >= 1}>
          Steer routes human attention to blockers, approvals, reviews,
          questions, and next instructions.
        </p>
      </section>

      <section className="hai-thesis-stage" aria-label="Steer attention inbox">
        <div className="hai-steer-inbox">
          <div className="hai-steer-inbox__header">
            <span>Steer</span>
            <small>Agent attention queue</small>
          </div>
          {[
            ['Claude Code', 'Needs approval', 'Write files in /admin?'],
            ['Codex', 'Review ready', '3 files changed'],
            ['Gemini', 'Question', 'Which branch should continue?'],
            ['Browser agent', 'Done', 'Visual check complete'],
          ].map(([agent, title, body], index) => (
            <div
              className="hai-steer-inbox-card"
              data-visible={step >= 1 || index < 2}
              key={agent}
            >
              <small>{agent}</small>
              <strong>{title}</strong>
              <span>{body}</span>
            </div>
          ))}
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
            At some point, I had to step back.
          </p>
          <p data-visible={step >= 1}>
            I was not just managing tasks.
            <br />
            I was managing AI work.
          </p>
          <p data-visible={step >= 2}>
            That made the role clearer:
            <br />
            human as AI work manager.
          </p>
        </div>
      </section>
    </article>
  )
}

function OrchestrationSlide({ step }: { step: number }) {
  return (
    <article className="hai-thesis-slide">
      <section className="hai-thesis-copy">
        <p className="hai-thesis-eyebrow">Interest map</p>
        <h1 className="hai-thesis-title">
          This is the layer I want to keep working on.
        </h1>
        <p className="hai-thesis-body" data-visible={step >= 1}>
          Not one product. The operating layer that turns fragmented AI work
          into manageable work.
        </p>
      </section>

      <section className="hai-thesis-stage" aria-label="Human-AI orchestration map">
        <div className="hai-orchestration-map">
          <div className="hai-orchestration-map__band">
            <span>Fragmented AI Work</span>
            <small>agents / tools / memory / tasks / outputs / decisions</small>
          </div>
          <div className="hai-orchestration-map__arrow">↓</div>
          <div className="hai-orchestration-map__manager">
            <span>Human as AI Work Manager</span>
            <div>
              {orchestrationJobs.map(([title, caption]) => (
                <p key={title}>
                  <strong>{title}</strong>
                  <small>{caption}</small>
                </p>
              ))}
            </div>
          </div>
          <div className="hai-orchestration-map__arrow" data-visible={step >= 1}>
            ↓
          </div>
          <div className="hai-orchestration-map__band" data-visible={step >= 1}>
            <span>Human-AI Orchestration Layer</span>
            <small>
              Backtick: capture / stack / memory MCP · Steer: attention /
              intervention / control · Next: routing / verification / trust /
              handoff / continuity
            </small>
          </div>
        </div>
      </section>
    </article>
  )
}

function FutureSlide() {
  return (
    <article className="hai-thesis-slide hai-thesis-slide--open">
      <section className="hai-thesis-copy hai-thesis-copy--wide">
        <p className="hai-thesis-eyebrow">Future interest</p>
        <h1 className="hai-thesis-title">
          The future problem is not making one agent smarter.
          <br />
          It is making fragmented AI work manageable.
        </h1>
      </section>
    </article>
  )
}

export function HumanAiWorkflowProblemSlide({ step = 0, variant }: Props) {
  if (variant === 'origin') return <OriginSlide step={step} />
  if (variant === 'taskMemory') return <TaskMemorySlide step={step} />
  if (variant === 'captureStack') return <CaptureStackSlide step={step} />
  if (variant === 'contextLoss') return <ContextLossSlide step={step} />
  if (variant === 'memoryMcp') return <MemoryMcpSlide step={step} />
  if (variant === 'attentionRouting') return <AttentionRoutingSlide step={step} />
  if (variant === 'steer') return <SteerSlide step={step} />
  if (variant === 'stepBack') return <StepBackSlide step={step} />
  if (variant === 'orchestration') return <OrchestrationSlide step={step} />
  return <FutureSlide />
}
