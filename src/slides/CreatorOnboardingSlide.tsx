import { DeckVideo } from '../components/DeckVideo'

export function CreatorOnboardingSlide() {
  return (
    <article
      className="creator-onboarding-slide"
      data-node-id="6350:132630"
    >
      <div
        className="creator-onboarding-slide__bg creator-onboarding-slide__bg--section-index"
        aria-hidden="true"
      />

      <DeckVideo
        aria-hidden="true"
        className="creator-onboarding-slide__phone"
        mp4="/media/creator-onboarding/onboarding.mp4"
        poster="/media/creator-onboarding/phone.png"
        webm="/media/creator-onboarding/onboarding.webm"
      />

      <h2 className="creator-onboarding-slide__headline">
        Creator onboarding
      </h2>
    </article>
  )
}
