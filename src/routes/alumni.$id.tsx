import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Briefcase,
  BookOpen,
  GraduationCap,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/alumni/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Alumni Profile — QBH` },
      { name: "description", content: `Alumni profile page for a Qamar E Bani Hashim Matric graduate.` },
      { property: "og:title", content: `Alumni Profile — QBH` },
      { property: "og:description", content: `Qamar E Bani Hashim alumni profile.` },
    ],
  }),
  component: AlumniProfile,
});

function initials(name?: string) {
  return (name ?? "").split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase();
}

function AlumniProfile() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["alumni", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .eq("status", "approved")
        .maybeSingle();
      if (error) throw error;
      return data as any;
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-14 lg:px-8">
        <Link
          to="/directory"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" /> Back to directory
        </Link>

        {isLoading && (
          <div className="mt-10 h-64 animate-pulse rounded-2xl border border-border bg-card" />
        )}

        {!isLoading && (!data || error) && (
          <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
            <h1 className="font-display text-2xl text-navy">Profile not found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This alumnus may have been removed or their profile is not yet approved.
            </p>
            <Button asChild className="mt-6"><Link to="/directory">Browse directory</Link></Button>
          </div>
        )}

        {data && (
          <article className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Cover / header */}
            <div className="relative h-40 bg-gradient-to-br from-navy via-navy to-navy/80 sm:h-52">
              <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,theme(colors.gold/.35),transparent_45%),radial-gradient(circle_at_80%_60%,theme(colors.white/.15),transparent_50%)]" />
            </div>

            <div className="relative px-6 pb-8 pt-0 sm:px-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
                <div className="-mt-16 grid h-32 w-32 shrink-0 place-items-center overflow-hidden rounded-full border-4 border-card bg-[#a8dc7a] text-3xl font-semibold text-navy shadow-sm ring-4 ring-[#8bc34a]/60 sm:-mt-20 sm:h-40 sm:w-40">
                  {data.avatar_url ? (
                    <img src={data.avatar_url} alt={data.full_name} className="h-full w-full object-cover" />
                  ) : (
                    initials(data.full_name)
                  )}
                </div>

                <div className="min-w-0 flex-1 pt-2">
                  <h1 className="truncate font-display text-3xl font-semibold text-navy sm:text-4xl">
                    {data.full_name}
                  </h1>
                  {(data.profession || data.company) && (
                    <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {[data.profession, data.company].filter(Boolean).join(" @ ")}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {data.graduation_year && <Chip>#Batch{data.graduation_year}</Chip>}
                    {data.matric_stream && <Chip>#{String(data.matric_stream).replace(/\s+/g, "")}</Chip>}
                    {data.higher_education && <Chip>#{data.higher_education.split(/\s+/)[0]}</Chip>}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {data.email && (
                    <Button asChild size="sm">
                      <a href={`mailto:${data.email}`}><Mail className="mr-2 h-4 w-4" />Email</a>
                    </Button>
                  )}
                  {data.linkedin_url && (
                    <Button asChild size="sm" variant="outline">
                      <a href={data.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {data.bio && (
                <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {data.bio}
                </p>
              )}

              {/* Info grid */}
              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                <InfoCard title="Academic Information">
                  <InfoRow icon={<GraduationCap className="h-4 w-4" />} label="Matric Batch"
                    value={data.graduation_year ? `Matric ${data.graduation_year}` : "—"} />
                  <InfoRow icon={<BookOpen className="h-4 w-4" />} label="Degree Field"
                    value={data.matric_stream || "—"} />
                  <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Current University / Program"
                    value={[data.higher_education, data.company].filter(Boolean).join(" · ") || "—"} />
                </InfoCard>

                <InfoCard title="Personal & Contact">
                  <InfoRow icon={<Mail className="h-4 w-4" />} label="Email"
                    value={data.email
                      ? <a href={`mailto:${data.email}`} className="text-navy hover:underline">{data.email}</a>
                      : "—"} />
                  <InfoRow icon={<MapPin className="h-4 w-4" />} label="Location"
                    value={[data.city, data.country].filter(Boolean).join(", ") || "—"} />
                  <InfoRow icon={<User className="h-4 w-4" />} label="Father's Name"
                    value={data.father_name || "—"} />
                  {data.website_url && (
                    <InfoRow icon={<Globe className="h-4 w-4" />} label="Website"
                      value={<a href={data.website_url} target="_blank" rel="noopener noreferrer" className="text-navy hover:underline">{data.website_url}</a>} />
                  )}
                </InfoCard>
              </div>
            </div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-navy">
      {children}
    </span>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-background p-6">
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h2>
      <dl className="mt-5 space-y-4">{children}</dl>
    </section>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-gold">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 truncate text-sm text-navy">{value}</dd>
      </div>
    </div>
  );
}
