import { useEffect, useMemo, useRef, useState } from 'react'
import { ContextDrawer } from '../components/ContextDrawer'

const DEMOS = [
  {
    id: 'memory',
    eyebrow: 'Backtick',
    label: 'Thought staging app',
    title: 'Shared memory for AI agents',
    body: 'Backtick turns scattered thoughts and decisions into reusable context your AI tools can read through MCP.',
    linkLabel: 'Available for MacOS',
    linkUrl: 'https://github.com/ilwonyoon/Backtick',
    video: '/media/promptcue/universal-memory.mp4',
    poster: '/media/promptcue/universal-memory-poster.png',
  },
] as const

export function PromptCueDemoSlide() {
  const [activeId, setActiveId] = useState<(typeof DEMOS)[number]['id']>(
    DEMOS[0].id,
  )
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
  }, [activeDemo.video])

  return (
    <article className="promptcue-demo-slide">
      <section className="promptcue-demo-slide__copy">
        <p className="promptcue-demo-slide__eyebrow">{activeDemo.eyebrow}</p>
        <ContextDrawer
          showHint={false}
          title={<h1 className="promptcue-demo-slide__title">{activeDemo.title}</h1>}
          variant="dot"
        >
          <div className="context-drawer__content promptcue-demo-slide__drawer-content">
            <p>{activeDemo.body}</p>
          </div>
        </ContextDrawer>
        <a
          className="promptcue-demo-slide__body-link"
          href={activeDemo.linkUrl}
          rel="noreferrer"
          target="_blank"
        >
          {activeDemo.linkLabel}
        </a>

        {DEMOS.length > 1 && (
          <div className="promptcue-demo-slide__chips" aria-label="Backtick demos">
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
        )}
      </section>

      <section className="promptcue-demo-slide__stage" aria-label={activeDemo.title}>
        <video
          autoPlay
          className="promptcue-demo-slide__video"
          key={activeDemo.video}
          loop
          muted
          playsInline
          poster={activeDemo.poster}
          ref={videoRef}
        >
          <source src={activeDemo.video} type="video/mp4" />
        </video>
      </section>
    </article>
  )
}
