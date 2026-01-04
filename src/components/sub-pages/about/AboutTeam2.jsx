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
        <Grid container spacing={8}>
          {/* Left Column: Header & Intro */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: "sticky", top: 40 }}>
              <Box sx={{ mb: 6 }}>
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

                <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "#444", maxWidth: "400px", lineHeight: 1.7 }}>
                  Our dedicated team works tirelessly to empower youth through resilience, kindness, and courage.
                  Meet the people making it happen.
                </Typography>
              </Box>

              {/* Hero Photo Sidebar */}
              <Box sx={{ position: "relative" }}>
                <TeamImage src={photoSrc} alt={photoAlt} />
                <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#666", fontStyle: "italic" }}>
                  The SC21 Team
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Lists */}
          <Grid item xs={12} md={7}>

            {/* BOARD SECTION - Editorial List */}
            <Box sx={{ mb: 12, pt: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#888",
                  mb: 4,
                  borderBottom: "1px solid #1a1a1a",
                  pb: 2
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
                      <Typography variant="h3" component="span" sx={{ fontFamily: "serif", fontSize: { xs: "2rem", md: "2.5rem" }, color: "#1a1a1a" }}>
                        {name}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="body2" sx={{ color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                        Board Member
                      </Typography>
                      {/* Decorative Arrow */}
                      <ArrowForwardIcon className="arrow-icon" sx={{ opacity: 0, transform: "translateX(-10px)", transition: "all 0.3s ease", color: "#339c5e" }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* TEAM SECTION - Clean Grid */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#888",
                  mb: 6,
                  pb: 2,
                  borderBottom: "1px solid #1a1a1a"
                }}
              >
                Team Members
              </Typography>

              <Grid container spacing={2}>
                {teamMembers.map((name) => (
                  <Grid item xs={6} sm={4} key={name}>
                    <Box
                      sx={{
                        p: 3,
                        bgcolor: "rgba(255,255,255,0.4)",
                        borderRadius: "4px",
                        transition: "all 0.2s",
                        minHeight: "100px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        "&:hover": {
                          bgcolor: "#fff",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
                        }
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a1a1a", mb: 0.5 }}>
                        {name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#666" }}>
                        Team Member
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}
