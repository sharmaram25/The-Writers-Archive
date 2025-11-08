import React, { useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from '../supabase/client'
import { THEMES } from '../constants/themes'
import { Toast } from '../components/SharedUI/Toast.jsx'
import Loader from '../components/SharedUI/Loader.jsx'

export default function Admin() {
  const [shayris, setShayris] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', full_content: '', theme: THEMES[0].value })
  const [editing, setEditing] = useState(null)
  const [toasts, setToasts] = useState([])
  const pushToast = (message, type='info') => setToasts(t => [...t, { id: Date.now()+Math.random(), message, type }])

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('shayris').select('*').order('created_at',{ ascending:false })
    if (error) pushToast(error.message, 'error')
    else setShayris(data)
    setLoading(false)
  }
  useEffect(() => { if (supabaseConfigured) load(); else setLoading(false) }, [])

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    if (editing) {
      const { error } = await supabase
        .from('shayris')
        .update({ title: form.title, full_content: form.full_content, theme: form.theme })
        .eq('id', editing.id)
      if (error) pushToast(error.message, 'error')
      else { pushToast('Updated successfully','success'); setEditing(null); setForm({ title:'', full_content:'', theme:'' }); load() }
    } else {
      const { error } = await supabase
        .from('shayris')
        .insert({ title: form.title, full_content: form.full_content, theme: form.theme })
      if (error) pushToast(error.message, 'error')
      else { pushToast('Created successfully','success'); setForm({ title:'', full_content:'', theme:'' }); load() }
    }
  }
  const edit = s => { setEditing(s); setForm({ title: s.title||'', full_content: s.full_content||'', theme: s.theme||THEMES[0].value }) }
  const del = async id => {
    const { error } = await supabase.from('shayris').delete().eq('id', id)
    if (error) pushToast(error.message, 'error')
    else { pushToast('Deleted','success'); load() }
  }

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl text-gold">Admin Dashboard</h2>
      {!supabaseConfigured && (
        <div className="glass-panel p-4 text-sm text-red-300">
          Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local, restart dev server, then revisit this page.
        </div>
      )}
  <form onSubmit={submit} className="glass-panel p-6 space-y-4" aria-disabled={!supabaseConfigured}>
        <h3 className="font-serif text-xl">{editing ? 'Edit Shayari' : 'New Shayari'}</h3>
        <input name="title" value={form.title} onChange={onChange} placeholder="Title (optional)" className="w-full bg-deepblue/50 border border-white/10 rounded px-3 py-2 text-sm" />
        <textarea name="full_content" value={form.full_content} onChange={onChange} placeholder="Full Content" rows={6} className="w-full bg-deepblue/50 border border-white/10 rounded px-3 py-2 text-sm font-serif" />
        <div className="text-left">
          <label className="block mb-1 text-xs text-neutral-300">Theme</label>
          <select name="theme" value={form.theme} onChange={onChange} className="w-full bg-deepblue/50 border border-white/10 rounded px-3 py-2 text-sm">
            {THEMES.map(t => (
              <option key={t.key} value={t.value}>{t.englishName}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="glass-button" disabled={!supabaseConfigured}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button type="button" onClick={() => { setEditing(null); setForm({ title:'', full_content:'', theme:'' }) }} className="glass-button">Cancel</button>}
        </div>
      </form>
      <div className="space-y-4">
        <h3 className="font-serif text-xl text-gold/80">Existing Shayaris</h3>
  {loading && <Loader />}
        <ul className="space-y-3">
          {shayris.map(s => (
            <li key={s.id} className="glass-panel p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-serif text-parchment/90 text-sm">{s.title || 'Untitled'}</span>
                <div className="flex gap-2">
                  <button onClick={() => edit(s)} className="glass-button text-xs px-3 py-1">Edit</button>
                  <button onClick={() => del(s.id)} className="glass-button text-xs px-3 py-1">Delete</button>
                </div>
              </div>
              <pre className="text-[11px] whitespace-pre-wrap line-clamp-4 font-serif text-neutral-300">{s.full_content}</pre>
            </li>
          ))}
        </ul>
      </div>
      {toasts.map(t => <Toast key={t.id} message={t.message} type={t.type} onDone={() => setToasts(ts => ts.filter(x => x.id !== t.id))} />)}
    </div>
  )
}
