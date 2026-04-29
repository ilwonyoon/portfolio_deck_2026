import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import {
  CustomEase,
  Flip,
  MotionPathPlugin,
  Observer,
  ScrambleTextPlugin,
  SplitText,
  TextPlugin,
} from 'gsap/all'
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { flushSync } from 'react-dom'

gsap.registerPlugin(
  useGSAP,
  CustomEase,
  Flip,
  MotionPathPlugin,
  Observer,
  ScrambleTextPlugin,
  SplitText,
  TextPlugin,
)

CustomEase.create('deckEase', '0.16, 0.84, 0.22, 1')

type GsapStudyMode =
  | 'split-headline'
  | 'scramble-phrase'
  | 'brand-lockup'
  | 'chart-story'
  | 'flip-rail'
  | 'mosaic-resolve'

type MosaicTile = {
  alt: string
  h: number
  id: string
  image: string
  label: string
  stackX: number
  stackY: number
  w: number
  x: number
  y: number
}

type RailCard = {
  blurb: string
  company: string
  role: string
  year: string
}

type ChartPoint = {
  label: string
  value: number
  x: number
  y: number
}

const PHRASE_STATES = [
  {
    phrase: 'Content to Commerce',
    note: 'Literal, fast, and stable for category framing.',
    tag: 'Category shift',
  },
  {
    phrase: 'Inspiration to Purchase',
    note: 'A softer handoff when the narrative is emotional before it is transactional.',
    tag: 'Narrative shift',
  },
  {
    phrase: 'Signal to Decision',
    note: 'Scramble buys ambiguity for a beat without turning into spectacle.',
    tag: 'Decision frame',
  },
] as const

const RAIL_CARDS: RailCard[] = [
  {
    blurb: 'Use the large panel to carry the story, not four equal cards competing for attention.',
    company: 'Ohouse',
    role: 'Head of Product Design',
    year: '2022 → 2025',
  },
  {
    blurb: 'FLIP keeps the rail feeling like one surface that rebalances, instead of a hard tab swap.',
    company: 'Meta',
    role: 'Product Designer',
    year: '2019 → 2022',
  },
  {
    blurb: 'Observer makes wheel and touch feel intentional inside the study without hijacking the whole deck.',
    company: 'AMAZE',
    role: 'UX Lead',
    year: '2016 → 2019',
  },
  {
    blurb: 'The active card should be the loudest region. Everything else can recede to orientation only.',
    company: 'Google',
    role: 'UX Designer',
    year: '2014 → 2016',
  },
] as const

const MOSAIC_TILES: MosaicTile[] = [
  {
    alt: 'Family photo',
    h: 48,
    id: 'family',
    image: '/media/personal/hero-family.png',
    label: 'Anchor',
    stackX: 6,
    stackY: 12,
    w: 43,
    x: 0,
    y: 0,
  },
  {
    alt: 'Motorcycle photo',
    h: 48,
    id: 'ride',
    image: '/media/personal/ride.png',
    label: 'Motion',
    stackX: 12,
    stackY: 18,
    w: 23,
    x: 45,
    y: 0,
  },
  {
    alt: 'Coffee photo',
    h: 24,
    id: 'coffee',
    image: '/media/personal/coffee.png',
    label: 'Ritual',
    stackX: 18,
    stackY: 24,
    w: 28,
    x: 70,
    y: 0,
  },
  {
    alt: 'Forest hike photo',
    h: 24,
    id: 'hike',
    image: '/media/personal/hike.png',
    label: 'Reset',
    stackX: 24,
    stackY: 30,
    w: 28,
    x: 70,
    y: 26,
  },
  {
    alt: 'Soccer field photo',
    h: 28,
    id: 'field',
    image: '/media/personal/field.png',
    label: 'Play',
    stackX: 30,
    stackY: 36,
    w: 21,
    x: 0,
    y: 52,
  },
  {
    alt: 'Notes sketch photo',
    h: 28,
    id: 'notes',
    image: '/media/personal/notes.png',
    label: 'Systems',
    stackX: 36,
    stackY: 42,
    w: 21,
    x: 23,
    y: 52,
  },
  {
    alt: 'Group photo',
    h: 28,
    id: 'cook',
    image: '/media/personal/cook.png',
    label: 'People',
    stackX: 42,
    stackY: 48,
    w: 24,
    x: 46,
    y: 52,
  },
  {
    alt: 'School building photo',
    h: 28,
    id: 'saac',
    image: '/media/personal/saac.png',
    label: 'Learn',
    stackX: 48,
    stackY: 54,
    w: 28,
    x: 72,
    y: 52,
  },
] as const

