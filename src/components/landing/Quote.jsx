// components/InspirationalQuote.jsx
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const Section = styled(Box)(({ theme }) => ({
  // Kelly green base with a subtle top glow so it feels premium on OLED
  background: `radial-gradient(120% 100% at 50% 0%, ${alpha("#ffffff", 0.12)} 0%, transparent 45%),
               #2FA652`,
  color: "#fff",
  position: "relative",
  overflow: "hidden",
  paddingTop: `max(${theme.spacing(6)}, env(safe-area-inset-top))`,
  paddingBottom: `max(${theme.spacing(6)}, env(safe-area-inset-bottom))`,
  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
}));

const QuoteMark = styled("span")(({ theme }) => ({
  position: "absolute",
  fontFamily: "Georgia, serif",
  fontWeight: 700,
  color: "rgba(255,255,255,0.18)",
  lineHeight: 1,
  userSelect: "none",
  pointerEvents: "none",
  // shrink on mobile, grow on larger screens
  fontSize: 120,
  [theme.breakpoints.up("sm")]: { fontSize: 180 },
}));

export default function InspirationalQuote({
  quote = "Inspired by Sean Clark’s spirit, our mission is to empower young people to thrive by fostering mental resiliency through the positive influence of sports, friendship, family and faith—instilling a culture of kindness and courage to advocate for themselves and others.",
  author = "Clark21Foundation",
}) {
  return (
    <Section role="region" aria-label="Inspirational quote">
      {/* decorative quote marks (hidden from AT) */}
      {/* <QuoteMark aria-hidden style={{ top: 12, left: 12 }}>“</QuoteMark> */}
      {/* <QuoteMark aria-hidden style={{ bottom: -48, right: 12 }}>”</QuoteMark> */}

      <Container
        maxWidth="md"
        disableGutters
        sx={{
          // edge padding that respects safe areas on very small devices
          px: { xs: 2.5, sm: 3 },
          paddingLeft: { xs: "max(20px, env(safe-area-inset-left))", sm: 3 },
          paddingRight: { xs: "max(20px, env(safe-area-inset-right))", sm: 3 },
        }}
      >
        <Box
          component="blockquote"
          sx={{
            m: 0,
            // control measure (line length) for readability
            maxWidth: 820,
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            component="p"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              // Fluid size: ~22px on tiny phones → ~36px tablet → ~44px desktop
              fontSize: "clamp(1.375rem, 5.2vw, 2.75rem)",
              lineHeight: { xs: 1.25, sm: 1.22, md: 1 },
              letterSpacing: { xs: 0.1, sm: 0.15 },
              textWrap: "balance",
              hyphens: "auto",
              WebkitHyphens: "auto",
              mb: { xs: 1.5, sm: 2 },
            }}
          >
            {quote}
          </Typography>

          <Typography
            variant="subtitle1"
            component="cite"
            sx={{
              display: "block",
              opacity: 0.92,
              fontWeight: 600,
              // slightly smaller on phones
              fontSize: { xs: "0.95rem", sm: "1rem" },
              letterSpacing: 0.2,
            }}
          >
            — {author}
          </Typography>
        </Box>
      </Container>
    </Section>
  );
}
