import { DeckMetaFrame } from '../components/DeckMetaFrame'
import { ProposalBadge } from '../components/ProposalBadge'

export function ProfileStatementSlideV2() {
  return (
    <article className="profile-statement-slide profile-statement-slide--v2">
      <ProposalBadge />
      <DeckMetaFrame
        bottomLeft="2026"
        bottomRight="Product Design · AI-native Execution"
        topLeft="Portfolio"
        topRight="Ilwon Yoon"
      />

      <div className="profile-statement-slide__grid profile-statement-slide__grid--v2">
        <div className="profile-statement-slide__lead">
          <h1 className="profile-statement-slide__headline">
            Product designer.
            <br />
            I ship things
            <br />
            with AI.
          </h1>
        </div>
      </div>
    </article>
  )
}
