import { DeckMetaFrame } from '../components/DeckMetaFrame'

export function ProfileStatementSlide() {
  return (
    <article className="profile-statement-slide">
      <DeckMetaFrame
        bottomLeft="2026"
        bottomRight="Product Design · AI-native Execution"
        topLeft="Portfolio"
        topRight="Ilwon Yoon"
      />

      <div className="profile-statement-slide__grid">
        <div className="profile-statement-slide__lead">
          <h1 className="profile-statement-slide__headline">
            Product designer.
            <br />
            I ship things
            <br />
            with AI.
          </h1>
        </div>

        <aside className="profile-statement-slide__aside">
          <p className="profile-statement-slide__body">
            I connect product strategy, design craft, and AI-native execution to
            move business metrics.
          </p>
          <div className="profile-statement-slide__list">
            <span>Product strategy</span>
            <span>AI-native execution</span>
            <span>Design leadership</span>
          </div>
        </aside>
      </div>
    </article>
  )
}
