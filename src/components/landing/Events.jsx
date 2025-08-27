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
import { Link as RouterLink } from "react-router-dom";

/* ----------------------- Styled components ----------------------- */
const Section = styled(Box)(({ theme }) => ({
  backgroundColor: "#E8E5DD",
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
  "&:before": { display: "none" },
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
  backgroundColor: "#2FA652",
  color: "#fff",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#268a45",
    boxShadow: "none",
  },
}));

// smaller version to sit inside an accordion row
const RowCTA = styled(LearnMoreButton)(({ theme }) => ({
  padding: "10px 18px",
  fontSize: "0.95rem",
}));

const RoundedImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxWidth: 460,
  height: "auto",
  borderRadius: 28,
  display: "block",
}));

/* ----------------------- Helpers ----------------------- */
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
  return title;
}

function toSlug(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* ----------------------- Defaults ----------------------- */
const DEFAULT_EVENTS = [
  { id: 1, title: "Walkout", date: "2025-09-14", description: "Community walk to raise awareness and support." },
  { id: 2, title: "Event 2", date: "2025-10-02", description: "Details coming soon." },
  { id: 3, title: "Event 3", date: "2025-11-09", description: "Details coming soon." },
];

/* ----------------------- Component ----------------------- */
export default function EventsSection({
  events = DEFAULT_EVENTS,
  imageSrc = "/image4.JPG",
  onLearnMore,           // (optional) keeps your old global CTA
  basePath = "/events",  // change if your route base differs
  getEventPath,          // (optional) override per-event path: (ev) => "/custom/...”
}) {
  const [expanded, setExpanded] = useState(null);
  const handleChange = (panelId) => (_e, isExpanded) =>
    setExpanded(isExpanded ? panelId : null);

  return (
    <Section>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 30 }} alignItems="center">
          {/* Left: Title + List + CTA */}
          <Grid item xs={12} md={10}>
            <Title variant="h1">Events</Title>

            <ListContainer>
              {events.map((ev) => {
                const label = formatLabel(ev.date, ev.title);
                const isOpen = expanded === ev.id;

                // Build a robust default path like: /events/walkout-1
                const defaultPath = `${basePath}/${toSlug(ev.title)}-${ev.id}`;
                const eventPath = typeof getEventPath === "function"
                  ? getEventPath(ev) || defaultPath
                  : defaultPath;

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
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {ev.time ? `Time: ${ev.time}` : null}
                          {ev.time && ev.location ? " \u2022 " : null}
                          {ev.location ? `Location: ${ev.location}` : null}
                        </Typography>
                      )}

                      {/* Per-event Learn More */}
                      <RowCTA
                        component={RouterLink}
                        to={eventPath}
                        aria-label={`Learn more about ${ev.title}`}
                      >
                        Learn more
                      </RowCTA>
                    </AccordionDetails>
                  </StyledAccordion>
                );
              })}
            </ListContainer>

            {/* Optional global CTA preserved (e.g., link to /events) */}
            {onLearnMore && (
              <Box mt={6}>
                <LearnMoreButton onClick={onLearnMore}>Learn more</LearnMoreButton>
              </Box>
            )}
          </Grid>

          {/* Right: Image */}
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <RoundedImage src={imageSrc} alt="Events" />
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}
