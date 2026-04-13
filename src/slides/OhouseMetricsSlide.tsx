import { type CSSProperties, useEffect, useRef, useState } from 'react'

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

function measureMetricNumberWidth(
  texts: string[],
  fontSize: number,
  letterSpacing: number,
) {
  if (typeof document === 'undefined') {
    return 0
  }

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    return 0
  }

  context.font = `600 ${fontSize}px "General Sans"`

  return Math.ceil(
    Math.max(
      ...texts.map((text) => {
        const baseWidth = context.measureText(text).width
        const trackingWidth = Math.max(text.length - 1, 0) * letterSpacing
        return baseWidth + trackingWidth
      }),
    ),
  )
}

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
  const [metricValues, setMetricValues] = useState<number[]>(
    METRICS.map((metric) => metric.from),
  )
  const [countingRows, setCountingRows] = useState<boolean[]>([false, false])
  const [metricSlotWidths, setMetricSlotWidths] = useState<number[]>([0, 0])

  const timeoutIdsRef = useRef<number[]>([])
  const rafIdsRef = useRef<number[]>([])

  useEffect(() => {
    let cancelled = false

    const measure = async () => {
      if (typeof document === 'undefined') {
        return
      }

      await document.fonts.ready

      if (cancelled) {
        return
      }

      setMetricSlotWidths([
        measureMetricNumberWidth(['590', '330'], 122, -4),
        measureMetricNumberWidth(['59', '31'], 122, -4),
      ])
    }

    void measure()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    timeoutIdsRef.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId)
    })
    rafIdsRef.current.forEach((rafId) => {
      window.cancelAnimationFrame(rafId)
    })
    timeoutIdsRef.current = []
    rafIdsRef.current = []

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

    const counterStart =
      typeStart + EYEBROWS.to.length * typeCharMs + counterStartPauseMs

    const animateCounter = (metricIndex: number, duration: number) => {
      const metric = METRICS[metricIndex]
      let animationStart: number | null = null

      setCountingRows((current) =>
        current.map((value, index) => (index === metricIndex ? true : value)),
      )

      const tick = (timestamp: number) => {
        if (animationStart === null) {
          animationStart = timestamp
        }

        const rawProgress = Math.min(
          (timestamp - animationStart) / duration,
          1,
        )
        const easedProgress = 1 - (1 - rawProgress) ** 3
        const nextValue =
          metric.from + (metric.to - metric.from) * easedProgress
        const roundedValue =
          metric.from > metric.to
            ? Math.max(metric.to, Math.round(nextValue))
            : Math.min(metric.to, Math.round(nextValue))

        setMetricValues((current) =>
          current.map((value, index) =>
            index === metricIndex ? roundedValue : value,
          ),
        )

        if (rawProgress < 1) {
          const rafId = window.requestAnimationFrame(tick)
          rafIdsRef.current.push(rafId)
          return
        }

        setMetricValues((current) =>
          current.map((value, index) =>
            index === metricIndex ? metric.to : value,
          ),
        )
        setCountingRows((current) =>
          current.map((value, index) => (index === metricIndex ? false : value)),
        )
      }

      const rafId = window.requestAnimationFrame(tick)
      rafIdsRef.current.push(rafId)
    }

    METRICS.forEach((_, index) => {
      const duration = 760 - index * 80
      const rowDelay = counterStart + index * 130

      schedule(() => {
        animateCounter(index, duration)
      }, rowDelay)
    })

    return () => {
      timeoutIdsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
      rafIdsRef.current.forEach((rafId) => {
        window.cancelAnimationFrame(rafId)
      })
      timeoutIdsRef.current = []
      rafIdsRef.current = []
    }
  }, [active])

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
            <p
              className="ohouse-metrics-slide__metric"
              data-counting={countingRows[index] ? 'true' : 'false'}
              data-kind={metric.suffix === '%' ? 'percent' : 'k'}
              data-node-id={index === 0 ? '6022:28842' : '6022:28849'}
            >
              <span
                className="ohouse-metrics-slide__metric-content"
                style={
                  {
                    '--metric-number-width': `${metricSlotWidths[index] || 0}px`,
                  } as CSSProperties
                }
              >
                <span className="ohouse-metrics-slide__metric-number-slot">
                  <span className="ohouse-metrics-slide__metric-number">
                    {metricValues[index]}
                  </span>
                </span>
                <span className="ohouse-metrics-slide__metric-suffix-slot">
                  <span
                    className="ohouse-metrics-slide__metric-suffix"
                    data-kind={metric.suffix === '%' ? 'percent' : 'k'}
                  >
                    {metric.suffix}
                  </span>
                </span>
              </span>
            </p>
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
