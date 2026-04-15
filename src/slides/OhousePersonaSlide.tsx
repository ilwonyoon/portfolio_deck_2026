import { AnimatePresence, motion } from 'framer-motion'
import type { CSSProperties } from 'react'

import { StepTextTransition } from '../components/StepTextTransition'
import { resolveFocusTone } from '../lib/focusState'

const PERSONA_STRIP_ASSET = '/media/ohouse-persona-strip.svg'

type PersonaMetric = {
  gap?: number
  label: string
  value: string
}

type PersonaCard = {
  description: string
  detailRows?: string[]
  fillerDetailRows?: number
  id: string
  metrics: PersonaMetric[]
  size: 'large' | 'small'
  title: string
}

type StepState = {
  copy: string[]
  emphasis: Record<
    string,
    {
      active?: boolean
      detailsVisible?: boolean
      dimCard?: boolean
      mutedDetailRows?: number[]
      mutedMetricRows?: number[]
      strongDetailRow?: number
    }
  >
}

const PERSONA_CARDS: Record<string, PersonaCard> = {
  creator: {
    description: 'Uploaded Content That Month',
    id: 'creator',
    metrics: [
      { label: 'MAU', value: '0.45%' },
      { label: 'GMV', value: '2.37% (avg.$152)' },
      { label: 'M3 Ret', value: '79%' },
    ],
    size: 'small',
    title: 'Content Creator',
  },
  hcpn: {
    description: 'High Content Purchase No',
    detailRows: [
      'Conversion Rate to HCPY: 15%',
      'Renovation request: 2.9x HCPY',
      'Tag click per users: 19.89',
      'Product saves per users: 10.64',
    ],
    id: 'hcpn',
    metrics: [
      { label: 'MAU', value: '8.2%' },
      { label: 'GMV', value: '0%' },
      { label: 'M3 Ret', value: '72%' },
    ],
    size: 'large',
    title: 'HCPN',
  },
  hcpy: {
    description: 'High Content Purchase Yes',
    detailRows: [
      'Purchase per month : 2.94',
      'Tag click per users: 33.76',
      'Product saves per users: 24.77',
    ],
    fillerDetailRows: 1,
    id: 'hcpy',
    metrics: [
      { label: 'MAU', value: '5.38%' },
      { label: 'GMV', value: '42.3% (avg. $227)' },
      { label: 'M3 Ret', value: '78%' },
    ],
    size: 'large',
    title: 'HCPY',
  },
  lcpy: {
    description: 'Low Content Purchase Yes',
    id: 'lcpy',
    metrics: [
      { label: 'MAU', value: '11.5%' },
      { label: 'GMV', value: '34.8% (avg.$88)' },
      { label: 'M3 Ret', value: '54%' },
    ],
    size: 'small',
    title: 'LCPY',
  },
  premium: {
    description: 'Visited Binary shop',
    id: 'premium',
    metrics: [
      { label: 'MAU', value: '2.6%' },
      { label: 'GMV', value: '15.6% (avg.$195)' },
      { label: 'M3 Ret', value: '75%' },
    ],
    size: 'small',
    title: 'Premium',
  },
  review: {
    description: 'Wrote a product review before',
    id: 'review',
    metrics: [
      { gap: 29.055, label: 'MAU', value: '2.3%' },
      { gap: 27.239, label: 'GMV', value: '15.6% (avg.$195)' },
      { gap: 27.239, label: 'M3 Ret', value: '75%' },
    ],
    size: 'small',
    title: 'Review writer',
  },
}

const PERSONA_COLUMNS = [
  {
    cards: [{ cardId: 'hcpy', height: 561.441 }],
    id: 'column-hcpy',
  },
  {
    cards: [{ cardId: 'hcpn', height: 561.441 }],
    id: 'column-hcpn',
  },
  {
    cards: [
      { cardId: 'lcpy', height: 274.527 },
      { cardId: 'premium', height: 272.386 },
    ],
    id: 'column-secondary',
  },
  {
    cards: [
      { cardId: 'creator', height: 273.457 },
      { cardId: 'review', height: 273.457 },
    ],
    id: 'column-tertiary',
  },
] as const

