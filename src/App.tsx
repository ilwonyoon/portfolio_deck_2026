import { useEffect, useState } from 'react'
import { DeckInspectorPanel } from './components/DeckInspectorPanel'
import { PresentationViewport } from './components/PresentationViewport'
import { SlideIndexPanel } from './components/SlideIndexPanel'
import { useDeckState } from './hooks/useDeckState'
import { deleteSlideFromDeck, reorderDeckSlides } from './lib/deckEditor'
import { deckSlides as initialDeckSlides } from './slides/deck'
import { designSystemSlides } from './slides/systemDeck'
import type { CanvasSelection } from './types/inspector'

type PresentationMode = 'edit' | 'present'
type DeckCollection = 'portfolio' | 'system'

function readPresentationMode() {
  if (typeof window === 'undefined') {
    return 'edit'
  }

  const params = new URLSearchParams(window.location.search)
  return params.get('mode') === 'present' ? 'present' : 'edit'
}

function readDeckCollection(): DeckCollection {
  if (typeof window === 'undefined') {
    return 'portfolio'
  }

  const params = new URLSearchParams(window.location.search)
  return params.get('deck') === 'system' ? 'system' : 'portfolio'
}

function App() {
  const [isInspectorCollapsed, setIsInspectorCollapsed] = useState(false)
  const [isSlideIndexCollapsed, setIsSlideIndexCollapsed] = useState(false)
  const [selection, setSelection] = useState<CanvasSelection | null>(null)
  const [showGrid, setShowGrid] = useState(false)
  const [deckCollection] = useState<DeckCollection>(readDeckCollection)
  const [slides, setSlides] = useState(initialDeckSlides)
  const [presentationMode, setPresentationMode] = useState<PresentationMode>(
    readPresentationMode,
  )
  const sourceSlides =
    deckCollection === 'system' ? designSystemSlides : slides
  const deckEditingEnabled =
    import.meta.env.DEV &&
    presentationMode === 'edit' &&
    deckCollection === 'portfolio'
  const {
    currentSlide,
    currentSlideIndex,
    currentStep,
    goToSlide,
    slides: activeSlides,
  } = useDeckState(sourceSlides)

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

  async function handleDeleteSlide(slideId: string) {
    if (!deckEditingEnabled || slides.length <= 1) {
      return
    }

    const previousSlides = slides
    const nextSlides = slides.filter((slide) => slide.id !== slideId)

    if (nextSlides.length === slides.length) {
      return
    }

    setSelection(null)
    setSlides(nextSlides)

    try {
      await deleteSlideFromDeck(slideId)
    } catch (error) {
      console.error(error)
      setSlides(previousSlides)
    }
  }

  async function handleReorderSlides(fromIndex: number, toIndex: number) {
    if (!deckEditingEnabled || fromIndex === toIndex) {
      return
    }

    const previousSlides = slides
    const nextSlides = [...slides]
    const [movedSlide] = nextSlides.splice(fromIndex, 1)

    if (!movedSlide) {
      return
    }

    nextSlides.splice(toIndex, 0, movedSlide)
    setSlides(nextSlides)

    try {
      await reorderDeckSlides(nextSlides.map((slide) => slide.id))
    } catch (error) {
      console.error(error)
      setSlides(previousSlides)
    }
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
          editingEnabled={deckEditingEnabled}
          onDelete={handleDeleteSlide}
          onReorder={handleReorderSlides}
          onSelect={handleGoToSlide}
          onToggleCollapse={() => {
            setIsSlideIndexCollapsed((current) => !current)
          }}
          slides={activeSlides}
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
              totalSlides: activeSlides.length,
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
          slides={activeSlides}
        />
      </div>
    </div>
  )
}

export default App
