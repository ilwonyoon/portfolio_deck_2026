type PatternTestSlideProps = {
  variant: 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
  label: string
  caption: string
}

export function PatternTestSlide({
  variant,
  label,
  caption,
}: PatternTestSlideProps) {
  return (
    <article className="pattern-test-slide" data-variant={variant}>
      <div className="pattern-test-slide__layer pattern-test-slide__layer--blob" />
      <div className="pattern-test-slide__layer pattern-test-slide__layer--motif" />
      <div className="pattern-test-slide__layer pattern-test-slide__layer--grain" />
      <div className="pattern-test-slide__copy">
        <p className="pattern-test-slide__eyebrow">
          Pattern test · {variant.toUpperCase()}
        </p>
        <h2 className="pattern-test-slide__headline">{label}</h2>
        <p className="pattern-test-slide__caption">{caption}</p>
      </div>
    </article>
  )
}
