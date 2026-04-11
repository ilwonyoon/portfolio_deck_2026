import { useEffect, useState } from 'react'
import { DeckInspectorPanel } from './components/DeckInspectorPanel'
import { PresentationViewport } from './components/PresentationViewport'
import { SlideIndexPanel } from './components/SlideIndexPanel'
import { useDeckState } from './hooks/useDeckState'
import { deckSlides } from './slides/deck'
import type { CanvasSelection } from './types/inspector'

type PresentationMode = 'edit' | 'present'

function readPresentationMode() {
  if (typeof window === 'undefined') {
    return 'edit'
  }

  const params = new URLSearchParams(window.location.search)
  return params.get('mode') === 'present' ? 'present' : 'edit'
}

function App() {
  const [isInspectorCollapsed, setIsInspectorCollapsed] = useState(false)
  const [isSlideIndexCollapsed, setIsSlideIndexCollapsed] = useState(false)
  const [selection, setSelection] = useState<CanvasSelection | null>(null)
  const [showGrid, setShowGrid] = useState(false)
  const [presentationMode, setPresentationMode] = useState<PresentationMode>(
    readPresentationMode,
  )
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

  function handleModeChange(nextMode: PresentationMode) {
    setPresentationMode(nextMode)
    setSelection(null)
  }

  function handleModeSelect(nextMode: PresentationMode) {
    handleModeChange(nextMode)
    if (typeof window === 'undefined') {
      return
    }

    const params = new URLSearchParams(window.location.search)
    if (nextMode === 'present') {
      params.set('mode', 'present')
    } else {
      params.delete('mode')
    }

    const nextQuery = params.toString()
    const nextUrl = nextQuery ? `?${nextQuery}` : window.location.pathname
    window.history.replaceState(null, '', nextUrl)
  }

  const shellClassName = ['editor-shell', presentationMode === 'present' ? 'editor-shell--present' : '']
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') {
        return
      }

      if (presentationMode === 'present') {
        setPresentationMode('edit')
        setSelection(null)

        const params = new URLSearchParams(window.location.search)
        params.delete('mode')
        const nextQuery = params.toString()
        const nextUrl = nextQuery ? `?${nextQuery}` : window.location.pathname
        window.history.replaceState(null, '', nextUrl)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [presentationMode])

  return (
    <div className="app-shell">
      <div className={shellClassName}>
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
              advanceStep: () => {
                handleGoToSlide(currentSlideIndex, currentStep + 1)
              },
              advanceSlide: () => {
                handleGoToSlide(currentSlideIndex + 1, 0)
              },
              autoPlay: presentationMode === 'present',
              step: currentStep,
              slideIndex: currentSlideIndex,
              totalSlides: slides.length,
            })}
          </PresentationViewport>
        </main>

        <DeckInspectorPanel
          collapsed={isInspectorCollapsed}
          onTogglePresentationMode={() => {
            handleModeSelect(presentationMode === 'present' ? 'edit' : 'present')
          }}
          onToggleCollapse={() => {
            setIsInspectorCollapsed((current) => !current)
          }}
          onToggleGrid={() => {
            setShowGrid((current) => !current)
          }}
          presentationMode={presentationMode}
          selection={selection}
          showGrid={showGrid}
          slides={slides}
        />
      </div>
    </div>
  )
}

export default App
