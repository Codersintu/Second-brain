import React from "react";
import type { ErrorInfo ,ReactNode} from "react"; // 👈 type-only import


interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            background: "red",
            color: "white",
            borderRadius: 8,
            padding: 16,
            textAlign: "center",
            minHeight:"256px",
            display:"flex",
            alignItems:"center"
          }}
        >
          ⚠️ Something went wrong.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
