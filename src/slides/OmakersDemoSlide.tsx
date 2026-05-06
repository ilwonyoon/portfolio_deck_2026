import { useEffect, useState } from 'react'
import { ContextDrawer } from '../components/ContextDrawer'

const SLIDES = [
  {
    src: '/media/omakers/omakers01.png',
    alt: 'O!Makers Slack channel — designer asking 4기 panel a quick question with attached screens',
  },
  {
    src: '/media/omakers/omakers02.png',
    alt: 'O!Makers Slack channel — follow-up question with prototype video and panel responses',
  },
  {
    src: '/media/omakers/omakers03.png',
    alt: 'O!Makers — additional panel interaction',
  },
] as const

const SLIDE_INTERVAL_MS = 4200

export function OmakersDemoSlide() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <article className="promptcue-demo-slide omakers-demo-slide">
      <section className="promptcue-demo-slide__copy">
        <p className="promptcue-demo-slide__eyebrow">
          User-centric as a system
        </p>
        <ContextDrawer
          showHint={false}
          title={
            <h1 className="promptcue-demo-slide__title">
              O!Makers — talk to 100 users, today.
            </h1>
          }
          variant="dot"
        >
          <div className="context-drawer__content promptcue-demo-slide__drawer-content">
            <p>
              100 panel members. 70% participation. Any question, same day, in
              minutes. 60+ session recordings per week. 3,860 insights in 7
              months. Recruiting 7 days → same day.
            </p>
          </div>
        </ContextDrawer>
      </section>

      <section
        aria-label="O!Makers in action"
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
