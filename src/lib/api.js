import { supabase } from './supabaseClient'

// Reports older than this never affect the crowd level anyway (see
// utils/crowd.js), so there's no need to fetch further back than this.
const REPORT_WINDOW_HOURS = 6

export async function fetchClubs() {
  const { data, error } = await supabase.from('clubs').select('*').order('name')
  if (error) throw error
  return data
}

export async function fetchRecentReports() {
  const since = new Date(Date.now() - REPORT_WINDOW_HOURS * 60 * 60 * 1000).toISOString()
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function submitReport(clubId, deviceId, { crowd_level, cover_paid }) {
  const { data, error } = await supabase
    .from('reports')
    .insert({ club_id: clubId, device_id: deviceId, crowd_level, cover_paid })
    .select()
    .single()
  if (error) throw error
  return data
}
