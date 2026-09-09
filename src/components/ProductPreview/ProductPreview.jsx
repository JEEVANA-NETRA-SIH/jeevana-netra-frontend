import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import { Activity, User, Clock, FileText, Eye, Scan, BadgeAlert, ImagePlus } from 'lucide-react'
import './ProductPreview.css'

export default function ProductPreview() {
  const [ref, isInView] = useInView({ threshold: 0.15 })

  return (
    <section className="preview" id="screening" ref={ref}>
      <div className="preview__inner container">
        <div className="preview__header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            SCREENING EXPERIENCE
          </motion.span>
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A glimpse into the screening experience.
          </motion.h2>
        </div>

        <motion.div
          className="preview__dashboard"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Browser chrome */}
          <div className="preview__browser">
            <div className="preview__browser-dots">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
            </div>
            <div className="preview__browser-url">
              <span className="preview__browser-url-text">app.jeevananetra.ai/screening</span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="preview__content">
            <div className="preview__sidebar">
              <div className="preview__sidebar-logo">
                <Eye size={16} strokeWidth={1.8} />
                <span>Jeevana Netra</span>
              </div>
              <nav className="preview__sidebar-nav">
                <a className="preview__sidebar-link preview__sidebar-link--active">Screening</a>
                <a className="preview__sidebar-link">Patients</a>
                <a className="preview__sidebar-link">Reports</a>
                <a className="preview__sidebar-link">Settings</a>
              </nav>
            </div>

            <div className="preview__main">
              {/* Header */}
              <div className="preview__main-header">
                <div>
                  <div className="preview__eyebrow">Demo Screening</div>
                  <h3 className="preview__main-title">Retinal Screening Console</h3>
                  <p className="preview__main-subtitle">Illustrative Result — Not a Clinical Diagnosis</p>
                </div>
                <div className="preview__main-actions">
                  <button className="preview__btn preview__btn--outline">
                    <FileText size={14} />
                    Generate Report
                  </button>
                  <button className="preview__btn preview__btn--primary">
                    <Eye size={14} />
                    View Explanation
                  </button>
                </div>
              </div>

              <div className="preview__grid">
                {/* Patient info */}
                <div className="preview__info-card">
                  <div className="preview__info-row">
                    <span className="preview__info-label">
                      <User size={12} /> Patient ID
                    </span>
                    <span className="preview__info-value">SCREEN-0142</span>
                  </div>
                  <div className="preview__info-row">
                    <span className="preview__info-label">
                      <Clock size={12} /> Screening Date
                    </span>
                    <span className="preview__info-value">Sep 3, 2026</span>
                  </div>
                  <div className="preview__info-row">
                    <span className="preview__info-label">
                      <Activity size={12} /> Status
                    </span>
                    <span className="preview__info-value preview__info-value--status">
                      <span className="preview__status-dot" />
                      Demo Analysis Complete
                    </span>
                  </div>
                  <div className="preview__info-row">
                    <span className="preview__info-label">
                      <Scan size={12} /> Image Quality
                    </span>
                    <span className="preview__info-value">Acceptable after enhancement</span>
                  </div>
                </div>

                {/* Risk assessment */}
                <div className="preview__risk-card">
                  <div className="preview__risk-header">
                    <span className="preview__risk-title">AI-Assisted Assessment</span>
                  </div>
                  <div className="preview__risk-level">
                    <div className="preview__risk-indicator">
                      <div className="preview__risk-bar">
                        <div className="preview__risk-fill" style={{ width: '58%' }} />
                      </div>
                    </div>
                    <span className="preview__risk-label">ICDR Level 2</span>
                  </div>
                  <div className="preview__risk-badges">
                    <span><BadgeAlert size={12} /> Referable DR review suggested</span>
                    <span><ImagePlus size={12} /> Lesion evidence available</span>
                  </div>
                  <div className="preview__risk-confidence">
                    <span className="preview__risk-conf-label">Confidence</span>
                    <span className="preview__risk-conf-value">Illustrative confidence 92.4%</span>
                  </div>
                  <p className="preview__risk-note">Demo value only. Model performance metrics will be reported after evaluation on the selected test dataset.</p>
                </div>

                {/* Retinal image */}
                <div className="preview__image-card">
                  <span className="preview__image-label">Retinal Image</span>
                  <div className="preview__retinal-img">
                    <svg viewBox="0 0 200 160">
                      <defs>
                        <radialGradient id="prevRetina" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#2d1b4e" />
                          <stop offset="100%" stopColor="#3d1520" />
                        </radialGradient>
                      </defs>
                      <circle cx="100" cy="80" r="70" fill="url(#prevRetina)" opacity="0.8" />
                      <circle cx="85" cy="70" r="8" fill="#c4a070" opacity="0.6" />
                      <g opacity="0.5">
                        <path d="M 85 70 Q 60 45 35 20" stroke="#8b2020" strokeWidth="1.5" fill="none" />
                        <path d="M 85 70 Q 55 65 25 55" stroke="#8b2020" strokeWidth="1.2" fill="none" />
                        <path d="M 85 70 Q 65 85 35 105" stroke="#8b2020" strokeWidth="1" fill="none" />
                        <path d="M 85 70 Q 110 50 145 30" stroke="#8b2020" strokeWidth="1.2" fill="none" />
                        <path d="M 85 70 Q 115 80 150 95" stroke="#8b2020" strokeWidth="1" fill="none" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Explanation heatmap */}
                <div className="preview__image-card preview__image-card--heatmap">
                  <span className="preview__image-label">Grad-CAM + Lesion Evidence</span>
                  <div className="preview__retinal-img preview__retinal-img--heatmap">
                    <svg viewBox="0 0 200 160">
                      <defs>
                        <radialGradient id="prevHeat1" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="rgba(37, 99, 235, 0.5)" />
                          <stop offset="100%" stopColor="rgba(37, 99, 235, 0)" />
                        </radialGradient>
                        <radialGradient id="prevHeat2" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="rgba(6, 182, 212, 0.4)" />
                          <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                        </radialGradient>
                      </defs>
                      <circle cx="100" cy="80" r="70" fill="url(#prevRetina)" opacity="0.8" />
                      <circle cx="85" cy="70" r="8" fill="#c4a070" opacity="0.5" />
                      <ellipse cx="110" cy="60" rx="28" ry="22" fill="url(#prevHeat1)" className="xai-heat-pulse" />
                      <ellipse cx="125" cy="85" rx="18" ry="15" fill="url(#prevHeat2)" className="xai-heat-pulse" style={{ animationDelay: '0.5s' }} />
                      <text x="100" y="152" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontWeight="600" letterSpacing="0.08em">EXPLANATION VISUALIZATION</text>
                    </svg>
                  </div>
                </div>

                <div className="preview__summary-card">
                  <div className="preview__summary-title">Screening Summary</div>
                  <p>Image quality acceptable after enhancement. AI-assisted grading indicates ICDR Level 2. Visual evidence highlights areas consistent with referable DR review.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating elements */}
        <div className="preview__floaters">
          <motion.div
            className="preview__floater preview__floater--1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Activity size={14} />
            <span>AI-assisted analysis</span>
          </motion.div>
          <motion.div
            className="preview__floater preview__floater--2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Eye size={14} />
            <span>Explainable results</span>
          </motion.div>
        </div>

        <motion.div
          className="preview__human"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="preview__human-stage">
            <span className="preview__human-role">AI</span>
            <strong>ASSISTS</strong>
          </div>
          <div className="preview__human-arrow">→</div>
          <div className="preview__human-stage">
            <span className="preview__human-role">Health Worker</span>
            <strong>REVIEWS</strong>
          </div>
          <div className="preview__human-arrow">→</div>
          <div className="preview__human-stage">
            <span className="preview__human-role">Ophthalmologist</span>
            <strong>CLINICAL FOLLOW-UP</strong>
          </div>
        </motion.div>
        <p className="preview__human-note">AI assists. Humans make clinical decisions.</p>
      </div>
    </section>
  )
}
