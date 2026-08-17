import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { U as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-G-mu7uFn.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as createTanStackInvokeToolHandler, a as createTanStackOAuthProtectedResourceMetadataHandler, b as createTanStackListToolsHandler, d as createTanStackMcpHandler, e as defineTool, f as defineMcp, g as auth } from "../_libs/lovable.dev__mcp-js.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { n as number, _ as _enum, d as string, k as boolean } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/jose.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/json-schema-traverse.mjs";
import "../_libs/fast-uri.mjs";
import "../_libs/ajv-formats.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-CSlj-qO0.css";
const AuthContext = reactExports.createContext(void 0);
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [roles, setRoles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s?.user) {
        setTimeout(async () => {
          const { data } = await supabase.from("user_roles").select("role").eq("user_id", s.user.id);
          setRoles((data ?? []).map((r) => r.role));
        }, 0);
      } else {
        setRoles([]);
      }
    });
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", s.user.id);
        setRoles((data ?? []).map((r) => r.role));
      }
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AuthContext.Provider,
    {
      value: {
        session,
        user: session?.user ?? null,
        roles,
        isAdmin: roles.includes("admin"),
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        }
      },
      children
    }
  );
}
function useAuth() {
  const ctx = reactExports.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-5xl font-semibold tracking-tight text-navy", children: "Page not found." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "The link is broken or the page has moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-7 inline-flex rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground hover:bg-navy/90", children: "Back to home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl text-navy", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Please try again or return home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: reset, className: "mt-6 rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground", children: "Try again" })
  ] }) });
}
const Route$h = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "QBHS UMBRELLA - Alumni Directory Portal" },
      { name: "description", content: "Reconnect with classmates, mentor the next generation, and stay close to the heart of our school." },
      { property: "og:title", content: "QBHS UMBRELLA - Alumni Directory Portal" },
      { name: "twitter:title", content: "QBHS UMBRELLA - Alumni Directory Portal" },
      { property: "og:description", content: "Reconnect with classmates, mentor the next generation, and stay close to the heart of our school." },
      { name: "twitter:description", content: "Reconnect with classmates, mentor the next generation, and stay close to the heart of our school." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e84405aa-0307-4275-b8df-7ff4365a6a1e/id-preview-3bf50dca--32e27c7f-4ea4-400f-9d23-70d862346a69.lovable.app-1779918965052.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e84405aa-0307-4275-b8df-7ff4365a6a1e/id-preview-3bf50dca--32e27c7f-4ea4-400f-9d23-70d862346a69.lovable.app-1779918965052.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$h.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$b = () => import("./index-DSt3RI8W.mjs");
const Route$g = createFileRoute()({
  head: () => ({
    meta: [{
      title: "QBHS UMBRELLA - Alumni Directory Portal"
    }, {
      name: "description",
      content: "Reconnect with classmates, mentor the next generation, and stay close to the heart of our school."
    }, {
      property: "og:title",
      content: "QBHS UMBRELLA - Alumni Directory Portal"
    }, {
      property: "og:description",
      content: "Reconnect with classmates, mentor the next generation, and stay close to the heart of our school."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./about-C8xyp-PI.mjs");
const Route$f = createFileRoute()({
  head: () => ({
    meta: [{
      title: "About — QBHS UMBRELLA"
    }, {
      name: "description",
      content: "The history, mission, and heritage of QBHS UMBRELLA."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin-4NYlbSyA.mjs");
const Route$e = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Admin Console — QBHS UMBRELLA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./contact-CtZ6VOAD.mjs");
const Route$d = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Contact Support — QBHS UMBRELLA"
    }, {
      name: "description",
      content: "Get technical support or contact the alumni office."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./directory-DmQbr_eE.mjs");
const Route$c = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Alumni Directory — QBHS UMBRELLA"
    }, {
      name: "description",
      content: "Search and connect with fellow Matric alumni."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./events-NlaqNG7u.mjs");
const Route$b = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Events & News — QBHS UMBRELLA"
    }, {
      name: "description",
      content: "Upcoming reunions, alumni meets, and school news."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./gallery-DWrseNiG.mjs");
const Route$a = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Events & Memories — QBHS UMBRELLA Gallery"
    }, {
      name: "description",
      content: "Photos from reunions, alumni meets, and campus events at QBHS UMBRELLA."
    }, {
      property: "og:title",
      content: "Events & Memories — QBHS UMBRELLA Gallery"
    }, {
      property: "og:description",
      content: "Photos from reunions, alumni meets, and campus events at QBHS UMBRELLA."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./jobs-DCTbB6ES.mjs");
const Route$9 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Jobs Board — QBHS UMBRELLA"
    }, {
      name: "description",
      content: "Job opportunities shared by and for QBHS UMBRELLA Matric alumni."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const Route$8 = createFileRoute()({
  beforeLoad: () => {
    throw redirect({ to: "/admin/login" });
  }
});
function supabaseForUser(ctx) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  return createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
function textResult(payload, structured) {
  return {
    content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
    ...structured ? { structuredContent: structured } : {}
  };
}
function errorResult(message) {
  return { content: [{ type: "text", text: message }], isError: true };
}
const getMyProfile = defineTool({
  name: "get_my_profile",
  title: "Get my alumni profile",
  description: "Returns the signed-in alumnus's own profile record (name, Matric year, stream, contact, LinkedIn, etc.).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Not authenticated");
    const { data, error } = await supabaseForUser(ctx).from("profiles").select("*").eq("id", ctx.getUserId()).maybeSingle();
    if (error) return errorResult(error.message);
    if (!data) return errorResult("No profile found");
    return textResult(data, { profile: data });
  }
});
const updateMyProfile = defineTool({
  name: "update_my_profile",
  title: "Update my alumni profile",
  description: "Update the signed-in alumnus's own profile fields. Only fields provided are changed.",
  inputSchema: {
    full_name: string().trim().min(2).max(120).optional(),
    bio: string().trim().max(2e3).optional(),
    phone: string().trim().max(40).optional(),
    city: string().trim().max(120).optional(),
    country: string().trim().max(120).optional(),
    company: string().trim().max(120).optional(),
    profession: string().trim().max(160).optional(),
    higher_education: string().trim().max(160).optional(),
    linkedin_url: string().url().max(300).optional(),
    website_url: string().url().max(300).optional(),
    matric_stream: _enum(["Computer Science", "Biology", "Arts/Commerce"]).optional(),
    graduation_year: number().int().min(1950).max(2100).optional()
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Not authenticated");
    const updates = Object.fromEntries(Object.entries(input).filter(([, v]) => v !== void 0));
    if (Object.keys(updates).length === 0) return errorResult("Provide at least one field to update.");
    const { data, error } = await supabaseForUser(ctx).from("profiles").update(updates).eq("id", ctx.getUserId()).select().maybeSingle();
    if (error) return errorResult(error.message);
    return textResult(data, { profile: data });
  }
});
const searchAlumni = defineTool({
  name: "search_alumni",
  title: "Search alumni directory",
  description: "Search the QBHS UMBRELLA alumni directory. Filter by name, Matric passing year, or Matric stream. Row-level security limits results to what the signed-in user can see.",
  inputSchema: {
    query: string().trim().optional().describe("Free-text match on full name."),
    matric_year: number().int().min(1950).max(2100).optional().describe("Matric passing year, e.g. 2018."),
    matric_stream: _enum(["Computer Science", "Biology", "Arts/Commerce"]).optional(),
    limit: number().int().min(1).max(50).optional().describe("Max rows to return. Default 20.")
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, matric_year, matric_stream, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Not authenticated");
    let q = supabaseForUser(ctx).from("profiles").select("id, full_name, graduation_year, matric_stream, profession, higher_education, company, city, country, linkedin_url").limit(limit ?? 20);
    if (query) q = q.ilike("full_name", `%${query}%`);
    if (matric_year) q = q.eq("graduation_year", matric_year);
    if (matric_stream) q = q.eq("matric_stream", matric_stream);
    const { data, error } = await q;
    if (error) return errorResult(error.message);
    return textResult(data ?? [], { alumni: data ?? [] });
  }
});
const listEvents = defineTool({
  name: "list_events",
  title: "List alumni events",
  description: "List upcoming alumni events (reunions, mentorship nights, batch meetups).",
  inputSchema: {
    upcoming_only: boolean().optional().describe("If true, only return events with a start date >= today. Default true."),
    limit: number().int().min(1).max(50).optional()
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ upcoming_only, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Not authenticated");
    let q = supabaseForUser(ctx).from("events").select("*").order("event_date", { ascending: true }).limit(limit ?? 20);
    if (upcoming_only !== false) q = q.gte("event_date", (/* @__PURE__ */ new Date()).toISOString());
    const { data, error } = await q;
    if (error) return errorResult(error.message);
    return textResult(data ?? [], { events: data ?? [] });
  }
});
const listAnnouncements = defineTool({
  name: "list_announcements",
  title: "List announcements",
  description: "List alumni announcements posted by the school (news, general updates, job posts).",
  inputSchema: { limit: number().int().min(1).max(50).optional() },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) return errorResult("Not authenticated");
    const { data, error } = await supabaseForUser(ctx).from("announcements").select("*").order("created_at", { ascending: false }).limit(limit ?? 20);
    if (error) return errorResult(error.message);
    return textResult(data ?? [], { announcements: data ?? [] });
  }
});
const projectRef = "mzulidjwgwtedpfindjc";
const mcp = defineMcp({
  name: "qbh-alumni-mcp",
  title: "QBHS UMBRELLA Alumni Portal",
  version: "0.1.0",
  instructions: "Tools for the QBHS UMBRELLA school alumni network. Look up your own alumni profile, update it, search the alumni directory, and browse events and announcements. All tools act as the signed-in alumnus and respect row-level security.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated"
  }),
  tools: [getMyProfile, updateMyProfile, searchAlumni, listEvents, listAnnouncements]
});
const Route$7 = createFileRoute()({
  server: {
    handlers: {
      ANY: createTanStackMcpHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const $$splitComponentImporter$3 = () => import("./wall-of-fame-D0tFCwiJ.mjs");
const Route$6 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Alumni Wall of Fame — QBHS UMBRELLA Success Stories"
    }, {
      name: "description",
      content: "Celebrating higher education milestones, PhDs, Master's degrees and career successes of QBHS UMBRELLA alumni."
    }, {
      property: "og:title",
      content: "Alumni Wall of Fame — QBHS UMBRELLA Success Stories"
    }, {
      property: "og:description",
      content: "Celebrating higher education milestones, PhDs, Master's degrees and career successes of QBHS UMBRELLA alumni."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const Route$5 = createFileRoute()({
  server: {
    handlers: {
      // ANY: TanStack returns SPA HTML for methods not in `handlers`; the SDK 405s instead.
      ANY: createTanStackListToolsHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const Route$4 = createFileRoute()({
  server: {
    handlers: {
      ANY: createTanStackOAuthProtectedResourceMetadataHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const $$splitComponentImporter$2 = () => import("./admin_.login-Duk3dH_n.mjs");
const Route$3 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Admin Sign In — QBHS UMBRELLA"
    }, {
      name: "description",
      content: "Restricted sign-in for the QBHS UMBRELLA alumni portal administrator."
    }, {
      property: "og:title",
      content: "Admin Sign In — QBHS UMBRELLA"
    }, {
      property: "og:description",
      content: "Restricted administrator access to the QBHS UMBRELLA alumni portal."
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./alumni._id-DtsS3YmG.mjs");
const Route$2 = createFileRoute()({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Alumni Profile — QBHS UMBRELLA`
    }, {
      name: "description",
      content: `Alumni profile page for a QBHS UMBRELLA Matric graduate.`
    }, {
      property: "og:title",
      content: `Alumni Profile — QBHS UMBRELLA`
    }, {
      property: "og:description",
      content: `QBHS UMBRELLA alumni profile.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
function oauthApi() {
  return supabase.auth.oauth;
}
const $$splitErrorComponentImporter = () => import("../_._lovable.oauth.consent-B_C31zqL.mjs");
const $$splitComponentImporter = () => import("../_._lovable.oauth.consent-DteamIvB.mjs");
const Route$1 = createFileRoute()({
  ssr: false,
  validateSearch: (s) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : ""
  }),
  beforeLoad: async ({
    search,
    location
  }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const {
      data
    } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({
        to: "/login",
        search: {
          next
        }
      });
    }
  },
  loader: async ({
    location
  }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id");
    const {
      data,
      error
    } = await oauthApi().getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({
      href: immediate
    });
    return data;
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const Route = createFileRoute()({
  server: {
    handlers: {
      // ANY: TanStack returns SPA HTML for methods not in `handlers`; the SDK 405s instead.
      ANY: createTanStackInvokeToolHandler(mcp, { resourcePath: "/mcp", metadataPath: "/.well-known/oauth-protected-resource", trustForwardedHost: true })
    }
  }
});
const IndexRoute = Route$g.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$h
});
const AboutRoute = Route$f.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$h
});
const AdminRoute = Route$e.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$h
});
const ContactRoute = Route$d.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$h
});
const DirectoryRoute = Route$c.update({
  id: "/directory",
  path: "/directory",
  getParentRoute: () => Route$h
});
const EventsRoute = Route$b.update({
  id: "/events",
  path: "/events",
  getParentRoute: () => Route$h
});
const GalleryRoute = Route$a.update({
  id: "/gallery",
  path: "/gallery",
  getParentRoute: () => Route$h
});
const JobsRoute = Route$9.update({
  id: "/jobs",
  path: "/jobs",
  getParentRoute: () => Route$h
});
const LoginRoute = Route$8.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$h
});
const McpRoute = Route$7.update({
  id: "/mcp",
  path: "/mcp",
  getParentRoute: () => Route$h
});
const WallOfFameRoute = Route$6.update({
  id: "/wall-of-fame",
  path: "/wall-of-fame",
  getParentRoute: () => Route$h
});
const Char91DotmcpChar93ListToolsRoute = Route$5.update({
  id: "/.mcp/list-tools",
  path: "/.mcp/list-tools",
  getParentRoute: () => Route$h
});
const Char91DotwellKnownChar93OauthProtectedResourceRoute = Route$4.update({
  id: "/.well-known/oauth-protected-resource",
  path: "/.well-known/oauth-protected-resource",
  getParentRoute: () => Route$h
});
const AdminLoginRoute = Route$3.update({
  id: "/admin_/login",
  path: "/admin/login",
  getParentRoute: () => Route$h
});
const AlumniIdRoute = Route$2.update({
  id: "/alumni/$id",
  path: "/alumni/$id",
  getParentRoute: () => Route$h
});
const DotlovableOauthConsentRoute = Route$1.update({
  id: "/.lovable/oauth/consent",
  path: "/.lovable/oauth/consent",
  getParentRoute: () => Route$h
});
const Char91DotmcpChar93InvokeToolToolRoute = Route.update({
  id: "/.mcp/invoke-tool/$tool",
  path: "/.mcp/invoke-tool/$tool",
  getParentRoute: () => Route$h
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute,
  ContactRoute,
  DirectoryRoute,
  EventsRoute,
  GalleryRoute,
  JobsRoute,
  LoginRoute,
  McpRoute,
  WallOfFameRoute,
  Char91DotmcpChar93ListToolsRoute,
  Char91DotwellKnownChar93OauthProtectedResourceRoute,
  AdminLoginRoute,
  AlumniIdRoute,
  DotlovableOauthConsentRoute,
  Char91DotmcpChar93InvokeToolToolRoute
};
const routeTree = Route$h._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$2 as R,
  Route$1 as a,
  oauthApi as o,
  router as r,
  useAuth as u
};
