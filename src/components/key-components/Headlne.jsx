// src/components/SessionHeadliner.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function SessionHeadliner({
  formUrl,
  message = "Be the first to hear about new programs and events.",
  ctaText = "Sign Up",
  storageKey = "headlinerDismissed",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Show once per session
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(storageKey);
      if (!dismissed) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [storageKey]);

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

    // Keep updated on resize/content changes
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
    // Remove the CSS var after close animation (optional tiny delay)
    setTimeout(() => {
      document.documentElement.style.removeProperty("--headliner-h");
    }, 200);
  };

  if (!open) return null;

  return (
    <Box
      ref={ref}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: (t) => t.zIndex.appBar + 2, // above AppBar
        bgcolor: "#E8E5DD",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
      role="region"
      aria-label="Site announcement"
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr auto", md: "1fr auto auto" },
          alignItems: "center",
          gap: 1.5,
          py: { xs: 1, md: 1.25 },
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "#1a1a1a", fontWeight: 500, pr: 1 }}
        >
          {message}{" "}
          {formUrl && (
            <MuiLink
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              underline="always"
              sx={{ color: "#339c5e", fontWeight: 600 }}
            >
              Learn more
            </MuiLink>
          )}
        </Typography>

        {formUrl && (
          <Button
            size="small"
            variant="contained"
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: "#339c5e",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 999,
              px: 2.4,
              "&:hover": { bgcolor: "#2d8a55" },
            }}
          >
            {ctaText}
          </Button>
        )}

        <IconButton
          aria-label="Close announcement"
          onClick={handleClose}
          edge="end"
          sx={{ color: "#1a1a1a" }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Container>
    </Box>
  );
}
