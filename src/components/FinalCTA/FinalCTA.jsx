import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import './FinalCTA.css'

export default function FinalCTA() {
  const [ref, isInView] = useInView({ threshold: 0.2 })

  return (
    <section className="cta dark-section" id="cta" ref={ref}>
      <div className="cta__bg-pattern" />
      <div className="cta__bg-glow" />
      <div className="cta__inner container">
        <motion.h2
          className="cta__heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Protect Vision.
          <br />
          Preserve Life.
        </motion.h2>
        <motion.p
          className="cta__description"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Explore a MATLAB + Simulink-based approach to explainable retinal screening support.
        </motion.p>
        <motion.a
          href="#"
          className="cta__btn"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Experience Jeevana Netra
          <span className="cta__btn-arrow">→</span>
        </motion.a>
      </div>
    </section>
  )
}
