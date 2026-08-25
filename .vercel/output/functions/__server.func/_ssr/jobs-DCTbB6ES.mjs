import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { H as Header, F as Footer } from "./Footer-4FIXv-wL.mjs";
import { s as supabase } from "./client-G-mu7uFn.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { j as Search, B as Briefcase } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./router-X5SYAAJg.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "../_libs/jose.mjs";
import "../_libs/ajv.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/json-schema-traverse.mjs";
import "../_libs/fast-uri.mjs";
function JobsPage() {
  const [q, setQ] = reactExports.useState("");
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("announcements").select("*").eq("category", "job").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data2 ?? [];
    }
  });
  const filtered = reactExports.useMemo(() => {
    if (!q) return data ?? [];
    const pq = q.toLowerCase();
    return (data ?? []).filter((j) => [j.title, j.body].some((v) => v?.toLowerCase().includes(pq)));
  }, [data, q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto flex-1 px-4 py-14 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground", children: "Opportunities" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-semibold tracking-tight text-navy lg:text-5xl", children: "Jobs Board" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-muted-foreground", children: "Roles, internships, and referrals posted by the alumni network. Reach out via the contact in each post." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search roles...", className: "pl-9", value: q, onChange: (e) => setQ(e.target.value) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4 md:grid-cols-2", children: filtered.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3.5 w-3.5", strokeWidth: 1.75 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Job · ",
            new Date(j.created_at).toLocaleDateString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-xl font-semibold text-navy", children: j.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 whitespace-pre-line text-sm text-muted-foreground", children: j.body })
      ] }, j.id)) }),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-xl border border-dashed border-border p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-navy", children: "No openings posted yet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "Have a role to share? ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-navy underline", children: "Send it to the alumni office" }),
          "."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  JobsPage as component
};
