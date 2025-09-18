// src/components/sections/StoryMission.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import PsychologyAltOutlinedIcon from "@mui/icons-material/PsychologyAltOutlined";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

/* ---------------------------- Design Tokens ---------------------------- */
const ACCENT = "#339c5e"; // Kelly green

const SectionWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: "#0e1113",
  background: "#E8E5DD",
  overflow: "hidden",
}));

/* --------------------------------- UI --------------------------------- */
const StoryMission = ({
  title = "About the Sean Clark 21 Foundation",
  ctaLabel = "Give in Sean’s Honor",
  onCta = () => {},
  image = "/about/about.JPG",
  caption = "Promoting mental health awareness. Encouraging everyone to reach out.",
  pullquote = {
    name: "Family of Sean",
    role: "Founding Inspiration",
    avatar: "/about/about.JPG",
    quote:
      "If we all pay attention and approach others with kindness, we can make a difference and save lives.",
  },
  // keep the same four chips (optional branding)
  pillars = [
    {
      label: "Sports + Mentorship",
      icon: <SportsBasketballOutlinedIcon fontSize="small" />,
    },
    {
      label: "Mental Resiliency",
      icon: <PsychologyAltOutlinedIcon fontSize="small" />,
    },
    {
      label: "Friendship + Family",
      icon: <Diversity3OutlinedIcon fontSize="small" />,
    },
    {
      label: "Faith & Compassion",
      icon: <FavoriteBorderRoundedIcon fontSize="small" />,
    },
  ],
}) => {
  return (
    <SectionWrap id="story">
      <Container maxWidth="xl">
        {/* 1-col on xs; 40/60 from sm+ */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "40% 60%" },
            gap: { xs: 3, md: 4 },
            alignItems: "stretch",
          }}
        >
          {/* Left: Media (40%) */}
          <Box
            sx={{
              position: "relative",
              minHeight: { xs: 280, md: 460 },
              borderRadius: 3,
              overflow: "hidden",
              background: "#111",
              boxShadow: "0 14px 28px rgba(0,0,0,0.12)",
              border: `1px solid ${alpha("#000", 0.08)}`,
            }}
          >
            <Box
              component="img"
              src={image}
              alt="About the Sean Clark 21 Foundation"
              loading="lazy"
              decoding="async"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Minimal floating caption */}
            <Box
              sx={{
                position: "absolute",
                left: 16,
                bottom: 16,
                px: 1.25,
                py: 0.75,
                borderRadius: 999,
                bgcolor: alpha("#000", 0.5),
                color: "#fff",
                border: `1px solid ${alpha("#fff", 0.18)}`,
                fontSize: 12.5,
                lineHeight: 1.2,
                backdropFilter: "blur(6px)",
              }}
            >
              {caption}
            </Box>
          </Box>

          {/* Right: Content (60%), text over section bg */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: { xs: 1, sm: 2, md: 3 },
            }}
          >
            {/* Eyebrow + Title */}
            <Typography
              variant="overline"
              sx={{
                letterSpacing: 2,
                color: alpha("#000", 0.6),
                mb: 1,
                fontSize: { xs: 11, md: 12 },
              }}
            >
              ABOUT US
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontWeight: 800,
                lineHeight: 1.15,
                fontSize: { xs: "clamp(24px, 5vw, 32px)", md: 36 },
                mb: 1.25,
              }}
            >
              {title}
            </Typography>

            {/* New Content */}
            <Typography variant="body1" sx={{ color: alpha("#000", 0.85), mb: 2 }}>
              The Sean Clark 21 Foundation was created to promote mental health
              awareness following the devastating loss of our beloved son Sean
              Clark, age 14. Unfortunately, most people encounter bullying,
              anxiety, depression and feelings of distress at various points in
              their lives.
            </Typography>

            <Typography variant="body1" sx={{ color: alpha("#000", 0.85), mb: 2 }}>
              The foundation aims to stop the stigma and taboo related to
              speaking openly about mental health and suicide. We want to create
              open communication and encourage anyone struggling with their
              mental health to feel empowered to <strong>REACH OUT</strong> and
              seek help—either through friends and family or by utilizing{" "}
              <strong>#988</strong>, the number for the mental crisis hotline
              nationwide.
            </Typography>

            <Typography variant="body1" sx={{ color: alpha("#000", 0.85), mb: 2 }}>
              Mental health is not discriminatory; it affects all genders,
              religions, social statuses and ages. We focus our efforts on the
              younger population to try and target the problem at the root.
              Suicide has been reported in children as young as 7 years old. The
              Sean Clark 21 Foundation wants you to know you are never alone.
              Our goal is to provide and spread information and awareness for
              young people to know how to handle their feelings at the moment
              they arise.
            </Typography>

            <Typography variant="body1" sx={{ color: alpha("#000", 0.85) }}>
              Suicide can be preventable, and if we all pay attention and
              approach others with kindness, we can make a difference and save
              lives.
            </Typography>

            {/* Optional Pillars */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2, mt: 2.5 }}>
              {pillars.map((p, i) => (
                <Chip
                  key={i}
                  icon={p.icon}
                  label={p.label}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: alpha(ACCENT, 0.35),
                    color: ACCENT,
                    bgcolor: alpha(ACCENT, 0.08),
                    "& .MuiChip-icon": { color: ACCENT },
                    fontWeight: 600,
                  }}
                />
              ))}
            </Box>

            {/* CTA */}
            <Box sx={{ mt: 3 }}>
              <Button
                onClick={onCta}
                size="large"
                variant="contained"
                fullWidth
                disableElevation
                sx={{
                  px: 3,
                  py: 1.25,
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: "none",
                  bgcolor: ACCENT,
                  "&:hover": { bgcolor: alpha(ACCENT, 0.92) },
                }}
              >
                {ctaLabel}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </SectionWrap>
  );
};

export default StoryMission;
