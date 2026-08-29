import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Award, Briefcase, Calendar, Globe, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeaturedHighlights } from "@/components/FeaturedHighlights";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-school.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QBH UMBRELLA Alumni" },
      { name: "description", content: "Reconnect with classmates, mentor the next generation, and stay close to the heart of our school." },
      { property: "og:title", content: "QBH UMBRELLA Alumni" },
      { property: "og:description", content: "Reconnect with classmates, mentor the next generation, and stay close to the heart of our school." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [tickerItems, setTickerItems] = useState<string[] | null>(null);

  useEffect(() => {
    supabase.from("news").select("title").eq("published", true).order("created_at", { ascending: false }).limit(8)
      .then(({ data }) => {
        setTickerItems((data ?? []).map((n) => n.title));
      });

  }, []);

  const queryClient = useQueryClient();
  const { data: alumni = [] } = useQuery({
    queryKey: ["homepage-alumni"],
    queryFn: async () => {
      const { data, error } = await supabase.from("alumni").select("id, full_name, status").eq("status", "approved");
      if (error) throw error;
      return data ?? [];
    },
    retry: false,
  });
  useEffect(() => {
    const channel = supabase.channel("homepage-alumni").on("postgres_changes", { event: "*", schema: "public", table: "alumni" }, () => {
      queryClient.invalidateQueries({ queryKey: ["homepage-alumni"] });
    }).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [queryClient]);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["landing-stats"],
    retry: false,
    queryFn: async () => {
      const [{ count: alumniCount }, { data: events }] = await Promise.all([
        supabase.from("alumni").select("*", { count: "exact", head: true }).eq("status", "approved"),
        supabase.from("events").select("*").gte("event_date", new Date().toISOString()).order("event_date").limit(3),
      ]);
      return { alumniCount: alumniCount ?? 0, events: events ?? [] };
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-navy">
        <div className="absolute inset-0">
          <img src={heroImg} alt="QBH UMBRELLA Alumni" className="h-full w-full object-cover object-center opacity-30" width={1600} height={1100} />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="container relative mx-auto px-4 py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/70">
              <Award className="h-3.5 w-3.5" /> QBH UMBRELLA Alumni
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              QBH UMBRELLA Alumni, <br className="hidden sm:block" /> still connected.
            </h1>
            <p className="mt-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/50">an umbrella of opportunities</p>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 lg:text-lg">
              QBH UMBRELLA — an umbrella of opportunities. Find your batch, share what you're working on, and stay in touch.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/directory">
                <Button size="lg" className="rounded-md bg-white text-navy hover:bg-white/90">
                  Browse alumni <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="rounded-md border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  Contact office
                </Button>
              </Link>

            </div>

            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">Alumni</dt>
                <dd className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-white">{`${alumni?.length || 0}+`}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">Batches</dt>
                <dd className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-white">40+</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">Countries</dt>
                <dd className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-white">25+</dd>
              </div>
            </dl>

          </div>
        </div>


        {/* News ticker */}
        {tickerItems && tickerItems.length > 0 && (
        <div className="relative border-t border-white/10 bg-navy">
          <div className="container mx-auto flex items-center gap-4 overflow-hidden px-4 py-3 lg:px-8">
            <span className="shrink-0 rounded border border-white/15 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">Latest</span>
            <div className="flex flex-1 overflow-hidden">
              <div className="ticker flex shrink-0 gap-12 whitespace-nowrap text-sm text-white/70">
                {[...tickerItems, ...tickerItems].map((t, i) => (
                  <span key={i} className="flex items-center gap-3">
                    <span className="h-1 w-1 rounded-full bg-white/40" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
      </section>

      <FeaturedHighlights />

      {/* Mission + Bento */}
      <section className="container mx-auto px-4 py-28 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">What this is</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-navy lg:text-5xl">
              An address book the school never lost.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground lg:col-span-7 lg:pt-2 lg:text-lg">
            QBH UMBRELLA connects alumni across generations. This is the place to find fellow alumni again and keep your details current as life moves forward.
          </p>

        </div>

        {/* Bento grid */}
        <div className="mt-20 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-6 md:gap-5">
          {/* Large feature — Directory */}
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-navy p-8 text-white transition-all duration-300 hover:border-white/20 md:col-span-4 md:row-span-2 md:p-10">
            <div className="flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-white/5">
                <Users className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">01 / Directory</span>
            </div>
            <div className="mt-10">
              <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Find anyone, any batch.</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
                Filter by passing year, city, profession, or stream. No friend-of-a-friend hunts on WhatsApp.
              </p>
              <Link to="/directory" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-all duration-300 hover:gap-2.5">
                Open directory <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </article>

          {/* Stat card */}
          <article className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20 md:col-span-2">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-navy">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-display text-4xl font-semibold tracking-tight text-navy">{`${alumni?.length || 0}+`}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Verified alumni</p>
            </div>
          </article>

          {/* Mentorship */}
          <article className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20 md:col-span-2">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-navy">
              <Briefcase className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-navy">Jobs & mentors</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Post openings to people who already share a school. Ask for advice from someone who has been where you are going.</p>
            </div>
          </article>

          {/* Events */}
          <article className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20 md:col-span-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-navy">
              <Calendar className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-navy">Reunions, on the record</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Batch meets, school days, chapter dinners. Listed in one place with dates, venues and RSVP counts.
            </p>
          </article>

          {/* Global Chapters */}
          <article className="flex items-center justify-between rounded-xl border border-border bg-secondary/60 p-6 transition-all duration-300 hover:bg-secondary md:col-span-3">
            <div>
              <h3 className="font-display text-lg font-semibold text-navy">Chapters abroad</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Alumni in 25+ countries. Karachi, Dubai and Toronto chapters meet quarterly.</p>
            </div>
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-border bg-card text-navy">
              <Globe className="h-5 w-5" strokeWidth={1.75} />
            </div>
          </article>

        </div>
      </section>

      {/* Events strip */}
      <section className="bg-secondary/50 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Upcoming</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-navy">On the calendar</h2>
            </div>
            <Link to="/events" className="hidden text-sm font-medium text-navy hover:text-gold sm:inline-flex">All events →</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {statsLoading && Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-xl border border-border bg-card" />
            ))}
            {!statsLoading && stats?.events?.length === 0 && (
              <div className="col-span-full rounded-xl border border-dashed border-border p-12 text-center">
                <p className="text-sm text-muted-foreground">No upcoming events right now. Check back soon.</p>
              </div>
            )}
            {!statsLoading && (stats?.events ?? []).map((e: any) => {
              const d = new Date(e.event_date);
              return (
                <article key={e.id} className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-4 bg-gradient-hero p-6 text-white">
                    <div className="flex flex-col items-center justify-center rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">{d.toLocaleString("en", { month: "short" })}</span>
                      <span className="font-display text-2xl font-semibold tracking-tight">{d.getDate()}</span>
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
        <div className="rounded-2xl border border-border bg-navy p-12 text-white lg:p-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight lg:text-5xl">Looking for a classmate?</h2>
            <p className="mt-5 text-base leading-relaxed text-white/65">
              Every verified alumnus is listed in the directory. Search by batch, stream, or profession — no account required.
            </p>
            <Link to="/directory" className="mt-8 inline-flex">
              <Button size="lg" className="rounded-md bg-white text-navy hover:bg-white/90">Open the directory</Button>
            </Link>
          </div>

        </div>
      </section>


      <Footer />
    </div>
  );
}
