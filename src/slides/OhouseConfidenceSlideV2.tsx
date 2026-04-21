import { ProposalBadge } from '../components/ProposalBadge'

export function OhouseConfidenceSlideV2() {
  return (
    <article className="ohouse-confidence-slide">
      <ProposalBadge />
      <div className="ohouse-confidence-slide__copy">
        <p>
          Content shows how products look in real homes —{' '}
          <span className="ohouse-confidence-slide__underline">
            that&apos;s what drives purchase.
          </span>
        </p>
      </div>

      <div className="ohouse-confidence-slide__images">
        <img
          alt=""
          aria-hidden="true"
          className="ohouse-confidence-slide__image ohouse-confidence-slide__image--detail"
          draggable={false}
          src="/media/ohouse-confidence-detail.png"
        />
        <img
          alt=""
          aria-hidden="true"
          className="ohouse-confidence-slide__image ohouse-confidence-slide__image--styled"
          draggable={false}
          src="/media/ohouse-confidence-styled.png"
        />
      </div>
    </article>
  )
}
