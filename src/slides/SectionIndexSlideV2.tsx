import { motion } from 'framer-motion'
import { ProposalBadge } from '../components/ProposalBadge'

const sections = [
  'Introduction',
  'Ohouse · Inspiration 2.0',
  'Ohouse · AI transformation',
  'Side Projects',
] as const

type SectionIndexSlideV2Props = {
  activeIndex?: number
  isThumbnail?: boolean
}

export function SectionIndexSlideV2({
  activeIndex = 0,
  isThumbnail = false,
}: SectionIndexSlideV2Props) {
  return (
    <article
      className="section-index-slide section-index-slide--v2"
      data-motion-variant="v2"
    >
      <ProposalBadge />
      <header className="section-index-slide__header">
        <span>Portfolio</span>
        <span>Ilwon Yoon</span>
      </header>

      <div className="section-index-slide__copy">
        {sections.map((section, index) => {
          const isActive = index === activeIndex
          const lineClass = isActive
            ? 'section-index-slide__line section-index-slide__line--active'
            : 'section-index-slide__line section-index-slide__line--muted'
          const rowClass = isActive
            ? 'section-index-slide__line-row section-index-slide__line-row--active'
            : 'section-index-slide__line-row section-index-slide__line-row--muted'

          return (
            <div className={rowClass} key={section}>
              {isThumbnail ? (
                <p className={lineClass}>{section}</p>
              ) : (
                <motion.p
                  animate={{
                    color: isActive
                      ? 'rgba(255, 255, 255, 0.96)'
                      : 'rgba(255, 255, 255, 0.42)',
                    opacity: 1,
                  }}
                  className={lineClass}
                  initial={{
                    color: 'rgba(255, 255, 255, 0.24)',
                    opacity: 0,
                  }}
                  transition={{
                    delay: 0.12 + index * 0.08,
                    duration: 0.56,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {section}
                </motion.p>
              )}
            </div>
          )
        })}
      </div>

      <footer className="section-index-slide__footer">
        <span>2026</span>
        <span>CONFIDENTIAL | DO NOT SHARE</span>
      </footer>
    </article>
  )
}