const STEP_STATES: StepState[] = [
  {
    copy: [
      'Identified problem and opportunity discovery',
      '— mapping our users into 6 personas',
    ],
    emphasis: {
      creator: { mutedMetricRows: [0, 1, 2] },
      hcpn: {
        mutedDetailRows: [0, 1, 2, 3],
        mutedMetricRows: [0, 1, 2],
      },
      hcpy: {
        mutedDetailRows: [0, 1, 2, 3],
        mutedMetricRows: [0, 1, 2],
      },
      lcpy: { mutedMetricRows: [0, 1, 2] },
      premium: { mutedMetricRows: [0, 1, 2] },
      review: { mutedMetricRows: [0, 1, 2] },
    },
  },
  {
    copy: [
      'Content is the highest lever.',
      'But only 5% of users ever get there.',
    ],
    emphasis: {
      creator: { dimCard: true, mutedMetricRows: [0, 1, 2] },
      hcpn: {
        dimCard: true,
        mutedDetailRows: [0, 1, 2, 3],
        mutedMetricRows: [0, 1, 2],
      },
      hcpy: { active: true, detailsVisible: true },
      lcpy: { dimCard: true, mutedMetricRows: [0, 1, 2] },
      premium: { dimCard: true, mutedMetricRows: [0, 1, 2] },
      review: { dimCard: true, mutedMetricRows: [0, 1, 2] },
    },
  },
  {
    copy: [
      "But it's also broken.",
      'HCPN engage with content but never buy.',
      'Conversion Rate to HCPY is just 15%.',
    ],
    emphasis: {
      creator: { dimCard: true, mutedMetricRows: [0, 1, 2] },
      hcpn: { active: true, detailsVisible: true, strongDetailRow: 0 },
      hcpy: {
        dimCard: true,
        mutedDetailRows: [0, 1, 2, 3],
        mutedMetricRows: [0, 1, 2],
      },
      lcpy: { dimCard: true, mutedMetricRows: [0, 1, 2] },
      premium: { dimCard: true, mutedMetricRows: [0, 1, 2] },
      review: { dimCard: true, mutedMetricRows: [0, 1, 2] },
    },
  },
] as const

function PersonaCardView({
  card,
  detailsVisible,
  isActive,
  isDimmed,
  mutedDetailRows,
  mutedMetricRows,
  step,
  strongDetailRow,
}: {
  card: PersonaCard
  detailsVisible: boolean
  isActive: boolean
  isDimmed: boolean
  mutedDetailRows: Set<number>
  mutedMetricRows: Set<number>
  step: number
  strongDetailRow: number
}) {
  const detailRows = [
    ...(card.detailRows ?? []),
    ...Array.from({ length: card.fillerDetailRows ?? 0 }, () => ''),
  ]

  return (
    <section
      className={`ohouse-persona-slide__card ohouse-persona-slide__card--${card.size} ohouse-persona-slide__card--${card.id}`}
      data-focus-tone={resolveFocusTone({ active: isActive, dimmed: isDimmed })}
      data-step={step}
    >
      <div className="ohouse-persona-slide__card-header">
        <h3 className="ohouse-persona-slide__card-title">{card.title}</h3>
        <p className="ohouse-persona-slide__card-description">{card.description}</p>
        {card.size === 'large' ? (
          <img
            alt=""
            aria-hidden="true"
            className="ohouse-persona-slide__card-strip"
            src={PERSONA_STRIP_ASSET}
          />
        ) : null}
      </div>

      <div className="ohouse-persona-slide__metric-list">
        {card.metrics.map((metric, index) => (
          <div
            className="ohouse-persona-slide__metric-row"
            data-muted={mutedMetricRows.has(index)}
            key={`${card.id}-${metric.label}`}
            style={
              metric.gap
                ? ({
                    '--persona-metric-gap': `${metric.gap}px`,
                  } as CSSProperties)
                : undefined
            }
          >
            <span className="ohouse-persona-slide__metric-label">{metric.label}</span>
            <span className="ohouse-persona-slide__metric-value">{metric.value}</span>
          </div>
        ))}
      </div>

      {card.size === 'large' ? (
        <AnimatePresence initial={false}>
          <motion.div
            animate={{
              opacity: detailsVisible ? 1 : 0,
              y: detailsVisible ? 0 : 6,
            }}
            className="ohouse-persona-slide__detail-list"
            initial={false}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            {detailRows.map((row, index) => (
              <p
                className="ohouse-persona-slide__detail-row"
                data-empty={row.length === 0}
                data-muted={mutedDetailRows.has(index)}
                data-strong={index === strongDetailRow}
                key={`${card.id}-detail-${index}`}
              >
                {row}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : null}
    </section>
  )
}

export function OhousePersonaSlide({ step }: { step: number }) {
  const currentStep = STEP_STATES[Math.min(step, STEP_STATES.length - 1)]

  return (
    <article
      className="ohouse-persona-slide"
      data-node-id="6057:24903"
      data-persona-step={step === 0 ? 'overview' : 'focus'}
    >
      <StepTextTransition
        className="ohouse-persona-slide__copy"
        text={currentStep.copy.join('\n')}
        variant="erase-type"
      />

      <div className="ohouse-persona-slide__columns">
        {PERSONA_COLUMNS.map((column) => (
          <div className="ohouse-persona-slide__column" key={column.id}>
            {column.cards.map(({ cardId, height }) => {
              const card = PERSONA_CARDS[cardId]
              const emphasis = currentStep.emphasis[card.id] ?? {}

              return (
                <div
                  className="ohouse-persona-slide__slot"
                  key={card.id}
                  style={{ height: `${height}px` }}
                >
                  <PersonaCardView
                    card={card}
                    detailsVisible={emphasis.detailsVisible === true}
                    isActive={emphasis.active === true}
                    isDimmed={emphasis.dimCard === true}
                    mutedDetailRows={new Set(emphasis.mutedDetailRows ?? [])}
                    mutedMetricRows={new Set(emphasis.mutedMetricRows ?? [])}
                    step={step}
                    strongDetailRow={emphasis.strongDetailRow ?? -1}
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </article>
  )
}
