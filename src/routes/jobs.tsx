import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Briefcase, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Jobs Board — Qamar E Bani Hashim School Alumni" },
      { name: "description", content: "Job opportunities shared by and for Qamar E Bani Hashim School Alumni Matric alumni." },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  const [q, setQ] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("category", "job")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = useMemo(() => {
    if (!q) return data ?? [];
    const pq = q.toLowerCase();
    return (data ?? []).filter((j: any) =>
      [j.title, j.body].some((v) => v?.toLowerCase().includes(pq))
    );
  }, [data, q]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-14 lg:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Opportunities</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-navy lg:text-5xl">
          Jobs Board
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Roles, internships, and referrals posted by the alumni network. Reach out via the contact in each post.
        </p>

        <div className="mt-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              className="pl-9"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {isLoading && Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl border border-border bg-card" />
          ))}
          {filtered.map((j: any) => (
            <article
              key={j.id}
              className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/20"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span>Job · {new Date(j.created_at).toLocaleDateString()}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold text-navy">{j.title}</h3>
              <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{j.body}</p>
            </article>
          ))}
        </div>

        {!isLoading && filtered.length === 0 && (
          <div className="mt-12 rounded-xl border border-dashed border-border p-12 text-center">
            <h3 className="font-display text-xl text-navy">No openings posted yet.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Have a role to share? <Link to="/contact" className="text-navy underline">Send it to the alumni office</Link>.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
