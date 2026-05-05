const JOURNEY_ROWS = [
  { label: 'Real estate' },
  { label: 'Remodeling' },
  { label: 'The move', isCurrent: true },
  { label: 'Post-move' },
] as const

export function OhouseJourneyPartBSlide() {
  return (
    <article className="ohouse-journey-slide ohouse-journey-slide--part-b">
      <div className="ohouse-journey-slide__copy ohouse-journey-slide__copy--part-b">
        <p className="ohouse-journey-slide__copy-block ohouse-journey-slide__copy-block--emphasis">
          <span>So we went back to what we do best.</span>
          <span className="ohouse-journey-slide__underline">
            Content around the move.
          </span>
        </p>
      </div>

      <div className="ohouse-journey-slide__content-area">
        <div className="ohouse-journey-slide__rail">
          <span className="ohouse-journey-slide__rail-line" />
        </div>

        <div className="ohouse-journey-slide__journey">
          <p className="ohouse-journey-slide__eyebrow">User journey</p>

          {JOURNEY_ROWS.map((row) => (
            <div
              className={
                'isCurrent' in row && row.isCurrent
                  ? 'ohouse-journey-slide__journey-row ohouse-journey-slide__journey-row--current'
                  : 'ohouse-journey-slide__journey-row'
              }
              key={row.label}
            >
              <span
                aria-hidden="true"
                className={
                  'isCurrent' in row && row.isCurrent
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
