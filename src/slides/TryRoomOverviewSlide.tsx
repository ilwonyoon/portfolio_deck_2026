const SCREENS = [
  {
    alt: 'Try in your room products first frame',
    caption: 'Products',
    src: '/media/try-room-overview/products.png',
  },
  {
    alt: 'Try in your room pro design first frame',
    caption: 'Pro Designs',
    src: '/media/try-room-overview/pro-designs.png',
  },
  {
    alt: 'Content style transfer first frame',
    caption: 'Content',
    src: '/media/try-room-overview/content-style-transfer.png',
  },
] as const

export function TryRoomOverviewSlide() {
  return (
    <article className="community-combined-slide">
      <section className="community-combined-slide__copy">
        <p className="community-combined-slide__eyebrow">Phase 01</p>
        <h1 className="community-combined-slide__title">Try in your room</h1>
        <p className="community-combined-slide__subtitle">
          <span>See it in your space.</span>
          <span>Decide with confidence.</span>
        </p>
      </section>

      <section
        aria-label="Try in your room screens"
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
