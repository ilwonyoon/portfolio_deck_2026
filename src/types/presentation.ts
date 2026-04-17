import type { ReactNode } from 'react'

export type SlideRenderContext = {
  advanceStep: () => void
  advanceSlide: () => void
  autoPlay: boolean
  isThumbnail?: boolean
  step: number
  slideIndex: number
  totalSlides: number
}

export type SlideDefinition = {
  id: string
  navLabel: string
  steps: number
  stepDisplay?: 'dots' | 'none'
  render: (context: SlideRenderContext) => ReactNode
}
