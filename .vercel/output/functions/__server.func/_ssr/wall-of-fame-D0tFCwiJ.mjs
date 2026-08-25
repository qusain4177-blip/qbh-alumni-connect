import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { H as Header, F as Footer } from "./Footer-4FIXv-wL.mjs";
import { s as supabase } from "./client-G-mu7uFn.mjs";
import { u as useAuth } from "./router-X5SYAAJg.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { r as Trophy, P as Plus, A as Award, o as GraduationCap, B as Briefcase, q as LoaderCircle, l as Trash2, Q as Quote, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "../_libs/jose.mjs";
import "../_libs/ajv.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/json-schema-traverse.mjs";
import "../_libs/fast-uri.mjs";
const CATEGORIES = [{
  key: "all",
  label: "All",
  icon: Trophy
}, {
  key: "phd",
  label: "PhDs & Research",
  icon: Award
}, {
  key: "masters",
  label: "Master's Graduates",
  icon: GraduationCap
}, {
  key: "career",
  label: "Career & Entrepreneurship",
  icon: Briefcase
}];
const DEFAULT_BADGE = {
  phd: "Ph.D. Achieved",
  masters: "Master's Graduate",
  career: "Career Milestone"
};
function categoryLabel(key) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? "Milestone";
}
async function signPaths(paths) {
  if (paths.length === 0) return /* @__PURE__ */ new Map();
  const {
    data
  } = await supabase.storage.from("gallery").createSignedUrls(paths, 60 * 60);
  return new Map((data ?? []).map((s) => [s.path, s.signedUrl]));
}
function WallOfFamePage() {
  const {
    isAdmin
  } = useAuth();
  const qc = useQueryClient();
  const [tab, setTab] = reactExports.useState("all");
  const [active, setActive] = reactExports.useState(null);
  const [formOpen, setFormOpen] = reactExports.useState(false);
  const {
    data: stories,
    isLoading
  } = useQuery({
    queryKey: ["success-stories"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("success_stories").select("*").order("sort_order", {
        ascending: true
      }).order("created_at", {
        ascending: false
      });
      if (error) throw error;
      const rows = data ?? [];
      const paths = rows.flatMap((r) => [r.poster_path, ...r.gallery_paths ?? []].filter(Boolean));
      const map = await signPaths(paths);
      return rows.map((r) => ({
        ...r,
        posterSrc: (r.poster_path ? map.get(r.poster_path) : r.poster_url) ?? void 0,
        gallerySrc: (r.gallery_paths ?? []).map((p) => map.get(p)).filter(Boolean)
      }));
    }
  });
  const remove = useMutation({
    mutationFn: async (story) => {
      const paths = [story.poster_path, ...story.gallery_paths ?? []].filter(Boolean);
      if (paths.length) await supabase.storage.from("gallery").remove(paths);
      const {
        error
      } = await supabase.from("success_stories").delete().eq("id", story.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["success-stories"]
    })
  });
  const filtered = reactExports.useMemo(() => (stories ?? []).filter((s) => tab === "all" || s.category === tab), [stories, tab]);
  reactExports.useEffect(() => {
    if (!active && !formOpen) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setActive(null);
      setFormOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, formOpen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-navy py-24 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/15 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-white/5 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container relative mx-auto px-4 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5" }),
            " Wall of Fame"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-5xl font-semibold tracking-tight lg:text-6xl", children: "Alumni Wall of Fame" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-lg text-white/70", children: "Celebrating higher education milestones, PhDs, Master's & career successes." }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setFormOpen(true), className: "mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-navy transition-transform hover:-translate-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Submit Success Story"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-16 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CATEGORIES.map((c) => {
          const Icon = c.icon;
          const on = tab === c.key;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setTab(c.key), className: `inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${on ? "border-navy bg-navy text-navy-foreground" : "border-border bg-card text-foreground/70 hover:text-navy"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
            c.label
          ] }, c.key);
        }) }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-10 flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Loading stories…"
        ] }),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground", children: "No success stories in this category yet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-4/5 w-full overflow-hidden bg-navy", children: [
            s.posterSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.posterSrc, alt: `${s.alumni_name} success story poster`, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-white/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-12 w-12" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-3 rounded-md bg-gold px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-navy", children: s.badge || DEFAULT_BADGE[s.category] || "Milestone" }),
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => confirm("Delete this story?") && remove.mutate(s), className: "absolute right-3 top-3 rounded-md bg-background/90 p-1.5 text-destructive opacity-0 transition-opacity group-hover:opacity-100", "aria-label": "Delete story", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-navy", children: s.alumni_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground/70", children: [s.degree, s.institute].filter(Boolean).join(" · ") || categoryLabel(s.category) }),
            s.batch_year && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: [
              "Matric Batch ",
              s.batch_year
            ] }),
            s.snippet && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 line-clamp-3 text-sm text-muted-foreground", children: s.snippet }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActive(s), className: "mt-5 inline-flex w-full items-center justify-center rounded-md border border-navy px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-navy-foreground", children: "Read Full Story" })
          ] })
        ] }, s.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    active && /* @__PURE__ */ jsxRuntimeExports.jsx(StoryModal, { story: active, onClose: () => setActive(null) }),
    formOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(StoryForm, { onClose: () => setFormOpen(false), onDone: () => {
      setFormOpen(false);
      qc.invalidateQueries({
        queryKey: ["success-stories"]
      });
    } })
  ] });
}
function Modal({
  children,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-black/80 p-4 py-10", role: "dialog", "aria-modal": "true", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-3xl rounded-xl border border-border bg-background shadow-xl", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "absolute right-3 top-3 rounded-md p-2 text-muted-foreground hover:text-navy", "aria-label": "Close", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }),
    children
  ] }) });
}
function StoryModal({
  story,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { onClose, children: [
    story.posterSrc && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: story.posterSrc, alt: `${story.alumni_name} poster`, className: "max-h-[55vh] w-full rounded-t-xl object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 lg:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-md bg-navy px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-gold", children: story.badge || DEFAULT_BADGE[story.category] || "Milestone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-3xl font-semibold tracking-tight text-navy", children: story.alumni_name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-foreground/70", children: [
        [story.degree, story.institute].filter(Boolean).join(" · "),
        story.batch_year ? ` · Matric Batch ${story.batch_year}` : ""
      ] }),
      story.story ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/85", children: story.story.split("\n").filter(Boolean).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: p }, i)) }) : story.snippet && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-[15px] leading-relaxed text-foreground/85", children: story.snippet }),
      (story.gallerySrc ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground", children: "Photos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-3 gap-3", children: story.gallerySrc.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: `${story.alumni_name} photo ${i + 1}`, className: "aspect-square w-full rounded-lg object-cover" }, i)) })
      ] }),
      (story.congrats_notes ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground", children: "Congratulatory notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-3", children: story.congrats_notes.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 rounded-lg border border-border bg-card p-4 text-sm text-foreground/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-4 w-4 shrink-0 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: n })
        ] }, i)) })
      ] })
    ] })
  ] });
}
function StoryForm({
  onClose,
  onDone
}) {
  const [name, setName] = reactExports.useState("");
  const [batch, setBatch] = reactExports.useState("");
  const [degree, setDegree] = reactExports.useState("");
  const [institute, setInstitute] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("masters");
  const [badge, setBadge] = reactExports.useState("");
  const [snippet, setSnippet] = reactExports.useState("");
  const [story, setStory] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [poster, setPoster] = reactExports.useState(null);
  const [photos, setPhotos] = reactExports.useState([]);
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const uploadFile = async (file) => {
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `wall-of-fame/${crypto.randomUUID()}.${ext}`;
    const {
      error: upErr
    } = await supabase.storage.from("gallery").upload(path, file, {
      contentType: file.type
    });
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
      const galleryPaths = [];
      for (const f of photos) galleryPaths.push(await uploadFile(f));
      const {
        error: insErr
      } = await supabase.from("success_stories").insert({
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
        congrats_notes: notes.split("\n").map((n) => n.trim()).filter(Boolean)
      });
      if (insErr) throw insErr;
      onDone();
    } catch (e) {
      setError(e?.message ?? "Could not save the story.");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 lg:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold tracking-tight text-navy", children: "Submit success story" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Upload a poster, pick the achievement type, and write the details." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Alumni name", value: name, onChange: (e) => setName(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Matric passing year", inputMode: "numeric", value: batch, onChange: (e) => setBatch(e.target.value.replace(/\D/g, "").slice(0, 4)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Degree (e.g. Ph.D. in Physics)", value: degree, onChange: (e) => setDegree(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Institute / organisation", value: institute, onChange: (e) => setInstitute(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "phd", children: "PhDs & Research" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "masters", children: "Master's Graduates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "career", children: "Career & Entrepreneurship" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: `Badge text (default: ${DEFAULT_BADGE[category]})`, value: badge, onChange: (e) => setBadge(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Short snippet (2–3 lines shown on the card)", value: snippet, onChange: (e) => setSnippet(e.target.value), rows: 2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Full story (one paragraph per line)", value: story, onChange: (e) => setStory(e.target.value), rows: 6 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Congratulatory notes (one per line)", value: notes, onChange: (e) => setNotes(e.target.value), rows: 3 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: "Poster image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => setPoster(e.target.files?.[0] ?? null), className: "mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-transparent file:text-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: "Gallery photos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", multiple: true, onChange: (e) => setPhotos(Array.from(e.target.files ?? [])), className: "mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-transparent file:text-sm" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-destructive", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: submit, disabled: busy, className: "inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-navy-foreground disabled:opacity-60", children: [
        busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Publish story"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-navy", children: "Cancel" })
    ] })
  ] }) });
}
export {
  WallOfFamePage as component
};
