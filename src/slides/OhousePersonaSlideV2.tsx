import { motion } from 'framer-motion'

import { ProposalBadge } from '../components/ProposalBadge'
import { StepTextTransition } from '../components/StepTextTransition'

type PersonaMetric = {
  label: string
  value: string
}

type PersonaCardId = 'creator' | 'hcpn' | 'hcpy' | 'lcpy' | 'premium' | 'review'

type PersonaCard = {
  description: string
  id: PersonaCardId
  metrics: PersonaMetric[]
  title: string
}

type StepState = {
  copy: string[]
  focusCardId?: PersonaCardId
}

const PERSONA_CARDS: Record<PersonaCardId, PersonaCard> = {
  creator: {
    description: 'Uploaded Content That Month',
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
    id: 'review',
    metrics: [
      { label: 'MAU', value: '2.3%' },
      { label: 'GMV', value: '15.6%' },
      { label: 'M3 Ret', value: '75%' },
    ],
    title: 'Review writer',
  },
}

const PERSONA_OVERVIEW_ORDER = [
  'hcpy',
  'hcpn',
  'lcpy',
  'creator',
  'premium',
  'review',
] as const

const STEP_STATES: StepState[] = [
  {
    copy: [
      'To understand where the opportunity was, we mapped users into 6 personas — from data and interviews.',
    ],
  },
  {
    copy: [
      'Content is the highest lever. HCPY drives 42.3% of GMV. But only 5.38% of users.',
    ],
    focusCardId: 'hcpy',
  },
  {
    copy: [
      "But it's also broken. HCPN engages just as much — yet never buys. The intent is there, but the action isn't.",
    ],
    focusCardId: 'hcpn',
  },
] as const

function PersonaOverviewList({
  focusCardId,
}: {
  focusCardId?: PersonaCardId
}) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="ohouse-persona-slide__overview-list"
      data-focus-mode={focusCardId ? 'true' : 'false'}
      initial={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {PERSONA_OVERVIEW_ORDER.map((cardId) => {
        const card = PERSONA_CARDS[cardId]
        const isFocused = focusCardId === card.id
        const isDimmed = focusCardId !== undefined && !isFocused

        return (
          <div
            className="ohouse-persona-slide__overview-row"
            data-focus-state={
              isFocused ? 'active' : isDimmed ? 'dim' : 'default'
            }
            key={card.id}
          >
            <div className="ohouse-persona-slide__overview-row-main">
              <div className="ohouse-persona-slide__overview-identity">
                <h3 className="ohouse-persona-slide__overview-title">
                  {card.title}
                </h3>
                <p className="ohouse-persona-slide__overview-description">
                  {card.description}
                </p>
              </div>
              <div className="ohouse-persona-slide__overview-data">
                <div className="ohouse-persona-slide__overview-metrics">
                  {card.metrics.map((metric) => (
                    <span
                      className="ohouse-persona-slide__overview-metric"
                      key={metric.label}
                    >
                      <span className="ohouse-persona-slide__overview-metric-label">
                        {metric.label}
                      </span>
                      <span className="ohouse-persona-slide__overview-metric-value">
                        {metric.value}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}

export function OhousePersonaSlideV2({ step }: { step: number }) {
  const currentStep = STEP_STATES[Math.min(step, STEP_STATES.length - 1)]

  return (
    <article
      className="ohouse-persona-slide ohouse-persona-slide--v2"
      data-persona-step={step === 0 ? 'overview' : 'focus'}
    >
      <ProposalBadge />
      <StepTextTransition
        animateOnMount
        className="ohouse-persona-slide__copy"
        text={currentStep.copy.join('\n')}
        variant="crossfade"
      />
      <PersonaOverviewList focusCardId={currentStep.focusCardId} />
    </article>
  )
}
