import { useEffect } from 'react'
import { motion } from 'framer-motion'

const autoAdvanceMs = [700, 1100] as const

export function OhouseSlide({
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
  useEffect(() => {
    if (!autoPlay) {
      return
    }

    const timeout = window.setTimeout(() => {
      if (step >= 1) {
        advanceSlide()
        return
      }

      advanceStep()
    }, autoAdvanceMs[Math.min(step, autoAdvanceMs.length - 1)])

    return () => {
      window.clearTimeout(timeout)
    }
  }, [advanceSlide, advanceStep, autoPlay, step])

  return (
    <article className="ohouse-slide">
      <div className="ohouse-slide__row">
        <motion.div
          animate={step >= 0 ? 'visible' : 'hidden'}
          className="ohouse-slide__brand"
          initial={false}
          variants={{
            hidden: { opacity: 0, scale: 0.88 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          <img
            alt=""
            aria-hidden="true"
            className="ohouse-slide__mark"
            decoding="async"
            draggable={false}
            src="/media/ohouse-mark.svg"
          />
        </motion.div>

        <motion.span
          animate={step >= 1 ? 'visible' : 'hidden'}
          className="ohouse-slide__label"
          initial={false}
          variants={{
            hidden: { opacity: 0, x: -24 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.48,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          Ohouse
        </motion.span>
      </div>
    </article>
  )
}
