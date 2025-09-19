// src/components/SessionHeadliner.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Link as MuiLink,
  useMediaQuery,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion, AnimatePresence } from "framer-motion";

export default function SessionHeadliner() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const storageKey = "headlinerDismissed";
  const autoCloseMs = 10000; // 10 seconds
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // constants for spacing the close button
  const CLOSE_SIZE = 40; // px
  const CLOSE_PAD_XS = 8; // extra breathing room on mobile (px)

  // Show once per session
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(storageKey);
      if (!dismissed) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  // Auto-close after N seconds
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => handleClose(), autoCloseMs);
    return () => clearTimeout(timer);
  }, [open]);

  // Measure height and expose as CSS var for layout offset
  useEffect(() => {
    if (!open) {
      document.documentElement.style.removeProperty("--headliner-h");
      return;
    }
    const el = ref.current;
    if (!el) return;

    const setVar = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--headliner-h", `${h}px`);
    };

    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {}
    setTimeout(() => {
      document.documentElement.style.removeProperty("--headliner-h");
    }, prefersReducedMotion ? 0 : 500);
  };

  // Motion variants (respect reduced motion)
  const enter = prefersReducedMotion
    ? { y: 0, opacity: 1, transition: { duration: 0 } }
    : { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } };
  const exit = prefersReducedMotion
    ? { y: 0, opacity: 0, transition: { duration: 0.2 } }
    : { y: -80, opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ y: prefersReducedMotion ? 0 : -80, opacity: prefersReducedMotion ? 1 : 0 }}
          animate={enter}
          exit={exit}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1401, // above AppBar
          }}
        >
          <Box
            sx={{
              position: "relative",
              bgcolor: "#E8E5DD",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              pt: { xs: "max(10px, env(safe-area-inset-top))", md: 0 },
              pb: 0,
            }}
            role="region"
            aria-label="Site announcement"
          >
            <Container
              maxWidth="xl"
              sx={{
                display: "grid",
                // Mobile: close on its own top row; content centered beneath with a little drop (mt)
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr auto auto",
                },
                gridTemplateAreas: {
                  xs: `"close"
                       "message"
                       "cta"`,
                  md: `"message cta close"`,
                },
                alignItems: { xs: "start", md: "center" },
                justifyItems: { xs: "center", md: "stretch" },
                textAlign: { xs: "center", md: "left" },
                rowGap: { xs: 1, md: 1.25 },
                columnGap: { md: 1.5 },
                // give the message/cta a tiny nudge down on mobile
                py: { xs: 1.25, md: 1.25 },
                px: {
                  xs: "max(16px, env(safe-area-inset-left))",
                  md: 3,
                },
              }}
            >
              {/* Message */}
              <Typography
                variant="body2"
                sx={{
                  gridArea: "message",
                  color: "#1a1a1a",
                  fontWeight: 500,
                  pr: { md: 1 },
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  lineHeight: { xs: 1.35, sm: 1.4 },
                  maxWidth: { xs: 780, md: "none" }, // keep nice line length when centered
                }}
              >
                Join us for the Walk-Out Event on September 14th — sign up today!{" "}
                <MuiLink
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc1vprOU16Iufa50z8ZFiuAo2J8QKp-6xgbZVekXy-ez-u36w/viewform?fbclid=PAZXh0bgNhZW0CMTEAAad7uVMx_QTaQKQPrjCh9AKhHWYicBqVYHi1tSeuz8rjPIOH_QhA8LTH6LjcxA_aem_n_N_eoOi31r__neqJ2THkQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="always"
                  sx={{
                    color: "#339c5e",
                    fontWeight: 700,
                    display: "inline-block",
                    px: { xs: 0.25, sm: 0 },
                    mx: { xs: 0.25, sm: 0 },
                    borderRadius: 0.75,
                    "&:focus-visible": {
                      outline: "2px solid rgba(51,156,94,0.55)",
                      outlineOffset: 2,
                    },
                  }}
                >
                  Learn more
                </MuiLink>
              </Typography>

              {/* Sign Up button (full width on xs) */}
              <Box
                sx={{
                  gridArea: "cta",
                  justifySelf: { xs: "center", md: "end" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc1vprOU16Iufa50z8ZFiuAo2J8QKp-6xgbZVekXy-ez-u36w/viewform?fbclid=PAZXh0bgNhZW0CMTEAAad7uVMx_QTaQKQPrjCh9AKhHWYicBqVYHi1tSeuz8rjPIOH_QhA8LTH6LjcxA_aem_n_N_eoOi31r__neqJ2THkQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: "#339c5e",
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 999,
                    px: { xs: 1.75, md: 2.4 },
                    py: { xs: 0.75, md: 0.6 },
                    "&:hover": { bgcolor: "#2d8a55" },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Container>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
