import { motion } from 'framer-motion'

const sections = ['Introduction', 'Ohouse · Inspiration 2.0', 'Ohouse · AI transformation', 'Side Projects'] as const

type SectionIndexMotionVariant = 'marker-resolve' | 'settle' | 'static'

type SectionIndexSlideProps = {
  activeIndex?: number
  isThumbnail?: boolean
  motionVariant?: SectionIndexMotionVariant
}

export function SectionIndexSlide({
  activeIndex = 0,
  isThumbnail = false,
  motionVariant = 'static',
}: SectionIndexSlideProps) {
  const animated = !isThumbnail && motionVariant !== 'static'

  return (
    <article
      className="section-index-slide"
      data-motion-variant={motionVariant}
    >
      <header className="section-index-slide__header">
        <span>Portfolio</span>
        <span>Ilwon Yoon</span>
      </header>

      <div className="section-index-slide__copy">
        {sections.map((section, index) => (
          <div
            key={section}
            className={
              index === activeIndex
                ? 'section-index-slide__line-row section-index-slide__line-row--active'
                : 'section-index-slide__line-row section-index-slide__line-row--muted'
            }
          >
            {animated && motionVariant === 'marker-resolve' && index === activeIndex ? (
              <motion.span
                animate={{ opacity: 1, scaleY: 1 }}
                className="section-index-slide__marker"
                initial={{ opacity: 0, scaleY: 0.2 }}
                transition={{
                  delay: 0.28,
                  duration: 0.46,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ) : null}

            {animated ? (
              <motion.p
                animate={
                  motionVariant === 'settle'
                    ? {
                        color:
                          index === activeIndex
                            ? [
                                'rgba(250, 250, 250, 0.38)',
                                'rgba(250, 250, 250, 0.84)',
                                'rgba(250, 250, 250, 0.98)',
                              ]
                            : [
                                'rgba(250, 250, 250, 0.38)',
                                'rgba(250, 250, 250, 0.52)',
                                'rgba(250, 250, 250, 0.30)',
                              ],
                        filter: ['blur(10px)', 'blur(0px)', 'blur(0px)'],
                        opacity: [0, 1, 1],
                        x: [0, 0, 0],
                        y: [12, 0, 0],
                      }
                    : {
                        color:
                          index === activeIndex
                            ? 'rgba(250, 250, 250, 0.98)'
                            : 'rgba(250, 250, 250, 0.30)',
                        filter: ['blur(8px)', 'blur(0px)'],
                        opacity: [0, 1],
                        x: index === activeIndex ? [12, 0] : [0, 0],
                        y: [10, 0],
                      }
                }
                className={
                  index === activeIndex
                    ? 'section-index-slide__line section-index-slide__line--active'
                    : 'section-index-slide__line section-index-slide__line--muted'
                }
                initial={{
                  color: 'rgba(250, 250, 250, 0.24)',
                  filter: 'blur(10px)',
                  opacity: 0,
                  x: motionVariant === 'marker-resolve' && index === activeIndex ? 12 : 0,
                  y: 12,
                }}
                transition={
                  motionVariant === 'settle'
                    ? {
                        delay: index * 0.05,
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                        times: [0, 0.44, 1],
                      }
                    : {
                        delay: 0.08 + index * 0.05,
                        duration: 0.72,
                        ease: [0.22, 1, 0.36, 1],
                        times: [0, 1],
                      }
                }
              >
                {section}
              </motion.p>
            ) : (
              <p
                className={
                  index === activeIndex
                    ? 'section-index-slide__line section-index-slide__line--active'
                    : 'section-index-slide__line section-index-slide__line--muted'
                }
              >
                {section}
              </p>
            )}
          </div>
        ))}
      </div>

      <footer className="section-index-slide__footer">
        <span>2026</span>
        <span>CONFIDENTIAL | DO NOT SHARE</span>
      </footer>
    </article>
  )
}
