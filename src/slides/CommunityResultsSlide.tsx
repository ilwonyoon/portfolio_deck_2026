const COMMUNITY_RESULTS = [
  {
    label: 'Business',
    title: "Korea's largest interior Q&A.",
    body: [
      'DAU 100K.',
      '200+ posts/day. 3.2 comments per post.',
      'Product tags in comments drove purchase decisions.',
      'HCPY share ↑',
    ],
  },
  {
    label: 'User problem',
    title: "The question got answered. But the space didn't.",
    body: [
      "Reading someone else's description",
      'of a round table in a 30-pyeong kitchen',
      "isn't the same as seeing it in yours.",
      "Text couldn't bridge what vision needed.",
    ],
  },
] as const

export function CommunityResultsSlide() {
  return (
    <article className="ohouse-content-statement-slide ohouse-content-statement-slide--results ohouse-content-statement-slide--community-results">
      <div className="ohouse-content-statement-slide__grid">
        <div className="ohouse-content-statement-slide__thesis-block">
          <p className="ohouse-content-statement-slide__eyebrow">Results</p>
          <h2 className="ohouse-content-statement-slide__thesis">
            <span>Community helped.</span>
            <span>Not enough.</span>
          </h2>
        </div>

        <div className="ohouse-content-statement-slide__challenge-list">
          {COMMUNITY_RESULTS.map((result, index) => (
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
