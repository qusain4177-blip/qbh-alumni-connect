import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
function normalizeLinkedInUrl(raw) {
  const url = raw.trim();
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (/^linkedin:\/\//i.test(url)) return `https://www.linkedin.com/${url.replace(/^linkedin:\/\//i, "")}`;
  return `https://www.linkedin.com/${url.replace(/^\/+/, "")}`;
}
function linkedInAppUrl(raw) {
  const web = normalizeLinkedInUrl(raw);
  try {
    const u = new URL(web);
    if (!/(^|\.)linkedin\.com$/i.test(u.hostname)) return null;
    const path = u.pathname.replace(/^\/+|\/+$/g, "");
    if (!path) return null;
    return `linkedin://${path}`;
  } catch {
    return null;
  }
}
function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /android|iphone|ipad|ipod/i.test(navigator.userAgent);
}
function LinkedInLink({ url, className, children, ...rest }) {
  const webUrl = normalizeLinkedInUrl(url);
  const onClick = (e) => {
    if (!isMobile()) return;
    const app = linkedInAppUrl(webUrl);
    if (!app) return;
    e.preventDefault();
    let switched = false;
    const onHide = () => {
      if (document.visibilityState === "hidden") switched = true;
    };
    document.addEventListener("visibilitychange", onHide);
    window.location.href = app;
    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", onHide);
      if (!switched && document.visibilityState === "visible") {
        window.open(webUrl, "_blank", "noopener,noreferrer");
      }
    }, 1200);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href: webUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      onClick,
      className,
      ...rest,
      children
    }
  );
}
function getInitials(name) {
  return name.split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase();
}
function Avatar({ name, src, size = "sm", className }) {
  const [errored, setErrored] = reactExports.useState(false);
  const showImg = src && !errored;
  const sizeClass = size === "lg" ? "h-32 w-32 sm:h-40 sm:w-40 text-3xl" : "h-14 w-14 text-xl";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-full bg-navy font-display font-semibold text-gold",
        sizeClass,
        className
      ),
      children: showImg ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src,
          alt: name,
          className: "h-full w-full object-cover",
          onError: () => setErrored(true)
        }
      ) : getInitials(name)
    }
  );
}
export {
  Avatar as A,
  LinkedInLink as L
};
