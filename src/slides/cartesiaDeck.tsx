import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { SlideDefinition } from '../types/presentation'

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

// ── Global keyframes (CSS-based entrance — reliable inside the deck viewport) ──
const CA_KEYFRAMES = `
@keyframes ca-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ca-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes ca-slide-in { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
@keyframes ca-swipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0% 0 0); } }
`

function CaStyles() {
  return <style>{CA_KEYFRAMES}</style>
}

// ── Shared components ──────────────────────────────────────────────────────
function Shell({ children, bg = T.bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: W, height: H, background: bg, fontFamily: T.sans,
      position: 'relative', overflow: 'hidden',
      padding: `${MY}px ${MX}px`, boxSizing: 'border-box',
    }}>
      <CaStyles />
      {children}
    </div>
  )
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{
      animation: `ca-fade-up 0.5s cubic-bezier(0.25,0.1,0.25,1) ${delay}s both`,
    }}>
      {children}
    </div>
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


// ── 00 · Cover ─────────────────────────────────────────────────────────────
function SlideCover() {
  return (
    <div style={{
      width: W, height: H, background: T.bg, fontFamily: T.sans,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <CaStyles />
      {/* Green accent line */}
      <div
        style={{
          width: 48, height: 3, background: T.accent, borderRadius: 2,
          marginBottom: 48, transformOrigin: 'left',
          animation: 'ca-fade-in 0.6s cubic-bezier(0.25,0.1,0.25,1) 0.2s both',
        }}
      />
      <FadeUp delay={0.1}>
        <div style={{
          fontSize: 96, fontWeight: 600, lineHeight: 1.0,
          letterSpacing: '-0.03em', color: T.inkPrimary, textAlign: 'center',
          marginBottom: 24,
        }}>
          Hello.
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
        <Eyebrow>Agenda</Eyebrow>
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
      <div style={{ position: 'absolute', top: MY, left: MX }}>
        <FadeUp delay={0}>
          <Eyebrow>Part 01 · ElevenLabs</Eyebrow>
        </FadeUp>
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: `0 ${MX}px`,
      }}>
        <FadeUp delay={0.1}>
          <div style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.accent, marginBottom: 20 }}>ElevenLabs</div>
          <div style={{ fontSize: 72, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.03em', color: T.inkPrimary, maxWidth: 1100 }}>
            Curated paths for each job to be done.
          </div>
        </FadeUp>
      </div>
      <SlideNum n="01" />
    </Shell>
  )
}

// ── Comparison slide: toggle + single viewer + swipeable media ─────────────
type MediaItem = { src: string; type?: 'image' | 'video'; webm?: string }

interface CompareSlideProps {
  slideNum: string
  title?: string
  elevenlabs?: MediaItem[]
}

