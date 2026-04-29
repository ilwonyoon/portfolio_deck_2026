import { ProposalBadge } from '../components/ProposalBadge'

const CONTENT_CHALLENGES = [
  {
    body: 'Ranked by popularity, not relevance. Users who search long enough find what they need, but most give up before they get there.',
    title: 'Weak Discovery',
  },
  {
    body: 'Most content is once-in-a-lifetime home tours, beautiful but neither affordable nor followable for someone planning their next home.',
    title: 'Not Relatable',
  },
  {
    body: 'Even with the right inspiration, the gap is real: different layout, furniture, budget. No way to bridge it without help.',
    title: 'Hard to Execute',
  },
] as const

export function OhouseContentStatementBlocksSlide() {
  return (
    <article className="ohouse-content-blocks-slide">
      <ProposalBadge label="Option · blocks" />

      <header className="ohouse-content-blocks-slide__header">
        <p className="ohouse-content-blocks-slide__eyebrow">Content 2.0</p>
        <h2 className="ohouse-content-blocks-slide__headline">
          <span>Content was the lever.</span>
          <span>The experience still had three gaps.</span>
        </h2>
      </header>

      <div className="ohouse-content-blocks-slide__grid">
        {CONTENT_CHALLENGES.map((challenge, index) => (
          <section className="ohouse-content-blocks-slide__block" key={challenge.title}>
            <span className="ohouse-content-blocks-slide__index">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="ohouse-content-blocks-slide__title">
              {challenge.title}
            </h3>
            <p className="ohouse-content-blocks-slide__body">
              {challenge.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  )
}
