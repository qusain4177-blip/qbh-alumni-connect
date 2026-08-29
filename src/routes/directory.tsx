import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Briefcase, Building2, GraduationCap, MapPin, Search, Linkedin, Globe, BookOpen, Pencil, Plus } from "lucide-react";
import { LinkedInLink } from "@/components/LinkedInLink";
import { Avatar } from "@/components/Avatar";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { ALUMNI_MOCK_DATA, type AlumniRecord } from "@/lib/alumni-mock-data";

export const Route = createFileRoute("/directory")({
  head: () => ({ meta: [{ title: "QBH UMBRELLA Alumni Directory" }, { name: "description", content: "Search and connect with fellow Matric alumni." }] }),
  component: Directory,
});

function Directory() {
  const { isAdmin } = useAuth();
  const [q, setQ] = useState("");

  const [year, setYear] = useState("");
  const [stream, setStream] = useState("");
  const [pursuit, setPursuit] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");

  const { data: remoteData, isLoading: remoteLoading } = useQuery<AlumniRecord[]>({
    queryKey: ["directory"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, alumni_id, full_name, avatar_url, graduation_year, matric_stream, profession, company, higher_education, city, country, linkedin_url, website_url, bio")
        .eq("status", "approved")
        .order("graduation_year", { ascending: false });
      if (error) throw error;
      return (data ?? []) as AlumniRecord[];
    },
    retry: false,
    staleTime: 60_000,
  });
  const [fallbackReady, setFallbackReady] = useState(false);
  useEffect(() => {
    const timeout = window.setTimeout(() => setFallbackReady(true), 800);
    return () => window.clearTimeout(timeout);
  }, []);
  const data = ALUMNI_MOCK_DATA;
  const isLoading = remoteLoading && !fallbackReady;

  const locationOptions = useMemo(() => {
    const set = new Set<string>();
    (data ?? []).forEach((p) => {
      [p.city, p.country].forEach((v) => v && set.add(String(v).trim()));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const companyOptions = useMemo(() => {
    const set = new Set<string>();
    (data ?? []).forEach((p) => p.company && set.add(String(p.company).trim()));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const filtered = useMemo(() => {
    const pq = pursuit.toLowerCase();
    const lq = location.toLowerCase().trim();
    const cq = company.toLowerCase().trim();
    return (data ?? []).filter((p) => {
      const matchQ =
        !q ||
        [p.full_name, p.alumni_id, p.profession, p.company, p.city, p.country, String(p.graduation_year ?? "")].some((v) =>
          v?.toLowerCase?.().includes(q.toLowerCase()),
        );
      const matchY = !year || String(p.graduation_year ?? "").includes(year);
      const matchS = !stream || p.matric_stream === stream;
      const matchP = !pursuit || [p.profession, p.higher_education, p.company].some((v) => v?.toLowerCase().includes(pq));
      const matchL = !lq || [p.city, p.country].some((v) => v?.toLowerCase().includes(lq));
      const matchC = !cq || [p.company, p.higher_education].some((v) => v?.toLowerCase().includes(cq));
      return matchQ && matchY && matchS && matchP && matchL && matchC;
    });
  }, [data, q, year, stream, pursuit, location, company]);

  const clearAll = () => {
    setQ("");
    setYear("");
    setStream("");
    setPursuit("");
    setLocation("");
    setCompany("");
  };


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-14 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">QBH UMBRELLA Alumni</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy lg:text-5xl">QBH UMBRELLA Alumni Directory</h1>
          <p className="mt-3 text-muted-foreground">Find batchmates, mentors, and collaborators from every Matric batch and stream.</p>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-4 shadow-card lg:p-5">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by name, profession, company, city..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                list="directory-locations"
                placeholder="Work location (city or country)"
                className="pl-9"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <datalist id="directory-locations">
                {locationOptions.map((o) => <option key={o} value={o} />)}
              </datalist>
            </div>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                list="directory-companies"
                placeholder="Company or organization"
                className="pl-9"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <datalist id="directory-companies">
                {companyOptions.map((o) => <option key={o} value={o} />)}
              </datalist>
            </div>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-[140px_180px_1.2fr]">
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
          <span className="flex flex-wrap items-center gap-2">
            <span>{isLoading ? "Loading..." : `${filtered.length} alumni found`}</span>
            {location && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-navy">
                <MapPin className="h-3 w-3 text-gold" /> {location}
              </span>
            )}
            {company && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-navy">
                <Building2 className="h-3 w-3 text-gold" /> {company}
              </span>
            )}
            {(q || year || stream || pursuit || location || company) && (
              <button onClick={clearAll} className="text-xs underline underline-offset-4 hover:text-navy">Clear filters</button>
            )}
          </span>
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
                  <Avatar name={p.full_name} src={p.avatar_url} />
                  <div className="min-w-0">
                    {p.alumni_id && (
                      <span className="mb-1 inline-block rounded-md bg-navy px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-gold">{p.alumni_id}</span>
                    )}
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
                  {p.profession && <p className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-gold" />{p.profession}</p>}
                  {p.company && <p className="flex items-center gap-2"><Building2 className="h-4 w-4 text-gold" />{p.company}</p>}
                  {p.higher_education && <p className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-gold" />{p.higher_education}</p>}
                </div>
                {(p.city || p.country) && (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-navy">
                    <MapPin className="h-3.5 w-3.5 text-gold" />
                    {[p.city, p.country].filter(Boolean).join(", ")}
                  </span>
                )}
                {p.bio && <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{p.bio}</p>}
              </Link>
              <div className="mt-4 flex items-center gap-2">
                {p.linkedin_url && <LinkedInLink url={p.linkedin_url} aria-label={`${p.full_name} on LinkedIn`} className="grid h-8 w-8 place-items-center rounded-md bg-secondary text-navy transition-all duration-300 hover:bg-navy hover:text-gold"><Linkedin className="h-4 w-4" /></LinkedInLink>}
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
            <h3 className="font-display text-xl text-navy">
              {location
                ? `No alumni found in ${location}.`
                : company
                  ? `No alumni found at ${company}.`
                  : "No alumni match those filters yet."}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">Try broadening your search, or <Link to="/contact" className="text-navy underline">contact the alumni office</Link> to be added.</p>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
