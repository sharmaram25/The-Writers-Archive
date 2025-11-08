import React, { useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from '../supabase/client'
import Loader from './SharedUI/Loader.jsx'

export default function RandomShayri() {
  const [shayri, setShayri] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!supabaseConfigured) { setLoading(false); setError('Supabase is not configured.'); return }
    const fetchRandom = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('shayris').select('*')
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
      if (data && data.length) {
        const pick = data[Math.floor(Math.random() * data.length)]
        setShayri(pick)
      }
      setLoading(false)
    }
    fetchRandom()
  }, [])
  if (loading) return <div className="flex justify-center"><Loader small /></div>
  if (error) return (
    <div className="glass-panel p-4 text-xs text-red-300">
      {error} — Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local and restart.
    </div>
  )
  if (!shayri) return null
  return (
    <div className="glass-panel p-6">
      <h2 className="font-serif text-xl mb-3 tracking-wide text-sepia dark:text-gold">Featured Shayari</h2>
      <pre className="font-serif whitespace-pre-wrap text-sm leading-relaxed text-ink/80 dark:text-parchment/90 line-clamp-4">{shayri.full_content}</pre>
    </div>
  )
}
