import {
  LayoutDashboard,
  PlusCircle,
  History,
  Sparkles,
  Users,
  BarChart3,
  MapPin,
  Settings,
  LogOut,
  X,
} from 'lucide-react'

const NAV_ITEMS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'new-screening', label: 'New Screening', icon: PlusCircle },
  { key: 'history', label: 'Screening History', icon: History },
  { key: 'insights', label: 'AI Insights', icon: Sparkles },
  { key: 'patients', label: 'Patient Records', icon: Users },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'nearest-clinic', label: 'Nearest Clinic', icon: MapPin },
]

export default function Sidebar({ active, onNavigate, onLogout, open, onClose, theme }) {
  const handleNavigate = (key) => {
    onNavigate(key)
    onClose()
  }

  const logo = theme === 'dark' ? '/newheronavbarlogo.png' : '/navbarlogo.png'

  return (
    <>
      {open && <div className="d-sidebar__backdrop" onClick={onClose} aria-hidden="true" />}
      <aside
        className={`d-sidebar ${open ? 'd-sidebar--open' : ''}`}
        aria-label="Dashboard navigation"
      >
        <div className="d-sidebar__brand">
          <img className="d-sidebar__brand-logo" src={logo} alt="Jeevana Netra" />
          <button className="d-sidebar__close" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="d-sidebar__nav">
          <p className="d-sidebar__group-label">Workspace</p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = active === item.key
            return (
              <button
                key={item.key}
                type="button"
                className={`d-sidebar__item ${isActive ? 'd-sidebar__item--active' : ''}`}
                onClick={() => handleNavigate(item.key)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} className="d-sidebar__item-icon" />
                <span className="d-sidebar__item-label">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="d-sidebar__footer">
          <button
            type="button"
            className={`d-sidebar__item ${active === 'settings' ? 'd-sidebar__item--active' : ''}`}
            onClick={() => handleNavigate('settings')}
            aria-current={active === 'settings' ? 'page' : undefined}
          >
            <Settings size={18} className="d-sidebar__item-icon" />
            <span className="d-sidebar__item-label">Settings</span>
          </button>
          <button type="button" className="d-sidebar__item d-sidebar__item--logout" onClick={onLogout}>
            <LogOut size={18} className="d-sidebar__item-icon" />
            <span className="d-sidebar__item-label">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
