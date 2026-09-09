import { useState } from 'react'
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Overview from './Overview'
import NewScreening from './NewScreening'
import ScreeningHistory from './ScreeningHistory'
import AIInsights from './AIInsights'
import PatientRecords from './PatientRecords'
import Analytics from './Analytics'
import NearestClinic from './NearestClinic'
import Settings from './Settings'
import useTheme from './hooks/useTheme'
import './Dashboard.css'

const PAGE_META = {
  overview: { title: 'Overview', subtitle: 'Retinal screening workspace' },
  'new-screening': { title: 'New Screening', subtitle: 'Create a patient screening' },
  history: { title: 'Screening History', subtitle: 'All past screenings' },
  insights: { title: 'AI Insights', subtitle: 'Cohort intelligence' },
  patients: { title: 'Patient Records', subtitle: 'Patient profiles' },
  analytics: { title: 'Analytics', subtitle: 'Platform performance' },
  'nearest-clinic': { title: 'Nearest Clinic', subtitle: 'Find nearby partner clinics' },
  settings: { title: 'Settings', subtitle: 'Preferences and account' },
}

export default function Dashboard({ onLogout }) {
  const [view, setView] = useState('overview')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { theme, toggle } = useTheme()

  const navigate = (key) => {
    setView(key)
    setDrawerOpen(false)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const meta = PAGE_META[view] || PAGE_META.overview

  const renderView = () => {
    switch (view) {
      case 'new-screening':
        return <NewScreening />
      case 'history':
        return <ScreeningHistory onStartScreening={() => navigate('new-screening')} />
      case 'insights':
        return <AIInsights />
      case 'patients':
        return <PatientRecords />
      case 'analytics':
        return <Analytics />
      case 'nearest-clinic':
        return <NearestClinic />
      case 'settings':
        return <Settings theme={theme} onToggleTheme={toggle} />
      default:
        return (
          <Overview
            onStartScreening={() => navigate('new-screening')}
            onViewHistory={() => navigate('history')}
            onViewInsights={() => navigate('insights')}
          />
        )
    }
  }

  return (
    <div className="d-shell">
      <Sidebar
        active={view}
        onNavigate={navigate}
        onLogout={onLogout}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        theme={theme}
      />
      <div className="d-main">
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuToggle={() => setDrawerOpen(true)}
          theme={theme}
          onToggleTheme={toggle}
          onLogout={onLogout}
        />
        <main className="d-content">{renderView()}</main>
      </div>
    </div>
  )
}
