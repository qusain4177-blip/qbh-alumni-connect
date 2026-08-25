import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { a as Route$1, o as oauthApi } from "./_ssr/router-X5SYAAJg.mjs";
import { B as Button } from "./_ssr/button-BC9oXVxV.mjs";
import "./_libs/sonner.mjs";
import "./_libs/lovable.dev__mcp-js.mjs";
import "./_libs/modelcontextprotocol__sdk.mjs";
import "./_libs/zod-to-json-schema.mjs";
import "./_libs/ajv-formats.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_ssr/client-G-mu7uFn.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/zod.mjs";
import "./_libs/jose.mjs";
import "./_libs/ajv.mjs";
import "./_libs/fast-deep-equal.mjs";
import "./_libs/json-schema-traverse.mjs";
import "./_libs/fast-uri.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/tailwind-merge.mjs";
function Consent() {
  const details = Route$1.useLoaderData();
  const {
    authorization_id
  } = Route$1.useSearch();
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const clientName = details?.client?.name ?? "an application";
  async function decide(approve) {
    setBusy(true);
    setError(null);
    const res = approve ? await oauthApi().approveAuthorization(authorization_id) : await oauthApi().denyAuthorization(authorization_id);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground", children: "Authorize access" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-2xl font-semibold tracking-tight text-navy", children: [
      "Connect ",
      clientName,
      " to your QBHS UMBRELLA account"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
      clientName,
      " will be able to call the QBHS UMBRELLA Alumni Portal tools while you are signed in — reading and updating your own profile and browsing the alumni directory, events and announcements as you."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "This does not bypass this app's permissions or backend policies." }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "mt-4 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => decide(true), disabled: busy, className: "flex-1 bg-navy text-navy-foreground hover:opacity-90", children: busy ? "Working…" : "Approve" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => decide(false), disabled: busy, variant: "outline", className: "flex-1", children: "Deny" })
    ] })
  ] }) });
}
export {
  Consent as component
};
