import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Team', href: '#our-team' },
  { label: 'Development Roadmap', href: '#roadmap' },
  { label: 'How It Works', href: '#how-it-works' },
]

export default function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar__inner container">
          <a href="#" className="navbar__logo" aria-label="Jeevana Netra Home">
            <img className="navbar__logo-img" src="/newheronavbarlogo.png" alt="Jeevana Netra" />
          </a>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="navbar__link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="navbar__actions">
            <button className="navbar__login" onClick={onLoginClick} type="button">Log in</button>
            <button
              className="navbar__cta"
              onClick={onLoginClick}
              type="button"
              aria-label="Start Screening"
            >
              Start Screening
              <span className="navbar__cta-arrow">→</span>
            </button>
          </div>

          <button
            className="navbar__cta navbar__cta--mobile"
            onClick={onLoginClick}
            type="button"
            aria-label="Start Screening"
          >
            Start Screening
            <span className="navbar__cta-arrow">→</span>
          </button>

          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="mobile-nav__content"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav__link"
                  onClick={() => setMobileOpen(false)}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mobile-nav__divider" />
              <button
                type="button"
                className="mobile-nav__link"
                onClick={() => {
                  setMobileOpen(false)
                  onLoginClick()
                }}
              >
                Log in
              </button>
              <button
                type="button"
                className="mobile-nav__cta"
                onClick={() => {
                  setMobileOpen(false)
                  onLoginClick()
                }}
              >
                Start Screening →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
