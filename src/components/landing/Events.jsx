import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Section = styled(Box)(({ theme }) => ({
  backgroundColor: "#E8E5DD", // warm neutral background like screenshot
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  fontSize: "clamp(2.25rem, 6vw, 4rem)",
  lineHeight: 1.1,
  marginBottom: theme.spacing(4),
  color: "#111",
}));

const ListContainer = styled(Box)(({ theme }) => ({
  borderTop: "1px solid #2c2c2c",
  
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  borderRadius: 0,
  margin: 0,
  "&:before": { display: "none" }, // remove MUI default divider
  borderBottom: "1px solid #2c2c2c",
}));

const StyledSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: 0,
  minHeight: 56,
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  borderRadius: 9999,
  padding: "14px 28px",
  textTransform: "none",
  fontWeight: 600,
  backgroundColor: "#2FA652", // foundation green from your palette
  color: "#fff",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#268a45",
    boxShadow: "none",
  },
}));

const RoundedImage = styled("img")(({ theme }) => ({
  width: "100%",        // fill the grid column
  maxWidth: 460,        // keeps it elegant
  height: "auto",
  borderRadius: 28,
  display: "block",
}));

function formatLabel(dateString, title) {
  try {
    const d = new Date(dateString);
    if (!isNaN(d)) {
      const formatter = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
      });
      return `${formatter.format(d)}: ${title}`;
    }
  } catch (_) {}
  // fallback if date invalid
  return title;
}

const DEFAULT_EVENTS = [
  { id: 1, title: "Walkout", date: "2025-09-14", description: "Community walk to raise awareness and support." },
  { id: 2, title: "Event 2", date: "2025-10-02", description: "Details coming soon." },
  { id: 3, title: "Event 3", date: "2025-11-09", description: "Details coming soon." },
];

export default function EventsSection({
  events = DEFAULT_EVENTS,
  imageSrc = "/logo.png",
  onLearnMore,
}) {
  const [expanded, setExpanded] = useState(null);
  const handleChange = (panelId) => (_e, isExpanded) =>
    setExpanded(isExpanded ? panelId : null);

  return (
    <Section>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 4, md: 30}}
          alignItems="center"
          // ensures side-by-side at md≥ (stacks on mobile)
        >
          {/* Left: Title + List + CTA */}
          <Grid item xs={12} md={10} >
            <Title variant="h1">Events</Title>

            <ListContainer>
              {events.map((ev) => {
                const label = formatLabel(ev.date, ev.title);
                const isOpen = expanded === ev.id;
                return (
                  <StyledAccordion
                    key={ev.id}
                    expanded={isOpen}
                    onChange={handleChange(ev.id)}
                  >
                    <StyledSummary
                      expandIcon={
                        isOpen ? (
                          <RemoveIcon sx={{ color: "#1a1a1a" }} />
                        ) : (
                          <AddIcon sx={{ color: "#1a1a1a" }} />
                        )
                      }
                      aria-controls={`panel-${ev.id}-content`}
                      id={`panel-${ev.id}-header`}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          color: "#1a1a1a",
                          fontSize: { xs: "1.1rem", md: "1.25rem" },
                        }}
                      >
                        {label}
                      </Typography>
                    </StyledSummary>
                    <AccordionDetails sx={{ px: 0, pb: 2, pt: 1 }}>
                      {ev.description && (
                        <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                          {ev.description}
                        </Typography>
                      )}
                      {(ev.time || ev.location) && (
                        <Typography variant="body2" color="text.secondary">
                          {ev.time ? `Time: ${ev.time}` : null}
                          {ev.time && ev.location ? " \u2022 " : null}
                          {ev.location ? `Location: ${ev.location}` : null}
                        </Typography>
                      )}
                    </AccordionDetails>
                  </StyledAccordion>
                );
              })}
            </ListContainer>

            <Box mt={6}>
              <LearnMoreButton onClick={onLearnMore}>Learn more</LearnMoreButton>
            </Box>
          </Grid>

          {/* Right: Image */}
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" }, // push image right on desktop
            }}
          >
            <RoundedImage src={imageSrc} alt="Events" />
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}
