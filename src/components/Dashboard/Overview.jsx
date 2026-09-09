import { PlusCircle, History, Sparkles } from 'lucide-react'
import StatusBadge from './ui/StatusBadge'
import StatCard from './ui/StatCard'
import ActivityChart from './ui/ActivityChart'
import {
  overviewStats,
  screeningActivity,
  recentScreenings,
  systemStatus,
  ACCENT_USER,
} from './data/dashboardData'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

const STATUS_VARIANT = {
  Completed: 'completed',
  'Requires Review': 'requires-review',
  Pending: 'pending',
}

const RISK_VARIANT = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
}

export default function Overview({ onStartScreening, onViewHistory, onViewInsights }) {
  return (
    <div className="d-page">
      <section className="d-welcome">
        <div>
          <h2 className="d-welcome__title">
            {getGreeting()}, {ACCENT_USER.name}
          </h2>
          <p className="d-welcome__subtitle">
            Here&apos;s what&apos;s happening with your retinal screening activity today.
          </p>
        </div>
        <button type="button" className="d-btn d-btn--primary" onClick={onStartScreening}>
          <PlusCircle size={16} /> Start New Screening
        </button>
      </section>

      <section className="d-stats">
        {overviewStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </section>

      <section className="d-actions">
        <div className="d-actions__head">
          <h3 className="d-section-title">Quick Actions</h3>
        </div>
        <div className="d-actions__grid">
          <button type="button" className="d-btn d-btn--primary d-actions__primary" onClick={onStartScreening}>
            <PlusCircle size={18} /> Start New Screening
          </button>
          <button type="button" className="d-btn d-btn--secondary" onClick={onViewHistory}>
            <History size={18} /> View Screening History
          </button>
          <button type="button" className="d-btn d-btn--secondary" onClick={onViewInsights}>
            <Sparkles size={18} /> View AI Insights
          </button>
        </div>
      </section>

      <section className="d-grid">
        <div className="d-card d-card--chart">
          <div className="d-card__head">
            <h3 className="d-section-title">Screening Activity</h3>
            <span className="d-card__hint">Last 7 days</span>
          </div>
          <ActivityChart data={screeningActivity} />
        </div>

        <div className="d-card d-card--status">
          <div className="d-card__head">
            <h3 className="d-section-title">System Status</h3>
          </div>
          <ul className="d-status">
            {systemStatus.map((s) => (
              <li key={s.label} className="d-status__item">
                <span className={`d-status__dot d-status__dot--${s.state}`} />
                <span className="d-status__label">{s.label}</span>
                <span className="d-status__state">Operational</span>
              </li>
            ))}
          </ul>
          <div className="d-status__summary">
            <span className="d-status__dot d-status__dot--operational" />
            All systems running normally
          </div>
        </div>
      </section>

      <section className="d-card d-card--table">
        <div className="d-card__head d-card__head--table">
          <h3 className="d-section-title">Recent Screenings</h3>
          <button type="button" className="d-link" onClick={onViewHistory}>
            View All Screenings
          </button>
        </div>
        <div className="d-table-wrap">
          <table className="d-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Screening ID</th>
                <th>AI Result</th>
                <th>Risk Level</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentScreenings.map((row) => (
                <tr key={row.id}>
                  <td className="d-table__strong">{row.patient}</td>
                  <td className="d-table__muted">{row.id}</td>
                  <td>{row.result}</td>
                  <td>
                    <StatusBadge variant={RISK_VARIANT[row.risk]}>{row.risk}</StatusBadge>
                  </td>
                  <td className="d-table__muted">{row.date}</td>
                  <td>
                    <StatusBadge variant={STATUS_VARIANT[row.status]}>{row.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
