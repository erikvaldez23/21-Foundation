import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  MenuItem,
  Chip,
  Divider,
  Button,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

/* =========================
   Foundation Events Sub-Page
   - Upcoming/Past toggle
   - Search + filters
   - Uniform event tiles
   - Register / Calendar / ICS / Map
   ========================= */

const Page = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `radial-gradient(1200px 600px at 10% -10%, ${alpha(
    theme.palette.primary.main,
    0.22
  )} 0%, transparent 60%), radial-gradient(900px 500px at 90% 110%, ${alpha(
    theme.palette.secondary.main,
    0.18
  )} 0%, transparent 60%), linear-gradient(180deg, ${alpha(
    theme.palette.background.default,
    1
  )}, ${alpha(theme.palette.background.default, 1)})`,
  color: theme.palette.text.primary,
}));

const Glass = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  background: alpha("#fff", 0.05),
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha("#fff", 0.08)}`,
  boxShadow: "0 10px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
}));

const SectionHeader = ({ title, subtitle }) => (
  <Box sx={{ textAlign: { xs: "left", md: "center" }, mb: 4 }}>
    <Typography
      component={motion.h1}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      variant="h3"
      sx={{ fontWeight: 800, letterSpacing: -0.4 }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        variant="subtitle1"
        sx={{ opacity: 0.85, mt: 1 }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

/** ------------------------------------------
 * Mock data — replace with API results later
 * start and end are ISO strings in local time
 * ----------------------------------------- */
const CATEGORIES = ["Community", "Sports", "Fundraiser", "Workshop"];
const CITIES = ["Dallas, TX", "Fort Worth, TX", "Plano, TX", "Online"];

const EVENTS = [
  {
    id: "ev-run-hope",
    title: "Run for Hope 5K",
    category: "Fundraiser",
    city: "Dallas, TX",
    venue: "White Rock Lake Trail",
    address: "8300 E Lawther Dr, Dallas, TX 75218",
    start: "2025-09-13T08:00:00",
    end: "2025-09-13T10:00:00",
    tz: "America/Chicago",
    ctaUrl: "https://example.org/register/5k",
    tags: ["Family-Friendly", "All Fitness Levels"],
    capacity: 250,
    spotsLeft: 37,
    mapQuery: "White Rock Lake Trail Dallas",
  },
  {
    id: "ev-mentorship",
    title: "Youth Mentorship Night",
    category: "Community",
    city: "Plano, TX",
    venue: "Plano Youth Center",
    address: "1234 Legacy Dr, Plano, TX 75024",
    start: "2025-10-01T18:30:00",
    end: "2025-10-01T20:30:00",
    tz: "America/Chicago",
    ctaUrl: "https://example.org/register/mentorship",
    tags: ["Parents Welcome", "Snacks Provided"],
    capacity: 80,
    spotsLeft: 12,
    mapQuery: "Plano Youth Center Legacy Dr",
  },
  {
    id: "ev-ball",
    title: "Hoops & Hope Skills Clinic",
    category: "Sports",
    city: "Fort Worth, TX",
    venue: "Community Recreation Center",
    address: "600 Main St, Fort Worth, TX 76102",
    start: "2025-08-20T17:00:00",
    end: "2025-08-20T19:30:00",
    tz: "America/Chicago",
    ctaUrl: "https://example.org/register/clinic",
    tags: ["Grades 6-12", "Free"],
    capacity: 60,
    spotsLeft: 0,
    mapQuery: "Community Recreation Center Fort Worth Main St",
  },
  {
    id: "ev-webinar",
    title: "Online Workshop: Building Resilience",
    category: "Workshop",
    city: "Online",
    venue: "Zoom",
    address: "Virtual",
    start: "2025-09-24T12:00:00",
    end: "2025-09-24T13:15:00",
    tz: "America/Chicago",
    ctaUrl: "https://example.org/register/resilience",
    tags: ["Free", "Live Q&A"],
    capacity: 500,
    spotsLeft: 221,
    mapQuery: "",
  },
];

function formatRange(startISO, endISO, tz = "America/Chicago") {
  // Basic, locale-friendly date/time range
  const start = new Date(startISO);
  const end = new Date(endISO);
  const d = start.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const s = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const e = end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${d} · ${s}–${e} CT`;
}

function googleCalendarUrl({ title, start, end, location, details = "" }) {
  // Google expects UTC-like format without separators: YYYYMMDDTHHMMSSZ
  const f = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${f(start)}/${f(end)}`,
    details,
    location,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

function icsFileContent({ title, start, end, location, description = "" }) {
  const dt = (iso) =>
    new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  return (
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Clark21Foundation//Events//EN
BEGIN:VEVENT
DTSTAMP:${dt(new Date().toISOString())}
DTSTART:${dt(start)}
DTEND:${dt(end)}
SUMMARY:${title}
LOCATION:${location}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`
  );
}

