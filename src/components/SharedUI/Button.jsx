import React from 'react'
export default function Button({ children, className = '', ...rest }) {
  return (
    <button
      className={`glass-button ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
