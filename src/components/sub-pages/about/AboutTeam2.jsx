import React from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

/* --------------------------- Styles --------------------------- */
const Section = styled(Box)({
  position: "relative",
  width: "100%",
  paddingBlock: "80px",
  background: "#E8E5DD",
  color: "#1a1a1a",
});

const SerifHeading = styled(Typography)({
  fontFamily: "serif",
  fontWeight: 400,
  color: "#1a1a1a",
});

const TeamImage = styled("img")({
  display: "block",
  width: "100%",
  height: "auto",
  borderRadius: "16px",
  objectFit: "cover",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
});

const MemberChip = styled(Chip)({
  backgroundColor: "transparent",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: 8,
  color: "#444",
  fontWeight: 500,
  fontSize: "0.95rem",
  padding: "4px 4px",
  "& .MuiChip-label": {
    paddingInline: 12,
  },
});

/* ------------------------------ Component ------------------------------ */
export default function MeetTheTeamOneImage({
  title = "Meet the Team",
  subtitle = "People behind the mission",
  photoSrc = "/about/team.JPG",
  photoAlt = "Our team",
  members = [
    "Isabel Clark",
  ],
}) {
  return (
    <Section>
      <Container maxWidth="lg">
        {/* Headline block */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 2,
              color: "#666",
              display: "block",
              mb: 1,
            }}
          >
            {subtitle}
          </Typography>

          <SerifHeading
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.1,
            }}
          >
            {title}
          </SerifHeading>
        </Box>

        {/* Hero photo */}
        <Box sx={{ mb: 8, maxWidth: 1000, mx: "auto" }}>
          <TeamImage src={photoSrc} alt={photoAlt} />
        </Box>

        {/* Names */}
        <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{ mb: 3, color: "#1a1a1a", fontWeight: 600 }}
          >
            Our Dedicated Team
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5 }}>
            {members.map((name) => (
              <MemberChip key={name} label={name} variant="outlined" />
            ))}
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
