// src/components/sections/CTABanner.jsx
import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

/* ---------------------------- Design Tokens ---------------------------- */
const KELLY = "#339c5e";
const KELLY_DARK = "#2a7d4a";
const SURFACE = "#E8E5DD";

/* ------------------------------- Wrappers ------------------------------ */
// Full-bleed bar with no gradient
const SectionBg = styled(Box)({
  backgroundColor: KELLY,
  position: "relative",
  width: "100%",
});

// Edge-to-edge section, no border radius, no gradient
const Wrap = styled(Box)(({ theme }) => ({
  width: "100%",
  color: "#fff",
  borderRadius: 0,
  backgroundColor: KELLY,
  // keep the shadow subtle so it still lifts from the cream page
  boxShadow: `0 18px 40px -18px ${alpha("#000", 0.25)}, 0 6px 16px -6px ${alpha("#000", 0.12)}`,
}));

/* ------------------------------- Buttons ------------------------------ */
const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  color: KELLY,
  borderRadius: 14,
  padding: "12px 22px",
  fontWeight: 800,
  textTransform: "none",
  letterSpacing: 0.2,
  boxShadow: `0 8px 22px ${alpha("#000", 0.18)}`,
  "&:hover": { backgroundColor: alpha("#fff", 0.92), color: KELLY_DARK },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  borderColor: alpha("#fff", 0.7),
  background: "transparent",
  borderRadius: 14,
  padding: "12px 20px",
  textTransform: "none",
  fontWeight: 800,
  borderWidth: 2,
  "&:hover": { background: alpha("#fff", 0.08), borderColor: "#fff" },
}));

/* ------------------------------ Component ----------------------------- */
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
    // Full width, no gutters to truly hit the edges
    <SectionBg>
      <Container maxWidth={false} disableGutters>
        <Wrap
          component={motion.section}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Donate call to action"
        >
          {/* Inner container keeps the same width rhythm as the section above */}
          <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
            <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
              {/* Content */}
              <Grid item xs={12} md={8}>
                <Typography
                  variant="overline"
                  sx={{
                    letterSpacing: 2.5,
                    opacity: 0.9,
                    display: "block",
                    fontWeight: 700,
                  }}
                >
                  Make an impact
                </Typography>

                <Typography
                  component="h2"
                  sx={{
                    fontWeight: 900,
                    lineHeight: 1.08,
                    letterSpacing: -0.5,
                    fontSize: { xs: "clamp(28px, 7vw, 40px)", md: "clamp(42px, 3.5vw, 52px)" },
                    mt: 1,
                  }}
                >
                  {title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    maxWidth: 680,
                    opacity: 0.95,
                    fontSize: { xs: 16, md: 18 },
                    lineHeight: 1.6,
                  }}
                >
                  {subtitle}
                </Typography>
              </Grid>

              {/* Actions */}
              <Grid item xs={12} md={4}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
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
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1.5,
                      textAlign: { xs: "left", md: "right" },
                      opacity: 0.9,
                    }}
                  >
                    {extra}
                  </Typography>
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
