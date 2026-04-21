import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { SlideRenderContext } from '../types/presentation'

const CANVAS_WIDTH = 1920
const CANVAS_HEIGHT = 1080

type ProgramSlot = {
  /** px from canvas left, top-left anchor */
  x: number
  /** px from canvas top, top-left anchor */
  y: number
  width: number
  height: number
  radius: number
  opacity: number
  tint: number
  zIndex: number
}

// Highlight (center): Figma 1920x1080 canvas, center-anchored 375x812.
//   → top-left = (1920-375)/2 = 772.5, (1080-812)/2 = 134
const SLOT_HIGHLIGHT: ProgramSlot = {
  height: 812,
  opacity: 1,
  radius: 0,
  tint: 0,
  width: 375,
  x: (CANVAS_WIDTH - 375) / 2,
  y: (CANVAS_HEIGHT - 812) / 2,
  zIndex: 40,
}

// Near: Figma left calc(58.33% + 60px) = 1179.936, top calc(16.67% + 61.59px) = 241.626
const SLOT_NEAR: ProgramSlot = {
  height: 578.701,
  opacity: 1,
  radius: 34.573,
  tint: 0.2,
  width: 267.257,
  x: 1179.936,
  y: 241.626,
  zIndex: 30,
}

// Mid: Figma left calc(75% + 36.46px) = 1476.46, top calc(16.67% + 62.42px) = 242.456
const SLOT_MID: ProgramSlot = {
  height: 578.269,
  opacity: 1,
  radius: 34.573,
  tint: 0.6,
  width: 267.058,
  x: 1476.46,
  y: 242.456,
  zIndex: 20,
}

// Far: parked off-canvas to the right. Cards travel Mid→Far with opacity 0
//   so the fade and slide never show. They then jump from Far back to Near
//   (still opacity 0), and fade in at Near visible opacity.
const SLOT_FAR: ProgramSlot = {
  height: 580.069,
  opacity: 0,
  radius: 34.573,
  tint: 0.8,
  width: 267.889,
  x: CANVAS_WIDTH + 400,
  y: 239.036,
  zIndex: 10,
}

const SLOTS = [SLOT_HIGHLIGHT, SLOT_NEAR, SLOT_MID, SLOT_FAR] as const

const PROGRAMS = [
  '/media/creator-programs/program-01.png',
  '/media/creator-programs/program-02.png',
  '/media/creator-programs/program-03.png',
  '/media/creator-programs/program-04.png',
] as const

const CYCLE_MS = 2800

type CreatorProgramsSlideProps = Pick<SlideRenderContext, 'autoPlay' | 'isThumbnail'>

export function CreatorProgramsSlide({
  autoPlay = false,
  isThumbnail = false,
}: CreatorProgramsSlideProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const previousActiveIndexRef = useRef(0)
  const shouldRoll = autoPlay && !isThumbnail

  useEffect(() => {
    if (!shouldRoll) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        previousActiveIndexRef.current = current
        return (current + 1) % PROGRAMS.length
      })
    }, CYCLE_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [shouldRoll])

  const previousActiveIndex = previousActiveIndexRef.current

  return (
    <article className="creator-programs-slide" data-node-id="6381:247420">
      <h2 className="creator-programs-slide__headline">Creator programs</h2>

      <div className="creator-programs-slide__stage" aria-hidden="true">
        {PROGRAMS.map((src, programIndex) => {
          const slotIndex =
            (programIndex - activeIndex + PROGRAMS.length) % PROGRAMS.length
          const previousSlotIndex =
            (programIndex - previousActiveIndex + PROGRAMS.length) %
            PROGRAMS.length
          const slot = SLOTS[slotIndex]
          // Any transition that involves the offscreen Far slot (slot 3) as
          // either source or destination must be instant, so the invisible
          // move never flashes as a fade-out or fly-in.
          const touchesFar = slotIndex === 3 || previousSlotIndex === 3
          const transition = touchesFar
            ? { duration: 0 }
            : { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const }

          return (
            <motion.div
              animate={{
                height: slot.height,
                left: slot.x,
                opacity: slot.opacity,
                top: slot.y,
                width: slot.width,
              }}
              className="creator-programs-slide__card"
              initial={false}
              key={src}
              style={{
                borderRadius: slot.radius,
                zIndex: slot.zIndex,
              }}
              transition={transition}
            >
              <img
                alt=""
                className="creator-programs-slide__image"
                draggable={false}
                src={src}
                style={{ borderRadius: slot.radius }}
              />
              <motion.div
                animate={{ opacity: slot.tint }}
                className="creator-programs-slide__tint"
                initial={false}
                style={{ borderRadius: slot.radius }}
                transition={transition}
              />
            </motion.div>
          )
        })}
      </div>
    </article>
  )
}
