import { resolveMediaUrl } from '../lib/media'

type MobilePrototypeProps = {
  caption: string
  label: string
  poster?: string
  src?: string
  title: string
}

export function MobilePrototype({
  caption,
  label,
  poster,
  src,
  title,
}: MobilePrototypeProps) {
  const resolvedSrc = resolveMediaUrl(src)
  const resolvedPoster = resolveMediaUrl(poster)

  return (
    <section className="mobile-prototype">
      <div className="mobile-prototype__device">
        <div className="mobile-prototype__screen">
          <div className="mobile-prototype__notch" />
          {resolvedSrc ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={resolvedPoster}
              preload="metadata"
              src={resolvedSrc}
            />
          ) : (
            <div className="mobile-prototype__placeholder">
              Add a mobile prototype video in <code>public/media</code> or point
              <br />
              <code>VITE_MEDIA_BASE_URL</code> to hosted assets.
            </div>
          )}
        </div>
      </div>

      <div className="mobile-prototype__meta">
        <span className="mobile-prototype__label">{label}</span>
        <h2 className="mobile-prototype__title">{title}</h2>
        <p className="mobile-prototype__caption">{caption}</p>
      </div>
    </section>
  )
}
