import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'

import { INTERACTION_SYSTEM, type NumberVariant } from '../lib/interactionSystem'

type MetricCounterProps = {
  active: boolean
  className?: string
  contentClassName?: string
  dataNodeId?: string
  durationMs?: number
  fontSize: number
  from: number
  letterSpacing: number
  numberClassName?: string
  numberSlotClassName?: string
  slotWidthVarName?: string
  startDelayMs?: number
  suffix: string
  suffixClassName?: string
  suffixKind?: string
  suffixSlotClassName?: string
  to: number
  variant?: NumberVariant
}

function measureNumberWidth(
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

export function MetricCounter({
  active,
  className = '',
  contentClassName = '',
  dataNodeId,
  durationMs = 720,
  fontSize,
  from,
  letterSpacing,
  numberClassName = '',
  numberSlotClassName = '',
  slotWidthVarName = '--metric-number-width',
  startDelayMs = 0,
  suffix,
  suffixClassName = '',
  suffixKind,
  suffixSlotClassName = '',
  to,
  variant = INTERACTION_SYSTEM.number.defaultVariant,
}: MetricCounterProps) {
  const [displayValue, setDisplayValue] = useState(from)
  const [isCounting, setIsCounting] = useState(false)
  const [slotWidth, setSlotWidth] = useState(0)
  const rafRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

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

      setSlotWidth(
        measureNumberWidth(
          [String(from), String(to)],
          fontSize,
          letterSpacing,
        ),
      )
    }

    void measure()

    return () => {
      cancelled = true
    }
  }, [fontSize, from, letterSpacing, to])

  useEffect(() => {
    if (!active) {
      return
    }

    if (variant === 'instant') {
      const timeoutId = window.setTimeout(() => {
        setDisplayValue(to)
      }, startDelayMs)
      timeoutRef.current = timeoutId

      return () => {
        window.clearTimeout(timeoutId)
      }
    }

    const startAnimation = () => {
      let animationStart: number | null = null
      setIsCounting(true)

      const tick = (timestamp: number) => {
        if (animationStart === null) {
          animationStart = timestamp
        }

        const rawProgress = Math.min(
          (timestamp - animationStart) / durationMs,
          1,
        )
        const easedProgress = 1 - (1 - rawProgress) ** 3
        const nextValue = from + (to - from) * easedProgress
        const roundedValue =
          from > to
            ? Math.max(to, Math.round(nextValue))
            : Math.min(to, Math.round(nextValue))

        setDisplayValue(roundedValue)

        if (rawProgress < 1) {
          rafRef.current = window.requestAnimationFrame(tick)
          return
        }

        setDisplayValue(to)
        setIsCounting(false)
        rafRef.current = null
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    timeoutRef.current = window.setTimeout(startAnimation, startDelayMs)

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [active, durationMs, from, startDelayMs, to, variant])

  const contentStyle = {
    [slotWidthVarName]: `${slotWidth}px`,
  } as CSSProperties

  return (
    <span
      className={className}
      data-counting={isCounting ? 'true' : 'false'}
      data-kind={suffixKind}
      data-node-id={dataNodeId}
    >
      <span className={contentClassName} style={contentStyle}>
        <span className={numberSlotClassName}>
          <span className={numberClassName}>{displayValue}</span>
        </span>
        <span className={suffixSlotClassName}>
          <span className={suffixClassName} data-kind={suffixKind}>
            {suffix}
          </span>
        </span>
      </span>
    </span>
  )
}
