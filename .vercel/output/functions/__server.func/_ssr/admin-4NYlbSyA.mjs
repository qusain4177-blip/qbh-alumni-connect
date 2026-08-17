import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery, a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { D as Dialog$1, a as DialogPortal$1, b as DialogContent$1, c as DialogClose, d as DialogTitle$1, e as DialogOverlay$1, f as DialogDescription$1 } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { H as Header, F as Footer } from "./Footer-4FIXv-wL.mjs";
import { u as useAuth } from "./router-X5SYAAJg.mjs";
import { s as supabase } from "./client-G-mu7uFn.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { U as Users, N as Newspaper, h as CalendarPlus, i as Megaphone, j as Search, D as Download, P as Plus, k as Pencil, l as Trash2, X } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "../_libs/jose.mjs";
import "../_libs/ajv.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/json-schema-traverse.mjs";
import "../_libs/fast-uri.mjs";
const Dialog = Dialog$1;
const DialogPortal = DialogPortal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay$1,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogOverlay$1.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogContent$1.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle$1,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogTitle$1.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription$1,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogDescription$1.displayName;
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
function AdminPage() {
  const {
    user,
    isAdmin,
    loading
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({
        to: "/admin/login"
      });
      return;
    }
    if (!isAdmin) {
      toast.error("Admin access required");
      navigate({
        to: "/"
      });
    }
  }, [loading, user, isAdmin, navigate]);
  if (loading || !user || !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center text-muted-foreground", children: "Verifying access..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto flex-1 px-4 py-12 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold", children: "Operator Console" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-semibold text-navy", children: "Admin Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Centralized control over alumni, events, and content." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stats, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "users", className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "users", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mr-2 h-4 w-4" }),
            "Alumni"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "news", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "mr-2 h-4 w-4" }),
            "News"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "events", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "mr-2 h-4 w-4" }),
            "Events"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "announce", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "mr-2 h-4 w-4" }),
            "Announcements"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "users", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlumniMgmt, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "news", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NewsMgmt, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "events", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EventsMgmt, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "announce", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnnouncementsMgmt, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Stats() {
  const {
    data
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [{
        count: total
      }, {
        count: pending
      }, {
        data: recent
      }, {
        data: rows
      }] = await Promise.all([supabase.from("profiles").select("*", {
        count: "exact",
        head: true
      }), supabase.from("profiles").select("*", {
        count: "exact",
        head: true
      }).eq("status", "pending"), supabase.from("profiles").select("id, full_name, created_at").order("created_at", {
        ascending: false
      }).limit(5), supabase.from("profiles").select("graduation_year, matric_stream")]);
      const yearMap = {};
      const streamMap = {};
      (rows ?? []).forEach((p) => {
        if (p.graduation_year) yearMap[p.graduation_year] = (yearMap[p.graduation_year] ?? 0) + 1;
        const s = p.matric_stream || "Unspecified";
        streamMap[s] = (streamMap[s] ?? 0) + 1;
      });
      const topYears = Object.entries(yearMap).sort((a, b) => Number(b[0]) - Number(a[0])).slice(0, 6);
      const streams = Object.entries(streamMap).sort((a, b) => b[1] - a[1]);
      return {
        total: total ?? 0,
        pending: pending ?? 0,
        recent: recent ?? [],
        topYears,
        streams
      };
    }
  });
  const totalForPct = (data?.streams ?? []).reduce((a, [, c]) => a + c, 0) || 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Total Alumni", value: data?.total ?? 0 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Pending Approval", value: data?.pending ?? 0, tone: "warn" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 lg:col-span-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Matric Batches" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1 text-sm", children: [
        data?.topYears.map(([y, c]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-navy", children: [
            "Matric ",
            y
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: c })
        ] }, y)),
        data && data.topYears.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No data yet" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Stream Breakdown" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2 text-sm", children: [
        data?.streams.map(([s, c]) => {
          const pct = Math.round(c / totalForPct * 100);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-navy", children: s }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                c,
                " · ",
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gold", style: {
              width: `${pct}%`
            } }) })
          ] }, s);
        }),
        data && data.streams.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No data yet" })
      ] })
    ] })
  ] });
}
function Stat({
  label,
  value,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 font-display text-4xl font-semibold ${tone === "warn" ? "text-gold" : "text-navy"}`, children: value })
  ] });
}
function AlumniMgmt() {
  const qc = useQueryClient();
  const [q, setQ] = reactExports.useState("");
  const [statusF, setStatusF] = reactExports.useState("");
  const [streamF, setStreamF] = reactExports.useState("");
  const [yearF, setYearF] = reactExports.useState("");
  const [sortKey, setSortKey] = reactExports.useState("created_at");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const [editing, setEditing] = reactExports.useState(null);
  const {
    data
  } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => (await supabase.from("profiles").select("*").order("created_at", {
      ascending: false
    })).data ?? []
  });
  const rows = reactExports.useMemo(() => {
    const pq = q.toLowerCase();
    let list = (data ?? []).filter((p) => {
      const matchQ = !q || [p.full_name, p.email, p.profession, p.company, p.city].some((v) => v?.toLowerCase().includes(pq));
      const matchS = !statusF || p.status === statusF;
      const matchSt = !streamF || p.matric_stream === streamF;
      const matchY = !yearF || String(p.graduation_year ?? "") === yearF;
      return matchQ && matchS && matchSt && matchY;
    });
    list.sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [data, q, statusF, streamF, yearF, sortKey, sortDir]);
  const del = async (id) => {
    if (!confirm("Delete this alumni record? This cannot be undone.")) return;
    const {
      error
    } = await supabase.from("profiles").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      qc.invalidateQueries({
        queryKey: ["admin-profiles"]
      });
      qc.invalidateQueries({
        queryKey: ["admin-stats"]
      });
    }
  };
  const exportCsv = () => {
    const cols = ["alumni_id", "full_name", "email", "phone", "graduation_year", "matric_stream", "roll_number", "higher_education", "profession", "company", "city", "country", "linkedin_url", "website_url", "status", "created_at"];
    const esc = (v) => {
      if (v == null) return "";
      const s = String(v).replace(/"/g, '""');
      return /[",\n]/.test(s) ? `"${s}"` : s;
    };
    const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alumni-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const toggleSort = (k) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  };
  const years = Array.from(new Set((data ?? []).map((p) => p.graduation_year).filter(Boolean))).sort((a, b) => b - a);
  const blank = {
    alumni_id: "",
    full_name: "",
    email: "",
    graduation_year: "",
    matric_stream: "",
    roll_number: "",
    profession: "",
    company: "",
    higher_education: "",
    city: "",
    country: "",
    phone: "",
    linkedin_url: "",
    website_url: "",
    avatar_url: "",
    bio: "",
    status: "approved"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-2 lg:grid-cols-[1.5fr_140px_180px_160px_auto_auto]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "pl-9", placeholder: "Search name, email, company...", value: q, onChange: (e) => setQ(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border border-input bg-background px-3 text-sm", value: yearF, onChange: (e) => setYearF(e.target.value), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All years" }),
        years.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: y, children: [
          "Matric ",
          y
        ] }, y))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border border-input bg-background px-3 text-sm", value: streamF, onChange: (e) => setStreamF(e.target.value), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All streams" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Computer Science", children: "Computer Science" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Biology", children: "Biology" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Arts/Commerce", children: "Arts/Commerce" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border border-input bg-background px-3 text-sm", value: statusF, onChange: (e) => setStatusF(e.target.value), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All statuses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "approved", children: "Approved" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "suspended", children: "Suspended" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: exportCsv, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        "Export CSV"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setEditing({
        ...blank,
        __new: true
      }), className: "gap-2 bg-navy text-navy-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Add alumni"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { className: "cursor-pointer px-5 py-3", onClick: () => toggleSort("full_name"), children: [
          "Name ",
          sortKey === "full_name" && (sortDir === "asc" ? "↑" : "↓")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { className: "cursor-pointer px-5 py-3", onClick: () => toggleSort("graduation_year"), children: [
          "Matric ",
          sortKey === "graduation_year" && (sortDir === "asc" ? "↑" : "↓")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Stream" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Profession" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        rows.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium text-navy", children: p.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground", children: p.email ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: p.graduation_year ? `Matric ${p.graduation_year}` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground", children: p.matric_stream ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-muted-foreground", children: [
            p.profession ?? "—",
            p.company ? ` · ${p.company}` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs ${p.status === "approved" ? "bg-green-100 text-green-800" : p.status === "suspended" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`, children: p.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setEditing({
              ...p
            }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => del(p.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }) })
        ] }, p.id)),
        rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-5 py-12 text-center text-muted-foreground", children: "No alumni match those filters." }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlumniEditor, { open: !!editing, initial: editing, onClose: () => setEditing(null), onSaved: () => {
      qc.invalidateQueries({
        queryKey: ["admin-profiles"]
      });
      qc.invalidateQueries({
        queryKey: ["admin-stats"]
      });
    } })
  ] });
}
function AlumniEditor({
  open,
  initial,
  onClose,
  onSaved
}) {
  const [form, setForm] = reactExports.useState(initial ?? {});
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);
  if (!initial) return null;
  const isNew = !!form.__new;
  const f = (k) => ({
    value: form[k] ?? "",
    onChange: (e) => setForm({
      ...form,
      [k]: e.target.value
    })
  });
  const save = async (e) => {
    e.preventDefault();
    if (!form.full_name?.trim()) return toast.error("Name is required");
    const linkedin = (form.linkedin_url ?? "").trim();
    if (linkedin && !/^https:\/\/(www\.)?linkedin\.com\/.+/i.test(linkedin)) {
      return toast.error("LinkedIn URL must start with https://linkedin.com/");
    }
    const payload = {
      full_name: form.full_name.trim(),
      email: form.email?.trim() || null,
      avatar_url: form.avatar_url || null,
      graduation_year: form.graduation_year ? Number(form.graduation_year) : null,
      matric_stream: form.matric_stream || null,
      roll_number: form.roll_number || null,
      ...form.alumni_id?.trim() ? {
        alumni_id: form.alumni_id.trim()
      } : {},
      profession: form.profession || null,
      company: form.company || null,
      higher_education: form.higher_education || null,
      city: form.city || null,
      country: form.country || null,
      phone: form.phone || null,
      linkedin_url: form.linkedin_url || null,
      website_url: form.website_url || null,
      bio: form.bio || null,
      status: form.status || "approved"
    };
    setSaving(true);
    const {
      error
    } = isNew ? await supabase.from("profiles").insert(payload) : await supabase.from("profiles").update(payload).eq("id", form.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(isNew ? "Alumni added" : "Saved");
    onSaved();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] max-w-3xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: isNew ? "Add alumni" : `Edit — ${initial.full_name}` }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Full name *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...f("full_name"), required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", ...f("email") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Matric passing year", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1950, max: (/* @__PURE__ */ new Date()).getFullYear(), ...f("graduation_year") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Matric stream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", value: form.matric_stream ?? "", onChange: (e) => setForm({
        ...form,
        matric_stream: e.target.value
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Computer Science", children: "Computer Science" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Biology", children: "Biology" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Arts/Commerce", children: "Arts/Commerce" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Roll number", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...f("roll_number") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Alumni ID (admin only)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Auto: UMBRELLA-001", ...f("alumni_id") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Higher education", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...f("higher_education") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Profession", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...f("profession") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Company", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...f("company") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "City", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...f("city") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Country", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...f("country") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...f("phone") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "LinkedIn URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "url", placeholder: "https://www.linkedin.com/in/...", ...f("linkedin_url") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Website", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...f("website_url") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Photo URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "https://...", ...f("avatar_url") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldA, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", value: form.status ?? "approved", onChange: (e) => setForm({
        ...form,
        status: e.target.value
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "approved", children: "Approved (public)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending (hidden)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "suspended", children: "Suspended (hidden)" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, ...f("bio") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saving, className: "bg-navy text-navy-foreground", children: saving ? "Saving…" : isNew ? "Add alumni" : "Save changes" })
      ] })
    ] })
  ] }) });
}
function FieldA({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    children
  ] });
}
function NewsMgmt() {
  const qc = useQueryClient();
  const {
    user
  } = useAuth();
  const [form, setForm] = reactExports.useState({
    title: "",
    excerpt: "",
    content: ""
  });
  const {
    data
  } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => (await supabase.from("news").select("*").order("created_at", {
      ascending: false
    })).data ?? []
  });
  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return toast.error("Title and content required");
    const {
      error
    } = await supabase.from("news").insert({
      ...form,
      author_id: user.id,
      published: true
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Posted");
      setForm({
        title: "",
        excerpt: "",
        content: ""
      });
      qc.invalidateQueries({
        queryKey: ["admin-news"]
      });
    }
  };
  const del = async (id) => {
    if (!confirm("Delete this news item?")) return;
    const {
      error
    } = await supabase.from("news").delete().eq("id", id);
    if (!error) qc.invalidateQueries({
      queryKey: ["admin-news"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_2fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3 rounded-xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg text-navy", children: "Post news" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
          ...form,
          title: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Excerpt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.excerpt, onChange: (e) => setForm({
          ...form,
          excerpt: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 5, value: form.content, onChange: (e) => setForm({
          ...form,
          content: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full bg-navy text-navy-foreground", children: "Publish" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: (data ?? []).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start justify-between rounded-xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-navy", children: n.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(n.created_at).toLocaleString() }),
        n.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: n.excerpt })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => del(n.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
    ] }, n.id)) })
  ] });
}
function EventsMgmt() {
  const qc = useQueryClient();
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    location: "",
    event_date: ""
  });
  const {
    data
  } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => (await supabase.from("events").select("*").order("event_date")).data ?? []
  });
  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.event_date) return toast.error("Title and date required");
    const {
      error
    } = await supabase.from("events").insert(form);
    if (error) toast.error(error.message);
    else {
      toast.success("Event added");
      setForm({
        title: "",
        description: "",
        location: "",
        event_date: ""
      });
      qc.invalidateQueries({
        queryKey: ["admin-events"]
      });
    }
  };
  const del = async (id) => {
    if (!confirm("Delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-events"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_2fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3 rounded-xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg text-navy", children: "Add event" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
          ...form,
          title: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date & time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "datetime-local", value: form.event_date, onChange: (e) => setForm({
          ...form,
          event_date: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.location, onChange: (e) => setForm({
          ...form,
          location: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: form.description, onChange: (e) => setForm({
          ...form,
          description: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full bg-navy text-navy-foreground", children: "Add event" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: (data ?? []).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start justify-between rounded-xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-navy", children: e.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          new Date(e.event_date).toLocaleString(),
          " ",
          e.location && `· ${e.location}`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => del(e.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
    ] }, e.id)) })
  ] });
}
function AnnouncementsMgmt() {
  const qc = useQueryClient();
  const [form, setForm] = reactExports.useState({
    title: "",
    body: "",
    category: "general"
  });
  const {
    data
  } = useQuery({
    queryKey: ["admin-ann"],
    queryFn: async () => (await supabase.from("announcements").select("*").order("created_at", {
      ascending: false
    })).data ?? []
  });
  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.body) return toast.error("Title and body required");
    const {
      error
    } = await supabase.from("announcements").insert(form);
    if (error) toast.error(error.message);
    else {
      toast.success("Posted");
      setForm({
        title: "",
        body: "",
        category: "general"
      });
      qc.invalidateQueries({
        queryKey: ["admin-ann"]
      });
    }
  };
  const del = async (id) => {
    if (!confirm("Delete?")) return;
    await supabase.from("announcements").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-ann"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_2fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3 rounded-xl border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg text-navy", children: "Post announcement" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
          ...form,
          title: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm", value: form.category, onChange: (e) => setForm({
          ...form,
          category: e.target.value
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "general", children: "General" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "job", children: "Job" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mentorship", children: "Mentorship" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Body" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: form.body, onChange: (e) => setForm({
          ...form,
          body: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full bg-navy text-navy-foreground", children: "Post" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: (data ?? []).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start justify-between rounded-xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-gold/15 px-1.5 py-0.5 text-gold", children: a.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: new Date(a.created_at).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-medium text-navy", children: a.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: a.body })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => del(a.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
    ] }, a.id)) })
  ] });
}
export {
  AdminPage as component
};
