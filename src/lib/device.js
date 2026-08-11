import { supabase } from './supabaseClient'

// Reuses a persisted anonymous session if one already exists in this
// browser (supabase-js restores it from localStorage automatically),
// otherwise creates a new one. The resulting auth.uid() is what we use
// as "device_id" everywhere else in the app.
export async function ensureDeviceId() {
  const { data: sessionData } = await supabase.auth.getSession()
  if (sessionData.session) return sessionData.session.user.id

  const { data, error } = await supabase.auth.signInAnonymously()
  if (error) throw error
  return data.session.user.id
}
