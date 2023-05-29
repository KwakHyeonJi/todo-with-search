import { Component, ReactNode } from 'react'

interface ApiErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ApiErrorBoundaryProps {
  children: ReactNode
}

export class ApiErrorBoundary extends Component<
  ApiErrorBoundaryProps,
  ApiErrorBoundaryState
> {
  constructor(props: ApiErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error: Error): ApiErrorBoundaryState {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      console.error(this.state.error)
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
