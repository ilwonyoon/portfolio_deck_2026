type ProposalBadgeProps = {
  label?: string
}

export function ProposalBadge({ label = 'Proposal' }: ProposalBadgeProps) {
  return (
    <div className="proposal-badge" aria-hidden="true">
      <span className="proposal-badge__dot" />
      <span className="proposal-badge__label">{label}</span>
    </div>
  )
}
