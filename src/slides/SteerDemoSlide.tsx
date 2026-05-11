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
              Stop watching agents work.
              <br />
              Just answer when they need you.
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content promptcue-demo-slide__drawer-content">
            <p>
              Steer is a macOS-first card stack that surfaces only the moments
              your CLI agents — Claude Code, Codex, Gemini — actually need a
              human. Sessions keep running off-screen; you steer three at once
              instead of babysitting one.
            </p>
          </div>
        </ContextDrawer>
        <span className="promptcue-demo-slide__body-link">Coming soon for macOS</span>
      </section>

      <section
        aria-label="Steer placeholder"
        className="promptcue-demo-slide__stage steer-demo-slide__stage"
      />
    </article>
  )
}
