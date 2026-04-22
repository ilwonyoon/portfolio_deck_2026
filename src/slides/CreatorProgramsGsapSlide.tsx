import { ProposalBadge } from '../components/ProposalBadge'

const PROGRAMS = [
  { label: 'Content Monetization', src: '/media/creator-programs/program-01.png' },
  { label: 'Ohouse Pro Review', src: '/media/creator-programs/program-02.png' },
  { label: 'Collab Market', src: '/media/creator-programs/program-03.png' },
  { label: 'Ohouse Special Creator', src: '/media/creator-programs/program-04.png' },
] as const

export function CreatorProgramsGsapSlide() {
  return (
    <article
      className="creator-programs-slide creator-programs-slide--gsap"
      data-node-id="6350:134807"
      style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}
    >
      <ProposalBadge label="Proposal · static" />

      {/* Far card — dim 0.8 */}
      <div
        style={{
          position: 'absolute',
          left: 'calc(91.67% + 12.11px)',
          top: 'calc(16.67% + 59px)',
          width: 267.889,
          height: 580.069,
          borderRadius: 34.573,
          overflow: 'hidden',
        }}
      >
        <img
          alt=""
          draggable={false}
          src={PROGRAMS[3].src}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)' }} />
      </div>

      {/* Mid card — dim 0.6 */}
      <div
        style={{
          position: 'absolute',
          left: 'calc(75% + 36.46px)',
          top: 'calc(16.67% + 62.42px)',
          width: 267.058,
          height: 578.269,
          borderRadius: 34.573,
          overflow: 'hidden',
        }}
      >
        <img
          alt=""
          draggable={false}
          src={PROGRAMS[2].src}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      </div>

      {/* Near card — dim 0.2 */}
      <div
        style={{
          position: 'absolute',
          left: 'calc(58.33% + 60px)',
          top: 'calc(16.67% + 61.59px)',
          width: 267.257,
          height: 578.701,
          borderRadius: 34.573,
          overflow: 'hidden',
        }}
      >
        <img
          alt=""
          draggable={false}
          src={PROGRAMS[1].src}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
      </div>

      {/* Center / highlight card — no dim */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 375,
          height: 812,
          borderRadius: 40,
          overflow: 'hidden',
          zIndex: 40,
        }}
      >
        <img
          alt=""
          draggable={false}
          src={PROGRAMS[0].src}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <h2 className="creator-programs-slide__headline">Creator programs</h2>
    </article>
  )
}
