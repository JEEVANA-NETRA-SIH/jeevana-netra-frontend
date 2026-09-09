import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import './ImpactSection.css'

const journey = [
  'RETINAL IMAGE',
  'AI-ASSISTED SCREENING',
  'VISUAL EVIDENCE',
  'PROFESSIONAL REVIEW',
  'EARLIER ACTION',
]

const pillars = [
  {
    num: '01',
    title: 'EARLIER',
    text: 'Support earlier identification of potential retinal risk.',
  },
  {
    num: '02',
    title: 'ACCESSIBLE',
    text: 'Bring structured screening closer to underserved communities.',
  },
  {
    num: '03',
    title: 'EXPLAINABLE',
    text: 'Make AI-assisted results easier to review and communicate.',
  },
]

export default function ImpactSection() {
  const [ref, isInView] = useInView({ threshold: 0.12 })

  const reveal = (delay, distance = 24) => ({
    initial: { opacity: 0, y: distance },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="impact dark-section" id="impact" ref={ref}>
      <div className="impact__inner container">
        <div className="impact__header">
          <motion.span className="section-label section-label--light" {...reveal(0)}>
            IMPACT
          </motion.span>
          <motion.h2 className="impact__heading" {...reveal(0.08)}>
            Technology that{' '}
            <span className="impact__heading-accent">reaches people.</span>
          </motion.h2>
          <motion.p className="impact__lede" {...reveal(0.16)}>
            Earlier awareness. Wider access. Clearer understanding.
          </motion.p>
        </div>

        <motion.div className="impact__journey" {...reveal(0.12)}>
          <img
            className="impact__journey-bg"
            src="/subtlechanges.jpeg"
            alt=""
            aria-hidden="true"
          />
          <div className="impact__journey-shade" aria-hidden="true" />
          <div className="impact__journey-flow">
            {journey.map((step, i) => (
              <motion.div className="impact__journey-step" key={step} {...reveal(0.18 + i * 0.07)}>
                {i < journey.length - 1 && (
                  <span className="impact__journey-line" aria-hidden="true" />
                )}
                <span className="impact__journey-node">{step}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="impact__pillars">
          {pillars.map((p, i) => (
            <motion.div className="impact__pillar" key={p.num} {...reveal(0.2 + i * 0.08)}>
              {i < pillars.length - 1 && <span className="impact__pillar-line" aria-hidden="true" />}
              <span className="impact__pillar-num">{p.num}</span>
              <h3 className="impact__pillar-title">{p.title}</h3>
              <p className="impact__pillar-text">{p.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.blockquote className="impact__statement" {...reveal(0.24)}>
          Better screening starts with better access, better understanding, and timely{' '}
          <span className="impact__statement-accent">human review.</span>
        </motion.blockquote>
      </div>
    </section>
  )
}
