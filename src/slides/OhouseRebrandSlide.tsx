import { ContextDrawer } from '../components/ContextDrawer'
import { DeckVideo } from '../components/DeckVideo'

export function OhouseRebrandSlide() {
  return (
    <article className="promptcue-demo-slide ohouse-rebrand-slide">
      <section className="promptcue-demo-slide__copy">
        <p className="promptcue-demo-slide__eyebrow">Ohouse</p>
        <ContextDrawer
          showHint={false}
          title={<h1 className="promptcue-demo-slide__title">Rebranding</h1>}
          variant="dot"
        >
          <div className="context-drawer__content promptcue-demo-slide__drawer-content">
            <p>
              Led Ohouse's first rebrand in 10 years through the brand design team —
              defining the company's visual language, tone of voice, and behavioral principles
              from the ground up.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section className="promptcue-demo-slide__stage" aria-label="Ohouse Rebranding">
        <DeckVideo
          className="promptcue-demo-slide__video"
          mp4="/media/ohouse-rebrand.mp4"
          webm="/media/ohouse-rebrand.webm"
          poster="/media/ohouse-rebrand-poster.jpg"
        />
      </section>
    </article>
  )
}
