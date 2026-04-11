import { useEffect } from 'react'
import { motion } from 'framer-motion'

const inspirationSegments = [
  {
    kind: 'word',
    label: 'Inspiration',
    revealAt: 0,
    width: 233,
    enterMs: 520,
    holdMs: 180,
  },
  {
    kind: 'separator',
    revealAt: 1,
    width: 93,
    muted: false,
    enterMs: 160,
    holdMs: 120,
  },
  {
    kind: 'word',
    label: 'Confidence',
    revealAt: 2,
    width: 257,
    enterMs: 560,
    holdMs: 200,
  },
  {
    kind: 'separator',
    revealAt: 3,
    width: 93,
    muted: true,
    enterMs: 160,
    holdMs: 120,
  },
  {
    kind: 'word',
    label: 'Purchase',
    revealAt: 4,
    width: 206,
    enterMs: 640,
    holdMs: 1050,
  },
] as const

function getSegmentByStep(step: number) {
  return inspirationSegments[Math.min(step, inspirationSegments.length - 1)]
}

export function InspirationSlide({
  advanceSlide,
  advanceStep,
  autoPlay,
  step,
}: {
  advanceSlide: () => void
  advanceStep: () => void
  autoPlay: boolean
  step: number
}) {
  const currentSegment = getSegmentByStep(step)

  useEffect(() => {
    if (!autoPlay) {
      return
    }

    const timeout = window.setTimeout(() => {
      if (step >= inspirationSegments.length - 1) {
        advanceSlide()
        return
      }

      advanceStep()
    }, currentSegment.enterMs + currentSegment.holdMs)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [advanceSlide, advanceStep, autoPlay, currentSegment, step])

  return (
    <article className="inspiration-slide">
      <div className="inspiration-slide__rail">
        {inspirationSegments.map((segment) => {
          const isVisible = step >= segment.revealAt

          if (segment.kind === 'word') {
            return (
              <motion.span
                animate={isVisible ? 'visible' : 'hidden'}
                className="inspiration-slide__word"
                initial={false}
                key={segment.label}
                style={{ width: `${segment.width}px` }}
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.985 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: segment.enterMs / 1000,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                {segment.label}
              </motion.span>
            )
          }

          return (
            <motion.span
              animate={isVisible ? 'visible' : 'hidden'}
              aria-hidden="true"
              className={[
                'inspiration-slide__separator',
                segment.muted ? 'inspiration-slide__separator--muted' : '',
              ].join(' ')}
              initial={false}
              key={`separator-${segment.revealAt}`}
              style={{ width: `${segment.width}px` }}
              variants={{
                hidden: { opacity: 0, scaleX: 0.2 },
                visible: {
                  opacity: segment.muted ? 0.5 : 1,
                  scaleX: 1,
                  transition: {
                    duration: segment.enterMs / 1000,
                    ease: [0.2, 0.8, 0.2, 1],
                  },
                },
              }}
            >
              <motion.span
                animate={isVisible ? 'visible' : 'hidden'}
                className="inspiration-slide__separator-line"
                initial={false}
                variants={{
                  hidden: { opacity: 0, scaleX: 0 },
                  visible: {
                    opacity: segment.muted ? 1 : 0.5,
                    scaleX: 1,
                    transition: {
                      duration: Math.max(segment.enterMs / 1000 - 0.04, 0.12),
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              />
            </motion.span>
          )
        })}
      </div>
    </article>
  )
}