const CHART_POINTS: ChartPoint[] = [
  { label: '2019', value: 120, x: 40, y: 78 },
  { label: '2020', value: 208, x: 150, y: 52 },
  { label: '2021', value: 395, x: 270, y: 24 },
  { label: '2022', value: 505, x: 410, y: 18 },
  { label: '2023', value: 332, x: 590, y: 44 },
  { label: '2024', value: 400, x: 760, y: 30 },
] as const

const BAR_DATA = [
  { label: '20→21', value: 55 },
  { label: '21→22', value: 59 },
  { label: '22→23', value: 31 },
  { label: '23→24', value: 20 },
] as const

function buildSmoothPath(points: readonly ChartPoint[]) {
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

function LabFrame({
  children,
  eyebrow,
  note,
  plugins,
  source,
  title,
}: {
  children: ReactNode
  eyebrow: string
  note: string
  plugins: string[]
  source: string
  title: string
}) {
  return (
    <article className="gsap-lab">
      <header className="gsap-lab__header">
        <div className="gsap-lab__header-main">
          <span className="gsap-lab__eyebrow">{eyebrow}</span>
          <h1 className="gsap-lab__title">{title}</h1>
        </div>

        <div className="gsap-lab__header-side">
          <p className="gsap-lab__note">{note}</p>
          <div className="gsap-lab__tags" aria-label="animation study metadata">
            <span className="gsap-lab__tag">{source}</span>
            {plugins.map((plugin) => (
              <span className="gsap-lab__tag" key={plugin}>
                {plugin}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="gsap-lab__stage">{children}</div>
    </article>
  )
}

function GsapSplitHeadlineSlide() {
  const scope = useRef<HTMLElement | null>(null)
  const headlineRef = useRef<HTMLHeadingElement | null>(null)
  const bodyRef = useRef<HTMLParagraphElement | null>(null)

  useGSAP(
    () => {
      let cancelled = false
      let cleanup = () => {}

      const init = async () => {
        if (!headlineRef.current || !bodyRef.current) {
          return
        }

        await document.fonts.ready

        if (cancelled || !headlineRef.current || !bodyRef.current) {
          return
        }

        const splitHeadline = SplitText.create(headlineRef.current, {
          linesClass: 'gsap-lab__split-line',
          mask: 'lines',
          type: 'lines,words',
        })
        const splitBody = SplitText.create(bodyRef.current, {
          type: 'words',
        })

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.35,
        })

        tl.from(splitHeadline.lines, {
          duration: 1.14,
          ease: 'deckEase',
          opacity: 0,
          stagger: 0.14,
          yPercent: 118,
        })
          .from(
            splitBody.words,
            {
              duration: 0.58,
              ease: 'power2.out',
              filter: 'blur(10px)',
              opacity: 0,
              stagger: 0.028,
              y: 18,
            },
            '-=0.62',
          )
          .from(
            '.gsap-split-headline__rule',
            {
              duration: 0.62,
              ease: 'power3.out',
              scaleX: 0,
              transformOrigin: 'left center',
            },
            '<0.1',
          )
          .to(
            splitBody.words,
            {
              duration: 0.34,
              ease: 'power2.in',
              filter: 'blur(10px)',
              opacity: 0,
              stagger: 0.012,
              y: -10,
            },
            '+=1.1',
          )
          .to(
            splitHeadline.lines,
            {
              duration: 0.58,
              ease: 'power2.in',
              opacity: 0,
              stagger: 0.08,
              yPercent: -115,
            },
            '<0.05',
          )

        cleanup = () => {
          tl.kill()
          splitBody.revert()
          splitHeadline.revert()
        }
      }

      void init()

      return () => {
        cancelled = true
        cleanup()
      }
    },
    { scope },
  )

  return (
    <LabFrame
      eyebrow="GSAP / 01"
      note="Use SplitText when the phrase itself is the slide. The reveal should feel editorial, not decorative."
      plugins={['useGSAP', 'SplitText']}
      source="Inspired by InspirationSlide"
      title="Line-Based Editorial Reveal"
    >
      <section className="gsap-split-headline" ref={scope}>
        <span className="gsap-split-headline__kicker">Text sequencing</span>
        <h2 className="gsap-split-headline__headline" ref={headlineRef}>
          Inspiration arrives before the explanation.
        </h2>
        <span className="gsap-split-headline__rule" />
        <p className="gsap-split-headline__body" ref={bodyRef}>
          This is the pattern to use when the copy itself carries the emotional
          weight and the transition only needs to create presence.
        </p>
      </section>
    </LabFrame>
  )
}

function GsapScramblePhraseSlide() {
  const scope = useRef<HTMLElement | null>(null)
  const phraseRef = useRef<HTMLHeadingElement | null>(null)
  const noteRef = useRef<HTMLParagraphElement | null>(null)
  const tagRef = useRef<HTMLSpanElement | null>(null)

  useGSAP(
    () => {
      if (!phraseRef.current || !noteRef.current || !tagRef.current) {
        return
      }

      const initialState = PHRASE_STATES[0]
      const nextStates = [...PHRASE_STATES.slice(1), PHRASE_STATES[0]]

      phraseRef.current.textContent = initialState.phrase
      noteRef.current.textContent = initialState.note
      tagRef.current.textContent = initialState.tag

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.15,
      })

      nextStates.forEach((state) => {
        tl.to(phraseRef.current, {
          duration: 1.48,
          ease: 'none',
          scrambleText: {
            chars: 'lowerCase',
            revealDelay: 0.08,
            speed: 0.72,
            text: state.phrase,
          },
        })
          .to(
            noteRef.current,
            {
              duration: 0.54,
              ease: 'power1.inOut',
              text: state.note,
            },
            '<0.06',
          )
          .to(
            tagRef.current,
            {
              duration: 0.48,
              ease: 'power1.inOut',
              text: state.tag,
            },
            '<',
          )
          .fromTo(
            '.gsap-scramble-phrase__pulse',
            {
              opacity: 0.24,
              scaleX: 0.3,
            },
            {
              duration: 0.48,
              ease: 'power2.out',
              opacity: 1,
              scaleX: 1,
              transformOrigin: 'left center',
            },
            '<0.12',
          )
          .to(
            '.gsap-scramble-phrase__pulse',
            {
              duration: 0.32,
              ease: 'power1.inOut',
              opacity: 0.18,
            },
            '+=0.82',
          )
      })

      return () => {
        tl.kill()
      }
    },
    { scope },
  )

  return (
    <LabFrame
      eyebrow="GSAP / 02"
      note="This is the cleanest answer for phrase replacement. It gives you ambiguity during the handoff without turning into a particle demo."
      plugins={['useGSAP', 'ScrambleTextPlugin', 'TextPlugin']}
      source="Inspired by Case-study phrase swaps"
      title="Scramble-Led Phrase Morph"
    >
      <section className="gsap-scramble-phrase" ref={scope}>
        <span className="gsap-scramble-phrase__kicker" ref={tagRef} />
        <h2 className="gsap-scramble-phrase__phrase" ref={phraseRef} />
        <span className="gsap-scramble-phrase__pulse" />
        <p className="gsap-scramble-phrase__note" ref={noteRef} />
      </section>
    </LabFrame>
  )
}

