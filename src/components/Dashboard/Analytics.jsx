import { analyticsSummary } from './data/pagesData'

export default function Analytics() {
  return (
    <div className="d-page">
      <div className="d-pagehead">
        <h2 className="d-pagehead__title">Analytics</h2>
        <p className="d-pagehead__subtitle">Overview of screening platform performance.</p>
      </div>

      <div className="d-stats">
        {analyticsSummary.map((s) => (
          <div key={s.label} className="d-stat">
            <div className="d-stat__top">
              <div className="d-stat__icon d-stat__icon--neutral">
                <span className="d-stat__glyph" />
              </div>
            </div>
            <p className="d-stat__label">{s.label}</p>
            <p className="d-stat__value">{s.value}</p>
            <p className="d-stat__support">Platform metric</p>
          </div>
        ))}
      </div>

      <div className="d-card d-card--chart">
        <div className="d-card__head">
          <h3 className="d-section-title">Screening Volume (Monthly)</h3>
          <span className="d-card__hint">Demo data</span>
        </div>
        <div className="d-bars">
          {[42, 58, 49, 66, 74, 69, 85, 92, 88, 104, 118, 131].map((v, i) => (
            <div key={i} className="d-bars__col">
              <div className="d-bars__track">
                <div className="d-bars__fill" style={{ height: `${(v / 131) * 100}%` }} />
              </div>
              <span className="d-bars__label">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
