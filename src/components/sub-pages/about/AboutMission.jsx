// src/components/about/MissionPlus.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { motion } from "framer-motion";

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  background: "#E8E5DD",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
}));

// soft radial highlights for depth
const Radial = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: -200,
  pointerEvents: "none",
  background: `
    radial-gradient(600px 600px at 10% 10%, ${alpha("#ffffff", 0.55)} 0%, transparent 55%),
    radial-gradient(700px 700px at 90% 30%, ${alpha("#ffffff", 0.35)} 0%, transparent 60%)
  `,
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 800,
  letterSpacing: 0.2,
  color: "#111",
  fontSize: "clamp(2rem, 6vw, 3.25rem)",
  lineHeight: 1.05,
  marginBottom: theme.spacing(2),
}));

const Sub = styled(Typography)(({ theme }) => ({
  color: "rgba(0,0,0,.78)",
  fontSize: "1.05rem",
}));

const PillarCard = styled(motion.div)(({ theme }) => ({
  position: "relative",
  borderRadius: 16,
  padding: theme.spacing(3),
  background: alpha("#FFFFFF", 0.65),
  border: "1px solid rgba(0,0,0,.08)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow:
    "0 10px 30px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.6)",
  transition: "transform .25s ease, box-shadow .25s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      "0 16px 40px rgba(0,0,0,.10), inset 0 1px 0 rgba(255,255,255,.7)",
  },
}));

const IconWrap = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  background:
    "linear-gradient(135deg, #2FA652 0%, #45BE6C 100%)",
  color: "#fff",
  boxShadow: "0 8px 20px rgba(47,166,82,.3)",
}));

const ListArrow = styled(ArrowForwardIosRoundedIcon)(({ theme }) => ({
  fontSize: 16,
  opacity: 0.6,
  marginLeft: theme.spacing(0.75),
}));

export default function MissionPlus({
  id = "mission",
  accent = "#2FA652",
  title = "Our Mission",
  tagline = "Connection. Outreach. Support.",
  blurb = `We honor Sean’s legacy by fostering connection, encouraging outreach, and supporting mental wellness. Through events, partnerships, and year-round programs, we bring people together to celebrate compassion and to ensure help is always within reach.`,
  highlightChips = [
    "988 Lifeline Awareness",
    "Welcoming Spaces",
    "Community Support",
  ],
  pillars = [
    {
      title: "Reach",
      text:
        "Expand awareness for mental health resources, including the 988 Lifeline.",
      icon: <CampaignRoundedIcon />,
    },
    {
      title: "Include",
      text:
        "Create welcoming spaces where every person belongs.",
      icon: <Diversity3RoundedIcon />,
    },
    {
      title: "Support",
      text:
        "Fund initiatives that lift up families, students, and neighbors.",
      icon: <VolunteerActivismRoundedIcon />,
    },
  ],
}) {
  const container = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  };
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  return (
    <Section id={id} aria-labelledby={`${id}-title`}>
      <Radial />

      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Left: copy */}
          <Grid item xs={12} md={6}>
            <Headline id={`${id}-title`}>{title}</Headline>

            <Typography
              variant="overline"
              sx={{
                display: "inline-block",
                mb: 1.5,
                letterSpacing: ".12em",
                fontWeight: 700,
                color: accent,
              }}
            >
              {tagline}
            </Typography>

            <Sub sx={{ mb: 3 }}>{blurb}</Sub>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {highlightChips.map((c) => (
                <Chip
                  key={c}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {c}
                      <ListArrow />
                    </Box>
                  }
                  sx={{
                    bgcolor: alpha("#fff", 0.8),
                    border: "1px solid rgba(0,0,0,.08)",
                    backdropFilter: "blur(6px)",
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>
          </Grid>

          {/* Right: pillars */}
          <Grid item xs={12} md={6}>
            <Grid
              container
              spacing={2.5}
              component={motion.div}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {pillars.map((p, i) => (
                <Grid key={p.title} item xs={12} sm={6}>
                  <PillarCard variants={item}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <IconWrap sx={{
                        background: `linear-gradient(135deg, ${accent} 0%, ${alpha(accent, 0.8)} 100%)`,
                      }}>
                        {p.icon}
                      </IconWrap>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: "#111" }}>
                          {p.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(0,0,0,.78)" }}>
                          {p.text}
                        </Typography>
                      </Box>
                    </Stack>
                  </PillarCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}
