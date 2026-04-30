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
}: SectionIndexSlideV2Props) {
  return (
    <article className="section-index-slide section-index-slide--v2">
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
              <p className={lineClass}>{section}</p>
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
