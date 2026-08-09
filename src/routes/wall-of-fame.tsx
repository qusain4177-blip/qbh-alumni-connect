import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  Award,
  GraduationCap,
  Briefcase,
  Loader2,
  Plus,
  Quote,
  Trash2,
  Trophy,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/wall-of-fame")({
  head: () => ({
    meta: [
      { title: "Alumni Wall of Fame — QBH Success Stories" },
      {
        name: "description",
        content:
          "Celebrating higher education milestones, PhDs, Master's degrees and career successes of Qamar E Bani Hashim alumni.",
      },
      { property: "og:title", content: "Alumni Wall of Fame — QBH Success Stories" },
      {
        property: "og:description",
        content:
          "Celebrating higher education milestones, PhDs, Master's degrees and career successes of Qamar E Bani Hashim alumni.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WallOfFamePage,
});

type Story = {
  id: string;
  alumni_name: string;
  batch_year: number | null;
  degree: string | null;
  institute: string | null;
  category: string;
  badge: string | null;
  poster_path: string | null;
  poster_url: string | null;
  snippet: string | null;
  story: string | null;
  gallery_paths: string[];
  congrats_notes: string[];
  created_at: string;
  posterSrc?: string;
  gallerySrc?: string[];
};

const CATEGORIES = [
  { key: "all", label: "All", icon: Trophy },
  { key: "phd", label: "PhDs & Research", icon: Award },
  { key: "masters", label: "Master's Graduates", icon: GraduationCap },
  { key: "career", label: "Career & Entrepreneurship", icon: Briefcase },
] as const;

const DEFAULT_BADGE: Record<string, string> = {
  phd: "Ph.D. Achieved",
  masters: "Master's Graduate",
  career: "Career Milestone",
};

function categoryLabel(key: string) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? "Milestone";
}

async function signPaths(paths: string[]) {
  if (paths.length === 0) return new Map<string, string>();
  const { data } = await supabase.storage.from("gallery").createSignedUrls(paths, 60 * 60);
  return new Map((data ?? []).map((s) => [s.path, s.signedUrl]));
}

function WallOfFamePage() {
  const { isAdmin } = useAuth();
  const qc = useQueryClient();
  const [tab, setTab] = useState<string>("all");
  const [active, setActive] = useState<Story | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const { data: stories, isLoading } = useQuery({
    queryKey: ["success-stories"],
    queryFn: async (): Promise<Story[]> => {
      const { data, error } = await supabase
        .from("success_stories")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      const rows = (data ?? []) as unknown as Story[];
      const paths = rows.flatMap((r) => [r.poster_path, ...(r.gallery_paths ?? [])].filter(Boolean) as string[]);
      const map = await signPaths(paths);
      return rows.map((r) => ({
        ...r,
        posterSrc: r.poster_path ? map.get(r.poster_path) : r.poster_url ?? undefined,
        gallerySrc: (r.gallery_paths ?? []).map((p) => map.get(p)).filter(Boolean) as string[],
      }));
    },
  });

  const remove = useMutation({
    mutationFn: async (story: Story) => {
      const paths = [story.poster_path, ...(story.gallery_paths ?? [])].filter(Boolean) as string[];
      if (paths.length) await supabase.storage.from("gallery").remove(paths);
      const { error } = await supabase.from("success_stories").delete().eq("id", story.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["success-stories"] }),
  });

  const filtered = useMemo(
    () => (stories ?? []).filter((s) => tab === "all" || s.category === tab),
    [stories, tab],
  );

  useEffect(() => {
    if (!active && !formOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setActive(null);
      setFormOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, formOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-navy py-24 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-white/5 blur-3xl"
          />
          <div className="container relative mx-auto px-4 lg:px-8">
            <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-gold">
              <Trophy className="h-3.5 w-3.5" /> Wall of Fame
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight lg:text-6xl">
              Alumni Wall of Fame
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              Celebrating higher education milestones, PhDs, Master's &amp; career successes.
            </p>
            {isAdmin && (
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-navy transition-transform hover:-translate-y-0.5"
              >
                <Plus className="h-4 w-4" /> Submit Success Story
              </button>
            )}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const on = tab === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setTab(c.key)}
                  className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                    on
                      ? "border-navy bg-navy text-navy-foreground"
                      : "border-border bg-card text-foreground/70 hover:text-navy"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {c.label}
                </button>
              );
            })}
          </div>

          {isLoading && (
            <p className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading stories…
            </p>
          )}

          {!isLoading && filtered.length === 0 && (
            <p className="mt-10 rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No success stories in this category yet.
            </p>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <article
                key={s.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-4/5 w-full overflow-hidden bg-navy">
                  {s.posterSrc ? (
                    <img
                      src={s.posterSrc}
                      alt={`${s.alumni_name} success story poster`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/30">
                      <Trophy className="h-12 w-12" />
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-md bg-gold px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-navy">
                    {s.badge || DEFAULT_BADGE[s.category] || "Milestone"}
                  </span>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => confirm("Delete this story?") && remove.mutate(s)}
                      className="absolute right-3 top-3 rounded-md bg-background/90 p-1.5 text-destructive opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Delete story"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-display text-lg font-semibold text-navy">{s.alumni_name}</h2>
                  <p className="mt-1 text-sm text-foreground/70">
                    {[s.degree, s.institute].filter(Boolean).join(" · ") || categoryLabel(s.category)}
                  </p>
                  {s.batch_year && (
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Matric Batch {s.batch_year}
                    </p>
                  )}
                  {s.snippet && (
                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{s.snippet}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setActive(s)}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-md border border-navy px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-navy-foreground"
                  >
                    Read Full Story
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      {active && <StoryModal story={active} onClose={() => setActive(null)} />}
      {formOpen && (
        <StoryForm
          onClose={() => setFormOpen(false)}
          onDone={() => {
            setFormOpen(false);
            qc.invalidateQueries({ queryKey: ["success-stories"] });
          }}
        />
      )}
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-black/80 p-4 py-10"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-xl border border-border bg-background shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-2 text-muted-foreground hover:text-navy"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

function StoryModal({ story, onClose }: { story: Story; onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      {story.posterSrc && (
        <img
          src={story.posterSrc}
          alt={`${story.alumni_name} poster`}
          className="max-h-[55vh] w-full rounded-t-xl object-cover"
        />
      )}
      <div className="p-6 lg:p-8">
        <span className="inline-block rounded-md bg-navy px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-gold">
          {story.badge || DEFAULT_BADGE[story.category] || "Milestone"}
        </span>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-navy">
          {story.alumni_name}
        </h2>
        <p className="mt-1 text-sm text-foreground/70">
          {[story.degree, story.institute].filter(Boolean).join(" · ")}
          {story.batch_year ? ` · Matric Batch ${story.batch_year}` : ""}
        </p>

        {story.story ? (
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/85">
            {story.story.split("\n").filter(Boolean).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : (
          story.snippet && <p className="mt-6 text-[15px] leading-relaxed text-foreground/85">{story.snippet}</p>
        )}

        {(story.gallerySrc ?? []).length > 0 && (
          <div className="mt-8">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Photos</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {story.gallerySrc!.map((src, i) => (
                <img key={i} src={src} alt={`${story.alumni_name} photo ${i + 1}`} className="aspect-square w-full rounded-lg object-cover" />
              ))}
            </div>
          </div>
        )}

        {(story.congrats_notes ?? []).length > 0 && (
          <div className="mt-8">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Congratulatory notes
            </h3>
            <ul className="mt-3 space-y-3">
              {story.congrats_notes.map((n, i) => (
                <li key={i} className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm text-foreground/80">
                  <Quote className="h-4 w-4 shrink-0 text-gold" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
}

function StoryForm({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [degree, setDegree] = useState("");
  const [institute, setInstitute] = useState("");
  const [category, setCategory] = useState("masters");
  const [badge, setBadge] = useState("");
  const [snippet, setSnippet] = useState("");
  const [story, setStory] = useState("");
  const [notes, setNotes] = useState("");
  const [poster, setPoster] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `wall-of-fame/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, { contentType: file.type });
    if (upErr) throw upErr;
    return path;
  };

  const submit = async () => {
    if (!name.trim()) {
      setError("Alumni name is required.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const posterPath = poster ? await uploadFile(poster) : null;
      const galleryPaths: string[] = [];
      for (const f of photos) galleryPaths.push(await uploadFile(f));

      const { error: insErr } = await supabase.from("success_stories").insert({
        alumni_name: name.trim(),
        batch_year: batch ? Number(batch) : null,
        degree: degree || null,
        institute: institute || null,
        category,
        badge: badge || DEFAULT_BADGE[category],
        poster_path: posterPath,
        snippet: snippet || null,
        story: story || null,
        gallery_paths: galleryPaths,
        congrats_notes: notes
          .split("\n")
          .map((n) => n.trim())
          .filter(Boolean),
      });
      if (insErr) throw insErr;
      onDone();
    } catch (e: any) {
      setError(e?.message ?? "Could not save the story.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6 lg:p-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-navy">Submit success story</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a poster, pick the achievement type, and write the details.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input placeholder="Alumni name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            placeholder="Matric passing year"
            inputMode="numeric"
            value={batch}
            onChange={(e) => setBatch(e.target.value.replace(/\D/g, "").slice(0, 4))}
          />
          <Input placeholder="Degree (e.g. Ph.D. in Physics)" value={degree} onChange={(e) => setDegree(e.target.value)} />
          <Input placeholder="Institute / organisation" value={institute} onChange={(e) => setInstitute(e.target.value)} />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="phd">PhDs &amp; Research</option>
            <option value="masters">Master's Graduates</option>
            <option value="career">Career &amp; Entrepreneurship</option>
          </select>
          <Input
            placeholder={`Badge text (default: ${DEFAULT_BADGE[category]})`}
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
          />
        </div>

        <div className="mt-4 grid gap-4">
          <Textarea
            placeholder="Short snippet (2–3 lines shown on the card)"
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
            rows={2}
          />
          <Textarea
            placeholder="Full story (one paragraph per line)"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={6}
          />
          <Textarea
            placeholder="Congratulatory notes (one per line)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Poster image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPoster(e.target.files?.[0] ?? null)}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-transparent file:text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Gallery photos</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setPhotos(Array.from(e.target.files ?? []))}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-transparent file:text-sm"
            />
          </label>
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Publish story
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-navy"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
