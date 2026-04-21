import { ProposalBadge } from '../components/ProposalBadge'

export function OhouseRoleSlideV2() {
  return (
    <article className="ohouse-role-slide">
      <ProposalBadge />

      <header className="ohouse-role-slide__header">
        <span className="ohouse-role-slide__header-brand">Ilwon Yoon</span>
        <span className="ohouse-role-slide__header-context">Case Study 02</span>
      </header>

      <div className="ohouse-role-slide__stack">
        <p className="ohouse-role-slide__label">My Role</p>

        <div className="ohouse-role-slide__copy">
          <p className="ohouse-role-slide__body">
            As Head of Product Design, led cross-functional strategies and
            roadmap to strengthen how Ohouse delivers inspiration and
            confidence.
          </p>

          <p className="ohouse-role-slide__goal">
            <span>Goal: Recover MAU. Grow revenue per user.</span>
            <span>Reach break-even.</span>
          </p>
        </div>
      </div>
    </article>
  )
}