function GsapBrandLockupSlide() {
  const scope = useRef<HTMLElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)
  const markRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLSpanElement | null>(null)
  const captionRef = useRef<HTMLParagraphElement | null>(null)

  useGSAP(
    () => {
      let cancelled = false
      let cleanup = () => {}

      const init = async () => {
        if (
          !pathRef.current ||
          !labelRef.current ||
          !markRef.current ||
          !dotRef.current ||
          !captionRef.current
        ) {
          return
        }

        await document.fonts.ready

        if (
          cancelled ||
          !pathRef.current ||
          !labelRef.current ||
          !markRef.current ||
          !dotRef.current ||
          !captionRef.current
        ) {
          return
        }

        const split = SplitText.create(labelRef.current, {
          charsClass: 'gsap-brand-lockup__char',
          type: 'chars',
        })

        gsap.set(markRef.current, {
          clipPath: 'inset(32% 32% 32% 32% round 36px)',
          opacity: 0,
          scale: 0.8,
        })
        gsap.set(split.chars, {
          opacity: 0,
          yPercent: 115,
        })
        gsap.set(captionRef.current, {
          opacity: 0,
          y: 14,
        })

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.35,
        })

        tl.fromTo(
          dotRef.current,
          {
            opacity: 0,
            scale: 0,
          },
          {
            duration: 0.18,
            opacity: 1,
            scale: 1,
          },
        )
          .to(
            dotRef.current,
            {
              duration: 1.36,
              ease: 'power2.inOut',
              motionPath: {
                align: pathRef.current,
                alignOrigin: [0.5, 0.5],
                path: pathRef.current,
              },
            },
            0,
          )
          .to(
            markRef.current,
            {
              clipPath: 'inset(0% 0% 0% 0% round 36px)',
              duration: 0.94,
              ease: 'deckEase',
              opacity: 1,
              scale: 1,
            },
            0.14,
          )
          .to(
            split.chars,
            {
              duration: 0.82,
              ease: 'deckEase',
              opacity: 1,
              stagger: 0.032,
              yPercent: 0,
            },
            0.42,
          )
          .to(
            captionRef.current,
            {
              duration: 0.5,
              ease: 'power2.out',
              opacity: 1,
              y: 0,
            },
            0.58,
          )
          .to(
            dotRef.current,
            {
              duration: 0.18,
              opacity: 0,
            },
            '-=0.16',
          )
          .to(
            [markRef.current, captionRef.current, ...split.chars],
            {
              duration: 0.4,
              ease: 'power2.in',
              opacity: 0,
              y: -10,
            },
            '+=1.18',
          )

        cleanup = () => {
          tl.kill()
          split.revert()
        }
      }

      void init()

      return () => {
        cancelled = true
        cleanup()
      }
    },
    { scope },
  )

  return (
    <LabFrame
      eyebrow="GSAP / 03"
      note="Brand slides should not need much. A single cue on a path and a clean label reveal is usually enough."
      plugins={['useGSAP', 'MotionPathPlugin', 'SplitText']}
      source="Inspired by OhouseSlide"
      title="Brand Lockup Cue"
    >
      <section className="gsap-brand-lockup" ref={scope}>
        <svg
          aria-hidden="true"
          className="gsap-brand-lockup__path-shell"
          viewBox="0 0 1040 420"
        >
          <path
            className="gsap-brand-lockup__path"
            d="M 96 224 C 250 224 314 148 420 148 S 674 148 930 224"
            ref={pathRef}
          />
        </svg>

        <span className="gsap-brand-lockup__dot" ref={dotRef} />

        <div className="gsap-brand-lockup__row">
          <div className="gsap-brand-lockup__mark-shell" ref={markRef}>
            <img
              alt=""
              aria-hidden="true"
              className="gsap-brand-lockup__mark"
              draggable={false}
              src="/media/ohouse-mark.svg"
            />
          </div>

          <span className="gsap-brand-lockup__label" ref={labelRef}>
            Ohouse
          </span>
        </div>

        <p className="gsap-brand-lockup__caption" ref={captionRef}>
          Use the motion cue to lead the eye once, then let the lockup hold.
        </p>
      </section>
    </LabFrame>
  )
}

