import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import './ProblemSection.css'

const stages = [
  {
    label: 'Healthy Retina',
    description: 'Normal retinal structure with clear blood vessels and healthy optic nerve.',
    severity: 0,
    image: '/healthyretina.jpeg',
  },
  {
    label: 'Subtle Changes',
    description: 'Early microvascular changes may begin to appear in the retinal tissue.',
    severity: 1,
    image: '/subtlechanges.jpeg',
  },
  {
    label: 'Progression Risk',
    description: 'Without screening, early signs can go undetected for extended periods.',
    severity: 2,
    image: '/progressionrisk.jpeg',
  },
  {
    label: 'Potential Vision Impact',
    description: 'Advanced changes may lead to more significant vision concerns.',
    severity: 3,
    image: '/potentialvisionimpact.jpeg',
  },
]

export default function ProblemSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 })

  return (
    <section className="problem" ref={ref}>
      <div className="problem__inner container">
        <div className="problem__header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            THE CHALLENGE
          </motion.span>
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Vision loss can begin silently.
          </motion.h2>
          <motion.p
            className="section-subheading"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Diabetic retinopathy can progress without obvious symptoms. Earlier
            screening can help identify potential retinal changes before vision
            loss becomes severe.
          </motion.p>
        </div>

        <div className="problem__stages">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.label}
              className={`problem__stage problem__stage--severity-${stage.severity}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
            >
              <div className="problem__stage-visual">
                <img className="problem__stage-img" src={stage.image} alt={stage.label} loading="lazy" />
                {i < stages.length - 1 && (
                  <div className="problem__stage-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="problem__stage-content">
                <h3 className="problem__stage-label">{stage.label}</h3>
                <p className="problem__stage-desc">{stage.description}</p>
              </div>
              <div className="problem__stage-indicator">
                <div
                  className="problem__stage-bar"
                  style={{ width: `${(stage.severity + 1) * 25}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="problem__transition"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="problem__transition-ring" aria-hidden="true" />
          <img
            className="problem__transition-bg"
            src="/What if potential retinal risk could be identified earlier.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <motion.p
            className="problem__transition-text"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            What if potential retinal risk could be{' '}
            <span className="problem__transition-accent">identified earlier</span>?
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
