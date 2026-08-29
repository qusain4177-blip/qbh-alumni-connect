import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Briefcase, Building2, GraduationCap, MapPin, Search, Linkedin, Globe, BookOpen, Pencil, Plus } from "lucide-react";
import { LinkedInLink } from "@/components/LinkedInLink";
import { Avatar } from "@/components/Avatar";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import type { AlumniRecord } from "@/lib/alumni-mock-data";

export const Route = createFileRoute("/directory")({
  head: () => ({ meta: [{ title: "QBH UMBRELLA Alumni Directory" }, { name: "description", content: "Search and connect with fellow Matric alumni." }] }),
  component: Directory,
});

type AlumniWithGender = AlumniRecord & { gender?: string | null };

function mapAlumniRecord(item: unknown): AlumniWithGender {
  const record = (item ?? {}) as Record<string, unknown>;
  return {
    ...record,
    id: String(record?.id ?? record?.alumni_id ?? "unknown-alumni"),
    alumni_id: (record?.alumni_id ?? record?.id ?? null) as string | null,
    full_name: String(record?.full_name ?? record?.name ?? "Unnamed alumni"),
    avatar_url: (record?.avatar_url ?? null) as string | null,
    graduation_year: (record?.batch ?? record?.graduation_year ?? null) as number | null,
    higher_education: (record?.qualification ?? record?.higher_education ?? null) as string | null,
    profession: (record?.occupation ?? record?.profession ?? null) as string | null,
    phone: (record?.contact ?? record?.phone ?? null) as string | null,
    gender: (record?.gender ?? null) as string | null,
  } as AlumniWithGender;
}

function Directory() {
  const { isAdmin } = useAuth();
  const [q, setQ] = useState("");
  const [alumni, setAlumni] = useState<AlumniWithGender[]>([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const { data, error } = await supabase.from("alumni").select("*");
        console.log("SUPABASE DIRECT DATA:", data);
        if (error) throw error;
        if (data && data.length > 0) {
          setAlumni(data.map(mapAlumniRecord));
        }
      } catch (err) {
        console.error("Fetch exception:", err);
      }
    };
    void fetchAlumni();
  }, []);

  useEffect(() => {
    const channel = supabase?.channel("alumni-directory").on(
      "postgres_changes",
      { event: "*", schema: "public", table: "alumni" },
      (payload) => {
        const incoming = mapAlumniRecord(payload.new);
        setAlumni((current = []) => {
          const existing = current ?? [];
          if (payload.eventType === "UPDATE") {
            return existing.map((item) => item?.id === incoming.id ? incoming : item);
          }
          if (existing.some((item) => item?.id === incoming.id)) return existing;
          return [incoming, ...existing];
        });
      },
    ).subscribe();

    return () => {
      if (channel) void supabase?.removeChannel(channel);
    };
  }, []);

  const [year, setYear] = useState("");
  const [stream, setStream] = useState("");
  const [pursuit, setPursuit] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");

  const data = alumni ?? [];
  const isLoading = false;

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
        [p?.full_name, p?.alumni_id, p?.profession, p?.company, p?.city, p?.country, p?.graduation_year].some((v) =>
          String(v ?? "").toLowerCase().includes(q.toLowerCase()),
        );
      const matchY = !year || String(p?.graduation_year ?? "").includes(year);
      const matchS = !stream || p?.matric_stream === stream;
      const matchP = !pursuit || [p?.profession, p?.higher_education, p?.company].some((v) => String(v ?? "").toLowerCase().includes(pq));
      const matchL = !lq || [p?.city, p?.country].some((v) => String(v ?? "").toLowerCase().includes(lq));
      const matchC = !cq || [p?.company, p?.higher_education].some((v) => String(v ?? "").toLowerCase().includes(cq));
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
            <span>{isLoading ? "Loading..." : `${filtered?.length || 0} alumni found`}</span>
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
          {filtered?.map((item, index) => {
            const name = item?.full_name || "Alumni Member";
            const batch = item?.graduation_year ? String(item?.graduation_year) : "N/A";
            const qualification = item?.higher_education || "";
            const occupation = item?.profession || "";
            const gender = String(item?.gender ?? "").toLowerCase();
            const avatarUrl = item?.avatar_url ||
              (gender === "female"
                ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&gender=female`
                : gender === "male"
                  ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&gender=male`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0F172A&color=fff&bold=true`);
            return (
            <article key={item?.alumni_id || index} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-card">
              <Link to="/alumni/$id" params={{ id: item?.id || "unknown" }} className="block">
                <div className="flex items-center gap-4">
                  <Avatar
                    name={name}
                    src={avatarUrl}
                  />
                  <div className="min-w-0">
                    {item?.alumni_id && (
                      <span className="mb-1 inline-block rounded-md bg-navy px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-gold">{item?.alumni_id}</span>
                    )}
                    <h3 className="truncate font-display text-lg font-semibold text-navy group-hover:underline">{name}</h3>
                    {batch !== "N/A" && (
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <GraduationCap className="h-3.5 w-3.5 text-gold" /> Matric {batch}
                        {item?.matric_stream ? ` · ${item?.matric_stream}` : ""}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {occupation && <p className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-gold" />{occupation}</p>}
{item?.company && <p className="flex items-center gap-2"><Building2 className="h-4 w-4 text-gold" />{item?.company}</p>}
                  {qualification && <p className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-gold" />{qualification}</p>}
                </div>
                {(item?.city || item?.country) && (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-navy">
                    <MapPin className="h-3.5 w-3.5 text-gold" />
                    {[item?.city, item?.country].filter(Boolean).join(", ")}
                  </span>
                )}
                {item?.bio && <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{item?.bio}</p>}
              </Link>
              <div className="mt-4 flex items-center gap-2">
                {item?.linkedin_url && <LinkedInLink url={item?.linkedin_url} aria-label={`${name} on LinkedIn`} className="grid h-8 w-8 place-items-center rounded-md bg-secondary text-navy transition-all duration-300 hover:bg-navy hover:text-gold"><Linkedin className="h-4 w-4" /></LinkedInLink>}
                {item?.website_url && <a href={item?.website_url} target="_blank" rel="noopener noreferrer" aria-label={`${name} website`} className="grid h-8 w-8 place-items-center rounded-md bg-secondary text-navy transition-all duration-300 hover:bg-navy hover:text-gold"><Globe className="h-4 w-4" /></a>}
                {isAdmin && (
                  <Link to="/admin" className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-navy hover:bg-secondary">
                    <Pencil className="h-3.5 w-3.5" /> Manage
                  </Link>
                )}
              </div>

            </article>
              );
          })}
        </div>

        {!isLoading && filtered.length === 0 && (
          <div className="mt-12 rounded-xl border border-dashed border-border p-12 text-center">
            <h3 className="font-display text-xl text-navy">No Data Available</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {location
                ? `No alumni found in ${location}.`
                : company
                  ? `No alumni found at ${company}.`
                  : "No alumni registered yet"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Try broadening your search, or <Link to="/contact" className="text-navy underline">contact the alumni office</Link> to be added.</p>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
