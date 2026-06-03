import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Newspaper } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Events & News — QBH Alumni" }, { name: "description", content: "Upcoming reunions, alumni meets, and school news." }] }),
  component: EventsPage,
});

function EventsPage() {
  const { data: events } = useQuery({
    queryKey: ["events-all"],
    queryFn: async () => (await supabase.from("events").select("*").order("event_date")).data ?? [],
  });
  const { data: news } = useQuery({
    queryKey: ["news-all"],
    queryFn: async () => (await supabase.from("news").select("*").eq("published", true).order("created_at", { ascending: false })).data ?? [],
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-navy py-24 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">Calendar</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight lg:text-6xl">Events & news</h1>
            <p className="mt-4 max-w-2xl text-white/65">Reunions, batch meets, and announcements from campus. Updated weekly.</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 lg:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-navy">Coming up</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(events ?? []).map((e) => {
              const d = new Date(e.event_date);
              return (
                <article key={e.id} className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-4 bg-gradient-hero p-6 text-white">
                    <div className="flex flex-col items-center rounded-lg bg-white/10 px-3 py-2 text-center backdrop-blur">
                      <span className="text-xs uppercase tracking-wider text-gold">{d.toLocaleString("en", { month: "short" })}</span>
                      <span className="font-display text-2xl font-semibold">{d.getDate()}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                  </div>
                  <div className="space-y-2 p-5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" />{d.toLocaleString("en", { dateStyle: "full", timeStyle: "short" })}</p>
                    {e.location && <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" />{e.location}</p>}
                    {e.description && <p className="pt-1">{e.description}</p>}
                  </div>
                </article>
              );
            })}
            {events && events.length === 0 && <p className="text-muted-foreground">Nothing on the calendar yet. Check back in a few weeks.</p>}
          </div>
        </section>

        <section className="bg-secondary/50 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-semibold text-navy">Recent news</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {(news ?? []).map((n) => (
                <article key={n.id} className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
                    <Newspaper className="h-3.5 w-3.5" /> {new Date(n.created_at).toLocaleDateString("en", { dateStyle: "long" })}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-navy">{n.title}</h3>
                  {n.excerpt && <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>}
                </article>
              ))}
              {news && news.length === 0 && <p className="text-muted-foreground">No announcements right now.</p>}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
