import { ContextDrawer } from '../components/ContextDrawer'

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
        <p className="saveback-demo-slide__link">
          Available for iOS TestFlight
        </p>
      </section>

      <section
        aria-label="SaveBack demo video"
        className="saveback-demo-slide__stage"
      >
        <video
          autoPlay
          className="saveback-demo-slide__video"
          loop
          muted
          playsInline
          poster="/media/saveback/saveback-poster.jpg"
        >
          <source src="/media/saveback/saveback-demo.webm" type="video/webm" />
          <source src="/media/saveback/saveback-demo.mp4" type="video/mp4" />
        </video>
      </section>
    </article>
  )
}
