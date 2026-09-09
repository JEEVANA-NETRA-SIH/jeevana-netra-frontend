import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from '../../hooks'
import './QuoteSection.css'

export default function QuoteSection() {
  const [ref, isInView] = useInView({ threshold: 0.35 })
  const reduce = useReducedMotion()

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="quote" ref={ref} id="gift-of-sight" aria-label="The gift of sight">
      <div className="quote__bg" aria-hidden="true">
        <img
          className="quote__bg-img"
          src="/beautifleyeslook.jpeg"
          alt=""
          loading="lazy"
        />
        <div className="quote__bg-overlay" />
      </div>

      <motion.div className="quote__inner container" {...fadeUp(0.05)}>
        <span className="quote__label">THE GIFT OF SIGHT</span>
        <blockquote className="quote__text">
          Embrace the beauty of the world through the{' '}
          <span className="quote__accent">gift&nbsp;of&nbsp;sight</span>.
        </blockquote>
      </motion.div>
    </section>
  )
}
