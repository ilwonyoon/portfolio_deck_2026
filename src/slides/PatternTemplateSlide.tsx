type PatternTemplateMode =
  | 'poster'
  | 'offset'
  | 'ledger'
  | 'stage'
  | 'essay'
  | 'evidence-rail'
  | 'before-after'
  | 'metric'
  | 'screen-1up'
  | 'screen-2up'
  | 'screen-3up'
  | 'screen-4up'

function PatternHeader({
  context,
  utility,
}: {
  context: string
  utility: string
}) {
  return (
    <header className="pattern-template__header">
      <span className="pattern-template__brand">Ilwon Yoon</span>
      <span className="pattern-template__context">{context}</span>
      <span className="pattern-template__utility">{utility}</span>
    </header>
  )
}

function ScreenMock({
  label,
  variant,
}: {
  label?: string
  variant: 'profile' | 'feed' | 'detail' | 'grid'
}) {
  return (
    <figure className="pattern-screen">
      <div className={`pattern-screen__frame pattern-screen__frame--${variant}`}>
        <div className="pattern-screen__status">
          <span />
          <span />
          <span />
        </div>

        {variant === 'profile' ? (
          <>
            <div className="pattern-screen__hero" />
            <div className="pattern-screen__identity">
              <span className="pattern-screen__avatar" />
              <div className="pattern-screen__identity-copy">
                <span className="pattern-screen__line pattern-screen__line--title" />
                <span className="pattern-screen__line pattern-screen__line--short" />
              </div>
            </div>
            <div className="pattern-screen__metric-row">
              <span />
              <span />
              <span />
            </div>
            <div className="pattern-screen__shelf pattern-screen__shelf--two" />
            <div className="pattern-screen__shelf pattern-screen__shelf--one" />
          </>
        ) : null}

        {variant === 'feed' ? (
          <>
            <div className="pattern-screen__toolbar">
              <span className="pattern-screen__line pattern-screen__line--mid" />
              <span className="pattern-screen__pill" />
            </div>
            <div className="pattern-screen__card pattern-screen__card--hero" />
            <div className="pattern-screen__card pattern-screen__card--stack" />
            <div className="pattern-screen__card pattern-screen__card--stack" />
          </>
        ) : null}

        {variant === 'detail' ? (
          <>
            <div className="pattern-screen__hero pattern-screen__hero--portrait" />
            <div className="pattern-screen__cta" />
            <div className="pattern-screen__detail-grid">
              <span className="pattern-screen__card pattern-screen__card--mini" />
              <span className="pattern-screen__card pattern-screen__card--mini" />
              <span className="pattern-screen__card pattern-screen__card--mini" />
              <span className="pattern-screen__card pattern-screen__card--mini" />
            </div>
          </>
        ) : null}

        {variant === 'grid' ? (
          <>
            <div className="pattern-screen__toolbar">
              <span className="pattern-screen__line pattern-screen__line--mid" />
              <span className="pattern-screen__line pattern-screen__line--short" />
            </div>
            <div className="pattern-screen__grid">
              <span className="pattern-screen__card pattern-screen__card--grid pattern-screen__card--grid-wide" />
              <span className="pattern-screen__card pattern-screen__card--grid" />
              <span className="pattern-screen__card pattern-screen__card--grid" />
              <span className="pattern-screen__card pattern-screen__card--grid" />
              <span className="pattern-screen__card pattern-screen__card--grid" />
            </div>
          </>
        ) : null}
      </div>

      {label ? <figcaption>{label}</figcaption> : null}
    </figure>
  )
}

