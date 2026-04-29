const CREATOR_RESULTS = [
  {
    title: 'Creator Economy scaled supply.',
    body: [
      'Content volume grew 3x in 2 months.',
      '20,000+ curators joined the network.',
      'Curator signups grew by 1,000+/month.',
      'Top creators averaged 1.25M points/month.',
    ],
  },
  {
    title: 'Right content for right users worked.',
    body: [
      'Personalized Discovery and Creator Economy both pushed HCPY share up.',
      'Creator follows grew 3.9x after launch.',
    ],
  },
  {
    title: 'But one gap remained.',
    body: [
      'People found inspiration.',
      'They still didn’t know how to execute it.',
    ],
  },
] as const

export function CreatorEconomyResultsSlide() {
  return (
    <article className="ohouse-content-statement-slide ohouse-content-statement-slide--results ohouse-content-statement-slide--creator-results">
      <div className="ohouse-content-statement-slide__grid">
        <div className="ohouse-content-statement-slide__thesis-block">
          <p className="ohouse-content-statement-slide__eyebrow">Results</p>
          <h2 className="ohouse-content-statement-slide__thesis">
            <span>More relatable content.</span>
            <span>More HCPY.</span>
          </h2>
        </div>

        <div className="ohouse-content-statement-slide__challenge-list">
          {CREATOR_RESULTS.map((result, index) => (
            <section
              className="ohouse-content-statement-slide__challenge"
              key={result.title}
            >
              <span className="ohouse-content-statement-slide__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="ohouse-content-statement-slide__challenge-copy">
                <h3 className="ohouse-content-statement-slide__title">
                  {result.title}
                </h3>
                <p className="ohouse-content-statement-slide__body">
                  {result.body.map((line, lineIndex) => (
                    <span key={line}>
                      {line}
                      {lineIndex < result.body.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
