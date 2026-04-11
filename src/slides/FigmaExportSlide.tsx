export function FigmaExportSlide({
  alt,
  src,
}: {
  alt: string
  src: string
}) {
  return (
    <article className="figma-export-slide">
      <img alt={alt} className="figma-export-slide__image" src={src} />
    </article>
  )
}
