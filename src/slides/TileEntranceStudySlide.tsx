import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

type EntranceMode = 'sweep-cascade' | 'center-out-cluster' | 'ghost-blocks'

type StudyTile = {
  alt: string
  h: number
  id: string
  image: string
  label: string
  w: number
  x: number
  y: number
}

const cycleDurationMs = 6800
const stageCenter = { x: 50, y: 39 }

const studyTiles: StudyTile[] = [
  {
    alt: 'Family photo',
    h: 46,
    id: 'family',
    image: '/media/personal/hero-family.png',
    label: 'Anchor',
    w: 44,
    x: 0,
    y: 0,
  },
  {
    alt: 'Motorcycle photo',
    h: 46,
    id: 'ride',
    image: '/media/personal/ride.png',
    label: 'Motion',
    w: 24,
    x: 46,
    y: 0,
  },
  {
    alt: 'Notes sketch photo',
    h: 22,
    id: 'notes',
    image: '/media/personal/notes.png',
    label: 'Systems',
    w: 28,
    x: 72,
    y: 0,
  },
  {
    alt: 'Indoor group photo',
    h: 22,
    id: 'cook',
    image: '/media/personal/cook.png',
    label: 'People',
    w: 28,
    x: 72,
    y: 24,
  },
  {
    alt: 'Soccer field photo',
    h: 28,
    id: 'field',
    image: '/media/personal/field.png',
    label: 'Play',
    w: 24,
    x: 0,
    y: 50,
  },
  {
    alt: 'Forest hike photo',
    h: 28,
    id: 'hike',
    image: '/media/personal/hike.png',
    label: 'Reset',
    w: 18,
    x: 26,
    y: 50,
  },
  {
    alt: 'Coffee prep photo',
    h: 28,
    id: 'coffee',
    image: '/media/personal/coffee.png',
    label: 'Ritual',
    w: 24,
    x: 46,
    y: 50,
  },
  {
    alt: 'School building photo',
    h: 28,
    id: 'saac',
    image: '/media/personal/saac.png',
    label: 'Learn',
    w: 28,
    x: 72,
    y: 50,
  },
]

function getModeCopy(mode: EntranceMode) {
  if (mode === 'sweep-cascade') {
    return {
      eyebrow: 'Study 01',
      title: 'Sweep Cascade',
      note: 'A diagonal wave moves across the composition so the grid reads in one direction.',
    }
  }

  if (mode === 'center-out-cluster') {
    return {
      eyebrow: 'Study 02',
      title: 'Center-Out Cluster',
      note: 'A central group arrives first, then the rest of the layout expands outward from that anchor.',
    }
  }

  return {
    eyebrow: 'Study 03',
    title: 'Ghost Blocks → Image Tiles',
    note: 'Neutral blocks establish structure first, then images resolve into place with a slower confidence.',
  }
}

function getSweepDelay(tile: StudyTile) {
  return 0.28 + (tile.x * 0.55 + tile.y) * 0.01
}

function getClusterDelay(tile: StudyTile) {
  const centerX = tile.x + tile.w / 2
  const centerY = tile.y + tile.h / 2
  const dx = centerX - stageCenter.x
  const dy = centerY - stageCenter.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  return 0.26 + distance * 0.012
}

function getGhostDelay(tile: StudyTile, index: number) {
  if (tile.id === 'family') {
    return 0.42
  }

  return 0.62 + index * 0.12
}

function getClusterOffset(tile: StudyTile) {
  const centerX = tile.x + tile.w / 2
  const centerY = tile.y + tile.h / 2

  return {
    x: (stageCenter.x - centerX) * 16,
    y: (stageCenter.y - centerY) * 12,
    rotate: (centerX - stageCenter.x) * 0.18,
  }
}

