export type CanvasSelection = {
  fontFamily: string | null
  fontSize: number | null
  fontWeight: number | null
  height: number
  kind: 'object' | 'text'
  letterSpacing: number | null
  lineHeight: number | null
  tagName: string
  text: string | null
  textLength: number | null
  width: number
  x: number
  y: number
}
