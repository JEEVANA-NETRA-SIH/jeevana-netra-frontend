import { Sparkles, Info } from 'lucide-react'
import { aiInsights } from './data/pagesData'

const TONE_CLASS = {
  positive: 'd-insight--positive',
  warning: 'd-insight--warning',
  neutral: 'd-insight--neutral',
}

export default function AIInsights() {
  return (
    <div className="d-page">
      <div className="d-pagehead">
        <h2 className="d-pagehead__title">AI Insights</h2>
        <p className="d-pagehead__subtitle">Summarised intelligence from your screening cohort.</p>
      </div>

      <div className="d-insights">
        {aiInsights.map((item, i) => (
          <div key={i} className={`d-insight ${TONE_CLASS[item.tone]}`}>
            <div className="d-insight__icon">
              <Sparkles size={18} />
            </div>
            <h3 className="d-insight__title">{item.title}</h3>
            <p className="d-insight__body">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="d-note">
        <Info size={16} />
        Insights are auto-generated from screened data and are not a substitute for clinical judgement.
      </div>
    </div>
  )
}
