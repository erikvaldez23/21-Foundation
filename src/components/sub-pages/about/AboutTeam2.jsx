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
  photoSrc = "/about/team.JPG",
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

          <Box sx={{ display: "flex", justifyContent: "center", mb: 12 }}>
            <TeamImage
              src={photoSrc}
              alt={photoAlt}
              sx={{
                maxWidth: "1400px",
                width: "100%",
                height: "auto"
              }}
            />
          </Box>
        </Box>

        {/* BOARD SECTION - Editorial List */}
        <Box sx={{ mb: 12, maxWidth: "1200px", mx: "auto" }}>
          <Typography
            variant="h6"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#888",
              mb: 4,
              borderBottom: "1px solid #1a1a1a",
              pb: 2,
              textAlign: "center"
            }}
          >
            Board of Directors
          </Typography>

          <Box>
            {boardMembers.map((name, index) => (
              <Box
                key={name}
                sx={{
                  py: 4,
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease",
                  cursor: "default",
                  "&:hover": {
                    paddingLeft: 2,
                    borderColor: "#339c5e",
                  }
                }}
              >
                <Box>
                  <Typography variant="h3" component="span" sx={{ fontFamily: "serif", fontSize: { xs: "1.8rem", md: "2.5rem" }, color: "#1a1a1a" }}>
                    {name}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem", display: { xs: "none", sm: "block" } }}>
                    Board Member
                  </Typography>
                  {/* Decorative Arrow */}
                  <ArrowForwardIcon className="arrow-icon" sx={{ opacity: 0, transform: "translateX(-10px)", transition: "all 0.3s ease", color: "#339c5e" }} />
                </Box>
              </Box>
            ))}
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

          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((name) => (
              <Grid item xs={12} sm={6} md={3} key={name}>
                <Box
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
                  <Typography variant="h5" sx={{ fontFamily: "serif", color: "#1a1a1a", mb: 1 }}>
                    {name}
                  </Typography>
                  <Typography variant="overline" sx={{ color: "#666", letterSpacing: "0.1em", fontSize: "0.75rem" }}>
                    Team Member
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
    </Section>
  );
}
