import { DeckMetaFrame } from '../components/DeckMetaFrame'
import { motion } from 'framer-motion'
import type { SlideRenderContext } from '../types/presentation'

type PosterProfileTextAnimation = 'fade-up' | 'line-reveal' | 'static'

type PosterProfileSlideProps = Pick<SlideRenderContext, 'isThumbnail'> & {
  textAnimation?: PosterProfileTextAnimation
}

const COPY_BLOCKS = [
  'Hi, I am Ilwon Yoon. Former Head of Product Design at Ohouse, leading all design functions (40+ people).',
  'Previously at Meta, Amaze VR, Google.',
  'Now I ship things with AI.',
] as const

const COPY_LINES = [
  'Hi, I am Ilwon Yoon. Former Head of',
  'Product Design at Ohouse, leading all',
  'design functions (40+ people).',
  'Previously at Meta, Amaze VR, Google.',
  'Now I ship things with AI.',
] as const

function PosterProfileCopy({
  isThumbnail,
  textAnimation,
}: Pick<PosterProfileSlideProps, 'isThumbnail' | 'textAnimation'>) {
  if (isThumbnail || textAnimation === 'static') {
    return (
      <>
        <p className="poster-profile-slide__body">{COPY_BLOCKS[0]}</p>
        <p className="poster-profile-slide__body">{COPY_BLOCKS[1]}</p>
        <p className="poster-profile-slide__body poster-profile-slide__body--break">
          {COPY_BLOCKS[2]}
        </p>
      </>
    )
  }

  if (textAnimation === 'line-reveal') {
    return (
      <>
        {COPY_LINES.map((line, index) => (
          <div
            className={
              index === COPY_LINES.length - 1
                ? 'poster-profile-slide__line-shell poster-profile-slide__line-shell--break'
                : 'poster-profile-slide__line-shell'
            }
            key={line}
          >
            <motion.p
              animate={{ y: 0 }}
              className="poster-profile-slide__body poster-profile-slide__body--line"
              initial={{ y: '108%' }}
              transition={{
                delay: 0.14 + index * 0.09,
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.p>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {COPY_BLOCKS.map((copy, index) => (
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className={
            index === COPY_BLOCKS.length - 1
              ? 'poster-profile-slide__body poster-profile-slide__body--break'
              : 'poster-profile-slide__body'
          }
          initial={{ opacity: 0, y: 18 }}
          key={copy}
          transition={{
            delay: 0.16 + index * 0.11,
            duration: 0.58,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {copy}
        </motion.p>
      ))}
    </>
  )
}

export function PosterProfileSlide({
  isThumbnail = false,
  textAnimation = 'static',
}: PosterProfileSlideProps) {
  return (
    <article
      className="poster-profile-slide"
      data-animated={isThumbnail ? 'false' : 'true'}
      data-text-animation={textAnimation}
    >
      <DeckMetaFrame
        bottomLeft="2026"
        bottomRight="CONFIDENTIAL | DO NOT SHARE"
        className="poster-profile-slide__meta"
        topLeft="Portfolio"
        topRight="Ilwon Yoon"
      />

      <div className="poster-profile-slide__copy">
        <PosterProfileCopy
          isThumbnail={isThumbnail}
          textAnimation={textAnimation}
        />
      </div>

      <div className="poster-profile-slide__content-area">
        <div className="poster-profile-slide__portrait-shell">
          <img
            alt="Ilwon Yoon portrait"
            className="poster-profile-slide__portrait"
            draggable="false"
            src="/media/personal/ilwon_profile.png"
          />
        </div>
      </div>
    </article>
  )
}
