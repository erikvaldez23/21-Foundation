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
import { motion, AnimatePresence } from "framer-motion";

export default function SessionHeadliner() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const storageKey = "headlinerDismissed";
  const autoCloseMs = 10000; // 10 seconds

  // Show once per session
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(storageKey);
      if (!dismissed) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  // Auto-close after 10s
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
    }, 500); // match animation duration
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
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
                Join us for the Walk-Out Event on September 14th — sign up today!{" "}
                <MuiLink
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc1vprOU16Iufa50z8ZFiuAo2J8QKp-6xgbZVekXy-ez-u36w/viewform?fbclid=PAZXh0bgNhZW0CMTEAAad7uVMx_QTaQKQPrjCh9AKhHWYicBqVYHi1tSeuz8rjPIOH_QhA8LTH6LjcxA_aem_n_N_eoOi31r__neqJ2THkQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="always"
                  sx={{ color: "#339c5e", fontWeight: 600 }}
                >
                  Learn more
                </MuiLink>
              </Typography>

              <Button
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
                  px: 2.4,
                  "&:hover": { bgcolor: "#2d8a55" },
                }}
              >
                Sign Up
              </Button>

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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
