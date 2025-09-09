// components/Hero2.jsx
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  Typography,
  Button,
  Box,
  MobileStepper,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/* -------------------- Slideshow config -------------------- */
// Replace with your actual assets
const images = ["/image1.JPG", "/image3.JPG", "/image4.JPG", "/image5.JPG"];
const AUTOPLAY_MS = 6000;
const WHEEL_LOCK_MS = 500;

/* -------------------- Styled elements -------------------- */
const Wrapper = styled(Box)({
  position: "relative",
  width: "100vw",
  height: "100vh",
  minHeight: "100vh",
  color: "#fff",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  touchAction: "manipulation",
  overscrollBehavior: "none",
  WebkitOverflowScrolling: "touch",
  "@supports (-webkit-touch-callout: none)": {
    minHeight: "-webkit-fill-available",
  },
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
  background: "rgba(0,0,0,0.2)", // uniform overlay
  pointerEvents: "none",
});


const GlassButton = styled(Button)({
  padding: "12px 20px",
  borderRadius: 14,
  textTransform: "none",
  fontWeight: 700,
  letterSpacing: 0.25,
  color: "#fff",
  background: "rgba(18,18,18,0.45)",
  border: "1px solid rgba(255,255,255,0.18)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  "&:hover": {
    background: "rgba(18,18,18,0.65)",
    borderColor: "rgba(255,255,255,0.25)",
  },
});

const ArrowButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(17,17,17,0.55)",
  color: "#fff",
  width: 44,
  height: 44,
  zIndex: 10,
  "&:hover": { backgroundColor: "rgba(17,17,17,0.75)" },
});

/* -------------------- Component -------------------- */
const Hero2 = () => {
  const navigate = useNavigate();
  const handleAskQuestion = () => navigate("/gallery");

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

  // Keyboard arrows (← / →)
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
    if (ax <= ay || ax < 20) return;

    const now = performance.now();
    if (now - lastWheelTs.current < 120) return;
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

      {/* ---------- Mobile layout: centered text + stacked buttons ---------- */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          width: "calc(100vw - 32px)",
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "1.4rem",
            fontWeight: 300,
            color: "white",
            lineHeight: 1.2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
            mb: 3,
          }}
        >
          988 Suicide & Crisis Hotline
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: "2.2rem",
            fontWeight: 300,
            color: "white",
            lineHeight: 1.2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
            mb: 3,
          }}
        >
          LIVE LIKE SEAN, <br /> A FRIEND TO ALL
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: "2.2rem",
            fontWeight: 300,
            color: "white",
            lineHeight: 1.2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
            mb: 3,
          }}
        >
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <GlassButton>CONNECT WITH US</GlassButton>
          <GlassButton onClick={handleAskQuestion}>VIEW GALLERY</GlassButton>
        </Box>
      </Box>

      {/* ---------- Desktop/Tablet: text bottom-le ft ---------- */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          position: "absolute",
          bottom: { sm: 24, md: 40 },
          left: { sm: 24, md: 40 },
          zIndex: 2,
          maxWidth: { sm: "60vw", md: "50vw" },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { sm: "1.5rem", md: "2rem", lg: "2.5rem" },
            fontWeight: 400,
            color: "#339c5e",
            fontStyle:"italic",
            lineHeight: 1.1,
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
        >
          988 Suicide & Crisis Hotline
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { sm: "2.5rem", md: "4rem", lg: "5rem" },
            fontStyle:"italic",
            fontWeight: 400,
            color: "white",
            lineHeight: 1.1,
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
        >
          Live Like Sean, <br /> A Friend To All
        </Typography>
      </Box>

      {/* ---------- Desktop/Tablet: buttons bottom-right ---------- */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          position: "absolute",
          bottom: { sm: 24, md: 40 },
          right: { sm: 24, md: 40 },
          zIndex: 2,
          gap: 2,
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <GlassButton>CONNECT WITH US</GlassButton>
        <GlassButton onClick={handleAskQuestion}>VIEW GALLERY</GlassButton>
      </Box>

      {/* On-screen arrow controls (like previous component) */}
      {total > 1 && (
        <>
          <ArrowButton
            aria-label="Previous slide"
            onClick={prev}
            sx={{ left: { xs: 8, sm: 16 } }}
          >
            <ChevronLeftIcon />
          </ArrowButton>

          <ArrowButton
            aria-label="Next slide"
            onClick={next}
            sx={{ right: { xs: 8, sm: 16 } }}
          >
            <ChevronRightIcon />
          </ArrowButton>
        </>
      )}

      {/* Stepper dots (center bottom) */}
      {total > 1 && (
        <Box
          sx={{
            position: "absolute",
            bottom: 18,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 3,
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
                width: 7,
                height: 7,
                backgroundColor: "rgba(255,255,255,0.55)",
              },
              "& .MuiMobileStepper-dotActive": { backgroundColor: "#fff" },
            }}
          />
        </Box>
      )}
    </Wrapper>
  );
};

export default Hero2;
