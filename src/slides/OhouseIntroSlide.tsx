const STEP_COPY = [
  {
    headline: [
      'Turning the dream of a better home',
      'into reality for everyone, everywhere.',
    ],
  },
  {
    headline: ['Content-driven Commerce', 'Built around Community'],
  },
] as const

type OhouseIntroSlideProps = {
  step?: number
}

export function OhouseIntroSlide({ step = 0 }: OhouseIntroSlideProps) {
  const copy = STEP_COPY[Math.min(step, STEP_COPY.length - 1)]

  return (
    <article className="ohouse-intro-slide" data-node-id="5923:90014">
      <div className="ohouse-intro-slide__copy" data-node-id="5995:26120">
        <p className="ohouse-intro-slide__eyebrow" data-node-id="5995:26119">
          About Ohouse
        </p>
        <h2 className="ohouse-intro-slide__headline" data-node-id="5923:90018">
          {copy.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
      </div>
    </article>
  )
}
