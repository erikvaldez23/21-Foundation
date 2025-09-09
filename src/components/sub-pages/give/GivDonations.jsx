// src/components/sections/DonationsSection.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  TextField,
  InputAdornment,
  Button,
  LinearProgress,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

/* ---------------------------- Design Tokens ---------------------------- */
const ACCENT = "#339c5e";            // Kelly green
const INK = "#0e1113";
const CANVAS = "#E8E5DD";            // your site background
const HAIRLINE = "rgba(0,0,0,0.08)";

/* ----------------------------- Chrome --------------------------------- */
const SectionWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: INK,
  background: CANVAS,
  borderTop: `1px solid ${HAIRLINE}`,
  borderBottom: `1px solid ${HAIRLINE}`,
  overflow: "hidden",
}));

const Glow = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: "auto -22% -40% -22%",
  height: 520,
  pointerEvents: "none",
  filter: "blur(80px)",
  background: `radial-gradient(60% 60% at 50% 50%, ${alpha(ACCENT, 0.22)} 0%, transparent 60%)`,
}));

/* ---------------------------- Helpers --------------------------------- */
const pretty = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/* ---------------------------- Component -------------------------------- */
const DonationsSection = ({
  title = "Make a Gift",
  subtitle = "Your support fuels outreach, mentorship, and counseling—advancing Sean’s legacy of kindness and courage.",
  presets = [25, 50, 100, 250, 500],
  defaultFreq = "one-time",
  defaultAmount = 50,
  buttonLabel = "Donate",
  disclaimer = "Donations are tax-deductible where applicable. You’ll receive an email receipt.",
  image = "/image29.JPG",
  imageCaption = "Your generosity in action.",
  progress = { raised: 200, goal: 10000 }, // set to null to hide
  onDonate = (payload) => console.log("Donate payload:", payload),
}) => {
  const [freq, setFreq] = useState(defaultFreq);
  const [amount, setAmount] = useState(defaultAmount);
  const [custom, setCustom] = useState("");

  const displayAmount = useMemo(() => {
    const c = Number(custom.replace(/[^\d]/g, "")) || 0;
    return custom ? c : amount;
  }, [custom, amount]);

  const pct = useMemo(() => {
    if (!progress) return null;
    const p = Math.min(100, Math.round((progress.raised / progress.goal) * 100));
    return Number.isFinite(p) ? p : null;
  }, [progress]);

  const isValid = displayAmount >= 1;

  const handlePreset = (val) => {
    setAmount(val);
    setCustom("");
  };

  const handleDonate = () => {
    const finalAmount = Math.max(1, displayAmount);
    onDonate({ frequency: freq, amount: finalAmount, currency: "USD" });
  };

  return (
    <SectionWrap id="donate" sx={{ py: { xs: 8, md: 12 }, px: 4 }}>
      <Glow />
      <Container maxWidth="xl">
        {/* ---- GRID: 60% form / 40% image ---- */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "60% 40%" },
            gap: { xs: 3, md: 6 },
            alignItems: "stretch",
          }}
        >
          {/* Left: Form (Apple-ish minimalism) */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: { xs: 2, md: 1 },
              textAlign: { xs: "center", md: "left" },
              maxWidth: 720,
              mx: { xs: "auto", md: 0 },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                display: "block",
                letterSpacing: 2,
                color: alpha(INK, 0.55),
                mb: 1,
                fontSize: { xs: 11, md: 12 },
              }}
            >
              SUPPORT THE MISSION
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontWeight: 800,
                letterSpacing: -0.4,
                lineHeight: 1.06,
                fontSize: { xs: "clamp(28px, 6vw, 40px)", md: 44 },
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="body1"
                sx={{
                  mt: 1.25,
                  opacity: 0.82,
                  fontSize: { xs: "1rem", md: "1.05rem" },
                }}
              >
                {subtitle}
              </Typography>
            )}

            {/* Hairline divider for rhythm */}
            <Divider sx={{ my: { xs: 3, md: 3.5 }, borderColor: HAIRLINE }} />

            {/* Frequency */}
            <ToggleButtonGroup
              exclusive
              value={freq}
              onChange={(_, v) => v && setFreq(v)}
              sx={{
                "& .MuiToggleButton-root": {
                  textTransform: "none",
                  px: 2.25,
                  borderRadius: 999,
                  borderColor: alpha(INK, 0.12),
                  transition: "background .2s ease, border-color .2s ease",
                  "&.Mui-selected": {
                    bgcolor: alpha(ACCENT, 0.12),
                    borderColor: alpha(ACCENT, 0.4),
                    color: ACCENT,
                  },
                },
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 1
              }}
              aria-label="Donation frequency"
            >
              <ToggleButton value="one-time">One-time</ToggleButton>
              <ToggleButton value="monthly">Monthly</ToggleButton>
            </ToggleButtonGroup>

            {/* Presets */}
            <Box
              sx={{
                mt: 2.25,
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              {presets.map((p) => {
                const active = !custom && amount === p;
                return (
                  <Chip
                    key={p}
                    label={pretty(p)}
                    onClick={() => handlePreset(p)}
                    clickable
                    variant={active ? "filled" : "outlined"}
                    sx={{
                      fontWeight: 700,
                      borderRadius: 999,
                      borderColor: active ? alpha(ACCENT, 0.35) : alpha(INK, 0.18),
                      color: active ? "#fff" : INK,
                      bgcolor: active ? ACCENT : alpha(ACCENT, 0.06),
                      "&:hover": {
                        bgcolor: active ? alpha(ACCENT, 0.9) : alpha(ACCENT, 0.12),
                      },
                    }}
                  />
                );
              })}
            </Box>

            {/* Custom amount */}
            <Box sx={{ mt: 2.25, maxWidth: 360, mx: { xs: "auto", md: 0 } }}>
              <TextField
                fullWidth
                inputMode="numeric"
                value={custom}
                placeholder="Custom amount"
                onChange={(e) => setCustom(e.target.value)}
                aria-label="Custom donation amount"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 14,
                    bgcolor: "#fff",
                    transition: "box-shadow .2s ease, border-color .2s ease",
                    "& fieldset": { borderColor: alpha(INK, 0.16) },
                    "&:hover fieldset": { borderColor: alpha(ACCENT, 0.45) },
                    "&.Mui-focused": {
                      boxShadow: `0 0 0 3px ${alpha(ACCENT, 0.18)}`,
                    },
                    "&.Mui-focused fieldset": { borderColor: ACCENT },
                  },
                }}
              />
            </Box>

            {/* Progress (thin, precise) */}
            {progress && pct !== null && (
              <Box sx={{ mt: 3.5, maxWidth: 560, mx: { xs: "auto", md: 0 } }}>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    backgroundColor: alpha(ACCENT, 0.12),
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 999,
                      backgroundColor: ACCENT,
                    },
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    color: ACCENT,
                    letterSpacing: 0.2,
                  }}
                >
                  {pretty(progress.raised)} raised
                  <Typography component="span" sx={{ mx: 1, color: alpha(INK, 0.35) }}>
                    •
                  </Typography>
                  {pct}% of {pretty(progress.goal)} goal
                </Typography>
              </Box>
            )}

            {/* CTA Row: Primary + Apple Pay style */}
            <Box
              sx={{
                mt: 3.5,
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                size="large"
                disableElevation
                onClick={handleDonate}
                disabled={!isValid}
                sx={{
                  px: 3,
                  py: 1.25,
                  fontWeight: 800,
                  borderRadius: 12,
                  textTransform: "none",
                  bgcolor: isValid ? ACCENT : alpha(ACCENT, 0.35),
                  color: "#fff",
                  transition: "transform .06s ease, background .2s ease",
                  "&:hover": {
                    bgcolor: isValid ? alpha(ACCENT, 0.92) : alpha(ACCENT, 0.35),
                    transform: isValid ? "translateY(-1px)" : "none",
                  },
                  "&:active": { transform: "translateY(0)" },
                }}
              >
                {buttonLabel} {isValid ? `• ${pretty(displayAmount)}${freq === "monthly" ? "/mo" : ""}` : ""}
              </Button>

              {/* Visual-only Apple Pay style button (wire up via Stripe/Apple Pay if desired) */}
              <Button
                size="large"
                variant="outlined"
                sx={{
                  px: 2.5,
                  py: 1.25,
                  borderRadius: 12,
                  textTransform: "none",
                  fontWeight: 700,
                  borderColor: alpha(INK, 0.2),
                  color: INK,
                  bgcolor: "#fff",
                  "&:hover": { borderColor: alpha(INK, 0.35), bgcolor: "#fff" },
                }}
                onClick={() => {
                  // integrate with Stripe Payment Request Button for Apple Pay here
                  onDonate({ frequency: freq, amount: Math.max(1, displayAmount), currency: "USD", method: "apple-pay" });
                }}
              >
                {/* Simple Apple Pay mark mimic without assets */}
                <Box component="span" sx={{ fontSize: 16, fontWeight: 800, mr: 1 }}></Box> Pay
              </Button>
            </Box>

            {disclaimer && (
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 1.5, color: alpha(INK, 0.6) }}
              >
                {disclaimer}
              </Typography>
            )}
          </Box>

          {/* Right: Vertical Image (40%) */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            sx={{
              position: "relative",
              minHeight: { xs: 300, md: 560 },
              borderRadius: 3,
              overflow: "hidden",
              background: "#111",
              boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
              border: `1px solid ${alpha("#000", 0.06)}`,
            }}
          >
            <Box
              component="img"
              src={image}
              alt="Donation"
              loading="lazy"
              decoding="async"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        </Box>
      </Container>
    </SectionWrap>
  );
};

export default DonationsSection;
