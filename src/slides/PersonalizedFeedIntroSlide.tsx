import { ContextDrawer } from '../components/ContextDrawer'
import { DeckVideo } from '../components/DeckVideo'

type PersonalizedFeedIntroSlideProps = {
  headline?: string
  videoMp4?: string
  videoPoster?: string
  videoWebm?: string
}

export function PersonalizedFeedIntroSlide({
  headline = 'Interest profiling',
  videoMp4 = '/media/interest-profiling.mp4',
  videoPoster = '/media/interest-profiling-poster.jpg',
  videoWebm = '/media/interest-profiling.webm',
}: PersonalizedFeedIntroSlideProps) {
  return (
    <article className="personalized-feed-intro-slide" data-node-id="6133:90440">
      <div className="personalized-feed-intro-slide__phone" data-node-id="6133:90657">
        <DeckVideo
          key={`${videoWebm}:${videoMp4}`}
          className="personalized-feed-intro-slide__video"
          mp4={videoMp4}
          poster={videoPoster}
          webm={videoWebm}
        />
      </div>
      <div className="personalized-feed-intro-slide__text-group">
        <ContextDrawer
          variant="dot"
          title={
            <h2 className="personalized-feed-intro-slide__headline">
              {headline}
            </h2>
          }
        >
          <div className="context-drawer__content">
            <ul>
              <li>Onboarding collects explicit interest picks to solve cold-start</li>
              <li>Interest graph continuously updated from saves, views, and search signals</li>
              <li>Recent signals weighted higher to prevent taste lock-in</li>
            </ul>
          </div>
        </ContextDrawer>
      </div>
    </article>
  )
}
