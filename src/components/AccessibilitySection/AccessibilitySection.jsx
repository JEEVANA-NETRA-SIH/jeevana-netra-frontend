import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import './AccessibilitySection.css'

const journey = [
  { label: 'CAPTURE', text: 'Retinal image taken' },
  { label: 'CHECK', text: 'Quality assessed' },
  { label: 'EXPLAIN', text: 'AI attention shown' },
  { label: 'REVIEW', text: 'Professional review' },
  { label: 'FOLLOW-UP', text: 'Referral decision' },
]

const differentiators = [
  {
    title: 'Image quality',
    text: 'Quality assessment before AI-assisted analysis.',
  },
  {
    title: 'Specialist access',
    text: 'Healthcare-worker workflow with professional review.',
  },
  {
    title: 'AI transparency',
    text: 'Grad-CAM and visual evidence instead of only a prediction.',
  },
  {
    title: 'Rural simplicity',
    text: 'A structured, low-complexity screening experience.',
  },
]

export default function AccessibilitySection() {
  const [ref, isInView] = useInView({ threshold: 0.12 })

  const reveal = (delay, distance = 24) => ({
    initial: { opacity: 0, y: distance },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="accessibility" ref={ref}>
      <div className="accessibility__inner container">
        <motion.div className="accessibility__header" {...reveal(0)}>
          <span className="section-label">RURAL INDIA</span>
          <h2 className="accessibility__heading">
            Bringing retinal screening{' '}
            <span className="accessibility__heading-accent">closer to where people live.</span>
          </h2>
          <p className="accessibility__lede">
            Designed for primary and community healthcare settings where image quality, specialist
            access and screening resources can vary.
          </p>
        </motion.div>

        {/* Main visual */}
        <motion.div className="accessibility__visual" {...reveal(0.1)}>
          <img
            className="accessibility__visual-img"
            src="/ruralindia.jpeg"
            alt="Healthcare worker using a portable fundus camera with a patient in an Indian rural primary-care setting"
          />
          <div className="accessibility__visual-caption">
            Portable fundus camera · Primary healthcare
          </div>
        </motion.div>

        {/* Screening journey */}
        <motion.div className="accessibility__journey" {...reveal(0.18)}>
          {journey.map((step, i) => (
            <motion.div className="accessibility__journey-step" key={step.label} {...reveal(0.2 + i * 0.07)}>
              {i < journey.length - 1 && <span className="accessibility__journey-line" aria-hidden="true" />}
              <div className="accessibility__journey-num">{String(i + 1).padStart(2, '0')}</div>
              <h4 className="accessibility__journey-label">{step.label}</h4>
              <p className="accessibility__journey-text">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Differentiator */}
        <motion.div className="accessibility__why" {...reveal(0.22)}>
          <div className="accessibility__why-head">
            <h3 className="accessibility__why-title">WHY JEEVANA NETRA?</h3>
          </div>
          <div className="accessibility__differentiators">
            {differentiators.map((d, i) => (
              <motion.div className="accessibility__differentiator" key={d.title} {...reveal(0.24 + i * 0.07)}>
                <h4 className="accessibility__differentiator-title">{d.title}</h4>
                <p className="accessibility__differentiator-text">{d.text}</p>
              </motion.div>
            ))}
          </div>
          <p className="accessibility__why-note">
            Jeevana Netra is a prototype that combines these capabilities into one explainable
            screening workflow — it is going to be the best rural AI screening solution in India.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
