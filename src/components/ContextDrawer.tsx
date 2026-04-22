import { useEffect, useState } from 'react'

type Variant = 'dot' | 'line' | 'cursor'

type Props = {
  title: React.ReactNode
  children: React.ReactNode
  variant?: Variant
}

const STORAGE_KEY = 'deck-context-hint-seen'

export function ContextDrawer({ title, children, variant = 'dot' }: Props) {
  const [open, setOpen] = useState(false)
  const [hintVisible, setHintVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const seen = localStorage.getItem(STORAGE_KEY)
    if (!seen) {
      const timer = setTimeout(() => setHintVisible(true), 600)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleClick() {
    if (open) return
    setOpen(true)
    setHintVisible(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, '1')
    }
  }

  function dismissHint() {
    setHintVisible(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, '1')
    }
  }

  return (
    <div className={`context-drawer context-drawer--${variant}`}>
      <button
        className={`context-drawer__title-btn${open ? ' context-drawer__title-btn--open' : ''}`}
        onClick={handleClick}
        type="button"
        aria-expanded={open}
      >
        {title}
        {variant === 'dot' && !open && (
          <span className="context-drawer__dot" aria-hidden="true" />
        )}
      </button>

      {hintVisible && !open && (
        <div className="context-drawer__hint" onClick={dismissHint}>
          Click to see the thinking behind it
        </div>
      )}

      <div
        className={`context-drawer__body${open ? ' context-drawer__body--open' : ''}`}
        aria-hidden={!open}
      >
        {children}
      </div>
    </div>
  )
}
