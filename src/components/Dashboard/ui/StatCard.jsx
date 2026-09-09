import { Activity, HeartPulse, AlertTriangle, ShieldAlert, ArrowDownRight, ArrowUpRight } from 'lucide-react'

const ICON_MAP = {
  total: Activity,
  healthy: HeartPulse,
  attention: AlertTriangle,
  high: ShieldAlert,
}

export default function StatCard({ stat }) {
  const Icon = ICON_MAP[stat.id] || Activity
  const trendingUp = stat.trend.startsWith('+')

  return (
    <div className="d-stat">
      <div className="d-stat__top">
        <div className={`d-stat__icon d-stat__icon--${stat.status}`}>
          <Icon size={20} />
        </div>
        <span className={`d-stat__trend d-stat__trend--${stat.status}`}>
          {trendingUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {stat.trend}
        </span>
      </div>
      <p className="d-stat__label">{stat.label}</p>
      <p className="d-stat__value">{stat.value}</p>
      <p className="d-stat__support">{stat.supporting}</p>
    </div>
  )
}
