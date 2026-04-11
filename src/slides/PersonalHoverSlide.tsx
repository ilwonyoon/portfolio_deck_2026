type PersonalCard = {
  alt: string
  height: number
  image: string
  imageClassName: string
  text: string
  width: number
  x: number
  y: number
}

const PERSONAL_CARDS: PersonalCard[] = [
  {
    alt: 'Family photo',
    height: 578,
    image: '/media/personal/hero-family.png',
    imageClassName: 'personal-hover-slide__image--family',
    text: 'Family first.',
    width: 930,
    x: 0,
    y: 0,
  },
  {
    alt: 'Motorcycle photo',
    height: 574,
    image: '/media/personal/ride.png',
    imageClassName: 'personal-hover-slide__image--ride',
    text: 'Stay curious.',
    width: 455,
    x: 950,
    y: 0,
  },
  {
    alt: 'Notes sketch photo',
    height: 333.3333435058594,
    image: '/media/personal/notes.png',
    imageClassName: 'personal-hover-slide__image--notes',
    text: 'Sketch systems.',
    width: 455,
    x: 1425,
    y: 0,
  },
  {
    alt: 'Indoor group photo',
    height: 333.33331298828125,
    image: '/media/personal/cook.png',
    imageClassName: 'personal-hover-slide__image--cook',
    text: 'Move together.',
    width: 455,
    x: 1425,
    y: 353.33331298828125,
  },
  {
    alt: 'Soccer field photo',
    height: 442,
    image: '/media/personal/field.png',
    imageClassName: 'personal-hover-slide__image--field',
    text: 'Hands on.',
    width: 455,
    x: 0,
    y: 598,
  },
  {
    alt: 'Forest hike photo',
    height: 442,
    image: '/media/personal/hike.png',
    imageClassName: 'personal-hover-slide__image--hike',
    text: 'Step away.',
    width: 455,
    x: 475,
    y: 598,
  },
  {
    alt: 'Coffee prep photo',
    height: 446,
    image: '/media/personal/coffee.png',
    imageClassName: 'personal-hover-slide__image--coffee',
    text: 'Rituals matter.',
    width: 455,
    x: 950,
    y: 594,
  },
  {
    alt: 'School building photo',
    height: 333.33331298828125,
    image: '/media/personal/saac.png',
    imageClassName: 'personal-hover-slide__image--saac',
    text: 'Keep learning.',
    width: 455,
    x: 1425,
    y: 706.6666259765625,
  },
]

export function PersonalHoverSlide() {
  return (
    <article className="personal-hover-slide">
      <div className="personal-hover-slide__canvas">
        {PERSONAL_CARDS.map((card) => (
          <button
            aria-label={card.alt}
            className="personal-hover-slide__card"
            key={card.alt}
            style={{
              height: `${card.height}px`,
              left: `${card.x}px`,
              top: `${card.y}px`,
              width: `${card.width}px`,
            }}
            type="button"
          >
            <img
              alt=""
              aria-hidden="true"
              className={`personal-hover-slide__image ${card.imageClassName}`}
              draggable="false"
              src={card.image}
            />

            <div className="personal-hover-slide__overlay">
              <span className="personal-hover-slide__text">{card.text}</span>
            </div>
          </button>
        ))}
      </div>
    </article>
  )
}
