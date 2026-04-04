import { layout, prepare } from '@chenglou/pretext'

type WhiteSpace = 'normal' | 'pre-wrap'

type MeasureTextBlockInput = {
  font: string
  lineHeight: number
  maxWidth: number
  text: string
  whiteSpace?: WhiteSpace
}

const preparedCache = new Map<string, ReturnType<typeof prepare>>()

function getPreparedText(text: string, font: string, whiteSpace: WhiteSpace) {
  const cacheKey = JSON.stringify([text, font, whiteSpace])
  const cached = preparedCache.get(cacheKey)

  if (cached) {
    return cached
  }

  const prepared = prepare(text, font, { whiteSpace })
  preparedCache.set(cacheKey, prepared)
  return prepared
}

export function measureTextBlock({
  font,
  lineHeight,
  maxWidth,
  text,
  whiteSpace = 'pre-wrap',
}: MeasureTextBlockInput) {
  const prepared = getPreparedText(text, font, whiteSpace)
  return layout(prepared, maxWidth, lineHeight)
}
