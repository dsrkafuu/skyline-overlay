import { Component, ErrorInfo, ReactNode } from 'react';

import { logError } from './utils/loggers';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    logError('ErrorBoundary::renderError', error, errorInfo.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className='container'>
        <div className='app-error'>
          <div className='app-error-title'>Skyline Overlay</div>
          <div className='app-error-desc'>Rendering failed due to unexpected data or UI state.</div>
          <button className='app-error-btn' onClick={this.handleReload}>
            Reload Overlay
          </button>
          {import.meta.env.DEV && this.state.errorMessage && (
            <pre className='app-error-debug'>{this.state.errorMessage}</pre>
          )}
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
