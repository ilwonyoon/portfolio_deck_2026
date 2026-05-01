import { ContextDrawer } from '../components/ContextDrawer'

type PersonalizedFeedIntroSlideProps = {
  headline?: string
  videoMp4?: string
  videoWebm?: string
}

export function PersonalizedFeedIntroSlide({
  headline = 'Interest profiling',
  videoMp4 = '/media/interest-profiling.mp4',
  videoWebm = '/media/interest-profiling.webm',
}: PersonalizedFeedIntroSlideProps) {
  return (
    <article className="personalized-feed-intro-slide" data-node-id="6133:90440">
      <div className="personalized-feed-intro-slide__phone" data-node-id="6133:90657">
        <video
          key={`${videoWebm}:${videoMp4}`}
          className="personalized-feed-intro-slide__video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoWebm} type="video/webm" />
          <source src={videoMp4} type="video/mp4" />
        </video>
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
