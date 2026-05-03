import { ContextDrawer } from '../components/ContextDrawer'
import { DeckVideo } from '../components/DeckVideo'

export function SaveBackDemoSlide() {
  return (
    <article className="saveback-demo-slide">
      <section className="saveback-demo-slide__copy">
        <p className="saveback-demo-slide__eyebrow">SaveBack</p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="saveback-demo-slide__title">
              Turn saved fixes
              <br />
              into daily routines
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content saveback-demo-slide__drawer-content">
            <p>
              SaveBack turns saved YouTube stretches and mobility videos into a
              small routine you can actually do every day.
            </p>
          </div>
        </ContextDrawer>
        <p className="saveback-demo-slide__link">Available on App Store</p>
      </section>

      <section
        aria-label="SaveBack demo video"
        className="saveback-demo-slide__stage"
      >
        <DeckVideo
          className="saveback-demo-slide__video"
          mp4="/media/saveback/saveback-demo.mp4"
          poster="/media/saveback/saveback-poster.jpg"
          webm="/media/saveback/saveback-demo.webm"
        />
      </section>
    </article>
  )
}
