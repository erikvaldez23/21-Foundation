// src/components/sections/CTABanner.jsx
import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { keyframes } from "@emotion/react";

/* ---------------------------- Design Tokens ---------------------------- */
const KELLY = "#339c5e";
const KELLY_DARK = "#2a7d4a";
const KELLY_LIGHT = "#4fb574";
const SURFACE = "#E8E5DD";

/* ------------------------------- Animations ---------------------------- */
const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(1deg); }
`;

const shimmerAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

/* ------------------------------- Wrappers ------------------------------ */
const SectionBg = styled(Box)({
  background: `#E8E5DD`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-50%",
    width: "200%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, ${alpha(KELLY, 0.03)}, transparent)`,
    animation: `${shimmerAnimation} 8s ease-in-out infinite`,
  },
});

const Wrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: "#fff",
  borderRadius: 32,
  overflow: "hidden",
  /* Enhanced shadow system */
  boxShadow: `
    0 32px 64px -12px ${alpha(KELLY, 0.25)},
    0 20px 40px -8px ${alpha("#000", 0.1)},
    0 8px 16px ${alpha("#000", 0.08)},
    inset 0 1px 0 ${alpha("#fff", 0.15)}
  `,
  /* Modern gradient with more depth */
  background: `
    radial-gradient(circle at 20% 20%, ${alpha("#fff", 0.15)} 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, ${alpha(KELLY_LIGHT, 0.3)} 0%, transparent 50%),
    radial-gradient(ellipse 200% 100% at 50% 120%, ${KELLY_DARK} 0%, ${KELLY} 50%, ${KELLY_LIGHT} 100%),
    linear-gradient(135deg, ${KELLY} 0%, ${KELLY_DARK} 100%)
  `,
  /* Subtle border */
  border: `1px solid ${alpha("#fff", 0.1)}`,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `
      0 40px 80px -12px ${alpha(KELLY, 0.3)},
      0 24px 48px -8px ${alpha("#000", 0.12)},
      0 12px 24px ${alpha("#000", 0.1)},
      inset 0 1px 0 ${alpha("#fff", 0.2)}
    `,
  },
}));

/* Enhanced texture overlay */
const Noise = styled("div")({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  opacity: 0.04,
  backgroundImage:
    "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%221.2%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%2260%22 height=%2260%22 filter=%22url(%23n)%22 opacity=%220.5%22/></svg>')",
  backgroundSize: "120px 120px",
  mixBlendMode: "overlay",
});

/* Animated gradient overlay */
const GlowOverlay = styled("div")({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background: `
    radial-gradient(circle at 30% 70%, ${alpha(KELLY_LIGHT, 0.4)} 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, ${alpha("#fff", 0.1)} 0%, transparent 40%)
  `,
  animation: `${pulseGlow} 4s ease-in-out infinite`,
  mixBlendMode: "overlay",
});

/* Floating decorative elements */
const FloatingIcon = styled(Box)({
  position: "absolute",
  opacity: 0.1,
  animation: `${floatingAnimation} 6s ease-in-out infinite`,
  zIndex: 1,
});

/* ------------------------------- Buttons ------------------------------ */
const CTAButton = styled(Button)(({ theme }) => ({
  borderRadius: 24,
  textTransform: "none",
  fontWeight: 700,
  padding: "14px 28px",
  letterSpacing: 0.3,
  fontSize: 16,
  minHeight: 52,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
    transform: "translateX(-100%)",
    transition: "transform 0.6s ease",
  },
  
  "&:hover::before": {
    transform: "translateX(100%)",
  },
  
  "&:hover": {
    transform: "translateY(-3px) scale(1.02)",
    boxShadow: "0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)",
  },
  
  "&:active": {
    transform: "translateY(-1px) scale(0.98)",
  },
  
  "&:focus-visible": {
    outline: "none",
    boxShadow: `
      0 0 0 3px ${alpha("#fff", 0.8)}, 
      0 0 0 6px ${alpha(KELLY, 0.3)},
      0 8px 24px rgba(0,0,0,0.1)
    `,
  },
}));

const PrimaryButton = styled(CTAButton)({
  background: `linear-gradient(135deg, #fff 0%, ${alpha("#fff", 0.95)} 100%)`,
  color: KELLY,
  boxShadow: `
    0 8px 24px ${alpha("#000", 0.1)},
    0 2px 8px ${alpha("#000", 0.06)},
    inset 0 1px 0 ${alpha("#fff", 0.5)}
  `,
  
  "&:hover": {
    background: `linear-gradient(135deg, #fff 0%, ${alpha("#fff", 0.98)} 100%)`,
    color: KELLY_DARK,
  },
});

