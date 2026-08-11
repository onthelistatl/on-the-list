import { useState } from 'react'
import { CROWD_LABELS } from '../constants'
import './ReportSheet.css'

export default function ReportSheet({ club, onClose, onSubmit }) {
  const [level, setLevel] = useState(null)
  const [coverPaid, setCoverPaid] = useState('')

  if (!club) return null

  const canSubmit = level != null

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit(club.id, {
      crowd_level: level,
      cover_paid: coverPaid === '' ? 0 : Number(coverPaid),
    })
  }

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <h3 className="sheet-title">{club.name}</h3>
        <p className="sheet-subtitle">How is it right now?</p>

        <div className="level-grid">
          {CROWD_LABELS.map((label, i) => {
            const value = i + 1
            return (
              <button
                key={value}
                className={`level-btn ${level === value ? 'selected' : ''}`}
                onClick={() => setLevel(value)}
              >
                {label}
              </button>
            )
          })}
        </div>

        <label className="cover-label" htmlFor="cover-paid">
          What did you pay at the door? (optional)
        </label>
        <div className="cover-input-wrap">
          <span className="dollar-sign">$</span>
          <input
            id="cover-paid"
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="0"
            value={coverPaid}
            onChange={(e) => setCoverPaid(e.target.value)}
          />
        </div>

        <button className="submit-btn" disabled={!canSubmit} onClick={handleSubmit}>
          Submit report
        </button>
      </div>
    </div>
  )
}
