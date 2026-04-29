type Column = {
  label: string
  image: string
  width: number
  aspect: string
}

const COLUMNS: readonly Column[] = [
  {
    aspect: '750 / 1622',
    image: '/media/content-growth/col1.png',
    label: 'Creator Onboarding',
    width: 375,
  },
  {
    aspect: '750 / 1622',
    image: '/media/content-growth/col2.png',
    label: 'Creator Dashboard',
    width: 378,
  },
  {
    aspect: '1125 / 2436',
    image: '/media/content-growth/col3.png',
    label: 'Creator Program',
    width: 375,
  },
] as const

export function ContentGrowthSlide() {
  return (
    <article className="content-growth-slide" data-node-id="6303:69654">
      <div className="content-growth-slide__columns">
        {COLUMNS.map((column, index) => (
          <div
            className="content-growth-slide__column"
            key={column.image}
            style={{ width: column.width }}
          >
            <div
              className="content-growth-slide__image-wrap"
              style={{ aspectRatio: column.aspect }}
              data-column={index}
            >
              <img
                alt=""
                aria-hidden="true"
                className="content-growth-slide__image"
                draggable={false}
                src={column.image}
              />
            </div>
            <p className="content-growth-slide__caption">{column.label}</p>
          </div>
        ))}
      </div>
    </article>
  )
}
