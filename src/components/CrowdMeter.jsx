import { CROWD_LABELS } from '../constants'
import './CrowdMeter.css'

const BAR_HEIGHTS = [35, 55, 75, 90, 100]

export default function CrowdMeter({ status }) {
  const { level, isStale, lastReportMinutesAgo, reportCount } = status

  const label = level ? CROWD_LABELS[level - 1] : 'No reports yet'
  const isLive = !isStale && reportCount > 0

  return (
    <div className="crowd-meter-wrap">
      <div className={`crowd-meter ${isStale ? 'is-stale' : ''}`}>
        {BAR_HEIGHTS.map((h, i) => {
          const barLevel = i + 1
          const active = level != null && barLevel <= level
          return (
            <span
              key={i}
              className={`crowd-bar ${active ? 'active' : ''} ${active && isLive ? 'pulsing' : ''}`}
              style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
            />
          )
        })}
      </div>
      <div className="crowd-meta">
        <span className={`crowd-label ${isStale ? 'is-stale' : ''}`}>{label}</span>
        {lastReportMinutesAgo != null && (
          <span className="crowd-timestamp">
            {isStale ? 'Stale · ' : ''}
            {lastReportMinutesAgo < 1 ? 'just now' : `${lastReportMinutesAgo}m ago`}
          </span>
        )}
      </div>
    </div>
  )
}
