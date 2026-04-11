import {
  Crosshair,
  Grid3X3,
  SlidersHorizontal,
  Type,
  Play,
  X,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { SlideDefinition } from '../types/presentation'
import type { CanvasSelection } from '../types/inspector'

function MetricField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="inspector-field">
      <span className="inspector-field__label">{label}</span>
      <span className="inspector-field__value">{value}</span>
    </div>
  )
}

function SectionTitle({
  icon,
  label,
}: {
  icon: ReactNode
  label: string
}) {
  return (
    <span className="inspector-panel__section-title">
      {icon}
      <span>{label}</span>
    </span>
  )
}

type DeckInspectorPanelProps = {
  collapsed: boolean
  onToggleCollapse: () => void
  onToggleGrid: () => void
  onTogglePresentationMode: () => void
  presentationMode: 'edit' | 'present'
  selection: CanvasSelection | null
  showGrid: boolean
  slides: SlideDefinition[]
}

export function DeckInspectorPanel({
  collapsed,
  onToggleCollapse,
  onToggleGrid,
  onTogglePresentationMode,
  presentationMode,
  selection,
  showGrid,
  slides,
}: DeckInspectorPanelProps) {
  function formatPixels(value: number | null) {
    return value === null ? '-' : `${value}px`
  }

  const selectionTitle = selection
    ? selection.kind === 'text'
      ? 'Text'
      : selection.tagName.charAt(0).toUpperCase() + selection.tagName.slice(1)
    : 'No Selection'
  const selectionIcon =
    selection?.kind === 'text' ? (
      <Type aria-hidden="true" size={14} strokeWidth={2} />
    ) : (
      <SlidersHorizontal aria-hidden="true" size={14} strokeWidth={2} />
    )

  return (
    <aside
      className="editor-sidebar editor-sidebar--right"
      data-collapsed={collapsed}
    >
      <div className="editor-sidebar__header">
        {collapsed ? (
          <span className="editor-sidebar__eyebrow">
            <SlidersHorizontal aria-hidden="true" size={14} strokeWidth={2} />
          </span>
        ) : (
          <div>
            <p className="editor-sidebar__title">
              {selectionIcon}
              <span>{selectionTitle}</span>
            </p>
            <span className="editor-sidebar__subtitle">
              {selection ? 'Inspector' : `${slides.length} slides`}
            </span>
          </div>
        )}

        <div className="editor-sidebar__header-actions">
          <button
            aria-label={
              presentationMode === 'present'
                ? 'Exit presentation mode'
                : 'Enter presentation mode'
            }
            className="editor-sidebar__toggle editor-sidebar__toggle--mode"
            onClick={onTogglePresentationMode}
            type="button"
          >
            {presentationMode === 'present' ? (
              <X aria-hidden="true" size={16} strokeWidth={2} />
            ) : (
              <Play aria-hidden="true" size={16} strokeWidth={2} />
            )}
          </button>

          <button
            aria-label={collapsed ? 'Expand tools panel' : 'Collapse tools panel'}
            className="editor-sidebar__toggle"
            onClick={onToggleCollapse}
            type="button"
          >
            {collapsed ? (
              <PanelRightOpen aria-hidden="true" size={16} strokeWidth={2} />
            ) : (
              <PanelRightClose aria-hidden="true" size={16} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {collapsed ? null : (
        <div className="editor-sidebar__body">
          <section className="inspector-panel__section">
            <div className="inspector-panel__section-header">
              <SectionTitle
                icon={<Crosshair aria-hidden="true" size={13} strokeWidth={2} />}
                label="Selection"
              />
              <span className="inspector-panel__value">
                {selection ? selection.kind : 'none'}
              </span>
            </div>

            {selection ? (
              <>
                <div className="inspector-subsection">
                  <span className="inspector-subsection__title">Position</span>

                  <div className="inspector-field-grid">
                    <MetricField label="X" value={formatPixels(selection.x)} />
                    <MetricField label="Y" value={formatPixels(selection.y)} />
                    <MetricField label="W" value={formatPixels(selection.width)} />
                    <MetricField label="H" value={formatPixels(selection.height)} />
                  </div>
                </div>

                {selection.kind === 'text' ? (
                  <>
                    <div className="inspector-subsection">
                      <span className="inspector-subsection__title">
                        <Type aria-hidden="true" size={12} strokeWidth={2} />
                        <span>Typography</span>
                      </span>

                      <div className="inspector-field-grid">
                        <MetricField
                          label="Size"
                          value={formatPixels(selection.fontSize)}
                        />
                        <MetricField
                          label="Leading"
                          value={formatPixels(selection.lineHeight)}
                        />
                        <MetricField
                          label="Tracking"
                          value={formatPixels(selection.letterSpacing)}
                        />
                        <MetricField
                          label="Length"
                          value={String(selection.textLength ?? '-')}
                        />
                      </div>
                    </div>

                    <div className="inspector-subsection">
                      <span className="inspector-subsection__title">Content</span>
                      {selection.text ? (
                        <div className="inspector-text-preview">{selection.text}</div>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <p className="inspector-empty">
                Click any text or object on the canvas to inspect its metrics.
              </p>
            )}
          </section>

          <section className="inspector-panel__section">
            <div className="inspector-panel__section-header">
              <SectionTitle
                icon={<Grid3X3 aria-hidden="true" size={13} strokeWidth={2} />}
                label="Layout"
              />
              <span className="inspector-panel__value">
                {showGrid ? 'visible' : 'hidden'}
              </span>
            </div>

            <button
              aria-pressed={showGrid}
              className="inspector-toggle"
              data-active={showGrid}
              onClick={onToggleGrid}
              type="button"
            >
              <span className="inspector-toggle__copy">
                <span className="inspector-toggle__label">
                  <Grid3X3 aria-hidden="true" size={14} strokeWidth={2} />
                  <span>Grid system</span>
                </span>
                <span className="inspector-toggle__hint">
                  Show the 12-column overlay on the slide canvas.
                </span>
              </span>

              <span className="inspector-switch" aria-hidden="true">
                <span className="inspector-switch__thumb" />
              </span>
            </button>
          </section>
        </div>
      )}
    </aside>
  )
}
