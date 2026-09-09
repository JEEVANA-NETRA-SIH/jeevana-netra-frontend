import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import './Differentiators.css'

const jeevanaFlow = [
  'Retinal Image',
  'AI-Assisted Analysis',
  'Visual Evidence',
  'Professional Review',
  'Follow-up',
]

const traditionalFlow = ['Prediction', 'Result']

const differentiators = [
  {
    num: '01',
    title: 'EXPLAINABLE',
    text: 'Visual evidence alongside the AI-assisted assessment.',
  },
  {
    num: '02',
    title: 'HUMAN-LED',
    text: 'AI supports healthcare professionals, not replaces them.',
  },
  {
    num: '03',
    title: 'FIELD-AWARE',
    text: 'Designed with real-world rural screening constraints in mind.',
  },
  {
    num: '04',
    title: 'WORKFLOW-READY',
    text: 'Connects screening, review and follow-up in one flow.',
  },
]

export default function Differentiators() {
  const [ref, isInView] = useInView({ threshold: 0.12 })

  const reveal = (delay, distance = 24) => ({
    initial: { opacity: 0, y: distance },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="diff" ref={ref} id="differentiation">
      <div className="diff__inner container">
        <div className="diff__header">
          <motion.span className="section-label" {...reveal(0)}>
            WHY JEEVANA NETRA
          </motion.span>
          <motion.h2 className="diff__heading" {...reveal(0.08)}>
            Different <span className="diff__heading-accent">by design.</span>
          </motion.h2>
          <motion.p className="diff__lede" {...reveal(0.16)}>
            Built to make retinal screening more explainable, human-led and practical for
            real-world use.
          </motion.p>
        </div>

        <motion.div className="diff__compare" {...reveal(0.12)}>
          <div className="diff__side diff__side--traditional">
            <div className="diff__side-head">TRADITIONAL AI</div>
            <div className="diff__side-steps">
              {traditionalFlow.map((step, i) => (
                <div className="diff__t-step" key={step}>
                  <span className="diff__t-node">
                    <span className="diff__t-dot" aria-hidden="true" />
                    <span className="diff__t-label">{step}</span>
                  </span>
                  {i < traditionalFlow.length - 1 && (
                    <span className="diff__t-line" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="diff__vs">
            <span>vs</span>
          </div>

          <div className="diff__side diff__side--jeevana">
            <div className="diff__side-head">JEEVANA NETRA</div>
            <div className="diff__side-steps">
              {jeevanaFlow.map((step, i) => (
                <motion.div className="diff__j-step" key={step} {...reveal(0.2 + i * 0.08)}>
                  <span className="diff__j-node">
                    <span className="diff__j-num">{i + 1}</span>
                    <span className="diff__j-label">{step}</span>
                  </span>
                  {i < jeevanaFlow.length - 1 && (
                    <span className="diff__j-line" aria-hidden="true" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div className="diff__list" {...reveal(0.2)}>
          {differentiators.map((d, i) => (
            <motion.div className="diff__item" key={d.num} {...reveal(0.22 + i * 0.07)}>
              {i < differentiators.length - 1 && (
                <span className="diff__item-line" aria-hidden="true" />
              )}
              <span className="diff__item-num">{d.num}</span>
              <div className="diff__item-body">
                <h3 className="diff__item-title">{d.title}</h3>
                <p className="diff__item-text">{d.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
