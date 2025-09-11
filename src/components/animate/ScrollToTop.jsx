// src/router/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Instantly scrolls to top on route changes.
 * - Leaves #hash jumps alone (so section links still work).
 * - Resets window AND optional container elements you pass by id.
 */
export default function ScrollToTop({ containerIds = [] }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // allow in-page anchors like /privacy#contact

    // Disable browser auto-restoration for SPA consistency
    try { window.history.scrollRestoration = "manual"; } catch {}

    // Wait a frame so new route content lays out, then jump to top
    const raf = requestAnimationFrame(() => {
      // Window-level scroll
      window.scrollTo(0, 0);
      // Safari/legacy safety
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // If you use a custom scroll container (overflow: auto), reset it too
      for (const id of containerIds) {
        const el = document.getElementById(id);
        if (el) el.scrollTop = 0;
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, containerIds]);

  return null;
}
