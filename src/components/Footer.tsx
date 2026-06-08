import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import qbhLogo from "@/assets/qbh-logo.jpeg.asset.json";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-3" aria-label="QBH Umbrella — Home">
            <img
              src={qbhLogo.url}
              alt="QBH Umbrella logo"
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full bg-white object-contain p-0.5"
            />
            <div>
              <div className="font-display text-lg font-semibold tracking-tight">Qamar E Bani Hashim</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Alumni / Est. 1986</div>
            </div>
          </Link>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-navy-foreground/65">
            The official alumni network of Qamar E Bani Hashim. Run by old students, for old students.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-navy-foreground/75">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/directory" className="hover:text-white">Directory</Link></li>
            <li><Link to="/events" className="hover:text-white">Events & news</Link></li>
            <li><Link to="/contact" className="hover:text-white">Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Reach us</h4>
          <ul className="mt-5 space-y-3 text-sm text-navy-foreground/75">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-white/55" strokeWidth={1.75} />QBH School Campus</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-white/55" strokeWidth={1.75} />alumni@qbh.school</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 font-mono text-[11px] text-navy-foreground/55 lg:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} QBH Alumni Association</p>
          <p>Built by old students.</p>
        </div>
      </div>
      <div className="border-t border-white/5">
        <p className="py-4 text-center text-xs text-navy-foreground/40">
          Special thanks to Qusain Zaidi for creating the website
        </p>
      </div>
    </footer>
  );
}