function CompareSlide({
  slideNum,
  title,
  elevenlabs = [],
}: CompareSlideProps) {
  const items = elevenlabs
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightbox, setLightbox] = useState<string | null>(null)

  const item = items[activeIdx]
  const topOffset = title ? MY + 64 : MY

  const goTo = (idx: number) => setActiveIdx(Math.max(0, Math.min(items.length - 1, idx)))

  return (
    <div style={{ width: W, height: H, background: T.bg, fontFamily: T.sans, position: 'relative', overflow: 'hidden' }}>
      <CaStyles />

      {/* Title */}
      {title && (
        <div style={{
          position: 'absolute', top: MY, left: MX, right: MX,
          fontSize: 18, fontWeight: 500, color: T.inkPrimary,
          letterSpacing: '-0.01em',
          animation: 'ca-fade-up 0.4s cubic-bezier(0.25,0.1,0.25,1) both',
        }}>
          {title}
        </div>
      )}

      {/* Main viewer */}
      <div
        style={{
          position: 'absolute',
          top: topOffset, left: MX, right: MX, bottom: MY,
          borderRadius: 14, overflow: 'hidden',
          background: T.bgSecondary,
          border: `1px solid rgba(0,77,34,0.15)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: item && item.type !== 'video' ? 'zoom-in' : 'default',
          animation: 'ca-fade-up 0.45s cubic-bezier(0.25,0.1,0.25,1) 0.1s both',
        }}
        onClick={() => item && item.type !== 'video' && setLightbox(item.src)}
      >
        {item ? (
          item.type === 'video' ? (
            <video
              key={item.src}
              src={item.src}
              autoPlay loop muted playsInline preload="auto"
              ref={(el) => { if (el) el.play().catch(() => {}) }}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img key={item.src} src={item.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          )
        ) : (
          <div style={{ fontFamily: T.mono, fontSize: 13, color: T.inkTertiary, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            — media —
          </div>
        )}

        {/* Thumbnail strip — bottom-left overlay */}
        {items.length > 1 && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute', left: '50%', bottom: 20, transform: 'translateX(-50%)',
              display: 'flex', alignItems: 'center', gap: 6,
              padding: 6, borderRadius: 10,
              background: 'rgba(26,23,20,0.55)', backdropFilter: 'blur(8px)',
            }}
          >
            {items.map((thumb, i) => {
              const isActive = i === activeIdx
              return (
                <button
                  key={thumb.src}
                  onClick={() => goTo(i)}
                  style={{
                    width: 60, height: 36, borderRadius: 4, overflow: 'hidden',
                    padding: 0, cursor: 'pointer',
                    border: `2px solid ${isActive ? '#fff' : 'transparent'}`,
                    opacity: isActive ? 1 : 0.5,
                    background: T.bgSecondary,
                    display: 'block', transition: 'opacity 0.15s, border-color 0.15s',
                  }}
                >
                  {thumb.type === 'video' ? (
                    <video src={`${thumb.src}#t=0.1`} muted playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                  ) : (
                    <img src={thumb.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', inset: 0, zIndex: 100,
              background: 'rgba(26,23,20,0.88)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out',
            }}
          >
            <motion.img
              src={lightbox}
              initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: 12, objectFit: 'contain', cursor: 'default' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SlideNum n={slideNum} />
    </div>
  )
}

