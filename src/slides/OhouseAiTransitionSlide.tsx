const PATHS = [
  {
    body: 'Renovation tools, pro workflows, and materials distribution.',
    title: 'Deepen the move',
  },
  {
    body: "The hardest part of interior design isn't choosing. It's deciding without seeing.",
    title: 'Solve the core problem at scale',
  },
] as const

export function OhouseAiTransitionSlide() {
  return (
    <article className="ohouse-ai-transition-slide" data-node-id="6352:159200">
      <section
        aria-label="Two paths forward"
        className="ohouse-ai-transition-slide__paths"
      >
        {PATHS.map((path) => (
          <section className="ohouse-ai-transition-slide__path" key={path.title}>
            <h2>{path.title}</h2>
            <p>{path.body}</p>
          </section>
        ))}
      </section>
    </article>
  )
}
