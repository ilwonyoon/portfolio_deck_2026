import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

import { MetricCounter } from '../components/MetricCounter'

type MetricCounter = {
  from: number
  label: string
  suffix: '%' | 'k'
  to: number
}

const EYEBROWS = {
  from: 'The loop worked till 2021',
  to: 'In 2022, house transaction reduced by 51%',
} as const

const METRICS: MetricCounter[] = [
  {
    from: 590,
    label: 'MAU',
    suffix: 'k',
    to: 330,
  },
  {
    from: 59,
    label: 'Rev. growth YoY',
    suffix: '%',
    to: 31,
  },
] as const

const autoAdvanceMs = [950, 3400] as const
const eyebrowTransitionMs = 280
const counterStartPauseMs = 120

export function OhouseMetricsSlide({
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
    <OhouseMetricsTransitionView
      active={step >= 1}
    />
  )
}

function OhouseMetricsTransitionView({ active }: { active: boolean }) {
  const eyebrowText = active ? EYEBROWS.to : EYEBROWS.from
  const counterStart = active ? eyebrowTransitionMs + counterStartPauseMs : 0

  return (
    <article className="ohouse-metrics-slide" data-node-id="6022:27285">
      <p className="ohouse-metrics-slide__eyebrow" data-node-id="6022:28854">
        <AnimatePresence mode="wait">
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="ohouse-metrics-slide__eyebrow-text"
            initial={{ opacity: 0, y: 8 }}
            key={eyebrowText}
            transition={{
              duration: eyebrowTransitionMs / 1000,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {eyebrowText}
          </motion.span>
        </AnimatePresence>
      </p>

      <div className="ohouse-metrics-slide__list" data-node-id="6022:28853">
        {METRICS.map((metric, index) => (
          <div
            className="ohouse-metrics-slide__row"
            data-node-id={index === 0 ? '6022:28847' : '6022:28848'}
            key={metric.label}
          >
            <MetricCounter
              active={active}
              className="ohouse-metrics-slide__metric"
              contentClassName="ohouse-metrics-slide__metric-content"
              dataNodeId={index === 0 ? '6022:28842' : '6022:28849'}
              durationMs={760 - index * 80}
              fontSize={122}
              from={metric.from}
              letterSpacing={-4}
              numberClassName="ohouse-metrics-slide__metric-number"
              numberSlotClassName="ohouse-metrics-slide__metric-number-slot"
              startDelayMs={counterStart + index * 130}
              suffix={metric.suffix}
              suffixClassName="ohouse-metrics-slide__metric-suffix"
              suffixKind={metric.suffix === '%' ? 'percent' : 'k'}
              suffixSlotClassName="ohouse-metrics-slide__metric-suffix-slot"
              to={metric.to}
            />
            <p
              className="ohouse-metrics-slide__label"
              data-node-id={index === 0 ? '6022:28846' : '6022:28850'}
            >
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </article>
  )
}
