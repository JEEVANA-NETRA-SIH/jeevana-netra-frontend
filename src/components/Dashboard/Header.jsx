import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, LogOut, Menu, Search, User } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { ACCENT_USER } from './data/dashboardData'

export default function Header({ title, subtitle, onMenuToggle, theme, onToggleTheme, onLogout }) {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const menuRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  useEffect(() => {
    if (!searchOpen) return
    if (searchRef.current) searchRef.current.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [searchOpen])

  return (
    <header className="d-header">
      <div className="d-header__left">
        <button className="d-header__menu" onClick={onMenuToggle} aria-label="Open navigation menu">
          <Menu size={20} />
        </button>
        <div className="d-header__titles">
          <h1 className="d-header__title">{title}</h1>
          {subtitle && <p className="d-header__subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="d-header__right">
        <div className={`d-header__search ${searchOpen ? 'd-header__search--open' : ''}`}>
          <Search size={16} className="d-header__search-icon" />
          <input
            ref={searchRef}
            className="d-header__search-input"
            type="text"
            placeholder="Search screenings..."
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
        </div>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        <button className="d-header__icon" aria-label="Notifications">
          <Bell size={18} />
          <span className="d-header__badge">3</span>
        </button>

        <div className="d-header__account" ref={menuRef}>
          <button
            className="d-header__account-btn"
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <span className="d-header__avatar">{ACCENT_USER.short}</span>
            <span className="d-header__account-text">
              <strong>{ACCENT_USER.name}</strong>
              <small>{ACCENT_USER.role}</small>
            </span>
            <ChevronDown size={14} className={`d-header__chevron ${open ? 'd-header__chevron--open' : ''}`} />
          </button>

          {open && (
            <div className="d-header__dropdown" role="menu">
              <button role="menuitem" type="button" onClick={() => setOpen(false)}>
                <User size={16} /> Profile
              </button>
              <div className="d-header__dropdown-divider" />
              <button className="d-header__dropdown-logout" role="menuitem" type="button" onClick={onLogout}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