function downloadIcs(filename, content) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function Events() {
  const [scope, setScope] = useState("upcoming"); // "upcoming" | "past"
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All");

  const now = new Date();

  const filtered = useMemo(() => {
    let list = EVENTS;

    // Upcoming / Past split
    list =
      scope === "upcoming"
        ? list.filter((e) => new Date(e.end) >= now)
        : list.filter((e) => new Date(e.end) < now);

    if (category !== "All") list = list.filter((e) => e.category === category);
    if (city !== "All") list = list.filter((e) => e.city === city);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.address.toLowerCase().includes(q)
      );
    }

    // Sort: Upcoming by soonest first; Past by most recent first
    list = [...list].sort((a, b) =>
      scope === "upcoming"
        ? new Date(a.start) - new Date(b.start)
        : new Date(b.start) - new Date(a.start)
    );

    return list;
  }, [scope, query, category, city, now]);

  return (
    <Page>
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeader
          title="Events & Programs"
          subtitle="Join us at upcoming clinics, workshops, and community gatherings. Your presence fuels our mission."
        />

        {/* Scope Toggle + Filters */}
        <Glass sx={{ p: 2.5, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md="auto">
              <ToggleButtonGroup
                value={scope}
                exclusive
                onChange={(_, v) => v && setScope(v)}
                size="small"
              >
                <ToggleButton value="upcoming">Upcoming</ToggleButton>
                <ToggleButton value="past">Past</ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Search events"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                select
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {["All", ...CATEGORIES].map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                select
                fullWidth
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {["All", ...CITIES].map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Glass>

        {/* Events grid */}
        <Grid container spacing={3}>
          {filtered.map((ev) => (
            <Grid item key={ev.id} xs={12} sm={6} md={4} sx={{ display: "flex" }}>
              <EventCard event={ev} />
            </Grid>
          ))}
          {filtered.length === 0 && (
            <Grid item xs={12}>
              <Glass sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No events found
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Try adjusting your filters or search.
                </Typography>
              </Glass>
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}

/* ================= Small components ================= */

const Pill = ({ icon, children }) => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 0.75,
      px: 1,
      py: 0.5,
      borderRadius: 999,
      bgcolor: "action.hover",
      fontSize: 13,
    }}
  >
    {icon}
    <span>{children}</span>
  </Box>
);

const EventCard = ({ event }) => {
  const {
    title,
    category,
    city,
    venue,
    address,
    start,
    end,
    ctaUrl,
    tags = [],
    capacity,
    spotsLeft,
    mapQuery,
  } = event;

  const dateLine = formatRange(start, end);
  const isSoldOut = spotsLeft !== undefined && spotsLeft <= 0;

  const onGoogleCal = () => {
    const url = googleCalendarUrl({
      title,
      start,
      end,
      location: `${venue}, ${address}`,
      details: "Clark21 Foundation event",
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onDownloadIcs = () => {
    const content = icsFileContent({
      title,
      start,
      end,
      location: `${venue}, ${address}`,
      description: "Clark21 Foundation event",
    });
    downloadIcs(`${title.replace(/\s+/g, "_")}.ics`, content);
  };

  const onOpenMap = () => {
    if (!mapQuery || city === "Online") return;
    const q = encodeURIComponent(mapQuery || `${venue} ${address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");
  };

  return (
    <Glass
      component={motion.div}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        flex: 1,
        width: "100%",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="overline" sx={{ opacity: 0.7 }}>
            {category}
          </Typography>
          {isSoldOut ? (
            <Chip size="small" color="error" label="Sold Out" />
          ) : (
            <Chip
              size="small"
              color="primary"
              variant="outlined"
              label={spotsLeft !== undefined ? `${spotsLeft} spots left` : "Open"}
            />
          )}
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 1.5 }}>
          <Pill icon={<EventAvailableRoundedIcon fontSize="small" />}>{dateLine}</Pill>
          <Pill icon={<PlaceRoundedIcon fontSize="small" />}>
            {city} {city !== "Online" && "•"} {city === "Online" ? venue : `${venue}`}
          </Pill>
          <Pill icon={<AccessTimeRoundedIcon fontSize="small" />}>
            Capacity: {capacity?.toLocaleString() ?? "—"}
          </Pill>
        </Box>

        {!!tags.length && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 1 }}>
            {tags.map((t) => (
              <Chip key={t} size="small" label={t} sx={{ borderRadius: 2 }} />
            ))}
          </Box>
        )}
      </CardContent>

      <Divider />

      <CardActions sx={{ p: 2, pt: 1, display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          fullWidth
          href={ctaUrl}
          target="_blank"
          rel="noopener"
          disabled={isSoldOut}
          sx={{ borderRadius: 2, fontWeight: 800 }}
          endIcon={<OpenInNewRoundedIcon />}
        >
          {isSoldOut ? "Join Waitlist" : "Register"}
        </Button>

        <Tooltip title="Add to Google Calendar">
          <IconButton onClick={onGoogleCal} aria-label="Add to Google Calendar">
            <EventAvailableRoundedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Download .ics">
          <IconButton onClick={onDownloadIcs} aria-label="Download ICS">
            <ShareRoundedIcon />
          </IconButton>
        </Tooltip>

        {city !== "Online" && (
          <Tooltip title="Open in Maps">
            <IconButton onClick={onOpenMap} aria-label="Open in Maps">
              <PlaceRoundedIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Glass>
  );
};
