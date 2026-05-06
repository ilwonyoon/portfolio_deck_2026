import { StepTextTransition } from '../components/StepTextTransition'
import type { SlideRenderContext } from '../types/presentation'

type UserCentricBridgeSlideProps = Pick<SlideRenderContext, 'isThumbnail'>

export function UserCentricBridgeSlide({
  isThumbnail = false,
}: UserCentricBridgeSlideProps = {}) {
  return (
    <article className="belief-statement-slide belief-statement-slide--v2">
      <div className="belief-statement-slide__copy">
        <p className="belief-statement-slide__eyebrow">In the AI era</p>
        <StepTextTransition
          animateOnMount={!isThumbnail}
          className="belief-statement-slide__headline"
          text={
            'The edge is defining your user,\ntheir problem, and solving it\nbetter with AI.'
          }
          variant="erase-type"
        />
      </div>
    </article>
  )
}
