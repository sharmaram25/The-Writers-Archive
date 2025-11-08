import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

export function Toast({ message, type = 'info', onDone, duration = 2600 }) {
  useEffect(() => {
    const t = setTimeout(onDone, duration)
    return () => clearTimeout(t)
  }, [onDone, duration])
  const colors = type === 'error' ? 'bg-red-500/80' : type === 'success' ? 'bg-green-500/80' : 'bg-deepblue/70'
  return createPortal(
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs shadow-glass backdrop-blur-md text-parchment ${colors}`}>{message}</div>,
    document.body
  )
}
