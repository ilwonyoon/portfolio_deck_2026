import { ContextDrawer } from '../components/ContextDrawer'

const SCREENS = [
  {
    caption: 'Save to Shared Collection',
    src: '/media/instagram-shared-collection/save-to-shared-collection.png',
  },
  {
    caption: 'Added to shared collection',
    src: '/media/instagram-shared-collection/added-to-shared-collection.png',
  },
  {
    caption: 'Shared Collection view',
    src: '/media/instagram-shared-collection/shared-collection-view.png',
  },
] as const

export function InstagramSharedCollectionSlide() {
  return (
    <article className="instagram-shared-slide" data-node-id="6530:73131">
      <section className="instagram-shared-slide__copy">
        <p className="instagram-shared-slide__eyebrow">Messenger/Direct</p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="instagram-shared-slide__title">
              IG Shared Collection
              <br />
              for close connections
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content instagram-shared-slide__drawer-content">
            <p>
              Let people create a shared collection to curate interested posts
              and reels in a shared folder.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section
        aria-label="IG Shared Collection screens"
        className="instagram-shared-slide__screens"
      >
        {SCREENS.map((screen) => (
          <figure className="instagram-shared-slide__screen-card" key={screen.caption}>
            <div className="instagram-shared-slide__media">
              <img
                alt=""
                className="instagram-shared-slide__image"
                src={screen.src}
              />
            </div>
            <figcaption className="instagram-shared-slide__caption">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </section>

      <p className="instagram-shared-slide__callout">Shared Collection</p>
      <div className="instagram-shared-slide__callout-line" />
    </article>
  )
}
