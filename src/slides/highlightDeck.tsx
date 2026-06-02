import { useEffect, useRef } from 'react'
import { ThinkingOrbit } from '../components/HighlightMark'
import type { SlideDefinition } from '../types/presentation'

// ── Design tokens ──────────────────────────────────────────────────────────
const T = {
  bg: 'var(--bg)',
  paper: '#FEFDF8',
  paperSunken: '#F7F5EF',
  inkPrimary: 'var(--text-primary)',
  inkSecondary: 'var(--text-secondary)',
  inkTertiary: 'var(--text-tertiary)',
  accent: '#E7FE0B',
  accentInk: '#2D3205',
  accentDeep: '#70DB04',
  divider: 'var(--divider)',
  hairline: 'var(--hairline)',
  sans: 'var(--font-sans)',
  display: 'var(--font-display)',
  mono: 'var(--font-mono)',
}

const W = 1920
const H = 1080
const MX = 128
const MY = 96

function Shell({ children, center = true }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div style={{
      width: W, height: H, background: T.bg, fontFamily: T.sans,
      position: 'relative', overflow: 'hidden',
      padding: `${MY}px ${MX}px`, boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
      justifyContent: center ? 'center' : 'flex-start',
    }}>
      {children}
    </div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: T.mono, fontSize: 12, letterSpacing: '0.10em',
      textTransform: 'uppercase', color: T.inkTertiary, marginBottom: 28,
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

function AccentBar() {
  return <div style={{ width: 40, height: 2, background: T.accent, marginBottom: 52 }} />
}

// ── 00 · Cover ────────────────────────────────────────────────────────────
function SlideCover() {
  return (
    <div style={{
      width: W, height: H,
      background: T.bg, fontFamily: T.sans,
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <ThinkingOrbit size={56} color={T.inkPrimary} />
      <div style={{ height: 40 }} />
      <div style={{
        fontFamily: T.display, fontSize: 96, fontWeight: 800,
        lineHeight: 1.0, letterSpacing: '-0.04em',
        color: T.inkPrimary, textAlign: 'center', marginBottom: 20,
      }}>
        Hello
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div style={{
          position: 'absolute',
          left: 0, right: 0,
          top: '50%', transform: 'translateY(-50%)',
          height: '60%',
          background: '#E7FE0B',
          borderRadius: 3,
          animation: 'hl-swipe 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both',
        }} />
        <style>{`
          @keyframes hl-swipe {
            from { clip-path: inset(0 100% 0 0); }
            to   { clip-path: inset(0 0% 0 0); }
          }
        `}</style>
        <div style={{
          position: 'relative',
          fontFamily: T.mono, fontSize: 15, letterSpacing: '0.06em',
          color: T.accentInk, textAlign: 'center',
          padding: '2px 12px',
        }}>
          Ilwon Yoon · June 2, 2026
        </div>
      </div>
    </div>
  )
}

// ── 01 · The Challenge ─────────────────────────────────────────────────────
function SlideChallenge() {
  return (
    <Shell>
      <Eyebrow>The challenge</Eyebrow>
      <div style={{
        fontFamily: T.display, fontSize: 96, fontWeight: 800,
        lineHeight: 1.0, letterSpacing: '-0.04em', color: T.inkPrimary,
        maxWidth: 1000, marginBottom: 56,
      }}>
        Memory without<br />cognitive overload
      </div>
      <AccentBar />
      <div style={{
        fontSize: 24, lineHeight: 1.55, color: T.inkSecondary,
        maxWidth: 740,
      }}>
        Users need transparency and control over what Highlight captures —
        without breaking the magic of ambient intelligence.
      </div>
      <SlideNum n="01" />
    </Shell>
  )
}

// ── 02 · Trust & Performance ───────────────────────────────────────────────
function SlideTrustPerformance() {
  return (
    <Shell>
      <Eyebrow>Big theme</Eyebrow>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginBottom: 72 }}>
        <div style={{
          fontFamily: T.display, fontSize: 120, fontWeight: 800,
          lineHeight: 0.95, letterSpacing: '-0.04em', color: T.inkPrimary,
        }}>
          Trust
        </div>
        <div style={{
          fontFamily: T.display, fontSize: 48, fontWeight: 400,
          lineHeight: 1, letterSpacing: '-0.02em', color: T.inkTertiary,
          paddingBottom: 16,
        }}>
          &
        </div>
        <div style={{
          fontFamily: T.display, fontSize: 120, fontWeight: 800,
          lineHeight: 0.95, letterSpacing: '-0.04em', color: T.inkPrimary,
        }}>
          Performance
        </div>
      </div>

      <div style={{ display: 'flex', gap: 80 }}>
        {[
          { label: 'Transparency', body: "Show what's captured, how, and from where" },
          { label: 'Control', body: 'Make it easy to shape without overwhelming' },
        ].map(item => (
          <div key={item.label} style={{ maxWidth: 400 }}>
            <div style={{
              display: 'inline-block', background: T.accent, color: T.accentInk,
              fontFamily: T.mono, fontSize: 12, letterSpacing: '0.08em',
              textTransform: 'uppercase', padding: '3px 10px', borderRadius: 4,
              marginBottom: 16,
            }}>
              {item.label}
            </div>
            <div style={{ fontSize: 20, lineHeight: 1.55, color: T.inkSecondary }}>
              {item.body}
            </div>
          </div>
        ))}
      </div>
      <SlideNum n="02" />
    </Shell>
  )
}

// ── 03 · Why it matters ────────────────────────────────────────────────────
function SlideWhy() {
  const chain = [
    { top: "No trust in what's stored", bottom: "Users don't connect more data" },
    { top: 'Less data', bottom: 'Weaker context → weaker AI' },
    { top: 'Weaker AI', bottom: 'No reason to stay, no reason to pay' },
  ]

  return (
    <Shell>
      <Eyebrow>Why it matters</Eyebrow>
      <div style={{
        fontFamily: T.display, fontSize: 72, fontWeight: 700,
        lineHeight: 1.05, letterSpacing: '-0.03em', color: T.inkPrimary,
        marginBottom: 88,
      }}>
        Trust is the growth lever<br />
        <span style={{ color: T.inkTertiary, fontWeight: 600 }}>Transparency and control are the means</span>
      </div>

      {/* causal chain */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
        {chain.map((item, i) => (
          <>
            <div key={item.top} style={{
              padding: '32px 40px',
              background: T.paperSunken,
              borderRadius: 16,
              minWidth: 300,
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{ fontSize: 13, color: T.inkTertiary, fontFamily: T.mono, letterSpacing: '0.06em', marginBottom: 10 }}>
                if
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: T.inkPrimary, lineHeight: 1.3, marginBottom: 8 }}>
                {item.top}
              </div>
              <div style={{ fontSize: 16, color: T.inkSecondary, lineHeight: 1.4 }}>
                → {item.bottom}
              </div>
            </div>
            {i < chain.length - 1 && (
              <div key={`arrow-${i}`} style={{
                fontSize: 24, color: T.inkTertiary, padding: '0 24px', flexShrink: 0,
                display: 'flex', alignItems: 'center',
              }}>→</div>
            )}
          </>
        ))}

        {/* payoff */}
        <div style={{ fontSize: 24, color: T.inkTertiary, padding: '0 24px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>→</div>
        <div style={{
          padding: '32px 40px',
          background: T.accent,
          borderRadius: 16,
          minWidth: 280,
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={{ fontSize: 13, color: T.accentInk, fontFamily: T.mono, letterSpacing: '0.06em', marginBottom: 10, opacity: 0.7 }}>
            therefore
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.accentInk, lineHeight: 1.3 }}>
            More connections → more context → conversion
          </div>
        </div>
      </div>
      <SlideNum n="03" />
    </Shell>
  )
}

// ── 04 · Privacy model ─────────────────────────────────────────────────────
function SlidePrivacyModel() {
  const colW = 260

  function Col({
    label, items, accent, note,
  }: { label: string; items: string[]; accent?: boolean; note?: string }) {
    return (
      <div style={{
        width: colW, flexShrink: 0,
        background: accent ? T.accent : T.paperSunken,
        borderRadius: 16, padding: '28px 28px 24px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          fontFamily: T.mono, fontSize: 11, letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: accent ? T.accentInk : T.inkTertiary,
          marginBottom: 20, opacity: accent ? 0.7 : 1,
        }}>
          {label}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map(item => (
            <div key={item} style={{
              fontSize: 15, fontWeight: 500,
              color: accent ? T.accentInk : T.inkPrimary,
              lineHeight: 1.3,
            }}>
              {item}
            </div>
          ))}
        </div>
        {note && (
          <div style={{
            marginTop: 16, fontSize: 13, color: accent ? T.accentInk : T.inkTertiary,
            lineHeight: 1.4, opacity: 0.8,
          }}>
            {note}
          </div>
        )}
      </div>
    )
  }

  return (
    <Shell>
      <Eyebrow>Privacy model</Eyebrow>
      <div style={{
        fontFamily: T.display, fontSize: 64, fontWeight: 700,
        lineHeight: 1.05, letterSpacing: '-0.03em', color: T.inkPrimary,
        marginBottom: 20,
      }}>
        Three layers of control
      </div>
      <div style={{ fontSize: 20, lineHeight: 1.55, color: T.inkSecondary, marginBottom: 32, maxWidth: 900 }}>
        Some privacy is <span style={{ color: T.inkPrimary, fontWeight: 600 }}>objective</span> — passwords, health data, secrets the system can detect.
        {' '}But much of it is <span style={{ color: T.inkPrimary, fontWeight: 600 }}>subjective</span> — what feels private varies by person, team, and org culture. That's why layers 2 and 3 exist.
      </div>

      <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
        {/* Sources */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12,
          width: colW, flexShrink: 0,
          padding: '28px 28px 24px',
          background: T.paperSunken, borderRadius: 16,
        }}>
          <div style={{
            fontFamily: T.mono, fontSize: 11, letterSpacing: '0.10em',
            textTransform: 'uppercase', color: T.inkTertiary, marginBottom: 8,
          }}>Data sources</div>
          {['Connectors', 'Screen capture', 'Audio / clipboard'].map(s => (
            <div key={s} style={{
              padding: '10px 14px', background: 'rgba(35,32,26,0.05)',
              borderRadius: 8, fontSize: 15, color: T.inkSecondary,
            }}>{s}</div>
          ))}
        </div>

        <div style={{ width: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.inkTertiary, fontSize: 20 }}>→</div>

        {/* Layer 1 */}
        <Col
          label="Layer 1 — System"
          items={['Passwords & API keys', 'Health & personal data', 'Work / Not work']}
          note="Auto-detected, never stored"
        />

        <div style={{ width: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.inkTertiary, fontSize: 20 }}>→</div>

        {/* Layer 2 */}
        <Col
          label="Layer 2 — User"
          items={['Blocked apps & sites', 'Blocked channels', 'Blocked keywords']}
          note="Source-level blocking"
        />

        <div style={{ width: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.inkTertiary, fontSize: 20 }}>→</div>

        {/* Layer 3 */}
        <Col
          label="Layer 3 — Filter"
          items={['Keyword filters', 'Content rules', 'Org sharing scope']}
          note="Inside the whitelist — what stays private even in shared memory"
          accent
        />

        <div style={{ width: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.inkTertiary, fontSize: 20 }}>→</div>

        {/* Living Context */}
        <div style={{
          width: colW, flexShrink: 0,
          border: `2px solid ${T.accent}`,
          borderRadius: 16, padding: '28px 28px 24px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            fontFamily: T.mono, fontSize: 11, letterSpacing: '0.10em',
            textTransform: 'uppercase', color: T.accentDeep, marginBottom: 16,
          }}>Living Context</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: T.inkPrimary, marginBottom: 8 }}>Individual memory</div>
          <div style={{ fontSize: 14, color: T.inkSecondary, lineHeight: 1.4 }}>
            → Org shared memory
          </div>
        </div>
      </div>
      <SlideNum n="04" />
    </Shell>
  )
}

