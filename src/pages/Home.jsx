import React from 'react'
import { Link } from 'react-router-dom'
import RandomShayri from '../components/RandomShayri.jsx'

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="text-center space-y-6">
        <h1 className="font-serif text-4xl md:text-5xl text-gradient-gold">The Writer's Archive</h1>
        <p className="max-w-xl mx-auto text-sm md:text-base leading-relaxed text-sepia/80 dark:text-neutral-300">An emotionally immersive collection of Shayari — moments captured in verse, curated with calm and crafted for timeless reflection.</p>
        <Link to="/collections" className="glass-button inline-block">View Collections</Link>
      </section>
      <RandomShayri />
    </div>
  )
}
