import { AnimatePresence, motion } from 'framer-motion'
import type { CSSProperties } from 'react'

import { StepTextTransition } from '../components/StepTextTransition'

type PersonaMetric = {
  label: string
  value: string
}

type PersonaCardId = 'creator' | 'hcpn' | 'hcpy' | 'lcpy' | 'premium' | 'review'

type PersonaCard = {
  description: string
  detail: string[]
  id: PersonaCardId
  metrics: PersonaMetric[]
  title: string
}

type StepState = {
  copy: string
  focusCardId?: PersonaCardId
}

const PERSONA_CARDS: Record<PersonaCardId, PersonaCard> = {
  creator: {
    description: 'Uploaded Content That Month',
    detail: [
      'Revenue/customer: avg. $152.',
      'Small group, but commercially dense.',
    ],
    id: 'creator',
    metrics: [
      { label: 'MAU', value: '0.45%' },
      { label: 'GMV', value: '2.37%' },
      { label: 'M3 Ret', value: '79%' },
    ],
    title: 'Content Creator',
  },
  hcpn: {
    description: 'High Content Purchase No',
    detail: [
      'High content engagement, but no purchase behavior.',
      'The intent is present, but the action never happens.',
    ],
    id: 'hcpn',
    metrics: [
      { label: 'MAU', value: '8.2%' },
      { label: 'GMV', value: '0%' },
      { label: 'M3 Ret', value: '72%' },
    ],
    title: 'HCPN',
  },
  hcpy: {
    description: 'High Content Purchase Yes',
    detail: [
      'Highest revenue/customer: avg. $227.',
      'Winning persona for the content-to-commerce loop.',
    ],
    id: 'hcpy',
    metrics: [
      { label: 'MAU', value: '5.38%' },
      { label: 'GMV', value: '42.3%' },
      { label: 'M3 Ret', value: '78%' },
    ],
    title: 'HCPY',
  },
  lcpy: {
    description: 'Low Content Purchase Yes',
    detail: [
      'Revenue/customer: avg. $88.',
      'Purchases happen, but retention is weaker.',
    ],
    id: 'lcpy',
    metrics: [
      { label: 'MAU', value: '11.5%' },
      { label: 'GMV', value: '34.8%' },
      { label: 'M3 Ret', value: '54%' },
    ],
    title: 'LCPY',
  },
  premium: {
    description: 'Visited Binary shop',
    detail: [
      'Revenue/customer: avg. $142.',
      'Taste-led browsing shows strong retention.',
    ],
    id: 'premium',
    metrics: [
      { label: 'MAU', value: '2.6%' },
      { label: 'GMV', value: '13%' },
      { label: 'M3 Ret', value: '91%' },
    ],
    title: 'Premium',
  },
  review: {
    description: 'Wrote a product review before',
    detail: [
      'Revenue/customer: avg. $195.',
      'Small but commercially dense contributor group.',
    ],
    id: 'review',
    metrics: [
      { label: 'MAU', value: '2.3%' },
      { label: 'GMV', value: '15.6%' },
      { label: 'M3 Ret', value: '75%' },
    ],
    title: 'Review writer',
  },
}

const PERSONA_ORDER = [
  'hcpy',
  'hcpn',
  'lcpy',
  'creator',
  'premium',
  'review',
] as const

const STEP_STATES: StepState[] = [
  {
    copy: 'To understand where the opportunity was, we mapped users into 6 personas — from data and interviews.',
  },
  {
    copy: 'To understand where the opportunity was, we mapped users into 6 personas — from data and interviews.',
  },
  {
    copy: 'Content is the highest lever. HCPY drives 42.3% of GMV. But only 5.38% of users.',
    focusCardId: 'hcpy',
  },
  {
    copy: "But it's also broken. HCPN engages just as much — yet never buys. The intent is there, but the action isn't.",
    focusCardId: 'hcpn',
  },
]

function PersonaMetricGroup({ metrics }: { metrics: PersonaMetric[] }) {
  return (
    <div className="ohouse-persona-transition__metrics">
      {metrics.map((metric) => (
        <span className="ohouse-persona-transition__metric" key={metric.label}>
          <span className="ohouse-persona-transition__metric-label">
            {metric.label}
          </span>
          <span className="ohouse-persona-transition__metric-value">
            {metric.value}
          </span>
        </span>
      ))}
    </div>
  )
}