function PosterPattern() {
  return (
    <article className="pattern-template pattern-template--poster">
      <PatternHeader
        context="Template 01 / Poster Statement"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <div className="pattern-template__lead">
          <span className="pattern-template__eyebrow">For openers</span>
          <h1 className="pattern-template__display">
            Design a deck
            <br />
            that reads like
            <br />a poster.
          </h1>
        </div>

        <div className="pattern-template__aside">
          <p className="pattern-template__body">
            Use this when a slide only needs one idea. Keep the headline large,
            left-aligned, and low in the frame so the canvas has gravity.
          </p>
          <div className="pattern-template__list">
            <span>Section opener</span>
            <span>Project thesis</span>
            <span>Narrative reset</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function OffsetPattern() {
  return (
    <article className="pattern-template pattern-template--offset">
      <PatternHeader
        context="Template 02 / Offset Image Stack"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <div className="pattern-template__offset-copy">
          <span className="pattern-template__eyebrow">For personal or process slides</span>
          <h1 className="pattern-template__display pattern-template__display--stacked">
            System-building,
            <br />
            team-shaping,
            <br />
            detail-obsessing
            <br />
            designer.
          </h1>
        </div>

        <div className="pattern-template__offset-images">
          <img
            alt="Family photo"
            className="pattern-template__photo pattern-template__photo--a"
            src="/media/personal/hero-family.png"
          />
          <img
            alt="Notes photo"
            className="pattern-template__photo pattern-template__photo--b"
            src="/media/personal/notes.png"
          />
          <img
            alt="Hike photo"
            className="pattern-template__photo pattern-template__photo--c"
            src="/media/personal/hike.png"
          />
        </div>
      </div>
    </article>
  )
}

function LedgerPattern() {
  return (
    <article className="pattern-template pattern-template--ledger">
      <PatternHeader
        context="Template 03 / Career Ledger"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <div className="pattern-template__ledger-copy">
          <span className="pattern-template__eyebrow">For track records</span>
          <h1 className="pattern-template__ledger-list">
            Ohouse (2022–2025)
            <br />
            Meta (2019–2022)
            <br />
            Google (2015–2016)
            <br />
            Personal work (always)
          </h1>
        </div>

        <aside className="pattern-template__ledger-note">
          <p className="pattern-template__body">
            This pattern works when the list itself is the point. Treat each
            line like a headline rather than a resume bullet.
          </p>
        </aside>
      </div>
    </article>
  )
}

function StagePattern() {
  return (
    <article className="pattern-template pattern-template--stage">
      <PatternHeader
        context="Template 04 / Image-Led Stage"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <div className="pattern-template__stage-media">
          <img
            alt="Family photo"
            className="pattern-template__stage-image"
            src="/media/personal/hero-family.png"
          />

          <div className="pattern-template__stage-overlay">
            <span className="pattern-template__eyebrow">For product showcases</span>
            <h1 className="pattern-template__stage-title">
              Let the product
              <br />
              frame carry the slide.
            </h1>
          </div>
        </div>

        <aside className="pattern-template__stage-note">
          <p className="pattern-template__body">
            Keep the media dominant, then reserve one corner for the headline.
            The rest of the grid should stay quiet.
          </p>
          <div className="pattern-template__list">
            <span>Hero image</span>
            <span>Low-left title</span>
            <span>One support note</span>
          </div>
        </aside>
      </div>
    </article>
  )
}

function EssayPattern() {
  return (
    <article className="pattern-template pattern-template--essay">
      <PatternHeader
        context="Template 05 / Essay Narrative"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <aside className="pattern-template__essay-kicker">
          <span className="pattern-template__eyebrow">
            For context and case framing
          </span>
          <p className="pattern-template__body">
            Use one calm slide to state the problem, the stakes, and your role
            before the artifacts arrive.
          </p>
        </aside>

        <div className="pattern-template__essay-copy">
          <p className="pattern-template__essay-paragraph">
            A good case study still needs one quiet slide where the argument can
            breathe.
          </p>
          <p className="pattern-template__essay-paragraph">
            This pattern works when the story depends on context, constraints,
            or a shift in ownership that cannot be reduced to a caption.
          </p>
          <p className="pattern-template__essay-paragraph">
            Keep the copy large, left-aligned, and decisive. Treat each
            paragraph like a scene change, not like a document page.
          </p>
        </div>
      </div>
    </article>
  )
}

function EvidenceRailPattern() {
  return (
    <article className="pattern-template pattern-template--rail">
      <PatternHeader
        context="Template 06 / Evidence Rail"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <aside className="pattern-template__rail-note">
          <span className="pattern-template__eyebrow">For proof and breadth</span>
          <p className="pattern-template__body">
            Put multiple captures on the same baseline so they read as one
            system, not four unrelated screenshots.
          </p>
        </aside>

        <div className="pattern-template__rail-stage">
          <figure className="pattern-template__rail-item pattern-template__rail-item--a">
            <div className="pattern-template__rail-frame">
              <img
                alt="Coffee photo"
                className="pattern-template__rail-image"
                src="/media/personal/coffee.png"
              />
            </div>
            <figcaption>Entry point</figcaption>
          </figure>

          <figure className="pattern-template__rail-item pattern-template__rail-item--b">
            <div className="pattern-template__rail-frame">
              <img
                alt="Cooking photo"
                className="pattern-template__rail-image"
                src="/media/personal/cook.png"
              />
            </div>
            <figcaption>Main surface</figcaption>
          </figure>

          <figure className="pattern-template__rail-item pattern-template__rail-item--c">
            <div className="pattern-template__rail-frame">
              <img
                alt="Field photo"
                className="pattern-template__rail-image"
                src="/media/personal/field.png"
              />
            </div>
            <figcaption>Secondary state</figcaption>
          </figure>

          <figure className="pattern-template__rail-item pattern-template__rail-item--d">
            <div className="pattern-template__rail-frame">
              <img
                alt="Ride photo"
                className="pattern-template__rail-image"
                src="/media/personal/ride.png"
              />
            </div>
            <figcaption>Depth detail</figcaption>
          </figure>
        </div>
      </div>
    </article>
  )
}

function BeforeAfterPattern() {
  return (
    <article className="pattern-template pattern-template--compare">
      <PatternHeader
        context="Template 07 / Before / After"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <div className="pattern-template__compare-copy">
          <span className="pattern-template__eyebrow">For change you can prove</span>
          <p className="pattern-template__body">
            If the improvement is visual or structural, show both states at the
            same scale and let the delta do the talking.
          </p>
          <div className="pattern-template__list">
            <span>Keep the frames aligned</span>
            <span>Use one sentence of context</span>
            <span>Do not add extra chrome</span>
          </div>
        </div>

        <div className="pattern-template__compare-stage">
          <figure className="pattern-template__compare-item">
            <div className="pattern-template__compare-frame">
              <div className="pattern-template__compare-surface pattern-template__compare-surface--before">
                <div className="pattern-template__compare-toolbar">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="pattern-template__compare-before-grid">
                  <span className="pattern-template__compare-panel pattern-template__compare-panel--dense" />
                  <span className="pattern-template__compare-panel pattern-template__compare-panel--dense" />
                  <span className="pattern-template__compare-chip pattern-template__compare-chip--wide" />
                  <span className="pattern-template__compare-chip" />
                  <span className="pattern-template__compare-chip" />
                  <span className="pattern-template__compare-panel pattern-template__compare-panel--list" />
                  <span className="pattern-template__compare-panel pattern-template__compare-panel--list" />
                </div>
              </div>
            </div>
            <figcaption>
              <span>Before</span>
              <span>Compressed hierarchy</span>
            </figcaption>
          </figure>

          <figure className="pattern-template__compare-item">
            <div className="pattern-template__compare-frame">
              <div className="pattern-template__compare-surface pattern-template__compare-surface--after">
                <div className="pattern-template__compare-toolbar">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="pattern-template__compare-hero" />
                <span className="pattern-template__compare-cta" />
                <div className="pattern-template__compare-after-grid">
                  <span className="pattern-template__compare-panel pattern-template__compare-panel--hero-card" />
                  <span className="pattern-template__compare-panel pattern-template__compare-panel--hero-card" />
                  <span className="pattern-template__compare-panel pattern-template__compare-panel--shelf" />
                  <span className="pattern-template__compare-panel pattern-template__compare-panel--shelf" />
                </div>
              </div>
            </div>
            <figcaption>
              <span>After</span>
              <span>Clearer primary path</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </article>
  )
}

function MetricInterruptPattern() {
  return (
    <article className="pattern-template pattern-template--metric">
      <PatternHeader
        context="Template 08 / Metric Interrupt"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <div className="pattern-template__metric-stage">
          <div className="pattern-template__metric-row">
            <span className="pattern-template__metric-value">330K</span>
            <span className="pattern-template__metric-label">saved homes</span>
          </div>
          <div className="pattern-template__metric-row">
            <span className="pattern-template__metric-value">2.1x</span>
            <span className="pattern-template__metric-label">visit-to-detail</span>
          </div>
          <div className="pattern-template__metric-row">
            <span className="pattern-template__metric-value">41%</span>
            <span className="pattern-template__metric-label">repeat buyers</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function SingleScreenPattern() {
  return (
    <article className="pattern-template pattern-template--screen-one">
      <PatternHeader
        context="Template 09 / Single Screen Hero"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <div className="pattern-template__screen-copy">
          <span className="pattern-template__eyebrow">For one dominant proof point</span>
          <h1 className="pattern-template__screen-title">
            One screen can
            <br />
            carry the whole slide.
          </h1>
          <p className="pattern-template__body">
            Use this when a single interface state already communicates the
            product, the behavior, and the polish.
          </p>
        </div>

        <div className="pattern-template__screen-stage pattern-template__screen-stage--one">
          <ScreenMock label="Hero state" variant="detail" />
        </div>
      </div>
    </article>
  )
}

function TwoScreenPattern() {
  return (
    <article className="pattern-template pattern-template--screen-two">
      <PatternHeader
        context="Template 10 / Two Screen Compare"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <div className="pattern-template__screen-copy pattern-template__screen-copy--compact">
          <span className="pattern-template__eyebrow">For before / after or paired states</span>
          <p className="pattern-template__body">
            Match the scale and baseline. Let the reader compare two states in
            one glance.
          </p>
        </div>

        <div className="pattern-template__screen-stage pattern-template__screen-stage--two">
          <ScreenMock label="Before" variant="profile" />
          <ScreenMock label="After" variant="detail" />
        </div>
      </div>
    </article>
  )
}

function ThreeScreenPattern() {
  return (
    <article className="pattern-template pattern-template--screen-three">
      <PatternHeader
        context="Template 11 / Three Screen Spread"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <div className="pattern-template__screen-copy pattern-template__screen-copy--compact">
          <span className="pattern-template__eyebrow">For system breadth</span>
          <p className="pattern-template__body">
            Make the center screen the anchor, then use the flanking states to
            show variation or progression.
          </p>
        </div>

        <div className="pattern-template__screen-stage pattern-template__screen-stage--three">
          <ScreenMock label="Entry" variant="profile" />
          <ScreenMock label="Primary" variant="detail" />
          <ScreenMock label="Depth" variant="feed" />
        </div>
      </div>
    </article>
  )
}

function FourScreenPattern() {
  return (
    <article className="pattern-template pattern-template--screen-four">
      <PatternHeader
        context="Template 12 / Four Screen Rail"
        utility="General Sans • 140% • 0.15px"
      />

      <div className="pattern-template__grid">
        <div className="pattern-template__screen-copy pattern-template__screen-copy--compact">
          <span className="pattern-template__eyebrow">For multi-state evidence</span>
          <p className="pattern-template__body">
            Use four captures when the point is coverage. Keep every frame on
            one baseline so the spread reads like a composed set.
          </p>
        </div>

        <div className="pattern-template__screen-stage pattern-template__screen-stage--four">
          <ScreenMock label="Profile" variant="profile" />
          <ScreenMock label="Feed" variant="feed" />
          <ScreenMock label="Detail" variant="detail" />
          <ScreenMock label="Library" variant="grid" />
        </div>
      </div>
    </article>
  )
}

export function PatternTemplateSlide({
  mode,
}: {
  mode: PatternTemplateMode
}) {
  if (mode === 'poster') {
    return <PosterPattern />
  }

  if (mode === 'offset') {
    return <OffsetPattern />
  }

  if (mode === 'ledger') {
    return <LedgerPattern />
  }

  if (mode === 'essay') {
    return <EssayPattern />
  }

  if (mode === 'evidence-rail') {
    return <EvidenceRailPattern />
  }

  if (mode === 'before-after') {
    return <BeforeAfterPattern />
  }

  if (mode === 'metric') {
    return <MetricInterruptPattern />
  }

  if (mode === 'screen-1up') {
    return <SingleScreenPattern />
  }

  if (mode === 'screen-2up') {
    return <TwoScreenPattern />
  }

  if (mode === 'screen-3up') {
    return <ThreeScreenPattern />
  }

  if (mode === 'screen-4up') {
    return <FourScreenPattern />
  }

  return <StagePattern />
}
