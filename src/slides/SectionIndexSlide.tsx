const sections = [
  {
    label: 'Introduction',
    targetSlide: 'belief-statement-v2',
  },
  {
    label: 'Ohouse · Content 2.0',
    targetSlide: 'case-study-02b',
  },
  {
    label: 'Ohouse · AI transformation',
    targetSlide: 'ohouse-ai-role-shift',
  },
  {
    label: 'Human-AI Agent Workflow',
    targetSlide: 'hai-workflow-fragmentation',
  },
] as const

function buildSectionHref(targetSlide: string) {
  if (typeof window === 'undefined') {
    return `?slide=${targetSlide}&step=0`
  }

  const params = new URLSearchParams(window.location.search)
  params.set('slide', targetSlide)
  params.set('step', '0')

  return `${window.location.pathname}?${params.toString()}`
}

type SectionIndexSlideProps = {
  activeIndex?: number
  isThumbnail?: boolean
}

export function SectionIndexSlide({
  activeIndex = 0,
}: SectionIndexSlideProps) {
  return (
    <article className="section-index-slide">
      <header className="section-index-slide__header">
        <span>Portfolio</span>
        <span>Ilwon Yoon</span>
      </header>

      <div className="section-index-slide__copy">
        {sections.map((section, index) => (
          <div
            key={section.label}
            className={
              index === activeIndex
                ? 'section-index-slide__line-row section-index-slide__line-row--active'
                : 'section-index-slide__line-row section-index-slide__line-row--muted'
            }
          >
            <a
              className={
                index === activeIndex
                  ? 'section-index-slide__line section-index-slide__line--active'
                  : 'section-index-slide__line section-index-slide__line--muted'
              }
              href={buildSectionHref(section.targetSlide)}
            >
              {section.label}
            </a>
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
