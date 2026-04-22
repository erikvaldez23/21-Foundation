import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { EVENTS } from "../sub-pages/events/eventsData";

const Section = styled(Box)(({ theme }) => ({
  backgroundColor: "#E8E5DD",
  paddingTop: `max(${theme.spacing(5)}, env(safe-area-inset-top))`,
  paddingBottom: `max(${theme.spacing(8)}, env(safe-area-inset-bottom))`,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "0 auto",
  [theme.breakpoints.up("md")]: {
    maxWidth: "500px",
  },
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.02)", // Subtle backdrop behind image
}));

export default function EventsSpotlight() {
  // Pull the featured events (Yoga and Dodgeball)
  const featuredEvents = [
    EVENTS.find((e) => e.id === 4),
    EVENTS.find((e) => e.id === 5),
  ].filter(Boolean);

  if (featuredEvents.length === 0) return null;

  return (
    <Section role="region" aria-label="Event Spotlight">
      <Box sx={{ zoom: { xs: 1, md: 0.85 } }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: { xs: 6, md: 8 }, borderBottom: "1px solid rgba(0,0,0,0.1)", pb: 4 }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "serif",
                fontWeight: 400,
                fontSize: { xs: "12vw", md: "4rem" },
                lineHeight: 1.1,
                color: "#1a1a1a",
                mb: 2,
              }}
            >
              Get Involved Today
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: "800px",
                fontSize: "1.2rem",
                lineHeight: 1.6,
              }}
            >
              Join us at our upcoming featured events!
            </Typography>
          </Box>

          {/* Events List */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 10, md: 15 } }}>
            {featuredEvents.map((event, index) => {
              const isReversed = index % 2 !== 0;
              return (
                <Box
                  key={event.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: { xs: 6, md: 12 },
                    alignItems: "center",
                  }}
                >
                  {/* Image Box - Staggered order */}
                  <ImageBox 
                    sx={{ 
                      order: { xs: 1, md: isReversed ? 2 : 1 },
                      maxWidth: event.id === 4 ? { md: "780px" } : { md: "680px" } 
                    }}
                  >
                    <Box
                      component="img"
                      src={event.landingImage || event.image}
                      alt={event.title}
                      sx={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        objectFit: "contain",
                      }}
                    />
                  </ImageBox>

                  {/* Content Box - Staggered order */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      order: { xs: 2, md: isReversed ? 1 : 2 },
                      textAlign: { xs: "left", md: isReversed ? "right" : "left" },
                      alignItems: { xs: "flex-start", md: isReversed ? "flex-end" : "flex-start" }
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "#339c5e",
                        fontWeight: 700,
                        letterSpacing: 2,
                        mb: 2,
                        display: "block",
                        textTransform: "uppercase",
                      }}
                    >
                      {event.category || "COMMUNITY EVENT"}
                    </Typography>

                    <Typography
                      variant="h2"
                      sx={{
                        fontFamily: "serif",
                        fontSize: { xs: "2.5rem", md: "3.5rem" },
                        color: "#1a1a1a",
                        lineHeight: 1.1,
                        mb: 3,
                      }}
                    >
                      {event.shortTitle || event.title}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#444", mb: 3 }}
                    >
                      {event.date}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.1rem",
                        color: "#555",
                        lineHeight: 1.7,
                        mb: 5,
                        maxWidth: "600px"
                      }}
                    >
                      {event.description}
                    </Typography>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: { xs: "flex-start", md: isReversed ? "flex-end" : "flex-start" } }}>
                      {event.formUrl && (
                        <Button
                          href={event.formUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="contained"
                          sx={{
                            bgcolor: "#339c5e",
                            color: "#fff",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "1rem",
                            borderRadius: 2,
                            py: 1.5,
                            px: 4,
                            boxShadow: "none",
                            "&:hover": { bgcolor: "#268a45", boxShadow: "none" },
                          }}
                        >
                          Register Now
                        </Button>
                      )}
                      <Button
                        component={RouterLink}
                        to={`/events/${event.slug}`}
                        variant="outlined"
                        sx={{
                          borderColor: "#1a1a1a",
                          color: "#1a1a1a",
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: "1rem",
                          borderRadius: 2,
                          py: 1.5,
                          px: 4,
                          "&:hover": { borderColor: "#339c5e", color: "#339c5e", bgcolor: "transparent" },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
    </Section>
  );
}
