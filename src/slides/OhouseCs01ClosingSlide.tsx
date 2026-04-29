const RESULT_ROWS = [
  {
    body: [
      'Revenue ₩240.2B → ₩287.9B  +20%',
      'Operating -₩17.5B → +₩0.57B',
      'HCPY 178k → 216k  +21%',
    ],
    label: 'Result',
    title: 'BEP achieved.',
  },
  {
    body: [
      'MAU 3.3M → 4.0M  +21%',
      'Still below the previous peak.',
    ],
    label: 'Recovery',
    title: 'MAU stabilized.',
  },
  {
    body: [
      'Revenue per MAU ₩73 → ₩72',
      "Korea's moving market was finite.",
    ],
    label: 'Limit',
    title: 'The ceiling was clear.',
  },
] as const

export function OhouseCs01ClosingSlide() {
  return (
    <article className="ohouse-cs01-close-slide" data-node-id="6352:159197">
      <header className="ohouse-cs01-close-slide__header">
        <p className="ohouse-cs01-close-slide__eyebrow">CS01 result</p>
        <h1 className="ohouse-cs01-close-slide__headline">
          BEP achieved.
          <br />
          For the first time.
        </h1>
      </header>

      <section
        aria-label="CS01 result metrics"
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
