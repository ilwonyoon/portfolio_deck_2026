import { useEffect } from 'react'

import { MetricCounter } from '../components/MetricCounter'

type OhouseMetricsEditorialSlideProps = {
  advanceSlide: () => void
  advanceStep: () => void
  autoPlay: boolean
  isThumbnail?: boolean
  step: number
}

type StepCopy = {
  bodyLines: string[]
  drivers?: string[]
  driversLabel?: string
  mau: number
}

const STEP_COPY = [
  {
    bodyLines: ['The loop worked till 2021.'],
    mau: 590,
  },
  {
    bodyLines: [
      'In 2022, MAU declined sharply.',
      'Revenue growth dropped from 59% to 31%.',
    ],
    driversLabel: 'Not just the market',
    drivers: [
      'Housing market -50% YoY',
      'Instagram & YouTube took over daily interior discovery',
      'Coupang & Naver entered the category',
    ],
    mau: 330,
  },
] satisfies StepCopy[]

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
        <p className="ohouse-metrics-editorial-slide__body">
          {currentStep.bodyLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>

        {currentStep.drivers ? (
          <div className="ohouse-metrics-editorial-slide__drivers">
            <p className="ohouse-metrics-editorial-slide__drivers-label">
              {currentStep.driversLabel}
            </p>
            <div className="ohouse-metrics-editorial-slide__driver-list">
              {currentStep.drivers.map((driver, index) => (
                <div
                  className="ohouse-metrics-editorial-slide__driver-row"
                  key={driver}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{driver}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
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
      </div>
    </article>
  )
}
