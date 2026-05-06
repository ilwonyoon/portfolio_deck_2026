const SPACE_AI_RESULTS = [
  {
    title: 'Faster decisions.',
    body: [
      'Avg. time to purchase: 8d → 4.6d.',
      'Strongest for movable furniture.',
    ],
  },
  {
    title: 'Higher CVR.',
    body: [
      'PDP to purchase: ~7% vs. content 2–3%.',
      'O2O conversion: 3–4% → 6–7%.',
    ],
  },
  {
    title: 'Also launched in the US.',
    body: [
      'Standalone app. Subscription + affiliate.',
      'Early signal: 6–8% subscription conversion.',
    ],
  },
] as const

export function SpaceAiResultsSlide() {
  return (
    <article className="ohouse-content-statement-slide ohouse-content-statement-slide--results ohouse-content-statement-slide--creator-results">
      <div className="ohouse-content-statement-slide__grid">
        <div className="ohouse-content-statement-slide__thesis-block">
          <p className="ohouse-content-statement-slide__eyebrow">Results</p>
          <h2 className="ohouse-content-statement-slide__thesis">
            <span>Visualization proven.</span>
            <span>New business model explored.</span>
          </h2>
        </div>

        <div className="ohouse-content-statement-slide__challenge-list">
          {SPACE_AI_RESULTS.map((result, index) => (
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