export function TileEntranceStudySlide({ mode }: { mode: EntranceMode }) {
  const [cycle, setCycle] = useState(0)
  const copy = getModeCopy(mode)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCycle((current) => current + 1)
    }, cycleDurationMs)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  const orderedTiles = useMemo(() => {
    return studyTiles.map((tile, index) => ({ tile, index }))
  }, [])

  return (
    <article className="tile-entrance-study">
      <header className="tile-entrance-study__header">
        <div className="tile-entrance-study__header-main">
          <span className="tile-entrance-study__eyebrow">{copy.eyebrow}</span>
          <h1 className="tile-entrance-study__title">{copy.title}</h1>
        </div>

        <p className="tile-entrance-study__note">{copy.note}</p>
      </header>

      <div className="tile-entrance-study__canvas" key={`${mode}-${cycle}`}>
        {orderedTiles.map(({ tile, index }) => {
          const clusterOffset = getClusterOffset(tile)
          const sharedStyle = {
            height: `${tile.h}%`,
            left: `${tile.x}%`,
            top: `${tile.y}%`,
            width: `${tile.w}%`,
          }

          if (mode === 'sweep-cascade') {
            return (
              <motion.div
                animate={{
                  clipPath: 'inset(0% 0% 0% 0% round 24px)',
                  filter: 'blur(0px)',
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                className="tile-entrance-study__tile"
                initial={{
                  clipPath: 'inset(0% 0% 100% 0% round 24px)',
                  filter: 'blur(8px)',
                  opacity: 0,
                  scale: 0.985,
                  y: 52,
                }}
                key={tile.id}
                style={sharedStyle}
                transition={{
                  delay: getSweepDelay(tile),
                  duration: 1.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img
                  alt={tile.alt}
                  className="tile-entrance-study__image"
                  draggable="false"
                  src={tile.image}
                />
                <motion.span
                  animate={{ opacity: 1, y: 0 }}
                  className="tile-entrance-study__label"
                  initial={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: getSweepDelay(tile) + 0.54,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {tile.label}
                </motion.span>
              </motion.div>
            )
          }

          if (mode === 'center-out-cluster') {
            return (
              <motion.div
                animate={{
                  filter: 'blur(0px)',
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                  x: 0,
                  y: 0,
                }}
                className="tile-entrance-study__tile"
                initial={{
                  filter: 'blur(12px)',
                  opacity: 0,
                  rotate: clusterOffset.rotate,
                  scale: 0.74,
                  x: clusterOffset.x,
                  y: clusterOffset.y,
                }}
                key={tile.id}
                style={sharedStyle}
                transition={{
                  delay: getClusterDelay(tile),
                  duration: 1.34,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img
                  alt={tile.alt}
                  className="tile-entrance-study__image"
                  draggable="false"
                  src={tile.image}
                />
                <motion.span
                  animate={{ opacity: 1, y: 0 }}
                  className="tile-entrance-study__label"
                  initial={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: getClusterDelay(tile) + 0.62,
                    duration: 0.52,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {tile.label}
                </motion.span>
              </motion.div>
            )
          }

          const ghostDelay = getGhostDelay(tile, index)

          return (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="tile-entrance-study__tile"
              initial={{ opacity: 1, scale: 1 }}
              key={tile.id}
              style={sharedStyle}
            >
              <motion.img
                alt={tile.alt}
                animate={{
                  filter: 'blur(0px) saturate(1)',
                  opacity: 1,
                  scale: 1,
                }}
                className="tile-entrance-study__image"
                draggable="false"
                initial={{
                  filter: 'blur(12px) saturate(0.72)',
                  opacity: 0,
                  scale: 1.04,
                }}
                src={tile.image}
                transition={{
                  delay: ghostDelay,
                  duration: 1.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              <motion.div
                animate={{ filter: 'blur(8px)', opacity: 0 }}
                className="tile-entrance-study__ghost"
                initial={{ filter: 'blur(0px)', opacity: 1 }}
                transition={{
                  delay: ghostDelay + 0.24,
                  duration: 0.88,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="tile-entrance-study__ghost-line" />
              </motion.div>

              <motion.span
                animate={{ opacity: 1, y: 0 }}
                className="tile-entrance-study__label"
                initial={{ opacity: 0, y: 12 }}
                transition={{
                  delay: ghostDelay + 0.78,
                  duration: 0.52,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {tile.label}
              </motion.span>
            </motion.div>
          )
        })}
      </div>
    </article>
  )
}
