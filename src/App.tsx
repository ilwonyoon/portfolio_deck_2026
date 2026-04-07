import { useState } from 'react'
import { DeckInspectorPanel } from './components/DeckInspectorPanel'
import { PresentationViewport } from './components/PresentationViewport'
import { SlideIndexPanel } from './components/SlideIndexPanel'
import { useDeckState } from './hooks/useDeckState'
import { deckSlides } from './slides/deck'
import type { CanvasSelection } from './types/inspector'

function App() {
  const [isInspectorCollapsed, setIsInspectorCollapsed] = useState(false)
  const [isSlideIndexCollapsed, setIsSlideIndexCollapsed] = useState(false)
  const [selection, setSelection] = useState<CanvasSelection | null>(null)
  const [showGrid, setShowGrid] = useState(false)
  const {
    currentSlide,
    currentSlideIndex,
    currentStep,
    goToSlide,
    slides,
  } = useDeckState(deckSlides)

  function handleGoToSlide(slideIndex: number, step = 0) {
    setSelection(null)
    goToSlide(slideIndex, step)
  }

  return (
    <div className="app-shell">
      <div className="editor-shell">
        <SlideIndexPanel
          collapsed={isSlideIndexCollapsed}
          currentSlideId={currentSlide.id}
          onSelect={handleGoToSlide}
          onToggleCollapse={() => {
            setIsSlideIndexCollapsed((current) => !current)
          }}
          slides={slides}
        />

        <main className="editor-workspace">
          <PresentationViewport
            onSelectionChange={setSelection}
            selection={selection}
            showGrid={showGrid}
          >
            {currentSlide.render({
              step: currentStep,
              slideIndex: currentSlideIndex,
              totalSlides: slides.length,
            })}
          </PresentationViewport>
        </main>

        <DeckInspectorPanel
          collapsed={isInspectorCollapsed}
          onToggleCollapse={() => {
            setIsInspectorCollapsed((current) => !current)
          }}
          onToggleGrid={() => {
            setShowGrid((current) => !current)
          }}
          selection={selection}
          showGrid={showGrid}
          slides={slides}
        />
      </div>
    </div>
  )
}

export default App
