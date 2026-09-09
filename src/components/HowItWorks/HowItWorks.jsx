import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, ShieldCheck, ScanSearch, Activity, Sparkles, FileText } from 'lucide-react'
import './HowItWorks.css'

const steps = [
  {
    num: '01',
    title: 'Fundus Image Input',
    description: 'Retinal image captured using a fundus camera',
    icon: Camera,
    image: '/howitworks-1.jpeg',
    detail: 'The pipeline begins with a retinal image from a portable fundus camera or standard screening setup.',
    tags: ['Fundus Camera', 'Image Capture'],
  },
  {
    num: '02',
    title: 'Image Quality Assessment',
    description: 'Check image quality and enhance borderline images',
    icon: ShieldCheck,
    image: '/howitworks-2.jpeg',
    detail: 'Images are reviewed for quality, illumination and noise before analysis begins.',
    tags: ['CLAHE', 'Illumination Normalization', 'Denoising'],
  },
  {
    num: '03',
    title: 'Retinal Structure & Lesion Analysis',
    description: 'Analyze relevant retinal structures and potential lesions',
    icon: ScanSearch,
    image: '/howitworks-3.jpeg',
    detail: 'The model examines vascular structures, optic disc, fovea and lesion candidates such as microaneurysms, exudates, hemorrhages and neovascularization.',
    tags: ['Blood vessels', 'Optic disc', 'Fovea', 'Microaneurysms', 'Exudates', 'Hemorrhages', 'Neovascularization'],
  },
  {
    num: '04',
    title: 'DR Severity Grading',
    description: 'AI-assisted grading using the ICDR scale',
    icon: Activity,
    image: '/howitworks-4.jpeg',
    detail: 'The system is designed to classify diabetic retinopathy according to the International Clinical Diabetic Retinopathy (ICDR) framework.',
    tags: ['Level 0 — No DR', 'Level 1 — Mild NPDR', 'Level 2 — Moderate NPDR', 'Level 3 — Severe NPDR', 'Level 4 — Proliferative DR'],
  },
  {
    num: '05',
    title: 'Explainable AI',
    description: 'Generate visual explanations using Grad-CAM and lesion-level evidence',
    icon: Sparkles,
    image: '/howitworks-5.jpeg',
    detail: 'Attention maps and lesion evidence provide visual context for the model\'s AI-assisted assessment.',
    tags: ['Grad-CAM', 'Lesion-level evidence', 'Visual explanation'],
  },
  {
    num: '06',
    title: 'Screening Report',
    description: 'Generate a structured screening summary for healthcare worker/ophthalmologist review',
    icon: FileText,
    image: '/howitworks-6.jpeg',
    detail: 'The output is a structured report intended to support clinical review, referral decisions and follow-up workflows.',
    tags: ['Structured report', 'Review support', 'Follow-up workflow'],
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = rect.height
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / (sectionHeight - window.innerHeight))
      const stepIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length))
      setActiveStep(stepIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="how-it-works" id="how-it-works" ref={sectionRef}>
      <div className="how-it-works__inner container">
        <div className="how-it-works__header">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            HOW IT WORKS
          </motion.span>
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Six-stage retinal screening pipeline.
          </motion.h2>
        </div>

        <div className="how-it-works__layout">
          <div className="how-it-works__steps">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`how-it-works__step ${i === activeStep ? 'how-it-works__step--active' : ''} ${i < activeStep ? 'how-it-works__step--completed' : ''}`}
              >
                <div className="how-it-works__step-num-wrap">
                  <span className="how-it-works__step-num">{step.num}</span>
                  {i < steps.length - 1 && <div className="how-it-works__step-line" />}
                </div>
                <div className="how-it-works__step-content">
                  <div className="how-it-works__step-icon">
                    <step.icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="how-it-works__step-title">{step.title}</h3>
                  <p className="how-it-works__step-desc">{step.description}</p>
                  {i === activeStep && (
                    <motion.p
                      className="how-it-works__step-detail"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.4 }}
                    >
                      {step.detail}
                    </motion.p>
                  )}
                  <div className="how-it-works__tags">
                    {step.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="how-it-works__visual">
            <div className="how-it-works__visual-frame">
              <div className="how-it-works__visual-content">
                {steps.map((step, i) => (
                  <motion.img
                    key={step.image}
                    className={`how-it-works__visual-img ${i === activeStep ? 'how-it-works__visual-img--active' : ''}`}
                    src={step.image}
                    alt={step.title}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    initial={false}
                    animate={i === activeStep ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </div>
              <div className="how-it-works__visual-status">
                <div className={`hw-status-dot ${activeStep >= 0 ? 'hw-status-dot--active' : ''}`} />
                <span className="hw-status-text">
                  {steps[activeStep].title} • Step {activeStep + 1} of {steps.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
