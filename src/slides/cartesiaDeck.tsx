import { motion, AnimatePresence } from 'framer-motion'
import type { SlideDefinition, SlideRenderContext } from '../types/presentation'

// ── Design tokens ──────────────────────────────────────────────────────────
const T = {
  bg: '#f9f9f8',
  bgSecondary: '#efeee8',
  bgSurface: '#ffffff',
  inkPrimary: '#1a1714',
  inkSecondary: '#5a5450',
  inkTertiary: '#8a8480',
  inkMuted: '#6b6760',
  accent: '#004d22',
  accentLight: '#309d4b',
  accentTint: '#dbe6d0',
  border: '#dfdbd6',
  danger: '#fa2b36',
  sans: "'TestSohne', 'Inter', -apple-system, sans-serif",
  mono: "'TestSohneMono', 'IBM Plex Mono', monospace",
}

const W = 1920
const H = 1080
const MX = 128
const MY = 96
const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

// ── Shared components ──────────────────────────────────────────────────────
function Shell({ children, bg = T.bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: W, height: H, background: bg, fontFamily: T.sans,
      position: 'relative', overflow: 'hidden',
      padding: `${MY}px ${MX}px`, boxSizing: 'border-box',
    }}>
      {children}
    </div>
  )
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

function SlideNum({ n }: { n: string }) {
  return (
    <div style={{
      position: 'absolute', bottom: MY, right: MX,
      fontFamily: T.mono, fontSize: 11, color: T.inkTertiary, letterSpacing: '0.06em',
    }}>{n}</div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: T.mono, fontSize: 11, letterSpacing: '0.12em',
      textTransform: 'uppercase', color: T.inkTertiary, marginBottom: 24,
    }}>
      {children}
    </div>
  )
}

function AccentTag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-block',
      background: T.accentTint, color: T.accent,
      fontFamily: T.mono, fontSize: 11, letterSpacing: '0.08em',
      textTransform: 'uppercase', padding: '3px 10px', borderRadius: 4,
    }}>
      {children}
    </span>
  )
}

