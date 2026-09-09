import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import './OurTeam.css'

const members = [
  {
    num: '01',
    name: 'Preethi K',
    role: 'Team Leader & Backend Development',
    desc: 'Leading the Jeevana Netra team and contributing to the backend architecture and technical development of the project.',
    initials: 'PK',
  },
  {
    num: '02',
    name: 'Naga Neeraj Pasupuleti',
    role: 'Frontend, UI/UX & Ideation Member',
    desc: 'Responsible for frontend development, user experience, website interaction, and communication and coordination with the team.',
    initials: 'NN',
  },
  {
    num: '03',
    name: 'Ram Charan R V',
    role: 'Dataset Research & Development Support',
    desc: 'Responsible for collecting and organizing datasets while providing technical and development support to the project team.',
    initials: 'RC',
  },
  {
    num: '04',
    name: 'Ravali Yarramaddu',
    role: 'Presentation & Research Elements',
    desc: 'Responsible for PPT development, presentation structure, and collecting important project and research elements.',
    initials: 'RY',
  },
  {
    num: '05',
    name: 'Pavan Pragna S',
    role: 'AI Prompting & Visual Presentation',
    desc: 'Responsible for AI image prompting, visual content development, and supporting presentation creation.',
    initials: 'PP',
  },
  {
    num: '06',
    name: 'Suryateja Reddy Yanamala',
    role: 'Project Testing & Solution Specialist',
    desc: 'Responsible for testing the project, identifying potential issues, evaluating the solution, and improving the overall user experience.',
    initials: 'SR',
  },
]

export default function OurTeam() {
  const [ref, isInView] = useInView({ threshold: 0.08 })

  const reveal = (delay, distance = 24) => ({
    initial: { opacity: 0, y: distance },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="ourteam" ref={ref} id="our-team">
      <div className="ourteam__inner container">

        {/* Section Header */}
        <div className="ourteam__header">
          <motion.span className="section-label" {...reveal(0.1)}>
            OUR TEAM
          </motion.span>
          <motion.h2 className="ourteam__heading" {...reveal(0.16)}>
            Meet the Team Behind{' '}
            <span className="ourteam__heading-accent">Jeevana Netra.</span>
          </motion.h2>
          <motion.p className="ourteam__subtitle" {...reveal(0.22)}>
            Technology, Innovation & Collaboration for Better Vision
          </motion.p>
          <motion.p className="ourteam__lede" {...reveal(0.28)}>
            A multidisciplinary student team combining artificial intelligence, technology,
            research, and innovation to build an accessible solution for early diabetic
            retinopathy detection.
          </motion.p>
        </div>

        {/* College Identity */}
        <motion.div className="ourteam__college" {...reveal(0.1)}>
          <div className="ourteam__college-badge">
            <div className="ourteam__college-logo">
              <img src="/mitslogo.jpg" alt="Madanapalle Institute of Technology & Science logo" />
            </div>
          </div>
          <h3 className="ourteam__college-name">MADANAPALLE INSTITUTE OF TECHNOLOGY & SCIENCE</h3>
          <span className="ourteam__college-type">Deemed to be University</span>
          <div className="ourteam__college-divider" aria-hidden="true" />
          <p className="ourteam__college-tagline">Innovating technology for a healthier future.</p>
        </motion.div>

        {/* Team Members */}
        <div className="ourteam__grid">
          {members.map((m, i) => (
            <motion.div
              key={m.num}
              className="ourteam__member"
              {...reveal(0.2 + i * 0.06)}
            >
              <div className="ourteam__member-card">
                <div className="ourteam__member-index">{m.num}</div>
                <div className="ourteam__member-avatar">
                  <div className="ourteam__member-initials">{m.initials}</div>
                  <div className="ourteam__member-retina-ring" />
                  <div className="ourteam__member-retina-ring ourteam__member-retina-ring--inner" />
                </div>
                <div className="ourteam__member-info">
                  <h4 className="ourteam__member-name">{m.name}</h4>
                  <span className="ourteam__member-role">{m.role}</span>
                  <p className="ourteam__member-desc">{m.desc}</p>
                </div>
                <div className="ourteam__member-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div className="ourteam__bottom" {...reveal(0.3)}>
          <div className="ourteam__bottom-pattern" aria-hidden="true">
            <svg viewBox="0 0 1200 200" className="ourteam__bottom-svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="tNet" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="100" r="80" fill="none" stroke="#14B8A6" strokeWidth="0.4" opacity="0.15" />
              <circle cx="600" cy="100" r="100" fill="none" stroke="#2563EB" strokeWidth="0.5" opacity="0.1" />
              <circle cx="1000" cy="100" r="70" fill="none" stroke="#06B6D4" strokeWidth="0.4" opacity="0.12" />
              <circle cx="300" cy="60" r="30" fill="url(#tNet)" />
              <circle cx="700" cy="140" r="40" fill="url(#tNet)" />
              <circle cx="500" cy="80" r="2" fill="#2563EB" opacity="0.2" />
              <circle cx="800" cy="120" r="1.5" fill="#14B8A6" opacity="0.2" />
              <circle cx="400" cy="140" r="1.5" fill="#06B6D4" opacity="0.15" />
              <line x1="200" y1="100" x2="500" y2="80" stroke="#2563EB" strokeWidth="0.3" opacity="0.08" />
              <line x1="500" y1="80" x2="800" y2="120" stroke="#14B8A6" strokeWidth="0.3" opacity="0.08" />
              <line x1="700" y1="140" x2="1000" y2="100" stroke="#06B6D4" strokeWidth="0.3" opacity="0.08" />
            </svg>
          </div>
          <h3 className="ourteam__bottom-heading">
            Different Skills. One Vision.{' '}
            <span className="ourteam__bottom-heading-accent">Protecting Sight.</span>
          </h3>
          <p className="ourteam__bottom-text">
            Together, we are building Jeevana Netra — combining artificial intelligence
            and innovation to support early detection and help protect vision.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
