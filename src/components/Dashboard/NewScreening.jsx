import { useState } from 'react'
import { Upload, FileUp } from 'lucide-react'

export default function NewScreening() {
  const [, setForm] = useState({})
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="d-page">
      <div className="d-pagehead">
        <h2 className="d-pagehead__title">New Screening</h2>
        <p className="d-pagehead__subtitle">Create a new retinal screening for a patient.</p>
      </div>

      <form className="d-form" onSubmit={(e) => e.preventDefault()}>
        <section className="d-card">
          <h3 className="d-section-title">Patient Information</h3>
          <div className="d-form__grid">
            <div className="d-field">
              <label className="d-field__label" htmlFor="ns-name">Full name</label>
              <input id="ns-name" className="d-input" type="text" placeholder="Patient name" onChange={set('name')} />
            </div>
            <div className="d-field">
              <label className="d-field__label" htmlFor="ns-age">Age</label>
              <input id="ns-age" className="d-input" type="number" placeholder="Age" min="0" onChange={set('age')} />
            </div>
            <div className="d-field">
              <label className="d-field__label" htmlFor="ns-gender">Gender</label>
              <select id="ns-gender" className="d-input d-input--select" defaultValue="" onChange={set('gender')}>
                <option value="" disabled>Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="d-field">
              <label className="d-field__label" htmlFor="ns-id">Patient ID</label>
              <input id="ns-id" className="d-input" type="text" placeholder="e.g. JN-P-007" onChange={set('id')} />
            </div>
          </div>
        </section>

        <section className="d-card">
          <h3 className="d-section-title">Retinal Image</h3>
          <div className="d-upload">
            <Upload size={26} className="d-upload__icon" />
            <p className="d-upload__title">Drop retinal image here</p>
            <p className="d-upload__subtitle">PNG, JPG or JPEG up to 20MB</p>
            <button type="button" className="d-btn d-btn--secondary d-btn--sm">
              <FileUp size={16} /> Choose image
            </button>
          </div>
        </section>

        <div className="d-form__actions">
          <button type="button" className="d-btn d-btn--ghost">Cancel</button>
          <button type="submit" className="d-btn d-btn--primary">Start Analysis</button>
        </div>
      </form>
    </div>
  )
}
