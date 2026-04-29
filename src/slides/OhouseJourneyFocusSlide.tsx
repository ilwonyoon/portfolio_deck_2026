import { ProposalBadge } from '../components/ProposalBadge'

type OhouseJourneyFocusSlideProps = {
  step: number
}

const JOURNEY_ROWS = [
  { label: 'Real estate', mode: 'expansion' },
  { label: 'Remodel', mode: 'expansion' },
  { label: 'The move', mode: 'focus' },
  { label: 'Post-move', mode: 'expansion' },
] as const

export function OhouseJourneyFocusSlide({ step }: OhouseJourneyFocusSlideProps) {
  const focusMode = step >= 1 ? 'move' : 'expansion'

  return (
    <article className="ohouse-journey-focus-slide" data-focus-mode={focusMode}>
      <ProposalBadge label="Option · 2-step" />

      <div className="ohouse-journey-focus-slide__copy">
        <p
          className="ohouse-journey-focus-slide__copy-block"
          data-active={focusMode === 'expansion'}
        >
          In 2023, tried expanding the journey — before and after the move. Real
          estate, remodeling, lifestyle, and more.
        </p>

        <p
          className="ohouse-journey-focus-slide__copy-block"
          data-active={focusMode === 'expansion'}
        >
          Revenue kept growing, losses narrowed. MAU stalled. Most importantly,
          JTBD didn&apos;t shift.
        </p>

        <p
          className="ohouse-journey-focus-slide__copy-block"
          data-active={focusMode === 'move'}
        >
          So we went back to what we do best. Content around the move.
        </p>
      </div>

      <div className="ohouse-journey-focus-slide__content-area">
        <div className="ohouse-journey-focus-slide__journey">
          <p className="ohouse-journey-focus-slide__eyebrow">User journey</p>

          {JOURNEY_ROWS.map((row) => {
            const isActive =
              focusMode === 'expansion'
                ? row.mode === 'expansion'
                : row.mode === 'focus'

            return (
              <div
                className="ohouse-journey-focus-slide__journey-row"
                data-active={isActive}
                key={row.label}
              >
                <p className="ohouse-journey-focus-slide__journey-label">
                  {row.label}
                </p>
              </div>
            )
          })}
        </div>

        <div className="ohouse-journey-focus-slide__rail" aria-hidden="true">
          <span className="ohouse-journey-focus-slide__rail-line" />
          {JOURNEY_ROWS.map((row) => {
            const isActive =
              focusMode === 'expansion'
                ? row.mode === 'expansion'
                : row.mode === 'focus'

            return (
              <span
                className="ohouse-journey-focus-slide__dot"
                data-active={isActive}
                key={row.label}
              />
            )
          })}
        </div>
      </div>
    </article>
  )
}
