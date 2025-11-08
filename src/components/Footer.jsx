import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-auto text-center text-xs text-sepia/60 dark:text-neutral-400 py-6">
      <p>&copy; {new Date().getFullYear()} The Writer's Archive. Crafted with calm.</p>
    </footer>
  )
}
