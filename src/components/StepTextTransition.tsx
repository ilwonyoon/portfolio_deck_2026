import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { INTERACTION_SYSTEM, type TextVariant } from '../lib/interactionSystem'

type StepTextTransitionProps = {
  animateOnMount?: boolean
  className?: string
  onComplete?: () => void
  text: string
  variant?: TextVariant
}

function EraseTypeText({
  animateOnMount = false,
  className,
  onComplete,
  text,
}: Pick<StepTextTransitionProps, 'animateOnMount' | 'className' | 'onComplete' | 'text'>) {
  const config = INTERACTION_SYSTEM.text.variants['erase-type']
  const { blankPauseMs, eraseMode, typeCharMs } = config
  const [displayText, setDisplayText] = useState(animateOnMount ? '' : text)
  const displayTextRef = useRef(animateOnMount ? '' : text)
  const onCompleteRef = useRef(onComplete)
  const timeoutsRef = useRef<number[]>([])
  const previousTextRef = useRef(text)
  const isFirstRenderRef = useRef(true)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    timeoutsRef.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId)
    })
    timeoutsRef.current = []

    const shouldAnimateMount = isFirstRenderRef.current && animateOnMount

    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      previousTextRef.current = text

      if (!shouldAnimateMount) {
        return
      }
    }

    const previousText = previousTextRef.current

    if (previousText === text && !shouldAnimateMount && displayTextRef.current === text) {
      return
    }

    const schedule = (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(callback, delay)
      timeoutsRef.current.push(timeoutId)
    }

    if (eraseMode === 'instant') {
      schedule(() => {
        displayTextRef.current = ''
        setDisplayText('')
      }, 0)
    }

    const typeStart = blankPauseMs

    for (let index = 1; index <= text.length; index += 1) {
      const delay = typeStart + index * typeCharMs
      schedule(() => {
        const nextText = text.slice(0, index)
        displayTextRef.current = nextText
        setDisplayText(nextText)
      }, delay)
    }

    schedule(() => {
      onCompleteRef.current?.()
    }, typeStart + text.length * typeCharMs + 16)

    previousTextRef.current = text

    return () => {
      timeoutsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId)
      })
      timeoutsRef.current = []
    }
  }, [animateOnMount, blankPauseMs, eraseMode, text, typeCharMs])

  return (
    <div className={className}>
      <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{displayText}</p>
    </div>
  )
}

function MotionText({
  className,
  text,
  variant,
}: Required<Pick<StepTextTransitionProps, 'className' | 'text' | 'variant'>>) {
  const config = INTERACTION_SYSTEM.text.variants[variant]

  if (variant === 'instant') {
    return (
      <div className={className}>
        <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{text}</p>
      </div>
    )
  }

  const duration = 'duration' in config ? config.duration : 0.32
  const y = 'y' in config ? config.y : 0

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={className}
        initial={{ opacity: 0, y }}
        key={text}
        transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
      >
        <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{text}</p>
      </motion.div>
    </AnimatePresence>
  )
}

export function StepTextTransition({
  animateOnMount = false,
  className = '',
  onComplete,
  text,
  variant = INTERACTION_SYSTEM.text.defaultVariant,
}: StepTextTransitionProps) {
  if (variant === 'erase-type') {
    return (
      <EraseTypeText
        animateOnMount={animateOnMount}
        className={className}
        onComplete={onComplete}
        text={text}
      />
    )
  }

  return <MotionText className={className} text={text} variant={variant} />
}
