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
import { motion, AnimatePresence } from "framer-motion";

/* -------------------- Slideshow config -------------------- */
// Replace with your actual assets
const images = ["/image5.JPG", "/image4.JPG", "/image1.JPG"];
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

const SlideLayer = styled(motion.div)(() => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
}));

const SlideImg = styled(motion.img)(() => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  willChange: "transform, opacity, filter",
  pointerEvents: "none",
}));

const Overlay = styled(motion.div)(() => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
}));

const GlassButton = styled(motion(Button))({
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
  transition: "box-shadow 240ms ease",
  "&:hover": {
    background: "rgba(18,18,18,0.65)",
    borderColor: "rgba(255,255,255,0.25)",
  },
});

const ArrowButton = styled(motion(IconButton))({
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

/* -------------------- Animation variants -------------------- */
const fadeInUp = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const buttonVariants = {
  initial: { opacity: 0, y: 12 },
  animate: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
  whileHover: { y: -2, boxShadow: "0 10px 30px rgba(0,0,0,0.35)" },
  whileTap: { scale: 0.98 },
};

const arrowVariants = {
  whileHover: { scale: 1.05, y: -2 },
  whileTap: { scale: 0.96 },
};

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

  /* -------------------- Slides with ✨Ken Burns + crossfade -------------------- */
  const slides = useMemo(
    () => (
      <AnimatePresence initial={false} mode="wait">
        {images.map((src, i) =>
          i === index ? (
            <SlideLayer
              key={src + i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: isReducedMotion ? 0.2 : 0.8,
                ease: "easeOut",
              }}
            >
              <SlideImg
                src={src}
                alt=""
                aria-hidden="false"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                initial={{ scale: 1, x: 0, filter: "brightness(0.98)" }}
                animate={{
                  transition: { duration: AUTOPLAY_MS / 1000, ease: "linear" },
                }}
              />
              {/* Subtle dark vignette */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                   background: `
      linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 15%, rgba(0,0,0,0) 35%),
      radial-gradient(120% 80% at 50% 100%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.08) 65%, rgba(0,0,0,0.15) 100%)
    `,
                  pointerEvents: "none",
                }}
              />
            </SlideLayer>
          ) : null
        )}
      </AnimatePresence>
    ),
    [index, isReducedMotion]
  );

  /* -------------------- Ambient overlay pulse (kelly green accent) -------------------- */
  const ambient = useMemo(
    () => (
      <Overlay
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(40% 40% at 15% 85%, rgba(51,156,94,0.35) 0%, rgba(51,156,94,0.1) 35%, transparent 60%)",
          mixBlendMode: "soft-light",
        }}
      />
    ),
    []
  );

  /* -------------------- Floating dust/particles (very subtle) -------------------- */
  const particles = useMemo(() => {
    const dots = Array.from({ length: 16 });
    return (
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {dots.map((_, i) => (
          <motion.span
            key={i}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: 3,
              height: 3,
              borderRadius: 3,
              background: "rgba(255,255,255,0.6)",
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 10) * 0.3,
            }}
          />
        ))}
      </Box>
    );
  }, []);

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
      {ambient}
      {particles}

      {/* ---------- Mobile layout: centered text + stacked buttons ---------- */}
      <Box
        component={motion.div}
        variants={fadeInUp}
        initial="initial"
        animate="animate"
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
          maxWidth: 420,
        }}
      >
        <Typography
          variant="h1"
          component={motion.h1}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
          sx={{
            fontSize: "1.4rem",
            fontWeight: 300,
            color: "white",
            lineHeight: 1.2,
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
            mb: 2,
          }}
        >
          988 Suicide & Crisis Hotline
        </Typography>
        <Typography
          variant="h1"
          component={motion.h2}
          initial={{ opacity: 0, y: 14 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.08, duration: 0.7 },
          }}
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

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <GlassButton
            variants={buttonVariants}
            initial="initial"
            animate={buttonVariants.animate(0)}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            LEARN MORE
          </GlassButton>
          <GlassButton
            variants={buttonVariants}
            initial="initial"
            animate={buttonVariants.animate(1)}
            whileHover="whileHover"
            whileTap="whileTap"
            onClick={handleAskQuestion}
          >
            VIEW GALLERY
          </GlassButton>
        </Box>
      </Box>

      {/* ---------- Desktop/Tablet: text bottom-left ---------- */}
      <Box
        component={motion.div}
        variants={fadeInUp}
        initial="initial"
        animate="animate"
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
          component={motion.h3}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
          sx={{
            fontSize: { sm: "1.5rem", md: "2rem", lg: "2.5rem" },
            fontWeight: 400,
            color: "#339c5e",
            fontStyle: "italic",
            lineHeight: 1.1,
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
        >
          988 Suicide & Crisis Hotline
        </Typography>
        <Typography
          variant="h1"
          component={motion.h1}
          initial={{ opacity: 0, y: 14 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.08, duration: 0.7 },
          }}
          sx={{
            fontSize: { sm: "2.5rem", md: "4rem", lg: "5rem" },
            fontStyle: "italic",
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
        <GlassButton
          variants={buttonVariants}
          initial="initial"
          animate={buttonVariants.animate(0)}
          whileHover="whileHover"
          whileTap="whileTap"
        >
          LEARN MORE
        </GlassButton>
        <GlassButton
          variants={buttonVariants}
          initial="initial"
          animate={buttonVariants.animate(1)}
          whileHover="whileHover"
          whileTap="whileTap"
          onClick={handleAskQuestion}
        >
          VIEW GALLERY
        </GlassButton>
      </Box>

      {/* On-screen arrow controls */}
      {total > 1 && (
        <>
          <ArrowButton
            aria-label="Previous slide"
            onClick={prev}
            variants={arrowVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            sx={{ left: { xs: 8, sm: 16 } }}
          >
            <ChevronLeftIcon />
          </ArrowButton>

          <ArrowButton
            aria-label="Next slide"
            onClick={next}
            variants={arrowVariants}
            whileHover="whileHover"
            whileTap="whileTap"
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
