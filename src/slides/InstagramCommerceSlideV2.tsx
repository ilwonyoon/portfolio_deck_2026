import { ContextDrawer } from '../components/ContextDrawer'
import { DeckVideo } from '../components/DeckVideo'

const SCREENS = [
  {
    caption: 'IG Story sticker sheet',
    mp4: '/media/instagram-commerce/story-sticker.mp4',
    webm: '/media/instagram-commerce/story-sticker.webm',
  },
  {
    caption: 'Add Yours stories',
    src: '/media/instagram-commerce/add-yours-stories.png',
  },
  {
    caption: 'Participant sheet',
    src: '/media/instagram-commerce/participants-sheet.png',
  },
] as const

export function InstagramCommerceSlideV2() {
  return (
    <article
      className="instagram-commerce-slide instagram-commerce-slide--v2"
      data-node-id="6510:72942"
    >
      <section className="instagram-commerce-slide__copy">
        <p className="instagram-commerce-slide__eyebrow">Instagram Commerce</p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="instagram-commerce-slide__title">
              Product tagging in
              <br />
              previous posts
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content instagram-commerce-slide__drawer-content">
            <p>
              Instead of asking producers to create new media, we turned
              existing creator posts into shoppable entry points by letting
              them tag products from content they had already made.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section className="instagram-commerce-slide__screens" aria-label="Instagram commerce screens">
        {SCREENS.map((screen) => (
          <figure className="instagram-commerce-slide__screen-card" key={screen.caption}>
            <div className="instagram-commerce-slide__media">
              {'webm' in screen ? (
                <DeckVideo
                  className="instagram-commerce-slide__video"
                  mp4={screen.mp4}
                  poster="/media/instagram-commerce/story-sticker-poster.png"
                  webm={screen.webm}
                />
              ) : (
                <img
                  alt=""
                  className="instagram-commerce-slide__image"
                  src={screen.src}
                />
              )}
            </div>
            <figcaption className="instagram-commerce-slide__caption">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </section>
    </article>
  )
}
