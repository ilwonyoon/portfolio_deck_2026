export function TryRoomProDesignsSlide() {
  return (
    <article className="try-room-pro-designs-slide">
      <video
        autoPlay
        aria-hidden="true"
        className="try-room-pro-designs-slide__phone"
        loop
        muted
        playsInline
        poster="/media/try-room-pro-designs/poster.png"
        preload="metadata"
      >
        <source
          src="/media/try-room-pro-designs/try-room-pro-designs.webm"
          type="video/webm"
        />
        <source
          src="/media/try-room-pro-designs/try-room-pro-designs.mp4"
          type="video/mp4"
        />
      </video>

      <h2 className="try-room-pro-designs-slide__headline">
        Try in your room - pro designs
      </h2>
    </article>
  )
}
