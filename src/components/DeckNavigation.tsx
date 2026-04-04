import type { SlideDefinition } from '../types/presentation'

type DeckNavigationProps = {
  currentSlideId: string
  currentSlideIndex: number
  currentStep: number
  onNext: () => void
  onPrevious: () => void
  onSelect: (slideIndex: number) => void
  slides: SlideDefinition[]
}

export function DeckNavigation({
  currentSlideId,
  currentSlideIndex,
  currentStep,
  onNext,
  onPrevious,
  onSelect,
  slides,
}: DeckNavigationProps) {
  return (
    <nav className="deck-navigation" aria-label="Presentation navigation">
      <button
        aria-label="Previous slide"
        className="deck-navigation__button"
        onClick={onPrevious}
        type="button"
      >
        ←
      </button>

      <div className="deck-navigation__list">
        {slides.map((slide, index) => (
          <button
            className="deck-navigation__chip"
            data-active={slide.id === currentSlideId}
            key={slide.id}
            onClick={() => onSelect(index)}
            type="button"
          >
            <span className="deck-navigation__chip-index">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="deck-navigation__chip-label">{slide.navLabel}</span>
          </button>
        ))}
      </div>

      <button
        aria-label="Next slide"
        className="deck-navigation__button"
        onClick={onNext}
        type="button"
      >
        →
      </button>

      <span className="deck-navigation__hint">
        slide {currentSlideIndex + 1}/{slides.length} • step {currentStep + 1}
      </span>
    </nav>
  )
}
