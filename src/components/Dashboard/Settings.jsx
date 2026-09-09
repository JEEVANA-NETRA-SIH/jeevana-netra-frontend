import { useState } from 'react'
import { Bell, Moon, ShieldCheck } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Settings({ theme, onToggleTheme }) {
  const [state, setState] = useState({
    notifications: true,
    emailReports: false,
    weeklyDigest: true,
  })
  const toggle = (k) => () => setState((s) => ({ ...s, [k]: !s[k] }))

  return (
    <div className="d-page">
      <div className="d-pagehead">
        <h2 className="d-pagehead__title">Settings</h2>
        <p className="d-pagehead__subtitle">Manage your preferences and account details.</p>
      </div>

      <div className="d-settings">
        <section className="d-card">
          <h3 className="d-section-title">
            <Moon size={16} /> Appearance
          </h3>
          <div className="d-setting-row">
            <div>
              <p className="d-setting-row__title">Theme</p>
              <p className="d-setting-row__desc">Switch between light and dark mode.</p>
            </div>
            <div className="d-setting-row__control">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              <span className="d-setting-row__value">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </div>
          </div>
        </section>

        <section className="d-card">
          <h3 className="d-section-title">
            <Bell size={16} /> Notifications
          </h3>
          {[
            { key: 'notifications', title: 'Screening notifications', desc: 'Get notified when a screening completes.' },
            { key: 'emailReports', title: 'Email reports', desc: 'Receive screening reports by email.' },
            { key: 'weeklyDigest', title: 'Weekly digest', desc: 'A weekly summary of screening activity.' },
          ].map((opt) => (
            <div className="d-setting-row" key={opt.key}>
              <div>
                <p className="d-setting-row__title">{opt.title}</p>
                <p className="d-setting-row__desc">{opt.desc}</p>
              </div>
              <div className="d-toggle">
                <input
                  type="checkbox"
                  id={`set-${opt.key}`}
                  checked={state[opt.key]}
                  onChange={toggle(opt.key)}
                />
                <label htmlFor={`set-${opt.key}`} className="d-toggle__track" />
              </div>
            </div>
          ))}
        </section>

        <section className="d-card">
          <h3 className="d-section-title">
            <ShieldCheck size={16} /> Account
          </h3>
          <div className="d-setting-row">
            <div>
              <p className="d-setting-row__title">Demo environment</p>
              <p className="d-setting-row__desc">
                You are signed in on a demonstration account. Authentication is not production-grade.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
