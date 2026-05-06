import { useEffect, useState } from 'react'
import { ContextDrawer } from '../components/ContextDrawer'

const SLIDES = [
  {
    src: '/media/maximize-eng/localization-01.jpg',
    badge: 'Localization Automation',
    fit: 'contain',
    alt: 'Localization automation — Figma plugin + n8n automation overview',
  },
  {
    src: '/media/maximize-eng/localization-02.jpg',
    badge: 'Localization Automation',
    fit: 'contain',
    alt: 'Localization automation — automated string ID flow and outcomes',
  },
] as const

const SLIDE_INTERVAL_MS = 4200

export function MaximizeEngineeringSlide() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <article className="promptcue-demo-slide omakers-demo-slide maximize-engineering-slide">
      <section className="promptcue-demo-slide__copy">
        <p className="promptcue-demo-slide__eyebrow">
          Maximize with AI · Engineering productivity
        </p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="promptcue-demo-slide__title">
              AI automated what sat between Figma and production.
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content promptcue-demo-slide__drawer-content">
            <p>
              Design-to-code with Shadcn + v0 rebuilt the design ↔ engineering
              workflow — Figma flagged it as a global best practice.
              Localization automation through a Figma plugin and n8n cut
              designer effort 8×. Repetition shrank, decisions grew.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section
        aria-label="Engineering productivity AI tooling"
        className="promptcue-demo-slide__stage omakers-demo-slide__stage"
      >
        {SLIDES.map((slide, slideIndex) => (
          <div
            aria-hidden={slideIndex === index ? undefined : true}
            className="omakers-demo-slide__image"
            data-active={slideIndex === index}
            data-fit={slide.fit}
            key={slide.src}
          >
            <img alt={slide.alt} src={slide.src} />
            <span className="maximize-slide__badge">{slide.badge}</span>
          </div>
        ))}
      </section>
    </article>
  )
}
