import { useEffect, useRef } from 'react'

// Ported from HighlightThinking.swift — same orbit math, same constants.
// viewBox 142, planet center (70.5, 68.5), orbit radius 36.5.

const VB = 142
const CX = 70.5
const CY = 68.5
const ORBIT_R = 36.5
const TILT_K = 0.42
const DEPTH_SCALE = 0.34
const EASE = 0.2

// Spring return config (matches .spring in Swift)
const CFG = { move: 0.85, grow: 0.46, overlap: 0.00, spring: true }

function smooth(p: number) { const q = Math.min(1, Math.max(0, p)); return q * q * (3 - 2 * q) }
function easeOutBack(p: number) {
  const q = Math.min(1, Math.max(0, p)), c1 = 1.70158, c3 = 2.70158
  return 1 + c3 * Math.pow(q - 1, 3) + c1 * Math.pow(q - 1, 2)
}
function lerpH(a: number, b: number, p: number) { return a + (b - a) * p }

function orbitDeg(dt: number, period: number) {
  const base = (dt / period) * 2 * Math.PI
  return (base + EASE * Math.sin(2 * base)) * (180 / Math.PI)
}

interface Pose { angle: number; spin: number; satH: number }

// Loop cycle: hold(bars) → shrink → think → decel return → grow bars → repeat
function loopPose(t: number, period: number, systemPeriod: number): Pose {
  const HOLD_DUR = 1.1
  const SHRINK   = 0.4
  const THINK_DUR = 3.6
  const MOVE = CFG.move   // 0.85
  const GROW = CFG.grow   // 0.46

  // Phase boundaries (cumulative)
  const ph1 = HOLD_DUR                           // end of logo hold
  const ph2 = ph1 + SHRINK                       // end of bar→dot shrink
  const ph3 = ph2 + THINK_DUR                    // end of orbit
  const ph4 = ph3 + MOVE                         // end of decel return
  const ph5 = ph4 + GROW                         // end of bar grow → full cycle

  const tc = t % ph5

  // Orbit state at hand-off (end of THINK_DUR)
  const aEnd = orbitDeg(THINK_DUR, period)
  let aTarget = Math.ceil(aEnd / 180) * 180
  if (aTarget - aEnd < 70) aTarget += 180
  const spinEnd = (THINK_DUR / systemPeriod) * 360
  const spinTarget = Math.ceil(spinEnd / 360) * 360
  const baseEnd = (THINK_DUR / period) * 2 * Math.PI
  const v3 = (360 / period) * (1 + 2 * EASE * Math.cos(2 * baseEnd))

  // --- angle + spin ---
  let angle: number, spin: number

  if (tc < ph2) {
    // hold + shrink: logo position
    angle = 0; spin = 0
  } else if (tc < ph3) {
    // orbiting
    const dt = tc - ph2
    angle = orbitDeg(dt, period)
    spin  = (dt / systemPeriod) * 360
  } else if (tc < ph4) {
    // velocity-matched decel back to logo
    const p  = (tc - ph3) / MOVE
    const m0 = Math.min(1.7, v3 * MOVE / (aTarget - aEnd))
    const f  = (m0 - 2) * p * p * p + (3 - 2 * m0) * p * p + m0 * p
    angle = aEnd + (aTarget - aEnd) * f
    spin  = spinEnd + (spinTarget - spinEnd) * f
  } else {
    // grow + next hold: resting position
    angle = aTarget; spin = spinTarget
  }

  // --- satellite height ---
  let satH: number

  if (tc < ph1) {
    satH = 76                                                        // logo hold
  } else if (tc < ph2) {
    satH = lerpH(76, 20, smooth((tc - ph1) / SHRINK))              // bar → dot
  } else if (tc < ph3) {
    satH = 20                                                        // orbiting as dots
  } else if (tc < ph4) {
    satH = 20                                                        // still dots during decel
  } else {
    // spring grow from dot back to bars
    const gp = (tc - ph4) / GROW
    satH = lerpH(20, 76, CFG.spring ? easeOutBack(gp) : smooth(gp))
  }

  return { angle, spin, satH }
}

interface ThinkingOrbitProps {
  size?: number
  color?: string
  period?: number
  systemPeriod?: number
}

