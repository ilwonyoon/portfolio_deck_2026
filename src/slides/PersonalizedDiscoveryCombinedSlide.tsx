const SCREENS = [
  {
    alt: 'Interest profiling onboarding screen',
    caption: 'Interest profiling',
    src: '/media/discovery-foundation-intro.png',
  },
  {
    alt: 'Personalized For You feed',
    caption: 'For You',
    src: '/media/discovery-foundation-browse.png',
  },
  {
    alt: 'Discover feed tailored to similar users',
    caption: 'Discover',
    src: '/media/discovery-foundation-discover.png',
  },
] as const

export function PersonalizedDiscoveryCombinedSlide() {
  return (
    <article className="personalized-discovery-combined-slide">
      <section className="personalized-discovery-combined-slide__copy">
        <p className="personalized-discovery-combined-slide__eyebrow">
          Project 01 / 03
        </p>
        <h1 className="personalized-discovery-combined-slide__title">
          Personalized
          <br />
          Discovery
        </h1>
        <p className="personalized-discovery-combined-slide__subtitle">
          <span>Find content that fits your home</span>
          <span>not just what's popular.</span>
        </p>
      </section>

      <section
        aria-label="Personalized Discovery screens"
        className="personalized-discovery-combined-slide__screens"
      >
        {SCREENS.map((screen) => (
          <figure
            className="personalized-discovery-combined-slide__screen-card"
            key={screen.caption}
          >
            <div className="personalized-discovery-combined-slide__media">
              <img
                alt={screen.alt}
                className="personalized-discovery-combined-slide__image"
                draggable={false}
                src={screen.src}
              />
            </div>
            <figcaption className="personalized-discovery-combined-slide__caption">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </section>
    </article>
  )
}
