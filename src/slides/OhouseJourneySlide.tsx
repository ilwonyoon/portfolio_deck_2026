const JOURNEY_ROWS = [
  {
    className: 'ohouse-journey-slide__journey-row',
    label: 'Real estate',
    nodeId: '6041:24616',
  },
  {
    className: 'ohouse-journey-slide__journey-row',
    label: 'Remodeling',
    nodeId: '6041:24605',
  },
  {
    className:
      'ohouse-journey-slide__journey-row ohouse-journey-slide__journey-row--current',
    label: 'The move',
    nodeId: '6041:24597',
  },
  {
    className: 'ohouse-journey-slide__journey-row',
    label: 'Post-move',
    nodeId: '6041:24598',
  },
] as const

export function OhouseJourneySlide() {
  return (
    <article className="ohouse-journey-slide" data-node-id="6041:24590">
      <div className="ohouse-journey-slide__copy" data-node-id="6041:24591">
        <p className="ohouse-journey-slide__copy-block">
          <span>In 2023, tried expanding the journey —</span>
          <span>before and after the move. Real estate,</span>
          <span>remodeling, lifestyle, and more.</span>
        </p>

        <p className="ohouse-journey-slide__copy-block">
          <span>Revenue kept growing, losses</span>
          <span>narrowed. MAU stalled.</span>
          <span>Most importantly, JTBD didn&apos;t shift.</span>
        </p>

        <p className="ohouse-journey-slide__copy-block ohouse-journey-slide__copy-block--emphasis">
          <span>So we went back to what we do best.</span>
          <span className="ohouse-journey-slide__underline">
            Content around the move.
          </span>
        </p>
      </div>

      <div className="ohouse-journey-slide__content-area" data-node-id="6041:24594">
        <div className="ohouse-journey-slide__rail" data-node-id="6041:24615">
          <span className="ohouse-journey-slide__rail-line" />
        </div>

        <div className="ohouse-journey-slide__journey" data-node-id="6041:24606">
          <p className="ohouse-journey-slide__eyebrow" data-node-id="6041:24599">
            User journey
          </p>

          {JOURNEY_ROWS.map((row) => (
            <div className={row.className} data-node-id={row.nodeId} key={row.label}>
              <span
                aria-hidden="true"
                className={
                  row.label === 'The move'
                    ? 'ohouse-journey-slide__dot ohouse-journey-slide__dot--large'
                    : 'ohouse-journey-slide__dot'
                }
              />
              <p className="ohouse-journey-slide__journey-label">{row.label}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
