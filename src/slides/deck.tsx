import { SlideShell } from '../components/SlideShell'
import type { SlideDefinition } from '../types/presentation'

function renderIntroHeroSlide() {
  return (
    <article className="intro-hero-slide">
      <header className="intro-hero-slide__header">
        <span className="intro-hero-slide__label">Portfolio</span>
        <span className="intro-hero-slide__label">Ilwon Yoon</span>
      </header>

      <span className="intro-hero-slide__marker intro-hero-slide__marker--left" />
      <span className="intro-hero-slide__marker intro-hero-slide__marker--left-center" />
      <span className="intro-hero-slide__marker intro-hero-slide__marker--right-center" />
      <span className="intro-hero-slide__marker intro-hero-slide__marker--right" />

      <div className="intro-hero-slide__headline-wrap">
        <h1 className="intro-hero-slide__headline">Hi,</h1>
      </div>

      <footer className="intro-hero-slide__footer">
        <span>2026</span>
        <span>CONFIDENTIAL | DO NOT SHARE</span>
      </footer>
    </article>
  )
}

function renderEmptySlide(
  sectionLabel: string,
  slideIndex: number,
  totalSlides: number,
) {
  return (
    <SlideShell
      sectionLabel={sectionLabel}
      slideIndex={slideIndex}
      totalSlides={totalSlides}
    />
  )
}

export const deckSlides: SlideDefinition[] = [
  {
    id: 'intro',
    navLabel: 'Intro',
    steps: 1,
    render: () => renderIntroHeroSlide(),
  },
  {
    id: 'case-study-01',
    navLabel: 'Case 01',
    steps: 1,
    render: ({ slideIndex, totalSlides }) =>
      renderEmptySlide('Case Study 01', slideIndex, totalSlides),
  },
  {
    id: 'case-study-02',
    navLabel: 'Case 02',
    steps: 1,
    render: ({ slideIndex, totalSlides }) =>
      renderEmptySlide('Case Study 02', slideIndex, totalSlides),
  },
  {
    id: 'work-like-ai-native',
    navLabel: 'AI Native',
    steps: 1,
    render: ({ slideIndex, totalSlides }) =>
      renderEmptySlide('Work Like AI Native', slideIndex, totalSlides),
  },
]
