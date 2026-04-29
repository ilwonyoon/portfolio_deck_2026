import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type ViewMode = 'mau' | 'revenue'

type ChartPoint = {
  label: string
  mau: number
  revenueYoY: number
}

type PointXY = {
  x: number
  y: number
}

const DATA: ChartPoint[] = [
  { label: '2019 Jan', mau: 120, revenueYoY: 5 },
  { label: '2020 Jan', mau: 210, revenueYoY: 8 },
  { label: '2021 Jun', mau: 400, revenueYoY: 14 },
  { label: '2021 Aug', mau: 590, revenueYoY: 18 },
  { label: '2022 Jun', mau: 505, revenueYoY: 15 },
  { label: '2022 Dec', mau: 480, revenueYoY: 10 },
  { label: '2023 Jun', mau: 330, revenueYoY: 8 },
  { label: '2023 Dec', mau: 332, revenueYoY: 9 },
  { label: '2024', mau: 400, revenueYoY: 12 },
]

const REVENUE_BARS = [
  { label: '2020→21', value: 55 },
  { label: '2021→22', value: 59 },
  { label: '2022→23', value: 31 },
  { label: '2023→24', value: 20 },
]

const MAU_DOMAIN: [number, number] = [0, 660]
const REVENUE_YOY_DOMAIN: [number, number] = [0, 24]

const COLORS = {
  background: '#040404',
  grid: 'rgba(255, 255, 255, 0.05)',
  axis: 'rgba(255, 255, 255, 0.34)',
  axisActive: 'rgba(255, 255, 255, 0.92)',
  mau: '#F1F1F1',
  mauInactive: 'rgba(241, 241, 241, 0.46)',
  revenueBar: 'rgba(255, 255, 255, 0.48)',
  revenueBarMuted: 'rgba(255, 255, 255, 0.28)',
}

const DEFAULT_SIZE = { width: 1920, height: 1080 }

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function scaleLinear(
  value: number,
  domain: [number, number],
  range: [number, number],
) {
  const [d0, d1] = domain
  const [r0, r1] = range
  const safeSpan = d1 - d0 || 1
  const ratio = (value - d0) / safeSpan
  return r0 + ratio * (r1 - r0)
}

function buildSmoothPath(points: PointXY[]) {
  if (points.length === 0) {
    return ''
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`
  }

  const path: string[] = [`M ${points[0].x} ${points[0].y}`]

  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[index - 1] ?? points[index]
    const p1 = points[index]
    const p2 = points[index + 1]
    const p3 = points[index + 2] ?? p2

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    path.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`)
  }

  return path.join(' ')
}

function formatK(value: number) {
  return `${value.toFixed(0)}K`
}

