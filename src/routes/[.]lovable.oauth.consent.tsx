import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type AuthorizationDetails = {
  client?: { name?: string; redirect_uri?: string } | null;
  redirect_url?: string | null;
  redirect_to?: string | null;
  scopes?: string[] | null;
};

// Beta namespace on @supabase/supabase-js
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

function oauthApi(): OAuthApi {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (supabase.auth as any).oauth as OAuthApi;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/login", search: { next } as never });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="mx-auto max-w-md px-6 py-16 text-center">
      <h1 className="font-display text-2xl text-navy">Could not load authorization</h1>
      <p className="mt-3 text-sm text-muted-foreground">{String((error as Error)?.message ?? error)}</p>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "an application";

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const res = approve
      ? await oauthApi().approveAuthorization(authorization_id)
      : await oauthApi().denyAuthorization(authorization_id);
    if (res.error) {
      setBusy(false);
      setError(res.error.message);
      return;
    }
    const target = res.data?.redirect_url ?? res.data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("The authorization server did not return a redirect URL.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Authorize access</p>
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-navy">
          Connect {clientName} to your QBH UMBRELLA account
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {clientName} will be able to call the QBH UMBRELLA Alumni tools while you are signed in — reading and updating your own profile and browsing the alumni directory, events and announcements as you.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          This does not bypass this app's permissions or backend policies.
        </p>
        {error && <p role="alert" className="mt-4 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
        <div className="mt-7 flex gap-3">
          <Button onClick={() => decide(true)} disabled={busy} className="flex-1 bg-navy text-navy-foreground hover:opacity-90">
            {busy ? "Working…" : "Approve"}
          </Button>
          <Button onClick={() => decide(false)} disabled={busy} variant="outline" className="flex-1">
            Deny
          </Button>
        </div>
      </div>
    </main>
  );
}
