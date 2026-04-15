const CONTENT_CHALLENGES = [
  {
    body: 'Ranked by popularity, not relevance. Users who search long enough find what they need — but most give up before they get there.',
    title: 'Weak Discovery',
  },
  {
    body: 'Most content is once-in-a-lifetime home tours — beautiful, but neither affordable nor followable for someone planning their next home.',
    title: 'Not Relatable',
  },
  {
    body: 'Even with the right inspiration, the gap is real — different layout, furniture, budget. No way to bridge it without help.',
    title: 'Hard to Execute',
  },
] as const

export function OhouseContentStatementSlide() {
  return (
    <article className="ohouse-content-statement-slide" data-node-id="6041:24895">
      <div className="ohouse-content-statement-slide__grid">
        <h2 className="ohouse-content-statement-slide__thesis">
          The major challenges
        </h2>

        <div className="ohouse-content-statement-slide__challenge-list">
          {CONTENT_CHALLENGES.map((challenge, index) => (
            <section
              className="ohouse-content-statement-slide__challenge"
              key={challenge.title}
            >
              <span className="ohouse-content-statement-slide__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="ohouse-content-statement-slide__challenge-copy">
                <h3 className="ohouse-content-statement-slide__title">
                  {challenge.title}
                </h3>
                <p className="ohouse-content-statement-slide__body">
                  {challenge.body}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
