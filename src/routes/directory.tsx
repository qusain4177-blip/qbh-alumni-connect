import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Briefcase, GraduationCap, MapPin, Search, Linkedin, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/directory")({
  head: () => ({ meta: [{ title: "Alumni Directory — QBH" }, { name: "description", content: "Search and connect with fellow alumni." }] }),
  component: Directory,
});

function Directory() {
  const [q, setQ] = useState("");
  const [year, setYear] = useState("");
  const [city, setCity] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["directory"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, graduation_year, profession, company, city, country, linkedin_url, website_url, bio")
        .eq("status", "approved")
        .order("graduation_year", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = useMemo(() => {
    return (data ?? []).filter((p) => {
      const matchQ = !q || [p.full_name, p.profession, p.company].some((v) => v?.toLowerCase().includes(q.toLowerCase()));
      const matchY = !year || String(p.graduation_year ?? "").includes(year);
      const matchC = !city || (p.city ?? "").toLowerCase().includes(city.toLowerCase());
      return matchQ && matchY && matchC;
    });
  }, [data, q, year, city]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-14 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Network</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy lg:text-5xl">Alumni Directory</h1>
          <p className="mt-3 text-muted-foreground">Find classmates, mentors, and collaborators across every class and continent.</p>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-4 shadow-card lg:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_140px_180px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by name, profession, company..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Input placeholder="Class year" value={year} onChange={(e) => setYear(e.target.value)} />
            <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
        </div>

        <div className="mt-3 text-sm text-muted-foreground">
          {isLoading ? "Loading..." : `${filtered.length} alumni found`}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.id} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-card">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-navy text-gold font-display text-xl font-semibold">
                  {p.avatar_url
                    ? <img src={p.avatar_url} alt={p.full_name} className="h-full w-full object-cover" />
                    : p.full_name?.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-display text-lg font-semibold text-navy">{p.full_name}</h3>
                  {p.graduation_year && (
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <GraduationCap className="h-3.5 w-3.5 text-gold" /> Class of {p.graduation_year}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {p.profession && <p className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-gold" />{p.profession}{p.company ? ` · ${p.company}` : ""}</p>}
                {p.city && <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" />{p.city}{p.country ? `, ${p.country}` : ""}</p>}
              </div>
              {p.bio && <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{p.bio}</p>}
              <div className="mt-4 flex gap-2">
                {p.linkedin_url && <a href={p.linkedin_url} target="_blank" rel="noreferrer" className="grid h-8 w-8 place-items-center rounded-md bg-secondary text-navy hover:bg-navy hover:text-gold"><Linkedin className="h-4 w-4" /></a>}
                {p.website_url && <a href={p.website_url} target="_blank" rel="noreferrer" className="grid h-8 w-8 place-items-center rounded-md bg-secondary text-navy hover:bg-navy hover:text-gold"><Globe className="h-4 w-4" /></a>}
              </div>
            </article>
          ))}
        </div>

        {!isLoading && filtered.length === 0 && (
          <div className="mt-12 rounded-xl border border-dashed border-border p-12 text-center">
            <h3 className="font-display text-xl text-navy">No alumni match those filters yet.</h3>
            <p className="mt-2 text-sm text-muted-foreground">Be the first — <Link to="/signup" className="text-navy underline">create your profile</Link>.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
