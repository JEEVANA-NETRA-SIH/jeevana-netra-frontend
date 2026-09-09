import { PlusCircle } from 'lucide-react'
import StatusBadge from './ui/StatusBadge'
import { screeningHistory } from './data/pagesData'

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

export default function ScreeningHistory({ onStartScreening }) {
  return (
    <div className="d-page">
      <div className="d-pagehead">
        <h2 className="d-pagehead__title">Screening History</h2>
        <p className="d-pagehead__subtitle">Review all completed and pending retinal screenings.</p>
      </div>

      <div className="d-toolbar">
        <select className="d-input d-input--select" defaultValue="all">
          <option value="all">All periods</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
        <select className="d-input d-input--select" defaultValue="all">
          <option value="all">All statuses</option>
          <option value="completed">Completed</option>
          <option value="review">Requires Review</option>
          <option value="pending">Pending</option>
        </select>
        <span className="d-toolbar__count">{screeningHistory.length} screenings</span>
      </div>

      <div className="d-card d-card--table">
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
              {screeningHistory.map((row) => (
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
      </div>

      <div className="d-empty-action">
        <button type="button" className="d-btn d-btn--primary" onClick={onStartScreening}>
          <PlusCircle size={16} /> Start a new screening
        </button>
      </div>
    </div>
  )
}
