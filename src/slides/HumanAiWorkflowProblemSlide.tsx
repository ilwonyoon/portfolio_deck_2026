import type { ReactNode } from 'react'

type HumanAiWorkflowProblemVariant =
  | 'fragmentation'
  | 'bottleneck'
  | 'layers'
  | 'loop'

type Props = {
  variant: HumanAiWorkflowProblemVariant
}

const agents = ['Claude Code', 'Codex', 'Gemini CLI']

function FragmentationDiagram() {
  return (
    <div className="hai-workflow-diagram hai-workflow-diagram--fragmentation">
      <div className="hai-workflow-diagram__agents" aria-label="Fragmented AI agents">
        {agents.map((agent, index) => (
          <div className="hai-workflow-node hai-workflow-node--agent" key={agent}>
            <span>{agent}</span>
            <small>own context</small>
            <i data-index={index} />
          </div>
        ))}
      </div>

      <svg className="hai-workflow-lines" viewBox="0 0 760 430" aria-hidden="true">
        <path d="M 142 110 C 245 150, 320 205, 382 286" />
        <path d="M 382 110 C 382 174, 382 226, 382 286" />
        <path d="M 622 110 C 520 151, 445 205, 382 286" />
      </svg>

      <div className="hai-workflow-node hai-workflow-node--human">
        <span>Me</span>
        <small>integration layer</small>
      </div>
    </div>
  )
}

function BottleneckDiagram() {
  return (
    <div className="hai-workflow-diagram hai-workflow-diagram--bottleneck">
      <div className="hai-workflow-queue">
        {[
          'permission',
          'question',
          'blocked',
          'done',
          'next step',
        ].map((item) => (
          <span className="hai-workflow-ticket" key={item}>
            {item}
          </span>
        ))}
      </div>

      <svg className="hai-workflow-lines" viewBox="0 0 760 430" aria-hidden="true">
        <path d="M 164 92 C 276 102, 358 142, 430 212" />
        <path d="M 164 172 C 280 174, 360 194, 430 232" />
        <path d="M 164 252 C 278 246, 360 244, 430 252" />
        <path d="M 164 332 C 274 318, 360 292, 430 272" />
      </svg>

      <div className="hai-workflow-node hai-workflow-node--human hai-workflow-node--right">
        <span>Human attention</span>
        <small>the new bottleneck</small>
      </div>
    </div>
  )
}

function LayersDiagram() {
  return (
    <div className="hai-workflow-diagram hai-workflow-diagram--layers">
      <div className="hai-layer hai-layer--human">
        <span>Human judgment</span>
        <small>intent · decisions · standards</small>
      </div>
      <div className="hai-layer-row">
        <div className="hai-layer hai-layer--memory">
          <span>Memory layer</span>
          <small>shared context</small>
        </div>
        <div className="hai-layer hai-layer--attention">
          <span>Attention layer</span>
          <small>interruptions</small>
        </div>
      </div>
      <div className="hai-layer hai-layer--agents">
        <span>AI agents</span>
        <small>parallel execution</small>
      </div>
    </div>
  )
}

function LoopDiagram() {
  return (
    <div className="hai-workflow-diagram hai-workflow-diagram--loop">
      <svg className="hai-workflow-loop" viewBox="0 0 760 430" aria-hidden="true">
        <path d="M 386 72 C 548 72, 670 184, 670 302" />
        <path d="M 670 302 C 670 360, 594 386, 510 386" />
        <path d="M 250 386 C 144 386, 88 338, 88 270" />
        <path d="M 88 270 C 88 154, 206 72, 386 72" />
      </svg>

      {[
        ['intent', 'What should be true?'],
        ['context', 'What should agents know?'],
        ['execution', 'What can run in parallel?'],
        ['intervention', 'When do I step in?'],
      ].map(([label, caption]) => (
        <div className={`hai-loop-node hai-loop-node--${label}`} key={label}>
          <span>{label}</span>
          <small>{caption}</small>
        </div>
      ))}

      <div className="hai-loop-core">
        <span>orchestration</span>
      </div>
    </div>
  )
}

const variantContent: Record<
  HumanAiWorkflowProblemVariant,
  {
    eyebrow: string
    title: string
    body: string
    diagram: ReactNode
  }
> = {
  fragmentation: {
    eyebrow: 'Problem 01',
    title: 'Every agent had its own memory.',
    body: 'Claude, Codex, and ChatGPT could all help me build. But the shared context still lived in my head.',
    diagram: <FragmentationDiagram />,
  },
  bottleneck: {
    eyebrow: 'Problem 02',
    title: 'Parallel agents made me the bottleneck.',
    body: 'The more sessions I ran, the more my job shifted from doing the work to watching, routing, and unblocking it.',
    diagram: <BottleneckDiagram />,
  },
  layers: {
    eyebrow: 'Focus area',
    title: 'I started designing the missing workflow layers.',
    body: 'Backtick became the memory layer. Steer became the attention layer. Together, they explore how humans direct AI agents.',
    diagram: <LayersDiagram />,
  },
  loop: {
    eyebrow: 'Thesis',
    title: 'The work moved from execution to orchestration.',
    body: 'The product question became: how do I give context, supervise progress, intervene at the right moment, and keep agents moving?',
    diagram: <LoopDiagram />,
  },
}

export function HumanAiWorkflowProblemSlide({ variant }: Props) {
  const content = variantContent[variant]

  return (
    <article className={`hai-workflow-slide hai-workflow-slide--${variant}`}>
      <section className="hai-workflow-slide__copy">
        <p className="hai-workflow-slide__eyebrow">{content.eyebrow}</p>
        <h1 className="hai-workflow-slide__title">{content.title}</h1>
        <p className="hai-workflow-slide__body">{content.body}</p>
      </section>

      <section className="hai-workflow-slide__stage" aria-label={content.title}>
        {content.diagram}
      </section>
    </article>
  )
}
