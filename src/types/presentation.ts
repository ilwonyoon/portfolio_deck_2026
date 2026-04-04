import type { ReactNode } from 'react'

export type SlideRenderContext = {
  step: number
  slideIndex: number
  totalSlides: number
}

export type SlideDefinition = {
  id: string
  navLabel: string
  steps: number
  render: (context: SlideRenderContext) => ReactNode
}
