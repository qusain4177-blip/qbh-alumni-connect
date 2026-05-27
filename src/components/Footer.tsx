import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-gradient-gold text-navy">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold">Qamar E Bani Hashim</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">Alumni Network</div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-foreground/70">
            A lifelong community of graduates dedicated to scholarship, service, and mentorship.
            Reconnect with classmates, share opportunities, and shape the future of our school.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-gold">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/75">
            <li><Link to="/about" className="hover:text-gold">About the School</Link></li>
            <li><Link to="/directory" className="hover:text-gold">Alumni Directory</Link></li>
            <li><Link to="/events" className="hover:text-gold">Events & News</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-wider text-gold">Reach Us</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/75">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" />Qamar E Bani Hashim School Campus</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-gold" />alumni@qbh.school</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-navy-foreground/60 lg:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Qamar E Bani Hashim Alumni Association. All rights reserved.</p>
          <p>Built with pride for our graduates.</p>
        </div>
      </div>
    </footer>
  );
}