export function OhousePersonaTransitionProposalSlide({
  step,
}: {
  step: number
}) {
  const currentStep = STEP_STATES[Math.min(step, STEP_STATES.length - 1)]
  const isListVisible = step >= 1
  const focusCard = currentStep.focusCardId
    ? PERSONA_CARDS[currentStep.focusCardId]
    : undefined
  const focusIndex = currentStep.focusCardId
    ? PERSONA_ORDER.indexOf(currentStep.focusCardId)
    : -1
  const tailRows = currentStep.focusCardId
    ? PERSONA_ORDER.filter((cardId) => cardId !== currentStep.focusCardId)
    : []

  return (
    <article
      className="ohouse-persona-transition"
      data-persona-mode={focusCard ? 'focus' : 'overview'}
    >
      <StepTextTransition
        animateOnMount
        className="ohouse-persona-transition__copy"
        text={currentStep.copy}
        variant="crossfade"
      />

      <div className="ohouse-persona-transition__table">
        <AnimatePresence>
          {isListVisible ? (
            <motion.div
              animate={{ opacity: focusCard ? 0 : 1, y: 0 }}
              className="ohouse-persona-transition__rows"
              data-focus-mode={focusCard ? 'true' : 'false'}
              exit={{ opacity: 0, y: 8 }}
              initial={{ opacity: 0, y: 18 }}
              transition={{
                duration: focusCard ? 0.18 : 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {PERSONA_ORDER.map((cardId, index) => {
                const card = PERSONA_CARDS[cardId]
                const isFocused = currentStep.focusCardId === cardId
                const isDimmed = focusCard !== undefined && !isFocused

                return (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="ohouse-persona-transition__row"
                    data-focus-state={
                      isFocused ? 'active-base' : isDimmed ? 'dim' : 'default'
                    }
                    initial={{ opacity: 0, y: 12 }}
                    key={card.id}
                    transition={{
                      delay: focusCard ? 0 : index * 0.045,
                      duration: 0.34,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="ohouse-persona-transition__identity">
                      <h3 className="ohouse-persona-transition__title">
                        {card.title}
                      </h3>
                      <p className="ohouse-persona-transition__description">
                        {card.description}
                      </p>
                    </div>
                    <PersonaMetricGroup metrics={card.metrics} />
                  </motion.div>
                )
              })}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {focusCard ? (
            <motion.div
              animate={{ opacity: 1, top: focusIndex * 100, y: 0 }}
              className="ohouse-persona-transition__focus-card"
              exit={{ opacity: 0, y: -6 }}
              initial={{ opacity: 0, y: -8 }}
              key="focus-card"
              transition={{
                duration: 0.44,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="ohouse-persona-transition__focus-main">
                <div className="ohouse-persona-transition__focus-identity">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="ohouse-persona-transition__focus-identity-content"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      key={`${focusCard.id}-identity`}
                      transition={{
                        duration: 0.14,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <h3 className="ohouse-persona-transition__focus-title">
                        {focusCard.title}
                      </h3>
                      <p className="ohouse-persona-transition__focus-description">
                        {focusCard.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    key={`${focusCard.id}-metrics`}
                    transition={{
                      duration: 0.14,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <PersonaMetricGroup metrics={focusCard.metrics} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.ul
                animate={{ opacity: 1, y: 0 }}
                className="ohouse-persona-transition__detail-list"
                initial={{ opacity: 0, y: -8 }}
                transition={{
                  delay: 0.18,
                  duration: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                key={`${focusCard.id}-detail`}
              >
                {focusCard.detail.map((detail) => (
                  <li
                    className="ohouse-persona-transition__detail"
                    key={detail}
                  >
                    {detail}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {focusCard ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="ohouse-persona-transition__tail"
              exit={{ opacity: 0, y: 8 }}
              initial={{ opacity: 0, y: 10 }}
              transition={{
                delay: 0.18,
                duration: 0.34,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {tailRows.map((cardId) => {
                const card = PERSONA_CARDS[cardId]
                const rowIndex = PERSONA_ORDER.indexOf(cardId)
                const tailTop =
                  rowIndex < focusIndex
                    ? rowIndex * 100
                    : focusIndex * 100 + 300 + (rowIndex - focusIndex - 1) * 100

                return (
                  <motion.div
                    animate={{ opacity: 0.18, top: tailTop }}
                    className="ohouse-persona-transition__row ohouse-persona-transition__row--tail"
                    initial={{ opacity: 0, top: tailTop + 10 }}
                    key={card.id}
                    style={
                      {
                        '--persona-tail-top': `${tailTop}px`,
                      } as CSSProperties
                    }
                    transition={{
                      duration: 0.44,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="ohouse-persona-transition__identity">
                      <h3 className="ohouse-persona-transition__title">
                        {card.title}
                      </h3>
                      <p className="ohouse-persona-transition__description">
                        {card.description}
                      </p>
                    </div>
                    <PersonaMetricGroup metrics={card.metrics} />
                  </motion.div>
                )
              })}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </article>
  )
}
