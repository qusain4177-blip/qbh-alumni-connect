import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Megaphone, Newspaper, Trash2, Users, CalendarPlus, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Console — QBH Alumni" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast.error("Admin access required");
      navigate({ to: "/dashboard" });
    }
  }, [loading, user, isAdmin, navigate]);

  if (loading || !user || !isAdmin) {
    return <div className="grid min-h-screen place-items-center text-muted-foreground">Verifying access...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-12 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Operator Console</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Centralized control over alumni, events, and content.</p>

        <Stats />

        <Tabs defaultValue="users" className="mt-10">
          <TabsList className="bg-secondary">
            <TabsTrigger value="users"><Users className="mr-2 h-4 w-4" />Alumni</TabsTrigger>
            <TabsTrigger value="news"><Newspaper className="mr-2 h-4 w-4" />News</TabsTrigger>
            <TabsTrigger value="events"><CalendarPlus className="mr-2 h-4 w-4" />Events</TabsTrigger>
            <TabsTrigger value="announce"><Megaphone className="mr-2 h-4 w-4" />Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-6"><AlumniMgmt /></TabsContent>
          <TabsContent value="news" className="mt-6"><NewsMgmt /></TabsContent>
          <TabsContent value="events" className="mt-6"><EventsMgmt /></TabsContent>
          <TabsContent value="announce" className="mt-6"><AnnouncementsMgmt /></TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}

