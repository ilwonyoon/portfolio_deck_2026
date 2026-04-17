import { useEffect } from 'react'

import { MetricCounter } from '../components/MetricCounter'

type OhouseMetricsEditorialSlideProps = {
  advanceSlide: () => void
  advanceStep: () => void
  autoPlay: boolean
  isThumbnail?: boolean
  step: number
}

const STEP_COPY = [
  {
    body: 'The loop worked till 2021.',
    mau: 590,
    showYoy: false,
    yoy: 59,
  },
  {
    body: 'In 2022, MAU declined sharply with the housing market, and YoY revenue growth dropped to 31%.',
    mau: 330,
    showYoy: true,
    yoy: 31,
  },
] as const

const AUTO_ADVANCE_MS = [1200, 3200] as const

export function OhouseMetricsEditorialSlide({
  advanceSlide,
  advanceStep,
  autoPlay,
  isThumbnail = false,
  step,
}: OhouseMetricsEditorialSlideProps) {
  const currentStep = STEP_COPY[Math.min(step, STEP_COPY.length - 1)]
  const isAnimatedStep = !isThumbnail && step >= 1

  useEffect(() => {
    if (!autoPlay || isThumbnail) {
      return
    }

    const timeout = window.setTimeout(() => {
      if (step >= STEP_COPY.length - 1) {
        advanceSlide()
        return
      }

      advanceStep()
    }, AUTO_ADVANCE_MS[Math.min(step, AUTO_ADVANCE_MS.length - 1)])

    return () => {
      window.clearTimeout(timeout)
    }
  }, [advanceSlide, advanceStep, autoPlay, isThumbnail, step])

  return (
    <article className="ohouse-metrics-editorial-slide">
      <div className="ohouse-metrics-editorial-slide__copy">
        <p className="ohouse-metrics-editorial-slide__body">{currentStep.body}</p>
      </div>

      <div className="ohouse-metrics-editorial-slide__metrics">
        <div className="ohouse-metrics-editorial-slide__hero">
          <div className="ohouse-metrics-editorial-slide__hero-value">
            {isThumbnail || step === 0 ? (
              <>
                {currentStep.mau}
                <span className="ohouse-metrics-editorial-slide__hero-suffix">
                  k
                </span>
              </>
            ) : (
              <MetricCounter
                active={isAnimatedStep}
                className="ohouse-metrics-editorial-slide__hero-counter"
                contentClassName="ohouse-metrics-editorial-slide__hero-counter-content"
                durationMs={860}
                fontSize={206}
                from={590}
                letterSpacing={-7.6}
                numberClassName="ohouse-metrics-editorial-slide__hero-number"
                numberSlotClassName="ohouse-metrics-editorial-slide__hero-number-slot"
                startDelayMs={200}
                suffix="k"
                suffixClassName="ohouse-metrics-editorial-slide__hero-suffix"
                suffixKind="k"
                suffixSlotClassName="ohouse-metrics-editorial-slide__hero-suffix-slot"
                to={330}
                variant="counter"
              />
            )}
          </div>
          <p className="ohouse-metrics-editorial-slide__hero-label">
            monthly active users
          </p>
        </div>

        {currentStep.showYoy ? (
          <div className="ohouse-metrics-editorial-slide__secondary">
            <p className="ohouse-metrics-editorial-slide__secondary-value">
              {currentStep.yoy}%
            </p>
            <p className="ohouse-metrics-editorial-slide__secondary-label">
              YoY revenue growth
            </p>
          </div>
        ) : null}
      </div>
    </article>
  )
}
