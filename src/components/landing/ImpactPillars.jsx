// src/components/sections/ImpactPillars.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import FamilyRestroomOutlinedIcon from "@mui/icons-material/FamilyRestroomOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";

const ACCENT = "#339c5e";

/* ------------------------------ Styles ------------------------------ */
const SectionWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: "#0a0a0a",
  background: "#E8E5DD",
  borderTop: "1px solid rgba(0,0,0,0.05)",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
}));

const PillarCard = styled(Card)(({ theme }) => ({
  height: "100%",
  position: "relative",
  borderRadius: 20,
  // light glass surface
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
  overflow: "hidden",
  transition:
    "transform .18s ease, box-shadow .18s ease, border-color .18s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    borderColor: alpha(ACCENT, 0.35),
    boxShadow: `0 14px 34px ${alpha("#000", 0.16)}`,
  },
  // thin accent bar on hover for crispness
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 3,
    background: "transparent",
    transition: "background .18s ease",
  },
  "&:hover::after": {
    background: `linear-gradient(90deg, ${alpha(ACCENT, 0.0)} 0%, ${ACCENT} 30%, ${ACCENT} 70%, ${alpha(ACCENT, 0.0)} 100%)`,
  },
}));

const IconHalo = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: 999,
  display: "grid",
  placeItems: "center",
  background: alpha(ACCENT, 0.12),
  border: `1px solid ${alpha(ACCENT, 0.35)}`,
  boxShadow: `0 0 0 6px ${alpha(ACCENT, 0.07)}`,
}));

const DividerCol = styled(Box)(({ theme }) => ({
  width: 1,
  alignSelf: "stretch",
  background:
    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.06) 70%, transparent 100%)",
  marginInline: theme.spacing(2),
  [theme.breakpoints.down("md")]: { display: "none" },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  paddingInline: 22,
  paddingBlock: 12,
  fontWeight: 700,
  background: `linear-gradient(180deg, ${ACCENT} 0%, ${alpha(ACCENT, 0.85)} 100%)`,
  color: "#fff",
  boxShadow: `0 10px 24px ${alpha(ACCENT, 0.28)}`,
  "&:hover": {
    background: `linear-gradient(180deg, ${alpha(ACCENT, 0.95)} 0%, ${ACCENT} 100%)`,
    boxShadow: `0 14px 34px ${alpha(ACCENT, 0.34)}`,
  },
}));

/* ------------------------------ Data ------------------------------ */
const PILLARS = [
  {
    title: "Sports",
    desc:
      "Build mental resilience and confidence through coaching, teamwork, and healthy competition.",
    icon: <SportsBasketballOutlinedIcon sx={{ fontSize: 26 }} />,
  },
  {
    title: "Friendship",
    desc:
      "Cultivate inclusive peer support networks where kindness and encouragement are the norm.",
    icon: <Diversity3OutlinedIcon sx={{ fontSize: 26 }} />,
  },
  {
    title: "Family",
    desc:
      "Strengthen family bonds that nurture growth, stability, and a sense of belonging.",
    icon: <FamilyRestroomOutlinedIcon sx={{ fontSize: 26 }} />,
  },
  {
    title: "Faith",
    desc:
      "Inspire courage, purpose, and compassion through values that guide and uplift.",
    icon: <VolunteerActivismOutlinedIcon sx={{ fontSize: 26 }} />,
  },
];

/* ---------------------------- Component ---------------------------- */
export default function ImpactPillars() {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  // Build: pillar | divider | pillar | ...
  const withDividers = [];
  PILLARS.forEach((p, i) => {
    withDividers.push({ type: "pillar", data: p, key: `p-${i}` });
    if (i < PILLARS.length - 1) withDividers.push({ type: "divider", key: `d-${i}` });
  });

  return (
    <SectionWrap component="section">
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 5.5, md: 7 } }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 2.5,
              color: "rgba(0,0,0,0.65)",
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            WHY IT MATTERS
          </Typography>

          <Typography
            variant="h3"
            sx={{
              mt: 1,
              fontWeight: 800,
              lineHeight: 1.12,
              color: "#0a0a0a",
              textShadow: `0 1px 18px ${alpha(ACCENT, 0.28)}`,
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
              maxWidth: 760,            // a touch narrower for balance
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

        {/* Grid with subtle column dividers on desktop */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr auto 1fr auto 1fr" },
            alignItems: "stretch",
            gap: { xs: 14, md: 0 }, // more breathing room on mobile
            mb: { xs: 6, md: 7.5 },
          }}
        >
          {withDividers.map((item) =>
            item.type === "divider" ? (
              <DividerCol key={item.key} />
            ) : (
              <PillarCard elevation={0} key={item.key}>
                <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                  <IconHalo sx={{ mb: 1.75 }}>
                    <Box sx={{ color: ACCENT }}>{item.data.icon}</Box>
                  </IconHalo>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      mb: 1,
                      color: "#0a0a0a",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.data.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "rgba(0,0,0,0.78)",
                      lineHeight: 1.75,
                    }}
                  >
                    {item.data.desc}
                  </Typography>
                </CardContent>
              </PillarCard>
            )
          )}
        </Box>
      </Container>
    </SectionWrap>
  );
}