function Stats() {
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [{ count: total }, { count: pending }, { data: recent }, { data: rows }] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("profiles").select("id, full_name, created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("profiles").select("graduation_year, matric_stream"),
      ]);
      const yearMap: Record<string, number> = {};
      const streamMap: Record<string, number> = {};
      ((rows ?? []) as any[]).forEach((p) => {
        if (p.graduation_year) yearMap[p.graduation_year] = (yearMap[p.graduation_year] ?? 0) + 1;
        const s = p.matric_stream || "Unspecified";
        streamMap[s] = (streamMap[s] ?? 0) + 1;
      });
      const topYears = Object.entries(yearMap).sort((a, b) => Number(b[0]) - Number(a[0])).slice(0, 6);
      const streams = Object.entries(streamMap).sort((a, b) => b[1] - a[1]);
      return { total: total ?? 0, pending: pending ?? 0, recent: recent ?? [], topYears, streams };
    },
  });

  const totalForPct = (data?.streams ?? []).reduce((a, [, c]) => a + c, 0) || 1;

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <Stat label="Total Alumni" value={data?.total ?? 0} />
      <Stat label="Pending Approval" value={data?.pending ?? 0} tone="warn" />
      <div className="rounded-xl border border-border bg-card p-5 lg:col-span-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Matric Batches</p>
        <div className="mt-3 space-y-1 text-sm">
          {data?.topYears.map(([y, c]) => (
            <div key={y} className="flex justify-between"><span className="font-medium text-navy">Matric {y}</span><span className="text-muted-foreground">{c}</span></div>
          ))}
          {data && data.topYears.length === 0 && <p className="text-muted-foreground">No data yet</p>}
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Stream Breakdown</p>
        <div className="mt-3 space-y-2 text-sm">
          {data?.streams.map(([s, c]) => {
            const pct = Math.round((c / totalForPct) * 100);
            return (
              <div key={s}>
                <div className="flex justify-between"><span className="font-medium text-navy">{s}</span><span className="text-muted-foreground">{c} · {pct}%</span></div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
          {data && data.streams.length === 0 && <p className="text-muted-foreground">No data yet</p>}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number | string; tone?: "warn" }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-2 font-display text-4xl font-semibold ${tone === "warn" ? "text-gold" : "text-navy"}`}>{value}</p>
    </div>
  );
}

function AlumniMgmt() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => (await supabase.from("profiles").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from("profiles").update(patch).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Updated"); qc.invalidateQueries({ queryKey: ["admin-profiles"] }); qc.invalidateQueries({ queryKey: ["admin-stats"] }); }
  };
  const del = async (id: string) => {
    if (!confirm("Delete this alumnus account? This cannot be undone.")) return;
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["admin-profiles"] }); }
  };

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr className="text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3">Name</th><th className="px-5 py-3">Email</th><th className="px-5 py-3">Matric</th><th className="px-5 py-3">Stream</th>
              <th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((p: any) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-5 py-3 font-medium text-navy">{p.full_name}</td>
                <td className="px-5 py-3 text-muted-foreground">{p.email}</td>
                <td className="px-5 py-3">{p.graduation_year ? `Matric ${p.graduation_year}` : "—"}</td>
                <td className="px-5 py-3 text-muted-foreground">{p.matric_stream ?? "—"}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "approved" ? "bg-green-100 text-green-800" : p.status === "suspended" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1.5">
                    {p.status !== "approved" && <Button size="sm" variant="outline" onClick={() => update(p.id, { status: "approved" })}><UserCheck className="h-4 w-4" /></Button>}
                    {p.status !== "suspended" && <Button size="sm" variant="outline" onClick={() => update(p.id, { status: "suspended" })}><UserX className="h-4 w-4" /></Button>}
                    <Button size="sm" variant="outline" onClick={() => del(p.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
            {data && data.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-muted-foreground">No alumni yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewsMgmt() {
  const qc = useQueryClient();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", excerpt: "", content: "" });
  const { data } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => (await supabase.from("news").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return toast.error("Title and content required");
    const { error } = await supabase.from("news").insert({ ...form, author_id: user!.id, published: true });
    if (error) toast.error(error.message);
    else { toast.success("Posted"); setForm({ title: "", excerpt: "", content: "" }); qc.invalidateQueries({ queryKey: ["admin-news"] }); }
  };
  const del = async (id: string) => {
    if (!confirm("Delete this news item?")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (!error) qc.invalidateQueries({ queryKey: ["admin-news"] });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <form onSubmit={submit} className="space-y-3 rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg text-navy">Post news</h3>
        <div className="space-y-1.5"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
        <div className="space-y-1.5"><Label>Excerpt</Label><Input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></div>
        <div className="space-y-1.5"><Label>Content</Label><Textarea rows={5} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
        <Button type="submit" className="w-full bg-navy text-navy-foreground">Publish</Button>
      </form>
      <ul className="space-y-3">
        {(data ?? []).map((n) => (
          <li key={n.id} className="flex items-start justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="font-medium text-navy">{n.title}</p>
              <p className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleString()}</p>
              {n.excerpt && <p className="mt-1 text-sm text-muted-foreground">{n.excerpt}</p>}
            </div>
            <Button size="sm" variant="outline" onClick={() => del(n.id)}><Trash2 className="h-4 w-4" /></Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventsMgmt() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ title: "", description: "", location: "", event_date: "" });
  const { data } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => (await supabase.from("events").select("*").order("event_date")).data ?? [],
  });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.event_date) return toast.error("Title and date required");
    const { error } = await supabase.from("events").insert(form);
    if (error) toast.error(error.message);
    else { toast.success("Event added"); setForm({ title: "", description: "", location: "", event_date: "" }); qc.invalidateQueries({ queryKey: ["admin-events"] }); }
  };
  const del = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-events"] });
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <form onSubmit={submit} className="space-y-3 rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg text-navy">Add event</h3>
        <div className="space-y-1.5"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
        <div className="space-y-1.5"><Label>Date & time</Label><Input type="datetime-local" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} /></div>
        <div className="space-y-1.5"><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
        <div className="space-y-1.5"><Label>Description</Label><Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <Button type="submit" className="w-full bg-navy text-navy-foreground">Add event</Button>
      </form>
      <ul className="space-y-3">
        {(data ?? []).map((e) => (
          <li key={e.id} className="flex items-start justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="font-medium text-navy">{e.title}</p>
              <p className="text-xs text-muted-foreground">{new Date(e.event_date).toLocaleString()} {e.location && `· ${e.location}`}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => del(e.id)}><Trash2 className="h-4 w-4" /></Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnnouncementsMgmt() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ title: "", body: "", category: "general" });
  const { data } = useQuery({
    queryKey: ["admin-ann"],
    queryFn: async () => (await supabase.from("announcements").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.body) return toast.error("Title and body required");
    const { error } = await supabase.from("announcements").insert(form);
    if (error) toast.error(error.message);
    else { toast.success("Posted"); setForm({ title: "", body: "", category: "general" }); qc.invalidateQueries({ queryKey: ["admin-ann"] }); }
  };
  const del = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("announcements").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-ann"] });
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <form onSubmit={submit} className="space-y-3 rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg text-navy">Post announcement</h3>
        <div className="space-y-1.5"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
        <div className="space-y-1.5">
          <Label>Category</Label>
          <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="general">General</option><option value="job">Job</option><option value="mentorship">Mentorship</option>
          </select>
        </div>
        <div className="space-y-1.5"><Label>Body</Label><Textarea rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></div>
        <Button type="submit" className="w-full bg-navy text-navy-foreground">Post</Button>
      </form>
      <ul className="space-y-3">
        {(data ?? []).map((a) => (
          <li key={a.id} className="flex items-start justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider"><span className="rounded bg-gold/15 px-1.5 py-0.5 text-gold">{a.category}</span><span className="text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</span></div>
              <p className="mt-1 font-medium text-navy">{a.title}</p>
              <p className="text-sm text-muted-foreground">{a.body}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => del(a.id)}><Trash2 className="h-4 w-4" /></Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
