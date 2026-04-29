type Metric = {
  label: string
  value: string
  caption: string
}

const METRICS: readonly Metric[] = [
  {
    caption: 'More high-intent users shifted into purchase behavior.',
    label: 'Win',
    value: 'HCPY share ↑',
  },
  {
    caption: 'Lower-converting users stayed deeper in the feed.',
    label: 'Win',
    value: 'LCPN/Y consumption ↑',
  },
  {
    caption: 'The algorithm found relevant content faster, so returning users started seeing repeats.',
    label: 'Problem revealed',
    value: 'Right content was running out.',
  },
] as const

export function FeedResultsSlide() {
  return (
    <article className="feed-results-slide">
      <header className="feed-results-slide__header">
        <p className="feed-results-slide__eyebrow">Results</p>
        <h2 className="feed-results-slide__headline">
          <span>Personalization worked.</span>
          <span>And that became the problem.</span>
        </h2>
      </header>

      <ul className="feed-results-slide__grid">
        {METRICS.map((metric) => (
          <li className="feed-results-slide__cell" key={metric.value}>
            <p className="feed-results-slide__label">{metric.label}</p>
            <p className="feed-results-slide__value">{metric.value}</p>
            <p className="feed-results-slide__caption">{metric.caption}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
