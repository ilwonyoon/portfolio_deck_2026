const sections = [
  { label: 'Introduction', muted: false },
  { label: 'Ohouse · Inspiration 2.0', muted: true },
  { label: 'Ohouse · AI transformation', muted: true },
  { label: 'Side Projects', muted: true },
]

export function SectionIndexSlide() {
  return (
    <article className="section-index-slide">
      <header className="section-index-slide__header">
        <span>Portfolio</span>
        <span>Ilwon Yoon</span>
      </header>

      <div className="section-index-slide__copy">
        {sections.map((section) => (
          <p
            key={section.label}
            className={
              section.muted
                ? 'section-index-slide__line section-index-slide__line--muted'
                : 'section-index-slide__line'
            }
          >
            {section.label}
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
