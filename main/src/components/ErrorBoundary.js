import { Component } from 'react';

/**
 * Error boundary wrapper to save Application parts from falling
 * @component ErrorBoundary
 * @param {string} [props.name] - name of the wrapped segment, "Error Boundary" by default
 */
class ErrorBoundary extends Component {
  static defaultProps = {
    name: 'Error Boundary',
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>{this.props.name} - Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state?.error?.toString()}
            <br />
            {this.state?.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
