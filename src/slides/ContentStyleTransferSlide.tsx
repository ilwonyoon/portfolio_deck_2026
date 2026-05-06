export function ContentStyleTransferSlide() {
  return (
    <article className="pdp-place-it-slide">
      <video
        autoPlay
        aria-hidden="true"
        className="pdp-place-it-slide__phone"
        loop
        muted
        playsInline
        poster="/media/content-style-transfer/poster.png"
        preload="metadata"
      >
        <source
          src="/media/content-style-transfer/content-style-transfer.webm"
          type="video/webm"
        />
        <source
          src="/media/content-style-transfer/content-style-transfer.mp4"
          type="video/mp4"
        />
      </video>

      <h2 className="pdp-place-it-slide__headline">
        Try in your room - Content
      </h2>
    </article>
  )
}
