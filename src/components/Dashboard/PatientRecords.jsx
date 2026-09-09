import StatusBadge from './ui/StatusBadge'
import { patientRecords } from './data/pagesData'

const RISK_VARIANT = { Low: 'low', Medium: 'medium', High: 'high' }
const STATUS_VARIANT = { Completed: 'completed', 'Requires Review': 'requires-review', Pending: 'pending' }

export default function PatientRecords() {
  return (
    <div className="d-page">
      <div className="d-pagehead">
        <h2 className="d-pagehead__title">Patient Records</h2>
        <p className="d-pagehead__subtitle">Patient profiles and their latest screening activity.</p>
      </div>

      <div className="d-toolbar">
        <input className="d-input" type="text" placeholder="Search patients..." />
        <span className="d-toolbar__count">{patientRecords.length} patients</span>
      </div>

      <div className="d-card d-card--table">
        <div className="d-table-wrap">
          <table className="d-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>ID</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Last Screening</th>
                <th>Result</th>
                <th>Risk</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patientRecords.map((p) => (
                <tr key={p.id}>
                  <td className="d-table__strong">{p.name}</td>
                  <td className="d-table__muted">{p.id}</td>
                  <td>{p.age}</td>
                  <td className="d-table__muted">{p.gender}</td>
                  <td className="d-table__muted">{p.lastScreening}</td>
                  <td>{p.result}</td>
                  <td>
                    <StatusBadge variant={RISK_VARIANT[p.risk]}>{p.risk}</StatusBadge>
                  </td>
                  <td>
                    <StatusBadge variant={STATUS_VARIANT[p.status]}>{p.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
