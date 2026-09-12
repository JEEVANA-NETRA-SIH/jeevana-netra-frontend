import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Image as ImageIcon, Cpu, Sparkles, ScanEye, ChevronDown } from 'lucide-react'
import { useInView } from '../../hooks'
import './ExplainableAI.css'

const journey = [
  { num: '01', label: 'IMAGE', text: 'Retinal fundus photograph', icon: ImageIcon },
  { num: '02', label: 'AI MODEL', text: 'AI-assisted analysis', icon: Cpu },
  { num: '03', label: 'GRAD-CAM', text: 'Model attention visualized', icon: Sparkles },
  { num: '04', label: 'VISUAL EVIDENCE', text: 'Regions for review', icon: ScanEye },
]

const viewModes = [
  { id: 'original', label: 'Original' },
  { id: 'compare', label: 'Compare' },
  { id: 'gradcam', label: 'Grad-CAM' },
]

export default function ExplainableAI() {
  const [ref, isInView] = useInView({ threshold: 0.12 })
  const [view, setView] = useState('compare')
  const reduce = useReducedMotion()

  const reveal = (delay = 0, distance = 24) => ({
    initial: reduce ? false : { opacity: 0, y: distance },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="xai" id="explainable-ai" ref={ref} aria-label="Explainable AI">
      <div className="xai__particles" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <span className={`xai__particle xai__particle--${i + 1}`} key={i} />
        ))}
      </div>

      <div className="xai__inner container">
        {/* ---------- Header ---------- */}
        <div className="xai__header">
          <motion.span className="xai__eyebrow" {...reveal(0)}>
            EXPLAINABLE AI
          </motion.span>
          <motion.h2 className="xai__heading" {...reveal(0.08, 30)}>
            See why the model is{' '}
            <span className="xai__heading-accent">paying attention.</span>
          </motion.h2>
          <motion.p className="xai__lede" {...reveal(0.16)}>
            Jeevana Netra makes AI-assisted retinal screening more interpretable by visualizing
            model attention and potential contributing retinal regions.
          </motion.p>
        </div>

        {/* ---------- AI analysis studio ---------- */}
        <motion.div className="xai__workspace" {...reveal(0.12, 34)}>
          <span className="xai__corner xai__corner--tl" aria-hidden="true" />
          <span className="xai__corner xai__corner--tr" aria-hidden="true" />
          <span className="xai__corner xai__corner--bl" aria-hidden="true" />
          <span className="xai__corner xai__corner--br" aria-hidden="true" />

          <div className="xai__workspace-head">
            <span className="xai__workspace-title">AI ANALYSIS STUDIO</span>
            <span className="xai__workspace-status">
              <span className="xai__live-dot" aria-hidden="true" />
              LIVE PREVIEW
            </span>
          </div>

          <div className={`xai__stage xai__stage--${view}`}>
            <motion.div
              className="xai__panel xai__panel--original"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="xai__panel-tag">ORIGINAL</span>
              <div className="xai__panel-img">
                <img
                  src="/subtlechanges.jpeg"
                  alt="Original retinal fundus image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>

            <motion.div
              className="xai__mid"
              initial={reduce ? false : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.34 }}
              aria-hidden="true"
            >
              <span className="xai__mid-line" />
              <span className="xai__mid-node">
                <span className="xai__mid-label">AI ANALYSIS</span>
                <ChevronDown className="xai__mid-chevron" size={14} strokeWidth={2.2} />
                <span className="xai__mid-sub">MODEL ATTENTION</span>
              </span>
              <span className="xai__mid-line" />
            </motion.div>

            <motion.div
              className="xai__panel xai__panel--cam"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="xai__panel-tag">GRAD-CAM</span>
              <div className="xai__panel-img">
                <img
                  src="/grandcamview.jpeg"
                  alt="Grad-CAM highlighted retinal regions"
                  loading="lazy"
                  decoding="async"
                />
                <div className="xai__scan-bars" aria-hidden="true">
                  <span className="xai__scan-bar xai__scan-bar--1" />
                  <span className="xai__scan-bar xai__scan-bar--2" />
                  <span className="xai__scan-bar xai__scan-bar--3" />
                </div>
                <div className="xai__scan-line" aria-hidden="true" />
                <span className="xai__pin xai__pin--1" aria-hidden="true" />
                <span className="xai__pin xai__pin--2" aria-hidden="true" />
                <span className="xai__pin xai__pin--3" aria-hidden="true" />
              </div>
            </motion.div>
          </div>

          <div className="xai__view-switch" role="group" aria-label="Image view mode">
            {viewModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`xai__view-btn ${view === mode.id ? 'xai__view-btn--active' : ''}`}
                aria-pressed={view === mode.id}
                onClick={() => setView(mode.id)}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ---------- Assessment + why ---------- */}
        <div className="xai__insights">
          <motion.div className="xai__assessment" {...reveal(0.26)}>
            <span className="xai__assessment-brand">AI-ASSISTED ASSESSMENT</span>
            <div className="xai__assessment-value">ICDR Level 2</div>
            <div className="xai__assessment-scale" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((level) => (
                <span
                  key={level}
                  className={`xai__scale-seg ${level <= 2 ? 'xai__scale-seg--filled' : ''}`}
                />
              ))}
            </div>
            <div className="xai__scale-label" aria-hidden="true">
              <span>LEVEL 0</span>
              <span>LEVEL 4</span>
            </div>
            <div className="xai__assessment-note">
              <span className="xai__note-dot" aria-hidden="true" />
              Visual evidence available
            </div>
          </motion.div>

          <motion.div className="xai__why" {...reveal(0.32)}>
            <span className="xai__why-tag">WHY?</span>
            <h3 className="xai__why-title">Why is the model paying attention?</h3>
            <p className="xai__why-text">
              The visualization highlights retinal regions that contributed to the model's
              prediction, helping reviewers understand the AI output.
            </p>
            <ul className="xai__why-list">
              <li>
                <span className="xai__why-dot" aria-hidden="true" />
                Model attention
              </li>
              <li>
                <span className="xai__why-dot" aria-hidden="true" />
                Highlighted retinal regions
              </li>
              <li>
                <span className="xai__why-dot" aria-hidden="true" />
                Areas for professional review
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ---------- AI pipeline ---------- */}
        <div className="xai__pipeline">
          {journey.map((step, i) => (
            <motion.div className="xai__pipe-step" key={step.num} {...reveal(0.34 + i * 0.09)}>
              <span className="xai__pipe-head">
                <span className="xai__pipe-icon">
                  <step.icon size={20} strokeWidth={1.6} />
                </span>
                <span className="xai__pipe-num">{step.num}</span>
              </span>
              <h4 className="xai__pipe-label">{step.label}</h4>
              <p className="xai__pipe-text">{step.text}</p>
            </motion.div>
          ))}
        </div>

        {/* ---------- Disclaimer ---------- */}
        <motion.p className="xai__disclaimer" {...reveal(0.5)}>
          Illustrative AI-assisted visualization — for professional review, not a diagnosis.
        </motion.p>
      </div>
    </section>
  )
}