import { ProposalBadge } from '../components/ProposalBadge'

type OhouseJourneyPosterSlideProps = {
  step: number
}

const JOURNEY_ROWS = [
  {
    image: '/media/journey-poster/panels/real-estate.png',
    label: 'Real estate',
    mode: 'expansion',
    number: '01',
  },
  {
    image: '/media/journey-poster/panels/remodel.png',
    label: 'Remodel',
    mode: 'expansion',
    number: '02',
  },
  {
    image: '/media/journey-poster/panels/the-move.png',
    label: 'The move',
    mode: 'focus',
    number: '03',
  },
  {
    image: '/media/journey-poster/panels/post-move.png',
    label: 'Post-move',
    mode: 'expansion',
    number: '04',
  },
] as const

export function OhouseJourneyPosterSlide({
  step,
}: OhouseJourneyPosterSlideProps) {
  const focusMode = step >= 1 ? 'move' : 'expansion'

  return (
    <article className="ohouse-journey-poster-slide" data-focus-mode={focusMode}>
      <ProposalBadge label="Option · Image poster" />

      <div className="ohouse-journey-poster-slide__copy">
        <p
          className="ohouse-journey-poster-slide__copy-block"
          data-active={focusMode === 'expansion'}
        >
          In 2023, tried expanding the journey — before and after the move. Real
          estate, remodeling, lifestyle, and more.
        </p>

        <p
          className="ohouse-journey-poster-slide__copy-block"
          data-active={focusMode === 'expansion'}
        >
          Revenue kept growing, losses narrowed. MAU stalled. Most importantly,
          JTBD didn&apos;t shift.
        </p>

        <p
          className="ohouse-journey-poster-slide__copy-block"
          data-active={focusMode === 'move'}
        >
          So we went back to what we do best. Content around the move.
        </p>
      </div>

      <section
        aria-label="User journey poster"
        className="ohouse-journey-poster-slide__stage"
      >
        <p className="ohouse-journey-poster-slide__eyebrow">User journey</p>

        <div className="ohouse-journey-poster-slide__rows">
          {JOURNEY_ROWS.map((row) => {
            const isActive =
              focusMode === 'expansion'
                ? row.mode === 'expansion'
                : row.mode === 'focus'

            return (
              <figure
                className="ohouse-journey-poster-slide__row"
                data-active={isActive}
                data-mode={row.mode}
                key={row.label}
              >
                <img
                  alt=""
                  className="ohouse-journey-poster-slide__image"
                  draggable={false}
                  src={row.image}
                />
                <figcaption className="ohouse-journey-poster-slide__label">
                  <span className="ohouse-journey-poster-slide__number">
                    {row.number}
                  </span>
                  <span>{row.label}</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </section>
    </article>
  )
}
