import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-lg mx-auto mt-32 glass-panel p-8 text-center space-y-4">
          <h2 className="font-serif text-2xl text-gold">Something went wrong</h2>
          <p className="text-sm text-neutral-300 whitespace-pre-wrap">{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} className="glass-button">Reload</button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
