import * as React from "react";

/** Normalize any stored LinkedIn URL to a canonical https web URL. */
export function normalizeLinkedInUrl(raw: string): string {
  const url = raw.trim();
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (/^linkedin:\/\//i.test(url)) return `https://www.linkedin.com/${url.replace(/^linkedin:\/\//i, "")}`;
  return `https://www.linkedin.com/${url.replace(/^\/+/, "")}`;
}

/** Build the native app deep link (linkedin://...) from a web profile URL. */
export function linkedInAppUrl(raw: string): string | null {
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

type Props = {
  url: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
  title?: string;
};

/**
 * Opens the native LinkedIn app on mobile when installed, and falls back to the
 * web profile in a new tab on desktop or when the app is missing.
 */
export function LinkedInLink({ url, className, children, ...rest }: Props) {
  const webUrl = normalizeLinkedInUrl(url);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isMobile()) return; // desktop: default target="_blank" behavior
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

  return (
    <a
      href={webUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
