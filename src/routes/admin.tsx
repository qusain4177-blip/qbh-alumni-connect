import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Download, Megaphone, Newspaper, Pencil, Plus, Search, Trash2, Users, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Console — QBH UMBRELLA Alumni" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) { navigate({ to: "/admin/login" }); return; }
    if (!isAdmin) { toast.error("Admin access required"); navigate({ to: "/" }); }
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
  const [q, setQ] = useState("");
  const [statusF, setStatusF] = useState("");
  const [streamF, setStreamF] = useState("");
  const [yearF, setYearF] = useState("");
  const [sortKey, setSortKey] = useState<"created_at" | "full_name" | "graduation_year">("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [editing, setEditing] = useState<any | null>(null);

  const { data } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => (await supabase.from("profiles").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  const rows = useMemo(() => {
    const pq = q.toLowerCase();
    let list = (data ?? []).filter((p: any) => {
      const matchQ = !q || [p.full_name, p.email, p.profession, p.company, p.city].some((v) => v?.toLowerCase().includes(pq));
      const matchS = !statusF || p.status === statusF;
      const matchSt = !streamF || p.matric_stream === streamF;
      const matchY = !yearF || String(p.graduation_year ?? "") === yearF;
      return matchQ && matchS && matchSt && matchY;
    });
    list.sort((a: any, b: any) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [data, q, statusF, streamF, yearF, sortKey, sortDir]);

  const del = async (id: string) => {
    if (!confirm("Delete this alumni record? This cannot be undone.")) return;
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["admin-profiles"] }); qc.invalidateQueries({ queryKey: ["admin-stats"] }); }
  };

  const exportCsv = () => {
    const cols = ["alumni_id", "full_name", "email", "phone", "graduation_year", "matric_stream", "roll_number", "higher_education", "profession", "company", "city", "country", "linkedin_url", "website_url", "status", "created_at"];
    const esc = (v: any) => {
      if (v == null) return "";
      const s = String(v).replace(/"/g, '""');
      return /[",\n]/.test(s) ? `"${s}"` : s;
    };
    const csv = [cols.join(","), ...rows.map((r: any) => cols.map((c) => esc(r[c])).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alumni-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSort = (k: typeof sortKey) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("asc"); }
  };

  const years = Array.from(new Set((data ?? []).map((p: any) => p.graduation_year).filter(Boolean))).sort((a: any, b: any) => b - a);

  const blank = { alumni_id: "", full_name: "", email: "", graduation_year: "", matric_stream: "", roll_number: "", profession: "", company: "", higher_education: "", city: "", country: "", phone: "", linkedin_url: "", website_url: "", avatar_url: "", bio: "", status: "approved" };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-2 lg:grid-cols-[1.5fr_140px_180px_160px_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search name, email, company..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={yearF} onChange={(e) => setYearF(e.target.value)}>
          <option value="">All years</option>
          {years.map((y: any) => <option key={y} value={y}>Matric {y}</option>)}
        </select>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={streamF} onChange={(e) => setStreamF(e.target.value)}>
          <option value="">All streams</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Biology">Biology</option>
          <option value="Arts/Commerce">Arts/Commerce</option>
        </select>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={statusF} onChange={(e) => setStatusF(e.target.value)}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="suspended">Suspended</option>
        </select>
        <Button variant="outline" onClick={exportCsv} className="gap-2"><Download className="h-4 w-4" />Export CSV</Button>
        <Button onClick={() => setEditing({ ...blank, __new: true })} className="gap-2 bg-navy text-navy-foreground"><Plus className="h-4 w-4" />Add alumni</Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                <th className="cursor-pointer px-5 py-3" onClick={() => toggleSort("full_name")}>Name {sortKey === "full_name" && (sortDir === "asc" ? "↑" : "↓")}</th>
                <th className="px-5 py-3">Email</th>
                <th className="cursor-pointer px-5 py-3" onClick={() => toggleSort("graduation_year")}>Matric {sortKey === "graduation_year" && (sortDir === "asc" ? "↑" : "↓")}</th>
                <th className="px-5 py-3">Stream</th>
                <th className="px-5 py-3">Profession</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p: any) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-5 py-3 font-medium text-navy">{p.full_name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.email ?? "—"}</td>
                  <td className="px-5 py-3">{p.graduation_year ? `Matric ${p.graduation_year}` : "—"}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.matric_stream ?? "—"}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.profession ?? "—"}{p.company ? ` · ${p.company}` : ""}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "approved" ? "bg-green-100 text-green-800" : p.status === "suspended" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1.5">
                      <Button size="sm" variant="outline" onClick={() => setEditing({ ...p })}><Pencil className="h-4 w-4" /></Button>
                      <Button size="sm" variant="outline" onClick={() => del(p.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">No alumni match those filters.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <AlumniEditor open={!!editing} initial={editing} onClose={() => setEditing(null)} onSaved={() => { qc.invalidateQueries({ queryKey: ["admin-profiles"] }); qc.invalidateQueries({ queryKey: ["admin-stats"] }); }} />
    </div>
  );
}

function AlumniEditor({ open, initial, onClose, onSaved }: { open: boolean; initial: any; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<any>(initial ?? {});
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (initial) setForm(initial); }, [initial]);
  if (!initial) return null;

  const isNew = !!form.__new;
  const f = (k: string) => ({ value: form[k] ?? "", onChange: (e: any) => setForm({ ...form, [k]: e.target.value }) });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name?.trim()) return toast.error("Name is required");
    const linkedin = (form.linkedin_url ?? "").trim();
    if (linkedin && !/^https:\/\/(www\.)?linkedin\.com\/.+/i.test(linkedin)) {
      return toast.error("LinkedIn URL must start with https://linkedin.com/");
    }
    const payload: any = {
      full_name: form.full_name.trim(),
      email: form.email?.trim() || null,
      avatar_url: form.avatar_url || null,
      graduation_year: form.graduation_year ? Number(form.graduation_year) : null,
      matric_stream: form.matric_stream || null,
      roll_number: form.roll_number || null,
      ...(form.alumni_id?.trim() ? { alumni_id: form.alumni_id.trim() } : {}),
      profession: form.profession || null,
      company: form.company || null,
      higher_education: form.higher_education || null,
      city: form.city || null,
      country: form.country || null,
      phone: form.phone || null,
      linkedin_url: form.linkedin_url || null,
      website_url: form.website_url || null,
      bio: form.bio || null,
      status: form.status || "approved",
    };
    setSaving(true);
    const { error } = isNew
      ? await supabase.from("profiles").insert(payload)
      : await supabase.from("profiles").update(payload).eq("id", form.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(isNew ? "Alumni added" : "Saved");
    onSaved();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "Add alumni" : `Edit — ${initial.full_name}`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
          <FieldA label="Full name *"><Input {...f("full_name")} required /></FieldA>
          <FieldA label="Email"><Input type="email" {...f("email")} /></FieldA>
          <FieldA label="Matric passing year"><Input type="number" min={1950} max={new Date().getFullYear()} {...f("graduation_year")} /></FieldA>
          <FieldA label="Matric stream">
            <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.matric_stream ?? ""} onChange={(e) => setForm({ ...form, matric_stream: e.target.value })}>
              <option value="">—</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Biology">Biology</option>
              <option value="Arts/Commerce">Arts/Commerce</option>
            </select>
          </FieldA>
          <FieldA label="Roll number"><Input {...f("roll_number")} /></FieldA>
          <FieldA label="Alumni ID (admin only)"><Input placeholder="Auto: UMBRELLA-001" {...f("alumni_id")} /></FieldA>
          <FieldA label="Higher education"><Input {...f("higher_education")} /></FieldA>
          <FieldA label="Profession"><Input {...f("profession")} /></FieldA>
          <FieldA label="Company"><Input {...f("company")} /></FieldA>
          <FieldA label="City"><Input {...f("city")} /></FieldA>
          <FieldA label="Country"><Input {...f("country")} /></FieldA>
          <FieldA label="Phone"><Input {...f("phone")} /></FieldA>
          <FieldA label="LinkedIn URL"><Input type="url" placeholder="https://www.linkedin.com/in/..." {...f("linkedin_url")} /></FieldA>
          <FieldA label="Website"><Input {...f("website_url")} /></FieldA>
          <FieldA label="Photo URL"><Input placeholder="https://..." {...f("avatar_url")} /></FieldA>
          <FieldA label="Status">
            <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.status ?? "approved"} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="approved">Approved (public)</option>
              <option value="pending">Pending (hidden)</option>
              <option value="suspended">Suspended (hidden)</option>
            </select>
          </FieldA>
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Bio</Label>
            <Textarea rows={3} {...f("bio")} />
          </div>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-navy text-navy-foreground">{saving ? "Saving…" : isNew ? "Add alumni" : "Save changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FieldA({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
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
