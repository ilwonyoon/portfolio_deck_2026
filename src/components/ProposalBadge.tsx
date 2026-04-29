type ProposalBadgeProps = {
  className?: string
  label?: string
}

export function ProposalBadge({
  className = '',
  label = 'Proposal',
}: ProposalBadgeProps) {
  const badgeClassName = ['proposal-badge', className].filter(Boolean).join(' ')

  return (
    <div className={badgeClassName} aria-hidden="true">
      <span className="proposal-badge__dot" />
      <span className="proposal-badge__label">{label}</span>
    </div>
  )
}
