import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import './ExplainableAI.css'

const journey = [
  {
    num: '01',
    label: 'IMAGE',
    text: 'Retinal fundus photograph',
  },
  {
    num: '02',
    label: 'AI MODEL',
    text: 'AI-assisted analysis',
  },
  {
    num: '03',
    label: 'GRAD-CAM',
    text: 'Model attention visualized',
  },
  {
    num: '04',
    label: 'VISUAL EVIDENCE',
    text: 'Regions for review',
  },
]

export default function ExplainableAI() {
  const [ref, isInView] = useInView({ threshold: 0.12 })

  const reveal = (delay, distance = 24) => ({
    initial: { opacity: 0, y: distance },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="xai" id="explainable-ai" ref={ref}>
      <div className="xai__inner container">
        <div className="xai__header">
          <motion.span className="section-label" {...reveal(0)}>
            EXPLAINABLE AI
          </motion.span>
          <motion.h2 className="xai__heading" {...reveal(0.08)}>
            See why the model is{' '}
            <span className="xai__heading-accent">paying attention.</span>
          </motion.h2>
          <motion.p className="xai__lede" {...reveal(0.16)}>
            Jeevana Netra makes AI-assisted retinal screening more interpretable by visualizing
            model attention and potential contributing retinal regions.
          </motion.p>
        </div>

        <motion.div className="xai__comparison" {...reveal(0.12)}>
          <div className="xai__panel xai__panel--original">
            <span className="xai__panel-tag">ORIGINAL</span>
            <div className="xai__panel-img">
              <img src="/subtlechanges.jpeg" alt="Original retinal fundus image" />
            </div>
          </div>

          <div className="xai__mid">
            <span className="xai__mid-label">AI ANALYSIS</span>
            <span className="xai__mid-arrow" aria-hidden="true">→</span>
          </div>

          <div className="xai__panel xai__panel--cam">
            <span className="xai__panel-tag">GRAD-CAM</span>
            <div className="xai__panel-img">
              <img src="/grandcamview.jpeg" alt="Grad-CAM highlighted retinal regions" />
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
          </div>
        </motion.div>

        <motion.div className="xai__result" {...reveal(0.2)}>
          <div className="xai__result-brand">AI-ASSISTED ASSESSMENT</div>
          <div className="xai__result-value">ICDR Level 2</div>
          <div className="xai__result-note">Visual evidence available</div>
        </motion.div>

        <motion.div className="xai__journey" {...reveal(0.24)}>
          {journey.map((step, i) => (
            <motion.div className="xai__journey-step" key={step.num} {...reveal(0.26 + i * 0.08)}>
              {i < journey.length - 1 && <span className="xai__journey-line" aria-hidden="true" />}
              <div className="xai__journey-num">{step.num}</div>
              <h4 className="xai__journey-label">{step.label}</h4>
              <p className="xai__journey-text">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p className="xai__disclaimer" {...reveal(0.32)}>
          Illustrative AI-assisted visualization — for professional review, not a diagnosis.
        </motion.p>
      </div>
    </section>
  )
}
