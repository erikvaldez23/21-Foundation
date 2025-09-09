// src/components/sections/CTABanner.jsx
import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

/* -------------------------------------------------------------------------- */
/*                               Design Tokens                                */
/* -------------------------------------------------------------------------- */
const KELLY = "#339c5e"; // your brand green

const Wrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: "#fff",
  overflow: "hidden",
  background:
    `radial-gradient(1200px 1200px at 90% -20%, ${alpha("#fff", 0.18)} 0%, transparent 60%),\n     radial-gradient(900px 900px at -10% 110%, ${alpha("#000", 0.25)} 0%, transparent 60%),\n     linear-gradient(180deg, ${KELLY}, ${KELLY})`,
  borderTop: `1px solid ${alpha("#000", 0.08)}`,
  borderBottom: `1px solid ${alpha("#000", 0.08)}`,
}));

const Pattern = styled("div")(({ theme }) => ({
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
  backgroundImage:
    `linear-gradient(0deg, ${alpha("#fff", 0.06)} 1px, transparent 1px),\n     linear-gradient(90deg, ${alpha("#fff", 0.06)} 1px, transparent 1px)` ,
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

/* -------------------------------------------------------------------------- */
/*                                CTA Banner                                   */
/* -------------------------------------------------------------------------- */
/**
 * @param {Object} props
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {string} [props.primaryLabel]
 * @param {() => void} [props.onPrimary]
 * @param {string} [props.secondaryLabel]
 * @param {() => void} [props.onSecondary]
 * @param {React.ReactNode} [props.extra]
 */
const CTABanner = ({
  title = "Honor Sean’s Legacy—Give Hope Today",
  subtitle =
    "Your gift powers youth sports, counseling, and mentorship that build mental resiliency and community.",
  primaryLabel = "Donate Now",
  onPrimary = () => window.location.assign("/give"),
  secondaryLabel = "Give Monthly",
  onSecondary = () => window.location.assign("/give?frequency=monthly"),
  extra = null,
}) => {
  return (
    <Wrap component={motion.section} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: "easeOut" }}>
      <Pattern />
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box component={motion.div} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05, duration: 0.55, ease: "easeOut" }}>
              <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.9 }}>
                MAKE AN IMPACT
              </Typography>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 900, letterSpacing: -0.5, mt: 0.5, lineHeight: 1.15 }}>
                {title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1.5, maxWidth: 820, opacity: 0.92 }}>
                {subtitle}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box component={motion.div} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
                 sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
              <CTAButton
                size="large"
                variant="contained"
                color="inherit"
                onClick={onPrimary}
                startIcon={<VolunteerActivismRoundedIcon />}
                sx={{ background: "#fff", color: KELLY, "&:hover": { background: alpha("#fff", 0.92) } }}
                aria-label={primaryLabel}
              >
                {primaryLabel}
              </CTAButton>

              <CTAButton
                size="large"
                variant="outlined"
                onClick={onSecondary}
                startIcon={<FavoriteRoundedIcon />}
                sx={{ borderColor: alpha("#fff", 0.9), color: "#fff", "&:hover": { borderColor: "#fff", background: alpha("#fff", 0.08) } }}
                aria-label={secondaryLabel}
              >
                {secondaryLabel}
              </CTAButton>
            </Box>

            {extra && (
              <Box sx={{ mt: 1.5, textAlign: { xs: "left", md: "right" }, opacity: 0.82 }}>
                {extra}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Wrap>
  );
};

export default CTABanner;

/* -------------------------------------------------------------------------- */
/*                                Usage Example                                 */
/* -------------------------------------------------------------------------- */
/**
 * import CTABanner from "./components/sections/CTABanner";
 *
 * <CTABanner
 *   title="Join the Movement—Live Like Sean"
 *   subtitle="Monthly gifts sustain programs all year long and provide consistent support for youth."
 *   primaryLabel="Donate Now"
 *   onPrimary={() => window.open("https://your-foundation.donate", "_blank")}
 *   secondaryLabel="Give Monthly"
 *   onSecondary={() => window.location.assign("/give?frequency=monthly")}
 *   extra={<Typography variant="caption">100% of proceeds go directly to outreach • 501(c)(3)</Typography>}
 * />
 */
