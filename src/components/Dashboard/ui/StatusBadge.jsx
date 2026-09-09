const VARIANT_MAP = {
  low: 'd-badge--low',
  medium: 'd-badge--medium',
  high: 'd-badge--high',
  completed: 'd-badge--completed',
  'requires-review': 'd-badge--requires-review',
  pending: 'd-badge--pending',
  positive: 'd-badge--positive',
  warning: 'd-badge--warning',
  critical: 'd-badge--critical',
  neutral: 'd-badge--neutral',
}

export default function StatusBadge({ variant, children }) {
  const cls = VARIANT_MAP[variant] || VARIANT_MAP.neutral
  return <span className={`d-badge ${cls}`}>{children}</span>
}
