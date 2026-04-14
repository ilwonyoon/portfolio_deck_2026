import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Flip, Observer } from 'gsap/all'
import { useCallback, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

gsap.registerPlugin(useGSAP, Flip, Observer)

type BrowseMotionMode = 'trail' | 'stack' | 'field'

const PHOTO_FILES = [
  'v1-470570909544576.avif',
  'v1-448044518658048.avif',
  'v1-467664532230208.avif',
  '171051504194623995.avif',
  'v1-479736009596992.avif',
  'v1-447937619767424.avif',
  'v1-453686310326400.avif',
  'v1-449990163456000.avif',
  'v1-454642235027520.avif',
  'v1-468454059765824.avif',
  'v1-454918499172352.avif',
  'v1-453919353901120.avif',
  'v1-448699901571136.avif',
  'v1-467689808609280.avif',
  'v1-444538887340160.avif',
  'v1-475145543438336.avif',
  'v1-448606796832768.avif',
  'v1-471292096086016.avif',
  'v1-450727214395392.avif',
  'v1-456829093462144.avif',
  '172412501637651053.avif',
  'v1-470222080851968.avif',
  'v1-480200494502016.avif',
  'v1-445772796915776.avif',
] as const

const PHOTO_PATHS = PHOTO_FILES.map((fileName) => `/media/ohouse-photos/${fileName}`)

const TRAIL_LAYOUT = [
  { rotation: -3, scale: 1, x: 0, y: 0 },
  { rotation: 2, scale: 0.98, x: -148, y: 90 },
  { rotation: -5, scale: 0.94, x: 164, y: 120 },
  { rotation: 4, scale: 0.9, x: -238, y: -76 },
  { rotation: -2, scale: 0.88, x: 248, y: -64 },
  { rotation: 7, scale: 0.84, x: -326, y: 18 },
  { rotation: -8, scale: 0.82, x: 340, y: 34 },
  { rotation: 3, scale: 0.78, x: 0, y: -156 },
] as const

const FOCUS_RAIL_LAYOUT = [
  {
    blur: 2.8,
    brightness: 0.88,
    grayscale: 44,
    height: '46%',
    left: '9%',
    offset: -4,
    opacity: 0.16,
    rotate: 2.6,
    scale: 0.78,
    top: '48%',
    width: '9%',
    zIndex: 1,
  },
  {
    blur: 2.2,
    brightness: 0.9,
    grayscale: 34,
    height: '52%',
    left: '18%',
    offset: -3,
    opacity: 0.24,
    rotate: -2.2,
    scale: 0.84,
    top: '48%',
    width: '11%',
    zIndex: 2,
  },
  {
    blur: 1.4,
    brightness: 0.92,
    grayscale: 20,
    height: '60%',
    left: '29%',
    offset: -2,
    opacity: 0.42,
    rotate: 1.6,
    scale: 0.9,
    top: '49%',
    width: '14%',
    zIndex: 3,
  },
  {
    blur: 0.7,
    brightness: 0.96,
    grayscale: 10,
    height: '68%',
    left: '39.5%',
    offset: -1,
    opacity: 0.76,
    rotate: -1.2,
    scale: 0.96,
    top: '50%',
    width: '18%',
    zIndex: 4,
  },
  {
    blur: 0,
    brightness: 1,
    grayscale: 0,
    height: '78%',
    left: '50%',
    offset: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    top: '50%',
    width: '28%',
    zIndex: 9,
  },
  {
    blur: 0.7,
    brightness: 0.96,
    grayscale: 10,
    height: '68%',
    left: '60.5%',
    offset: 1,
    opacity: 0.76,
    rotate: 1.2,
    scale: 0.96,
    top: '50%',
    width: '18%',
    zIndex: 4,
  },
  {
    blur: 1.4,
    brightness: 0.92,
    grayscale: 20,
    height: '60%',
    left: '71%',
    offset: 2,
    opacity: 0.42,
    rotate: -1.6,
    scale: 0.9,
    top: '49%',
    width: '14%',
    zIndex: 3,
  },
  {
    blur: 2.2,
    brightness: 0.9,
    grayscale: 34,
    height: '52%',
    left: '82%',
    offset: 3,
    opacity: 0.24,
    rotate: 2.2,
    scale: 0.84,
    top: '48%',
    width: '11%',
    zIndex: 2,
  },
  {
    blur: 2.8,
    brightness: 0.88,
    grayscale: 44,
    height: '46%',
    left: '91%',
    offset: 4,
    opacity: 0.16,
    rotate: -2.6,
    scale: 0.78,
    top: '48%',
    width: '9%',
    zIndex: 1,
  },
] as const

const FIELD_COLUMNS = 5
const FIELD_ROWS = 5

function getFieldPhotoIndex(index: number, shift: number) {
  return (index + shift * 3) % PHOTO_PATHS.length
}

function TrailBrowseStage() {
  const scope = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const autoAdvanceRef = useRef<gsap.core.Tween | null>(null)
  const trailIndexRef = useRef(0)

  const advance = useCallback(() => {
    const cards = cardRefs.current.filter(
      (card): card is HTMLDivElement => card !== null,
    )

    if (cards.length === 0) {
      return
    }

    trailIndexRef.current = (trailIndexRef.current + 1) % PHOTO_PATHS.length

    cards.forEach((card, index) => {
      const photoIndex =
        (trailIndexRef.current - index + PHOTO_PATHS.length) % PHOTO_PATHS.length
      const layout = TRAIL_LAYOUT[index]

      gsap.set(card, {
        backgroundImage: `url("${PHOTO_PATHS[photoIndex]}")`,
        zIndex: cards.length - index,
      })

      gsap.fromTo(
        card,
        {
          autoAlpha: index === 0 ? 1 : 0,
          filter: 'blur(12px)',
          rotation: 0,
          scale: 0.72,
          x: 0,
          y: 0,
        },
        {
          autoAlpha: 1 - index * 0.1,
          duration: 0.9,
          ease: 'power3.out',
          filter: 'blur(0px)',
          rotation: layout.rotation,
          scale: layout.scale,
          x: layout.x,
          y: layout.y,
        },
      )
    })
  }, [])

  const schedule = useCallback(() => {
    autoAdvanceRef.current?.kill()

    const tick = () => {
      advance()
      autoAdvanceRef.current = gsap.delayedCall(0.72, tick)
    }

    autoAdvanceRef.current = gsap.delayedCall(0.72, tick)
  }, [advance])

  useGSAP(
    () => {
      advance()
      schedule()

      const observer = Observer.create({
        target: scope.current ?? undefined,
        tolerance: 8,
        type: 'wheel,touch,pointer',
        wheelSpeed: 0.8,
        onChangeY: () => {
          advance()
          schedule()
        },
      })

      return () => {
        observer.kill()
        autoAdvanceRef.current?.kill()
      }
    },
    { scope },
  )

  return (
    <section className="ohouse-browse-motion ohouse-browse-motion--trail" ref={scope}>
      <div className="ohouse-browse-motion__trail-stage">
        {TRAIL_LAYOUT.map((layout, index) => (
          <div
            className="ohouse-browse-motion__trail-card"
            key={`trail-${layout.x}-${layout.y}`}
            ref={(node) => {
              cardRefs.current[index] = node
            }}
          />
        ))}
      </div>
    </section>
  )
}

function StackFocusStage() {
  const scope = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const visiblePhotos = useMemo(() => {
    return FOCUS_RAIL_LAYOUT.map((slot) => {
      const photoIndex =
        (activeIndex + slot.offset + PHOTO_PATHS.length) % PHOTO_PATHS.length

      return {
        id: `photo-${photoIndex}`,
        photo: PHOTO_PATHS[photoIndex],
        slot,
      }
    })
  }, [activeIndex])

  const animateTo = useCallback((nextIndex: number) => {
    const cards = Array.from(
      canvasRef.current?.querySelectorAll<HTMLElement>('.ohouse-browse-motion__stack-card') ??
        [],
    )

    if (cards.length === 0) {
      return
    }

    const state = Flip.getState(cards)

    flushSync(() => {
      activeIndexRef.current = nextIndex
      setActiveIndex(nextIndex)
    })

    Flip.from(state, {
      absolute: true,
      duration: 1.08,
      ease: 'power3.inOut',
      fade: true,
      nested: true,
      prune: true,
      scale: true,
      stagger: 0.02,
    })

    const nextCards = Array.from(
      canvasRef.current?.querySelectorAll<HTMLElement>('.ohouse-browse-motion__stack-card') ??
        [],
    )

    gsap.to(nextCards, {
      duration: 1.02,
      ease: 'power3.out',
      filter: (_, target) =>
        `grayscale(${target.dataset.grayscale}%) blur(${target.dataset.blur}px) brightness(${target.dataset.brightness})`,
      opacity: (_, target) => Number(target.dataset.opacity),
      rotate: (_, target) => Number(target.dataset.rotate),
      scale: (_, target) => Number(target.dataset.scale),
    })
  }, [])

  useGSAP(
    () => {
      activeIndexRef.current = activeIndex

      const cards = Array.from(
        canvasRef.current?.querySelectorAll<HTMLElement>('.ohouse-browse-motion__stack-card') ??
          [],
      )

      gsap.fromTo(
        cards,
        {
          autoAlpha: 0,
          scale: 0.92,
          yPercent: -46,
        },
        {
          autoAlpha: (_, target) => Number(target.dataset.opacity),
          duration: 1.18,
          ease: 'power3.out',
          filter: (_, target) =>
            `grayscale(${target.dataset.grayscale}%) blur(${target.dataset.blur}px) brightness(${target.dataset.brightness})`,
          opacity: (_, target) => Number(target.dataset.opacity),
          rotate: (_, target) => Number(target.dataset.rotate),
          scale: (_, target) => Number(target.dataset.scale),
          stagger: 0.04,
          yPercent: -50,
        },
      )

      const observer = Observer.create({
        preventDefault: true,
        target: scope.current ?? undefined,
        tolerance: 10,
        type: 'wheel,touch',
        wheelSpeed: 0.85,
        onDown: () => {
          animateTo((activeIndexRef.current + 1) % PHOTO_PATHS.length)
        },
        onLeft: () => {
          animateTo((activeIndexRef.current + 1) % PHOTO_PATHS.length)
        },
        onRight: () => {
          animateTo(
            (activeIndexRef.current - 1 + PHOTO_PATHS.length) % PHOTO_PATHS.length,
          )
        },
        onUp: () => {
          animateTo(
            (activeIndexRef.current - 1 + PHOTO_PATHS.length) % PHOTO_PATHS.length,
          )
        },
      })

      return () => {
        observer.kill()
      }
    },
    { scope },
  )

  return (
    <section className="ohouse-browse-motion ohouse-browse-motion--stack" ref={scope}>
      <div className="ohouse-browse-motion__stack-canvas" ref={canvasRef}>
        {visiblePhotos.map(({ id, photo, slot }) => {
          return (
            <figure
              className="ohouse-browse-motion__stack-card"
              data-blur={slot.blur}
              data-brightness={slot.brightness}
              data-grayscale={slot.grayscale}
              data-opacity={slot.opacity}
              data-rotate={slot.rotate}
              data-scale={slot.scale}
              key={id}
              style={{
                height: slot.height,
                left: slot.left,
                top: slot.top,
                width: slot.width,
                zIndex: slot.zIndex,
              }}
            >
              <img
                alt=""
                className="ohouse-browse-motion__stack-image"
                draggable={false}
                src={photo}
              />
            </figure>
          )
        })}
      </div>
    </section>
  )
}

function FieldBrowseStage() {
  const scope = useRef<HTMLDivElement | null>(null)
  const columnRefs = useRef<Array<HTMLDivElement | null>>([])
  const offsetRef = useRef(0)

  useGSAP(
    () => {
      const columns = columnRefs.current.filter(
        (column): column is HTMLDivElement => column !== null,
      )

      columns.forEach((column, columnIndex) => {
        gsap.to(column, {
          duration: 14 + columnIndex * 1.4,
          ease: 'none',
          repeat: -1,
          yPercent: columnIndex % 2 === 0 ? -50 : 50,
        })
      })

      const observer = Observer.create({
        target: scope.current ?? undefined,
        tolerance: 8,
        type: 'wheel,touch,pointer',
        wheelSpeed: 0.6,
        onChangeY: (self) => {
          offsetRef.current += self.deltaY * 0.04
          gsap.to(columns, {
            duration: 0.8,
            ease: 'power3.out',
            y: (_, target) => {
              const index = columns.indexOf(target as HTMLDivElement)
              const direction = index % 2 === 0 ? 1 : -1
              return offsetRef.current * direction
            },
          })
        },
      })

      return () => {
        observer.kill()
      }
    },
    { scope },
  )

  return (
    <section className="ohouse-browse-motion ohouse-browse-motion--field" ref={scope}>
      <div className="ohouse-browse-motion__field-grid">
        {Array.from({ length: FIELD_COLUMNS }, (_, columnIndex) => (
          <div
            className="ohouse-browse-motion__field-column"
            key={`column-${columnIndex}`}
            ref={(node) => {
              columnRefs.current[columnIndex] = node
            }}
          >
            {[0, 1].map((duplicateIndex) => (
              <div
                className="ohouse-browse-motion__field-stack"
                key={`stack-${columnIndex}-${duplicateIndex}`}
              >
                {Array.from({ length: FIELD_ROWS }, (_, rowIndex) => {
                  const photoIndex = getFieldPhotoIndex(
                    columnIndex * FIELD_ROWS + rowIndex,
                    duplicateIndex + columnIndex,
                  )

                  return (
                    <figure
                      className="ohouse-browse-motion__field-tile"
                      key={`tile-${columnIndex}-${duplicateIndex}-${rowIndex}`}
                    >
                      <img alt="" draggable={false} src={PHOTO_PATHS[photoIndex]} />
                    </figure>
                  )
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export function OhouseBrowseMotionSlide({
  mode,
}: {
  mode: BrowseMotionMode
}) {
  if (mode === 'trail') {
    return <TrailBrowseStage />
  }

  if (mode === 'stack') {
    return <StackFocusStage />
  }

  return <FieldBrowseStage />
}
