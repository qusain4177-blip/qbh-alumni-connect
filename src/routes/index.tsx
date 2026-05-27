import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowRight, Award, Calendar, Compass, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-school.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qamar E Bani Hashim — Alumni Network" },
      { name: "description", content: "Reconnect with classmates, mentor the next generation, and stay close to the heart of our school." },
      { property: "og:title", content: "Qamar E Bani Hashim Alumni Network" },
      { property: "og:description", content: "The lifelong community of Qamar E Bani Hashim graduates." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [tickerItems, setTickerItems] = useState<string[]>([]);

  useEffect(() => {
    supabase.from("news").select("title").eq("published", true).order("created_at", { ascending: false }).limit(8)
      .then(({ data }) => {
        const items = (data ?? []).map((n) => n.title);
        setTickerItems(items.length ? items : [
          "Annual Alumni Reunion 2026 — registration now open",
          "QBH scholars launch new mentorship initiative",
          "Class of 2015 celebrates 10-year reunion",
          "School ranks among top institutions in the region",
        ]);
      });
  }, []);

  const { data: stats } = useQuery({
    queryKey: ["landing-stats"],
    queryFn: async () => {
      const [{ count: alumniCount }, { data: events }] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("status", "approved"),
        supabase.from("events").select("*").gte("event_date", new Date().toISOString()).order("event_date").limit(3),
      ]);
      return { alumniCount: alumniCount ?? 0, events: events ?? [] };
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Qamar E Bani Hashim campus" className="h-full w-full object-cover" width={1600} height={1100} />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-navy/60" />
        </div>
        <div className="container relative mx-auto px-4 py-28 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold backdrop-blur">
              <Award className="h-3.5 w-3.5" /> Est. Legacy of Excellence
            </div>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Where graduates of <span className="text-gold">Qamar E Bani Hashim</span> stay connected for life.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Rejoin a community of scholars, professionals, and changemakers. Update your story, find old friends,
              and open doors for the next generation.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-gold text-navy shadow-elegant hover:opacity-95">
                  Join the Alumni Network <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  Member Login
                </Button>
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 text-white">
              <div>
                <dt className="text-xs uppercase tracking-wider text-gold">Registered Alumni</dt>
                <dd className="mt-1 font-display text-3xl font-semibold">{(stats?.alumniCount ?? 0) + "+"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-gold">Graduating Classes</dt>
                <dd className="mt-1 font-display text-3xl font-semibold">40+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-gold">Countries</dt>
                <dd className="mt-1 font-display text-3xl font-semibold">25+</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* News ticker */}
        <div className="relative border-t border-white/10 bg-navy/95 backdrop-blur">
          <div className="container mx-auto flex items-center gap-4 overflow-hidden px-4 py-3 lg:px-8">
            <span className="shrink-0 rounded-sm bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy">Latest</span>
            <div className="flex flex-1 overflow-hidden">
              <div className="ticker flex shrink-0 gap-12 whitespace-nowrap text-sm text-white/85">
                {[...tickerItems, ...tickerItems].map((t, i) => (
                  <span key={i} className="flex items-center gap-3">
                    <span className="h-1 w-1 rounded-full bg-gold" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Our Mission</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-navy lg:text-5xl">
              A lifelong fellowship of scholarship and service.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            The Qamar E Bani Hashim Alumni Network exists to preserve the bonds formed within our halls
            and to channel them into mentorship, opportunity, and giving back. From the first reunion to
            the next generation's graduation, we walk together.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { icon: Users, title: "Searchable Directory", body: "Find classmates by graduation year, profession, or city, and reconnect in a click." },
            { icon: Compass, title: "Mentorship & Jobs", body: "Share opportunities, mentor students, and open doors within a trusted network." },
            { icon: Calendar, title: "Events & Reunions", body: "Stay close to the school calendar, official reunions, and alumni gatherings." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="group rounded-xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-elegant">
              <div className="grid h-11 w-11 place-items-center rounded-md bg-navy text-gold">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events strip */}
      <section className="bg-secondary/50 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Upcoming</p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-navy">Mark your calendar</h2>
            </div>
            <Link to="/events" className="hidden text-sm font-medium text-navy hover:text-gold sm:inline-flex">View all events →</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(stats?.events?.length ? stats.events : [
              { id: "p1", title: "Annual Alumni Reunion", event_date: new Date(Date.now() + 90 * 864e5).toISOString(), location: "Main Campus, Grand Hall" },
              { id: "p2", title: "Career Mentorship Mixer", event_date: new Date(Date.now() + 30 * 864e5).toISOString(), location: "Virtual" },
              { id: "p3", title: "Class of 2010 — 15 Year Meet", event_date: new Date(Date.now() + 150 * 864e5).toISOString(), location: "Lahore" },
            ]).map((e: any) => {
              const d = new Date(e.event_date);
              return (
                <article key={e.id} className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-4 bg-gradient-hero p-6 text-white">
                    <div className="flex flex-col items-center justify-center rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur">
                      <span className="text-xs uppercase tracking-wider text-gold">{d.toLocaleString("en", { month: "short" })}</span>
                      <span className="font-display text-2xl font-semibold">{d.getDate()}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                      <p className="text-xs text-white/70">{d.toLocaleDateString("en", { weekday: "long", year: "numeric" })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-5 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 text-gold" /> {e.location ?? "TBA"}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-10 text-white shadow-elegant lg:p-16">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-3xl font-semibold lg:text-4xl">Your story belongs in the network.</h2>
            <p className="mt-3 text-white/80">
              Create your alumni profile in minutes. Once approved by the alumni office, you'll have access
              to the directory, events, and exclusive opportunities.
            </p>
            <Link to="/signup" className="mt-7 inline-flex">
              <Button size="lg" className="bg-gradient-gold text-navy hover:opacity-95">Create my profile</Button>
            </Link>
          </div>
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
