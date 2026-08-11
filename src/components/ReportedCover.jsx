import './ReportedCover.css'

function formatAmount(n) {
  return n === 0 ? 'FREE' : `$${n}`
}

export default function ReportedCover({ reportedCover }) {
  if (!reportedCover) return null

  const { min, max, lastReportMinutesAgo } = reportedCover
  const amountLabel =
    min === max ? formatAmount(min) : `${formatAmount(min)}–${formatAmount(max)}`

  return (
    <div className="reported-cover">
      <span className="reported-cover-dot" />
      Paid tonight: <strong>{amountLabel}</strong>
      <span className="reported-cover-age">
        {lastReportMinutesAgo < 1 ? 'just now' : `${lastReportMinutesAgo}m ago`}
      </span>
    </div>
  )
}