// ── UX Writing comparison — stacked two images ─────────────────────────────
function SlideWritingCompare() {
  const GAP = 12
  const imgH = (H - MY * 2 - 56 - GAP) / 2
  return (
    <div style={{ width: W, height: H, background: T.bg, fontFamily: T.sans, position: 'relative', overflow: 'hidden' }}>
      <CaStyles />
      <div style={{
        position: 'absolute', top: MY, left: MX,
        fontSize: 18, fontWeight: 500, color: T.inkPrimary, letterSpacing: '-0.01em',
        animation: 'ca-fade-up 0.4s cubic-bezier(0.25,0.1,0.25,1) both',
      }}>
        UX writing — user-facing outcomes vs. research-driven naming
      </div>
      <div style={{
        position: 'absolute', top: MY + 56, left: MX, right: MX, bottom: MY,
        display: 'flex', flexDirection: 'column', gap: GAP,
      }}>
        {[
          { src: '/media/cartesia/el-writing-cartesia.png', label: 'Cartesia' },
          { src: '/media/cartesia/el-writing-elevenlabs.png', label: 'ElevenLabs' },
        ].map(({ src, label }) => (
          <div key={label} style={{ position: 'relative', height: imgH, borderRadius: 12, overflow: 'hidden', background: T.bgSecondary, border: `1px solid ${T.border}`, flexShrink: 0 }}>
            <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            <div style={{ position: 'absolute', top: 12, left: 16, fontFamily: T.mono, fontSize: 11, letterSpacing: '0.10em', textTransform: 'uppercase', color: T.inkTertiary, background: 'rgba(249,249,248,0.85)', padding: '3px 8px', borderRadius: 4 }}>{label}</div>
          </div>
        ))}
      </div>
      <SlideNum n="04b" />
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

const B = ({ children }: { children: React.ReactNode }) => <strong style={{ color: T.inkPrimary, fontWeight: 600 }}>{children}</strong>

// Shared writeup layout: left eyebrow+headline, right content with stepper
function WriteupShell({ eyebrow, headline, sub, right, slideNum }: {
  eyebrow: string
  headline: React.ReactNode
  sub?: string
  right: React.ReactNode
  slideNum: string
}) {
  return (
    <div style={{ width: W, height: H, background: T.bg, fontFamily: T.sans, position: 'relative', overflow: 'hidden', padding: `${MY}px ${MX}px`, boxSizing: 'border-box', display: 'flex', gap: 96, alignItems: 'center' }}>
      <CaStyles />
      <div style={{ width: 520, flexShrink: 0 }}>
        <div style={{ marginBottom: 24 }}><Eyebrow>{eyebrow}</Eyebrow></div>
        <div style={{ fontSize: 42, fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: T.inkPrimary, animation: 'ca-fade-up 0.5s cubic-bezier(0.25,0.1,0.25,1) both' }}>
          {headline}
        </div>
        {sub && <div style={{ fontSize: 17, lineHeight: 1.6, color: T.inkSecondary, marginTop: 20 }}>{sub}</div>}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
        {right}
      </div>
      <SlideNum n={slideNum} />
    </div>
  )
}

// Writeup 0 — Goal
function SlideWriteupGoal() {
  return (
    <WriteupShell
      eyebrow="Design Writeup · 1 / 5"
      headline={<>Success metric: <span style={{ color: T.accent }}>% of avatars attached to an existing agent and deployed live.</span></>}
      sub="Activation comes before discovery. The experience from selection to deployment needs to work first — driving more users into a leaky flow only scales failed attempts."
      right={<div />}
      slideNum="06"
    />
  )
}

// Writeup 1 — Thesis
function SlideWriteupThesis() {
  return (
    <WriteupShell
      eyebrow="Design Writeup · 2 / 5"
      headline={<>A face increases engagement — but only when it's <span style={{ color: T.accent }}>felt, not explained.</span></>}
      sub="The whole design was organized around one question: how do you let someone experience that value in seconds, without a word of persuasion?"
      right={<div />}
      slideNum="06"
    />
  )
}

// Left label + right bullets layout
function BulletSlide({ eyebrow, headline, items, slideNum }: {
  eyebrow: string
  headline: string
  items: React.ReactNode[]
  slideNum: string
}) {
  return (
    <WriteupShell
      eyebrow={eyebrow}
      headline={headline}
      slideNum={slideNum}
      right={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, animation: 'ca-fade-up 0.4s cubic-bezier(0.25,0.1,0.25,1) 0.1s both' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <span style={{ marginTop: 11, width: 6, height: 6, borderRadius: '50%', background: T.accent, flexShrink: 0 }} />
              <span style={{ fontSize: 24, lineHeight: 1.5, color: T.inkSecondary }}>{item}</span>
            </div>
          ))}
        </div>
      }
    />
  )
}

// Writeup 2 — What I focused on
function SlideWriteupFocus() {
  const items: React.ReactNode[] = [
    <><B>Discovery</B> — surface the feature without forcing it</>,
    <><B>Value communication</B> — show why it matters before setup</>,
    <><B>Add avatar</B> to an existing agent (curated presets, not user-uploaded)</>,
    <><B>Preview</B> live — the wow moment</>,
    <><B>Deploy</B> — one copy action</>,
  ]
  return <BulletSlide eyebrow="Design Writeup · 3 / 5" headline="What I focused on" items={items} slideNum="06" />
}

// Writeup 3 — What I scoped out
function SlideWriteupCuts() {
  const items: React.ReactNode[] = [
    <><B>Upload your own image &amp; generate</B> — too many unknowns (which face, which brand, which voice pairing), technically hard, no validated upside</>,
    <><B>Visual style / background / display settings</B> — Cartesia's target customers (Finance, Healthcare, Gov) don't need illustration or 3D avatars. A realistic face is enough to test the core value</>,
    <><B>Expression settings</B> — voice already carries style. Facial expression follows the voice; no separate control needed</>,
  ]
  return <BulletSlide eyebrow="Design Writeup · 4 / 5" headline="What I scoped out" items={items} slideNum="06" />
}

