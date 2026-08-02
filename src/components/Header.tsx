import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import qbhLogo from "@/assets/qbh-logo.jpeg.asset.json";
import { useState } from "react";

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

        <div className="hidden lg:block w-[44px]" aria-hidden />

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
          </div>
        </div>
      )}
    </header>
  );
}
