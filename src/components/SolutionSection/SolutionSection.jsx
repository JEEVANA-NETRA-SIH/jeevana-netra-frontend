import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from '../../hooks'
import './SolutionSection.css'

const flow = [
  'FUNDUS IMAGE',
  'MATLAB',
  'AI ANALYSIS',
  'EXPLAINABILITY',
  'SIMULINK',
]

const techs = [
  'Image Processing',
  'Computer Vision',
  'Deep Learning',
  'Medical Imaging',
  'Simulink',
]

export default function SolutionSection() {
  const [ref, isInView] = useInView({ threshold: 0.12 })
  const reduce = useReducedMotion()

  const reveal = (delay, distance = 24) => ({
    initial: { opacity: 0, y: reduce ? 0 : distance },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="solution" ref={ref} id="technology">
      <div className="solution__inner container">
        <div className="solution__header">
          <motion.span className="section-label" {...reveal(0)}>
            MATLAB + SIMULINK
          </motion.span>
          <motion.h2 className="solution__heading" {...reveal(0.08)}>
            Built for intelligent{' '}
            <span className="solution__heading-accent">retinal screening.</span>
          </motion.h2>
          <motion.p className="solution__lede" {...reveal(0.16)}>
            Jeevana Netra combines MATLAB&apos;s image processing, computer vision and deep
            learning capabilities with Simulink to model an explainable retinal screening workflow.
          </motion.p>
        </div>

        <div className="solution__visual">
          <motion.div className="solution__retina-wrap" {...reveal(0.1)}>
            <div className="solution__retina">
              <img src="/subtlechanges.jpeg" alt="Retinal fundus image" />
              <div className="solution__retina-shade" aria-hidden="true" />
              <div className="solution__retina-scan" aria-hidden="true" />
              <span className="solution__retina-pin solution__retina-pin--1" aria-hidden="true" />
              <span className="solution__retina-pin solution__retina-pin--2" aria-hidden="true" />
              <span className="solution__retina-label">FUNDUS IMAGE</span>
            </div>
          </motion.div>

          <motion.div className="solution__flow" {...reveal(0.2)}>
            {flow.map((step, i) => (
              <div className="solution__flow-step" key={step}>
                <div className="solution__flow-node">
                  {i === flow.length - 1 ? (
                    <span className="solution__flow-mark" aria-hidden="true">→</span>
                  ) : null}
                  <span className="solution__flow-label">{step}</span>
                </div>
                {i < flow.length - 1 && <span className="solution__flow-line" aria-hidden="true" />}
              </div>
            ))}
          </motion.div>

          <motion.div className="solution__techs" {...reveal(0.28)}>
            {techs.map((t, i) => (
              <span key={t} className="solution__tech">
                {t}
                {i < techs.length - 1 && <span className="solution__tech-dot" aria-hidden="true" />}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
