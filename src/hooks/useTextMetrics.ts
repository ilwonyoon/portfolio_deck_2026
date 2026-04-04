import { useEffect, useMemo, useState } from 'react'
import { measureTextBlock } from '../lib/pretext'

type UseTextMetricsInput = {
  font: string
  lineHeight: number
  maxWidth: number
  text: string
}

export function useTextMetrics({
  font,
  lineHeight,
  maxWidth,
  text,
}: UseTextMetricsInput) {
  const [fontsReady, setFontsReady] = useState(
    typeof document === 'undefined' || !('fonts' in document),
  )

  useEffect(() => {
    if (typeof document === 'undefined' || !('fonts' in document)) {
      return
    }

    let cancelled = false

    document.fonts.ready.then(() => {
      if (!cancelled) {
        setFontsReady(true)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return useMemo(() => {
    if (!fontsReady) {
      return { height: lineHeight, lineCount: 1 }
    }

    return measureTextBlock({
      font,
      lineHeight,
      maxWidth,
      text,
    })
  }, [font, fontsReady, lineHeight, maxWidth, text])
}
