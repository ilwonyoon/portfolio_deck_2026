import { ContextDrawer } from '../components/ContextDrawer'

const SCREENS = [
  {
    caption: 'Sticker sheet',
    src: '/media/instagram-stories-add-yours/sticker-sheet.png',
  },
  {
    caption: 'Add Yours story',
    src: '/media/instagram-stories-add-yours/add-yours-story.png',
  },
  {
    caption: 'Participants sheet',
    src: '/media/instagram-stories-add-yours/participants-sheet.png',
  },
] as const

export function InstagramStoriesAddYoursSlide() {
  return (
    <article className="instagram-stories-slide" data-node-id="6530:73110">
      <section className="instagram-stories-slide__copy">
        <p className="instagram-stories-slide__eyebrow">Instagram Stories</p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="instagram-stories-slide__title">
              Add Yours Sticker
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content instagram-stories-slide__drawer-content">
            <p>
              Initiated the concept, formed a V-team, and partnered with IG
              Story Studio to launch an interactive sticker that helped people
              invite participation directly from Stories.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section
        aria-label="Instagram Stories Add Yours Sticker screens"
        className="instagram-stories-slide__screens"
      >
        {SCREENS.map((screen) => (
          <figure className="instagram-stories-slide__screen-card" key={screen.caption}>
            <div className="instagram-stories-slide__media">
              <img
                alt=""
                className="instagram-stories-slide__image"
                src={screen.src}
              />
            </div>
            <figcaption className="instagram-stories-slide__caption">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </section>
    </article>
  )
}
