import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./router-X5SYAAJg.mjs";
import { c as ShieldCheck, L as LogOut, d as LayoutDashboard, X, M as Menu, e as MapPin, f as Mail } from "../_libs/lucide-react.mjs";
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/directory", label: "Directory" },
  { to: "/events", label: "Events & News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/wall-of-fame", label: "Wall of Fame" },
  { to: "/jobs", label: "Jobs" },
  { to: "/contact", label: "Contact" }
];
function Header() {
  const [open, setOpen] = reactExports.useState(false);
  const { isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut();
    navigate({ to: "/", replace: true });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md", children: [
    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border/60 bg-navy text-navy-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex h-9 items-center justify-between gap-3 px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
        " Admin session active"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "text-xs font-medium underline-offset-4 hover:underline", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "flex items-center gap-1.5 text-xs font-medium underline-offset-4 hover:underline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
          " Log out"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex h-16 items-center justify-between px-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", "aria-label": "QBHS UMBRELLA — Home", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/qbh-logo.svg",
            alt: "QBHS UMBRELLA logo",
            width: 44,
            height: 44,
            className: "h-10 w-10 shrink-0 rounded-full object-contain sm:h-11 sm:w-11"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-base font-semibold tracking-tight text-navy", children: "QBHS UMBRELLA" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-8 lg:flex", children: navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          className: "text-sm font-medium text-foreground/75 transition-colors hover:text-navy",
          activeProps: { className: "text-navy" },
          children: l.label
        },
        l.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex lg:items-center lg:gap-3", children: isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin",
          className: "flex items-center gap-1.5 rounded-md bg-navy px-3.5 py-2 text-xs font-medium text-navy-foreground hover:opacity-90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-3.5 w-3.5" }),
            " Admin"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/admin/login",
          className: "rounded-md border border-border px-3.5 py-2 text-xs font-medium text-foreground/75 transition-colors hover:text-navy",
          children: "Sign In"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "lg:hidden", onClick: () => setOpen(!open), "aria-label": "Menu", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6" }) })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-background lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex flex-col gap-1 px-4 py-4", children: [
      navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, onClick: () => setOpen(false), className: "rounded px-3 py-2 text-sm font-medium hover:bg-secondary", children: l.label }, l.to)),
      isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", onClick: () => setOpen(false), className: "rounded px-3 py-2 text-sm font-medium text-navy hover:bg-secondary", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSignOut, className: "rounded px-3 py-2 text-left text-sm font-medium text-navy hover:bg-secondary", children: "Log out" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/login", onClick: () => setOpen(false), className: "rounded px-3 py-2 text-sm font-medium text-navy hover:bg-secondary", children: "Sign In" })
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-navy text-navy-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto grid gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", "aria-label": "QBHS UMBRELLA — Home", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/qbh-logo.svg",
              alt: "QBHS UMBRELLA logo",
              width: 48,
              height: 48,
              className: "h-12 w-12 shrink-0 rounded-full bg-white object-contain p-0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-semibold tracking-tight", children: "QBHS UMBRELLA" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-md text-sm leading-relaxed text-navy-foreground/65", children: "The official alumni network of QBHS UMBRELLA." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-white/55", children: "Explore" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-3 text-sm text-navy-foreground/75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-white", children: "About" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/directory", className: "hover:text-white", children: "Directory" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", className: "hover:text-white", children: "Events & news" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-white", children: "Support" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-white/55", children: "Reach us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-4 text-sm text-navy-foreground/75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-white/55", strokeWidth: 1.75 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ghazi Dawood Brohi Goth, Karachi, Sindh, Pakistan" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-white/55", strokeWidth: 1.75 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "8/639 Hasnain Co-operative Housing Society, Malir City, Karachi" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mt-0.5 h-4 w-4 shrink-0 text-white/55", strokeWidth: 1.75 }),
            "alumni@qbh.school"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 font-mono text-[11px] text-navy-foreground/55 lg:flex-row lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " QBHS UMBRELLA. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Built by old students." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-4 text-center text-xs text-navy-foreground/40", children: "Special thanks to Qusain Zaidi for creating the website" }) })
  ] });
}
export {
  Footer as F,
  Header as H
};
