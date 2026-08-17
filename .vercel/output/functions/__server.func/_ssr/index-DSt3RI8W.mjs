import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { H as Header, F as Footer } from "./Footer-4FIXv-wL.mjs";
import { s as supabase } from "./client-G-mu7uFn.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { A as Award, a as ArrowRight, U as Users, b as ArrowUpRight, S as Sparkles, B as Briefcase, C as Calendar, G as Globe } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
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
const heroImg = "/assets/hero-school-C1HxzGzX.jpg";
function Landing() {
  const [tickerItems, setTickerItems] = reactExports.useState([]);
  reactExports.useEffect(() => {
    supabase.from("news").select("title").eq("published", true).order("created_at", {
      ascending: false
    }).limit(8).then(({
      data
    }) => {
      const items = (data ?? []).map((n) => n.title);
      setTickerItems(items.length ? items : ["Alumni Reunion 2026 — registration open", "Matric 2015 marks ten years since graduation", "New mentorship program pairs students with working alumni", "Three QBHS UMBRELLA graduates named in regional honours list"]);
    });
  }, []);
  const {
    data: stats
  } = useQuery({
    queryKey: ["landing-stats"],
    queryFn: async () => {
      const [{
        count: alumniCount
      }, {
        data: events
      }] = await Promise.all([supabase.from("profiles").select("*", {
        count: "exact",
        head: true
      }).eq("status", "approved"), supabase.from("events").select("*").gte("event_date", (/* @__PURE__ */ new Date()).toISOString()).order("event_date").limit(3)]);
      return {
        alumniCount: alumniCount ?? 0,
        events: events ?? []
      };
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border bg-navy", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "QBHS UMBRELLA campus building", className: "h-full w-full object-cover object-center opacity-30", width: 1600, height: 1100 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-navy/70" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container relative mx-auto px-4 py-28 lg:px-8 lg:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }),
          " QBHS UMBRELLA"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl", children: [
          "The Matric class, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
          " still in one room."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 lg:text-lg", children: "The official alumni network of QBHS UMBRELLA. Find your batch, share what you're working on, and stay in touch." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-9 flex flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/directory", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "rounded-md bg-white text-navy hover:bg-white/90", children: [
            "Browse alumni ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1.5 h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", className: "rounded-md border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white", children: "Contact office" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/50", children: "Alumni" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1.5 font-display text-3xl font-semibold tracking-tight text-white", children: (stats?.alumniCount ?? 0) + "+" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/50", children: "Batches" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1.5 font-display text-3xl font-semibold tracking-tight text-white", children: "40+" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/50", children: "Countries" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1.5 font-display text-3xl font-semibold tracking-tight text-white", children: "25+" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative border-t border-white/10 bg-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex items-center gap-4 overflow-hidden px-4 py-3 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded border border-white/15 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white/70", children: "Latest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ticker flex shrink-0 gap-12 whitespace-nowrap text-sm text-white/70", children: [...tickerItems, ...tickerItems].map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-white/40" }),
          " ",
          t
        ] }, i)) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-28 lg:px-8 lg:py-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 lg:grid-cols-12 lg:gap-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground", children: "What this is" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-4xl font-semibold tracking-tight text-navy lg:text-5xl", children: "An address book the school never lost." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-muted-foreground lg:col-span-7 lg:pt-2 lg:text-lg", children: "QBHS UMBRELLA has been graduating Matric students for forty years. Most of them lost touch the week after results came out. This is the place to find them again — and to keep your own details current as life moves around." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-6 md:gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-navy p-8 text-white transition-all duration-300 hover:border-white/20 md:col-span-4 md:row-span-2 md:p-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5", strokeWidth: 1.75 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/50", children: "01 / Directory" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold tracking-tight md:text-3xl", children: "Find anyone, any batch." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-md text-sm leading-relaxed text-white/65", children: "Filter by passing year, city, profession, or stream. No friend-of-a-friend hunts on WhatsApp." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/directory", className: "mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-all duration-300 hover:gap-2.5", children: [
              "Open directory ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4", strokeWidth: 2 })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20 md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-md bg-secondary text-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5", strokeWidth: 1.75 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl font-semibold tracking-tight text-navy", children: (stats?.alumniCount ?? 0) + "+" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Verified alumni" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20 md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-md bg-secondary text-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5", strokeWidth: 1.75 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-navy", children: "Jobs & mentors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-muted-foreground", children: "Post openings to people who already share a school. Ask for advice from someone who has been where you are going." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20 md:col-span-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-md bg-secondary text-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5", strokeWidth: 1.75 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-display text-lg font-semibold text-navy", children: "Reunions, on the record" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-muted-foreground", children: "Batch meets, school days, chapter dinners. Listed in one place with dates, venues and RSVP counts." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex items-center justify-between rounded-xl border border-border bg-secondary/60 p-6 transition-all duration-300 hover:bg-secondary md:col-span-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-navy", children: "Chapters abroad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-muted-foreground", children: "Alumni in 25+ countries. Karachi, Dubai and Toronto chapters meet quarterly." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-md border border-border bg-card text-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5", strokeWidth: 1.75 }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/50 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground", children: "Upcoming" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl font-semibold tracking-tight text-navy", children: "On the calendar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", className: "hidden text-sm font-medium text-navy hover:text-gold sm:inline-flex", children: "All events →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-3", children: (stats?.events?.length ? stats.events : [{
        id: "p1",
        title: "Alumni Reunion 2026",
        event_date: "2026-09-12T18:00:00.000Z",
        location: "Ghazi Dawood Brohi Goth, Karachi, Karachi City, Sindh, Pakistan"
      }, {
        id: "p2",
        title: "Mentorship night",
        event_date: "2026-07-04T17:00:00.000Z",
        location: "Online"
      }, {
        id: "p3",
        title: "Matric 2006 — Present & Beyond",
        event_date: "2026-11-22T17:00:00.000Z",
        location: "Karachi Malir"
      }]).map((e) => {
        const d = new Date(e.event_date);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 bg-gradient-hero p-6 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-white/70", children: d.toLocaleString("en", {
                month: "short"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-semibold tracking-tight", children: d.getDate() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: e.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70", children: e.id === "p3" ? "For all pass-outs from 2006 onwards" : d.toLocaleDateString("en", {
                weekday: "long",
                year: "numeric"
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-5 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 text-gold" }),
            " ",
            e.location ?? "TBA"
          ] })
        ] }, e.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4 py-24 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-navy p-12 text-white lg:p-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold tracking-tight lg:text-5xl", children: "Looking for a classmate?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base leading-relaxed text-white/65", children: "Every verified alumnus is listed in the directory. Search by batch, stream, or profession — no account required." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/directory", className: "mt-8 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "rounded-md bg-white text-navy hover:bg-white/90", children: "Open the directory" }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Landing as component
};
