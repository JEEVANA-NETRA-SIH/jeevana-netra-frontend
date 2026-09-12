import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import './OurTeam.css'

const members = [
  {
    num: '01',
    name: 'Preethi K',
    role: 'Team Leader · AI-Assisted Full-Stack Developer',
    desc: 'Overall team leadership and coordination, project planning, AI-assisted full-stack development, technical decision-making, module integration, and SIH execution strategy.',
    initials: 'PK',
    tags: ['Leadership', 'Full-Stack', 'Integration'],
  },
  {
    num: '02',
    name: 'Naga Neeraj Pasupuleti',
    role: 'Ideation Lead · AI-Assisted Full-Stack Developer',
    desc: 'Core idea development and innovation, solution architecture, AI-assisted full-stack development, feature planning, frontend/backend integration, deployment, and technical implementation.',
    initials: 'NN',
    tags: ['Ideation', 'Architecture', 'Development'],
  },
  {
    num: '03',
    name: 'Suryateja Reddy Yanamala',
    role: 'Documentation · Presentation & Business Lead',
    desc: 'Technical and SIH documentation, feasibility and scalability analysis, business and impact analysis, competitor research, PPT content, and presentation coordination.',
    initials: 'SR',
    tags: ['Documentation', 'Business', 'Presentation'],
  },
  {
    num: '04',
    name: 'Ram Charan R V',
    role: 'Dataset Lead · DR Technical Researcher',
    desc: 'Dataset identification and collection, dataset organization and preprocessing, diabetic retinopathy research, technical DR study, and supporting AI/ML requirements with relevant data.',
    initials: 'RC',
    tags: ['Datasets', 'DR Research', 'AI/ML'],
  },
  {
    num: '05',
    name: 'Ravali Yarramaddu',
    role: 'Project Visual Lead · Presentation Lead',
    desc: 'Jeevana Netra\'s visual identity, product visuals, architecture and workflow diagrams, posters, project graphics, PPT visual design, and presentation support.',
    initials: 'RY',
    tags: ['Visual Design', 'PPT', 'Branding'],
  },
  {
    num: '06',
    name: 'Pavan Pragna S',
    role: 'AI Prompt & Visual Generation Lead · Medical Domain Lead',
    desc: 'AI prompting strategy, AI-generated visuals, medical-domain research, diabetic retinopathy understanding, medical terminology validation, and bridging medical requirements with the technical team.',
    initials: 'PP',
    tags: ['AI Prompting', 'Medical Research', 'Visuals'],
  },
]

function GlowCard({ member, index, isInView }) {
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--glow-x', `${x}px`)
    card.style.setProperty('--glow-y', `${y}px`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--glow-x', '-100px')
    card.style.setProperty('--glow-y', '-100px')
  }, [])

  return (
    <motion.div
      className="ot-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="ot-card__glow" aria-hidden="true" />
      <div className="ot-card__number" aria-hidden="true">{member.num}</div>

      <div className="ot-card__avatar">
        <div className="ot-card__avatar-ring" />
        <div className="ot-card__avatar-ring ot-card__avatar-ring--inner" />
        <span className="ot-card__initials">{member.initials}</span>
      </div>

      <div className="ot-card__body">
        <h4 className="ot-card__name">{member.name}</h4>
        <span className="ot-card__role">{member.role}</span>
        <p className="ot-card__desc">{member.desc}</p>
        <div className="ot-card__tags">
          {member.tags.map((tag) => (
            <span key={tag} className="ot-card__tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function OurTeam() {
  const [ref, isInView] = useInView({ threshold: 0.08 })

  const reveal = (delay, distance = 24) => ({
    initial: { opacity: 0, y: distance },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="ot" ref={ref} id="our-team">
      {/* Subtle background decoration */}
      <div className="ot__bg" aria-hidden="true">
        <div className="ot__bg-dot ot__bg-dot--1" />
        <div className="ot__bg-dot ot__bg-dot--2" />
        <div className="ot__bg-dot ot__bg-dot--3" />
        <div className="ot__bg-line ot__bg-line--1" />
        <div className="ot__bg-line ot__bg-line--2" />
        <div className="ot__bg-line ot__bg-line--3" />
      </div>

      <div className="ot__inner container">

        {/* ── Section Header ── */}
        <div className="ot__header">
          <motion.span className="section-label" {...reveal(0.08)}>
            OUR TEAM
          </motion.span>
          <motion.h2 className="ot__heading" {...reveal(0.14)}>
            Meet the Team Behind{' '}
            <span className="ot__heading-accent">Jeevana Netra.</span>
          </motion.h2>
          <motion.p className="ot__subtitle" {...reveal(0.2)}>
            Technology, Innovation & Collaboration for Better Vision
          </motion.p>
          <motion.p className="ot__lede" {...reveal(0.26)}>
            A multidisciplinary student team combining artificial intelligence, technology,
            research, design, and innovation to build an accessible solution for early
            diabetic retinopathy screening.
          </motion.p>
        </div>

        {/* ── Institution Card ── */}
        <motion.div className="ot__inst" {...reveal(0.12)}>
          <div className="ot__inst-glass" />
          <div className="ot__inst-inner">
            <div className="ot__inst-logo">
              <img src="/mitslogo.jpg" alt="Madanapalle Institute of Technology & Science logo" />
            </div>
            <div className="ot__inst-info">
              <h3 className="ot__inst-name">
                Madanapalle Institute of Technology &amp; Science
              </h3>
              <span className="ot__inst-type">Deemed to be University</span>
              <p className="ot__inst-tagline">Innovating technology for a healthier future.</p>
            </div>
            <span className="ot__inst-badge">SIH 2026 · Jeevana Netra</span>
          </div>
        </motion.div>

        {/* ── Team Grid ── */}
        <div className="ot__grid">
          {members.map((m, i) => (
            <GlowCard key={m.num} member={m} index={i} isInView={isInView} />
          ))}
        </div>

        {/* ── Bottom Statement ── */}
        <motion.div className="ot__bottom" {...reveal(0.3)}>
          <h3 className="ot__bottom-heading">
            One Team. One Vision. One Purpose.
          </h3>
          <p className="ot__bottom-text">
            Building technology that can help make diabetic retinopathy screening
            more accessible, explainable, and impactful.
          </p>
          <div className="ot__bottom-line" aria-hidden="true">
            <span className="ot__bottom-dot" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