// ── 05 · Live Context redesign ─────────────────────────────────────────────

// ── 06 · Meet Dani Reyes ───────────────────────────────────────────────────
function SlideDani() {
  return (
    <div style={{
      width: W, height: H,
      background: T.bg, fontFamily: T.sans,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* left copy */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0, left: MX, width: 480,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <Eyebrow>Who we're designing for</Eyebrow>
        <div style={{
          fontFamily: T.display, fontSize: 64, fontWeight: 800,
          lineHeight: 1.0, letterSpacing: '-0.04em', color: T.inkPrimary,
          marginBottom: 12,
        }}>
          Dani Reyes
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ fontSize: 19, lineHeight: 1.65, color: T.inkSecondary }}>
            To design for a realistic scenario, I created a fictional but grounded persona — a Head of Product at a fast-moving AI startup — with simulated real-world data.
          </div>
          <div style={{
            padding: '24px 28px',
            background: T.paperSunken,
            borderRadius: 14,
            borderLeft: `3px solid ${T.accent}`,
          }}>
            <div style={{
              fontFamily: T.mono, fontSize: 11, letterSpacing: '0.10em',
              textTransform: 'uppercase', color: T.inkTertiary, marginBottom: 10,
            }}>Purpose</div>
            <div style={{ fontSize: 17, lineHeight: 1.6, color: T.inkPrimary }}>
              Set the context for data & privacy — who uses Highlight, what they capture, and what they'd want to protect.
            </div>
          </div>
        </div>
      </div>

      {/* right — persona screenshot */}
      <div style={{
        position: 'absolute',
        top: 96, left: 700, width: 1094, height: 810,
        borderRadius: 24,
        background: T.paperSunken,
        border: `1px solid ${T.hairline}`,
        overflow: 'hidden',
      }}>
        <img
          src="/media/highlight/dani-persona.png"
          alt="Dani Reyes persona"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      <SlideNum n="06" />
    </div>
  )
}

