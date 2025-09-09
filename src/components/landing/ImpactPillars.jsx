// src/components/sections/ImpactPillars.jsx
import React from "react";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";

const ACCENT = "#339c5e";
const ACCENT_DARK = "#2c8b53";

/* ------------------------------ Styles ------------------------------ */
const SectionWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: "#0a0a0a",
  background:
    "radial-gradient(1200px 600px at 50% -10%, rgba(51,156,94,0.10), transparent 60%), #E8E5DD",
  borderTop: "1px solid rgba(0,0,0,0.05)",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
}));

const GridWrap = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(4),
  alignItems: "stretch",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "3fr 2fr", // ≈ 60/40
    gap: theme.spacing(6),
  },
}));

const PillarsStack = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2.25),
  alignContent: "start",
}));

const PillarCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: 28,
  background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT_DARK} 100%)`,
  border: `1px solid ${alpha("#000", 0.08)}`,
  boxShadow: `0 10px 24px ${alpha("#000", 0.18)}`,
  transition:
    "transform .2s ease, box-shadow .2s ease, border-color .2s ease, background .25s ease",
  // glossy diagonal sheen
  "::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0) 60%)",
    pointerEvents: "none",
    mixBlendMode: "soft-light",
  },
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: `0 18px 40px ${alpha("#000", 0.22)}`,
    borderColor: alpha(ACCENT, 0.55),
    background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT} 40%, ${ACCENT_DARK} 100%)`,
  },
}));

const PillarRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  alignItems: "start",
  gap: theme.spacing(2.25),
}));

const NumberBadge = styled("span")(({ theme }) => ({
  display: "inline-grid",
  placeItems: "center",
  fontWeight: 900,
  lineHeight: 1,
  letterSpacing: "-0.02em",
  fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)",
  color: ACCENT,
  minWidth: "3.2ch",
  padding: theme.spacing(1.1, 1.2),
  background: "#fff",
  borderRadius: 14,
  boxShadow: `inset 0 0 0 1px ${alpha("#000", 0.06)}, 0 6px 14px ${alpha("#000", 0.15)}`,
}));

const IconHalo = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  display: "grid",
  placeItems: "center",
  borderRadius: 999,
  background: alpha("#fff", 0.12),
  color: "#fff",
  boxShadow: `inset 0 0 0 1px ${alpha("#fff", 0.22)}`,
}));

const RightImageWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: 28,
  overflow: "hidden",
  height: "100%",
  minHeight: 520,
  background: alpha("#000", 0.04),
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 12px 30px rgba(0,0,0,0.16)",
  [theme.breakpoints.down("md")]: {
    minHeight: 420,
  },
}));

const RightImage = styled("img")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  filter: "saturate(105%) contrast(103%)",
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 40%, rgba(0,0,0,0.22) 100%)",
  pointerEvents: "none",
}));

/* ------------------------------ Data ------------------------------ */
const PILLARS = [
  {
    title: "Sports",
    desc:
      "Build mental resilience and confidence through coaching, teamwork, and healthy competition.",
    icon: <SportsBasketballOutlinedIcon sx={{ fontSize: 22 }} />,
  },
  {
    title: "Friendship",
    desc:
      "Cultivate inclusive peer support networks where kindness and encouragement are the norm.",
    icon: <Diversity3OutlinedIcon sx={{ fontSize: 22 }} />,
  },
  {
    title: "Family",
    desc:
      "Strengthen family bonds that nurture growth, stability, and a sense of belonging.",
    icon: <FamilyRestroomOutlinedIcon sx={{ fontSize: 22 }} />,
  },
  {
    title: "Faith",
    desc:
      "Inspire courage, purpose, and compassion through values that guide and uplift.",
    icon: <VolunteerActivismOutlinedIcon sx={{ fontSize: 22 }} />,
  },
];

/* ---------------------------- Component ---------------------------- */
export default function ImpactPillars({
  rightImageSrc = "/image29.JPG",
  rightImageAlt = "Clark21 Foundation impact",
}) {
  return (
    <SectionWrap component="section">
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 6.5 } }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 2.5,
              color: "rgba(0,0,0,0.6)",
              fontWeight: 800,
              fontSize: 12,
            }}
          >
            WHY IT MATTERS
          </Typography>

          <Typography
            variant="h3"
            sx={{
              mt: 1,
              fontWeight: 900,
              lineHeight: 1.12,
              color: "#0a0a0a",
              textShadow: `0 1px 22px ${alpha(ACCENT, 0.28)}`,
              fontSize: { xs: 28, sm: 34, md: 42 },
              letterSpacing: "-0.015em",
            }}
          >
            Empowering Youth with Resilience, Kindness & Courage
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "rgba(0,0,0,0.78)",
              maxWidth: 760,
              mx: "auto",
              fontSize: { xs: 14.5, md: 16 },
              lineHeight: 1.7,
            }}
          >
            Inspired by Sean Clark’s spirit, our pillars channel the positive influence of
            sports, friendship, family and faith—so young people can thrive and advocate
            for themselves and others.
          </Typography>
        </Box>

        {/* 60/40 Grid */}
        <GridWrap>
          {/* Left: Numbered pillars */}
          <PillarsStack>
            {PILLARS.map((p, i) => {
              const n = String(i + 1).padStart(2, "0");
              return (
                <PillarCard elevation={0} key={p.title}>
                  <CardContent sx={{ p: { xs: 2.75, md: 3.25 } }}>
                    <PillarRow>
                      <NumberBadge>{n}</NumberBadge>

                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.1,
                            mb: 0.75,
                          }}
                        >
                          <IconHalo>{p.icon}</IconHalo>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 900,
                              color: "#fff",
                              letterSpacing: "-0.01em",
                              textShadow: `0 1px 0 ${alpha("#000", 0.2)}`,
                            }}
                          >
                            {p.title}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            color: alpha("#fff", 0.95),
                            lineHeight: 1.75,
                            textShadow: `0 1px 0 ${alpha("#000", 0.18)}`,
                          }}
                        >
                          {p.desc}
                        </Typography>
                      </Box>
                    </PillarRow>
                  </CardContent>
                </PillarCard>
              );
            })}
          </PillarsStack>

          {/* Right: Vertical image */}
          <RightImageWrap>
            <RightImage src={rightImageSrc} alt={rightImageAlt} />
            <ImageOverlay />
            {/* Top accent beam */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${alpha(
                  ACCENT,
                  0.0
                )} 0%, ${ACCENT} 30%, ${ACCENT} 70%, ${alpha(ACCENT, 0.0)} 100%)`,
              }}
            />
          </RightImageWrap>
        </GridWrap>
      </Container>
    </SectionWrap>
  );
}
