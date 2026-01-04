// src/components/sections/CTABanner.jsx
import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

/* ----------------------------- Tokens ----------------------------- */
const KELLY = "#339c5e";

const Background = styled(Box)(({ theme }) => ({
  background: "#E8E5DD",
}));
/* Full-bleed wrapper */
const Wrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
  borderRadius: 22,
  color: "#fff",
  overflow: "hidden",
  background: `
    radial-gradient(1200px 1200px at 90% -20%, ${alpha("#fff", 0.18)} 0%, transparent 60%),
    radial-gradient(900px 900px at -10% 110%, ${alpha("#000", 0.25)} 0%, transparent 60%),
    linear-gradient(180deg, ${KELLY}, ${KELLY})
  `,
  borderTop: `1px solid ${alpha("#000", 0.08)}`,
  borderBottom: `1px solid ${alpha("#000", 0.08)}`,
}));

const Pattern = styled("div")(({ theme }) => ({
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
  backgroundImage: `
    linear-gradient(0deg, ${alpha("#fff", 0.06)} 1px, transparent 1px),
    linear-gradient(90deg, ${alpha("#fff", 0.06)} 1px, transparent 1px)
  `,
  backgroundSize: "22px 22px, 22px 22px",
  mixBlendMode: "overlay",
  opacity: 0.35,
}));

const CTAButton = styled(Button)(({ theme }) => ({
  borderRadius: 14,
  textTransform: "none",
  fontWeight: 800,
  padding: "12px 18px",
  boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
}));

/* ----------------------------- Component ----------------------------- */
const CTABanner = ({
  title = "Honor Sean’s Legacy—Give Hope Today",
  subtitle =
  "Your gift powers youth sports, counseling, and mentorship that build mental resiliency and community.",
  primaryLabel = "Donate Now",
  onPrimary = () => window.location.assign("/#/give"),
  secondaryLabel = "Learn More",
  onSecondary = () => window.location.assign("/#/about"),
  extra = null,
}) => {
  return (
    <Background>
      <Wrap
        component={motion.section}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Pattern />

        {/* full-width container with comfy gutters */}
        <Container
          maxWidth={false}
          disableGutters
          sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}
        >
          {/* Centered column */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.55, ease: "easeOut" }}
            sx={{
              textAlign: "center",
              maxWidth: 900,
              mx: "auto",
            }}
          >
            <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.9 }}>
              MAKE AN IMPACT
            </Typography>

            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.5,
                mt: 0.5,
                lineHeight: 1.15,
              }}
            >
              {title}
            </Typography>

            <Typography variant="body1" sx={{ mt: 1.5, opacity: 0.92 }}>
              {subtitle}
            </Typography>

            {/* Buttons centered below subtitle */}
            <Stack
              direction="row"
              spacing={1.5}
              justifyContent="center"
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
              sx={{ mt: 3 }}
            >
              <CTAButton
                size="large"
                variant="contained"
                color="inherit"
                onClick={onPrimary}
                startIcon={<VolunteerActivismRoundedIcon />}
                sx={{
                  background: "#fff",
                  color: KELLY,
                  "&:hover": { background: alpha("#fff", 0.92) },
                }}
                aria-label={primaryLabel}
              >
                {primaryLabel}
              </CTAButton>

              <CTAButton
                size="large"
                variant="outlined"
                onClick={onSecondary}
                startIcon={<FavoriteRoundedIcon />}
                sx={{
                  borderColor: alpha("#fff", 0.9),
                  color: "#fff",
                  "&:hover": { borderColor: "#fff", background: alpha("#fff", 0.08) },
                }}
                aria-label={secondaryLabel}
              >
                {secondaryLabel}
              </CTAButton>
            </Stack>

            {/* Optional tiny line under buttons (centered) */}
            {extra && (
              <Box sx={{ mt: 1.5, opacity: 0.82 }}>
                {extra}
              </Box>
            )}
          </Box>
        </Container>
      </Wrap>
    </Background>
  );
};

export default CTABanner;
