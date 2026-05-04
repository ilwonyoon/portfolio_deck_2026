export function PdpPlaceItSlide() {
  return (
    <article className="pdp-place-it-slide">
      <video
        autoPlay
        aria-hidden="true"
        className="pdp-place-it-slide__phone"
        loop
        muted
        playsInline
        poster="/media/pdp-place-it/poster.png"
        preload="metadata"
      >
        <source src="/media/pdp-place-it/pdp-place-it.webm" type="video/webm" />
        <source src="/media/pdp-place-it/pdp-place-it.mp4" type="video/mp4" />
      </video>

      <h2 className="pdp-place-it-slide__headline">
        Try in your room - products
      </h2>
    </article>
  )
}
