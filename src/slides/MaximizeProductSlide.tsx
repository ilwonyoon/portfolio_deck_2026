import { useEffect, useState } from 'react'
import { ContextDrawer } from '../components/ContextDrawer'

const SLIDES = [
  {
    src: '/media/maximize-product/image-to-3d.png',
    badge: 'Image to 3D',
    fit: 'contain',
    alt: 'Image to 3D — 3D model unit cost down 97%, volume up 16×',
  },
  {
    src: '/media/maximize-product/pseo-01.png',
    badge: 'pSEO',
    fit: 'contain',
    alt: 'pSEO — intent / template / data architecture',
  },
  {
    src: '/media/maximize-product/pseo-02.png',
    badge: 'pSEO',
    fit: 'contain',
    alt: 'pSEO — 50,000+ pages launched with 12× organic session over paid',
  },
] as const

const SLIDE_INTERVAL_MS = 4200

export function MaximizeProductSlide() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <article className="promptcue-demo-slide omakers-demo-slide maximize-product-slide">
      <section className="promptcue-demo-slide__copy">
        <p className="promptcue-demo-slide__eyebrow">
          Maximize with AI · Product impact
        </p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="promptcue-demo-slide__title">
              AI moved the metric, not just the velocity.
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content promptcue-demo-slide__drawer-content">
            <p>
              Image to 3D cut model cost 97%. Room Planner and AR scaled —
              revenue +28%. pSEO shipped 50,000 pages, 12× organic session over
              paid.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section
        aria-label="Product impact AI initiatives"
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
