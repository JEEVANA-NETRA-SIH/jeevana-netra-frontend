import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import './TrainingRoadmapSection.css'

const roadmap = [
  { num: '01', label: 'Baseline DR Severity Model', phase: 'prototype' },
  { num: '02', label: 'Image Quality Assessment', phase: 'prototype' },
  { num: '03', label: 'Retinal Structure & Lesion Analysis', phase: 'prototype' },
  { num: '04', label: 'Grad-CAM Explainability', phase: 'prototype' },
  { num: '05', label: 'Simulink Workflow Simulation', phase: 'development' },
  { num: '06', label: 'Integrated Screening Interface', phase: 'development' },
  { num: '07', label: 'Evaluation Against Clinical Benchmarks', phase: 'future' },
]

const phases = [
  { key: 'prototype', label: 'Prototype' },
  { key: 'development', label: 'Development' },
  { key: 'future', label: 'Future Evaluation' },
]

export default function TrainingRoadmapSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section className="roadmap" id="roadmap" ref={ref}>
      <div className="roadmap__inner container">
        <div className="roadmap__header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            DEVELOPMENT ROADMAP
          </motion.span>
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From prototype to evaluated system.
          </motion.h2>
        </div>

        <div className="roadmap__legend">
          {phases.map((p) => (
            <span key={p.key} className="roadmap__legend-item">
              <span className={`roadmap__phase-dot roadmap__phase-dot--${p.key}`} />
              {p.label}
            </span>
          ))}
        </div>

        <div className="roadmap__track">
          {roadmap.map((item, i) => (
            <motion.div
              key={item.num}
              className={`roadmap__step roadmap__step--${item.phase}`}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              {i < roadmap.length - 1 && <span className="roadmap__connector" />}
              <div className={`roadmap__node roadmap__node--${item.phase}`}>
                <span className="roadmap__num">{item.num}</span>
              </div>
              <span className="roadmap__label">{item.label}</span>
            </motion.div>
          ))}
        </div>

        <p className="roadmap__note">
          Model performance metrics will be reported after evaluation on the selected test dataset.
          No clinical claims are made at this prototype stage.
        </p>
      </div>
    </section>
  )
}
