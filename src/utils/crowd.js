const STALE_WINDOW_MINUTES = 90

// Must match the window in the `enforce_report_rate_limit` database
// trigger (supabase/05_rate_limit_reports.sql) — this is only used to
// disable the button proactively, the trigger is the real enforcement.
export const RATE_LIMIT_MINUTES = 30

export function ageInMinutes(createdAt) {
  return (Date.now() - new Date(createdAt).getTime()) / 60000
}

// Weighted average of recent crowd_level reports. Reports older than the
// stale window don't count toward the level at all — only their existence
// is used to show a "last report" timestamp when there's no fresh data.
export function computeCrowdStatus(reports) {
  const withAge = reports
    .map((r) => ({ ...r, age: ageInMinutes(r.created_at) }))
    .sort((a, b) => a.age - b.age)

  const fresh = withAge.filter((r) => r.age <= STALE_WINDOW_MINUTES)

  if (fresh.length === 0) {
    return {
      level: null,
      isStale: true,
      lastReportMinutesAgo: withAge.length ? Math.round(withAge[0].age) : null,
      reportCount: 0,
    }
  }

  let weightedSum = 0
  let weightTotal = 0
  for (const r of fresh) {
    const weight = 1 - r.age / STALE_WINDOW_MINUTES
    weightedSum += r.crowd_level * weight
    weightTotal += weight
  }

  const avg = weightedSum / weightTotal
  const level = Math.min(5, Math.max(1, Math.round(avg)))

  return {
    level,
    isStale: false,
    lastReportMinutesAgo: Math.round(fresh[0].age),
    reportCount: fresh.length,
  }
}

// What people have actually reported paying at the door recently. Only
// looks at reports within the stale window — same freshness rule as the
// crowd meter — since an old cover report is no more trustworthy than an
// old crowd report.
export function computeReportedCover(reports) {
  const fresh = reports
    .filter((r) => r.cover_paid != null)
    .map((r) => ({ ...r, age: ageInMinutes(r.created_at) }))
    .filter((r) => r.age <= STALE_WINDOW_MINUTES)
    .sort((a, b) => a.age - b.age)

  if (fresh.length === 0) return null

  const amounts = fresh.map((r) => r.cover_paid)

  return {
    min: Math.min(...amounts),
    max: Math.max(...amounts),
    reportCount: fresh.length,
    lastReportMinutesAgo: Math.round(fresh[0].age),
  }
}

// Is this device still in its post-report cooldown for this club? Looks
// only at reports from `deviceId` — everyone else's reports don't affect
// your own cooldown.
export function getReportCooldown(reports, deviceId) {
  if (!deviceId) return null

  const mine = reports
    .filter((r) => r.device_id === deviceId)
    .map((r) => ({ ...r, age: ageInMinutes(r.created_at) }))
    .filter((r) => r.age <= RATE_LIMIT_MINUTES)
    .sort((a, b) => a.age - b.age)

  if (mine.length === 0) return null

  return {
    remainingMinutes: Math.max(1, Math.ceil(RATE_LIMIT_MINUTES - mine[0].age)),
  }
}

export function currentCoverPrice(coverTiers) {
  const now = new Date()
  const minutesNow = now.getHours() * 60 + now.getMinutes()

  const parseUntil = (until) => {
    if (!until) return Infinity
    const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(until.trim())
    if (!match) return Infinity
    let [, h, m, ap] = match
    h = parseInt(h, 10) % 12
    if (ap.toUpperCase() === 'PM') h += 12
    return h * 60 + parseInt(m, 10)
  }

  for (const tier of coverTiers) {
    if (minutesNow < parseUntil(tier.until)) return tier
  }
  return coverTiers[coverTiers.length - 1]
}
