import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMousePosition } from '../../hooks'
import './Hero.css'

export default function Hero() {
  const mouse = useMousePosition()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
  }, [])

  return (
    <section className="hero" id="hero">
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/herovideo.mp4" type="video/mp4" />
      </video>
      <div className="hero__video-overlay" aria-hidden="true" />
      <div className="hero__bg-gradient" />
      <div className="hero__inner container">
        <div className="hero__content">
          <motion.div
            className="hero__project-tag"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
          >
            Built for SIH 2026 • SIH26038 • MathWorks
          </motion.div>

          <motion.h1
            className="hero__heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Your Eyes Tell a Story.
            <br />
            We Help You <span className="hero__heading-accent">See It Early.</span>
          </motion.h1>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Jeevana Netra combines AI-assisted retinal screening with explainable
            insights to help identify potential diabetic retinopathy risks earlier
            and support accessible eye care.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <a href="#cta" className="hero__btn hero__btn--primary">
              Start Screening
              <span className="hero__btn-arrow">→</span>
            </a>
            <a href="#roadmap" className="hero__btn hero__btn--secondary">
              Explore Technology
            </a>
          </motion.div>

          <motion.div
            className="hero__trustline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            MATLAB + Simulink • Explainable AI • Retinal Image Intelligence
          </motion.div>

          <motion.div
            className="hero__microcopy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <span>AI-assisted screening</span>
            <span className="hero__microcopy-sep">•</span>
            <span>Explainable results</span>
            <span className="hero__microcopy-sep">•</span>
            <span>Designed for wider access</span>
          </motion.div>

          <motion.p
            className="hero__meta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
          >
            Demo prototype for SIH 2026 • SIH26038 • MathWorks problem statement
          </motion.p>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={!reducedMotion ? {
            transform: `translate(${mouse.x * 6}px, ${mouse.y * 6}px)`,
          } : undefined}
        >
          <img
            className="hero__svg-image"
            src="/Herosectionsvg.png"
            alt="Retinal screening visualization"
          />
        </motion.div>
      </div>
    </section>
  )
}
