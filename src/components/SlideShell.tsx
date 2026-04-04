import type { ReactNode } from 'react'
import { useTextMetrics } from '../hooks/useTextMetrics'

type SlideShellProps = {
  body: string
  brand?: string
  children: ReactNode
  eyebrow?: string
  sectionLabel: string
  slideIndex: number
  summary: string
  title: string
  totalSlides: number
}

export function SlideShell({
  body,
  brand = 'Ilwon Yoon',
  children,
  eyebrow,
  sectionLabel,
  slideIndex,
  summary,
  title,
  totalSlides,
}: SlideShellProps) {
  const metrics = useTextMetrics({
    text: summary,
    maxWidth: 484,
    lineHeight: 38,
    font: '500 26px "General Sans"',
  })

  return (
    <article className="slide-shell">
      <header className="slide-shell__header">
        <span className="slide-shell__brand">{brand}</span>
        <span className="slide-shell__section">{sectionLabel}</span>
        <span className="slide-shell__index">
          {String(slideIndex + 1).padStart(2, '0')} /{' '}
          {String(totalSlides).padStart(2, '0')}
        </span>
      </header>

      <section className="slide-shell__main">
        <div className="slide-shell__lead">
          {eyebrow ? <span className="slide-shell__eyebrow">{eyebrow}</span> : null}
          <h1 className="slide-shell__title">{title}</h1>
          <p className="slide-shell__body">{body}</p>
        </div>

        <div className="slide-shell__content">{children}</div>
      </section>

      <footer className="slide-shell__footer">
        <div />

        <aside
          className="slide-summary"
          style={{ minHeight: `${Math.max(metrics.height, 156)}px` }}
        >
          <span className="slide-summary__label">Summary</span>
          <p className="slide-summary__body">{summary}</p>
          <span className="slide-summary__meta">
            Pretext measured • {metrics.lineCount} lines
          </span>
        </aside>
      </footer>
    </article>
  )
}
