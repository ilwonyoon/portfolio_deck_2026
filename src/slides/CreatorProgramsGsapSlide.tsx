import { ProposalBadge } from '../components/ProposalBadge'
import type { SlideRenderContext } from '../types/presentation'

const CANVAS_WIDTH = 1920
const CANVAS_HEIGHT = 1080

const HIGHLIGHT_WIDTH = 375
const HIGHLIGHT_HEIGHT = 812

const NEAR_SCALE = 578.701 / HIGHLIGHT_HEIGHT
const NEAR_CENTER_X = 1179.936 + (HIGHLIGHT_WIDTH * NEAR_SCALE) / 2
const NEAR_CENTER_Y = 241.626 + (HIGHLIGHT_HEIGHT * NEAR_SCALE) / 2
const MID_SCALE = 578.269 / HIGHLIGHT_HEIGHT
const MID_CENTER_X = 1476.46 + (HIGHLIGHT_WIDTH * MID_SCALE) / 2
const MID_CENTER_Y = 242.456 + (HIGHLIGHT_HEIGHT * MID_SCALE) / 2
const FAR_SCALE = 580.069 / HIGHLIGHT_HEIGHT

const PROGRAMS = [
  { label: 'Content Monetization', src: '/media/creator-programs/program-01.png' },
  { label: 'Ohouse Pro Review', src: '/media/creator-programs/program-02.png' },
  { label: 'Collab Market', src: '/media/creator-programs/program-03.png' },
  { label: 'Ohouse Special Creator', src: '/media/creator-programs/program-04.png' },
] as const

type CreatorProgramsGsapSlideProps = Pick<SlideRenderContext, 'step'>

export function CreatorProgramsGsapSlide({ step = 0 }: CreatorProgramsGsapSlideProps) {
  const activeIndex = step % PROGRAMS.length

  const sideCards = PROGRAMS.map((program, i) => i).filter((i) => i !== activeIndex)
  const sidePositions = [
    { x: NEAR_CENTER_X, y: NEAR_CENTER_Y, scale: NEAR_SCALE },
    { x: MID_CENTER_X, y: MID_CENTER_Y, scale: MID_SCALE },
    { x: CANVAS_WIDTH - 100, y: CANVAS_HEIGHT / 2, scale: FAR_SCALE },
  ]

  return (
    <article
      className="creator-programs-slide creator-programs-slide--gsap"
      data-node-id="6381:247420"
    >
      <ProposalBadge label="Proposal · static steps" />

      <div className="creator-programs-slide__stage" aria-hidden="true">
        {sideCards.map((programIndex, slotIndex) => {
          const pos = sidePositions[slotIndex]
          if (!pos || pos.x >= CANVAS_WIDTH) return null
          const program = PROGRAMS[programIndex]
          return (
            <div
              className="creator-programs-slide__card"
              key={program.src}
              style={{
                position: 'absolute',
                width: HIGHLIGHT_WIDTH,
                height: HIGHLIGHT_HEIGHT,
                borderRadius: 40,
                transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
                zIndex: 10,
              }}
            >
              <img
                alt=""
                className="creator-programs-slide__image"
                draggable={false}
                src={program.src}
                style={{ borderRadius: 40 }}
              />
              <div
                className="creator-programs-slide__tint"
                style={{ borderRadius: 40, opacity: 0.6 }}
              />
            </div>
          )
        })}

        <div
          className="creator-programs-slide__card"
          key={PROGRAMS[activeIndex].src}
          style={{
            position: 'absolute',
            width: HIGHLIGHT_WIDTH,
            height: HIGHLIGHT_HEIGHT,
            borderRadius: 40,
            transform: `translate(-50%, -50%) translate(${CANVAS_WIDTH / 2}px, ${CANVAS_HEIGHT / 2}px)`,
            zIndex: 40,
          }}
        >
          <img
            alt=""
            className="creator-programs-slide__image"
            draggable={false}
            src={PROGRAMS[activeIndex].src}
            style={{ borderRadius: 40 }}
          />
        </div>
      </div>

      <div className="creator-programs-slide__labels" aria-hidden="true">
        <span className="creator-programs-slide__label" style={{ opacity: 1 }}>
          {PROGRAMS[activeIndex].label}
        </span>
      </div>

      <h2 className="creator-programs-slide__headline">Creator programs</h2>
    </article>
  )
}
