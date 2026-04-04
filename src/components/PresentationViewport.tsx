import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

function getViewportSize() {
  if (typeof window === 'undefined') {
    return { width: DESIGN_WIDTH, height: DESIGN_HEIGHT }
  }

  return { width: window.innerWidth, height: window.innerHeight }
}

export function PresentationViewport({ children }: { children: ReactNode }) {
  const [viewportSize, setViewportSize] = useState(getViewportSize)

  useEffect(() => {
    function handleResize() {
      setViewportSize(getViewportSize())
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const scale = useMemo(() => {
    const availableWidth = Math.max(viewportSize.width, 320)
    const availableHeight = Math.max(viewportSize.height, 240)

    return Math.max(
      availableWidth / DESIGN_WIDTH,
      availableHeight / DESIGN_HEIGHT,
      0.1,
    )
  }, [viewportSize.height, viewportSize.width])

  const stageStyle = useMemo<CSSProperties>(
    () => ({
      transform: `translate(${(viewportSize.width - DESIGN_WIDTH * scale) / 2}px, ${(viewportSize.height - DESIGN_HEIGHT * scale) / 2}px) scale(${scale})`,
    }),
    [scale, viewportSize.height, viewportSize.width],
  )

  const frameStyle = useMemo<CSSProperties>(
    () => ({
      width: `${viewportSize.width}px`,
      height: `${viewportSize.height}px`,
    }),
    [viewportSize.height, viewportSize.width],
  )

  return (
    <div className="presentation-viewport">
      <div className="presentation-stage-frame" style={frameStyle}>
        <div className="presentation-stage" style={stageStyle}>
          {children}
        </div>
      </div>
    </div>
  )
}
