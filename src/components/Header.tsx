import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, LogOut, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/directory", label: "Directory" },
  { to: "/events", label: "Events & News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/wall-of-fame", label: "Wall of Fame" },
  { to: "/jobs", label: "Jobs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut();
    navigate({ to: "/", replace: true });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      {isAdmin && (
        <div className="border-b border-border/60 bg-navy text-navy-foreground">
          <div className="container mx-auto flex h-9 items-center justify-between gap-3 px-4 lg:px-8">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
              <ShieldCheck className="h-3.5 w-3.5" /> Admin session active
            </span>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-xs font-medium underline-offset-4 hover:underline">Dashboard</Link>
              <button onClick={handleSignOut} className="flex items-center gap-1.5 text-xs font-medium underline-offset-4 hover:underline">
                <LogOut className="h-3.5 w-3.5" /> Log out
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label="QBH UMBRELLA Alumni — Home">
          <img
            src="/images/image.png"
            alt="QBH UMBRELLA Alumni logo"
            width={56}
            height={56}
            className="h-11 w-11 shrink-0 rounded-xl object-cover shadow-sm transition-transform duration-200 group-hover:scale-[1.04] sm:h-12 sm:w-12"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-[15px] font-bold tracking-tight text-navy sm:text-base">
              QBH UMBRELLA Alumni
            </span>
            <span className="mt-0.5 block truncate text-[10px] font-medium tracking-[0.08em] text-brand-purple sm:text-[11px]">
              an umbrella of opportunities
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-brand-purple"
              activeProps={{ className: "text-brand-purple" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          {isAdmin ? (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 rounded-md bg-brand-purple px-3.5 py-2 text-xs font-medium text-white hover:bg-brand-purple-dark"
            >
              <LayoutDashboard className="h-3.5 w-3.5" /> Admin
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="rounded-md border border-border px-3.5 py-2 text-xs font-medium text-foreground/75 transition-colors hover:border-brand-purple/40 hover:text-brand-purple"
            >
              Sign In
            </Link>
          )}
        </div>

        <button className="rounded-md p-2 text-navy transition-colors hover:bg-brand-purple/10 hover:text-brand-purple lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-brand-purple/10 hover:text-brand-purple">
                {l.label}
              </Link>
            ))}
            {isAdmin ? (
              <>
                <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-brand-purple hover:bg-brand-purple/10">
                  Admin Dashboard
                </Link>
                <button onClick={handleSignOut} className="rounded-md px-3 py-2 text-left text-sm font-medium text-brand-purple hover:bg-brand-purple/10">
                  Log out
                </button>
              </>
            ) : (
              <Link to="/admin/login" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-brand-purple hover:bg-brand-purple/10">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
