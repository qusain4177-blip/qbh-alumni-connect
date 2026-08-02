import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Briefcase, GraduationCap, MapPin, Search, Linkedin, Globe, BookOpen, Pencil, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";


export const Route = createFileRoute("/directory")({
  head: () => ({ meta: [{ title: "Alumni Directory — QBH" }, { name: "description", content: "Search and connect with fellow Matric alumni." }] }),
  component: Directory,
});

function Directory() {
  const { isAdmin } = useAuth();
  const [q, setQ] = useState("");

  const [year, setYear] = useState("");
  const [stream, setStream] = useState("");
  const [pursuit, setPursuit] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["directory"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, graduation_year, matric_stream, profession, company, higher_education, city, country, linkedin_url, website_url, bio")
        .eq("status", "approved")
        .order("graduation_year", { ascending: false });
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

  const filtered = useMemo(() => {
    const pq = pursuit.toLowerCase();
    return (data ?? []).filter((p) => {
      const matchQ = !q || [p.full_name, p.profession, p.company].some((v) => v?.toLowerCase().includes(q.toLowerCase()));
      const matchY = !year || String(p.graduation_year ?? "").includes(year);
      const matchS = !stream || p.matric_stream === stream;
      const matchP = !pursuit || [p.profession, p.higher_education, p.company].some((v) => v?.toLowerCase().includes(pq));
      return matchQ && matchY && matchS && matchP;
    });
  }, [data, q, year, stream, pursuit]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-14 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Network</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy lg:text-5xl">Matric Alumni Directory</h1>
          <p className="mt-3 text-muted-foreground">Find batchmates, mentors, and collaborators from every Matric batch and stream.</p>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-4 shadow-card lg:p-5">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.5fr_140px_180px_1.2fr]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by name, profession, company..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Input placeholder="Matric year" value={year} onChange={(e) => setYear(e.target.value)} />
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
            >
              <option value="">All streams</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Biology">Biology</option>
              <option value="Arts/Commerce">Arts/Commerce</option>
            </select>
            <Input placeholder="Profession or higher education (e.g. Bachelors, Job)" value={pursuit} onChange={(e) => setPursuit(e.target.value)} />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>{isLoading ? "Loading..." : `${filtered.length} alumni found`}</span>
          {isAdmin && (
            <Link to="/admin" className="inline-flex items-center gap-1.5 rounded-md bg-navy px-3 py-1.5 text-xs font-medium text-navy-foreground hover:opacity-90">
              <Plus className="h-3.5 w-3.5" /> Add alumni
            </Link>
          )}
        </div>


        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.id} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-card">
              <Link to="/alumni/$id" params={{ id: p.id }} className="block">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-navy text-gold font-display text-xl font-semibold">
                    {p.avatar_url
                      ? <img src={p.avatar_url} alt={p.full_name} className="h-full w-full object-cover" />
                      : p.full_name?.split(" ").map((x: string) => x[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-lg font-semibold text-navy group-hover:underline">{p.full_name}</h3>
                    {p.graduation_year && (
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <GraduationCap className="h-3.5 w-3.5 text-gold" /> Matric {p.graduation_year}
                        {p.matric_stream ? ` · ${p.matric_stream}` : ""}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {p.profession && <p className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-gold" />{p.profession}{p.company ? ` · ${p.company}` : ""}</p>}
                  {p.higher_education && <p className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-gold" />{p.higher_education}</p>}
                  {p.city && <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" />{p.city}{p.country ? `, ${p.country}` : ""}</p>}
                </div>
                {p.bio && <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{p.bio}</p>}
              </Link>
              <div className="mt-4 flex items-center gap-2">
                {p.linkedin_url && <a href={p.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label={`${p.full_name} on LinkedIn`} className="grid h-8 w-8 place-items-center rounded-md bg-secondary text-navy transition-all duration-300 hover:bg-navy hover:text-gold"><Linkedin className="h-4 w-4" /></a>}
                {p.website_url && <a href={p.website_url} target="_blank" rel="noopener noreferrer" aria-label={`${p.full_name} website`} className="grid h-8 w-8 place-items-center rounded-md bg-secondary text-navy transition-all duration-300 hover:bg-navy hover:text-gold"><Globe className="h-4 w-4" /></a>}
                {isAdmin && (
                  <Link to="/admin" className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-navy hover:bg-secondary">
                    <Pencil className="h-3.5 w-3.5" /> Manage
                  </Link>
                )}
              </div>

            </article>
          ))}
        </div>

        {!isLoading && filtered.length === 0 && (
          <div className="mt-12 rounded-xl border border-dashed border-border p-12 text-center">
            <h3 className="font-display text-xl text-navy">No alumni match those filters yet.</h3>
            <p className="mt-2 text-sm text-muted-foreground">Try broadening your search, or <Link to="/contact" className="text-navy underline">contact the alumni office</Link> to be added.</p>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
