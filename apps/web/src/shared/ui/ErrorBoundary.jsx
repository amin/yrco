import { Component } from 'react'
import { Button } from '@/shared/ui/buttons/Button'

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col justify-end h-svh p-base pb-2xl bg-white">
          <h1 className="font-sans text-xl leading-xl tracking-tighter font-normal mb-xs">Oh noo!</h1>
          <p className="font-sans text-xl leading-xl tracking-tighter font-light mb-2xl">Something went wrong</p>
          <Button onClick={() => window.location.reload()}>Try again</Button>
        </div>
      )
    }
    return this.props.children
  }
}
