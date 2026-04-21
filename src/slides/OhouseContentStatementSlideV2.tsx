import { ProposalBadge } from '../components/ProposalBadge'

const CONTENT_CHALLENGES = [
  {
    body: 'Ranked by popularity, not relevance.',
    title: 'Weak Discovery',
  },
  {
    body: 'Most content is once-in-a-lifetime home tours.',
    title: 'Not Relatable',
  },
  {
    body: 'Different layout, budget, furniture — no way to bridge the gap.',
    title: 'Hard to Execute',
  },
] as const

export function OhouseContentStatementSlideV2() {
  return (
    <article className="ohouse-content-statement-slide ohouse-content-statement-slide--v2">
      <ProposalBadge />

      <div className="ohouse-content-statement-slide__grid">
        <div className="ohouse-content-statement-slide__thesis-block">
          <h2 className="ohouse-content-statement-slide__thesis">
            The major challenges
          </h2>
          <p className="ohouse-content-statement-slide__thesis-sub">
            Before we could grow content, we had to fix what was broken.
          </p>
        </div>

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
