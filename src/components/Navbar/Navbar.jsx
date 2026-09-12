import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Team', href: '#our-team', view: 'team' },
  { label: 'About', href: '#about', view: 'about' },
  { label: 'How It Works', href: '#how-it-works' },
]

export default function Navbar({ onLoginClick, onTeamClick, onAboutClick, currentView = 'home' }) {
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

  const navigateViewLink = (link, onOpen) => {
    if (onOpen) onOpen()
    if (link.view === 'team') onTeamClick()
    else if (link.view === 'about') onAboutClick()
  }

  const isActive = (link) => {
    if (link.view) return currentView === link.view
    return currentView === 'home'
  }

  const renderNavLink = (link, className, onOpen) => {
    const active = isActive(link)
    const classes = `${className}${active ? ` ${className}--active` : ''}`
    return (
      <a
        key={link.href}
        href={link.href}
        className={classes}
        onClick={
          link.view
            ? (e) => {
                e.preventDefault()
                navigateViewLink(link, onOpen)
              }
            : undefined
        }
        aria-current={active ? 'page' : undefined}
      >
        {link.label}
      </a>
    )
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar__inner container">
          <a href="#" className="navbar__logo" aria-label="Jeevana Netra Home">
            <img className="navbar__logo-img" src="/newheronavbarlogo.png" alt="Jeevana Netra" />
          </a>

          <div className="navbar__links">
            {navLinks.map((link) => renderNavLink(link, 'navbar__link'))}
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
                <motion.div
                  key={link.href}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                >
                  {renderNavLink(link, 'mobile-nav__link', () => setMobileOpen(false))}
                </motion.div>
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