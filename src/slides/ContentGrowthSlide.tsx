type Column = {
  caption: string[]
  image: string
  width: number
  aspect: string
}

const COLUMNS: readonly Column[] = [
  {
    aspect: '750 / 1622',
    caption: ['Get to know what changes', 'you’re about to make'],
    image: '/media/content-growth/col1.png',
    width: 375,
  },
  {
    aspect: '750 / 1622',
    caption: ['Browse content built', 'around your space'],
    image: '/media/content-growth/col2.png',
    width: 378,
  },
  {
    aspect: '1125 / 2436',
    caption: ['Discover what others', 'like you are changing'],
    image: '/media/content-growth/col3.png',
    width: 375,
  },
] as const

export function ContentGrowthSlide() {
  return (
    <article className="content-growth-slide" data-node-id="6303:69654">
      <h2 className="content-growth-slide__headline">
        Grow content supply.
      </h2>

      <div className="content-growth-slide__columns">
        {COLUMNS.map((column, index) => (
          <div
            className="content-growth-slide__column"
            key={column.image}
            style={{ width: column.width }}
          >
            <p className="content-growth-slide__caption">
              {column.caption.map((line, lineIndex) => (
                <span key={line}>
                  {line}
                  {lineIndex < column.caption.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
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
          </div>
        ))}
      </div>
    </article>
  )
}
