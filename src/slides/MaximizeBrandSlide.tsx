import { useEffect, useState } from 'react'
import { ContextDrawer } from '../components/ContextDrawer'

const SLIDES = [
  {
    src: '/media/maximize-brand/image-bot-01.png',
    badge: 'Image Bot',
    fit: 'cover',
    alt: 'Image Bot — category icon system',
  },
  {
    src: '/media/maximize-brand/image-bot-03.png',
    badge: 'Image Bot',
    fit: 'cover',
    alt: 'Image Bot — generation rules and references',
  },
  {
    src: '/media/maximize-brand/ux-writing-02.png',
    badge: 'UX Writing Bot',
    fit: 'contain',
    alt: 'UX Writing Bot — domain-specific generation example',
  },
  {
    src: '/media/maximize-brand/ux-writing-01.png',
    badge: 'UX Writing Bot',
    fit: 'contain',
    alt: 'UX Writing Bot — system asking target, goal, audience first',
  },
  {
    src: '/media/maximize-brand/ux-writing-03.png',
    badge: 'UX Writing Bot',
    fit: 'contain',
    alt: 'UX Writing Bot — Slack rollout and team adoption',
  },
] as const

const SLIDE_INTERVAL_MS = 4200

export function MaximizeBrandSlide() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <article className="promptcue-demo-slide omakers-demo-slide maximize-brand-slide">
      <section className="promptcue-demo-slide__copy">
        <p className="promptcue-demo-slide__eyebrow">
          Maximize with AI · Brand voice & visual system
        </p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="promptcue-demo-slide__title">
              AI turned guidelines into systems for writing and visuals.
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content promptcue-demo-slide__drawer-content">
            <p>
              UX Writing Bot and Image Bot turned guidelines into systems. One
              UX writer covered the whole company. One designer shipped 200+
              category icons in 2 weeks. Both tools spread voluntarily beyond
              their original teams.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section
        aria-label="Brand and visual system AI tooling"
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
