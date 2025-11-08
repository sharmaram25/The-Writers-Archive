import React from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

// A floating vintage pill toggle positioned near the top-right
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className={`fixed z-50 top-4 right-4 md:top-5 md:right-6 select-none
        px-3.5 py-1.5 rounded-full border text-xs tracking-wide backdrop-blur-md
        bg-white/70 text-ink border-ink/10 shadow-vintage hover:bg-white/85
        dark:bg-deepblue/60 dark:text-neutral-100 dark:border-white/15 dark:shadow-glass dark:hover:bg-deepblue/70
        transition-colors`}
    >
      <span className="mr-1.5">{isDark ? '☀️' : '🌙'}</span>
      <span className="font-medium">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
