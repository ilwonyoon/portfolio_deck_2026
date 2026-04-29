const SCREENS = [
  {
    alt: 'Creator onboarding screen',
    caption: 'Creator Onboarding',
    src: '/media/content-growth/col1.png',
  },
  {
    alt: 'Creator dashboard screen',
    caption: 'Creator Dashboard',
    src: '/media/content-growth/col2.png',
  },
  {
    alt: 'Creator program screen',
    caption: 'Creator Program',
    src: '/media/content-growth/col3.png',
  },
] as const

export function CreatorEconomyCombinedSlide() {
  return (
    <article className="creator-economy-combined-slide">
      <section className="creator-economy-combined-slide__copy">
        <p className="creator-economy-combined-slide__eyebrow">
          Project 02 / 03
        </p>
        <h1 className="creator-economy-combined-slide__title">
          Creator
          <br />
          Economy
        </h1>
        <p className="creator-economy-combined-slide__subtitle">
          <span>You don't need a new home</span>
          <span>to be a creator.</span>
        </p>
      </section>

      <section
        aria-label="Creator Economy screens"
        className="creator-economy-combined-slide__screens"
      >
        {SCREENS.map((screen) => (
          <figure
            className="creator-economy-combined-slide__screen-card"
            key={screen.caption}
          >
            <div className="creator-economy-combined-slide__media">
              <img
                alt={screen.alt}
                className="creator-economy-combined-slide__image"
                draggable={false}
                src={screen.src}
              />
            </div>
            <figcaption className="creator-economy-combined-slide__caption">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </section>
    </article>
  )
}
