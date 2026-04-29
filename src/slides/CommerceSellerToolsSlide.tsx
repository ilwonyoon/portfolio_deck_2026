import { ContextDrawer } from '../components/ContextDrawer'

const SCREENS = [
  {
    caption: 'Professional Home',
    src: '/media/commerce-seller/professional-home.png',
  },
  {
    caption: 'UGC library',
    src: '/media/commerce-seller/ugc-grid.png',
  },
  {
    caption: 'Media filters',
    src: '/media/commerce-seller/media-filter.png',
  },
] as const

export function CommerceSellerToolsSlide() {
  return (
    <article className="commerce-seller-slide" data-node-id="6530:73092">
      <section className="commerce-seller-slide__copy">
        <p className="commerce-seller-slide__eyebrow">Instagram Commerce</p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="commerce-seller-slide__title">
              Seller UGC tools
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content commerce-seller-slide__drawer-content">
            <p>
              Meet sellers where they already work. Give them a mobile surface
              to review, filter, and feature UGC at scale while tracking
              performance.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section
        aria-label="Commerce seller UGC management screens"
        className="commerce-seller-slide__screens"
      >
        {SCREENS.map((screen) => (
          <figure className="commerce-seller-slide__screen-card" key={screen.caption}>
            <div className="commerce-seller-slide__media">
              <img
                alt=""
                className="commerce-seller-slide__image"
                src={screen.src}
              />
            </div>
            <figcaption className="commerce-seller-slide__caption">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </section>
    </article>
  )
}
