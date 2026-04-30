import type { SlideRenderContext } from '../types/presentation'

type Props = Pick<SlideRenderContext, 'step'>

export function SideProjectsIntroSlide({ step = 0 }: Props) {
  return (
    <article className="side-projects-intro-slide">
      <h1 className="side-projects-intro-slide__title">Side Projects</h1>
      <aside
        aria-hidden={step === 0}
        className="side-projects-intro-slide__context"
        data-visible={step >= 1}
      >
        <p>
          Over the last few months, I spent 1,000+ hours building AI-native
          services for myself.
        </p>
        <p>
          I used them to study and refine how product work changes across iOS,
          macOS, automation, MCP, and Claude as a coworker.
        </p>
      </aside>
    </article>
  )
}
