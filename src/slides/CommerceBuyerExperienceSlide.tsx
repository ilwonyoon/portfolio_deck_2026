import { ContextDrawer } from '../components/ContextDrawer'

const SCREENS = [
  {
    caption: 'Product detail',
    mp4: '/media/commerce-buyer/pdp.mp4',
    webm: '/media/commerce-buyer/pdp.webm',
  },
  {
    caption: 'UGC and reviews',
    crop: 'tall',
    src: '/media/commerce-buyer/ugc-reviews.png',
  },
  {
    caption: 'Shopper proof',
    src: '/media/commerce-buyer/shopper-proof.png',
  },
] as const

export function CommerceBuyerExperienceSlide() {
  return (
    <article className="commerce-buyer-slide" data-node-id="5002:1108">
      <section className="commerce-buyer-slide__copy">
        <p className="commerce-buyer-slide__eyebrow">Instagram Commerce</p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="commerce-buyer-slide__title">
              UGC in the PDP
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content commerce-buyer-slide__drawer-content">
            <p>
              Bring creator posts and reviews into the PDP so buyers could
              evaluate fit, quality, and social proof without leaving the
              purchase path.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section
        aria-label="Commerce buyer experience screens"
        className="commerce-buyer-slide__screens"
      >
        {SCREENS.map((screen) => (
          <figure className="commerce-buyer-slide__screen-card" key={screen.caption}>
            <div className="commerce-buyer-slide__media">
              {'webm' in screen ? (
                <video
                  autoPlay
                  className="commerce-buyer-slide__video"
                  loop
                  muted
                  playsInline
                  poster="/media/commerce-buyer/pdp-poster.png"
                >
                  <source src={screen.webm} type="video/webm" />
                  <source src={screen.mp4} type="video/mp4" />
                </video>
              ) : (
                <img
                  alt=""
                  className={[
                    'commerce-buyer-slide__image',
                    'crop' in screen && screen.crop === 'tall'
                      ? 'commerce-buyer-slide__image--tall'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  src={screen.src}
                />
              )}
            </div>
            <figcaption className="commerce-buyer-slide__caption">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </section>
    </article>
  )
}
