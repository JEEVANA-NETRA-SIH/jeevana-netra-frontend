import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Eye, Check } from 'lucide-react'
import { useInView } from '../../hooks'
import './AboutPage.css'

function Reveal({ children, delay = 0, y = 26, className }) {
  const [ref, isInView] = useInView({ threshold: 0.15 })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

const principles = [
  {
    num: '01',
    title: 'Technology should be understandable.',
    text: 'AI should not simply produce an output. Wherever possible, people should be able to understand what influenced that output.',
  },
  {
    num: '02',
    title: 'Technology should support people.',
    text: 'Healthcare technology should assist professionals and workflows rather than attempt to replace human expertise.',
  },
  {
    num: '03',
    title: 'Innovation should consider access.',
    text: 'Solutions should be designed with real-world accessibility and underserved environments in mind.',
  },
]

const responsibleAiPoints = [
  'Transparency in how the system works',
  'Explainability of AI-assisted outputs',
  'Human oversight throughout the workflow',
  'Responsible communication of AI outputs',
  'Awareness of the system\u2019s limitations',
]

const statusCards = [
  { label: 'Prototype', text: 'Building and integrating the core experience' },
  { label: 'Research', text: 'Exploring AI, computer vision, and explainability' },
  { label: 'Future Evaluation', text: 'Working toward meaningful evaluation against appropriate benchmarks' },
]

export default function AboutPage({ onTeamClick }) {
  return (
    <>
      <section className="about-hero" id="about">
        <div className="about-hero__glow" aria-hidden="true" />
        <div className="about-hero__ring" aria-hidden="true" />
        <div className="container">
          <Reveal className="about-hero__inner">
            <span className="section-label about-hero__label">About Jeevana Netra</span>
            <h1 className="about-hero__heading">
              Technology with a purpose: making vision care easier to understand
              and more accessible.
            </h1>
            <p className="about-hero__lede">
              Jeevana Netra is a student-led medical AI innovation project exploring
              how artificial intelligence can support retinal screening while keeping
              the process understandable, explainable, and centered around human review.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story__grid">
          <Reveal className="about-story__lead">
            <span className="section-label">The beginning</span>
            <h2 className="section-heading">Why Jeevana Netra?</h2>
          </Reveal>
          <Reveal className="about-story__body" delay={0.08}>
            <p>
              Vision can be affected by conditions that may develop quietly. The idea
              behind Jeevana Netra began with a simple question:
            </p>
            <p className="about-story__question">
              Can technology help make retinal screening more accessible while also
              making AI-assisted results easier to understand?
            </p>
            <p>
              Jeevana Netra explores that question through artificial intelligence,
              computer vision, explainability, and healthcare-focused design.
            </p>
            <p>
              The project is not about replacing doctors. It is about exploring how
              technology can provide useful information that healthcare professionals
              can review, interpret, and act upon.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="about-name">
        <div className="container">
          <Reveal className="about-name__header">
            <span className="section-label">The meaning behind the name</span>
            <h2 className="section-heading">Two words. One purpose.</h2>
          </Reveal>

          <div className="about-name__composition">
            <Reveal className="about-name__word">
              <span className="about-name__word-title">Jeevana</span>
              <span className="about-name__word-mean">Life</span>
            </Reveal>

            <Reveal className="about-name__operator" delay={0.15}>
              <span aria-hidden="true">+</span>
            </Reveal>

            <Reveal className="about-name__word" delay={0.1}>
              <span className="about-name__word-title">Netra</span>
              <span className="about-name__word-mean">Vision</span>
            </Reveal>

            <Reveal className="about-name__operator about-name__operator--equals" delay={0.25}>
              <span aria-hidden="true">=</span>
            </Reveal>

            <Reveal className="about-name__word about-name__word--final" delay={0.35}>
              <span className="about-name__word-title">Jeevana Netra</span>
              <span className="about-name__word-mean">Protecting life through sight</span>
            </Reveal>
          </div>

          <Reveal className="about-name__note" delay={0.2}>
            Jeevana represents life. Netra represents the eye — the vision. Together,
            Jeevana Netra represents the idea of protecting something fundamental to
            everyday life: our ability to see and experience the world.
          </Reveal>
        </div>
      </section>

      <section className="about-belief">
        <div className="container">
          <Reveal className="about-belief__header">
            <span className="section-label">Our belief</span>
            <h2 className="section-heading section-heading--white">What we believe</h2>
          </Reveal>

          <div className="about-belief__cards">
            {principles.map((p, i) => (
              <Reveal key={p.num} className="about-principle" delay={0.1 + i * 0.1}>
                <span className="about-principle__num" aria-hidden="true">{p.num}</span>
                <h3 className="about-principle__title">{p.title}</h3>
                <p className="about-principle__text">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-responsible">
        <div className="container about-responsible__grid">
          <Reveal className="about-responsible__lead">
            <span className="section-label">Responsible AI</span>
            <h2 className="section-heading">Responsible by design</h2>
            <p className="section-subheading">
              Jeevana Netra is being developed with an emphasis on{' '}
              <strong>transparency</strong>, <strong>explainability</strong>, and{' '}
              <strong>human oversight</strong>.
            </p>
          </Reveal>
          <Reveal className="about-responsible__body" delay={0.08}>
            <ul className="about-responsible__list">
              {responsibleAiPoints.map((point) => (
                <li key={point} className="about-responsible__item">
                  <span className="about-responsible__check" aria-hidden="true">
                    <Check size={14} strokeWidth={2.4} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="about-responsible__note">
              AI-assisted screening should be treated as{' '}
              <strong>decision support</strong>, not as a replacement for clinical
              judgment.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="about-students">
        <div className="container about-students__grid">
          <Reveal className="about-students__lead">
            <span className="section-label">Who is building it?</span>
            <h2 className="section-heading">Built by students. Driven by curiosity.</h2>
          </Reveal>
          <Reveal className="about-students__body" delay={0.08}>
            <p>
              Jeevana Netra is being developed by a multidisciplinary student team
              bringing together software development, artificial intelligence,
              research, visual communication, documentation, and project strategy.
            </p>
            <p>
              The project represents an effort to take a real-world healthcare
              challenge and explore it through technology, experimentation, and
              responsible innovation.
            </p>
            <button
              type="button"
              className="about-students__cta focus-visible"
              onClick={onTeamClick}
              aria-label="Meet the team behind Jeevana Netra"
            >
              Meet the Team
              <span className="about-students__cta-arrow" aria-hidden="true">
                <ArrowRight size={16} />
              </span>
            </button>
          </Reveal>
        </div>
      </section>

      <section className="about-sih">
        <div className="container">
          <Reveal className="about-sih__card">
            <div className="about-sih__badges">
              <span className="about-sih__badge">Smart India Hackathon 2026</span>
              <span className="about-sih__badge about-sih__badge--code">SIH26038</span>
            </div>
            <h3 className="about-sih__title">
              Explainable AI for Diabetic Retinopathy Screening in Rural India
            </h3>
            <span className="about-sih__partner">MathWorks</span>
            <p className="about-sih__note">
              Jeevana Netra is being developed as a student innovation project in
              response to this problem statement.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="about-status">
        <div className="container">
          <Reveal className="about-status__header">
            <span className="section-label">Where we are today</span>
            <h2 className="section-heading">A work in progress</h2>
            <p className="section-subheading">
              Jeevana Netra is currently a prototype under development. Our focus is
              on building, testing, improving, and evaluating the system responsibly
              before making stronger real-world claims.
            </p>
          </Reveal>

          <div className="about-status__cards">
            {statusCards.map((card, i) => (
              <Reveal key={card.label} className="about-status__card" delay={0.1 + i * 0.1}>
                <span className="about-status__dot" aria-hidden="true" />
                <h3 className="about-status__label">{card.label}</h3>
                <p className="about-status__text">{card.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-vision">
        <div className="container">
          <Reveal className="about-vision__inner">
            <span className="section-label about-vision__label">Looking ahead</span>
            <h2 className="section-heading">Where we want to go</h2>
            <p className="about-vision__text">
              We envision Jeevana Netra evolving into a carefully evaluated,
              explainable screening-support system that can contribute to more
              accessible eye-care workflows while keeping healthcare professionals
              at the center of the decision-making process.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="about-close dark-section">
        <div className="container">
          <Reveal className="about-close__inner">
            <span className="about-close__mark" aria-hidden="true">
              <Eye size={30} strokeWidth={1.4} />
            </span>
            <blockquote className="about-close__quote">
              Better technology isn&rsquo;t only about what AI can do.
              <br />
              It&rsquo;s also about how responsibly we use it.
            </blockquote>
            <p className="about-close__sub">Jeevana Netra is our exploration of that idea.</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}