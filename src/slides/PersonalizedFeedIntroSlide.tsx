import { ContextDrawer } from '../components/ContextDrawer'

export function PersonalizedFeedIntroSlide() {
  return (
    <article className="personalized-feed-intro-slide" data-node-id="6133:90440">
      <div className="personalized-feed-intro-slide__phone" data-node-id="6133:90657">
        <video
          className="personalized-feed-intro-slide__video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/media/interest-profiling.webm" type="video/webm" />
          <source src="/media/interest-profiling.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="personalized-feed-intro-slide__text-group">
        <ContextDrawer
          variant="dot"
          title={
            <h2 className="personalized-feed-intro-slide__headline">
              Interest profiling
            </h2>
          }
        >
          <div className="context-drawer__content">
            <ul>
              <li>Feed ranked by recency only — no personalization, high irrelevance</li>
              <li>Interest graph built from saves, views, and search signals</li>
              <li>Fresh signals weighted more to prevent taste lock-in</li>
            </ul>
          </div>
        </ContextDrawer>
      </div>
    </article>
  )
}
