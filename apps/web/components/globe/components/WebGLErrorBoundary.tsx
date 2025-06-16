'use client';

import React from 'react';

interface WebGLErrorBoundaryState {
  hasError: boolean;
  errorInfo: string | null;
}

export class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode },
  WebGLErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): WebGLErrorBoundaryState {
    console.error('WebGL Error Boundary caught:', error);
    return {
      hasError: true,
      errorInfo: error.message.includes('context') ? 'WebGL Context Issue' : 'Rendering Error'
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('WebGL Error Details:', error, errorInfo);

    // Attempt automatic recovery for context loss
    if (error.message.includes('context') || error.message.includes('WebGL')) {
      setTimeout(() => {
        this.setState({ hasError: false, errorInfo: null });
      }, 3000);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-full h-[800px] bg-gradient-to-b from-purple-900/20 to-blue-900/20 rounded-xl">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-4">⚠️ {this.state.errorInfo || 'WebGL Error'}</div>
            <p className="text-white text-sm mb-4">
              {this.state.errorInfo === 'WebGL Context Issue'
                ? 'Graphics context will be restored automatically...'
                : 'Unable to load 3D Globe'}
            </p>
            {this.state.errorInfo === 'WebGL Context Issue' ? (
              <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
            ) : (
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Reload Page
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
