// components/Hero2.jsx
import React, { useMemo } from "react";
import {
  Typography,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* -------------------- Config -------------------- */
const HERO_IMAGE = "/image5.JPG";

/* -------------------- Styled elements -------------------- */
const Wrapper = styled(Box)({
  position: "relative",
  width: "100%", // avoid 100vw overflow
  height: "100svh",
  minHeight: "100vh",
  color: "#fff",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  "@supports (-webkit-touch-callout: none)": {
    minHeight: "100svh",
  },
});

const SlideLayer = styled(motion.div)({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const SlideImg = styled(motion.img)({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  pointerEvents: "none",
});

const Overlay = styled(motion.div)({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
});

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

/* -------------------- Reusable mobile heading style -------------------- */
const mobileH1Base = {
  fontWeight: 300,
  color: "white",
  lineHeight: 1.15,
  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
  wordBreak: "break-word",
  overflowWrap: "break-word",
  hyphens: "auto",
  WebkitHyphens: "auto",
};

/* -------------------- Component -------------------- */
const Hero2 = () => {
  const navigate = useNavigate();
  const handleAskQuestion = () => navigate("/gallery");
  const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  /* -------------------- Ambient overlay pulse -------------------- */
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

  /* -------------------- Floating particles -------------------- */
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
            animate={{ y: [0, -10, 0], opacity: [0.15, 0.4, 0.15] }}
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
    <Wrapper role="region" aria-label="Hero section">
      {/* Static Background Image */}
      <SlideLayer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SlideImg
          src={HERO_IMAGE}
          alt=""
          loading="eager"
          decoding="async"
          fetchpriority="high"
          initial={{ scale: 1, filter: "brightness(0.98)" }}
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

      {ambient}
      {particles}

      {/* ---------- Mobile: true, automatic centering ---------- */}
      <Box
        component={motion.div}
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        sx={{
          position: "absolute",
          inset: 0,
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "max(16px, env(safe-area-inset-left))",
          paddingRight: "max(16px, env(safe-area-inset-right))",
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: "min(92%, 520px)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
            sx={{
              ...mobileH1Base,
              fontSize: "clamp(1.05rem, 4.8vw, 1.5rem)",
              mb: 0.5,
            }}
          >
            988 Suicide &amp; Crisis Hotline
          </Typography>

          <Typography
            component={motion.h2}
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.08, duration: 0.7 },
            }}
            sx={{
              ...mobileH1Base,
              fontSize: "clamp(1.65rem, 8.8vw, 2.6rem)",
              mb: 1,
            }}
          >
            LIVE LIKE SEAN, <br /> A FRIEND TO ALL
          </Typography>

          {/* 50/50 grid buttons */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.25,
              width: "100%",
            }}
          >
            <GlassButton
              variants={buttonVariants}
              initial="initial"
              animate={buttonVariants.animate(0)}
              whileHover="whileHover"
              whileTap="whileTap"
              fullWidth
              sx={{ width: "100%", minHeight: 48 }}
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
              fullWidth
              sx={{ width: "100%", minHeight: 48 }}
            >
              VIEW GALLERY
            </GlassButton>
          </Box>
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
          988 Suicide &amp; Crisis Hotline
        </Typography>
        <Typography
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
    </Wrapper>
  );
};

export default Hero2;
