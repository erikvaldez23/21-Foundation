// src/components/sections/StoryMission.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Chip,
  useTheme,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { motion } from "framer-motion";
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
  borderTop: "1px solid rgba(0,0,0,0.08)",
  borderBottom: "1px solid rgba(0,0,0,0.08)",
  overflow: "hidden",
}));

/* --------------------------------- UI --------------------------------- */
const StoryMission = ({
  title = "Sean’s Story & Our Mission",
  subtitle = "Inspired by Sean Clark’s spirit, our mission is to empower young people to thrive by fostering mental resiliency through the positive influence of sports, friendship, family and faith.",
  story =
    "Sean’s kindness, courage, and love for bringing people together continue to light the way for our work. What began as a tribute to his life has grown into a movement that champions mental well-being and community support for youth.",
  mission =
    "We create programs that build resilience: youth sports and mentorship, access to mental health resources, and community initiatives that foster belonging. Every action is designed to help young people advocate for themselves and others.",
  ctaLabel = "Give in Sean’s Honor",
  onCta = () => {},
  image = "/image29.JPG",
  caption = "Outreach in action—every moment shaped by kindness and courage.",
  pullquote = {
    name: "Family of Sean",
    role: "Founding Inspiration",
    avatar: "/image29.JPG",
    quote:
      "Sean reminded us that small acts of kindness can change the course of a life.",
  },
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
  const theme = useTheme();

  return (
    <SectionWrap id="story" sx={{ py: { xs: 8, md: 12 } }}>
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
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            sx={{
              position: "relative",
              minHeight: { xs: 280, md: 460 },
              borderRadius: 3,
              overflow: "hidden",
              background: "#111",
              // softer, modern
              boxShadow: "0 14px 28px rgba(0,0,0,0.12)",
              border: `1px solid ${alpha("#000", 0.08)}`,
            }}
          >
            <Box
              component="img"
              src={image}
              alt="Sean’s story"
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

          {/* Right: Content (60%), text over section bg (no card) */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
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
              OUR PURPOSE
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

            <Typography
              variant="body1"
              sx={{ color: alpha("#000", 0.8), mb: 2 }}
            >
              {subtitle}
            </Typography>

            {/* Pillars as Chips */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2, mb: 2.5 }}>
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

            {/* Story + Mission */}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.75 }}>
              Sean’s Story
            </Typography>
            <Typography variant="body1" sx={{ color: alpha("#000", 0.82), mb: 2 }}>
              {story}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.75 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ color: alpha("#000", 0.82) }}>
              {mission}
            </Typography>

            {/* Pull quote */}
            {pullquote?.quote && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  background: alpha(ACCENT, 0.07),
                  border: `1px solid ${alpha(ACCENT, 0.22)}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <FormatQuoteRoundedIcon
                    fontSize="small"
                    sx={{ color: alpha(ACCENT, 0.6), mt: "2px" }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontStyle: "italic", lineHeight: 1.5 }}
                  >
                    “{pullquote.quote}”
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mt: 1.25 }}>
                  {pullquote.avatar && (
                    <Avatar
                      src={pullquote.avatar}
                      alt={pullquote.name}
                      sx={{ width: 28, height: 28 }}
                    />
                  )}
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {pullquote.name}
                  </Typography>
                  {pullquote.role && (
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      • {pullquote.role}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}

            {/* CTA */}
            <Box sx={{ mt: 3 }}>
              <Button
                onClick={onCta}
                size="large"
                variant="contained"
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
