import { ContextDrawer } from '../components/ContextDrawer'

export function SteerDemoSlide() {
  return (
    <article className="promptcue-demo-slide steer-demo-slide">
      <section className="promptcue-demo-slide__copy">
        <p className="promptcue-demo-slide__eyebrow">Steer</p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="promptcue-demo-slide__title">
              The decision surface
              <br />
              for your AI agents.
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content promptcue-demo-slide__drawer-content">
            <p>
              Steer surfaces only the moments your AI agents need a human —
              one card per stop event. Answer from Mac or iPhone, agent
              resumes. Built for people who direct AI without reading every
              diff.
            </p>
          </div>
        </ContextDrawer>
        <span className="promptcue-demo-slide__body-link">Available on Mac and iOS</span>
      </section>

      <section
        aria-label="Steer placeholder"
        className="promptcue-demo-slide__stage steer-demo-slide__stage"
      />
    </article>
  )
}
