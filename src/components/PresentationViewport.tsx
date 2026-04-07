import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import type { CanvasSelection } from '../types/inspector'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080
const GRID_COLUMNS = Array.from({ length: 12 }, (_, index) => index)

function readFrameSize(element: HTMLDivElement | null) {
  if (!element) {
    return { width: DESIGN_WIDTH, height: DESIGN_HEIGHT }
  }

  return {
    width: element.clientWidth,
    height: element.clientHeight,
  }
}

function roundMetric(value: number) {
  return Math.round(value * 10) / 10
}

function readPixelValue(value: string) {
  if (!value || value === 'normal') {
    return null
  }

  const parsedValue = Number.parseFloat(value)
  return Number.isFinite(parsedValue) ? roundMetric(parsedValue) : null
}

function isTextElement(element: HTMLElement) {
  const textTags = new Set([
    'a',
    'blockquote',
    'button',
    'code',
    'figcaption',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'label',
    'li',
    'p',
    'span',
    'strong',
  ])

  const textContent = element.textContent?.replace(/\s+/g, ' ').trim() ?? ''
  if (!textContent) {
    return false
  }

  return textTags.has(element.tagName.toLowerCase()) || element.childElementCount === 0
}

function measureSelection(
  element: HTMLElement,
  stage: HTMLDivElement,
): CanvasSelection {
  const stageRect = stage.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()
  const scaleX = DESIGN_WIDTH / stageRect.width
  const scaleY = DESIGN_HEIGHT / stageRect.height
  const computedStyle = window.getComputedStyle(element)
  const textContent = element.textContent?.replace(/\s+/g, ' ').trim() ?? ''
  const kind = isTextElement(element) ? 'text' : 'object'

  return {
    fontSize: kind === 'text' ? readPixelValue(computedStyle.fontSize) : null,
    height: roundMetric(elementRect.height * scaleY),
    kind,
    letterSpacing: kind === 'text' ? readPixelValue(computedStyle.letterSpacing) : null,
    lineHeight: kind === 'text' ? readPixelValue(computedStyle.lineHeight) : null,
    tagName: element.tagName.toLowerCase(),
    text: kind === 'text' ? textContent : null,
    textLength: kind === 'text' ? textContent.length : null,
    width: roundMetric(elementRect.width * scaleX),
    x: roundMetric((elementRect.left - stageRect.left) * scaleX),
    y: roundMetric((elementRect.top - stageRect.top) * scaleY),
  }
}

export function PresentationViewport({
  children,
  onSelectionChange,
  selection,
  showGrid = false,
}: {
  children: ReactNode
  onSelectionChange?: (selection: CanvasSelection | null) => void
  selection: CanvasSelection | null
  showGrid?: boolean
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [viewportSize, setViewportSize] = useState(() => readFrameSize(null))

  useEffect(() => {
    const frame = frameRef.current

    if (!frame) {
      return
    }

    function updateViewportSize() {
      setViewportSize(readFrameSize(frame))
    }

    updateViewportSize()

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(updateViewportSize)
      resizeObserver.observe(frame)

      return () => {
        resizeObserver.disconnect()
      }
    }

    window.addEventListener('resize', updateViewportSize)
    return () => {
      window.removeEventListener('resize', updateViewportSize)
    }
  }, [])

  const availableWidth = Math.max(viewportSize.width, 320)
  const availableHeight = Math.max(viewportSize.height, 240)
  const scale = Math.max(
    Math.min(availableWidth / DESIGN_WIDTH, availableHeight / DESIGN_HEIGHT),
    0.1,
  )

  const stageStyle: CSSProperties = {
    transform: `translate(${(viewportSize.width - DESIGN_WIDTH * scale) / 2}px, ${(viewportSize.height - DESIGN_HEIGHT * scale) / 2}px) scale(${scale})`,
  }

  function handleStageClick(event: MouseEvent<HTMLDivElement>) {
    const stage = stageRef.current
    const target = event.target

    if (!stage || !(target instanceof HTMLElement)) {
      return
    }

    if (target.closest('.presentation-grid-overlay')) {
      onSelectionChange?.(null)
      return
    }

    if (target === stage) {
      onSelectionChange?.(null)
      return
    }

    onSelectionChange?.(measureSelection(target, stage))
  }

  return (
    <div className="presentation-viewport" ref={frameRef}>
      <div className="presentation-stage-frame">
        <div
          className="presentation-stage"
          onClick={handleStageClick}
          ref={stageRef}
          style={stageStyle}
        >
          {children}

          {showGrid ? (
            <div aria-hidden="true" className="presentation-grid-overlay">
              {GRID_COLUMNS.map((column) => (
                <span className="presentation-grid-overlay__column" key={column} />
              ))}
            </div>
          ) : null}

          {selection ? (
            <div aria-hidden="true" className="presentation-selection-overlay">
              <span
                className="presentation-selection-highlight"
                style={{
                  height: `${selection.height}px`,
                  left: `${selection.x}px`,
                  top: `${selection.y}px`,
                  width: `${selection.width}px`,
                }}
              >
                <span className="presentation-selection-label">
                  {selection.tagName}
                </span>
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