function GsapChartStorySlide() {
  const scope = useRef<HTMLElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const metricLabelRef = useRef<HTMLSpanElement | null>(null)
  const metricValueRef = useRef<HTMLSpanElement | null>(null)
  const captionRef = useRef<HTMLParagraphElement | null>(null)
  const chartPath = useMemo(() => buildSmoothPath(CHART_POINTS), [])

  useGSAP(
    () => {
      if (
        !scope.current ||
        !pathRef.current ||
        !metricLabelRef.current ||
        !metricValueRef.current ||
        !captionRef.current
      ) {
        return
      }

      const pathLength = pathRef.current.getTotalLength()
      const dots = gsap.utils.toArray<SVGCircleElement>(
        '.gsap-chart-story__dot',
        scope.current,
      )
      const bars = gsap.utils.toArray<SVGRectElement>(
        '.gsap-chart-story__bar',
        scope.current,
      )
      const metric = { value: 0 }

      const writeMetric = (suffix: 'K' | '%') => {
        if (!metricValueRef.current) {
          return
        }

        if (suffix === 'K') {
          metricValueRef.current.textContent = `${Math.round(metric.value)}K`
          return
        }

        metricValueRef.current.textContent = `+${Math.round(metric.value)}%`
      }

      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      })
      gsap.set(dots, {
        opacity: 0,
        scale: 0,
        transformOrigin: 'center center',
      })
      gsap.set(bars, {
        opacity: 0.18,
        scaleY: 0,
        transformOrigin: '50% 100%',
      })

      metricLabelRef.current.textContent = 'MAU'
      captionRef.current.textContent =
        'Start with the growth line so the audience has context before you pivot to the sharper signal.'
      writeMetric('K')

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.2,
      })

      tl.to(metric, {
        duration: 1.52,
        ease: 'power1.out',
        onUpdate: () => {
          writeMetric('K')
        },
        value: 400,
      })
        .to(
          pathRef.current,
          {
            duration: 1.46,
            ease: 'none',
            strokeDashoffset: 0,
          },
          0.08,
        )
        .to(
          dots,
          {
            duration: 0.28,
            ease: 'back.out(2.4)',
            opacity: 1,
            scale: 1,
            stagger: 0.1,
          },
          0.42,
        )
        .to(
          [pathRef.current, ...dots],
          {
            duration: 0.42,
            ease: 'power2.inOut',
            opacity: 0.22,
          },
          '+=1',
        )
        .to(
          metricLabelRef.current,
          {
            duration: 0.5,
            ease: 'power1.inOut',
            text: 'Revenue YoY',
          },
          '<',
        )
        .to(
          captionRef.current,
          {
            duration: 0.56,
            ease: 'power1.inOut',
            text: 'Once the backdrop is understood, switch to the metric you actually want remembered.',
          },
          '<0.04',
        )
        .to(
          metric,
          {
            duration: 0.82,
            ease: 'power2.out',
            onUpdate: () => {
              writeMetric('%')
            },
            value: 20,
          },
          '<0.08',
        )
        .to(
          bars,
          {
            duration: 0.88,
            ease: 'deckEase',
            opacity: 1,
            scaleY: 1,
            stagger: 0.08,
          },
          '<0.08',
        )
        .to(
          bars,
          {
            duration: 0.5,
            ease: 'power2.in',
            opacity: 0.18,
            scaleY: 0,
            stagger: {
              each: 0.04,
              from: 'end',
            },
          },
          '+=1.1',
        )
        .set(pathRef.current, {
          opacity: 1,
          strokeDashoffset: pathLength,
        })
        .set(dots, {
          opacity: 0,
          scale: 0,
        })
        .call(() => {
          metric.value = 0
          if (metricLabelRef.current) {
            metricLabelRef.current.textContent = 'MAU'
          }
          if (captionRef.current) {
            captionRef.current.textContent =
              'Start with the growth line so the audience has context before you pivot to the sharper signal.'
          }
          writeMetric('K')
        })

      return () => {
        tl.kill()
      }
    },
    { scope },
  )

  return (
    <LabFrame
      eyebrow="GSAP / 04"
      note="Charts need sequencing more than ornament. Draw the context, then pivot to the takeaway."
      plugins={['useGSAP', 'TextPlugin']}
      source="Inspired by OhouseChartSlide"
      title="Data Story Pivot"
    >
      <section className="gsap-chart-story" ref={scope}>
        <div className="gsap-chart-story__summary">
          <span className="gsap-chart-story__label" ref={metricLabelRef} />
          <span className="gsap-chart-story__value" ref={metricValueRef} />
          <p className="gsap-chart-story__caption" ref={captionRef} />
        </div>

        <svg
          aria-label="Animation study chart"
          className="gsap-chart-story__svg"
          preserveAspectRatio="none"
          viewBox="0 0 860 300"
        >
          {Array.from({ length: 4 }, (_, index) => {
            const y = 54 + index * 58
            return (
              <line
                className="gsap-chart-story__grid"
                key={`grid-${y}`}
                x1="40"
                x2="820"
                y1={y}
                y2={y}
              />
            )
          })}

          <path
            className="gsap-chart-story__line"
            d={chartPath}
            fill="none"
            ref={pathRef}
          />

          {CHART_POINTS.map((point) => (
            <g key={point.label}>
              <circle
                className="gsap-chart-story__dot"
                cx={point.x}
                cy={point.y}
                r="6"
              />
              <text
                className="gsap-chart-story__tick"
                textAnchor="middle"
                x={point.x}
                y="282"
              >
                {point.label}
              </text>
            </g>
          ))}

          {BAR_DATA.map((bar, index) => {
            const x = 166 + index * 156
            const height = bar.value * 2.5
            const y = 238 - height
            return (
              <g key={bar.label}>
                <rect
                  className="gsap-chart-story__bar"
                  height={height}
                  rx="14"
                  width="82"
                  x={x}
                  y={y}
                />
                <text
                  className="gsap-chart-story__bar-label"
                  textAnchor="middle"
                  x={x + 41}
                  y="282"
                >
                  {bar.label}
                </text>
              </g>
            )
          })}
        </svg>
      </section>
    </LabFrame>
  )
}

