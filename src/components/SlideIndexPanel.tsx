import { FileText, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import type { SlideDefinition } from '../types/presentation'

const THUMBNAIL_WIDTH = 204
const THUMBNAIL_SCALE = THUMBNAIL_WIDTH / 1920

type SlideIndexPanelProps = {
  collapsed: boolean
  currentSlideId: string
  onSelect: (slideIndex: number) => void
  onToggleCollapse: () => void
  slides: SlideDefinition[]
}

export function SlideIndexPanel({
  collapsed,
  currentSlideId,
  onSelect,
  onToggleCollapse,
  slides,
}: SlideIndexPanelProps) {
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

            return (
              <button
                aria-current={isActive ? 'true' : undefined}
                className="slide-index__item"
                data-active={isActive}
                key={slide.id}
                onClick={() => onSelect(index)}
                type="button"
              >
                <span className="slide-index__number">{formattedIndex}</span>

                {collapsed ? null : (
                  <>
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
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