// ── Demo slide template ────────────────────────────────────────────────────
interface DemoSlideProps {
  eyebrow: string
  title: string
  subtitle?: string
  slideNum: string
  placeholderLabel?: string
  video?: string
  videoWebm?: string
}

function DemoSlide({ eyebrow, title, subtitle, slideNum, placeholderLabel, video, videoWebm }: DemoSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [video])
  return (
    <div style={{
      width: W, height: H,
      background: T.bg, fontFamily: T.sans,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* left copy — vertically centered */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: MX,
        width: 440,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: T.mono, fontSize: 12, letterSpacing: '0.10em',
          textTransform: 'uppercase', color: T.inkTertiary, marginBottom: 20,
        }}>
          {eyebrow}
        </div>
        <div style={{
          fontFamily: T.display, fontSize: 48, fontWeight: 700,
          lineHeight: 1.1, letterSpacing: '-0.025em', color: T.inkPrimary,
          marginBottom: subtitle ? 20 : 0,
          whiteSpace: 'pre-line',
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 18, lineHeight: 1.55, color: T.inkSecondary }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* right media stage */}
      <div style={{
        position: 'absolute',
        top: 96,
        left: 680,
        width: 1114,
        height: 810,
        borderRadius: 24,
        background: '#000',
        border: `1px solid ${T.hairline}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {video ? (
          <video
            key={video}
            ref={videoRef}
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          >
            {videoWebm && <source src={videoWebm} type="video/webm" />}
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <div style={{
            fontFamily: T.mono, fontSize: 13, color: T.inkTertiary,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {placeholderLabel ?? '— media —'}
          </div>
        )}
      </div>

      <SlideNum n={slideNum} />
    </div>
  )
}

// ── Demo 04 — Proactive (custom left column with principles) ──────────────
function DemoSlideProactive({ slideNum, video, videoWebm }: { slideNum: string; video?: string; videoWebm?: string }) {
  const principles = [
    { kw: 'Proactive', body: 'Not a memory dump — the most relevant Live Context to act on right now' },
    { kw: 'First citizen', body: 'Surfaces at the right moment — morning & end of day, not buried in settings' },
  ]

  return (
    <div style={{
      width: W, height: H,
      background: T.bg, fontFamily: T.sans,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* left copy */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0, left: MX, width: 480,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: T.mono, fontSize: 12, letterSpacing: '0.10em',
          textTransform: 'uppercase', color: T.inkTertiary, marginBottom: 20,
        }}>Demo 04</div>
        <div style={{
          fontFamily: T.display, fontSize: 48, fontWeight: 700,
          lineHeight: 1.1, letterSpacing: '-0.025em', color: T.inkPrimary,
          whiteSpace: 'pre-line', marginBottom: 40,
        }}>
          {'Not memory.\nYour next move.'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {principles.map((p, i) => (
            <div key={p.kw} style={{
              paddingTop: 20, paddingBottom: 20,
              borderTop: `1.5px solid ${i === 0 ? T.accent : T.divider}`,
            }}>
              <div style={{
                fontFamily: T.mono, fontSize: 11, letterSpacing: '0.08em',
                color: i === 0 ? T.accentInk : T.inkTertiary,
                background: i === 0 ? T.accent : 'transparent',
                display: 'inline-block', padding: i === 0 ? '2px 8px' : 0,
                borderRadius: 4, marginBottom: 8,
              }}>{p.kw}</div>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: T.inkSecondary }}>{p.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* right media stage */}
      <div style={{
        position: 'absolute',
        top: 96, left: 700, width: 1094, height: 810,
        borderRadius: 24,
        background: '#000',
        border: `1px solid ${T.hairline}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {video ? (
          <video key={video} loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            ref={el => { if (el) el.play().catch(() => {}) }}>
            {videoWebm && <source src={videoWebm} type="video/webm" />}
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <div style={{ fontFamily: T.mono, fontSize: 13, color: T.inkTertiary, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Proactive Live Context — video
          </div>
        )}
      </div>

      <SlideNum n={slideNum} />
    </div>
  )
}

// ── Demo slides ────────────────────────────────────────────────────────────
const DEMO_SLIDES: (DemoSlideProps & { id: string; navLabel: string })[] = [
  {
    id: 'hl-demo-live-context',
    navLabel: 'Live Context',
    eyebrow: 'Demo 01',
    title: 'What\'s connected,\nwhat\'s protected',
    subtitle: 'See every source, its capture status, and your privacy posture — at a glance.',
    slideNum: '07',
    placeholderLabel: undefined,
    video: '/media/highlight/live-context.mp4',
    videoWebm: '/media/highlight/live-context.webm',
  },
  {
    id: 'hl-demo-privacy',
    navLabel: 'Privacy settings',
    eyebrow: 'Demo 02',
    title: 'Privacy settings',
    subtitle: 'Blocked sites, filtered keywords, scoped sharing — everything in one place.',
    slideNum: '08',
    placeholderLabel: undefined,
    video: '/media/highlight/privacy-settings.mp4',
    videoWebm: '/media/highlight/privacy-settings.webm',
  },
  {
    id: 'hl-demo-ai-privacy',
    navLabel: 'AI-assisted privacy',
    eyebrow: 'Demo 03',
    title: 'Privacy, without\nthe settings tax',
    subtitle: 'Tell it what matters. AI runs a full audit — nothing slips through, no clicks wasted.',
    slideNum: '09',
    placeholderLabel: undefined,
    video: '/media/highlight/ai-privacy.mp4',
    videoWebm: '/media/highlight/ai-privacy.webm',
  },
  {
    id: 'hl-demo-proactive',
    navLabel: 'Proactive context',
    eyebrow: 'Demo 04',
    title: 'Not memory.\nYour next move.',
    subtitle: undefined,
    slideNum: '10',
    placeholderLabel: undefined,
    video: '/media/highlight/proactive.mp4',
    videoWebm: '/media/highlight/proactive.webm',
  },
  {
    id: 'hl-demo-design-system',
    navLabel: 'Design system',
    eyebrow: 'Demo 05',
    title: 'Design system\n& visual exploration',
    subtitle: 'Every token, component, and motion pattern — built to ship.',
    slideNum: '11',
    placeholderLabel: undefined,
    video: '/media/highlight/design-system.mp4',
    videoWebm: '/media/highlight/design-system.webm',
  },
]

// ── 12 · What's next ──────────────────────────────────────────────────────
function SlideWhatsNext() {
  return (
    <Shell>
      <Eyebrow>What's next</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 120, alignItems: 'start' }}>
        <div>
          <div style={{
            fontFamily: T.display, fontSize: 64, fontWeight: 700,
            lineHeight: 1.05, letterSpacing: '-0.03em', color: T.inkPrimary,
            marginBottom: 32,
          }}>
            Single player<br />is the easy part
          </div>
          <div style={{ fontSize: 20, lineHeight: 1.6, color: T.inkSecondary }}>
            Privacy is relatively simple when it's just you. The real complexity
            starts when Highlight becomes a{' '}
            <span style={{ color: T.inkPrimary, fontWeight: 600 }}>Shared Intelligence Layer</span>
            {' '}— and what you capture flows into team memory.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 8 }}>
          {[
            {
              tag: 'This build',
              title: 'Single player',
              body: 'Heavy and light users both covered. NLP-driven controls. No settings tax.',
              accent: true,
            },
            {
              tag: 'Next',
              title: 'Org-level shared intelligence',
              body: 'Admin draws hard lines once. Individuals get lightweight control within guardrails. Privacy rules that compose — not collide.',
            },
            {
              tag: 'Tipping point',
              title: 'The architecture already points there',
              body: "The layered model scales to org level. What an admin controls vs. what an individual controls is the same question — just at different scopes.",
            },
          ].map(item => (
            <div key={item.tag} style={{
              padding: '28px 32px',
              background: item.accent ? T.accent : T.paperSunken,
              borderRadius: 14,
            }}>
              <div style={{
                fontFamily: T.mono, fontSize: 11, letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: item.accent ? T.accentInk : T.inkTertiary,
                opacity: item.accent ? 0.7 : 1,
                marginBottom: 10,
              }}>{item.tag}</div>
              <div style={{
                fontSize: 17, fontWeight: 600,
                color: item.accent ? T.accentInk : T.inkPrimary,
                marginBottom: 8,
              }}>{item.title}</div>
              <div style={{
                fontSize: 15, lineHeight: 1.55,
                color: item.accent ? T.accentInk : T.inkSecondary,
                opacity: item.accent ? 0.85 : 1,
              }}>{item.body}</div>
            </div>
          ))}
        </div>
      </div>
      <SlideNum n="12" />
    </Shell>
  )
}

// ── 13 · Thank you ────────────────────────────────────────────────────────
function SlideEnd() {
  return (
    <div style={{
      width: W, height: H,
      background: T.bg,
      fontFamily: T.sans,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ThinkingOrbit size={80} color={T.inkPrimary} />
      <div style={{ height: 48 }} />
      <div style={{
        fontFamily: T.display, fontSize: 96, fontWeight: 800,
        lineHeight: 1.0, letterSpacing: '-0.04em',
        color: T.inkPrimary,
        marginBottom: 32, textAlign: 'center',
      }}>
        The End
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div style={{
          position: 'absolute',
          left: 0, right: 0,
          top: '50%', transform: 'translateY(-50%)',
          height: '65%',
          background: '#E7FE0B',
          borderRadius: 3,
          animation: 'hl-swipe 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both',
        }} />
        <div style={{
          position: 'relative',
          fontFamily: T.display, fontSize: 28, fontWeight: 700,
          letterSpacing: '-0.01em',
          color: T.accentInk, textAlign: 'center',
          padding: '2px 16px',
        }}>
          Ask me any questions!
        </div>
      </div>
    </div>
  )
}

// ── deck ───────────────────────────────────────────────────────────────────
export const highlightSlides: SlideDefinition[] = [
  { id: 'hl-cover',          navLabel: 'Cover',        steps: 1, render: () => <SlideCover /> },
  { id: 'hl-challenge',       navLabel: 'Challenge',    steps: 1, render: () => <SlideChallenge /> },
  { id: 'hl-trust',           navLabel: 'Trust',        steps: 1, render: () => <SlideTrustPerformance /> },
  { id: 'hl-why',             navLabel: 'Why',          steps: 1, render: () => <SlideWhy /> },
  { id: 'hl-privacy',         navLabel: 'Privacy model',steps: 1, render: () => <SlidePrivacyModel /> },
  { id: 'hl-dani',            navLabel: 'Dani',         steps: 1, render: () => <SlideDani /> },
  ...DEMO_SLIDES.map(s => {
    if (s.id === 'hl-demo-proactive') {
      return {
        id: s.id,
        navLabel: s.navLabel,
        steps: 1,
        render: () => <DemoSlideProactive slideNum={s.slideNum} video={s.video} videoWebm={s.videoWebm} />,
      }
    }
    return {
      id: s.id,
      navLabel: s.navLabel,
      steps: 1,
      render: () => <DemoSlide {...s} />,
    }
  }),
  { id: 'hl-whats-next', navLabel: "What's next", steps: 1, render: () => <SlideWhatsNext /> },
  { id: 'hl-end',        navLabel: 'Thank you',   steps: 1, render: () => <SlideEnd /> },
]
