import { StepTextTransition } from '../components/StepTextTransition'

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
  const copy =
    focusMode === 'move'
      ? 'So we went back to what we do best. Content\naround the move.'
      : "In 2023, tried expanding the journey — before\nand after the move. Real estate, remodeling,\nlifestyle, and more.\n\nRevenue kept growing, losses narrowed. MAU\nstalled. Most importantly, JTBD didn't shift."

  return (
    <article className="ohouse-journey-poster-slide" data-focus-mode={focusMode}>
      <div className="ohouse-journey-poster-slide__copy-anchor">
        <StepTextTransition
          animateOnMount={false}
          className="ohouse-journey-poster-slide__copy"
          text={copy}
          variant="crossfade"
        />
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
