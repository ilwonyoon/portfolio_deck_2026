export type FocusTone = 'active' | 'base' | 'dim'

export function resolveFocusTone({
  active,
  dimmed,
}: {
  active?: boolean
  dimmed?: boolean
}): FocusTone {
  if (active) {
    return 'active'
  }

  if (dimmed) {
    return 'dim'
  }

  return 'base'
}
