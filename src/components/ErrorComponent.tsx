import React, { ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryState } from '../interfaces/IErrorBoundaryState';

interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary', error, errorInfo);
    const { onError } = this.props;
    if (onError) {
      onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 p-2">
          <h2>Something went wrong</h2>
          {this.state.error && <p>{this.state.error.toString()}</p>}
        </div>
      );
    }

    return this.props.children;
  }
}
