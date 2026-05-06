import { useEffect, useState } from 'react'
import { ContextDrawer } from '../components/ContextDrawer'

const SLIDES = [
  {
    src: '/media/persona-insideout/persona01.png',
    alt: 'Inside Out persona project — research artifact 1',
  },
  {
    src: '/media/persona-insideout/persona02.png',
    alt: 'Inside Out persona project — research artifact 2',
  },
  {
    src: '/media/persona-insideout/persona03.png',
    alt: 'Inside Out persona project — PCA variable contribution heatmap',
  },
  {
    src: '/media/persona-insideout/persona04.png',
    alt: 'Inside Out persona project — research artifact 4',
  },
  {
    src: '/media/persona-insideout/persona05.png',
    alt: 'Inside Out persona project — Easy content discovery insight with category data',
  },
] as const

const SLIDE_INTERVAL_MS = 4200

export function PersonaInsideOutSlide() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <article className="promptcue-demo-slide omakers-demo-slide persona-insideout-slide">
      <section className="promptcue-demo-slide__copy">
        <p className="promptcue-demo-slide__eyebrow">
          User-centric as a system
        </p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="promptcue-demo-slide__title">
              Persona — qualitative meets quantitative.
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content promptcue-demo-slide__drawer-content">
            <p>
              Cross-validated qualitative signals from O!Makers with behavioral
              data. 10 personas — HCPY, HCPN, LCPY. Not gut feeling, not data
              alone — both, together.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section
        aria-label="Inside Out persona project"
        className="promptcue-demo-slide__stage omakers-demo-slide__stage"
      >
        {SLIDES.map((slide, slideIndex) => (
          <img
            alt={slide.alt}
            aria-hidden={slideIndex === index ? undefined : true}
            className="omakers-demo-slide__image"
            data-active={slideIndex === index}
            key={slide.src}
            src={slide.src}
          />
        ))}
      </section>
    </article>
  )
}
