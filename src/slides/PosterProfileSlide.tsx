export function PosterProfileSlide() {
  return (
    <article className="poster-profile-slide">
      <div className="poster-profile-slide__copy">
        <p className="poster-profile-slide__body">
          Hi, I am Ilwon Yoon. Former Head of Product Design at Ohouse, leading all design functions
          (40+ people).
          {'\n'}
          Now I ship things with AI.
        </p>
      </div>

      <img
        alt="Ilwon Yoon portrait"
        className="poster-profile-slide__portrait"
        draggable="false"
        src="/media/personal/ilwon_profile.png"
      />
    </article>
  )
}
