const RESULT_ROWS = [
  {
    body: ['Launched in 3 months.', 'Minimal marketing.'],
    label: 'Launch',
    title: 'US standalone.',
  },
  {
    body: ['4.4★ App Store / Google Play', 'Subscription: 6–8%'],
    label: 'Signal',
    title: 'The model works.',
  },
  {
    body: ['Affiliate revenue: early signal', 'Not at scale yet.'],
    label: 'Limit',
    title: 'Still early.',
  },
] as const

export function OhouseAiUsStandaloneSlide() {
  return (
    <article className="ohouse-cs01-close-slide ohouse-cs01-close-slide--us-standalone">
      <header className="ohouse-cs01-close-slide__header">
        <p className="ohouse-cs01-close-slide__eyebrow">US — Standalone</p>
        <h1 className="ohouse-cs01-close-slide__headline">
          AI Home Interior
          <br />
          Ohouse AI
        </h1>
      </header>

      <section
        aria-label="US standalone signals"
        className="ohouse-cs01-close-slide__grid"
      >
        {RESULT_ROWS.map((row, index) => (
          <div className="ohouse-cs01-close-slide__block" key={row.title}>
            <span className="ohouse-cs01-close-slide__index">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="ohouse-cs01-close-slide__label">{row.label}</p>
            <h2 className="ohouse-cs01-close-slide__title">{row.title}</h2>
            <p className="ohouse-cs01-close-slide__body">
              {row.body.map((line, lineIndex) => (
                <span key={line}>
                  {line}
                  {lineIndex < row.body.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </div>
        ))}
      </section>
    </article>
  )
}
