// components/InspirationalQuote.jsx
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Section = styled(Box)(({ theme }) => ({
  background: "#2FA652", // Kelly green
  color: "#fff",
  position: "relative",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  overflow: "hidden",
}));

const QuoteMark = styled("span")(({ theme }) => ({
  position: "absolute",
  fontFamily: "Georgia, serif",
  fontWeight: 700,
  color: "rgba(255,255,255,0.18)",
  lineHeight: 1,
  userSelect: "none",
  pointerEvents: "none",
}));

export default function Quote({
  quote = "Inspired by Sean Clark’s spirit, our mission is to empower young people to thrive by fostering mental resiliency through the positive influence of sports, friendship, family and faith-instilling a culture of kindness and courage to advocate for themselves and others.",
  author = "Clark21Foundation",
}) {
  return (
    <Section>
      {/* decorative quote marks */}
      <QuoteMark style={{ fontSize: 180, top: -20, left: 16 }}>“</QuoteMark>
      <QuoteMark style={{ fontSize: 180, bottom: -60, right: 16 }}>”</QuoteMark>

      <Container maxWidth="md">
        <Box component="blockquote" sx={{ m: 0 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: 0.2,
              mb: 2,
            }}
          >
            {quote}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", opacity: 0.9 }}
          >
            — {author}
          </Typography>
        </Box>
      </Container>
    </Section>
  );
}
