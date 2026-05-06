const SYSTEM_ROWS = [
  {
    body: '100 users, always on. 1–2 hours to feedback. No recruiting wait.',
    title: 'O!Makers',
  },
  {
    body: 'Always-on signal. Every team. Categorized. Archived.',
    title: 'User Suggestion Channel',
  },
  {
    body: "Don't ask twice.",
    title: 'Research Dashboard',
  },
  {
    body: "Once a quarter. What data can't tell you.",
    title: 'Offline Meetup',
  },
] as const

export function UserCentricSystemSlide() {
  return (
    <article className="user-centric-system-slide">
      <div className="user-centric-system-slide__grid">
        <div className="user-centric-system-slide__intro">
          <p className="user-centric-system-slide__eyebrow">System</p>
          <h2 className="user-centric-system-slide__headline">
            <span>One channel wasn't enough.</span>
            <span>We built a stack.</span>
          </h2>
        </div>

        <div
          aria-label="User-centric system stack"
          className="user-centric-system-slide__stack"
        >
          {SYSTEM_ROWS.map((row, index) => (
            <section className="user-centric-system-slide__row" key={row.title}>
              <span className="user-centric-system-slide__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{row.title}</h3>
                <p>{row.body}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
