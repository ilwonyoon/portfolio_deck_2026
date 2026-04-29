import type { SlideRenderContext } from '../types/presentation'

type Step = {
  activeIndex: 0 | 1 | 2
  screenA: string
  screenB: string
  screenHeight: number
  screenTopPercent: number
  screenTopOffset: number
}

const STEPS: readonly Step[] = [
  {
    activeIndex: 0,
    screenA: '/media/feed-structure/step1-a.png',
    screenB: '/media/feed-structure/step1-b.png',
    screenHeight: 902,
    screenTopPercent: 58.33,
    screenTopOffset: -3,
  },
  {
    activeIndex: 1,
    screenA: '/media/feed-structure/step2-a.png',
    screenB: '/media/feed-structure/step2-b.png',
    screenHeight: 1077,
    screenTopPercent: 50,
    screenTopOffset: 0.5,
  },
  {
    activeIndex: 2,
    screenA: '/media/feed-structure/step3-a.png',
    screenB: '/media/feed-structure/step3-b.png',
    screenHeight: 1077,
    screenTopPercent: 50,
    screenTopOffset: 0.5,
  },
]

const LIST_ITEMS = [
  'User Generated',
  'Ads (Product & Styleshot)',
  'Internal Promo',
] as const

type FeedStructureSlideProps = Pick<SlideRenderContext, 'step'>

export function FeedStructureSlide({ step = 0 }: FeedStructureSlideProps) {
  const current = STEPS[Math.min(step, STEPS.length - 1)]

  return (
    <article className="feed-structure-slide" data-node-id="6375:226136">
      <div className="feed-structure-slide__copy">
        <h2 className="feed-structure-slide__headline">Feed anatomy</h2>

        <ol className="feed-structure-slide__list">
          {LIST_ITEMS.map((label, index) => {
            const isActive = index === current.activeIndex
            return (
              <li
                className="feed-structure-slide__list-item"
                data-active={isActive ? 'true' : 'false'}
                key={label}
              >
                <span className="feed-structure-slide__list-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="feed-structure-slide__list-label">{label}</span>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="feed-structure-slide__stage" aria-hidden="true">
        <div
          className="feed-structure-slide__screens"
          style={{
            top: `calc(${current.screenTopPercent}% + ${current.screenTopOffset}px)`,
          }}
        >
          <img
            alt=""
            className="feed-structure-slide__screen feed-structure-slide__screen--left"
            draggable={false}
            src={current.screenA}
            style={{ height: current.screenHeight }}
          />
          <img
            alt=""
            className="feed-structure-slide__screen feed-structure-slide__screen--right"
            draggable={false}
            src={current.screenB}
            style={{ height: current.screenHeight }}
          />
        </div>
      </div>
    </article>
  )
}
