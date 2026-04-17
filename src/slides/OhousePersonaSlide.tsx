import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import { StepTextTransition } from '../components/StepTextTransition'

type PersonaMetric = {
  gap?: number
  label: string
  value: string
}

type PersonaCardId = 'creator' | 'hcpn' | 'hcpy' | 'lcpy' | 'premium' | 'review'

type PersonaCard = {
  description: string
  overviewDetails?: string[]
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
      { label: 'GMV', value: '2.37% (avg.$152)' },
      { label: 'M3 Ret', value: '79%' },
    ],
    overviewDetails: [
      'Revenue/customer: $152.',
      'Retention remains strong despite the group’s limited scale.',
      'Content-view intensity is highest among creator-side cohorts.',
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
    overviewDetails: [
      'Revenue/customer: $0.',
      'High content engagement, but no purchase behavior.',
      'Only 15% convert into HCPY; most remain non-buyers.',
    ],
    title: 'HCPN',
  },
  hcpy: {
    description: 'High Content Purchase Yes',
    id: 'hcpy',
    metrics: [
      { label: 'MAU', value: '5.38%' },
      { label: 'GMV', value: '42.3% (avg. $227)' },
      { label: 'M3 Ret', value: '78%' },
    ],
    overviewDetails: [
      'Highest revenue/customer: avg. $227.',
      'Winning persona for the content-to-commerce loop.',
    ],
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
    overviewDetails: [
      'Revenue/customer: $88.',
      'Weakest retention when purchase happens without content engagement.',
      'The pattern suggests externally driven discovery, followed by transactional use.',
    ],
    title: 'LCPY',
  },
  premium: {
    description: 'Visited Binary shop',
    id: 'premium',
    metrics: [
      { label: 'MAU', value: '2.6%' },
      { label: 'GMV', value: '13% (avg.$142)' },
      { label: 'M3 Ret', value: '91%' },
    ],
    overviewDetails: [
      'Revenue/customer: $142.',
      'Taste-led browsing shows the strongest retention profile across groups.',
      'High content-view frequency suggests a durable interest graph.',
    ],
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
    overviewDetails: [
      'Revenue/customer: $195.',
      'Review writers form a small but commercially dense contributor group.',
      'Purchase frequency remains among the strongest creator-side signals.',
    ],
    title: 'Review writer',
  },
}

const PERSONA_OVERVIEW_ORDER = ['hcpy', 'hcpn', 'lcpy', 'creator', 'premium', 'review'] as const
const OVERVIEW_EVIDENCE_HOLD_MS = 720

function formatOverviewMetricValue(metric: PersonaMetric) {
  if (metric.label !== 'GMV') {
    return metric.value
  }

  return metric.value.replace(/\s*\(avg\.?\s*\$?\d+\)/, '')
}

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
  isEvidenceVisible,
}: {
  focusCardId?: PersonaCardId
  isEvidenceVisible: boolean
}) {
  const [lastFocusCardId, setLastFocusCardId] = useState<PersonaCardId | undefined>(focusCardId)
  const instantCollapseCardId =
    lastFocusCardId !== focusCardId ? lastFocusCardId : undefined
  const shouldStaggerReveal = isEvidenceVisible && focusCardId === undefined

  useEffect(() => {
    if (lastFocusCardId === focusCardId) {
      return
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      setLastFocusCardId(focusCardId)
    })

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [focusCardId, lastFocusCardId])

  return (
    <motion.div
      animate={{ opacity: isEvidenceVisible ? 1 : 0, y: isEvidenceVisible ? 0 : 14 }}
      className="ohouse-persona-slide__overview-list"
      data-focus-mode={focusCardId ? 'true' : 'false'}
      initial={false}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {PERSONA_OVERVIEW_ORDER.map((cardId, index) => {
        const card = PERSONA_CARDS[cardId]
        const isFocused = focusCardId === card.id
        const isDimmed = focusCardId !== undefined && !isFocused
        const isInstantCollapse = instantCollapseCardId === card.id && !isFocused
        const layoutDuration = isInstantCollapse ? 0 : isFocused ? 0.54 : isDimmed ? 0.18 : 0.36

        return (
          <motion.div
            animate={{ y: isEvidenceVisible ? 0 : 12 }}
            className="ohouse-persona-slide__overview-row"
            data-collapse-state={isInstantCollapse ? 'instant' : 'default'}
            data-expandable={card.overviewDetails?.length ? 'true' : 'false'}
            data-focus-state={isFocused ? 'active' : isDimmed ? 'dim' : 'default'}
            initial={false}
            key={card.id}
            layout
            transition={{
              delay: shouldStaggerReveal ? index * 0.06 : 0,
              duration: layoutDuration,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="ohouse-persona-slide__overview-row-main">
              <div className="ohouse-persona-slide__overview-identity">
                <motion.h3
                  className="ohouse-persona-slide__overview-title"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  className="ohouse-persona-slide__overview-description"
                >
                  {card.description}
                </motion.p>
              </div>
              <div className="ohouse-persona-slide__overview-data">
                <div className="ohouse-persona-slide__overview-metrics">
                  {card.metrics.map((metric) => (
                    <span className="ohouse-persona-slide__overview-metric" key={metric.label}>
                      <span className="ohouse-persona-slide__overview-metric-label">
                        {metric.label}
                      </span>
                      <span className="ohouse-persona-slide__overview-metric-value">
                        {formatOverviewMetricValue(metric)}
                      </span>
                    </span>
                  ))}
                </div>
                {card.overviewDetails?.length ? (
                  <div className="ohouse-persona-slide__overview-detail-shell">
                    <ul className="ohouse-persona-slide__overview-detail-list">
                      {card.overviewDetails.map((detail) => (
                        <li className="ohouse-persona-slide__overview-detail" key={detail}>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function PersonaStepStage({
  currentStep,
  step,
}: {
  currentStep: StepState
  step: number
}) {
  const evidenceTimeoutRef = useRef<number | null>(null)
  const [isOverviewEvidenceVisible, setIsOverviewEvidenceVisible] = useState(false)
  const isEvidenceVisible = step !== 0 || isOverviewEvidenceVisible

  useEffect(() => {
    if (evidenceTimeoutRef.current !== null) {
      window.clearTimeout(evidenceTimeoutRef.current)
      evidenceTimeoutRef.current = null
    }
  }, [step])

  useEffect(() => {
    return () => {
      if (evidenceTimeoutRef.current !== null) {
        window.clearTimeout(evidenceTimeoutRef.current)
        evidenceTimeoutRef.current = null
      }
    }
  }, [])

  const handleTextComplete = useCallback(() => {
    if (step === 0) {
      if (evidenceTimeoutRef.current !== null) {
        window.clearTimeout(evidenceTimeoutRef.current)
      }

      evidenceTimeoutRef.current = window.setTimeout(() => {
        setIsOverviewEvidenceVisible(true)
        evidenceTimeoutRef.current = null
      }, OVERVIEW_EVIDENCE_HOLD_MS)
    }
  }, [step])

  return (
    <>
      <StepTextTransition
        animateOnMount
        className="ohouse-persona-slide__copy"
        onComplete={handleTextComplete}
        text={currentStep.copy.join('\n')}
        variant="erase-type"
      />

      <PersonaOverviewList
        focusCardId={currentStep.focusCardId}
        isEvidenceVisible={isEvidenceVisible}
      />
    </>
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
      <PersonaStepStage currentStep={currentStep} step={step} />
    </article>
  )
}
