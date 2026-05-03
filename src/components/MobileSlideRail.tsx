import { useEffect, useRef } from 'react'
import type { SlideDefinition } from '../types/presentation'

type MobileSlideRailProps = {
  currentSlideIndex: number
  currentStep: number
  onSelect: (slideIndex: number) => void
  slides: SlideDefinition[]
}

export function MobileSlideRail({
  currentSlideIndex,
  currentStep,
  onSelect,
  slides,
}: MobileSlideRailProps) {
  const activeItemRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [currentSlideIndex])

  return (
    <nav className="mobile-slide-rail" aria-label="Slide navigation">
      <div className="mobile-slide-rail__status" aria-live="polite">
        <span className="mobile-slide-rail__status-number">
          {String(currentSlideIndex + 1).padStart(2, '0')}
        </span>
        <span className="mobile-slide-rail__status-count">
          / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      <div className="mobile-slide-rail__track">
        {slides.map((slide, index) => {
          const isActive = index === currentSlideIndex
          const showStepCount = slide.stepDisplay !== 'none' && slide.steps > 1

          return (
            <button
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Go to slide ${index + 1}: ${slide.navLabel}`}
              className="mobile-slide-rail__item"
              data-active={isActive}
              key={slide.id}
              onClick={() => onSelect(index)}
              ref={(node) => {
                if (isActive) activeItemRef.current = node
              }}
              type="button"
            >
              {slide.thumbnail ? (
                <img
                  alt=""
                  className="mobile-slide-rail__item-image"
                  decoding="async"
                  loading="lazy"
                  src={slide.thumbnail.src}
                />
              ) : null}
              <span className="mobile-slide-rail__item-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="mobile-slide-rail__item-label">
                {slide.navLabel}
              </span>
              {showStepCount ? (
                <span className="mobile-slide-rail__item-steps">
                  {isActive ? currentStep + 1 : 1}/{slide.steps}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
