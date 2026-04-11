import { FileText, GripVertical, PanelLeftClose, PanelLeftOpen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { SlideDefinition } from '../types/presentation'

const THUMBNAIL_WIDTH = 204
const THUMBNAIL_SCALE = THUMBNAIL_WIDTH / 1920

type SlideIndexPanelProps = {
  collapsed: boolean
  currentSlideId: string
  editingEnabled?: boolean
  onDelete?: (slideId: string) => void
  onReorder?: (fromIndex: number, toIndex: number) => void
  onSelect: (slideIndex: number) => void
  onToggleCollapse: () => void
  slides: SlideDefinition[]
}

export function SlideIndexPanel({
  collapsed,
  currentSlideId,
  editingEnabled = false,
  onDelete,
  onReorder,
  onSelect,
  onToggleCollapse,
  slides,
}: SlideIndexPanelProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null)

  function handleSelect(index: number) {
    onSelect(index)
  }

  return (
    <aside
      className="editor-sidebar editor-sidebar--left"
      data-collapsed={collapsed}
    >
      <div className="editor-sidebar__header">
        {collapsed ? (
          <span className="editor-sidebar__eyebrow">
            <FileText aria-hidden="true" size={14} strokeWidth={2} />
          </span>
        ) : (
          <div>
            <p className="editor-sidebar__title">
              <FileText aria-hidden="true" size={14} strokeWidth={2} />
              <span>Slides</span>
            </p>
            <span className="editor-sidebar__subtitle">{slides.length} frames</span>
          </div>
        )}

        <button
          aria-label={collapsed ? 'Expand slide index' : 'Collapse slide index'}
          className="editor-sidebar__toggle"
          onClick={onToggleCollapse}
          type="button"
        >
          {collapsed ? (
            <PanelLeftOpen aria-hidden="true" size={16} strokeWidth={2} />
          ) : (
            <PanelLeftClose aria-hidden="true" size={16} strokeWidth={2} />
          )}
        </button>
      </div>

      <div className="editor-sidebar__body">
        <div className="slide-index">
          {slides.map((slide, index) => {
            const isActive = slide.id === currentSlideId
            const formattedIndex = String(index + 1).padStart(2, '0')
            const showStepDots = slide.stepDisplay !== 'none' && slide.steps > 1
            const totalSteps = Math.max(slide.steps, 1)
            const stepDots = Array.from({ length: totalSteps }, (_, stepIndex) => stepIndex)
            const canDelete = editingEnabled && slides.length > 1 && onDelete
            const canReorder = editingEnabled && !collapsed && Boolean(onReorder)
            const isDropTarget =
              dropTargetIndex === index && draggedIndex !== null && draggedIndex !== index

            return (
              <div
                className="slide-index__item-shell"
                data-active={isActive}
                data-drop-target={isDropTarget}
                draggable={canReorder}
                key={slide.id}
                onDragEnd={() => {
                  setDraggedIndex(null)
                  setDropTargetIndex(null)
                }}
                onDragOver={(event) => {
                  if (!canReorder) {
                    return
                  }

                  event.preventDefault()
                  if (dropTargetIndex !== index) {
                    setDropTargetIndex(index)
                  }
                }}
                onDragStart={(event) => {
                  if (!canReorder) {
                    return
                  }

                  setDraggedIndex(index)
                  event.dataTransfer.effectAllowed = 'move'
                  event.dataTransfer.setData('text/plain', slide.id)
                }}
                onDrop={(event) => {
                  if (!canReorder) {
                    return
                  }

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
                  onClick={() => {
                    handleSelect(index)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      handleSelect(index)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <span className="slide-index__number">{formattedIndex}</span>

                  {collapsed ? null : (
                    <span aria-hidden="true" className="slide-index__thumbnail">
                      <span className="slide-index__thumbnail-frame">
                        <span
                          className="slide-index__thumbnail-canvas"
                          style={{
                            width: '1920px',
                            height: '1080px',
                            transform: `scale(${THUMBNAIL_SCALE})`,
                          }}
                        >
                          {slide.render({
                            advanceStep: () => undefined,
                            advanceSlide: () => undefined,
                            autoPlay: false,
                            step: 0,
                            slideIndex: index,
                            totalSlides: slides.length,
                          })}
                        </span>
                        {showStepDots ? (
                          <span className="slide-index__step-dots" aria-hidden="true">
                            {stepDots.map((stepIndex) => (
                              <span
                                className="slide-index__step-dot"
                                data-active={stepIndex === 0}
                                key={stepIndex}
                              />
                            ))}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  )}
                </div>

                {!collapsed && editingEnabled ? (
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
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
