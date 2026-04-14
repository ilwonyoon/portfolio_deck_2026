import { useEffect, useRef, useState } from 'react'

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
const eraseCharMs = 34
const blankPauseMs = 180
const typeCharMs = 26
const counterStartPauseMs = 160

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
      key={step}
    />
  )
}

function OhouseMetricsTransitionView({ active }: { active: boolean }) {
  const [eyebrowText, setEyebrowText] = useState<string>(EYEBROWS.from)

  const timeoutIdsRef = useRef<number[]>([])

  useEffect(() => {
    timeoutIdsRef.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId)
    })
    timeoutIdsRef.current = []

    if (!active) {
      return
    }

    const schedule = (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(callback, delay)
      timeoutIdsRef.current.push(timeoutId)
    }

    for (let index = EYEBROWS.from.length - 1; index >= 0; index -= 1) {
      const delay = (EYEBROWS.from.length - index) * eraseCharMs
      schedule(() => {
        setEyebrowText(EYEBROWS.from.slice(0, index))
      }, delay)
    }

    const eraseDuration = EYEBROWS.from.length * eraseCharMs
    const typeStart = eraseDuration + blankPauseMs

    schedule(() => {
      setEyebrowText('')
    }, eraseDuration)

    for (let index = 1; index <= EYEBROWS.to.length; index += 1) {
      const delay = typeStart + index * typeCharMs
      schedule(() => {
        setEyebrowText(EYEBROWS.to.slice(0, index))
      }, delay)
    }

    return () => {
      timeoutIdsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
      timeoutIdsRef.current = []
    }
  }, [active])

  const counterStart =
    EYEBROWS.from.length * eraseCharMs +
    blankPauseMs +
    EYEBROWS.to.length * typeCharMs +
    counterStartPauseMs

  return (
    <article className="ohouse-metrics-slide" data-node-id="6022:27285">
      <p className="ohouse-metrics-slide__eyebrow" data-node-id="6022:28854">
        <span className="ohouse-metrics-slide__eyebrow-text">{eyebrowText}</span>
        <span
          aria-hidden="true"
          className="ohouse-metrics-slide__eyebrow-caret"
        />
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
