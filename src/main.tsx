// Cache-busting build marker: 2026-08-29T00:00:00Z
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import "./styles.css";
import { getRouter } from "./router";

const router = getRouter();

class AppErrorBoundary extends React.Component<React.PropsWithChildren, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
          <div className="max-w-md">
            <h1 className="font-display text-3xl font-semibold text-navy">QBH UMBRELLA is taking a short pause.</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Please refresh the page to try again.</p>
            <button className="mt-6 rounded-md bg-navy px-4 py-2 text-sm text-navy-foreground" onClick={() => window.location.reload()}>Refresh page</button>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <AppErrorBoundary>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  </StrictMode>,
);
