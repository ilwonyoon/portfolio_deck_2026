import { useCallback, useSyncExternalStore } from 'react'

function readMediaQuery(query: string) {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
    return false
  }

  return window.matchMedia(query).matches
}

export function useMediaQuery(query: string) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return () => undefined
    }

    const mediaQueryList = window.matchMedia(query)
    mediaQueryList.addEventListener('change', onStoreChange)

    return () => {
      mediaQueryList.removeEventListener('change', onStoreChange)
    }
  }, [query])

  const getSnapshot = useCallback(() => readMediaQuery(query), [query])
  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
