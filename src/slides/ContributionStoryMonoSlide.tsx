import { useEffect, useMemo, useRef, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { ProposalBadge } from '../components/ProposalBadge'

const GRID_ROWS = 6
const GRID_COLUMNS = 20
const CELL_SIZE = 16
const CELL_GAP = 4

type GridCell = {
  column: number
  level: 0 | 1 | 2 | 3 | 4
  row: number
}

const CELL_LEVEL_MATRIX = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 2, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 2, 1, 2, 2, 2, 3, 2, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 3, 3, 2, 2, 3, 3, 3, 3, 2, 1],
  [0, 0, 0, 1, 2, 2, 1, 0, 0, 1, 3, 2, 2, 3, 4, 3, 2, 2, 2, 1],
  [0, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 3, 3, 4, 2, 2, 3, 2, 1],
  [0, 0, 0, 0, 2, 1, 0, 0, 0, 1, 1, 1, 2, 2, 3, 2, 2, 2, 2, 1],
] as const

const LEVEL_COLOR: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'rgba(255, 255, 255, 0.04)',
  1: 'rgba(255, 255, 255, 0.14)',
  2: 'rgba(255, 255, 255, 0.32)',
  3: 'rgba(255, 255, 255, 0.64)',
  4: 'rgba(255, 255, 255, 0.96)',
}

export function ContributionStoryMonoSlide() {
  const isAutoPlaying =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('mode') === 'present'

  const cells = useMemo<GridCell[]>(
    () =>
      CELL_LEVEL_MATRIX.flatMap((rowLevels, row) =>
        rowLevels.map((level, column) => ({
          column,
          level,
          row,
        })),
      ),
    [],
  )

  const fillCellRefs = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    if (!isAutoPlaying) {
      fillCellRefs.current.forEach((cell) => {
        if (cell) {
          gsap.set(cell, { opacity: 1, scale: 1 })
        }
      })
      return undefined
    }

    fillCellRefs.current.forEach((cell) => {
      if (cell) {
        gsap.set(cell, { opacity: 0, scale: 0.62 })
      }
    })

    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })

    const orderedCells = fillCellRefs.current
      .map((cell, index) => ({ cell, index }))
      .filter(
        (entry): entry is { cell: HTMLSpanElement; index: number } =>
          Boolean(entry.cell),
      )
      .sort((left, right) => {
        const leftRow = Math.floor(left.index / GRID_COLUMNS)
        const rightRow = Math.floor(right.index / GRID_COLUMNS)
        const leftColumn = left.index % GRID_COLUMNS
        const rightColumn = right.index % GRID_COLUMNS
        return leftColumn - rightColumn || leftRow - rightRow
      })
      .map((entry) => entry.cell)

    timeline.to(
      orderedCells,
      {
        opacity: 1,
        scale: 1,
        duration: 0.14,
        ease: 'power2.out',
        stagger: {
          amount: 1.6,
          from: 'start',
          ease: 'power2.in',
        },
      },
      0.18,
    )

    return () => {
      timeline.kill()
    }
  }, [isAutoPlaying])

  return (
    <article
      className="contribution-story-slide contribution-story-slide--mono"
      style={
        {
          '--contrib-cell-size': `${CELL_SIZE}px`,
          '--contrib-cell-gap': `${CELL_GAP}px`,
          '--contrib-grid-width': `${GRID_COLUMNS * CELL_SIZE + (GRID_COLUMNS - 1) * CELL_GAP}px`,
          '--contrib-grid-height': `${GRID_ROWS * CELL_SIZE + (GRID_ROWS - 1) * CELL_GAP}px`,
        } as CSSProperties
      }
    >
      <ProposalBadge />
      <section className="contribution-story-slide__copy">
        <p className="contribution-story-slide__headline">
          1500+ hours of vibe coding.
        </p>
      </section>

      <section
        className="contribution-story-slide__panel"
        aria-label="Contribution heatmap"
      >
        <div className="contribution-story-slide__chart">
          <div className="contribution-story-slide__grid-shell">
            <div
              className="contribution-story-slide__grid contribution-story-slide__grid--base"
              aria-hidden="true"
            >
              {cells.map((cell) => (
                <span
                  className="contribution-story-slide__cell"
                  data-level={cell.level}
                  key={`base-${cell.row}-${cell.column}`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.025)',
                  }}
                />
              ))}
            </div>

            <div
              aria-hidden="true"
              className="contribution-story-slide__grid contribution-story-slide__grid--fill"
            >
              {cells.map((cell) => (
                <span
                  className="contribution-story-slide__cell contribution-story-slide__cell--fill"
                  data-level={cell.level}
                  key={`fill-${cell.row}-${cell.column}`}
                  ref={(node) => {
                    fillCellRefs.current[cell.row * GRID_COLUMNS + cell.column] =
                      node
                  }}
                  style={{
                    backgroundColor: LEVEL_COLOR[cell.level],
                    opacity: isAutoPlaying ? 0 : 1,
                    transform: 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
