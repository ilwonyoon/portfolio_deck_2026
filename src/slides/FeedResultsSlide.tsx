type Metric = {
  label: string
  value: string
  caption: string
}

const METRICS: readonly Metric[] = [
  {
    caption: 'Daily active users on Discover',
    label: 'Engagement',
    value: '+38%',
  },
  {
    caption: 'Week-4 return rate vs. prior feed',
    label: 'Retention',
    value: '+12pp',
  },
  {
    caption: 'Revenue per active user',
    label: 'Monetization',
    value: '+21%',
  },
] as const

export function FeedResultsSlide() {
  return (
    <article className="feed-results-slide">
      <header className="feed-results-slide__header">
        <p className="feed-results-slide__eyebrow">Results</p>
        <h2 className="feed-results-slide__headline">
          Personalization moved the numbers that matter.
        </h2>
      </header>

      <ul className="feed-results-slide__grid">
        {METRICS.map((metric) => (
          <li className="feed-results-slide__cell" key={metric.label}>
            <p className="feed-results-slide__label">{metric.label}</p>
            <p className="feed-results-slide__value">{metric.value}</p>
            <p className="feed-results-slide__caption">{metric.caption}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
