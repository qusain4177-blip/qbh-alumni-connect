import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-navy">Page not found.</h1>
        <p className="mt-3 text-sm text-muted-foreground">The link is broken or the page has moved.</p>
        <Link to="/" className="mt-7 inline-flex rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground hover:bg-navy/90">
          Back to home
        </Link>
      </div>

    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-navy">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again or return home.</p>
        <button onClick={reset} className="mt-6 rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "QBH UMBRELLA - Alumni Directory Portal" },
      { name: "description", content: "Reconnect with classmates, mentor the next generation, and stay close to the heart of our school." },
      { property: "og:title", content: "QBH UMBRELLA - Alumni Directory Portal" },
      { name: "twitter:title", content: "QBH UMBRELLA - Alumni Directory Portal" },
      { property: "og:description", content: "Reconnect with classmates, mentor the next generation, and stay close to the heart of our school." },
      { name: "twitter:description", content: "Reconnect with classmates, mentor the next generation, and stay close to the heart of our school." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e84405aa-0307-4275-b8df-7ff4365a6a1e/id-preview-3bf50dca--32e27c7f-4ea4-400f-9d23-70d862346a69.lovable.app-1779918965052.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e84405aa-0307-4275-b8df-7ff4365a6a1e/id-preview-3bf50dca--32e27c7f-4ea4-400f-9d23-70d862346a69.lovable.app-1779918965052.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
