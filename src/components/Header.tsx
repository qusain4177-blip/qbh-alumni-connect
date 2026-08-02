import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, LogOut, Menu, ShieldCheck, X } from "lucide-react";
import qbhLogo from "@/assets/qbh-logo.jpeg.asset.json";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/directory", label: "Directory" },
  { to: "/events", label: "Events & News" },
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
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="QBH Umbrella — Home">
          <img
            src={qbhLogo.url}
            alt="QBH Umbrella logo"
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 rounded-full object-contain sm:h-11 sm:w-11"
          />
          <div className="font-display text-base font-semibold tracking-tight text-navy">Qamar E Bani Hashim</div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-navy"
              activeProps={{ className: "text-navy" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          {isAdmin ? (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 rounded-md bg-navy px-3.5 py-2 text-xs font-medium text-navy-foreground hover:opacity-90"
            >
              <LayoutDashboard className="h-3.5 w-3.5" /> Admin
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="rounded-md border border-border px-3.5 py-2 text-xs font-medium text-foreground/75 transition-colors hover:text-navy"
            >
              Sign In
            </Link>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm font-medium hover:bg-secondary">
                {l.label}
              </Link>
            ))}
            {isAdmin ? (
              <>
                <Link to="/admin" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm font-medium text-navy hover:bg-secondary">
                  Admin Dashboard
                </Link>
                <button onClick={handleSignOut} className="rounded px-3 py-2 text-left text-sm font-medium text-navy hover:bg-secondary">
                  Log out
                </button>
              </>
            ) : (
              <Link to="/admin/login" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm font-medium text-navy hover:bg-secondary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
