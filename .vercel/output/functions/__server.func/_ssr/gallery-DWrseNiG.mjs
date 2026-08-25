import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { H as Header, F as Footer } from "./Footer-4FIXv-wL.mjs";
import { s as supabase } from "./client-G-mu7uFn.mjs";
import { u as useAuth } from "./router-X5SYAAJg.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lovable.dev__mcp-js.mjs";
import "../_libs/modelcontextprotocol__sdk.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/ajv-formats.mjs";
import { q as LoaderCircle, C as Calendar, l as Trash2, X, I as ImagePlus } from "../_libs/lucide-react.mjs";
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
function GalleryPage() {
  const {
    isAdmin
  } = useAuth();
  const qc = useQueryClient();
  const [lightbox, setLightbox] = reactExports.useState(null);
  const {
    data: photos,
    isLoading
  } = useQuery({
    queryKey: ["gallery-photos"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("gallery_photos").select("id, storage_path, title, caption, taken_on, created_at").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      const rows = data ?? [];
      if (rows.length === 0) return rows;
      const {
        data: signed
      } = await supabase.storage.from("gallery").createSignedUrls(rows.map((r) => r.storage_path), 60 * 60);
      const map = new Map((signed ?? []).map((s) => [s.path, s.signedUrl]));
      return rows.map((r) => ({
        ...r,
        url: map.get(r.storage_path) ?? void 0
      }));
    }
  });
  const remove = useMutation({
    mutationFn: async (photo) => {
      await supabase.storage.from("gallery").remove([photo.storage_path]);
      const {
        error
      } = await supabase.from("gallery_photos").delete().eq("id", photo.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["gallery-photos"]
    })
  });
  reactExports.useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-navy py-24 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/60", children: "Gallery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-5xl font-semibold tracking-tight lg:text-6xl", children: "Events & memories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-white/65", children: "Group photos, reunions, and campus moments from across the years." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-16 lg:px-8", children: [
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(UploadPanel, { onDone: () => qc.invalidateQueries({
          queryKey: ["gallery-photos"]
        }) }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Loading photos…"
        ] }),
        !isLoading && (photos ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground", children: "No photos yet. Event and reunion pictures will appear here." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4", children: (photos ?? []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "group relative overflow-hidden rounded-xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLightbox(p), className: "block w-full", "aria-label": p.title ?? "Open photo", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.url, alt: p.title ?? p.caption ?? "Alumni event photo", loading: "lazy", className: "aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" }) }),
          (p.title || p.taken_on) && /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "space-y-1 p-3", children: [
            p.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-navy", children: p.title }),
            p.taken_on && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 text-gold" }),
              new Date(p.taken_on).toLocaleDateString("en", {
                dateStyle: "medium"
              })
            ] })
          ] }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            if (confirm("Delete this photo?")) remove.mutate(p);
          }, className: "absolute right-2 top-2 rounded-md bg-background/90 p-1.5 text-destructive opacity-0 shadow-card transition-opacity group-hover:opacity-100", "aria-label": "Delete photo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }, p.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    lightbox && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4", onClick: () => setLightbox(null), role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute right-4 top-4 rounded-md p-2 text-white/80 hover:text-white", onClick: () => setLightbox(null), "aria-label": "Close", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "max-h-full max-w-5xl", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lightbox.url, alt: lightbox.title ?? "Alumni event photo", className: "max-h-[80vh] w-auto rounded-lg object-contain" }),
        (lightbox.title || lightbox.caption || lightbox.taken_on) && /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-3 text-center text-sm text-white/80", children: [
          lightbox.title && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: lightbox.title }),
          lightbox.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: lightbox.caption }),
          lightbox.taken_on && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-mono text-[10px] uppercase tracking-wider text-white/60", children: new Date(lightbox.taken_on).toLocaleDateString("en", {
            dateStyle: "long"
          }) })
        ] })
      ] })
    ] })
  ] });
}
function UploadPanel({
  onDone
}) {
  const [file, setFile] = reactExports.useState(null);
  const [title, setTitle] = reactExports.useState("");
  const [caption, setCaption] = reactExports.useState("");
  const [takenOn, setTakenOn] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const upload = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const {
        error: upErr
      } = await supabase.storage.from("gallery").upload(path, file, {
        contentType: file.type
      });
      if (upErr) throw upErr;
      const {
        error: insErr
      } = await supabase.from("gallery_photos").insert({
        storage_path: path,
        title: title || null,
        caption: caption || null,
        taken_on: takenOn || null
      });
      if (insErr) throw insErr;
      setFile(null);
      setTitle("");
      setCaption("");
      setTakenOn("");
      onDone();
    } catch (e) {
      setError(e?.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 rounded-xl border border-border bg-card p-5 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 font-display text-lg font-semibold text-navy", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4 text-gold" }),
      " Upload photo"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: (e) => setFile(e.target.files?.[0] ?? null), className: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-transparent file:text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Title (optional)", value: title, onChange: (e) => setTitle(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Caption (optional)", value: caption, onChange: (e) => setCaption(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: takenOn, onChange: (e) => setTakenOn(e.target.value) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-destructive", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: !file || busy, onClick: upload, className: "mt-4 inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-sm font-medium text-navy-foreground disabled:opacity-50", children: [
      busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4" }),
      " Upload photo"
    ] })
  ] });
}
export {
  GalleryPage as component
};
