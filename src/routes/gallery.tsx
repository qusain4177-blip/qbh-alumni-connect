import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Calendar, ImagePlus, Loader2, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Events & Memories — QBH Alumni Gallery" },
      { name: "description", content: "Photos from reunions, alumni meets, and campus events at Qamar E Bani Hashim." },
      { property: "og:title", content: "Events & Memories — QBH Alumni Gallery" },
      { property: "og:description", content: "Photos from reunions, alumni meets, and campus events at Qamar E Bani Hashim." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

type Photo = {
  id: string;
  storage_path: string;
  title: string | null;
  caption: string | null;
  taken_on: string | null;
  created_at: string;
  url?: string;
};

function GalleryPage() {
  const { isAdmin } = useAuth();
  const qc = useQueryClient();
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const { data: photos, isLoading } = useQuery({
    queryKey: ["gallery-photos"],
    queryFn: async (): Promise<Photo[]> => {
      const { data, error } = await supabase
        .from("gallery_photos")
        .select("id, storage_path, title, caption, taken_on, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      const rows = (data ?? []) as Photo[];
      if (rows.length === 0) return rows;
      const { data: signed } = await supabase.storage
        .from("gallery")
        .createSignedUrls(rows.map((r) => r.storage_path), 60 * 60);
      const map = new Map((signed ?? []).map((s) => [s.path, s.signedUrl]));
      return rows.map((r) => ({ ...r, url: map.get(r.storage_path) ?? undefined }));
    },
  });

  const remove = useMutation({
    mutationFn: async (photo: Photo) => {
      await supabase.storage.from("gallery").remove([photo.storage_path]);
      const { error } = await supabase.from("gallery_photos").delete().eq("id", photo.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery-photos"] }),
  });

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-navy py-24 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">Gallery</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight lg:text-6xl">Events & memories</h1>
            <p className="mt-4 max-w-2xl text-white/65">
              Group photos, reunions, and campus moments from across the years.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 lg:px-8">
          {isAdmin && <UploadPanel onDone={() => qc.invalidateQueries({ queryKey: ["gallery-photos"] })} />}

          {isLoading && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading photos…
            </p>
          )}

          {!isLoading && (photos ?? []).length === 0 && (
            <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No photos yet. Event and reunion pictures will appear here.
            </p>
          )}

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {(photos ?? []).map((p) => (
              <figure key={p.id} className="group relative overflow-hidden rounded-xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setLightbox(p)}
                  className="block w-full"
                  aria-label={p.title ?? "Open photo"}
                >
                  <img
                    src={p.url}
                    alt={p.title ?? p.caption ?? "Alumni event photo"}
                    loading="lazy"
                    className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </button>
                {(p.title || p.taken_on) && (
                  <figcaption className="space-y-1 p-3">
                    {p.title && <p className="text-sm font-medium text-navy">{p.title}</p>}
                    {p.taken_on && (
                      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        <Calendar className="h-3 w-3 text-gold" />
                        {new Date(p.taken_on).toLocaleDateString("en", { dateStyle: "medium" })}
                      </p>
                    )}
                  </figcaption>
                )}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Delete this photo?")) remove.mutate(p);
                    }}
                    className="absolute right-2 top-2 rounded-md bg-background/90 p-1.5 text-destructive opacity-0 shadow-card transition-opacity group-hover:opacity-100"
                    aria-label="Delete photo"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </figure>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      {lightbox && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute right-4 top-4 rounded-md p-2 text-white/80 hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.title ?? "Alumni event photo"} className="max-h-[80vh] w-auto rounded-lg object-contain" />
            {(lightbox.title || lightbox.caption || lightbox.taken_on) && (
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {lightbox.title && <span className="font-medium text-white">{lightbox.title}</span>}
                {lightbox.caption && <span className="block">{lightbox.caption}</span>}
                {lightbox.taken_on && (
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-white/60">
                    {new Date(lightbox.taken_on).toLocaleDateString("en", { dateStyle: "long" })}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  );
}

function UploadPanel({ onDone }: { onDone: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [takenOn, setTakenOn] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, { contentType: file.type });
      if (upErr) throw upErr;
      const { error: insErr } = await supabase.from("gallery_photos").insert({
        storage_path: path,
        title: title || null,
        caption: caption || null,
        taken_on: takenOn || null,
      });
      if (insErr) throw insErr;
      setFile(null);
      setTitle("");
      setCaption("");
      setTakenOn("");
      onDone();
    } catch (e: any) {
      setError(e?.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mb-10 rounded-xl border border-border bg-card p-5 shadow-card">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-navy">
        <ImagePlus className="h-4 w-4 text-gold" /> Upload photo
      </h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-transparent file:text-sm"
        />
        <Input placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} />
        <Input type="date" value={takenOn} onChange={(e) => setTakenOn(e.target.value)} />
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      <button
        type="button"
        disabled={!file || busy}
        onClick={upload}
        className="mt-4 inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-sm font-medium text-navy-foreground disabled:opacity-50"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />} Upload photo
      </button>
    </div>
  );
}
