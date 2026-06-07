import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import qbhLogo from "@/assets/qbh-logo.jpeg.asset.json";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  const { user, isAdmin, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="QBH Umbrella — Home">
          <img
            src={qbhLogo.url}
            alt="QBH Umbrella logo"
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 rounded-full object-contain sm:h-11 sm:w-11"
          />
          <div className="leading-tight">
            <div className="font-display text-base font-semibold tracking-tight text-navy">Qamar E Bani Hashim</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">Alumni / Est. 1986</div>
          </div>

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

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm">Admin</Button>
                </Link>
              )}
              <Button size="sm" variant="default" onClick={async () => { await signOut(); router.navigate({ to: "/" }); }}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link to="/signup"><Button size="sm" className="bg-navy text-white hover:bg-navy/90">Sign up</Button></Link>
            </>
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
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)}><Button variant="outline" className="w-full">Dashboard</Button></Link>
                  {isAdmin && <Link to="/admin" onClick={() => setOpen(false)}><Button variant="outline" className="w-full">Admin</Button></Link>}
                  <Button className="w-full" onClick={async () => { await signOut(); setOpen(false); router.navigate({ to: "/" }); }}>Sign Out</Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
                  <Link to="/signup" onClick={() => setOpen(false)}><Button className="w-full bg-navy text-white">Sign up</Button></Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
