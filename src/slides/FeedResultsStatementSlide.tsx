const RESULTS = [
  {
    label: 'Win',
    body: 'Personalization shifted more high-intent users into purchase behavior.',
    title: 'HCPY share ↑',
  },
  {
    label: 'Win',
    body: 'Lower-converting, non-purchase users consumed more content.',
    title: 'LCPN/Y content consumption ↑',
  },
  {
    label: 'Problem revealed',
    body: 'Returning users started seeing the same content. The algorithm got better at finding the right content, but the right content was running out.',
    title: 'Right content was running out.',
  },
] as const

export function FeedResultsStatementSlide() {
  return (
    <article className="ohouse-content-statement-slide ohouse-content-statement-slide--results">
      <div className="ohouse-content-statement-slide__grid">
        <div className="ohouse-content-statement-slide__thesis-block">
          <p className="ohouse-content-statement-slide__eyebrow">Results</p>
          <h2 className="ohouse-content-statement-slide__thesis">
            <span>Personalization worked.</span>
            <span>And that became the problem.</span>
          </h2>
        </div>

        <div className="ohouse-content-statement-slide__challenge-list">
          {RESULTS.map((result, index) => (
            <section
              className="ohouse-content-statement-slide__challenge"
              key={result.title}
            >
              <span className="ohouse-content-statement-slide__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="ohouse-content-statement-slide__challenge-copy">
                <p className="ohouse-content-statement-slide__label">
                  {result.label}
                </p>
                <h3 className="ohouse-content-statement-slide__title">
                  {result.title}
                </h3>
                <p className="ohouse-content-statement-slide__body">
                  {result.body}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
