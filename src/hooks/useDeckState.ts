import { useCallback, useEffect, useMemo, useState } from 'react'
import type { SlideDefinition } from '../types/presentation'

type DeckLocation = {
  slideIndex: number
  step: number
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  )
}

function clampLocation(location: DeckLocation, slides: SlideDefinition[]) {
  const slideIndex = Math.min(
    Math.max(location.slideIndex, 0),
    Math.max(slides.length - 1, 0),
  )
  const maxStep = Math.max(slides[slideIndex]?.steps ?? 1, 1) - 1

  return {
    slideIndex,
    step: Math.min(Math.max(location.step, 0), maxStep),
  }
}

function readLocation(slides: SlideDefinition[]): DeckLocation {
  if (typeof window === 'undefined') {
    return { slideIndex: 0, step: 0 }
  }

  const params = new URLSearchParams(window.location.search)
  const slideParam = params.get('slide')
  const stepParam = Number(params.get('step') ?? '0')

  const slideIndex =
    slides.findIndex((slide) => slide.id === slideParam) >= 0
      ? slides.findIndex((slide) => slide.id === slideParam)
      : Number.isFinite(Number(slideParam))
        ? Number(slideParam)
        : 0

  return clampLocation(
    {
      slideIndex,
      step: Number.isFinite(stepParam) ? stepParam : 0,
    },
    slides,
  )
}

function writeLocation(location: DeckLocation, slides: SlideDefinition[]) {
  if (typeof window === 'undefined') {
    return
  }

  const params = new URLSearchParams(window.location.search)
  params.set('slide', slides[location.slideIndex].id)
  params.set('step', String(location.step))
  const nextQuery = params.toString()
  const nextUrl = nextQuery ? `?${nextQuery}` : window.location.pathname
  window.history.replaceState(null, '', nextUrl)
}

export function useDeckState(slides: SlideDefinition[]) {
  const [location, setLocation] = useState(() => readLocation(slides))

  const goToSlide = useCallback(
    (slideIndex: number, step = 0) => {
      setLocation(clampLocation({ slideIndex, step }, slides))
    },
    [slides],
  )

  const next = useCallback(() => {
    setLocation((current) => {
      const slide = slides[current.slideIndex]
      const maxStep = Math.max(slide.steps, 1) - 1

      if (current.step < maxStep) {
        return { ...current, step: current.step + 1 }
      }

      if (current.slideIndex < slides.length - 1) {
        return { slideIndex: current.slideIndex + 1, step: 0 }
      }

      return current
    })
  }, [slides])

  const previous = useCallback(() => {
    setLocation((current) => {
      if (current.step > 0) {
        return { ...current, step: current.step - 1 }
      }

      if (current.slideIndex > 0) {
        const previousSlideIndex = current.slideIndex - 1
        return {
          slideIndex: previousSlideIndex,
          step: Math.max(slides[previousSlideIndex].steps, 1) - 1,
        }
      }

      return current
    })
  }, [slides])

  useEffect(() => {
    writeLocation(location, slides)
  }, [location, slides])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) {
        return
      }

      if (
        event.key === 'ArrowRight' ||
        event.key === 'ArrowDown' ||
        event.key === 'PageDown' ||
        event.key === ' '
      ) {
        event.preventDefault()
        next()
      }

      if (
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowUp' ||
        event.key === 'PageUp' ||
        event.key === 'Backspace'
      ) {
        event.preventDefault()
        previous()
      }

      if (event.key === 'Home') {
        event.preventDefault()
        goToSlide(0, 0)
      }

      if (event.key === 'End') {
        event.preventDefault()
        const lastIndex = slides.length - 1
        goToSlide(lastIndex, Math.max(slides[lastIndex].steps, 1) - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [goToSlide, next, previous, slides])

  const currentSlide = useMemo(
    () => slides[location.slideIndex],
    [location.slideIndex, slides],
  )

  return {
    currentSlide,
    currentSlideIndex: location.slideIndex,
    currentStep: location.step,
    goToSlide,
    next,
    previous,
    slides,
  }
}
