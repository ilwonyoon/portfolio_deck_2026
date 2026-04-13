const sections = ['Introduction', 'Ohouse · Inspiration 2.0', 'Ohouse · AI transformation', 'Side Projects'] as const

type SectionIndexSlideProps = {
  activeIndex?: number
}

export function SectionIndexSlide({ activeIndex = 0 }: SectionIndexSlideProps) {
  return (
    <article className="section-index-slide">
      <header className="section-index-slide__header">
        <span>Portfolio</span>
        <span>Ilwon Yoon</span>
      </header>

      <div className="section-index-slide__copy">
        {sections.map((section, index) => (
          <p
            key={section}
            className={
              index === activeIndex
                ? 'section-index-slide__line section-index-slide__line--active'
                : 'section-index-slide__line section-index-slide__line--muted'
            }
          >
            {section}
          </p>
        ))}
      </div>

      <footer className="section-index-slide__footer">
        <span>2026</span>
        <span>CONFIDENTIAL | DO NOT SHARE</span>
      </footer>
    </article>
  )
}