function formatPercent(value: number) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(0)}%`
}

function useResizeObserver<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState(DEFAULT_SIZE)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    const measure = () => {
      const rect = node.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        setSize({
          width: rect.width,
          height: rect.height,
        })
      }
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { ref, size }
}

function Pill({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: string
  onClick?: () => void
}) {
  return (
    <span
      aria-pressed={active ? 'true' : 'false'}
      className={
        active
          ? 'growth-chart-slide__pill growth-chart-slide__pill--active'
          : 'growth-chart-slide__pill'
      }
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) {
          return
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick()
        }
      }}
      role={onClick ? 'button' : 'presentation'}
      tabIndex={onClick ? 0 : -1}
    >
      {children}
    </span>
  )
}

function ChartToggle({
  active,
  onChange,
}: {
  active: ViewMode
  onChange: (next: ViewMode) => void
}) {
  return (
    <div className="growth-chart-slide__toggle" aria-label="Chart mode toggle">
      <Pill active={active === 'mau'} onClick={() => onChange('mau')}>
        MAU
      </Pill>
      <Pill active={active === 'revenue'} onClick={() => onChange('revenue')}>
        REVENUE YOY
      </Pill>
    </div>
  )
}

function ChartPanel() {
  const [view, setView] = useState<ViewMode>('mau')
  const { ref, size } = useResizeObserver<HTMLDivElement>()
  const width = size.width || DEFAULT_SIZE.width
  const height = size.height || DEFAULT_SIZE.height

  const paddingX = clamp(Math.round(width * 0.06), 46, 84)
  const paddingTop = clamp(Math.round(height * 0.08), 48, 72)
  const plotLeft = paddingX + 12
  const plotRight = width - paddingX - 8
  const plotTop = paddingTop + 154
  const plotBottom = height - clamp(Math.round(height * 0.13), 116, 150)
  const plotWidth = Math.max(1, plotRight - plotLeft)
  const plotHeight = Math.max(1, plotBottom - plotTop)

  const chartPoints = useMemo(() => {
    const count = DATA.length
    const spacing = count > 1 ? plotWidth / (count - 1) : 0

    return DATA.map((point, index) => {
      const x = plotLeft + index * spacing
      return {
        ...point,
        mauY: scaleLinear(point.mau, MAU_DOMAIN, [plotBottom, plotTop]),
        revenueY: scaleLinear(
          point.revenueYoY,
          REVENUE_YOY_DOMAIN,
          [plotBottom, plotTop],
        ),
        x,
      }
    })
  }, [plotBottom, plotLeft, plotTop, plotWidth])

  const mauPath = useMemo(
    () =>
      buildSmoothPath(
        chartPoints.slice(0, -1).map(({ x, mauY }) => ({ x, y: mauY })),
      ),
    [chartPoints],
  )

  const revenueBars = useMemo(() => {
    const chartWidth = Math.max(1, plotWidth)
    const groupWidth = chartWidth / REVENUE_BARS.length
    const barWidth = clamp(Math.round(groupWidth * 0.32), 34, 54)

    return REVENUE_BARS.map((bar, index) => {
      const centerX = plotLeft + groupWidth * index + groupWidth / 2
      const barHeight = scaleLinear(bar.value, [0, 60], [18, plotHeight * 0.72])
      return {
        ...bar,
        barHeight,
        barWidth,
        x: centerX,
        y: plotBottom - barHeight,
      }
    })
  }, [plotBottom, plotHeight, plotLeft, plotWidth])

  return (
    <div className="growth-chart-slide__panel" ref={ref}>
      <div className="growth-chart-slide__toolbar">
        <ChartToggle active={view} onChange={setView} />
      </div>

      <svg
        aria-label="Ohouse growth chart"
        className="growth-chart-slide__svg"
        preserveAspectRatio="none"
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
      >
        {Array.from({ length: 5 }, (_, index) => {
          const y = plotTop + ((plotHeight / 4) * index)
          return (
            <line
              key={`grid-${index}`}
              className="growth-chart-slide__grid-line"
              x1={plotLeft}
              x2={plotRight}
              y1={y}
              y2={y}
            />
          )
        })}

        {view === 'mau'
          ? chartPoints.map(({ x, label }) => (
              <g key={`tick-${label}`}>
                <line
                  className="growth-chart-slide__tick-line"
                  x1={x}
                  x2={x}
                  y1={plotTop}
                  y2={plotBottom}
                />
                <text
                  className="growth-chart-slide__year-label"
                  data-active={label === '2021 Aug' || label === '2024'}
                  x={x}
                  y={plotBottom + 32}
                >
                  {label}
                </text>
              </g>
            ))
          : REVENUE_BARS.map(({ label }, index) => {
              const count = REVENUE_BARS.length
              const groupWidth = plotWidth / count
              const x = plotLeft + groupWidth * index + groupWidth / 2
              return (
                <g key={`tick-${label}`}>
                  <line
                    className="growth-chart-slide__tick-line"
                    x1={x}
                    x2={x}
                    y1={plotTop}
                    y2={plotBottom}
                  />
                  <text
                    className="growth-chart-slide__year-label"
                    data-active={index === 1 || index === 3}
                    x={x}
                    y={plotBottom + 32}
                  >
                    {label}
                  </text>
                </g>
              )
            })}

        {view === 'mau' ? (
          <>
            <path
              d={mauPath}
              fill="none"
              stroke={COLORS.mau}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
            />
          </>
        ) : (
          <>
            {revenueBars.map(({ label, value, x, y, barWidth, barHeight }) => (
              <g key={`bar-${label}`}>
                <rect
                  x={x - barWidth / 2}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={2}
                  fill={
                    label === '2020→21' || label === '2021→22'
                      ? COLORS.revenueBar
                      : COLORS.revenueBarMuted
                  }
                />
                <text
                  className="growth-chart-slide__value-label"
                  fill={COLORS.axisActive}
                  fontSize="16"
                  fontWeight="600"
                  textAnchor="middle"
                  x={x}
                  y={y - 12}
                >
                  {formatPercent(value)}
                </text>
              </g>
            ))}
          </>
        )}

        {chartPoints.slice(0, -1).map(({ x, mauY, label }) => {
          const isPeak = label === '2021 Aug'
          const showMauValue =
            label === '2021 Aug' || label === '2022 Dec' || label === '2023 Jun'

          return (
            <g key={`point-${label}`}>
              {view === 'mau' ? (
                <>
                  <circle
                    cx={x}
                    cy={mauY}
                    fill="#FFFFFF"
                    r={isPeak ? 7.5 : 4.25}
                    stroke="none"
                  />
                  {showMauValue ? (
                    <text
                      className="growth-chart-slide__value-label"
                      fill={COLORS.axisActive}
                      fontSize="16"
                      fontWeight="600"
                      textAnchor="middle"
                      x={x}
                      y={mauY - 18}
                    >
                      {formatK(DATA.find((point) => point.label === label)?.mau ?? 0)}
                    </text>
                  ) : null}
                </>
              ) : null}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function OhouseChartSlide() {
  return (
    <article className="growth-chart-slide">
      <div className="growth-chart-slide__copy">
        <span className="growth-chart-slide__kicker">03 / SHIFT</span>
        <h1 className="growth-chart-slide__title">
          The loop worked. Then the market shifted
        </h1>
        <p className="growth-chart-slide__body">
          MAU dropped 44%. Housing transactions, down 50%.
          Users leave once the move is done.
        </p>
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="growth-chart-slide__chart-wrap"
        initial={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <ChartPanel />
      </motion.div>
    </article>
  )
}
