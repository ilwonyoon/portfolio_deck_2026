import { GripVertical, Maximize2, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { SlideDefinition } from '../types/presentation'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

type SlideIndexPanelProps = {
  currentSlideId: string
  editingEnabled?: boolean
  onDelete?: (slideId: string) => void
  onEnterPresent: () => void
  onReorder?: (fromIndex: number, toIndex: number) => void
  onSelect: (slideIndex: number) => void
  slides: SlideDefinition[]
}

function SlideThumbnail({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [frameWidth, setFrameWidth] = useState(204)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    function updateFrameWidth() {
      const nextFrame = frameRef.current
      setFrameWidth(nextFrame?.clientWidth || 204)
    }

    updateFrameWidth()

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(updateFrameWidth)
      resizeObserver.observe(frame)
      return () => resizeObserver.disconnect()
    }

    window.addEventListener('resize', updateFrameWidth)
    return () => window.removeEventListener('resize', updateFrameWidth)
  }, [])

  const scale = frameWidth / DESIGN_WIDTH

  return (
    <div aria-hidden="true" className="slide-index__thumbnail">
      <div className="slide-index__thumbnail-frame" ref={frameRef}>
        <div
          className="slide-index__thumbnail-canvas"
          style={{
            height: `${DESIGN_HEIGHT}px`,
            transform: `scale(${scale})`,
            width: `${DESIGN_WIDTH}px`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function SlideIndexPanel({
  currentSlideId,
  editingEnabled = false,
  onDelete,
  onEnterPresent,
  onReorder,
  onSelect,
  slides,
}: SlideIndexPanelProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const activeShellRef = useRef<HTMLDivElement | null>(null)
  const activeItemRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const body = bodyRef.current
    const activeShell = activeShellRef.current
    const activeItem = activeItemRef.current

    if (!body || !activeShell || !activeItem) return

    const activeElement = document.activeElement
    const shouldSyncFocus =
      activeElement instanceof HTMLElement && body.contains(activeElement)

    const bodyRect = body.getBoundingClientRect()
    const activeRect = activeShell.getBoundingClientRect()
    const isAboveViewport = activeRect.top < bodyRect.top
    const isBelowViewport = activeRect.bottom > bodyRect.bottom

    if (isAboveViewport || isBelowViewport) {
      activeShell.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }

    if (shouldSyncFocus && activeElement !== activeItem) {
      activeItem.focus()
    }
  }, [currentSlideId])

  return (
    <aside className="editor-sidebar editor-sidebar--left">
      <div className="editor-sidebar__header">
        <div>
          <p className="editor-sidebar__title">
            <img
              alt=""
              aria-hidden="true"
              className="editor-sidebar__site-icon"
              src="/favicon.png"
            />
            <span>ilwonyoon.com</span>
          </p>
          <span className="editor-sidebar__subtitle">{slides.length} frames</span>
        </div>

        <button
          aria-label="Enter full screen"
          className="editor-sidebar__toggle"
          onClick={onEnterPresent}
          type="button"
        >
          <Maximize2 aria-hidden="true" size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="editor-sidebar__body" ref={bodyRef}>
        <div className="slide-index">
          {slides.map((slide, index) => {
            const isActive = slide.id === currentSlideId
            const formattedIndex = String(index + 1).padStart(2, '0')
            const showStepDots = slide.stepDisplay !== 'none' && slide.steps > 1
            const totalSteps = Math.max(slide.steps, 1)
            const stepDots = Array.from({ length: totalSteps }, (_, i) => i)
            const canDelete = editingEnabled && slides.length > 1 && onDelete
            const canReorder = editingEnabled && Boolean(onReorder)
            const isDropTarget =
              dropTargetIndex === index && draggedIndex !== null && draggedIndex !== index

            return (
              <div
                className="slide-index__item-shell"
                data-active={isActive}
                data-drop-target={isDropTarget}
                draggable={canReorder}
                key={slide.id}
                ref={(node) => {
                  if (isActive) activeShellRef.current = node
                }}
                onDragEnd={() => {
                  setDraggedIndex(null)
                  setDropTargetIndex(null)
                }}
                onDragOver={(event) => {
                  if (!canReorder) return
                  event.preventDefault()
                  if (dropTargetIndex !== index) setDropTargetIndex(index)
                }}
                onDragStart={(event) => {
                  if (!canReorder) return
                  setDraggedIndex(index)
                  event.dataTransfer.effectAllowed = 'move'
                  event.dataTransfer.setData('text/plain', slide.id)
                }}
                onDrop={(event) => {
                  if (!canReorder) return
                  event.preventDefault()
                  if (draggedIndex === null || draggedIndex === index) {
                    setDraggedIndex(null)
                    setDropTargetIndex(null)
                    return
                  }
                  onReorder?.(draggedIndex, index)
                  setDraggedIndex(null)
                  setDropTargetIndex(null)
                }}
              >
                <div
                  aria-current={isActive ? 'true' : undefined}
                  className="slide-index__item"
                  onClick={() => onSelect(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onSelect(index)
                    }
                  }}
                  role="button"
                  ref={(node) => {
                    if (isActive) activeItemRef.current = node
                  }}
                  tabIndex={isActive ? 0 : -1}
                >
                  <span className="slide-index__number">{formattedIndex}</span>

                  <SlideThumbnail>
                    {slide.render({
                      advanceStep: () => undefined,
                      advanceSlide: () => undefined,
                      autoPlay: false,
                      isThumbnail: true,
                      step: 0,
                      slideIndex: index,
                      totalSlides: slides.length,
                    })}
                  </SlideThumbnail>
                </div>

                {editingEnabled ? (
                  <div className="slide-index__item-actions">
                    <span className="slide-index__drag-handle" title="Drag to reorder">
                      <GripVertical aria-hidden="true" size={14} strokeWidth={2} />
                    </span>
                    {canDelete ? (
                      <button
                        aria-label={`Delete ${slide.navLabel}`}
                        className="slide-index__action-button"
                        onClick={(event) => {
                          event.stopPropagation()
                          onDelete?.(slide.id)
                        }}
                        type="button"
                      >
                        <Trash2 aria-hidden="true" size={14} strokeWidth={2} />
                      </button>
                    ) : null}
                  </div>
                ) : null}

                {showStepDots ? (
                  <div className="slide-index__step-dots" aria-hidden="true">
                    {stepDots.map((stepIndex) => (
                      <span
                        className="slide-index__step-dot"
                        data-active={stepIndex === 0}
                        key={stepIndex}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
