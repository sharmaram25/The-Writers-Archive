import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = original }
    }
  }, [isOpen])
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-2xl w-full glass-panel p-6 space-y-4"
      >
        <button onClick={onClose} className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-deepblue/60 hover:bg-deepblue/70">✕</button>
        {children}
      </motion.div>
    </div>,
    document.getElementById('modal-root')
  )
}
