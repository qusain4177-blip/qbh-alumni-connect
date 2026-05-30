import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Briefcase, CalendarDays, Edit, MapPin, Megaphone, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — QBH Alumni" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const { data: profile } = useQuery({
    enabled: !!user,
    queryKey: ["profile", user?.id],
    queryFn: async () => (await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle()).data,
  });
  const { data: announcements } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => (await supabase.from("announcements").select("*").order("created_at", { ascending: false }).limit(5)).data ?? [],
  });
  const { data: upcoming } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => (await supabase.from("events").select("*").gte("event_date", new Date().toISOString()).order("event_date").limit(3)).data ?? [],
  });

  if (loading || !user) {
    return <div className="grid min-h-screen place-items-center bg-background text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-12 lg:px-8">
        {/* Welcome */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Member Portal</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
              Welcome, {profile?.full_name?.split(" ")[0] ?? "Alumnus"}
            </h1>
            {profile?.status === "pending" && (
              <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-navy">
                <ShieldCheck className="h-3.5 w-3.5" /> Account pending approval
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {isAdmin && <Link to="/admin"><Button variant="outline">Admin Console</Button></Link>}
            <Link to="/profile"><Button className="bg-navy text-navy-foreground"><Edit className="mr-2 h-4 w-4" />Edit profile</Button></Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Profile card */}
          <section className="rounded-2xl border border-border bg-card p-7 shadow-card lg:row-span-2">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-navy font-display text-2xl text-gold">
                {profile?.avatar_url
                  ? <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
                  : (profile?.full_name?.split(" ").map((p) => p[0]).slice(0, 2).join("") ?? "A")}
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-navy">{profile?.full_name}</h2>
                <p className="text-sm text-muted-foreground">{profile?.email}</p>
              </div>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <Row label="Matric Passing Year" value={profile?.graduation_year ? `Matric ${profile.graduation_year}` : null} />
              <Row label="Matric Stream" value={(profile as any)?.matric_stream} />
              <Row label="Roll Number" value={(profile as any)?.roll_number} />
              <Row label="Profession" value={profile?.profession} icon={<Briefcase className="h-4 w-4 text-gold" />} />
              <Row label="Company" value={profile?.company} />
              <Row label="Higher Education" value={profile?.higher_education} />
              <Row label="Location" value={[profile?.city, profile?.country].filter(Boolean).join(", ")} icon={<MapPin className="h-4 w-4 text-gold" />} />
              <Row label="LinkedIn" value={profile?.linkedin_url} />
            </dl>
            <Link to="/profile" className="mt-6 inline-flex w-full">
              <Button variant="outline" className="w-full">Update profile</Button>
            </Link>
          </section>

          {/* Quick actions */}
          <section className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            <QuickCard to="/directory" icon={Users} title="Alumni Directory" body="Search and connect with classmates." />
            <QuickCard to="/events" icon={CalendarDays} title="Events & News" body="Upcoming reunions and stories." />
          </section>

          {/* Announcements */}
          <section className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-navy">
              <Megaphone className="h-5 w-5 text-gold" /> Latest from the network
            </h3>
            <ul className="mt-4 divide-y divide-border">
              {(announcements ?? []).map((a) => (
                <li key={a.id} className="py-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider">
                    <span className="rounded bg-gold/15 px-1.5 py-0.5 text-gold">{a.category}</span>
                    <span className="text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-1 font-medium text-navy">{a.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                </li>
              ))}
              {announcements && announcements.length === 0 && <li className="py-6 text-sm text-muted-foreground">No announcements yet.</li>}
            </ul>
          </section>

          {/* Upcoming events sidebar */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-navy">
              <CalendarDays className="h-5 w-5 text-gold" /> Upcoming
            </h3>
            <div className="mt-4 space-y-4">
              {(upcoming ?? []).map((e) => {
                const d = new Date(e.event_date);
                return (
                  <div key={e.id} className="flex gap-3">
                    <div className="flex flex-col items-center rounded-md bg-secondary px-2.5 py-1.5 text-center">
                      <span className="text-[10px] uppercase tracking-wider text-gold">{d.toLocaleString("en", { month: "short" })}</span>
                      <span className="font-display text-lg font-semibold text-navy">{d.getDate()}</span>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-navy">{e.title}</p>
                      <p className="text-xs text-muted-foreground">{e.location ?? ""}</p>
                    </div>
                  </div>
                );
              })}
              {upcoming && upcoming.length === 0 && <p className="text-sm text-muted-foreground">Nothing scheduled yet.</p>}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Row({ label, value, icon }: { label: string; value?: any; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-2 last:border-0">
      <dt className="flex items-center gap-1.5 text-muted-foreground">{icon}{label}</dt>
      <dd className="max-w-[60%] truncate text-right font-medium text-foreground">{value || <span className="text-muted-foreground/50">—</span>}</dd>
    </div>
  );
}

function QuickCard({ to, icon: Icon, title, body }: { to: string; icon: any; title: string; body: string }) {
  return (
    <Link to={to} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-card">
      <div className="grid h-11 w-11 place-items-center rounded-md bg-gradient-hero text-gold"><Icon className="h-5 w-5" /></div>
      <h3 className="mt-4 font-display text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      <p className="mt-3 text-xs font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">Open →</p>
    </Link>
  );
}
