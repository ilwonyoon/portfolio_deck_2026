import { useCallback, useEffect, useRef, useState } from 'react'

const STATEMENTS = [
  { index: '01', text: 'Led a 40+ person design org at Ohouse.' },
  { index: '02', text: 'Worked at Google, Amaze VR, Meta.' },
  { index: '03', text: 'Now shipping iOS & macOS apps — 1,500+ hours vibe coding.' },
  {
    index: '04',
    text: 'Looking to build AI-native products — and work AI-natively.',
  },
]

const REVEAL_DELAY_MS = 320
const CHAR_DELAY_MS = 28

function useTypingSequence(statements: typeof STATEMENTS) {
  const [revealed, setRevealed] = useState<number>(-1)
  const [charCounts, setCharCounts] = useState<number[]>(statements.map(() => 0))
  const [ctaVisible, setCtaVisible] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setRevealed(statements.length - 1)
      setCharCounts(statements.map((s) => s.text.length))
      setCtaVisible(true)
      return
    }

    let cancelled = false

    async function run() {
      for (let i = 0; i < statements.length; i++) {
        await delay(i === 0 ? 600 : REVEAL_DELAY_MS)
        if (cancelled) return
        setRevealed(i)

        const text = statements[i].text
        for (let c = 1; c <= text.length; c++) {
          await delay(CHAR_DELAY_MS)
          if (cancelled) return
          setCharCounts((prev) => {
            const next = [...prev]
            next[i] = c
            return next
          })
        }
      }

      await delay(480)
      if (!cancelled) setCtaVisible(true)
    }

    run()
    return () => { cancelled = true }
  }, [statements])

  return { revealed, charCounts, ctaVisible }
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function PageBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouse = useRef({ x: 0.5, y: 0.5 })
  const animRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    window.addEventListener('mousemove', handleMouseMove)

    const update = () => {
      smoothMouse.current = {
        x: smoothMouse.current.x + (mouseRef.current.x - smoothMouse.current.x) * 0.003,
        y: smoothMouse.current.y + (mouseRef.current.y - smoothMouse.current.y) * 0.003,
      }
      el.style.setProperty('--mx', `${(smoothMouse.current.x - 0.5) * 30}px`)
      el.style.setProperty('--my', `${(smoothMouse.current.y - 0.5) * 20}px`)
      animRef.current = requestAnimationFrame(update)
    }
    update()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <div className="landing-bg">
      <div
        ref={ref}
        className="landing-bg__gradient"
        style={{ transform: 'translate(var(--mx, 0px), var(--my, 0px))' }}
      />
    </div>
  )
}

export function LandingPage() {
  const { revealed, charCounts, ctaVisible } = useTypingSequence(STATEMENTS)

  return (
    <div className="landing">
      <PageBackground />

      <div className="landing__content">
        <header className="landing__header">
          <span className="landing__name">ilwonyoon</span>
        </header>

        <ol className="landing__statements" aria-label="Portfolio introduction">
          {STATEMENTS.map((statement, i) => {
            const isVisible = revealed >= i
            const displayText = statement.text.slice(0, charCounts[i])
            return (
              <li
                className="landing__statement"
                data-visible={isVisible}
                key={statement.index}
              >
                <span className="landing__statement-index" aria-hidden="true">
                  {statement.index}
                </span>
                <span className="landing__statement-text">
                  {isVisible ? displayText : ''}
                  {isVisible && charCounts[i] < statement.text.length && (
                    <span className="landing__cursor" aria-hidden="true" />
                  )}
                </span>
              </li>
            )
          })}
        </ol>

        <div className="landing__cta" data-visible={ctaVisible}>
          <a className="landing__cta-link" href="/portfolio">
            View portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
