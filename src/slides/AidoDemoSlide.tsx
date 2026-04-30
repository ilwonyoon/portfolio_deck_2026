import { ContextDrawer } from '../components/ContextDrawer'

export function AidoDemoSlide() {
  return (
    <article className="aido-demo-slide">
      <section className="aido-demo-slide__copy">
        <p className="aido-demo-slide__eyebrow">AIDO</p>
        <ContextDrawer
          showHint={false}
          title={<h1 className="aido-demo-slide__title">AI design opportunities</h1>}
          variant="dot"
        >
          <div className="context-drawer__content aido-demo-slide__drawer-content">
            <p>
              Understand the AI companies shaping the market. Read deep-dive
              insights, track open roles, decode product and design
              opportunities, and find where your next move makes sense.
            </p>
          </div>
        </ContextDrawer>
        <a
          className="aido-demo-slide__link"
          href="https://aido-d2cc0.web.app/"
          rel="noreferrer"
          target="_blank"
        >
          Visit AIDO
        </a>
      </section>

      <section className="aido-demo-slide__stage" aria-label="AIDO demo video">
        <video
          autoPlay
          className="aido-demo-slide__video"
          loop
          muted
          playsInline
          poster="/media/aido/aido-poster.jpg"
        >
          <source src="/media/aido/aido.webm" type="video/webm" />
          <source src="/media/aido/aido.mp4" type="video/mp4" />
        </video>
      </section>
    </article>
  )
}
