import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from '../../hooks'
import './MeetJeevanaNetra.css'

const capabilities = [
  {
    num: '01',
    title: 'SCREEN',
    desc: 'Analyze retinal fundus images and assess whether image quality is suitable for AI-assisted screening.',
  },
  {
    num: '02',
    title: 'EXPLAIN',
    desc: 'Surface model attention and potential retinal features so reviewers can see where the system is focusing.',
  },
  {
    num: '03',
    title: 'SUPPORT',
    desc: 'Turn analysis into structured screening insights that can support healthcare-worker and ophthalmologist review.',
  },
]

const chips = [
  { label: 'IMAGE QUALITY', value: 'Acceptable', ok: true },
  { label: 'AI-ASSISTED SCREENING', value: 'Analysis available', ok: true },
  { label: 'VISUAL EVIDENCE', value: 'Regions highlighted', ok: true },
  { label: 'RETINAL STRUCTURE', value: 'Detected', ok: true },
]

const markers = [
  { top: '26%', left: '30%' },
  { top: '42%', left: '66%' },
  { top: '66%', left: '46%' },
]

export default function MeetJeevanaNetra() {
  const [ref, isInView] = useInView({ threshold: 0.15 })
  const reduce = useReducedMotion()

  const fadeUp = (delay, distance = 24) => ({
    initial: { opacity: 0, y: reduce ? 0 : distance },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="meet" ref={ref} id="meet">
      <div className="meet__inner container">
        <div className="meet__layout">
          <div className="meet__left">
            <motion.span className="section-label" {...fadeUp(0)}>
              MEET JEEVANA NETRA
            </motion.span>
            <motion.h2 className="meet__heading" {...fadeUp(0.08)}>
              Screen. <span className="meet__heading-soft">Explain.</span>{' '}
              <span className="meet__heading-accent">Support.</span>
            </motion.h2>
            <motion.p className="meet__lede" {...fadeUp(0.16)}>
              AI-assisted retinal screening designed to help identify potential retinal risk earlier —
              while making the result easier to review.
            </motion.p>

            <div className="meet__capabilities">
              {capabilities.map((cap, i) => (
                <motion.div key={cap.num} className="meet__cap" {...fadeUp(0.22 + i * 0.1)}>
                  {i < capabilities.length - 1 && (
                    <span className="meet__cap-connector" aria-hidden="true" />
                  )}
                  <div className="meet__cap-num">{cap.num}</div>
                  <div className="meet__cap-indicator" aria-hidden="true">
                    <span className="meet__cap-dot" />
                  </div>
                  <div className="meet__cap-body">
                    <h3 className="meet__cap-title">{cap.title}</h3>
                    <p className="meet__cap-desc">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="meet__right">
            <motion.div
              className="meet__console"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="meet__console-head">
                <span className="meet__console-title">JEEVANA NETRA INTELLIGENCE</span>
                <span className="meet__console-status">
                  <span className="meet__console-pulse" />
                  ANALYZING
                </span>
              </div>

              <div className="meet__retina">
                <div className="meet__retina-orbit meet__retina-orbit--1" aria-hidden="true" />
                <div className="meet__retina-orbit meet__retina-orbit--2" aria-hidden="true" />

                <video
                  className="meet__retina-video"
                  src="/meetjeevananetravideo.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Jeevana Netra screening demonstration video"
                />

                <div className="meet__ai-overlay" aria-hidden="true">
                  <div className="meet__ai-scan" />
                  {markers.map((m, i) => (
                    <motion.span
                      key={i}
                      className="meet__ai-marker"
                      style={{ top: m.top, left: m.left }}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.9 + i * 0.18 }}
                    >
                      <span className="meet__ai-marker-core" />
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.div className="meet__chips" {...fadeUp(0.55, 0)}>
                {chips.map((chip, i) => (
                  <motion.div
                    key={chip.label}
                    className="meet__chip"
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.12 }}
                  >
                    <span className={`meet__chip-check ${chip.ok ? 'is-ok' : ''}`}>
                      {chip.ok ? '✓' : ''}
                    </span>
                    <span className="meet__chip-text">
                      <strong>{chip.label}</strong>
                      {chip.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
