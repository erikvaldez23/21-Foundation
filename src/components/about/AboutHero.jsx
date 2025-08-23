// src/components/about/Hero.jsx
import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "60vh",
  display: "flex",
  alignItems: "center",
  color: "#fff",
  overflow: "hidden",
  paddingTop: theme.spacing(8), // add/topbar offset if your topbar is fixed
}));

const HeroBg = styled("div")({
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "contrast(1.05) saturate(1.05)",
});

const HeroOverlay = styled("div")(() => ({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(90deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.20) 100%)",
  backdropFilter: "saturate(160%) blur(2px)",
  WebkitBackdropFilter: "saturate(160%) blur(2px)",
}));

const Pill = styled(Button)(() => ({
  borderRadius: 9999,
  textTransform: "none",
  fontWeight: 700,
  padding: "10px 22px",
  backgroundColor: "#2FA652",
  color: "#fff",
  "&:hover": { backgroundColor: "#268a45" },
}));

export default function Hero({
  title = "About Clark21Foundation",
  subtitle = "We rally kindness, support, and community—so everyone feels seen and included.",
  heroImage = "/image1.JPG",
  ctaHref = "#mission",
  ctaLabel = "Our Mission",
}) {
  return (
    <HeroWrap>
      <HeroBg aria-hidden style={{ backgroundImage: `url("${heroImage}")` }} />
      <HeroOverlay aria-hidden />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "serif",
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 2,
                textShadow: "0 2px 8px rgba(0,0,0,.45)",
                fontSize: { xs: "2.25rem", sm: "3rem", md: "3.5rem", lg: "4rem" },
              }}
            >
              {title}
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, maxWidth: 700, opacity: 0.95 }}>
              {subtitle}
            </Typography>
            <Pill href={ctaHref}>{ctaLabel}</Pill>
          </Grid>
        </Grid>
      </Container>
    </HeroWrap>
  );
}
