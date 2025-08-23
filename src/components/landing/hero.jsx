// components/HeroClark21.jsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  MobileStepper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Replace with your assets
const images = ["/image1.JPG", "/image3.JPG", "/image4.JPG", "/image5.JPG"];

const AUTOPLAY_MS = 6000;
const WHEEL_LOCK_MS = 500;

// ---------- Styles ----------
const Wrapper = styled(Box)({
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  color: "#fff",
  overflow: "hidden",
});

const SlideImg = styled(Box)({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0,
  transition: "opacity 800ms ease",
  willChange: "opacity",
  pointerEvents: "none",
});

const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  // heavier on the left so white text stays readable
  background:
    "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.10) 100%)",
  pointerEvents: "none",
});

const LearnMoreButton = styled(Button)({
  backgroundColor: "#fff",
  color: "#000",
  borderRadius: 9999,
  padding: "10px 24px",
  fontWeight: 700,
  textTransform: "none",
  "&:hover": { backgroundColor: "#f0f0f0" },
});

// Always above content; larger hit area; safe-area friendly offsets
const ArrowButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(17,17,17,0.55)",
  color: "#fff",
  width: 48,
  height: 48,
  zIndex: 10,
  "&:hover": { backgroundColor: "rgba(17,17,17,0.75)" },
});

// ---------- Component ----------
export default function HeroClark21() {
  const [index, setIndex] = useState(0);
  const [hoverPause, setHoverPause] = useState(false);
  const [offscreenPause, setOffscreenPause] = useState(false);
  const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const total = images.length;

  const wrapperRef = useRef(null);
  const wheelLockRef = useRef(false);
  const lastWheelTs = useRef(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const go = useCallback((i) => setIndex((p) => (i + total) % total), [total]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Pause autoplay when hero is mostly off-screen
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setOffscreenPause(!entry.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const paused = hoverPause || offscreenPause || isReducedMotion || total <= 1;

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Wheel: react to horizontal intent only (ignore vertical scroll)
  const onWheel = (e) => {
    const ax = Math.abs(e.deltaX);
    const ay = Math.abs(e.deltaY);
    if (ax <= ay || ax < 20) return; // ignore vertical or tiny gestures

    const now = performance.now();
    if (now - lastWheelTs.current < 120) return; // throttle
    lastWheelTs.current = now;

    if (wheelLockRef.current) return;
    wheelLockRef.current = true;

    e.deltaX > 0 ? next() : prev();
    setTimeout(() => (wheelLockRef.current = false), WHEEL_LOCK_MS);
  };

  // Touch swipe
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      (dx < 0 ? next : prev)();
    }
  };

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.decode) img.decode().catch(() => {});
    });
  }, []);

  const slides = useMemo(
    () =>
      images.map((src, i) => (
        <SlideImg
          key={src + i}
          component="img"
          src={src}
          alt="" // decorative
          aria-hidden={i === index ? "false" : "true"}
          loading={i === index ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={i === index ? "high" : "auto"}
          sx={{ opacity: i === index ? 1 : 0 }}
        />
      )),
    [index]
  );

  return (
    <Wrapper
      ref={wrapperRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero slideshow"
      onMouseEnter={() => setHoverPause(true)}
      onMouseLeave={() => setHoverPause(false)}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background slideshow */}
      {slides}
      <Overlay />

      {/* Foreground content (below arrows thanks to zIndex) */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          zIndex: 4, // arrows are 10
          "& .hero-title, & .hero-sub": {
            textShadow: "0 2px 8px rgba(0,0,0,0.45)",
          },
        }}
      >
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box>
              <Typography
                variant="h2"
                className="hero-title"
                sx={{
                  fontFamily: "serif",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 2,
                  fontSize: { xs: "2.25rem", sm: "3rem", md: "3.5rem", lg: "4rem" },
                }}
              >
                Live Like Sean <br /> a Friend to all.
              </Typography>
              <Typography
                variant="subtitle1"
                className="hero-sub"
                sx={{ mb: 4, fontSize: { xs: "1rem", md: "1.125rem" } }}
              >
                988 Suicide &amp; Mental Health Hotline
              </Typography>
              <LearnMoreButton>Learn more</LearnMoreButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Controls */}
      {total > 1 && (
        <>
          <ArrowButton
            aria-label="Previous slide"
            onClick={prev}
            sx={{ left: { xs: "max(8px, env(safe-area-inset-left))", sm: 16 } }}
          >
            <ChevronLeftIcon />
          </ArrowButton>

          <ArrowButton
            aria-label="Next slide"
            onClick={next}
            sx={{ right: { xs: "max(8px, env(safe-area-inset-right))", sm: 16 } }}
          >
            <ChevronRightIcon />
          </ArrowButton>

          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 6, // beneath arrows, above slides
            }}
          >
            <MobileStepper
              steps={total}
              position="static"
              activeStep={index}
              nextButton={null}
              backButton={null}
              sx={{
                background: "transparent",
                "& .MuiMobileStepper-dot": {
                  backgroundColor: "rgba(255,255,255,0.5)",
                },
                "& .MuiMobileStepper-dotActive": { backgroundColor: "#fff" },
              }}
            />
          </Box>
        </>
      )}
    </Wrapper>
  );
}
