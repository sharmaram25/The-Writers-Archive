import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/collections', label: 'Collections' },
  { to: '/author', label: 'Author' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme } = useTheme()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 px-8 py-3 flex items-center gap-8 rounded-full backdrop-blur-md border transition-all
          ${scrolled
            ? 'bg-white/80 border-ink/10 text-ink shadow-vintage scale-[0.97] dark:bg-deepblue/80 dark:border-white/15 dark:text-neutral-100 dark:shadow-glass'
            : 'bg-white/65 border-ink/10 text-ink dark:bg-deepblue/50 dark:border-white/10 dark:text-neutral-100'}
        `}
      >
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `relative text-sm font-medium tracking-wide ${isActive ? 'text-brass dark:text-gold' : 'text-ink/80 dark:text-neutral-200'} hover:text-brass dark:hover:text-gold transition-colors`}
          >
            {l.label}
            {location.pathname === l.to && (
              <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 w-full h-px bg-brass dark:bg-gold" />
            )}
          </NavLink>
        ))}
        {/* Theme toggle moved out of Navbar */}
      </motion.nav>
    </AnimatePresence>
  )
}
