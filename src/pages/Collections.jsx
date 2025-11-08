import React, { useEffect, useMemo, useState } from 'react'
import { supabase, supabaseConfigured } from '../supabase/client'
import ShayriCard from '../components/ShayriCard.jsx'
import Modal from '../components/Modal.jsx'
import Loader from '../components/SharedUI/Loader.jsx'
import { THEMES, getThemeByValue } from '../constants/themes'

export default function Collections() {
  const [shayris, setShayris] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [active, setActive] = useState(null)
  // state used inside effects must be declared before effects
  const [selectedTheme, setSelectedTheme] = useState('all')
  const [sort, setSort] = useState('new') // new | old | title
  // Fetch data (server-side filtering/sorting when configured)
  useEffect(() => {
    if (!supabaseConfigured) { setLoading(false); return }
    const fetchData = async () => {
      setLoading(true)
      let q = supabase.from('shayris').select('*')
      if (selectedTheme !== 'all') q = q.eq('theme', selectedTheme)
      if (sort === 'new') q = q.order('created_at', { ascending: false })
      if (sort === 'old') q = q.order('created_at', { ascending: true })
      if (sort === 'title') q = q.order('title', { ascending: true, nullsFirst: true })
      const { data, error } = await q
      if (error) setError(error.message)
      else setShayris(data)
      setLoading(false)
    }
    fetchData()
  }, [selectedTheme, sort])

  const filtered = useMemo(() => {
    let list = [...shayris]
    if (selectedTheme !== 'all') list = list.filter(s => s.theme === selectedTheme)
    if (sort === 'new') list.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    if (sort === 'old') list.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
    if (sort === 'title') list.sort((a,b) => (a.title||'').localeCompare(b.title||''))
    return list
  }, [shayris, selectedTheme, sort])

  const copy = () => {
    if (active) navigator.clipboard.writeText(active.full_content)
  }
  const share = async () => {
    if (navigator.share && active) {
      try { await navigator.share({ title: active.title || 'Shayari', text: active.full_content }) } catch (e) {}
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-3xl text-gold">Collections</h2>
      {loading && <div className="flex justify-center"><Loader /></div>}
      {error && (
        <div className="glass-panel p-4 text-sm text-red-300">
          {error} — Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local and restart.
        </div>
      )}
      {/* Compact Filter Bar - width fits content to avoid extra right space */}
      <div className={`glass-panel inline-block w-fit max-w-full p-3 md:p-3 border ${selectedTheme==='all' ? 'border-white/10' : (getThemeByValue(selectedTheme)?.accent.border || 'border-white/10')}`}>
        <div className="flex flex-wrap items-center gap-1.5">
          <button onClick={() => setSelectedTheme('all')} className={`px-3 py-1 rounded-full text-[11px] border ${selectedTheme==='all' ? 'bg-gold/20 border-gold text-parchment' : 'bg-deepblue/50 border-white/10 text-neutral-300'}`}>All</button>
          {THEMES.map(t => (
            <button
              key={t.key}
              onClick={() => setSelectedTheme(t.value)}
              className={`px-3 py-1 rounded-full text-[11px] border transition-colors flex items-center gap-1 ${selectedTheme===t.value ? 'bg-gold/20 border-gold text-parchment' : 'bg-deepblue/50 border-white/10 text-neutral-300 hover:border-white/20'}`}
              aria-pressed={selectedTheme===t.value}
            >
              <span className="opacity-80">{t.glyph}</span>
              <span>{t.hindiName}</span>
            </button>
          ))}
          {/* Inline sort control to consume remaining row width when needed */}
          <div className="flex items-center gap-2 text-[11px] pl-2 mt-1 md:mt-0">
            <span className="text-neutral-400">Sort:</span>
            <select value={sort} onChange={e => setSort(e.target.value)} className="bg-deepblue/50 border border-white/10 rounded px-2 py-1.5">
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Centered tagline below the bar */}
      {selectedTheme !== 'all' && (() => {
        const t = getThemeByValue(selectedTheme)
        if (!t) return null
        return (
          <div className="text-center mt-2">
            <h3 className="font-serif text-xl md:text-2xl text-gold">{t.tagline}</h3>
            <p className="text-[11px] text-neutral-400">{t.hindiName}</p>
          </div>
        )
      })()}

      {/* Grid */}
      <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3`}> 
        {filtered.map(s => (
          <ShayriCard key={s.id} shayri={s} onOpen={setActive} />
        ))}
      </div>
      <Modal isOpen={!!active} onClose={() => setActive(null)}>
        {active && (
          <div className="space-y-4">
            {active.title && <h3 className="font-serif text-2xl text-gold/90">{active.title}</h3>}
            <pre className="font-serif whitespace-pre-wrap text-sm leading-relaxed text-parchment/90">{active.full_content}</pre>
            <div className="flex gap-3 pt-2">
              <button onClick={copy} className="glass-button">Copy</button>
              <button onClick={share} className="glass-button">Share</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
