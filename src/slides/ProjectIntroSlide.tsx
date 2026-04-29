type ProjectIntroSlideProps = {
  index?: number
  nodeId: string
  subtitle: readonly string[]
  title: string
  total?: number
}

export function ProjectIntroSlide({
  index,
  nodeId,
  subtitle,
  title,
  total,
}: ProjectIntroSlideProps) {
  return (
    <article className="project-intro-slide" data-node-id={nodeId}>
      <div className="project-intro-slide__content">
        {typeof index === 'number' && typeof total === 'number' ? (
          <p className="project-intro-slide__index">
            Project {String(index).padStart(2, '0')} /{' '}
            {String(total).padStart(2, '0')}
          </p>
        ) : null}

        <h1 className="project-intro-slide__title">{title}</h1>

        <p className="project-intro-slide__subtitle">
          {subtitle.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
    </article>
  )
}
