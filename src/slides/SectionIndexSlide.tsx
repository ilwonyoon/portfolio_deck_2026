const sections = [
  'Introduction',
  'Ohouse · Content 2.0',
  'Ohouse · AI transformation',
  'Work like AI native',
] as const

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
            key={section}
            className={
              index === activeIndex
                ? 'section-index-slide__line-row section-index-slide__line-row--active'
                : 'section-index-slide__line-row section-index-slide__line-row--muted'
            }
          >
            <p
              className={
                index === activeIndex
                  ? 'section-index-slide__line section-index-slide__line--active'
                  : 'section-index-slide__line section-index-slide__line--muted'
              }
            >
              {section}
            </p>
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
