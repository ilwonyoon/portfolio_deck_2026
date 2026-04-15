import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import type { CSSProperties } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'

gsap.registerPlugin(useGSAP)

const THUMB_COUNT = 80
const AUTO_SCAN_DELAY = 0.82

type NeedleGridDensity = 'normal' | 'dense'

const THUMB_PATHS = Array.from({ length: THUMB_COUNT }, (_, index) => {
  return `/media/ohouse-grid/thumbs/ohouse-grid-${String(index + 1).padStart(3, '0')}.jpg`
})

const DENSITY_CONFIG = {
  dense: {
    columns: 30,
    focusScale: 2.4,
    rows: 18,
  },
  normal: {
    columns: 20,
    focusScale: 2.15,
    rows: 12,
  },
} as const

function getTileImage(index: number, columns: number) {
  const row = Math.floor(index / columns)
  return THUMB_PATHS[(index * 11 + row * 3) % THUMB_PATHS.length]
}

export function OhouseNeedleGridSlide({
  density = 'normal',
}: {
  density?: NeedleGridDensity
}) {
  const config = DENSITY_CONFIG[density]
  const tileCount = config.columns * config.rows
  const initialIndex = Math.floor(tileCount * 0.4)
  const scopeRef = useRef<HTMLElement | null>(null)
  const tileRefs = useRef<Array<HTMLButtonElement | null>>([])
  const autoScanRef = useRef<gsap.core.Tween | null>(null)
  const activeIndexRef = useRef(initialIndex)
  const hoveringRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(initialIndex)

  const tiles = useMemo(() => {
    return Array.from({ length: tileCount }, (_, index) => ({
      id: index,
      src: getTileImage(index, config.columns),
    }))
  }, [config.columns, tileCount])

  const activeScale = config.focusScale
  const baseScale = density === 'dense' ? 0.92 : 0.9

  const animateFocus = useCallback((index: number) => {
    const nextNode = tileRefs.current[index]?.querySelector<HTMLElement>(
      '.ohouse-needle-grid__tile-card',
    )
    const previousNode = tileRefs.current[
      activeIndexRef.current
    ]?.querySelector<HTMLElement>('.ohouse-needle-grid__tile-card')

    if (previousNode && activeIndexRef.current !== index) {
      gsap.to(previousNode, {
        duration: 0.42,
        ease: 'power3.out',
        filter: 'saturate(0.7) brightness(0.58)',
        opacity: 0.42,
        overwrite: 'auto',
        scale: baseScale,
      })
    }

    if (nextNode) {
      gsap.to(nextNode, {
        duration: 0.5,
        ease: 'power3.out',
        filter: 'saturate(1) brightness(1.04)',
        opacity: 1,
        overwrite: 'auto',
        scale: activeScale,
      })
    }

    activeIndexRef.current = index
    setActiveIndex(index)
  }, [activeScale, baseScale])

  const stopAutoScan = useCallback(() => {
    autoScanRef.current?.kill()
    autoScanRef.current = null
  }, [])

  const startAutoScan = useCallback(() => {
    stopAutoScan()

    const tick = () => {
      if (hoveringRef.current) {
        return
      }

      const nextIndex = (activeIndexRef.current + 1) % tileCount
      animateFocus(nextIndex)
      autoScanRef.current = gsap.delayedCall(AUTO_SCAN_DELAY, tick)
    }

    autoScanRef.current = gsap.delayedCall(AUTO_SCAN_DELAY, tick)
  }, [animateFocus, stopAutoScan, tileCount])

  useGSAP(
    () => {
      const cards = tileRefs.current
        .map((tile) => tile?.querySelector<HTMLElement>('.ohouse-needle-grid__tile-card'))
        .filter((tile): tile is HTMLElement => tile !== null)

      gsap.set(cards, {
        filter: 'saturate(0.7) brightness(0.58)',
        opacity: 0.42,
        scale: baseScale,
        transformOrigin: '50% 50%',
      })

      animateFocus(activeIndexRef.current)
      startAutoScan()

      return () => {
        stopAutoScan()
      }
    },
    {
      scope: scopeRef,
      dependencies: [animateFocus, baseScale, startAutoScan, stopAutoScan],
    },
  )

  const handleTileEnter = useCallback(
    (index: number) => {
      hoveringRef.current = true
      stopAutoScan()
      animateFocus(index)
    },
    [animateFocus, stopAutoScan],
  )

  const handleStageLeave = useCallback(() => {
    hoveringRef.current = false
    startAutoScan()
  }, [startAutoScan])

  const gridStyle = {
    '--needle-grid-columns': String(config.columns),
    '--needle-grid-rows': String(config.rows),
    '--needle-grid-column-gap': density === 'dense' ? '5.2469px' : '8.2526px',
    '--needle-grid-row-gap': density === 'dense' ? '2.001px' : '3.3454px',
    '--needle-grid-tile-size': density === 'dense' ? '37.488px' : '56px',
  } as CSSProperties

  return (
    <article
      className="ohouse-needle-grid"
      data-density={density}
      ref={scopeRef}
      onPointerLeave={handleStageLeave}
    >
      <div className="ohouse-needle-grid__stage">
        <div className="ohouse-needle-grid__grid" data-has-active="true" style={gridStyle}>
          {tiles.map((tile, index) => {
            const isActive = index === activeIndex

            return (
              <button
                aria-label={`Content tile ${index + 1}`}
                className="ohouse-needle-grid__tile"
                data-active={isActive ? 'true' : 'false'}
                key={tile.id}
                ref={(node) => {
                  tileRefs.current[index] = node
                }}
                type="button"
                onFocus={() => handleTileEnter(index)}
                onMouseEnter={() => handleTileEnter(index)}
              >
                <span className="ohouse-needle-grid__tile-card">
                  <img
                    alt=""
                    aria-hidden="true"
                    className="ohouse-needle-grid__tile-image"
                    draggable="false"
                    loading="lazy"
                    src={tile.src}
                  />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </article>
  )
}
