import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { EVENTS } from "./eventsData";

const EventCard = ({ event, isMobile, isSingle }) => (
  <Card
    sx={(theme) => ({
      position: "relative",
      overflow: "hidden",
      borderRadius: 2,
      mx: "auto",
      maxWidth: { xs: 500, md: "100%" },
      // Responsive size: use aspect ratio instead of fixed width/height to avoid layout shift
      aspectRatio: isSingle ? "21 / 9" : "16 / 10",
      minHeight: isSingle ? { xs: 360, md: 560 } : { xs: 260, md: 400 },
      width: "100%",
      transition: "transform .2s ease, box-shadow .2s ease",
      cursor: "pointer",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: theme.shadows[8],
      },
    })}
  >
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url('${event.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
      }}
      role="img"
      aria-label={`${event.title} background`}
    />
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.55) 100%)",
        zIndex: 1,
      }}
    />
    <CardContent
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        p: { xs: 3, md: 4 },
        color: "white",
        zIndex: 2,
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontSize: { xs: "1.6rem", md: "2.3rem" },
          fontWeight: 400,
          lineHeight: 1.2,
          mb: 2,
          textShadow: "1px 1px 2px rgba(0,0,0,0.35)",
          fontFamily: "serif",
          textAlign: "left",
        }}
      >
        {event.title}
        <br />
        {event.date}
        <br />
        {event.location}
      </Typography>
      <Box sx={{ width: 64, height: 2, bgcolor: "white", mt: 1, opacity: 0.85 }} />
    </CardContent>

    <Button
      component={RouterLink}
      to={event.to}
      aria-label={`Learn more about ${event.title}`}
      variant="outlined"
      size={isMobile ? "small" : "medium"}
      sx={{
        position: "absolute",
        right: 16,
        bottom: 16,
        zIndex: 2,
        color: "white",
        borderColor: "rgba(255,255,255,0.75)",
        backgroundColor: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(6px)",
        textTransform: "none",
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.14)",
          borderColor: "#fff",
        },
      }}
    >
      Learn more
    </Button>
  </Card>
);

const DEFAULT_EVENTS = EVENTS.map((ev) => ({
  id: ev.slug,          // unique key for React
  title: ev.title,
  date: ev.date,
  location: ev.location?.address || "",
  image: ev.image,
  to: `/events/${ev.slug}`,
}));

const EventContent = ({
  events = DEFAULT_EVENTS,
  maxWidth = "xl",
  // columns: 2 on md+, 1 on xs by default. Change lg to 4 for three-up.
  gridProps = { xs: 12, md: 6, lg: 6 },
  // spacing controls (in theme spacing units)
  spacing = { xs: 4, md: 3, lg: 3 },
  // background color
  background = "#E8E5DD",
  // extra padding around the section
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSingle = events.length === 1;

  return (
    <Box sx={{ bgcolor: background, pb: 5 }}>
      <Box sx={{ zoom: { xs: 1, md: 0.85 } }}>
        <Container maxWidth={maxWidth} sx={{ pb: 4 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isSingle
                ? "1fr"
                : { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: spacing,
              pt: 2,
              justifyContent: "center",
              alignItems: "stretch",
              width: '100%',
            }}
          >
            {events.map((ev, idx) => {
              // If this is the last card AND there's an odd number AND we're in multi-col mode,
              // let it span both columns so it fills the row.
              const isLastOdd =
                !isSingle && events.length % 2 !== 0 && idx === events.length - 1;
              return (
                <Box
                  key={ev.id}
                  sx={{
                    width: "100%",
                    display: "flex",
                    gridColumn: isLastOdd ? "1 / -1" : undefined,
                    maxWidth: isLastOdd ? { md: "60%" } : undefined,
                    mx: isLastOdd ? "auto" : undefined,
                  }}
                >
                  <EventCard
                    event={ev}
                    isMobile={isMobile}
                    isSingle={isSingle || isLastOdd}
                  />
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default EventContent;
