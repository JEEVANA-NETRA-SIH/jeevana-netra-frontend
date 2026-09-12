import { useEffect, useRef, useState } from 'react'
import { Eye } from 'lucide-react'
import './TakeATourButton.css'

const TOAST_DURATION_MS = 3400
const TOUR_MESSAGE = 'Interactive tour coming soon.'

const TourIcon = () => <Eye size={14} strokeWidth={1.9} />

export default function TakeATourButton({ onNotify }) {
  const [toast, setToast] = useState(null)
  const idRef = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleClick = () => {
    if (onNotify) {
      onNotify({ text: TOUR_MESSAGE, icon: <TourIcon /> })
      return
    }

    idRef.current += 1
    const id = idRef.current
    setToast({ id })
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
    <>
      <button
        type="button"
        className="tat focus-visible"
        onClick={handleClick}
        aria-label="Take a tour of Jeevana Netra"
      >
        <span className="tat__icon" aria-hidden="true">
          <Eye size={18} strokeWidth={1.9} />
        </span>
        <span className="tat__label">Take a Tour</span>
      </button>

      {!onNotify && (
        <div className="tat__toast-region">
          {toast && (
            <div className="tat__toast" key={toast.id} role="status" aria-live="polite">
              <span className="tat__toast-icon" aria-hidden="true">
                <TourIcon />
              </span>
              <span className="tat__toast-text">{TOUR_MESSAGE}</span>
              <button
                type="button"
                className="tat__toast-close focus-visible"
                onClick={dismissToast}
                aria-label="Dismiss notification"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}