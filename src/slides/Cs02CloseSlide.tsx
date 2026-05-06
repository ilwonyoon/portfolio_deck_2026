const RESULT_ROWS = [
  {
    body: [
      'The company saw AI coming.',
      'Knowing was not the same as readiness.',
    ],
    label: 'Signal',
    title: 'AI was coming.',
  },
  {
    body: [
      '6 months building confidence',
      'while still running the product team.',
    ],
    label: 'Proof',
    title: 'Confidence built.',
  },
  {
    body: [
      'Content team dissolved.',
      'CEO committed to AI-native.',
      'Full KR rebuild underway.',
    ],
    label: 'Commitment',
    title: 'AI-native committed.',
  },
] as const

export function Cs02CloseSlide() {
  return (
    <article className="ohouse-cs01-close-slide">
      <header className="ohouse-cs01-close-slide__header">
        <p className="ohouse-cs01-close-slide__eyebrow">CS02 close</p>
        <h1 className="ohouse-cs01-close-slide__headline">
          The company knew AI was coming.
          <br />
          But knowing wasn't enough.
        </h1>
      </header>

      <section
        aria-label="CS02 close results"
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
