type DesignSystemSlideMode = 'type-scale' | 'pairings' | 'layout'

function TypeScaleSlide() {
  return (
    <article className="design-system-slide">
      <header className="design-system-slide__header">
        <span className="design-system-slide__brand">Ilwon Yoon</span>
        <span className="design-system-slide__context">Design System / Type Scale</span>
        <span className="design-system-slide__utility">General Sans Variable</span>
      </header>

      <div className="design-system-slide__grid">
        <div className="design-system-slide__intro">
          <span className="design-system-slide__eyebrow">Current type tokens</span>
          <h1 className="design-system-slide__title">
            One scale,
            <br />
            a few strong moves.
          </h1>
          <p className="design-system-slide__body">
            The deck works best when utility stays calm, display stays bold, and
            every large type style has a specific job.
          </p>
        </div>

        <div className="design-system-scale">
          <div className="design-system-scale__row">
            <span className="design-system-scale__meta">Utility / Medium / 14 / 140% / 0.15px</span>
            <span className="design-system-scale__sample design-system-scale__sample--utility">
              Utility text
            </span>
          </div>
          <div className="design-system-scale__row">
            <span className="design-system-scale__meta">Support / Regular / 22 / 140% / 0.15px</span>
            <span className="design-system-scale__sample design-system-scale__sample--body">
              Supporting copy should explain scope, behavior, or context.
            </span>
          </div>
          <div className="design-system-scale__row">
            <span className="design-system-scale__meta">Essay / Medium / 34 / 128% / 0.1px</span>
            <span className="design-system-scale__sample design-system-scale__sample--essay">
              A quiet slide can still carry the argument.
            </span>
          </div>
          <div className="design-system-scale__row">
            <span className="design-system-scale__meta">Display / Medium / 88 / 96% / -0.046em</span>
            <span className="design-system-scale__sample design-system-scale__sample--display">
              System-building
            </span>
          </div>
          <div className="design-system-scale__row">
            <span className="design-system-scale__meta">Poster / Medium / 114 / 94% / -0.045em</span>
            <span className="design-system-scale__sample design-system-scale__sample--poster">
              Read like a poster.
            </span>
          </div>
          <div className="design-system-scale__row">
            <span className="design-system-scale__meta">Statement / Medium / 114 / 94% / -0.045em</span>
            <span className="design-system-scale__sample design-system-scale__sample--statement">
              I ship things with AI
            </span>
          </div>
          <div className="design-system-scale__row">
            <span className="design-system-scale__meta">Ledger / Medium / 82 / 100% / -0.042em</span>
            <span className="design-system-scale__sample design-system-scale__sample--ledger">
              Ohouse (2022–2025)
            </span>
          </div>
          <div className="design-system-scale__row">
            <span className="design-system-scale__meta">Metric Value / Semi Bold / 122 / 92% / -0.05em</span>
            <span className="design-system-scale__sample design-system-scale__sample--metric">
              330K
            </span>
          </div>
          <div className="design-system-scale__row">
            <span className="design-system-scale__meta">Metric Label / Semi Bold / 78 / 94% / -0.042em</span>
            <span className="design-system-scale__sample design-system-scale__sample--metric-label">
              saved homes
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

function PairingsSlide() {
  return (
    <article className="design-system-slide">
      <header className="design-system-slide__header">
        <span className="design-system-slide__brand">Ilwon Yoon</span>
        <span className="design-system-slide__context">Design System / Pairings</span>
        <span className="design-system-slide__utility">Meaningful combinations only</span>
      </header>

      <div className="design-system-slide__grid">
        <div className="design-system-slide__intro">
          <span className="design-system-slide__eyebrow">Approved combinations</span>
          <h1 className="design-system-slide__title">
            Pairings should
            <br />
            feel intentional.
          </h1>
          <p className="design-system-slide__body">
            Reuse the same type relationships instead of inventing new ones per
            slide. That is where rhythm comes from.
          </p>
        </div>

        <div className="design-system-pairings">
          <section className="design-system-pairing">
            <span className="design-system-pairing__label">Poster</span>
            <h2 className="design-system-pairing__headline design-system-pairing__headline--poster">
              Read like a poster.
            </h2>
            <p className="design-system-pairing__note">114 poster + 14 utility</p>
          </section>

          <section className="design-system-pairing">
            <span className="design-system-pairing__label">Personal / Process</span>
            <h2 className="design-system-pairing__headline design-system-pairing__headline--display">
              Big promise
            </h2>
            <p className="design-system-pairing__note">88 display + 14 utility</p>
          </section>

          <section className="design-system-pairing">
            <span className="design-system-pairing__label">Essay</span>
            <h2 className="design-system-pairing__headline design-system-pairing__headline--essay">
              Context before artifacts.
            </h2>
            <p className="design-system-pairing__note">34 essay + 14 kicker</p>
          </section>

          <section className="design-system-pairing">
            <span className="design-system-pairing__label">Ledger</span>
            <h2 className="design-system-pairing__headline design-system-pairing__headline--ledger">
              Meta (2019–2022)
            </h2>
            <p className="design-system-pairing__note">82 ledger + 22 support</p>
          </section>

          <section className="design-system-pairing">
            <span className="design-system-pairing__label">Statement</span>
            <h2 className="design-system-pairing__headline design-system-pairing__headline--statement">
              I ship things with AI
            </h2>
            <p className="design-system-pairing__note">114 statement + 14 utility</p>
          </section>

          <section className="design-system-pairing">
            <span className="design-system-pairing__label">Metric</span>
            <h2 className="design-system-pairing__headline design-system-pairing__headline--metric">
              41%
            </h2>
            <p className="design-system-pairing__note">122 metric + 78 label</p>
          </section>
        </div>
      </div>
    </article>
  )
}

function LayoutSlide() {
  return (
    <article className="design-system-slide">
      <header className="design-system-slide__header">
        <span className="design-system-slide__brand">Ilwon Yoon</span>
        <span className="design-system-slide__context">Design System / Layout</span>
        <span className="design-system-slide__utility">12 columns / 12 rows / 20 gutter</span>
      </header>

      <div className="design-system-slide__grid">
        <div className="design-system-slide__intro">
          <span className="design-system-slide__eyebrow">Layout rules</span>
          <h1 className="design-system-slide__title">
            Structure first,
            <br />
            decoration second.
          </h1>
          <p className="design-system-slide__body">
            Start from the left baseline, reserve the right edge for support,
            and use one major gesture per slide.
          </p>
        </div>

        <div className="design-system-layout">
          <div className="design-system-layout__canvas">
            <span className="design-system-layout__box design-system-layout__box--hero">Poster / Statement</span>
            <span className="design-system-layout__box design-system-layout__box--essay">Essay / Context</span>
            <span className="design-system-layout__box design-system-layout__box--rail">Evidence rail</span>
            <span className="design-system-layout__box design-system-layout__box--aside">Quiet aside</span>
          </div>

          <div className="design-system-layout__rules">
            <span>One slide, one job</span>
            <span>Left baseline for primary content</span>
            <span>Right column for support only</span>
            <span>Reuse patterns before inventing layouts</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export function DesignSystemSlide({
  mode,
}: {
  mode: DesignSystemSlideMode
}) {
  if (mode === 'type-scale') {
    return <TypeScaleSlide />
  }

  if (mode === 'pairings') {
    return <PairingsSlide />
  }

  return <LayoutSlide />
}