const SecondaryButton = styled(CTAButton)({
  borderColor: alpha("#fff", 0.9),
  color: "#fff",
  background: `linear-gradient(135deg, ${alpha("#fff", 0.1)} 0%, ${alpha("#fff", 0.05)} 100%)`,
  backdropFilter: "saturate(180%) blur(20px)",
  borderWidth: 2,
  
  "&:hover": {
    borderColor: "#fff",
    background: `linear-gradient(135deg, ${alpha("#fff", 0.2)} 0%, ${alpha("#fff", 0.1)} 100%)`,
    backdropFilter: "saturate(180%) blur(20px)",
  },
});

/* ------------------------------ Component ----------------------------- */
/**
 * Enhanced modern CTA Banner with improved aesthetics
 */
const CTABanner = ({
  title = "Honor Sean's Legacy—Give Hope Today",
  subtitle = "Your gift powers youth sports, counseling, and mentorship that build mental resiliency and community.",
  primaryLabel = "Donate Now",
  onPrimary = () => window.location.assign("/give"),
  secondaryLabel = "Give Monthly",
  onSecondary = () => window.location.assign("/give?frequency=monthly"),
  extra = null,
}) => {
  return (
    <SectionBg>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Wrap
          component={motion.section}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          role="region"
          aria-label="Donate call to action"
        >
          <Noise />
          <GlowOverlay />
          
          {/* Floating decorative hearts */}
          <FloatingIcon sx={{ top: "20%", right: "15%", animationDelay: "0s" }}>
            <FavoriteRoundedIcon sx={{ fontSize: 48 }} />
          </FloatingIcon>
          <FloatingIcon sx={{ bottom: "25%", left: "10%", animationDelay: "2s" }}>
            <VolunteerActivismRoundedIcon sx={{ fontSize: 40 }} />
          </FloatingIcon>
          <FloatingIcon sx={{ top: "60%", right: "8%", animationDelay: "4s" }}>
            <FavoriteRoundedIcon sx={{ fontSize: 32 }} />
          </FloatingIcon>

          <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
            <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
              {/* Content */}
              <Grid item xs={12} md={8}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      letterSpacing: 3,
                      opacity: 0.9,
                      display: "block",
                      fontWeight: 600,
                      background: `linear-gradient(90deg, #fff, ${alpha("#fff", 0.8)})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ✨ MAKE AN IMPACT
                  </Typography>

                  <Typography
                    component="h2"
                    sx={{
                      fontWeight: 900,
                      lineHeight: 1.1,
                      letterSpacing: -1,
                      fontSize: {
                        xs: "clamp(28px, 7vw, 40px)",
                        md: "clamp(42px, 3.5vw, 58px)",
                      },
                      mt: 1,
                      background: `linear-gradient(135deg, #fff 0%, ${alpha("#fff", 0.9)} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: `0 2px 12px ${alpha("#000", 0.1)}`,
                    }}
                  >
                    {title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      maxWidth: 640,
                      opacity: 0.95,
                      fontSize: { xs: 16, md: 18 },
                      lineHeight: 1.6,
                      fontWeight: 400,
                    }}
                  >
                    {subtitle}
                  </Typography>
                </Box>
              </Grid>

              {/* Actions */}
              <Grid item xs={12} md={4}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", sm: "row" },
                    gap: 2,
                    flexWrap: "wrap",
                    justifyContent: { xs: "flex-start", md: "flex-end" },
                  }}
                >
                  <PrimaryButton
                    size="large"
                    variant="contained"
                    onClick={onPrimary}
                    startIcon={<VolunteerActivismRoundedIcon />}
                    aria-label={primaryLabel}
                  >
                    {primaryLabel}
                  </PrimaryButton>

                  <SecondaryButton
                    size="large"
                    variant="outlined"
                    onClick={onSecondary}
                    startIcon={<FavoriteRoundedIcon />}
                    aria-label={secondaryLabel}
                  >
                    {secondaryLabel}
                  </SecondaryButton>
                </Box>

                {extra && (
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    sx={{
                      mt: 2,
                      textAlign: { xs: "left", md: "right" },
                      opacity: 0.85,
                      fontSize: 15,
                      fontWeight: 400,
                    }}
                  >
                    {extra}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Container>
        </Wrap>
      </Container>
    </SectionBg>
  );
};

export default CTABanner;