// ── 00 · Cover ─────────────────────────────────────────────────────────────
function SlideCover() {
  return (
    <div style={{
      width: W, height: H, background: T.bg, fontFamily: T.sans,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Green accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        style={{
          width: 48, height: 3, background: T.accent, borderRadius: 2,
          marginBottom: 48, transformOrigin: 'left',
        }}
      />
      <FadeUp delay={0.1}>
        <div style={{
          fontSize: 96, fontWeight: 600, lineHeight: 1.0,
          letterSpacing: '-0.03em', color: T.inkPrimary, textAlign: 'center',
          marginBottom: 24,
        }}>
          Give Your Agent<br />a Face.
        </div>
      </FadeUp>
      <FadeUp delay={0.25}>
        <div style={{
          fontFamily: T.mono, fontSize: 14, letterSpacing: '0.08em',
          color: T.inkSecondary, textAlign: 'center',
        }}>
          Ilwon Yoon · Cartesia Take-Home · 2026
        </div>
      </FadeUp>
    </div>
  )
}

// ── 01 · Agenda ─────────────────────────────────────────────────────────────
function SlideAgenda() {
  const sections = [
    { num: '01', label: 'Competitive teardown', sub: 'ElevenLabs', crossedOut: ['Deepgram', 'Inworld'] },
    { num: '02', label: 'Concept — Give Your Agent a Face', sub: '5-step flow · Avatar layer for voice agents' },
  ]
  return (
    <Shell>
      <FadeUp delay={0}>
        <Eyebrow>Overview</Eyebrow>
      </FadeUp>
      <FadeUp delay={0.07}>
        <div style={{
          fontSize: 64, fontWeight: 500, lineHeight: 1.05,
          letterSpacing: '-0.02em', color: T.inkPrimary, marginBottom: 80,
        }}>
          Two parts.
        </div>
      </FadeUp>
      <FadeUp delay={0.14}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {sections.map((s) => (
            <div key={s.num} style={{
              display: 'flex', alignItems: 'flex-start', gap: 48,
              padding: '40px 0',
              borderTop: `1px solid ${T.border}`,
            }}>
              <div style={{ fontFamily: T.mono, fontSize: 13, color: T.inkTertiary, width: 40, flexShrink: 0, paddingTop: 4 }}>{s.num}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 500, color: T.inkPrimary, marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 16, fontFamily: T.mono, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ color: T.inkPrimary, fontWeight: 500 }}>{s.sub}</span>
                  {'crossedOut' in s && s.crossedOut && s.crossedOut.map((item: string) => (
                    <span key={item} style={{ color: T.inkTertiary, textDecoration: 'line-through', fontWeight: 400 }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
      <SlideNum n="00" />
    </Shell>
  )
}

// ── Part 1: Competitive teardown ───────────────────────────────────────────

function SlideTeardownIntro() {
  return (
    <Shell>
      <FadeUp delay={0}>
        <Eyebrow>Part 01 · ElevenLabs vs. Cartesia</Eyebrow>
      </FadeUp>
      <FadeUp delay={0.07}>
        <div style={{
          fontSize: 72, fontWeight: 500, lineHeight: 1.0,
          letterSpacing: '-0.03em', color: T.inkPrimary, marginBottom: 48,
        }}>
          Same goal.<br />Different belief.
        </div>
      </FadeUp>
      <FadeUp delay={0.14}>
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', marginBottom: 56 }}>
          <div style={{
            flex: 1, padding: '28px 32px',
            background: T.bgSecondary, borderRadius: 12,
            border: `1px solid ${T.border}`,
          }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: T.inkTertiary, marginBottom: 12 }}>Cartesia</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: T.inkPrimary, marginBottom: 8 }}>Research lab that demos its tech</div>
            <div style={{ fontSize: 15, lineHeight: 1.6, color: T.inkSecondary }}>Enters the console showing what it can do. Capability-first, then workflow.</div>
          </div>
          <div style={{
            flex: 1, padding: '28px 32px',
            background: T.accentTint, borderRadius: 12,
            border: `1px solid rgba(0,77,34,0.12)`,
          }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: T.accent, marginBottom: 12, opacity: 0.7 }}>ElevenLabs</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: T.inkPrimary, marginBottom: 8 }}>Product company built for outcomes</div>
            <div style={{ fontSize: 15, lineHeight: 1.6, color: T.inkSecondary }}>Asks what you came to do. Segments by goal, then routes everything — IA, nav, onboarding, content — to serve that intent.</div>
          </div>
        </div>
      </FadeUp>
      <FadeUp delay={0.20}>
        <div style={{ fontSize: 15, color: T.inkTertiary, fontFamily: T.mono, letterSpacing: '0.06em' }}>
          Comparing across three surfaces → Onboarding · Side nav / IA · Content panel
        </div>
      </FadeUp>
      <SlideNum n="01" />
    </Shell>
  )
}

// Teardown slide template: image left, analysis right
interface TeardownSlideProps {
  slideNum: string
  competitor: string
  finding: string
  what: string
  why: string
  how: string
  image?: string
  step: number
}

function TeardownSlide({ slideNum, competitor, finding, what, why, how, image, step }: TeardownSlideProps) {
  return (
    <div style={{ width: W, height: H, background: T.bg, fontFamily: T.sans, position: 'relative', overflow: 'hidden' }}>
      {/* Left — image */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          position: 'absolute',
          top: MY, left: MX, width: 900, height: H - MY * 2,
          borderRadius: 16, overflow: 'hidden',
          background: T.bgSecondary,
          border: `1px solid ${T.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {image ? (
          <img src={image} alt={finding} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ fontFamily: T.mono, fontSize: 13, color: T.inkTertiary, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            — screenshot —
          </div>
        )}
      </motion.div>

      {/* Right — copy */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0, right: MX, width: 620,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <FadeUp delay={0}>
          <AccentTag>{competitor}</AccentTag>
          <div style={{ height: 20 }} />
        </FadeUp>
        <FadeUp delay={0.08}>
          <div style={{
            fontSize: 36, fontWeight: 500, lineHeight: 1.2,
            letterSpacing: '-0.015em', color: T.inkPrimary, marginBottom: 48,
          }}>
            {finding}
          </div>
        </FadeUp>
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
            >
              {[
                { label: 'What', body: what },
                { label: 'Why it\'s better', body: why },
                { label: 'Apply to Cartesia', body: how },
              ].map(item => (
                <div key={item.label}>
                  <div style={{
                    fontFamily: T.mono, fontSize: 11, letterSpacing: '0.10em',
                    textTransform: 'uppercase', color: T.accent, marginBottom: 8,
                  }}>{item.label}</div>
                  <div style={{ fontSize: 16, lineHeight: 1.6, color: T.inkSecondary }}>{item.body}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SlideNum n={slideNum} />
    </div>
  )
}

// ── Part 2: Concept — Give Your Agent a Face ───────────────────────────────

function SlideConceptIntro() {
  return (
    <Shell>
      <FadeUp delay={0}>
        <Eyebrow>Part 02</Eyebrow>
      </FadeUp>
      <FadeUp delay={0.07}>
        <div style={{
          fontSize: 80, fontWeight: 500, lineHeight: 1.0,
          letterSpacing: '-0.03em', color: T.inkPrimary, marginBottom: 40,
        }}>
          Give Your Agent<br />a Face.
        </div>
      </FadeUp>
      <FadeUp delay={0.14}>
        <div style={{ fontSize: 22, lineHeight: 1.6, color: T.inkSecondary, maxWidth: 700 }}>
          An optional visual avatar layer attachable to any existing Cartesia Agent —
          upload an image, animate it with the agent's voice, embed anywhere.
        </div>
      </FadeUp>
      <SlideNum n="05" />
    </Shell>
  )
}

function SlideFlowOverview({ step }: { step: number }) {
  const steps = [
    { num: '01', label: 'Start', desc: 'Existing Cartesia Agent' },
    { num: '02', label: 'Upload', desc: 'Choose avatar image' },
    { num: '03', label: 'Configure', desc: 'Expressiveness, style, background' },
    { num: '04', label: 'Preview', desc: 'Real-time animated avatar' },
    { num: '05', label: 'Deploy', desc: 'Embed snippet or widget URL' },
  ]
  return (
    <Shell>
      <FadeUp delay={0}>
        <Eyebrow>Core flow · 5 steps</Eyebrow>
      </FadeUp>
      <FadeUp delay={0.07}>
        <div style={{ fontSize: 52, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', color: T.inkPrimary, marginBottom: 64 }}>
          Start → Upload → Configure<br />→ Preview → Deploy
        </div>
      </FadeUp>
      <div style={{ display: 'flex', gap: 0 }}>
        {steps.map((s, i) => (
          <AnimatePresence key={s.num}>
            {step >= i && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE, delay: i * 0.06 }}
                style={{
                  flex: 1,
                  padding: '28px 24px',
                  background: i === step - 1 ? T.accentTint : T.bgSecondary,
                  borderLeft: i === 0 ? 'none' : `1px solid ${T.border}`,
                  borderRadius: i === 0 ? '12px 0 0 12px' : i === 4 ? '0 12px 12px 0' : 0,
                }}
              >
                <div style={{ fontFamily: T.mono, fontSize: 11, color: i === step - 1 ? T.accent : T.inkTertiary, letterSpacing: '0.08em', marginBottom: 12 }}>{s.num}</div>
                <div style={{ fontSize: 20, fontWeight: 600, color: T.inkPrimary, marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 14, color: T.inkSecondary, lineHeight: 1.5 }}>{s.desc}</div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
      <SlideNum n="06" />
    </Shell>
  )
}

// Flow step template — image + copy
interface FlowSlideProps {
  slideNum: string
  stepNum: string
  stepLabel: string
  headline: string
  body: string
  image?: string
}

function FlowSlide({ slideNum, stepNum, stepLabel, headline, body, image }: FlowSlideProps) {
  return (
    <div style={{ width: W, height: H, background: T.bg, fontFamily: T.sans, position: 'relative', overflow: 'hidden' }}>
      {/* Left copy */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{
          position: 'absolute',
          top: 0, bottom: 0, left: MX, width: 500,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <AccentTag>{`Step ${stepNum} · ${stepLabel}`}</AccentTag>
        </div>
        <div style={{
          fontSize: 48, fontWeight: 500, lineHeight: 1.1,
          letterSpacing: '-0.02em', color: T.inkPrimary, marginBottom: 24,
        }}>
          {headline}
        </div>
        <div style={{ fontSize: 20, lineHeight: 1.65, color: T.inkSecondary }}>
          {body}
        </div>
      </motion.div>

      {/* Right — mockup stage */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
        style={{
          position: 'absolute',
          top: MY, right: MX, width: 1080, height: H - MY * 2,
          borderRadius: 16, overflow: 'hidden',
          background: T.bgSecondary,
          border: `1px solid ${T.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {image ? (
          <img src={image} alt={stepLabel} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ fontFamily: T.mono, fontSize: 13, color: T.inkTertiary, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Step {stepNum} — {stepLabel}
          </div>
        )}
      </motion.div>

      <SlideNum n={slideNum} />
    </div>
  )
}

// ── End ────────────────────────────────────────────────────────────────────
function SlideEnd() {
  return (
    <div style={{
      width: W, height: H, background: T.accent, fontFamily: T.sans,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <FadeUp delay={0.1}>
        <div style={{
          fontSize: 96, fontWeight: 500, lineHeight: 1.0,
          letterSpacing: '-0.03em', color: '#ffffff', textAlign: 'center',
          marginBottom: 32,
        }}>
          Questions?
        </div>
      </FadeUp>
      <FadeUp delay={0.2}>
        <div style={{
          fontFamily: T.mono, fontSize: 14, letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.6)', textAlign: 'center',
        }}>
          Ilwon Yoon · ilwonyoon@gmail.com
        </div>
      </FadeUp>
    </div>
  )
}

// ── Deck ───────────────────────────────────────────────────────────────────
export const cartesiaSlides: SlideDefinition[] = [
  {
    id: 'ca-cover',
    navLabel: 'Cover',
    steps: 1,
    render: () => <SlideCover />,
  },
  {
    id: 'ca-agenda',
    navLabel: 'Agenda',
    steps: 1,
    render: () => <SlideAgenda />,
  },

  // Part 1 — Competitive teardown
  {
    id: 'ca-teardown-intro',
    navLabel: 'Teardown',
    steps: 1,
    render: () => <SlideTeardownIntro />,
  },
  {
    id: 'ca-teardown-1',
    navLabel: '① Onboarding funnel',
    steps: 2,
    render: ({ step }: SlideRenderContext) => (
      <TeardownSlide
        slideNum="02"
        competitor="Onboarding funnel"
        finding="ElevenLabs asks what you came to do. Cartesia shows what it can do."
        what="ElevenLabs opens with 'What's your use case?' — Creative, Agent, Enterprise — and routes the entire onboarding accordingly. Cartesia drops users directly into the console dashboard."
        why="Intent-first onboarding means every subsequent screen, tooltip, and default is calibrated to that user's goal. The product feels built for you from the first click."
        how="Add a lightweight intent screen before the Cartesia console — 3 paths max. Use the answer to set defaults, surface relevant docs, and prioritize the right API features."
        step={step}
      />
    ),
  },
  {
    id: 'ca-teardown-2',
    navLabel: '② Side nav / IA',
    steps: 2,
    render: ({ step }: SlideRenderContext) => (
      <TeardownSlide
        slideNum="03"
        competitor="Side navigation / IA"
        finding="ElevenLabs organizes by what you make. Cartesia organizes by what it has."
        what="ElevenLabs nav: Speech, Voices, Agents, Dubbing, Studio — output types the user creates. Cartesia nav: API keys, Models, Usage — inputs and infrastructure the system exposes."
        why="Output-oriented IA maps to user mental models. 'I want to build an agent' matches a nav item directly. 'I need to configure a model' is an implementation detail most users don't start with."
        how="Restructure Cartesia's left nav around user jobs-to-be-done: Build a voice, Deploy an agent, Monitor usage. Keep technical config a level deeper."
        step={step}
      />
    ),
  },
  {
    id: 'ca-teardown-3',
    navLabel: '③ Content panel',
    steps: 2,
    render: ({ step }: SlideRenderContext) => (
      <TeardownSlide
        slideNum="04"
        competitor="Content panel"
        finding="ElevenLabs teaches while you build. Cartesia shows while you explore."
        what="ElevenLabs embeds contextual guidance — inline examples, 'Try it' buttons, progressive tooltips — directly in the content panel next to each control. Cartesia's panels are clean but silent."
        why="Learning-in-context reduces tab-switching to docs. Users build confidence faster and reach their first working integration sooner."
        how="Add inline 'Try this' micro-interactions to Cartesia's voice and agent panels. Show a working code snippet next to every API parameter. Make the first success zero-friction."
        step={step}
      />
    ),
  },

  // Part 2 — Concept
  {
    id: 'ca-concept-intro',
    navLabel: 'Concept',
    steps: 1,
    render: () => <SlideConceptIntro />,
  },
  {
    id: 'ca-flow-overview',
    navLabel: 'Flow overview',
    steps: 6,
    render: ({ step }: SlideRenderContext) => <SlideFlowOverview step={step} />,
  },
  {
    id: 'ca-step-1',
    navLabel: 'Step 1 · Start',
    steps: 1,
    render: () => (
      <FlowSlide
        slideNum="07"
        stepNum="01"
        stepLabel="Start"
        headline="You're on an existing Agent."
        body="The avatar layer is an optional add-on. No changes to TTS, LLM, or knowledge base config — just a new 'Avatar' tab in the Agent panel."
      />
    ),
  },
  {
    id: 'ca-step-2',
    navLabel: 'Step 2 · Upload',
    steps: 1,
    render: () => (
      <FlowSlide
        slideNum="08"
        stepNum="02"
        stepLabel="Upload"
        headline="Upload any image."
        body="Photo, illustration, or character — Cartesia generates a real-time animated avatar. Drag and drop or choose from a gallery of starter templates."
      />
    ),
  },
  {
    id: 'ca-step-3',
    navLabel: 'Step 3 · Configure',
    steps: 1,
    render: () => (
      <FlowSlide
        slideNum="09"
        stepNum="03"
        stepLabel="Configure"
        headline="Set the behavior."
        body="Control expressiveness (subtle → dramatic), visual style (realistic, illustrated, minimal), background, and display settings for the widget."
      />
    ),
  },
  {
    id: 'ca-step-4',
    navLabel: 'Step 4 · Preview',
    steps: 1,
    render: () => (
      <FlowSlide
        slideNum="10"
        stepNum="04"
        stepLabel="Preview"
        headline="See and hear it live."
        body="The avatar speaks in real time, driven by the existing agent's voice and LLM. Test different inputs before deploying."
      />
    ),
  },
  {
    id: 'ca-step-5',
    navLabel: 'Step 5 · Deploy',
    steps: 1,
    render: () => (
      <FlowSlide
        slideNum="11"
        stepNum="05"
        stepLabel="Deploy"
        headline="Embed anywhere."
        body="Copy a single <script> tag or widget URL. Drop into any website, support portal, or landing page. Live in under a minute."
      />
    ),
  },
  {
    id: 'ca-end',
    navLabel: 'End',
    steps: 1,
    render: () => <SlideEnd />,
  },
]
