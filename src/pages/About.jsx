import React, { useState } from 'react'
import authorImage from '../assets/author.jpg'

// Expanded author profile (static). Customize freely.
const AUTHOR = {
  name: 'Ram Sharma',
  tagline: 'I write to give shape to the emotions that words often fall short of.',
  // Image imported as module for better bundling
  profile_pic_url: authorImage,
  bio: `My shayris are a blend of Hindi and Urdu — born from moments of love, loss, and everything in between.
The Writer’s Archive is where I keep those fragments alive, one verse at a time —
कभी अल्फ़ाज़ कम पड़ जाते हैं,
तो ख़ामोशी ही मेरा शेर बन जाती है।`,
  philosophy: `Poetry as a slow craft: deliberate pauses, attentive revision, and emotional honesty over ornamental excess.
Each piece seeks a certain temperature—never hurried, never forced.`,
  influences: [ 'Classical Urdu couplets', 'Letter writing', 'Rainy evenings', 'Solitude', 'Old journals' ],
  stack: [ 'React', 'Vite', 'Tailwind', 'Supabase', 'Framer Motion' ],
  social_links: {
    Instagram: 'https://www.instagram.com/ramsharma.25',
    GitHub: 'https://github.com/sharmaram25'
  }
}

export default function About() {
  const { name, tagline, profile_pic_url, bio, philosophy, influences, stack, social_links } = AUTHOR
  const [imageError, setImageError] = useState(false)
  
  const handleImageError = () => {
    setImageError(true)
  }
  
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl text-gradient-gold">Author</h2>
        <p className="text-sm md:text-base text-sepia/70 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">{tagline}</p>
      </section>

      {/* Profile Card */}
      <div className="paper-surface dark:glass-panel max-w-4xl mx-auto p-6 md:p-8 grid md:grid-cols-[220px_1fr] gap-6 md:gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          {!imageError ? (
            <img 
              src={profile_pic_url} 
              alt={name} 
              className="w-44 h-44 object-cover rounded-full border border-brass/40 dark:border-white/10 shadow-vintage"
              onError={handleImageError}
            />
          ) : (
            <div className="w-44 h-44 rounded-full border border-brass/40 dark:border-white/10 shadow-vintage bg-gradient-to-br from-brass/20 to-brass/40 dark:from-gold/20 dark:to-gold/40 flex items-center justify-center">
              <span className="text-4xl font-serif text-brass/70 dark:text-gold/70">{name.split(' ').map(n => n[0]).join('')}</span>
            </div>
          )}
          <div className="text-center md:text-left space-y-1">
            <h3 className="font-serif text-2xl tracking-wide text-sepia dark:text-parchment/90">{name}</h3>
            <span className="text-xs uppercase tracking-wider text-brass/70 dark:text-gold/70">Poet • Curator</span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
            {Object.entries(social_links).map(([k,v]) => (
              <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="text-[11px] px-3 py-1 rounded-full border border-brass/30 dark:border-gold/30 bg-brass/10 dark:bg-gold/10 text-brass/80 dark:text-gold/80 hover:bg-brass/20 dark:hover:bg-gold/20 transition-colors">{k}</a>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <section className="space-y-3">
            <h4 className="font-serif text-lg text-sepia dark:text-gold">Bio</h4>
            <p className="text-[13px] leading-relaxed whitespace-pre-wrap text-ink/80 dark:text-neutral-300">{bio}</p>
          </section>
          <section className="space-y-3">
            <h4 className="font-serif text-lg text-sepia dark:text-gold">Philosophy</h4>
            <p className="text-[13px] leading-relaxed whitespace-pre-wrap text-ink/80 dark:text-neutral-300">{philosophy}</p>
          </section>
          <div className="grid sm:grid-cols-2 gap-6">
            <section className="space-y-3">
              <h4 className="font-serif text-lg text-sepia dark:text-gold">Influences</h4>
              <ul className="text-[12px] space-y-1 text-ink/70 dark:text-neutral-300">
                {influences.map(i => <li key={i} className="flex items-start gap-2"><span className="text-brass dark:text-gold">•</span><span>{i}</span></li>)}
              </ul>
            </section>
            <section className="space-y-3">
              <h4 className="font-serif text-lg text-sepia dark:text-gold">Stack</h4>
              <div className="flex flex-wrap gap-2">
                {stack.map(t => <span key={t} className="text-[11px] px-2 py-1 rounded bg-brass/10 dark:bg-gold/10 text-brass/80 dark:text-gold/80 border border-brass/20 dark:border-gold/20">{t}</span>)}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Closing Note */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs text-sepia/60 dark:text-neutral-400">This archive is a living document. Pieces may be refined over time—words are allowed to breathe and evolve.</p>
        <p className="text-[11px] italic text-sepia/50 dark:text-neutral-500">“Silence is the page before the first line.”</p>
      </div>
    </div>
  )
}
