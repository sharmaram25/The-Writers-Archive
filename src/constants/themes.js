export const THEMES = [
  {
    key: 'love',
    value: 'Love', // stored in DB
    englishName: 'Love',
    hindiName: 'Ishq',
    tagline: 'The language of hearts',
    glyph: '❤',
    accent: {
      border: 'border-rose-400/30 dark:border-rose-300/30',
      glow: 'shadow-[0_0_0_1px_rgba(244,63,94,0.25)]',
      gradient: 'from-rose-300/15 via-rose-200/10 to-transparent dark:from-rose-500/10 dark:via-rose-400/5 dark:to-transparent'
    }
  },
  {
    key: 'heartbreak',
    value: 'Heart Break',
    englishName: 'Heart Break',
    hindiName: 'Virah',
    tagline: 'The ache of absence',
    glyph: '💔',
    accent: {
      border: 'border-red-400/30 dark:border-red-300/30',
      glow: 'shadow-[0_0_0_1px_rgba(248,113,113,0.25)]',
      gradient: 'from-red-300/15 via-red-200/10 to-transparent dark:from-red-500/10 dark:via-red-400/5 dark:to-transparent'
    }
  },
  {
    key: 'dreams',
    value: 'Dreams',
    englishName: 'Dreams',
    hindiName: 'Khwab',
    tagline: 'The eyes of imagination',
    glyph: '🌙',
    accent: {
      border: 'border-indigo-400/30 dark:border-indigo-300/30',
      glow: 'shadow-[0_0_0_1px_rgba(99,102,241,0.22)]',
      gradient: 'from-indigo-300/15 via-sky-200/10 to-transparent dark:from-indigo-500/10 dark:via-sky-400/5 dark:to-transparent'
    }
  },
  {
    key: 'memories',
    value: 'Memories',
    englishName: 'Memories',
    hindiName: 'Yaadein',
    tagline: 'The echoes of time',
    glyph: '🕰️',
    accent: {
      border: 'border-amber-400/30 dark:border-amber-300/30',
      glow: 'shadow-[0_0_0_1px_rgba(251,191,36,0.22)]',
      gradient: 'from-amber-300/15 via-amber-200/10 to-transparent dark:from-amber-500/10 dark:via-amber-400/5 dark:to-transparent'
    }
  }
]

export const THEME_VALUES = THEMES.map(t => t.value)

export function getThemeByValue(value) {
  return THEMES.find(t => t.value === value)
}
