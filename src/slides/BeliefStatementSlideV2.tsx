import { ProposalBadge } from '../components/ProposalBadge'
import { StepTextTransition } from '../components/StepTextTransition'
import type { SlideRenderContext } from '../types/presentation'

const STEP_COPY = [
  'People want better outcomes,\nnot better tools.',
  'Only if you know who they are\nand what winning means to them.',
] as const

type BeliefStatementSlideV2Props = Pick<SlideRenderContext, 'isThumbnail' | 'step'>

export function BeliefStatementSlideV2({
  isThumbnail = false,
  step = 0,
}: BeliefStatementSlideV2Props) {
  const copy = STEP_COPY[Math.min(step, STEP_COPY.length - 1)]

  return (
    <article className="belief-statement-slide belief-statement-slide--v2">
      <ProposalBadge />
      <div className="belief-statement-slide__copy">
        <p className="belief-statement-slide__eyebrow">I believe</p>
        <StepTextTransition
          animateOnMount={!isThumbnail}
          className="belief-statement-slide__headline"
          text={copy}
          variant="erase-type"
        />
      </div>
    </article>
  )
}
