import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { H as Header, F as Footer } from "./Footer-4FIXv-wL.mjs";
import { s as supabase } from "./client-G-mu7uFn.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { C as Calendar, e as MapPin, N as Newspaper } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function EventsPage() {
  const {
    data: events
  } = useQuery({
    queryKey: ["events-all"],
    queryFn: async () => (await supabase.from("events").select("*").order("event_date")).data ?? []
  });
  const {
    data: news
  } = useQuery({
    queryKey: ["news-all"],
    queryFn: async () => (await supabase.from("news").select("*").eq("published", true).order("created_at", {
      ascending: false
    })).data ?? []
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-navy py-24 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/60", children: "Calendar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-5xl font-semibold tracking-tight lg:text-6xl", children: "Events & news" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-white/65", children: "Reunions, batch meets, and announcements from campus. Updated weekly." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-20 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold tracking-tight text-navy", children: "Coming up" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: [
          (events ?? []).map((e) => {
            const d = new Date(e.event_date);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-xl border border-border bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 bg-gradient-hero p-6 text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wider text-gold", children: d.toLocaleString("en", {
                    month: "short"
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-semibold", children: d.getDate() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: e.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-gold" }),
                  d.toLocaleString("en", {
                    dateStyle: "full",
                    timeStyle: "short"
                  })
                ] }),
                e.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-gold" }),
                  e.location
                ] }),
                e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-1", children: e.description })
              ] })
            ] }, e.id);
          }),
          events && events.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Nothing on the calendar yet. Check back in a few weeks." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/50 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold text-navy", children: "Recent news" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-5 md:grid-cols-2", children: [
          (news ?? []).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-xl border border-border bg-card p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-wider text-gold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "h-3.5 w-3.5" }),
              " ",
              new Date(n.created_at).toLocaleDateString("en", {
                dateStyle: "long"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-xl font-semibold text-navy", children: n.title }),
            n.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: n.excerpt })
          ] }, n.id)),
          news && news.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No announcements right now." })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  EventsPage as component
};
