import { useEffect, useState } from 'react'
import './RetinalVisualization.css'

export default function RetinalVisualization() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
  }, [])

  return (
    <div className="retinal-viz" aria-hidden="true">
      {/* Outer rings */}
      <svg className="retinal-viz__rings" viewBox="0 0 500 500">
        <circle cx="250" cy="250" r="240" className="retinal-ring retinal-ring--outer" />
        <circle cx="250" cy="250" r="200" className="retinal-ring retinal-ring--mid" />
        <circle cx="250" cy="250" r="160" className="retinal-ring retinal-ring--inner" />
        {/* Tick marks */}
        {Array.from({ length: 36 }, (_, i) => {
          const angle = (i * 10) * (Math.PI / 180)
          const x1 = 250 + 236 * Math.cos(angle)
          const y1 = 250 + 236 * Math.sin(angle)
          const x2 = 250 + 244 * Math.cos(angle)
          const y2 = 250 + 244 * Math.sin(angle)
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              className="retinal-tick"
              strokeWidth={i % 3 === 0 ? 1.5 : 0.5}
            />
          )
        })}
      </svg>

      {/* Retina core */}
      <div className="retinal-viz__retina">
        <svg viewBox="0 0 300 300" className="retinal-viz__retina-svg">
          {/* Retinal background */}
          <defs>
            <radialGradient id="retinaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a0a2e" />
              <stop offset="30%" stopColor="#2d1b4e" />
              <stop offset="60%" stopColor="#4a2040" />
              <stop offset="80%" stopColor="#6b2030" />
              <stop offset="100%" stopColor="#3d1520" />
            </radialGradient>
            <radialGradient id="discGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f5deb3" />
              <stop offset="60%" stopColor="#dcc090" />
              <stop offset="100%" stopColor="#c4a070" />
            </radialGradient>
            <radialGradient id="foveaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a0820" />
              <stop offset="100%" stopColor="#2d1540" />
            </radialGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Retinal background */}
          <circle cx="150" cy="150" r="140" fill="url(#retinaGrad)" />

          {/* Blood vessels */}
          <g className="retinal-vessels" opacity="0.7">
            <path d="M 135 130 Q 110 100 80 60" stroke="#8b2020" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 135 130 Q 90 120 45 110" stroke="#8b2020" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 135 130 Q 100 150 55 180" stroke="#8b2020" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M 135 130 Q 115 170 90 210" stroke="#8b2020" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 135 130 Q 120 95 110 55" stroke="#8b2020" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Branch vessels */}
            <path d="M 110 100 Q 85 80 60 70" stroke="#7a1a1a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 100 115 Q 75 110 50 95" stroke="#7a1a1a" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 95 145 Q 70 155 45 170" stroke="#7a1a1a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 110 165 Q 85 185 65 205" stroke="#7a1a1a" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 135 130 Q 160 100 200 70" stroke="#8b2020" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 135 130 Q 170 140 210 160" stroke="#8b2020" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 135 130 Q 155 165 180 200" stroke="#8b2020" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Optic disc */}
          <circle cx="135" cy="130" r="18" fill="url(#discGrad)" filter="url(#softGlow)" />
          <circle cx="135" cy="130" r="8" fill="#c4a070" opacity="0.6" />

          {/* Fovea */}
          <circle cx="190" cy="150" r="12" fill="url(#foveaGrad)" />

          {/* AI analysis overlay dots */}
          <g className="retinal-analysis-nodes">
            <circle cx="170" cy="110" r="3" fill="#06B6D4" opacity="0.9" className="analysis-dot analysis-dot--1" />
            <circle cx="195" cy="130" r="2.5" fill="#2563EB" opacity="0.8" className="analysis-dot analysis-dot--2" />
            <circle cx="160" cy="155" r="2" fill="#14B8A6" opacity="0.85" className="analysis-dot analysis-dot--3" />
            <circle cx="180" cy="175" r="2.5" fill="#06B6D4" opacity="0.75" className="analysis-dot analysis-dot--4" />
            <circle cx="200" cy="100" r="2" fill="#2563EB" opacity="0.7" className="analysis-dot analysis-dot--5" />
            <circle cx="145" cy="170" r="2" fill="#14B8A6" opacity="0.8" className="analysis-dot analysis-dot--6" />
          </g>
        </svg>
      </div>

      {/* Scanning beam */}
      {!reducedMotion && (
        <div className="retinal-viz__scan-beam" />
      )}

      {/* Floating labels */}
      <div className={`retinal-viz__labels ${reducedMotion ? 'retinal-viz__labels--static' : ''}`}>
        <div className="retinal-label retinal-label--1">
          <span className="retinal-label__dot retinal-label__dot--blue" />
          RETINAL ANALYSIS
        </div>
        <div className="retinal-label retinal-label--2">
          <span className="retinal-label__dot retinal-label__dot--cyan" />
          AI INSIGHT
        </div>
        <div className="retinal-label retinal-label--3">
          <span className="retinal-label__dot retinal-label__dot--teal" />
          EARLY RISK
        </div>
        <div className="retinal-label retinal-label--4">
          <span className="retinal-label__dot retinal-label__dot--blue" />
          IMAGE QUALITY
        </div>
        <div className="retinal-label retinal-label--5">
          <span className="retinal-label__confidence">92.4%</span>
          CONFIDENCE
        </div>
      </div>

      {/* Fine crosshair lines */}
      <svg className="retinal-viz__crosshair" viewBox="0 0 500 500">
        <line x1="250" y1="0" x2="250" y2="500" className="crosshair-line" />
        <line x1="0" y1="250" x2="500" y2="250" className="crosshair-line" />
      </svg>
    </div>
  )
}
