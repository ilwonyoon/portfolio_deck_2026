type MockupShowcaseSlideProps = {
  variant: 'backtick' | 'steer'
}

const STEER_MOCKUPS = [
  '/media/human-ai-agent-workflow/steer-mockups/screen-0.png',
  '/media/human-ai-agent-workflow/steer-mockups/screen-1.png',
  '/media/human-ai-agent-workflow/steer-mockups/screen-2.png',
  '/media/human-ai-agent-workflow/steer-mockups/screen-3.png',
]

export function MockupShowcaseSlide({ variant }: MockupShowcaseSlideProps) {
  if (variant === 'steer') {
    return (
      <article
        aria-label="Steer mockups"
        className="mockup-showcase-slide mockup-showcase-slide--steer"
      >
        <div className="mockup-showcase-slide__row">
          {STEER_MOCKUPS.map((src) => (
            <div className="mockup-showcase-slide__cell" key={src}>
              <img alt="" className="mockup-showcase-slide__image" src={src} />
            </div>
          ))}
        </div>
      </article>
    )
  }

  return (
    <article
      aria-label="Backtick mockups"
      className="mockup-showcase-slide mockup-showcase-slide--backtick"
    >
      <div className="mockup-showcase-slide__row">
        <figure className="mockup-showcase-slide__cell">
          <img
            alt="Capture"
            className="mockup-showcase-slide__image"
            src="/media/human-ai-agent-workflow/backtick-mockups/ios-capture.png"
          />
          <figcaption className="mockup-showcase-slide__caption">Capture</figcaption>
        </figure>
        <figure className="mockup-showcase-slide__cell">
          <img
            alt="Stack"
            className="mockup-showcase-slide__image"
            src="/media/human-ai-agent-workflow/backtick-mockups/prompt-list.png"
          />
          <figcaption className="mockup-showcase-slide__caption">Stack</figcaption>
        </figure>
        <figure className="mockup-showcase-slide__cell">
          <img
            alt="Memory"
            className="mockup-showcase-slide__image"
            src="/media/human-ai-agent-workflow/backtick-mockups/backtick-app.png"
          />
          <figcaption className="mockup-showcase-slide__caption">Memory</figcaption>
        </figure>
      </div>
    </article>
  )
}
