type DeckMetaFrameProps = {
  bottomLeft?: string
  bottomRight?: string
  className?: string
  topLeft?: string
  topRight?: string
  variant?: 'portfolio' | 'case' | 'minimal'
}

export function DeckMetaFrame({
  bottomLeft,
  bottomRight,
  className,
  topLeft,
  topRight,
  variant = 'portfolio',
}: DeckMetaFrameProps) {
  const classNames = ['deck-meta-frame', className].filter(Boolean).join(' ')

  return (
    <div className={classNames} data-variant={variant}>
      {topLeft || topRight ? (
        <header className="deck-meta-frame__row deck-meta-frame__row--top">
          <span>{topLeft ?? ''}</span>
          <span>{topRight ?? ''}</span>
        </header>
      ) : null}

      {bottomLeft || bottomRight ? (
        <footer className="deck-meta-frame__row deck-meta-frame__row--bottom">
          <span>{bottomLeft ?? ''}</span>
          <span>{bottomRight ?? ''}</span>
        </footer>
      ) : null}
    </div>
  )
}
