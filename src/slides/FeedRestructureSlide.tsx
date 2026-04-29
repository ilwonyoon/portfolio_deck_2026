import type { SlideRenderContext } from '../types/presentation'

type Props = Pick<SlideRenderContext, 'step'>

export function FeedRestructureSlide({ step = 0 }: Props) {
  return (
    <article
      style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}
      data-node-id="6143:441389"
    >
      {step === 0 ? <Step0 /> : <Step1 />}

      <div
        style={{
          position: 'absolute',
          left: 'calc(8.33% + 2px)',
          top: 487,
          fontFamily: "'General Sans Variable', sans-serif",
          fontWeight: 500,
          fontSize: 44,
          letterSpacing: '0.1px',
          lineHeight: 1.25,
          color: '#fff',
          transform: 'translateY(-50%)',
          width: 465,
        }}
      >
        <p style={{ margin: 0 }}>Home Tour restructure</p>
      </div>
    </article>
  )
}

function Step0() {
  return (
    <div
      style={{
        position: 'absolute',
        left: 'calc(33.33% + 132px)',
        top: 0,
        width: 375,
        height: 1080,
        overflow: 'hidden',
      }}
    >
      <img
        alt=""
        draggable={false}
        src="/media/feed-restructure/screen.png"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}

function Step1() {
  return (
    <>
      {/* Side left image */}
      <div
        style={{
          position: 'absolute',
          left: 'calc(58.33% + 40px)',
          top: 305,
          width: 375,
          height: 375,
          overflow: 'hidden',
        }}
      >
        <img
          alt=""
          draggable={false}
          src="/media/feed-restructure/step2-side-left.png"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Side right image */}
      <div
        style={{
          position: 'absolute',
          left: 'calc(75% + 105px)',
          top: 305,
          width: 375,
          height: 375,
          overflow: 'hidden',
        }}
      >
        <img
          alt=""
          draggable={false}
          src="/media/feed-restructure/step2-side-right.png"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Center card image */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translate(0.5px, 0.5px)',
          width: 375,
          height: 611,
          zIndex: 10,
        }}
      >
        <img
          alt=""
          draggable={false}
          src="/media/feed-restructure/step2-center.png"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </>
  )
}
