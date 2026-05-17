import { useEffect, useMemo, useRef, useState } from 'react'
import { ContextDrawer } from '../components/ContextDrawer'
import { DeckVideo } from '../components/DeckVideo'
import type { SlideRenderContext } from '../types/presentation'

const DEMOS = [
  {
    id: 'mac',
    label: 'Mac',
    webm: '/media/steer-demo-left.webm',
    mp4: '/media/steer-demo-left.mp4',
    poster: '/posters/steer-demo-left-poster.jpg',
  },
  {
    id: 'ios',
    label: 'iOS',
    webm: '/media/steer-demo-ios.webm',
    mp4: '/media/steer-demo-ios.mp4',
    poster: '/posters/steer-demo-ios-poster.jpg',
  },
] as const

export function SteerDemoSlide({ isThumbnail = false }: Partial<SlideRenderContext> = {}) {
  const [activeId, setActiveId] = useState<(typeof DEMOS)[number]['id']>(DEMOS[0].id)
  const videoRef = useRef<HTMLVideoElement>(null)
  const activeDemo = useMemo(
    () => DEMOS.find((demo) => demo.id === activeId) ?? DEMOS[0],
    [activeId],
  )

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    video.currentTime = 0
    void video.play().catch(() => {})
  }, [activeDemo.mp4])

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
        aria-label={`Steer ${activeDemo.label} demo`}
        className={`promptcue-demo-slide__stage steer-demo-slide__stage steer-demo-slide__stage--${activeDemo.id}`}
      >
        <DeckVideo
          className="steer-demo-slide__video"
          isThumbnail={isThumbnail}
          key={activeDemo.mp4}
          mp4={activeDemo.mp4}
          poster={activeDemo.poster}
          ref={videoRef}
          webm={activeDemo.webm}
        />
      </section>

      <div className="promptcue-demo-slide__chips" aria-label="Steer demos">
        {DEMOS.map((demo) => (
          <button
            aria-pressed={demo.id === activeId}
            className="promptcue-demo-slide__chip"
            key={demo.id}
            onClick={() => setActiveId(demo.id)}
            type="button"
          >
            {demo.label}
          </button>
        ))}
      </div>
    </article>
  )
}