// Writeup 4 — Why a prototype + What's next
function SlideWriteupWhy() {
  const items: React.ReactNode[] = [
    <>Mockups show <em>what</em> it looks like — not <B>why it matters</B></>,
    <>The value only lands when someone sees a face speak and thinks <B>"I could put this on my site"</B></>,
    <><B>Cartesia's own site has no face</B> — building the prototype was the most honest argument</>,
    <><B>Idle state</B> is the next hard problem — nothing = creepy, unprompted = noise</>,
    <>Needs <B>live conversation + transcription</B> to feel like a real agent, not a performance</>,
  ]
  return <BulletSlide eyebrow="Design Writeup · 5 / 5" headline="Why a prototype — and what's next" items={items} slideNum="06" />
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
  // Teardown: thesis slide first, then image comparisons
  {
    id: 'ca-teardown-intro',
    navLabel: 'Teardown',
    steps: 1,
    render: () => <SlideTeardownIntro />,
  },
  // ① Onboarding / IA
  {
    id: 'ca-compare-onboarding',
    navLabel: '① Onboarding / IA',
    steps: 1,
    render: () => (
      <CompareSlide
        slideNum="02"
        title="Goal-oriented IA — users are segmented by intent from entry"
        elevenlabs={[
          { src: '/media/cartesia/el-ob-1-platform.png' },
          { src: '/media/cartesia/el-ob-3-agents.png' },
          { src: '/media/cartesia/el-ob-4-creative.png' },
          { src: '/media/cartesia/el-ob-5-api.png' },
        ]}
      />
    ),
  },
  // ② Curated paths
  {
    id: 'ca-compare-nav',
    navLabel: '② Curated paths',
    steps: 1,
    render: () => (
      <CompareSlide
        slideNum="03"
        title="Curated paths — step-by-step questions to reach your goal faster"
        elevenlabs={[
          { src: '/media/cartesia/el-nav-1-agent-creation.mp4', webm: '/media/cartesia/el-nav-1-agent-creation.webm', type: 'video' },
          { src: '/media/cartesia/el-nav-2-voice-agent.mp4', webm: '/media/cartesia/el-nav-2-voice-agent.webm', type: 'video' },
          { src: '/media/cartesia/el-nav-3-voice-creative.mp4', webm: '/media/cartesia/el-nav-3-voice-creative.webm', type: 'video' },
        ]}
      />
    ),
  },
  // ③ Live preview throughout
  {
    id: 'ca-compare-content',
    navLabel: '③ Live preview',
    steps: 1,
    render: () => (
      <CompareSlide
        slideNum="04"
        title="Live preview throughout — a glimpse of what you're building at every step"
        elevenlabs={[
          { src: '/media/cartesia/el-preview-1-agent.png' },
          { src: '/media/cartesia/el-preview-2-widget.png' },
        ]}
      />
    ),
  },

  {
    id: 'ca-writing-compare',
    navLabel: '④ UX writing',
    steps: 1,
    render: () => <SlideWritingCompare />,
  },

  // Part 2 — Concept
  {
    id: 'ca-concept-intro',
    navLabel: 'Concept',
    steps: 1,
    render: () => <SlideConceptIntro />,
  },
  {
    id: 'ca-writeup-0',
    navLabel: 'Writeup · Goal',
    steps: 1,
    render: () => <SlideWriteupGoal />,
  },
  {
    id: 'ca-writeup-1',
    navLabel: 'Writeup · Thesis',
    steps: 1,
    render: () => <SlideWriteupThesis />,
  },
  {
    id: 'ca-writeup-2',
    navLabel: 'Writeup · Focus',
    steps: 1,
    render: () => <SlideWriteupFocus />,
  },
  {
    id: 'ca-writeup-3',
    navLabel: 'Writeup · Cuts',
    steps: 1,
    render: () => <SlideWriteupCuts />,
  },
  {
    id: 'ca-writeup-4',
    navLabel: 'Writeup · Why + Next',
    steps: 1,
    render: () => <SlideWriteupWhy />,
  },
]
