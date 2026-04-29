const SCREENS = [
  {
    alt: 'Interior Q&A screen',
    caption: 'Interior Q&A',
    src: '/media/community-story/screen-01.png',
  },
  {
    alt: 'Matched questions screen',
    caption: 'Matched questions',
    src: '/media/community-story/screen-03.png',
  },
  {
    alt: 'Community feed screen',
    caption: 'Community feed',
    src: '/media/community-story/screen-05.png',
  },
] as const

export function CommunityCombinedSlide() {
  return (
    <article className="community-combined-slide">
      <section className="community-combined-slide__copy">
        <p className="community-combined-slide__eyebrow">Project 03 / 03</p>
        <h1 className="community-combined-slide__title">Community</h1>
        <p className="community-combined-slide__subtitle">
          <span>Connect people who've done it</span>
          <span>with people who want to.</span>
        </p>
      </section>

      <section
        aria-label="Community screens"
        className="community-combined-slide__screens"
      >
        {SCREENS.map((screen) => (
          <figure
            className="community-combined-slide__screen-card"
            key={screen.caption}
          >
            <div className="community-combined-slide__media">
              <img
                alt={screen.alt}
                className="community-combined-slide__image"
                draggable={false}
                src={screen.src}
              />
            </div>
            <figcaption className="community-combined-slide__caption">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </section>
    </article>
  )
}
