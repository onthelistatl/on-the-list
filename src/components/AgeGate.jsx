import { useState } from 'react'
import './AgeGate.css'

const STORAGE_KEY = 'otl_age_verified'

export default function AgeGate({ children }) {
  const [verified, setVerified] = useState(
    () => localStorage.getItem(STORAGE_KEY) === 'true',
  )
  const [declined, setDeclined] = useState(false)

  if (verified) return children

  const handleYes = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setVerified(true)
  }

  return (
    <div className="age-gate-overlay">
      <div className="age-gate-card">
        {declined ? (
          <>
            <h2 className="age-gate-title">21+ Only</h2>
            <p className="age-gate-body">
              On The List covers bars and clubs that serve alcohol, so it's
              restricted to visitors who are 21 or older. Please check back
              once that's no longer the case.
            </p>
          </>
        ) : (
          <>
            <h2 className="age-gate-title">Are you 21 or older?</h2>
            <p className="age-gate-body">
              On The List covers Atlanta bars and clubs that serve alcohol.
            </p>
            <div className="age-gate-actions">
              <button
                className="age-gate-btn age-gate-btn-secondary"
                onClick={() => setDeclined(true)}
              >
                No
              </button>
              <button
                className="age-gate-btn age-gate-btn-primary"
                onClick={handleYes}
              >
                Yes, I'm 21+
              </button>
            </div>
            <p className="age-gate-disclaimer">
              Info on this app is crowdsourced and may be inaccurate. Always
              verify cover, dress code, and hours with the venue directly.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