function GsapFlipRailSlide() {
  const scope = useRef<HTMLElement | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)
  const autoCycleRef = useRef<gsap.core.Tween | null>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const animateTo = useCallback((nextIndex: number) => {
    const railNode = railRef.current

    if (!railNode || nextIndex === activeIndexRef.current) {
      return
    }

    const cards = Array.from(
      railNode.querySelectorAll<HTMLElement>('.gsap-flip-rail__card'),
    )
    const state = Flip.getState(cards)

    Flip.killFlipsOf(cards, true)

    flushSync(() => {
      activeIndexRef.current = nextIndex
      setActiveIndex(nextIndex)
    })

    Flip.from(state, {
      absolute: true,
      duration: 1.02,
      ease: 'deckEase',
      nested: true,
      prune: true,
    })

    const activeCard = railNode.querySelector<HTMLElement>(
      `.gsap-flip-rail__card[data-card-index="${nextIndex}"]`,
    )
    const activeCopy = activeCard
      ? Array.from(
          activeCard.querySelectorAll<HTMLElement>(
            '.gsap-flip-rail__headline, .gsap-flip-rail__role, .gsap-flip-rail__blurb',
          ),
        )
      : []

    if (activeCopy.length > 0) {
      gsap.fromTo(
        activeCopy,
        {
          filter: 'blur(8px)',
          opacity: 0,
          y: 18,
        },
        {
          duration: 0.56,
          ease: 'power2.out',
          filter: 'blur(0px)',
          opacity: 1,
          stagger: 0.05,
          y: 0,
        },
      )
    }
  }, [])

  const scheduleAutoCycle = useCallback(() => {
    autoCycleRef.current?.kill()

    const tick = () => {
      animateTo((activeIndexRef.current + 1) % RAIL_CARDS.length)
      autoCycleRef.current = gsap.delayedCall(3.1, tick)
    }

    autoCycleRef.current = gsap.delayedCall(3.1, tick)
  }, [animateTo])

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useGSAP(
    () => {
      scheduleAutoCycle()

      const observer = Observer.create({
        preventDefault: true,
        target: scope.current ?? undefined,
        tolerance: 10,
        type: 'wheel,touch',
        wheelSpeed: 0.9,
        onDown: () => {
          animateTo((activeIndexRef.current + 1) % RAIL_CARDS.length)
          scheduleAutoCycle()
        },
        onLeft: () => {
          animateTo((activeIndexRef.current + 1) % RAIL_CARDS.length)
          scheduleAutoCycle()
        },
        onRight: () => {
          animateTo(
            (activeIndexRef.current - 1 + RAIL_CARDS.length) % RAIL_CARDS.length,
          )
          scheduleAutoCycle()
        },
        onUp: () => {
          animateTo(
            (activeIndexRef.current - 1 + RAIL_CARDS.length) % RAIL_CARDS.length,
          )
          scheduleAutoCycle()
        },
      })

      return () => {
        observer.kill()
        autoCycleRef.current?.kill()
      }
    },
    { scope },
  )

  return (
    <LabFrame
      eyebrow="GSAP / 05"
      note="This is the pattern for rails that should feel like one surface rebalancing, not a set of unrelated hover cards."
      plugins={['useGSAP', 'Flip', 'Observer']}
      source="Inspired by CareerHoverSlide"
      title="Observer-Driven Rail"
    >
      <section className="gsap-flip-rail" ref={scope}>
        <div className="gsap-flip-rail__hint">
          Wheel or swipe to move the active panel.
        </div>

        <div className="gsap-flip-rail__track" ref={railRef}>
          {RAIL_CARDS.map((card, index) => {
            const active = activeIndex === index
            return (
              <button
                aria-pressed={active}
                className="gsap-flip-rail__card"
                data-active={active}
                data-card-index={index}
                key={`${card.company}-${card.year}`}
                onClick={() => {
                  animateTo(index)
                  scheduleAutoCycle()
                }}
                type="button"
              >
                <span className="gsap-flip-rail__meta">{card.year}</span>
                <div className="gsap-flip-rail__content">
                  <h2 className="gsap-flip-rail__headline">{card.company}</h2>
                  <p className="gsap-flip-rail__role">{card.role}</p>
                  <p className="gsap-flip-rail__blurb">{card.blurb}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="gsap-flip-rail__dots" aria-hidden="true">
          {RAIL_CARDS.map((card, index) => (
            <span
              className="gsap-flip-rail__dot"
              data-active={activeIndex === index}
              key={card.company}
            />
          ))}
        </div>
      </section>
    </LabFrame>
  )
}

function GsapMosaicResolveSlide() {
  const scope = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const autoCycleRef = useRef<gsap.core.Tween | null>(null)
  const layoutRef = useRef<'stack' | 'mosaic'>('stack')
  const [layout, setLayout] = useState<'stack' | 'mosaic'>('stack')

  const animateLayout = useCallback((nextLayout: 'stack' | 'mosaic') => {
    const canvasNode = canvasRef.current

    if (!canvasNode || nextLayout === layoutRef.current) {
      return
    }

    const cards = Array.from(
      canvasNode.querySelectorAll<HTMLElement>('.gsap-mosaic-resolve__card'),
    )
    const images = Array.from(
      canvasNode.querySelectorAll<HTMLElement>('.gsap-mosaic-resolve__image'),
    )
    const labels = Array.from(
      canvasNode.querySelectorAll<HTMLElement>('.gsap-mosaic-resolve__label'),
    )
    const state = Flip.getState(cards)

    flushSync(() => {
      layoutRef.current = nextLayout
      setLayout(nextLayout)
    })

    Flip.from(state, {
      absolute: true,
      duration: 1.18,
      ease: 'deckEase',
      nested: true,
      prune: true,
      scale: true,
      stagger: 0.04,
    })

    gsap.fromTo(
      images,
      {
        clipPath: 'inset(10% 10% 10% 10% round 24px)',
        filter: 'blur(8px)',
      },
      {
        clipPath: 'inset(0% 0% 0% 0% round 24px)',
        duration: 1.02,
        ease: 'power2.out',
        filter: 'blur(0px)',
        stagger: 0.04,
      },
    )

    gsap.to(labels, {
      duration: 0.4,
      ease: 'power2.out',
      opacity: nextLayout === 'mosaic' ? 1 : 0,
      y: nextLayout === 'mosaic' ? 0 : 10,
      stagger: 0.03,
    })
  }, [])

  const scheduleToggle = useCallback(() => {
    autoCycleRef.current?.kill()

    const tick = () => {
      animateLayout(layoutRef.current === 'stack' ? 'mosaic' : 'stack')
      autoCycleRef.current = gsap.delayedCall(3.35, tick)
    }

    autoCycleRef.current = gsap.delayedCall(3.35, tick)
  }, [animateLayout])

  useEffect(() => {
    layoutRef.current = layout
  }, [layout])

  useGSAP(
    () => {
      scheduleToggle()

      return () => {
        autoCycleRef.current?.kill()
      }
    },
    { scope },
  )

  return (
    <LabFrame
      eyebrow="GSAP / 06"
      note="For image-heavy pages, this is usually stronger than animating every tile independently. Let the whole arrangement settle into place."
      plugins={['useGSAP', 'Flip']}
      source="Inspired by PersonalHoverSlide"
      title="Stack to Story Mosaic"
    >
      <section className="gsap-mosaic-resolve" ref={scope}>
        <div className="gsap-mosaic-resolve__toolbar">
          <button
            className="gsap-mosaic-resolve__toggle"
            data-active={layout === 'stack'}
            onClick={() => {
              animateLayout('stack')
              scheduleToggle()
            }}
            type="button"
          >
            Stack
          </button>
          <button
            className="gsap-mosaic-resolve__toggle"
            data-active={layout === 'mosaic'}
            onClick={() => {
              animateLayout('mosaic')
              scheduleToggle()
            }}
            type="button"
          >
            Story Mosaic
          </button>
        </div>

        <div className="gsap-mosaic-resolve__canvas" ref={canvasRef}>
          {MOSAIC_TILES.map((tile, index) => {
            const activeLayout =
              layout === 'mosaic'
                ? {
                    height: `${tile.h}%`,
                    left: `${tile.x}%`,
                    top: `${tile.y}%`,
                    width: `${tile.w}%`,
                    zIndex: index + 1,
                  }
                : {
                    height: '52%',
                    left: `${tile.stackX}%`,
                    top: `${tile.stackY}%`,
                    width: '24%',
                    zIndex: MOSAIC_TILES.length - index,
                  }

            return (
              <div
                className="gsap-mosaic-resolve__card"
                key={tile.id}
                style={activeLayout}
              >
                <img
                  alt={tile.alt}
                  className="gsap-mosaic-resolve__image"
                  draggable={false}
                  src={tile.image}
                />
                <span className="gsap-mosaic-resolve__label">{tile.label}</span>
              </div>
            )
          })}
        </div>
      </section>
    </LabFrame>
  )
}

export function GsapStudySlide({ mode }: { mode: GsapStudyMode }) {
  if (mode === 'split-headline') {
    return <GsapSplitHeadlineSlide />
  }

  if (mode === 'scramble-phrase') {
    return <GsapScramblePhraseSlide />
  }

  if (mode === 'brand-lockup') {
    return <GsapBrandLockupSlide />
  }

  if (mode === 'chart-story') {
    return <GsapChartStorySlide />
  }

  if (mode === 'flip-rail') {
    return <GsapFlipRailSlide />
  }

  return <GsapMosaicResolveSlide />
}
