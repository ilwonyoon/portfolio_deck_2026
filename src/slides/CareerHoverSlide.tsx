import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type CareerCard = {
  body: string
  company: string
  logo: string
  logoAlt: string
  logoClassName: string
  role: string
  year: string
}

const CAREER_CARDS: CareerCard[] = [
  {
    body: 'Building 0 to 1 Apps with small teams\nWorked on Google Spaces, Who’s Down, Sparks',
    company: 'Ohouse',
    logo: '/media/career/ohouse-mark.png',
    logoAlt: 'Ohouse logo',
    logoClassName: 'career-hover-slide__logo--ohouse',
    role: 'Head of Product Design',
    year: '2022.10 - 2025.12',
  },
  {
    body: 'Building 0 to 1 Apps with small teams\nWorked on Google Spaces, Who’s Down, Sparks',
    company: 'Meta',
    logo: '/media/career/meta-instagram-icons.png',
    logoAlt: 'Meta and Instagram icons',
    logoClassName: 'career-hover-slide__logo--meta',
    role: 'Product Designer',
    year: '2019.07 - 2022.10',
  },
  {
    body: 'Building 0 to 1 Apps with small teams\nWorked on Google Spaces, Who’s Down, Sparks',
    company: 'AMAZE VR',
    logo: '/media/career/amaze-mark.svg',
    logoAlt: 'AMAZE logo',
    logoClassName: 'career-hover-slide__logo--amaze',
    role: 'UX Lead',
    year: '2015.06 - 2016.11',
  },
  {
    body: 'Building 0 to 1 Apps with small teams\nWorked on Google Spaces, Who’s Down, Sparks',
    company: 'Google',
    logo: '/media/career/google-logo.png',
    logoAlt: 'Google logo',
    logoClassName: 'career-hover-slide__logo--google',
    role: 'UX Designer',
    year: '2015.06 - 2016.11',
  },
]

function CareerCardView({
  active,
  card,
  index,
  onActivate,
}: {
  active: boolean
  card: CareerCard
  index: number
  onActivate: (index: number) => void
}) {
  return (
    <motion.button
      aria-pressed={active ? 'true' : 'false'}
      className="career-hover-slide__card"
      data-active={active ? 'true' : 'false'}
      style={{
        flex: '0 0 auto',
        width: active ? 680 : 380,
      }}
      onClick={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      onMouseEnter={() => onActivate(index)}
      type="button"
    >
      <div className="career-hover-slide__card-shell">
        <div className="career-hover-slide__brand">
          <img
            alt={card.logoAlt}
            className={`career-hover-slide__logo ${card.logoClassName}`}
            draggable="false"
            src={card.logo}
          />
        </div>

        <div className="career-hover-slide__meta">
          <motion.div
            className="career-hover-slide__header-group"
            animate={active ? 'show' : 'hide'}
            initial={false}
            variants={{
              hide: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  delayChildren: 0.08,
                  staggerChildren: 0.06,
                  duration: 0.34,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <motion.h2
              className="career-hover-slide__headline"
              variants={{
                hide: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <span className="career-hover-slide__company-inline">
                {card.company}
              </span>
              <span className="career-hover-slide__headline-separator">
                {' '}
                ·{' '}
              </span>
              <span className="career-hover-slide__role-line">{card.role}</span>
            </motion.h2>
            <motion.div
              className="career-hover-slide__year-block"
              variants={{
                hide: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
            >
              {card.year}
            </motion.div>
          </motion.div>

          <motion.p
            className="career-hover-slide__body"
            animate={active ? 'show' : 'hide'}
            initial={false}
            variants={{
              hide: { opacity: 0, y: 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.24, duration: 0.32, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {card.body}
          </motion.p>
        </div>
      </div>
    </motion.button>
  )
}

export function CareerHoverSlide() {
  const cards = useMemo(() => CAREER_CARDS, [])
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <article
      className="career-hover-slide"
      onMouseLeave={() => setActiveIndex(0)}
    >
      <div className="career-hover-slide__rail">
        {cards.map((card, index) => (
          <CareerCardView
            key={`${card.logoAlt}-${card.year}`}
            active={activeIndex === index}
            card={card}
            index={index}
            onActivate={setActiveIndex}
          />
        ))}
      </div>
    </article>
  )
}
