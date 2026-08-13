import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  Heart,
  BookOpen,
  GraduationCap,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Pencil,
  Trash2,
  User,
  School,
} from "lucide-react";
import { LinkedInLink } from "@/components/LinkedInLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";


export const Route = createFileRoute("/alumni/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Alumni Profile — QBHS UMBRELLA` },
      { name: "description", content: `Alumni profile page for a QBHS UMBRELLA Matric graduate.` },
      { property: "og:title", content: `Alumni Profile — QBHS UMBRELLA` },
      { property: "og:description", content: `QBHS UMBRELLA alumni profile.` },
    ],
  }),
  component: AlumniProfile,
});

function initials(name?: string) {
  return (name ?? "").split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase();
}

function AlumniProfile() {
  const { id } = Route.useParams();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this alumni profile permanently?")) return;
    setDeleting(true);
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    setDeleting(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Profile deleted");
    navigate({ to: "/directory" });
  };


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

  const badgeText = (() => {
    const parts: string[] = [];
    if (data?.profession && data?.company) {
      parts.push(`${data.profession} | ${data.company} Alumni`);
    } else if (data?.profession) {
      parts.push(data.profession);
    } else if (data?.higher_education) {
      parts.push(data.higher_education);
    } else if (data?.company) {
      parts.push(`${data.company} Alumni`);
    }
    if (data?.graduation_year) parts.push(`Batch ${data.graduation_year}`);
    return parts.filter(Boolean).join(" | ");
  })();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-14 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/directory"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" /> Back to directory
          </Link>

          {isAdmin && data && (
            <div className="flex items-center gap-2">
              <Link to="/admin" className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-navy hover:bg-secondary">
                <Pencil className="h-3.5 w-3.5" /> Edit profile
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-60"
              >
                <Trash2 className="h-3.5 w-3.5" /> {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>


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
              {/* Centered profile header */}
              <div className="flex flex-col items-center text-center">
                <div className="-mt-16 grid h-32 w-32 shrink-0 place-items-center overflow-hidden rounded-full border-4 border-card bg-[#a8dc7a] text-3xl font-semibold text-navy shadow-sm ring-4 ring-[#8bc34a]/60 sm:-mt-20 sm:h-40 sm:w-40">
                  {data.avatar_url ? (
                    <img src={data.avatar_url} alt={data.full_name} className="h-full w-full object-cover" />
                  ) : (
                    initials(data.full_name)
                  )}
                </div>

                <div className="mt-4 min-w-0 max-w-2xl">
                  {data.alumni_id && (
                    <p className="mb-3 inline-flex items-center gap-2 rounded-md bg-navy px-3 py-1 font-mono text-xs font-semibold tracking-widest text-gold">
                      {data.alumni_id}
                    </p>
                  )}
                  <h1 className="truncate font-display text-3xl font-semibold text-navy sm:text-4xl">
                    {data.full_name}
                  </h1>
                  {badgeText && (
                    <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {badgeText}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {data.graduation_year && <Chip>#Batch{data.graduation_year}</Chip>}
                    {data.matric_stream && <Chip>#{String(data.matric_stream).replace(/\s+/g, "")}</Chip>}
                    {data.higher_education && <Chip>#{data.higher_education.split(/\s+/)[0]}</Chip>}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {data.email && (
                    <Button asChild size="sm">
                      <a href={`mailto:${data.email}`}><Mail className="mr-2 h-4 w-4" />Email</a>
                    </Button>
                  )}
                  {data.linkedin_url && (
                    <Button asChild size="sm" variant="outline">
                      <LinkedInLink url={data.linkedin_url}>
                        <Linkedin className="mr-2 h-4 w-4" />LinkedIn
                      </LinkedInLink>
                    </Button>
                  )}
                </div>
              </div>

              {data.bio && (
                <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
                  {data.bio}
                </p>
              )}

              {/* Info grid */}
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                <InfoCard title="Academic & Graduation">
                  <InfoRow icon={<School className="h-4 w-4" />} label="Matric Batch"
                    value={data.graduation_year ? `Matric ${data.graduation_year}` : "—"} />
                  <InfoRow icon={<GraduationCap className="h-4 w-4" />} label="Highest Qualification"
                    value={data.higher_education || "—"} />
                  <InfoRow icon={<BookOpen className="h-4 w-4" />} label="University"
                    value={data.company || "—"} />
                  <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Degree Program"
                    value={data.profession || "—"} />
                </InfoCard>

                <InfoCard title="Contact & Location">
                  <InfoRow icon={<Mail className="h-4 w-4" />} label="Email"
                    value={data.email
                      ? <a href={`mailto:${data.email}`} className="text-navy hover:underline">{data.email}</a>
                      : "—"} />
                  <InfoRow icon={<MapPin className="h-4 w-4" />} label="Location"
                    value={[data.city, data.country].filter(Boolean).join(", ") || "—"} />
                  {data.linkedin_url && (
                    <InfoRow icon={<Linkedin className="h-4 w-4" />} label="LinkedIn"
                      value={<LinkedInLink url={data.linkedin_url} className="text-navy hover:underline">View profile</LinkedInLink>} />

                  )}
                  {data.website_url && (
                    <InfoRow icon={<Globe className="h-4 w-4" />} label="Website"
                      value={<a href={data.website_url} target="_blank" rel="noopener noreferrer" className="text-navy hover:underline">{data.website_url}</a>} />
                  )}
                </InfoCard>

                <InfoCard title="Personal Details">
                  <InfoRow icon={<User className="h-4 w-4" />} label="Father's Name"
                    value={data.father_name || "—"} />
                  {data.date_of_birth && (
                    <InfoRow icon={<CalendarDays className="h-4 w-4" />} label="Date of Birth"
                      value={new Date(data.date_of_birth).toLocaleDateString("en-GB")} />
                  )}
                  {data.marital_status && (
                    <InfoRow icon={<Heart className="h-4 w-4" />} label="Marital Status"
                      value={data.marital_status} />
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
        <dd className="mt-0.5 text-sm text-navy">{value}</dd>
      </div>
    </div>
  );
}
