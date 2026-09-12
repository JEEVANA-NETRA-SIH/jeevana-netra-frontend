import { useMemo } from 'react'
import { ASSET_MANIFEST } from './assets'
import useAppLoader from './useAppLoader'
import './JeevanaLoader.css'

const RING_RADII = [58, 84, 110] // % of the retina stage

function useParticles() {
  return useMemo(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return []

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
    const count = isMobile ? 8 : 16

    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.7
      const radius = 42 + (i % 4) * 9 // 42%–69% from center
      const x = 50 + Math.cos(angle) * radius
      const y = 50 + Math.sin(angle) * radius
      return {
        key: i,
        x: `${x.toFixed(2)}%`,
        y: `${y.toFixed(2)}%`,
        size: 2 + (i % 3) * 1.5,
        delay: (i % 5) * 0.7,
        duration: 3.6 + (i % 3) * 1.4,
      }
    })
  }, [])
}

export default function JeevanaLoader({ onComplete }) {
  const { displayPct, message, phase } = useAppLoader({ onComplete })
  const particles = useParticles()
  const pct = Math.round(displayPct)
  const className = [
    'jn-loader',
    phase === 'ready' ? 'jn-loader--ready' : '',
    phase === 'exiting' ? 'jn-loader--exiting' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={className}
      role="status"
      aria-live="polite"
      aria-label="Loading Jeevana Netra"
    >
      {/* Ambient light background */}
      <div className="jn-loader__bg" aria-hidden="true">
        <span className="jn-loader__blob jn-loader__blob--cyan" />
        <span className="jn-loader__blob jn-loader__blob--blue" />
        <span className="jn-loader__blob jn-loader__blob--teal" />
        <span className="jn-loader__grid" />
      </div>

      {/* Retina / eye-inspired instrument */}
      <div className="jn-loader__retina" aria-hidden="true">
        <span className="jn-loader__retina-glow" />
        {RING_RADII.map((r, i) => (
          <span
            key={r}
            className={`jn-loader__ring jn-loader__ring--${i + 1}`}
            style={{ width: `${r}%`, height: `${r}%` }}
          />
        ))}
        <span className="jn-loader__scan" />
        {particles.map((p) => (
          <span
            key={p.key}
            className="jn-loader__particle"
            style={{
              left: p.x,
              top: p.y,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Brand */}
      <div className="jn-loader__content">
        <div className="jn-loader__logo-wrap">
          <span className="jn-loader__glow" aria-hidden="true" />
          <img
            className="jn-loader__logo"
            src={ASSET_MANIFEST.brandLogo}
            alt=""
            aria-hidden="true"
          />
        </div>
        <h1 className="jn-loader__title">JEEVANA NETRA</h1>
        <p className="jn-loader__tagline">Protecting Vision. Preserving Life.</p>
      </div>

      {/* Dynamic status */}
      <div className="jn-loader__status">
        <p className="jn-loader__message" key={message}>
          {message}
        </p>
        <div
          className="jn-loader__bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label={`Loading progress ${pct}%`}
        >
          <div className="jn-loader__bar-fill" style={{ width: `${pct}%` }}>
            <span className="jn-loader__bar-shine" />
          </div>
        </div>
        <div className="jn-loader__readout">
          <span className="jn-loader__pct">{pct}%</span>
        </div>
      </div>

      {/* PT footer / project hint */}
      <div className="jn-loader__meta" aria-hidden="true">
        <span>AI · Retinal Screening</span>
        <span className="jn-loader__meta-sep">/</span>
        <span>SIH26038 · MathWorks</span>
      </div>

      <span className="jn-loader__sweep" aria-hidden="true" />
    </div>
  )
}