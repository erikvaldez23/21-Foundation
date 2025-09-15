import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CalendarDays,
  MapPin,
  DollarSign,
  UserRound,
  Mail,
  ExternalLink,
  Clock,
  ArrowRight,
} from "lucide-react";
import EventHero from "./EventHero";

// Mock data
const mockEvent = {
  title: "Walkout for Mental Health Awareness",
  tagline: "Join Us for a Walkout to Raise Awareness",
  description:
    "A community-led walkout focused on mental health awareness, resource sharing, and connection. Expect short talks from local counselors and lived-experience advocates, followed by an easy-paced group walk.",
  image:
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1973&q=80",
  location: {
    name: "Downtown Commons Park",
    address: "123 Main St, Lubbock, TX 79401",
    mapUrl:
      "https://maps.google.com/?q=Downtown+Commons+Park+Lubbock+TX",
  },
  start: "2025-10-12T10:00:00-05:00",
  end: "2025-10-12T12:00:00-05:00",
  timezone: "America/Chicago",
  cost: "Free",
  organizer: "Clark21 Foundation",
  contactEmail: "info@clark21.org",
  formUrl: "https://docs.google.com/forms/d/example",
  category: "Community Event",
  tags: ["Mental Health", "Community", "Awareness"],
  itinerary: [
    {
      time: "10:00 AM",
      title: "Welcome & Check-In",
      detail: "Grab a wristband and meet volunteers.",
    },
    {
      time: "10:10 AM",
      title: "Opening Remarks",
      detail: "Brief intro from the Clark21 team.",
    },
    {
      time: "10:20 AM",
      title: "Counselor Spotlight",
      detail: "Local counselors share resources and tips.",
    },
    {
      time: "10:40 AM",
      title: "Community Stories",
      detail: "Short talks from lived-experience advocates.",
    },
    {
      time: "11:00 AM",
      title: "Group Walk",
      detail: "Easy-paced walk through the park loop.",
    },
    {
      time: "11:45 AM",
      title: "Closing & Next Steps",
      detail: "Thanks, photos, and resource handouts.",
    },
  ],
};

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "#E8E5DD",
  paddingBottom: theme.spacing(8),
}));

const ContentSection = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(6),
  position: "relative",
  zIndex: 10,
}));

function formatRange(start, end, tz) {
  try {
    const s = new Date(start);
    const e = end ? new Date(end) : null;
    const dateFmt = new Intl.DateTimeFormat(undefined, {
      timeZone: tz || undefined,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const timeFmt = new Intl.DateTimeFormat(undefined, {
      timeZone: tz || undefined,
      hour: "numeric",
      minute: "2-digit",
    });
    const dateStr = dateFmt.format(s);
    if (!e) return `${dateStr} at ${timeFmt.format(s)}`;
    const sameDay = s.toDateString() === e.toDateString();
    return sameDay
      ? `${dateStr} • ${timeFmt.format(s)} – ${timeFmt.format(e)}`
      : `${dateStr} ${timeFmt.format(s)} → ${dateFmt.format(
          e
        )} ${timeFmt.format(e)}`;
  } catch {
    return "";
  }
}

export default function TextEventDetails() {
  const event = mockEvent;
  const whenText = formatRange(event.start, event.end, event.timezone);

  return (
    <PageContainer>
      <EventHero />

      <ContentSection maxWidth="md">
        {/* About */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 2, color: "#1d1d1f" }}
        >
          About This Event
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.7, fontSize: "1rem", mb: 4, color: "#333" }}
        >
          {event.description}
        </Typography>

        {/* Action Buttons */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={6}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ExternalLink size={18} />}
            href={event.formUrl}
            target="_blank"
          >
            Register Now
          </Button>
          <Button
            variant="outlined"
            startIcon={<MapPin size={18} />}
            href={event.location?.mapUrl}
            target="_blank"
          >
            View Location
          </Button>
        </Stack>

        <Divider sx={{ mb: 6 }} />

        {/* Schedule / Itinerary */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 3, color: "#1d1d1f" }}
        >
          <Clock size={20} style={{ verticalAlign: "middle", marginRight: 8 }} />
          Event Schedule
        </Typography>
        <Stack spacing={2} mb={6}>
          {event.itinerary.map((item, idx) => (
            <Box key={idx}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#1d1d1f" }}
              >
                {item.time} — {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", ml: 1 }}>
                {item.detail}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ mb: 6 }} />

        {/* Event Details */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 3, color: "#1d1d1f" }}
        >
          Event Details
        </Typography>
        <Stack spacing={2}>
          <Typography>
            <strong>When:</strong> {whenText}
          </Typography>
          <Typography>
            <strong>Where:</strong> {event.location?.name},{" "}
            {event.location?.address}
          </Typography>
          <Typography>
            <strong>Cost:</strong> {event.cost}
          </Typography>
          <Typography>
            <strong>Organizer:</strong> {event.organizer}
          </Typography>
          <Typography>
            <strong>Contact:</strong>{" "}
            <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a>
          </Typography>
        </Stack>
      </ContentSection>
    </PageContainer>
  );
}
