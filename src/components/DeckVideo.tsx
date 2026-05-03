import { forwardRef } from 'react'
import type { VideoHTMLAttributes } from 'react'

type DeckVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'poster' | 'preload'> & {
  isThumbnail?: boolean
  mp4?: string
  poster: string
  preload?: 'none' | 'metadata' | 'auto'
  webm?: string
}

export const DeckVideo = forwardRef<HTMLVideoElement, DeckVideoProps>(
  function DeckVideo(
    {
      autoPlay = true,
      className,
      isThumbnail = false,
      loop = true,
      mp4,
      muted = true,
      playsInline = true,
      poster,
      preload = 'metadata',
      webm,
      ...videoProps
    },
    ref,
  ) {
    if (isThumbnail) {
      return (
        <img
          alt=""
          className={className}
          decoding="async"
          loading="lazy"
          src={poster}
        />
      )
    }

    return (
      <video
        autoPlay={autoPlay}
        className={className}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        poster={poster}
        preload={preload}
        ref={ref}
        {...videoProps}
      >
        {mp4 ? <source src={mp4} type="video/mp4" /> : null}
        {webm ? <source src={webm} type="video/webm" /> : null}
      </video>
    )
  },
)
