const STEP_COPY = [
  {
    eyebrow: 'Until 2024',
    line1Prefix: '',
    line1Swap: 'Content',
    line1Suffix: '-driven Commerce',
    line2Prefix: 'Built around ',
    line2Swap: 'Community',
    line2Suffix: '',
  },
  {
    eyebrow: 'From 2026',
    line1Prefix: '',
    line1Swap: 'Confidence',
    line1Suffix: '-driven Commerce',
    line2Prefix: 'Built around ',
    line2Swap: 'your space',
    line2Suffix: '',
  },
] as const

const REFLECTION = [
  {
    title: 'Same vision, real path.',
    body: [
      'Turning the dream of a better home',
      'into reality for everyone, everywhere.',
    ],
  },
  {
    title: 'AI is the new engine.',
    body: [
      'Content team absorbed into Commerce.',
      'Space AI — the 2026 big bet.',
    ],
  },
] as const

type Cs03OhouseIntroSlideProps = {
  step?: number
}

export function Cs03OhouseIntroSlide({ step = 0 }: Cs03OhouseIntroSlideProps) {
  const headlineIndex = Math.min(step, STEP_COPY.length - 1)
  const copy = STEP_COPY[headlineIndex]
  const showReflection = step >= 2

  return (
    <article className="ohouse-intro-slide cs03-ohouse-intro-slide">
      <div className="ohouse-intro-slide__copy" key={copy.eyebrow}>
        <p className="ohouse-intro-slide__eyebrow cs03-ohouse-intro-slide__eyebrow">
          {copy.eyebrow}
        </p>
        <h2 className="ohouse-intro-slide__headline">
          <span>
            {copy.line1Prefix}
            <span className="cs03-ohouse-intro-slide__swap">
              {copy.line1Swap}
            </span>
            {copy.line1Suffix}
          </span>
          <span>
            {copy.line2Prefix}
            <span className="cs03-ohouse-intro-slide__swap">
              {copy.line2Swap}
            </span>
            {copy.line2Suffix}
          </span>
        </h2>
      </div>

      {showReflection ? (
        <div className="cs03-ohouse-intro-slide__reflection">
          {REFLECTION.map((row, index) => (
            <section
              className="ohouse-content-statement-slide__challenge"
              key={row.title}
            >
              <span className="ohouse-content-statement-slide__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="ohouse-content-statement-slide__challenge-copy">
                <h3 className="ohouse-content-statement-slide__title">
                  {row.title}
                </h3>
                <p className="ohouse-content-statement-slide__body">
                  {row.body.map((line, lineIndex) => (
                    <span key={line}>
                      {line}
                      {lineIndex < row.body.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
              </div>
            </section>
          ))}
        </div>
      ) : null}
    </article>
  )
}