export function ThinkingOrbit({ size = 24, color = '#23201A', period = 2.8, systemPeriod = 7 }: ThinkingOrbitProps) {
  const startRef = useRef(performance.now())
  const rafRef = useRef<number | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const ns = 'http://www.w3.org/2000/svg'
    const s = size / VB

    function makeRect() { return document.createElementNS(ns, 'rect') }
    function makeCircle() { return document.createElementNS(ns, 'circle') }

    // Pre-allocate 5 elements (back1, back2, planet, front1, front2)
    const back1 = makeRect(), back2 = makeRect()
    const planet = makeCircle()
    const front1 = makeRect(), front2 = makeRect()

    const svg = svgRef.current!
    svg.appendChild(back1)
    svg.appendChild(back2)
    svg.appendChild(planet)
    svg.appendChild(front1)
    svg.appendChild(front2)

    planet.setAttribute('cx', String(CX * s))
    planet.setAttribute('cy', String(CY * s))
    planet.setAttribute('r', String((45 / 2) * s))
    planet.setAttribute('fill', color)

    function applyRect(el: SVGRectElement, sat: { x: number; y: number; w: number; h: number; rx: number; opacity: number }, visible: boolean) {
      el.setAttribute('display', visible ? '' : 'none')
      if (!visible) return
      el.setAttribute('x', String(sat.x - sat.w / 2))
      el.setAttribute('y', String(sat.y - sat.h / 2))
      el.setAttribute('width', String(sat.w))
      el.setAttribute('height', String(sat.h))
      el.setAttribute('rx', String(sat.rx))
      el.setAttribute('fill', color)
      el.setAttribute('opacity', String(sat.opacity))
    }

    function getSat(phaseDeg: number, spin: number, satH: number) {
      const a = (phaseDeg * Math.PI) / 180
      const lx = ORBIT_R * Math.cos(a)
      const ly = ORBIT_R * TILT_K * Math.sin(a)
      const r = (spin * Math.PI) / 180
      const cr = Math.cos(r), sr = Math.sin(r)
      const x = CX + lx * cr - ly * sr
      const y = CY + lx * sr + ly * cr
      const depth = Math.sin(a)
      const scale = 1 + depth * DEPTH_SCALE
      return {
        x: x * s, y: y * s,
        w: 20 * s * scale, h: satH * s * scale,
        rx: 10 * s,
        opacity: 0.62 + 0.38 * ((depth + 1) / 2),
        near: depth >= 0,
      }
    }

    function tick() {
      const elapsed = (performance.now() - startRef.current) / 1000
      const { angle, spin, satH } = loopPose(elapsed, period, systemPeriod)
      const sat1 = getSat(angle, spin, satH)
      const sat2 = getSat(angle + 180, spin, satH)

      applyRect(back1 as SVGRectElement, sat1, !sat1.near)
      applyRect(back2 as SVGRectElement, sat2, !sat2.near)
      applyRect(front1 as SVGRectElement, sat1, sat1.near)
      applyRect(front2 as SVGRectElement, sat2, sat2.near)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [size, color, period, systemPeriod])

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', overflow: 'visible', flexShrink: 0 }}
    />
  )
}

// Static resting logo (no animation)
export function HighlightMark({ size = 48, color = '#23201A' }: { size?: number; color?: string }) {
  const s = size / VB
  const sat1 = getSatStatic(0, 0, 76, s)
  const sat2 = getSatStatic(180, 0, 76, s)
  const planetR = (45 / 2) * s
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', overflow: 'visible' }}>
      <rect x={sat1.x - sat1.w / 2} y={sat1.y - sat1.h / 2} width={sat1.w} height={sat1.h} rx={sat1.rx} fill={color} opacity={sat1.opacity} />
      <rect x={sat2.x - sat2.w / 2} y={sat2.y - sat2.h / 2} width={sat2.w} height={sat2.h} rx={sat2.rx} fill={color} opacity={sat2.opacity} />
      <circle cx={CX * s} cy={CY * s} r={planetR} fill={color} />
    </svg>
  )
}

function getSatStatic(phaseDeg: number, spin: number, satH: number, s: number) {
  const a = (phaseDeg * Math.PI) / 180
  const lx = ORBIT_R * Math.cos(a)
  const ly = ORBIT_R * TILT_K * Math.sin(a)
  const r = (spin * Math.PI) / 180
  const cr = Math.cos(r), sr = Math.sin(r)
  const x = CX + lx * cr - ly * sr
  const y = CY + lx * sr + ly * cr
  const depth = Math.sin(a)
  const scale = 1 + depth * DEPTH_SCALE
  return {
    x: x * s, y: y * s,
    w: 20 * s * scale, h: satH * s * scale,
    rx: 10 * s,
    opacity: 0.62 + 0.38 * ((depth + 1) / 2),
  }
}
