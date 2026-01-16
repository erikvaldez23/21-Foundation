import React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  Grid,
  Divider
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/* --------------------------- Styles --------------------------- */
const Section = styled(Box)({
  position: "relative",
  width: "100%",
  paddingBlock: "100px",
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
  borderRadius: "4px", // Sharper, more editorial look
  objectFit: "cover",
  // No shadow for a cleaner, flatter editorial look, or maybe very subtle
  filter: "grayscale(10%) contrast(105%)",
});

/* ------------------------------ Component ------------------------------ */
export default function MeetTheTeamOneImage({
  title = "Our Leadership",
  subtitle = "Guiding the Mission",
  photoSrc = "/about/team.png",
  photoAlt = "Our team",
  members = [
    "Isabel Clark",
    "John Clark",
    "Tre Clark",
    "Christa Dubill",
    "Nayla Eid",
    "Michelle Hardgree",
    "Amber Hellwig",
    "Christina Pfaff",
    "Julia Pfaff",
    "Dean Wheeler",
    "Isabel Jaramillo"
  ],
}) {
  const theme = useTheme();

  // Split members: First 3 are Board, rest are Team
  const boardMembers = members.slice(0, 3);
  const teamMembers = members.slice(3);

  return (
    <Section>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.15em",
              color: "#555",
              fontWeight: 600,
              display: "block",
              mb: 2,
              textTransform: "uppercase"
            }}
          >
            {subtitle}
          </Typography>

          <SerifHeading
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "4.5rem" },
              lineHeight: 0.95,
              mb: 4,
              letterSpacing: "-0.02em"
            }}
          >
            {title}
          </SerifHeading>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              color: "#444",
              maxWidth: "800px",
              lineHeight: 1.7,
              margin: "0 auto",
              mb: 8
            }}
          >
            Our dedicated team works tirelessly to empower youth through resilience, kindness, and courage.
            Meet the people making it happen.
          </Typography>

        </Box>

        {/* Two-Column Layout for Image & Board (Desktop) / Stacked (Mobile) */}
        {/* Two-Column Layout for Image & Board via CSS Grid */}
        {/* Two-Column Layout for Image & Board via CSS Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 8, md: 8 },
            mb: 12
          }}
        >
          {/* Left Column: Image */}
          <Box sx={{ display: "flex", justifyContent: "center", height: "100%" }}>
            {/* Desktop Image */}
            <TeamImage
              src={photoSrc}
              alt={photoAlt}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: { xs: "none", md: "block" },
                borderRadius: 4,
              }}
            />
            {/* Mobile Image */}
            <TeamImage
              src="/about/mobile-team.JPG"
              alt={photoAlt}
              sx={{
                width: "100%",
                height: "auto",
                display: { xs: "block", md: "none" },
                borderRadius: 4,
              }}
            />
          </Box>

          {/* Right Column: Board of Directors */}
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography
              variant="h6"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#888",
                mb: 4,
                borderBottom: "1px solid #1a1a1a",
                pb: 2,
                textAlign: { xs: "center", md: "left" }
              }}
            >
              Board of Directors
            </Typography>

            <Box>
              {boardMembers.map((name, index) => (
                <Box
                  key={name}
                  sx={{
                    py: 3,
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "space-between" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  <Box>
                    <Typography variant="h3" component="span" sx={{ fontFamily: "serif", fontSize: { xs: "1.8rem", md: "2.2rem" }, color: "#1a1a1a" }}>
                      {name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem", display: { xs: "none", sm: "block" } }}>
                      Board Member
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* TEAM SECTION - Clean Grid Redesign */}
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          <Typography
            variant="h6"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#888",
              mb: 6,
              pb: 2,
              borderBottom: "1px solid #1a1a1a",
              textAlign: "center"
            }}
          >
            Team Members
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: { xs: 2, md: 4 }
            }}
          >
            {teamMembers.map((name) => (
              <Box
                key={name}
                sx={{
                  textAlign: "center",
                  p: 2,
                  border: "1px solid transparent",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "rgba(0,0,0,0.1)"
                  }
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "serif",
                    color: "#1a1a1a",
                    mb: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: { xs: "1.2rem", md: "1.5rem" }
                  }}
                >
                  {name}
                </Typography>
                <Typography variant="overline" sx={{ color: "#666", letterSpacing: "0.1em", fontSize: "0.75rem" }}>
                  Team Member
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

      </Container>
    </Section>
  );
}
