import type { ReactNode } from 'react'
import { useTextMetrics } from '../hooks/useTextMetrics'

type SlideShellProps = {
  body?: string
  brand?: string
  children?: ReactNode
  eyebrow?: string
  sectionLabel: string
  slideIndex: number
  summary?: string
  title?: string
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
    text: summary ?? '',
    maxWidth: 500,
    lineHeight: 30.8,
    font: '420 22px "General Sans"',
  })
  const hasLead = Boolean(eyebrow || title || body)
  const hasContent = children !== undefined && children !== null && children !== false
  const hasSummary = Boolean(summary)
  const hasMain = hasLead || hasContent

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

      {hasMain ? (
        <section className="slide-shell__main">
          {hasLead ? (
            <div className="slide-shell__lead">
              {eyebrow ? (
                <span className="slide-shell__eyebrow">{eyebrow}</span>
              ) : null}
              {title ? <h1 className="slide-shell__title">{title}</h1> : null}
              {body ? <p className="slide-shell__body">{body}</p> : null}
            </div>
          ) : null}

          {hasContent ? <div className="slide-shell__content">{children}</div> : null}
        </section>
      ) : null}

      {hasSummary ? (
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
      ) : null}
    </article>
  )
}
