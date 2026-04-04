import { DeckNavigation } from './components/DeckNavigation'
import { PresentationViewport } from './components/PresentationViewport'
import { useDeckState } from './hooks/useDeckState'
import { deckSlides } from './slides/deck'

function App() {
  const {
    currentSlide,
    currentSlideIndex,
    currentStep,
    goToSlide,
    next,
    previous,
    slides,
  } = useDeckState(deckSlides)

  return (
    <div className="app-shell">
      <PresentationViewport>
        <>
          {currentSlide.render({
            step: currentStep,
            slideIndex: currentSlideIndex,
            totalSlides: slides.length,
          })}

          <DeckNavigation
            currentSlideId={currentSlide.id}
            currentSlideIndex={currentSlideIndex}
            currentStep={currentStep}
            onNext={next}
            onPrevious={previous}
            onSelect={goToSlide}
            slides={slides}
          />
        </>
      </PresentationViewport>
    </div>
  )
}

export default App
