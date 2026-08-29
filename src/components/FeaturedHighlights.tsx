import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, CalendarDays, Megaphone, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import fallbackImage from "@/assets/hero-school.jpg";

type Highlight = {
  id: string;
  category: "Event" | "Promotion" | "Announcement";
  title: string;
  caption: string;
  image?: string | null;
  href: string;
};

function getImage(item: Record<string, unknown>) {
  return (item.cover_image ?? item.image_url ?? item.image ?? item.photo_url) as string | null | undefined;
}

export function FeaturedHighlights() {
  const { data: highlights = [], isLoading } = useQuery({
    queryKey: ["homepage-highlights"],
    queryFn: async (): Promise<Highlight[]> => {
      const [{ data: events }, { data: news }, { data: announcements }] = await Promise.all([
        supabase.from("events").select("*").order("event_date", { ascending: false }).limit(2),
        supabase.from("news").select("*").eq("published", true).order("created_at", { ascending: false }).limit(2),
        supabase.from("announcements").select("*").order("created_at", { ascending: false }).limit(2),
      ]);

      const eventCards = (events ?? []).map((item: any) => ({
        id: item.id,
        category: "Event" as const,
        title: item.title,
        caption: item.description ?? item.location ?? "See what is coming up in the alumni calendar.",
        image: getImage(item),
        href: "/events",
      }));
      const storyCards = (news ?? []).map((item: any) => ({
        id: item.id,
        category: "Promotion" as const,
        title: item.title,
        caption: item.excerpt ?? item.description ?? "Read the latest story from QBH UMBRELLA Alumni.",
        image: getImage(item),
        href: "/wall-of-fame",
      }));
      const announcementCards = (announcements ?? []).map((item: any) => ({
        id: item.id,
        category: "Announcement" as const,
        title: item.title,
        caption: item.excerpt ?? item.description ?? "Read the latest update from QBH UMBRELLA Alumni.",
        image: getImage(item),
        href: `/events#announcement-${item.id}`,
      }));

      return [...eventCards, ...storyCards, ...announcementCards]
        .sort((a, b) => String(b.id).localeCompare(String(a.id)))
        .slice(0, 4);
    },
  });

  return (
    <section aria-labelledby="highlights-heading" className="border-b border-border bg-secondary/35 py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Fresh from the network</p>
            <h2 id="highlights-heading" className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">Featured highlights</h2>
          </div>
          <Link to="/events" className="hidden shrink-0 text-sm font-medium text-navy hover:text-gold sm:inline-flex sm:items-center sm:gap-1">View archive <ArrowUpRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-4">
          {isLoading && Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-80 min-w-[280px] animate-pulse rounded-xl bg-card md:min-w-0" />)}
          {!isLoading && highlights.length === 0 && <p className="col-span-full rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground">New events and stories will appear here as they are published.</p>}
          {!isLoading && highlights.map((highlight) => {
            const Icon = highlight.category === "Event" ? CalendarDays : highlight.category === "Promotion" ? Sparkles : Megaphone;
            return (
              <article key={`${highlight.category}-${highlight.id}`} className="group min-w-[280px] snap-start overflow-hidden rounded-xl border border-border bg-card md:min-w-0">
                <Link to={highlight.href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                    <img src={highlight.image || fallbackImage} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-navy/35" />
                    <Badge className="absolute left-4 top-4 gap-1 border-white/20 bg-navy/85 text-white"><Icon className="h-3 w-3" />{highlight.category}</Badge>
                  </div>
                  <div className="flex min-h-44 flex-col p-5">
                    <h3 className="font-display text-xl font-semibold leading-tight text-navy">{highlight.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{highlight.caption}</p>
                    <Button variant="link" className="mt-auto w-fit px-0 text-navy">{highlight.category === "Promotion" ? "Read story" : highlight.category === "Announcement" ? "Read update" : "View details"}<ArrowUpRight className="ml-1 h-4 w-4" /></Button>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
