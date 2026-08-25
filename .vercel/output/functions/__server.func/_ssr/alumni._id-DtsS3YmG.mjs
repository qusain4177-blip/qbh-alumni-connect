import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as Avatar, L as LinkedInLink } from "./Avatar-BRFhQizE.mjs";
import { H as Header, F as Footer } from "./Footer-4FIXv-wL.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { s as supabase } from "./client-G-mu7uFn.mjs";
import { R as Route$2, u as useAuth } from "./router-X5SYAAJg.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { s as ArrowLeft, k as Pencil, l as Trash2, f as Mail, p as Linkedin, t as School, o as GraduationCap, g as BookOpen, B as Briefcase, e as MapPin, G as Globe, u as User, v as CalendarDays, w as Heart } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
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
function AlumniProfile() {
  const {
    id
  } = Route$2.useParams();
  const {
    isAdmin
  } = useAuth();
  const navigate = useNavigate();
  const [deleting, setDeleting] = reactExports.useState(false);
  const handleDelete = async () => {
    if (!window.confirm("Delete this alumni profile permanently?")) return;
    setDeleting(true);
    const {
      error: error2
    } = await supabase.from("profiles").delete().eq("id", id);
    setDeleting(false);
    if (error2) {
      toast.error(error2.message);
      return;
    }
    toast.success("Profile deleted");
    navigate({
      to: "/directory"
    });
  };
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["alumni", id],
    queryFn: async () => {
      const {
        data: data2,
        error: error2
      } = await supabase.from("profiles").select("*").eq("id", id).eq("status", "approved").maybeSingle();
      if (error2) throw error2;
      return data2;
    }
  });
  const badgeText = (() => {
    const parts = [];
    if (data?.profession && data?.company) {
      parts.push(`${data.profession} | ${data.company} Alumni`);
    } else if (data?.profession) {
      parts.push(data.profession);
    } else if (data?.higher_education) {
      parts.push(data.higher_education);
    } else if (data?.company) {
      parts.push(`${data.company} Alumni`);
    }
    if (data?.graduation_year) parts.push(`Batch ${data.graduation_year}`);
    return parts.filter(Boolean).join(" | ");
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto flex-1 px-4 py-14 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/directory", className: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back to directory"
        ] }),
        isAdmin && data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-navy hover:bg-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            " Edit profile"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleDelete, disabled: deleting, className: "inline-flex items-center gap-1.5 rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
            " ",
            deleting ? "Deleting..." : "Delete"
          ] })
        ] })
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 h-64 animate-pulse rounded-2xl border border-border bg-card" }),
      !isLoading && (!data || error) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-dashed border-border p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl text-navy", children: "Profile not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This alumnus may have been removed or their profile is not yet approved." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/directory", children: "Browse directory" }) })
      ] }),
      data && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-40 bg-gradient-to-br from-navy via-navy to-navy/80 sm:h-52", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,theme(colors.gold/.35),transparent_45%),radial-gradient(circle_at_80%_60%,theme(colors.white/.15),transparent_50%)]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-6 pb-8 pt-0 sm:px-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { name: data.full_name, src: data.avatar_url, size: "lg", className: "-mt-16 border-4 border-card shadow-sm ring-4 ring-[#8bc34a]/60 sm:-mt-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 min-w-0 max-w-2xl", children: [
              data.alumni_id && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 inline-flex items-center gap-2 rounded-md bg-navy px-3 py-1 font-mono text-xs font-semibold tracking-widest text-gold", children: data.alumni_id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate font-display text-3xl font-semibold text-navy sm:text-4xl", children: data.full_name }),
              badgeText && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-gold" }),
                badgeText
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap justify-center gap-2", children: [
                data.graduation_year && /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { children: [
                  "#Batch",
                  data.graduation_year
                ] }),
                data.matric_stream && /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { children: [
                  "#",
                  String(data.matric_stream).replace(/\s+/g, "")
                ] }),
                data.higher_education && /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { children: [
                  "#",
                  data.higher_education.split(/\s+/)[0]
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap justify-center gap-2", children: [
              data.email && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${data.email}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mr-2 h-4 w-4" }),
                "Email"
              ] }) }),
              data.linkedin_url && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LinkedInLink, { url: data.linkedin_url, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "mr-2 h-4 w-4" }),
                "LinkedIn"
              ] }) })
            ] })
          ] }),
          data.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground", children: data.bio }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { title: "Academic & Graduation", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "h-4 w-4" }), label: "Matric Batch", value: data.graduation_year ? `Matric ${data.graduation_year}` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4" }), label: "Highest Qualification", value: data.higher_education || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }), label: "University", value: data.company || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4" }), label: "Degree Program", value: data.profession || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { title: "Contact & Location", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }), label: "Email", value: data.email ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${data.email}`, className: "text-navy hover:underline", children: data.email }) : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }), label: "Location", value: [data.city, data.country].filter(Boolean).join(", ") || "—" }),
              data.linkedin_url && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4" }), label: "LinkedIn", value: /* @__PURE__ */ jsxRuntimeExports.jsx(LinkedInLink, { url: data.linkedin_url, className: "text-navy hover:underline", children: "View profile" }) }),
              data.website_url && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }), label: "Website", value: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: data.website_url, target: "_blank", rel: "noopener noreferrer", className: "text-navy hover:underline", children: data.website_url }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { title: "Personal Details", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }), label: "Father's Name", value: data.father_name || "—" }),
              data.date_of_birth && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4" }), label: "Date of Birth", value: new Date(data.date_of_birth).toLocaleDateString("en-GB") }),
              data.marital_status && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }), label: "Marital Status", value: data.marital_status })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Chip({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-navy", children });
}
function InfoCard({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-background p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "mt-5 space-y-4", children })
  ] });
}
function InfoRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-gold", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-0.5 text-sm text-navy", children: value })
    ] })
  ] });
}
export {
  AlumniProfile as component
};
