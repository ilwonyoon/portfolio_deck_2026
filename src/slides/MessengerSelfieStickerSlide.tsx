import { ContextDrawer } from '../components/ContextDrawer'

const SCREENS = [
  {
    caption: 'Sticker composer',
    mp4: '/media/messenger-selfie-sticker/selfie-composer.mp4',
    poster: '/media/messenger-selfie-sticker/selfie-composer-poster.png',
    webm: '/media/messenger-selfie-sticker/selfie-composer.webm',
  },
  {
    caption: 'Selfie sticker',
    mp4: '/media/messenger-selfie-sticker/selfie-result.mp4',
    poster: '/media/messenger-selfie-sticker/selfie-result-poster.png',
    webm: '/media/messenger-selfie-sticker/selfie-result.webm',
  },
] as const

export function MessengerSelfieStickerSlide() {
  return (
    <article className="messenger-selfie-slide" data-node-id="6510:72926">
      <section className="messenger-selfie-slide__copy">
        <p className="messenger-selfie-slide__eyebrow">Messenger</p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="messenger-selfie-slide__title">Selfie Sticker</h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content messenger-selfie-slide__drawer-content">
            <p>
              Let people turn their own face into a looping sticker with AR
              masks, making lightweight replies feel more personal and
              expressive.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section
        aria-label="Messenger Selfie Sticker screens"
        className="messenger-selfie-slide__screens"
      >
        {SCREENS.map((screen) => (
          <figure className="messenger-selfie-slide__screen-card" key={screen.caption}>
            <div className="messenger-selfie-slide__media">
              <video
                autoPlay
                className="messenger-selfie-slide__video"
                loop
                muted
                playsInline
                poster={screen.poster}
              >
                <source src={screen.webm} type="video/webm" />
                <source src={screen.mp4} type="video/mp4" />
              </video>
            </div>
            <figcaption className="messenger-selfie-slide__caption">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </section>
    </article>
  )
}
