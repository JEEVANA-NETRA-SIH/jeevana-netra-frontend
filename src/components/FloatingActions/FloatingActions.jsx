import { useEffect, useRef, useState } from 'react'
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton'
import TakeATourButton from '../TakeATourButton/TakeATourButton'
import './FloatingActions.css'

const TOAST_DURATION_MS = 3400

export default function FloatingActions() {
  const [toast, setToast] = useState(null)
  const idRef = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const notify = ({ text, icon }) => {
    idRef.current += 1
    const id = idRef.current
    setToast({ id, text, icon })
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setToast((current) => (current && current.id === id ? null : current))
    }, TOAST_DURATION_MS)
  }

  const dismissToast = () => {
    clearTimeout(timerRef.current)
    setToast(null)
  }

  return (
    <div className="floating-actions">
      <WhatsAppButton onNotify={notify} />
      <TakeATourButton onNotify={notify} />

      <div className="floating-actions__toast-region">
        {toast && (
          <div className="fa-toast" key={toast.id} role="status" aria-live="polite">
            <span className="fa-toast__badge" aria-hidden="true">
              {toast.icon}
            </span>
            <span className="fa-toast__text">{toast.text}</span>
            <button
              type="button"
              className="fa-toast__close focus-visible"
              onClick={dismissToast}
              aria-label="Dismiss notification"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}