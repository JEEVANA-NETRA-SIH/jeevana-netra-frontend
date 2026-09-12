import { motion } from 'framer-motion'
import { useInView } from '../../hooks'
import { ArrowRight, Eye } from 'lucide-react'
import './AccessibilitySection.css'

const actions = [
  { label: 'Rural Eye Care', href: '#impact', primary: true },
  { label: 'Screening Journey', href: '#how-it-works' },
  { label: 'AI-Powered Screening', href: '#explainable-ai' },
]

const stripItems = ['Community Care', 'Retinal Screening', 'AI Assistance']

export default function AccessibilitySection() {
  const [ref, isInView] = useInView({ threshold: 0.15 })

  const reveal = (delay = 0, distance = 26) => ({
    initial: { opacity: 0, y: distance },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className="rural" id="rural-india" aria-label="Rural India" ref={ref}>
      {/* Layer 1 — photographic collage */}
      <div className="rural__media" aria-hidden="true">
        <img
          className="rural__media-img"
          src="/rural.png"
          alt=""
          width="1671"
          height="941"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Layer 2 — cinematic overlay */}
      <div className="rural__overlay" aria-hidden="true" />

      {/* Subtle India / community identity */}
      <div className="rural__decor" aria-hidden="true">
        <div className="rural__dots" />
        <svg className="rural__map" viewBox="0 0 100 120" focusable="false">
          <path d="M30 10L40 3L54 2L62 6L61 13L68 15L75 15L82 16L84 21L88 24L92 28L96 34L97 42L94 50L90 55L82 53L80 58L77 64L72 70L67 76L62 82L58 88L54 94L49 102L46 112L43 110L39 102L35 94L30 87L27 80L25 72L24 64L23 58L20 54L15 49L19 43L23 39L24 34L26 27L26 19L30 10Z" />
        </svg>
        <span className="rural__badge">
          <Eye size={16} strokeWidth={1.8} />
        </span>
        {[...Array(3)].map((_, i) => (
          <span className={`rural__particle rural__particle--${i + 1}`} key={i} />
        ))}
      </div>

      {/* Layer 3 — foreground content */}
      <div className="rural__content container">
        <motion.div className="rural__panel" {...reveal(0)}>
          <motion.span className="rural__eyebrow" {...reveal(0.05, 14)}>
            RURAL INDIA
          </motion.span>
          <motion.h2 className="rural__heading" {...reveal(0.12, 30)}>
            Bringing retinal screening
            <span className="rural__heading-accent">closer to where people live.</span>
          </motion.h2>
          <motion.p className="rural__lede" {...reveal(0.2, 22)}>
            Designed for primary and community healthcare settings where image quality, specialist
            access and screening resources can vary.
          </motion.p>

          <motion.div className="rural__actions">
            {actions.map((action, i) => (
              <motion.a
                key={action.label}
                href={action.href}
                className={`rural__btn ${action.primary ? 'rural__btn--primary' : ''}`}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="rural__btn-text">{action.label}</span>
                <ArrowRight
                  className="rural__btn-icon"
                  size={18}
                  strokeWidth={2.4}
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </motion.div>

          <motion.div className="rural__strip" {...reveal(0.55, 18)}>
            {stripItems.map((item, i) => (
              <span className="rural__strip-item" key={item}>
                {i > 0 && (
                  <span className="rural__strip-sep" aria-hidden="true">
                    ·
                  </span>
                )}
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}