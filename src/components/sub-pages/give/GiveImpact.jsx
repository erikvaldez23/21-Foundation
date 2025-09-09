// src/components/sections/ImpactSection.jsx
import React, { useMemo } from "react";
import { Box, Container, Typography, LinearProgress } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

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

// soft, modern background glow
const Glow = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: "auto -15% -30% -15%",
  height: 420,
  pointerEvents: "none",
  filter: "blur(60px)",
  background: `radial-gradient(55% 55% at 50% 50%, ${alpha(
    ACCENT,
    0.28
  )} 0%, transparent 60%)`,
}));

/* ----------------------------- Component ------------------------------ */
const ImpactSection = ({
  title = "Impact at a Glance",
  subtitle =
    "Every gift honors Sean’s legacy—fueling outreach, mentorship, and counseling for youth in our community.",
  progress = { raised: 42000, goal: 60000 },
}) => {
  const pct = useMemo(() => {
    if (!progress) return null;
    const p = Math.min(100, Math.round((progress.raised / progress.goal) * 100));
    return Number.isFinite(p) ? p : null;
  }, [progress]);

  return (
    <SectionWrap id="impact" sx={{ py: { xs: 8, md: 12 } }}>
      <Glow />
      <Container maxWidth="xl">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{
            textAlign: "center",
            maxWidth: 900,
            mx: "auto",
            px: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              display: "block",
              letterSpacing: 2,
              color: alpha("#000", 0.6),
              mb: 1.25,
              fontSize: { xs: 11, md: 12 },
            }}
          >
            TRANSPARENT IMPACT
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: -0.5,
              lineHeight: 1.1,
              fontSize: { xs: "clamp(26px, 6vw, 36px)", md: 40 },
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                mt: 1.5,
                opacity: 0.85,
                fontSize: { xs: "1rem", md: "1.05rem" },
              }}
            >
              {subtitle}
            </Typography>
          )}

          {/* Redesigned Progress Bar */}
          {progress && pct !== null && (
            <Box sx={{ mt: 4 }}>
              <LinearProgress
                variant="determinate"
                value={pct}
                sx={{
                  height: 12,
                  borderRadius: 999,
                  backgroundColor: alpha(ACCENT, 0.15),
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${ACCENT}, ${alpha(
                      ACCENT,
                      0.8
                    )})`,
                  },
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{ mt: 1.5, fontWeight: 600, color: ACCENT }}
              >
                ${progress.raised.toLocaleString()} raised
                <Typography
                  component="span"
                  sx={{ mx: 1, color: alpha("#000", 0.4) }}
                >
                  •
                </Typography>
                {pct}% of ${progress.goal.toLocaleString()} goal
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </SectionWrap>
  );
};

export default ImpactSection;
