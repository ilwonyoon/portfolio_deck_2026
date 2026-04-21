import { ProposalBadge } from '../components/ProposalBadge'

export function OhouseJourneyPartASlide() {
  return (
    <article className="ohouse-journey-slide ohouse-journey-slide--part-a">
      <ProposalBadge />

      <div className="ohouse-journey-slide__copy ohouse-journey-slide__copy--part-a">
        <p className="ohouse-journey-slide__copy-block">
          <span>In 2023, tried expanding the journey —</span>
          <span>before and after the move. Real estate,</span>
          <span>remodeling, lifestyle, and more.</span>
        </p>

        <p className="ohouse-journey-slide__copy-block">
          <span>Revenue kept growing, losses narrowed.</span>
          <span>MAU stalled. Most importantly,</span>
          <span>JTBD didn&apos;t shift.</span>
        </p>
      </div>
    </article>
  )
}
