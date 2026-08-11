import CrowdMeter from './CrowdMeter'
import CoverChips from './CoverChips'
import ReportedCover from './ReportedCover'
import {
  computeCrowdStatus,
  computeReportedCover,
  currentCoverPrice,
  getReportCooldown,
} from '../utils/crowd'
import './ClubCard.css'

export default function ClubCard({ club, deviceId, onReport }) {
  const status = computeCrowdStatus(club.reports)
  const reportedCover = computeReportedCover(club.reports)
  const activeTier = currentCoverPrice(club.cover_tiers)
  const cooldown = getReportCooldown(club.reports, deviceId)
  const canReport = !!deviceId && !cooldown

  return (
    <article className="club-card">
      <header className="club-card-header">
        <div>
          <h3 className="club-name">{club.name}</h3>
          <p className="club-sub">
            {club.neighborhood} · {club.genre}
          </p>
        </div>
        <CrowdMeter status={status} />
      </header>

      <ReportedCover reportedCover={reportedCover} />
      <CoverChips coverTiers={club.cover_tiers} activeTier={activeTier} />

      <div className="club-details">
        <span>{club.dress_code}</span>
        <span className="dot">·</span>
        <span>Last call {club.last_call}</span>
      </div>

      <button
        className="report-btn"
        disabled={!canReport}
        onClick={() => onReport(club)}
      >
        {cooldown ? `Reported — check back in ${cooldown.remainingMinutes}m` : "I'm here — report"}
      </button>
    </article>
  )
}
