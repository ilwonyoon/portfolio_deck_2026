import { useEffect, useState } from 'react'
import { DeckInspectorPanel } from '../components/DeckInspectorPanel'
import { PresentationViewport } from '../components/PresentationViewport'
import { SlideIndexPanel } from '../components/SlideIndexPanel'
import { useDeckState } from '../hooks/useDeckState'
import { deleteSlideFromDeck, reorderDeckSlides } from '../lib/deckEditor'
import { deckSlides as initialDeckSlides } from '../slides/deck'
import { designSystemSlides } from '../slides/systemDeck'
import type { CanvasSelection } from '../types/inspector'

export type DeckWorkspaceMode = 'viewer' | 'admin'

type DeckCollection = 'portfolio' | 'system'

function readDeckCollection(): DeckCollection {
  if (typeof window === 'undefined') return 'portfolio'
  const params = new URLSearchParams(window.location.search)
  return params.get('deck') === 'system' ? 'system' : 'portfolio'
}

type Props = {
  mode: DeckWorkspaceMode
}

export function DeckWorkspace({ mode }: Props) {
  const [selection, setSelection] = useState<CanvasSelection | null>(null)
  const [showGrid, setShowGrid] = useState(false)
  const [isInspectorCollapsed, setIsInspectorCollapsed] = useState(false)
  const [deckCollection] = useState<DeckCollection>(readDeckCollection)
  const [slides, setSlides] = useState(initialDeckSlides)
  const [isPresenting, setIsPresenting] = useState(false)

  const sourceSlides = deckCollection === 'system' ? designSystemSlides : slides

  const isAdmin = mode === 'admin'
  const deckEditingEnabled = import.meta.env.DEV && isAdmin && deckCollection === 'portfolio'

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

  function handleEnterPresent() {
    setIsPresenting(true)
    setSelection(null)
  }

  function handleExitPresent() {
    setIsPresenting(false)
    setSelection(null)
  }

  async function handleDeleteSlide(slideId: string) {
    if (!deckEditingEnabled || slides.length <= 1) return

    const previousSlides = slides
    const nextSlides = slides.filter((slide) => slide.id !== slideId)
    if (nextSlides.length === slides.length) return

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
    if (!deckEditingEnabled || fromIndex === toIndex) return

    const previousSlides = slides
    const nextSlides = [...slides]
    const [movedSlide] = nextSlides.splice(fromIndex, 1)
    if (!movedSlide) return

    nextSlides.splice(toIndex, 0, movedSlide)
    setSlides(nextSlides)

    try {
      await reorderDeckSlides(nextSlides.map((slide) => slide.id))
    } catch (error) {
      console.error(error)
      setSlides(previousSlides)
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isPresenting) {
        handleExitPresent()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPresenting])

  const shellClassName = ['editor-shell', isPresenting ? 'editor-shell--present' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className="app-shell">
      <div className={shellClassName}>
        {!isPresenting && (
          <SlideIndexPanel
            currentSlideId={currentSlide.id}
            editingEnabled={deckEditingEnabled}
            onDelete={handleDeleteSlide}
            onEnterPresent={handleEnterPresent}
            onReorder={handleReorderSlides}
            onSelect={handleGoToSlide}
            slides={activeSlides}
          />
        )}

        <main className="editor-workspace">
          <PresentationViewport
            onSelectionChange={isPresenting || !isAdmin ? undefined : setSelection}
            selection={isPresenting || !isAdmin ? null : selection}
            showGrid={showGrid}
          >
            {currentSlide.render({
              advanceStep: () => handleGoToSlide(currentSlideIndex, currentStep + 1),
              advanceSlide: () => handleGoToSlide(currentSlideIndex + 1, 0),
              autoPlay: isPresenting,
              isThumbnail: false,
              step: currentStep,
              slideIndex: currentSlideIndex,
              totalSlides: activeSlides.length,
            })}
          </PresentationViewport>

          {isPresenting && (
            <button
              className="present-exit-btn"
              onClick={handleExitPresent}
              type="button"
            >
              Exit
            </button>
          )}
        </main>

        {!isPresenting && isAdmin && (
          <DeckInspectorPanel
            collapsed={isInspectorCollapsed}
            onToggleCollapse={() => setIsInspectorCollapsed((c) => !c)}
            onToggleGrid={() => setShowGrid((c) => !c)}
            selection={selection}
            showGrid={showGrid}
            slides={activeSlides}
          />
        )}
      </div>
    </div>
  )
}
