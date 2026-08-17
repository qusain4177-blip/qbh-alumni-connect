import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as Avatar, L as LinkedInLink } from "./Avatar-BRFhQizE.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { H as Header, F as Footer } from "./Footer-4FIXv-wL.mjs";
import { s as supabase } from "./client-G-mu7uFn.mjs";
import { u as useAuth } from "./router-X5SYAAJg.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { j as Search, e as MapPin, n as Building2, P as Plus, o as GraduationCap, B as Briefcase, g as BookOpen, p as Linkedin, G as Globe, k as Pencil } from "../_libs/lucide-react.mjs";
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
function Directory() {
  const {
    isAdmin
  } = useAuth();
  const [q, setQ] = reactExports.useState("");
  const [year, setYear] = reactExports.useState("");
  const [stream, setStream] = reactExports.useState("");
  const [pursuit, setPursuit] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState("");
  const [company, setCompany] = reactExports.useState("");
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["directory"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("profiles").select("id, alumni_id, full_name, avatar_url, graduation_year, matric_stream, profession, company, higher_education, city, country, linkedin_url, website_url, bio").eq("status", "approved").order("graduation_year", {
        ascending: false
      });
      if (error) throw error;
      return data2 ?? [];
    }
  });
  const locationOptions = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    (data ?? []).forEach((p) => {
      [p.city, p.country].forEach((v) => v && set.add(String(v).trim()));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [data]);
  const companyOptions = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    (data ?? []).forEach((p) => p.company && set.add(String(p.company).trim()));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [data]);
  const filtered = reactExports.useMemo(() => {
    const pq = pursuit.toLowerCase();
    const lq = location.toLowerCase().trim();
    const cq = company.toLowerCase().trim();
    return (data ?? []).filter((p) => {
      const matchQ = !q || [p.full_name, p.alumni_id, p.profession, p.company, p.city, p.country, String(p.graduation_year ?? "")].some((v) => v?.toLowerCase?.().includes(q.toLowerCase()));
      const matchY = !year || String(p.graduation_year ?? "").includes(year);
      const matchS = !stream || p.matric_stream === stream;
      const matchP = !pursuit || [p.profession, p.higher_education, p.company].some((v) => v?.toLowerCase().includes(pq));
      const matchL = !lq || [p.city, p.country].some((v) => v?.toLowerCase().includes(lq));
      const matchC = !cq || [p.company, p.higher_education].some((v) => v?.toLowerCase().includes(cq));
      return matchQ && matchY && matchS && matchP && matchL && matchC;
    });
  }, [data, q, year, stream, pursuit, location, company]);
  const clearAll = () => {
    setQ("");
    setYear("");
    setStream("");
    setPursuit("");
    setLocation("");
    setCompany("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto flex-1 px-4 py-14 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-gold", children: "Network" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl font-semibold text-navy lg:text-5xl", children: "Matric Alumni Directory" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Find batchmates, mentors, and collaborators from every Matric batch and stream." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-xl border border-border bg-card p-4 shadow-card lg:p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by name, profession, company, city...", className: "pl-9", value: q, onChange: (e) => setQ(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { list: "directory-locations", placeholder: "Work location (city or country)", className: "pl-9", value: location, onChange: (e) => setLocation(e.target.value) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "directory-locations", children: locationOptions.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o }, o)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { list: "directory-companies", placeholder: "Company or organization", className: "pl-9", value: company, onChange: (e) => setCompany(e.target.value) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "directory-companies", children: companyOptions.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o }, o)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-[140px_180px_1.2fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Matric year", value: year, onChange: (e) => setYear(e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", value: stream, onChange: (e) => setStream(e.target.value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All streams" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Computer Science", children: "Computer Science" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Biology", children: "Biology" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Arts/Commerce", children: "Arts/Commerce" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Profession or higher education (e.g. Bachelors, Job)", value: pursuit, onChange: (e) => setPursuit(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isLoading ? "Loading..." : `${filtered.length} alumni found` }),
          location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-navy", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-gold" }),
            " ",
            location
          ] }),
          company && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-navy", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3 text-gold" }),
            " ",
            company
          ] }),
          (q || year || stream || pursuit || location || company) && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: clearAll, className: "text-xs underline underline-offset-4 hover:text-navy", children: "Clear filters" })
        ] }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "inline-flex items-center gap-1.5 rounded-md bg-navy px-3 py-1.5 text-xs font-medium text-navy-foreground hover:opacity-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
          " Add alumni"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/alumni/$id", params: {
          id: p.id
        }, className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: p.full_name, src: p.avatar_url }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              p.alumni_id && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 inline-block rounded-md bg-navy px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-gold", children: p.alumni_id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-lg font-semibold text-navy group-hover:underline", children: p.full_name }),
              p.graduation_year && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5 text-gold" }),
                " Matric ",
                p.graduation_year,
                p.matric_stream ? ` · ${p.matric_stream}` : ""
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-1.5 text-sm text-muted-foreground", children: [
            p.profession && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-gold" }),
              p.profession
            ] }),
            p.company && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-gold" }),
              p.company
            ] }),
            p.higher_education && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-gold" }),
              p.higher_education
            ] })
          ] }),
          (p.city || p.country) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-navy", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-gold" }),
            [p.city, p.country].filter(Boolean).join(", ")
          ] }),
          p.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 line-clamp-2 text-xs text-muted-foreground", children: p.bio })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2", children: [
          p.linkedin_url && /* @__PURE__ */ jsxRuntimeExports.jsx(LinkedInLink, { url: p.linkedin_url, "aria-label": `${p.full_name} on LinkedIn`, className: "grid h-8 w-8 place-items-center rounded-md bg-secondary text-navy transition-all duration-300 hover:bg-navy hover:text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4" }) }),
          p.website_url && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: p.website_url, target: "_blank", rel: "noopener noreferrer", "aria-label": `${p.full_name} website`, className: "grid h-8 w-8 place-items-center rounded-md bg-secondary text-navy transition-all duration-300 hover:bg-navy hover:text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }) }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "ml-auto inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-navy hover:bg-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            " Manage"
          ] })
        ] })
      ] }, p.id)) }),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-xl border border-dashed border-border p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-navy", children: location ? `No alumni found in ${location}.` : company ? `No alumni found at ${company}.` : "No alumni match those filters yet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "Try broadening your search, or ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "text-navy underline", children: "contact the alumni office" }),
          " to be added."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Directory as component
};
