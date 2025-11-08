import React, { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { THEMES, getThemeByValue } from '../constants/themes'

export default function ShayriCard({ shayri, onOpen }) {
  const preview = shayri.preview || shayri.full_content?.split('\n').slice(0,4).join('\n')
  const theme = useMemo(() => getThemeByValue(shayri.theme), [shayri.theme])
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2
    const ry = ((x - midX) / midX) * 6 // rotateY
    const rx = -((y - midY) / midY) * 6 // rotateX
    setTilt({ rx, ry })
  }
  const resetTilt = () => setTilt({ rx: 0, ry: 0 })

  return (
    <motion.button
      ref={ref}
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
      onMouseMove={onMove}
      onMouseLeave={resetTilt}
      style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      onClick={() => onOpen(shayri)}
      className={`group relative text-left overflow-hidden p-4 flex flex-col gap-3 rounded-glass border shadow-vintage focus:outline-none focus:ring-2 focus:ring-brass/40 dark:focus:ring-gold/30
        ${theme ? theme.accent.border : 'border-white/10'}
        glass-panel`}
    >
      {/* Theme gradient wash */}
      {theme && (
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.accent.gradient}`} />
      )}
      {/* Shine sweep on hover */}
      <div className="pointer-events-none absolute -inset-[120%] left-[-150%] top-[-150%] rotate-12 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
        <div className="h-[200%] w-[200%] bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
      </div>

      {/* Content */}
      <div className="relative z-[1]">
        {shayri.title && <h3 className="font-serif text-lg tracking-wide text-sepia dark:text-gold/90 group-hover:text-brass dark:group-hover:text-gold transition-colors">{shayri.title}</h3>}
        <pre className="font-serif whitespace-pre-wrap text-sm leading-relaxed text-ink/80 dark:text-parchment/90 line-clamp-4">{preview}</pre>
      </div>

      {/* Theme identity pill + glyph */}
      {shayri.theme && (
        <div className="relative z-[1] flex items-center gap-1 text-[10px] text-sepia/60 dark:text-neutral-400">
          <span className="opacity-80">{theme?.glyph}</span>
          <span className="px-2 py-0.5 rounded-full bg-brass/10 text-brass/80 dark:bg-gold/10 dark:text-gold/80 border border-brass/20 dark:border-gold/20">
            {theme ? theme.hindiName : shayri.theme}
          </span>
        </div>
      )}

      {/* Hover glow ring */}
      {theme && <div className={`pointer-events-none absolute inset-0 rounded-glass ${theme.accent.glow} opacity-0 group-hover:opacity-100 transition-opacity`} />}
    </motion.button>
  )
}
