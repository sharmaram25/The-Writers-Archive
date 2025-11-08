import React from 'react'
export default function Loader({ small }) {
  return (
    <div className={`inline-block ${small ? 'scale-75' : ''}`} role="status" aria-label="loading">
      <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
