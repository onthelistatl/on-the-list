import { useEffect, useMemo, useState } from 'react'
import { fetchClubs, fetchRecentReports, submitReport } from '../lib/api'
import { ensureDeviceId } from '../lib/device'
import ClubCard from '../components/ClubCard'
import ReportSheet from '../components/ReportSheet'
import './Home.css'

function groupReportsByClub(reports) {
  const byClub = {}
  for (const report of reports) {
    if (!byClub[report.club_id]) byClub[report.club_id] = []
    byClub[report.club_id].push(report)
  }
  return byClub
}

export default function Home() {
  const [clubs, setClubs] = useState([])
  const [reportsByClub, setReportsByClub] = useState({})
  const [deviceId, setDeviceId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reportingClub, setReportingClub] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [clubsData, reportsData, deviceIdResult] = await Promise.all([
          fetchClubs(),
          fetchRecentReports(),
          ensureDeviceId(),
        ])
        if (cancelled) return
        setClubs(clubsData)
        setReportsByClub(groupReportsByClub(reportsData))
        setDeviceId(deviceIdResult)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const neighborhoods = useMemo(
    () => ['All', ...new Set(clubs.map((c) => c.neighborhood))],
    [clubs],
  )
  const [filter, setFilter] = useState('All')

  const visibleClubs =
    filter === 'All' ? clubs : clubs.filter((c) => c.neighborhood === filter)

  const handleSubmitReport = async (clubId, report) => {
    try {
      const saved = await submitReport(clubId, deviceId, report)
      setReportsByClub((prev) => ({
        ...prev,
        [clubId]: [saved, ...(prev[clubId] || [])],
      }))
      setReportingClub(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="home">
      <header className="app-header">
        <h1 className="app-title">
          On The <span className="accent-text">List</span>
        </h1>
        <p className="app-subtitle">Atlanta nightlife, live from the door.</p>
      </header>

      {error && <p className="app-error">{error}</p>}

      {loading ? (
        <p className="app-loading">Loading clubs…</p>
      ) : (
        <>
          <nav className="filter-row">
            {neighborhoods.map((n) => (
              <button
                key={n}
                className={`filter-chip ${filter === n ? 'active' : ''}`}
                onClick={() => setFilter(n)}
              >
                {n}
              </button>
            ))}
          </nav>

          <main className="club-list">
            {visibleClubs.map((club) => (
              <ClubCard
                key={club.id}
                club={{ ...club, reports: reportsByClub[club.id] || [] }}
                deviceId={deviceId}
                onReport={setReportingClub}
              />
            ))}
          </main>
        </>
      )}

      <ReportSheet
        club={reportingClub}
        onClose={() => setReportingClub(null)}
        onSubmit={handleSubmitReport}
      />
    </div>
  )
}
