import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid,
  Stack
} from "@mui/material";
import {
  CalendarDays,
  MapPin,
  DollarSign,
  Mail,
  ExternalLink,
  Clock,
  ArrowLeft,
  Shirt,
  Droplets,
  Car,
  Gift,
  Backpack,
  Trophy,
  Users,
  Instagram,
  Phone,
  Info,
  Calendar,
  ClipboardList,
  Coins
} from "lucide-react";
import { getEventBySlug } from "./eventsData";

/* ─── helpers ─────────────────────────────────────────────────────────── */
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
    if (!e) return dateStr;
    const sameDay = s.toDateString() === e.toDateString();
    return sameDay
      ? `${dateStr} · ${timeFmt.format(s)} – ${timeFmt.format(e)}`
      : `${dateStr} → ${dateFmt.format(e)}`;
  } catch {
    return "";
  }
}

/* ─── detail row used in sidebar ──────────────────────────────────────── */
function DetailRow({ icon: Icon, label, children }) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", mb: 2.5 }}>
      <Box
        sx={{
          mt: "2px",
          minWidth: 36,
          height: 36,
          borderRadius: "50%",
          bgcolor: "rgba(47,166,82,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={16} color="#2FA652" />
      </Box>
      <Box>
        <Typography
          sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#999", letterSpacing: 1, textTransform: "uppercase", mb: 0.25 }}
        >
          {label}
        </Typography>
        <Typography sx={{ fontSize: "0.9rem", color: "#222", lineHeight: 1.5 }}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}

/* ─── main component ───────────────────────────────────────────────────── */
export default function EventDetails() {
  const { slug } = useParams();
  const event = getEventBySlug(slug);

  /* ── not found ── */
  if (!event) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#E8E5DD", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: "serif", mb: 2, color: "#1a1a1a" }}>
          Event not found
        </Typography>
        <Typography sx={{ color: "#666", mb: 4 }}>
          The event you're looking for doesn't exist or may have been removed.
        </Typography>
        <Button component={RouterLink} to="/events" variant="outlined" startIcon={<ArrowLeft size={16} />}
          sx={{ textTransform: "none", borderColor: "#2FA652", color: "#2FA652", "&:hover": { borderColor: "#268a45", bgcolor: "rgba(47,166,82,0.05)" } }}>
          Back to Events
        </Button>
      </Box>
    );
  }

  let dateText = "";
  let timeText = "";
  try {
    const s = new Date(event.isoDate);
    dateText = new Intl.DateTimeFormat(undefined, {
      timeZone: event.timezone || undefined,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(s);
    timeText = new Intl.DateTimeFormat(undefined, {
      timeZone: event.timezone || undefined,
      hour: "numeric",
      minute: "2-digit",
    }).format(s);
  } catch (e) { }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#E8E5DD" }}>
      <Box sx={{ zoom: { xs: 1, md: 0.85 } }}>
        {/* ── Standard Sub-page Header ──────────────────────────────────────── */}
        <Container maxWidth="xl" sx={{ pt: { xs: 8, md: 4 }, pb: 4 }}>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 }, mt: { xs: 4, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{
                color: "#666",
                letterSpacing: 2,
                fontSize: "0.8rem",
                mb: 3,
                display: "block",
              }}
            >
              {event.category ? event.category.toUpperCase() : "MENTAL HEALTH REACH OUT"}
            </Typography>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                fontWeight: 400,
                color: "#333",
                lineHeight: 1.3,
                maxWidth: "900px",
                mx: "auto",
                fontFamily: "serif",
                textTransform: "uppercase",
              }}
            >
              {event.title}
              <br />
              -
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Button
              component={RouterLink}
              to="/events"
              startIcon={<ArrowLeft size={16} />}
              sx={{
                color: "#666",
                textTransform: "none",
                fontSize: "0.85rem",
                fontWeight: 500,
                "&:hover": { color: "#1a1a1a", bgcolor: "transparent" },
              }}
            >
              Back to All Events
            </Button>
          </Box>
        </Container>

        {/* ── Body with Split Layout ────────────────────────────────────── */}
        {/* ── Body Layout ────────────────────────────────────── */}
        <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>

          {/* ── TOP: Event Details Card (Full Width) ─────────────────────── */}
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              mb: { xs: 5, md: 6 },
            }}
          >
            <Typography
              sx={{
                fontFamily: "serif",
                fontSize: "1.15rem",
                fontWeight: 400,
                color: "#1a1a1a",
                mb: 3,
                pb: 2,
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              Event Details
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(4, 1fr)" },
                gap: 2,
              }}
            >
              {dateText && (
                <DetailRow icon={CalendarDays} label="When">
                  {dateText}
                  {timeText && (
                    <>
                      <br />
                      <span style={{ color: "#777" }}>{timeText}</span>
                    </>
                  )}
                </DetailRow>
              )}

              {(event.location?.name || event.location?.address) && (
                <DetailRow icon={MapPin} label="Where">
                  {event.location.name}
                  {event.location.address && (
                    <>
                      <br />
                      <span style={{ color: "#777" }}>{event.location.address}</span>
                    </>
                  )}
                </DetailRow>
              )}

              <DetailRow icon={DollarSign} label="Cost">
                {event.cost}
              </DetailRow>

              <DetailRow icon={Mail} label="Contact">
                <a
                  href={`mailto:${event.contactEmail}`}
                  style={{ color: "#2FA652", textDecoration: "none" }}
                >
                  {event.contactEmail}
                </a>
              </DetailRow>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
              <Button
                href={event.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                endIcon={<ExternalLink size={16} />}
                sx={{
                  bgcolor: "#2FA652",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  borderRadius: 2,
                  py: 1.2,
                  px: 3,
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#268a45", boxShadow: "none" },
                  flex: { xs: 1, sm: "none" },
                }}
              >
                Register Now
              </Button>

              {event.location?.mapUrl && (
                <Button
                  href={event.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<MapPin size={16} />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    borderRadius: 2,
                    py: 1.2,
                    px: 3,
                    borderColor: "rgba(0,0,0,0.18)",
                    color: "#333",
                    "&:hover": { borderColor: "#2FA652", color: "#2FA652", bgcolor: "rgba(47,166,82,0.04)" },
                    flex: { xs: 1, sm: "none" },
                  }}
                >
                  View on Map
                </Button>
              )}
            </Box>
          </Box>

          {/* ── BOTTOM: 60/40 Grid (Content / Image) ─────────────────────── */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "4fr 6fr" },
              gap: { xs: 6, md: 6, lg: 8 },
              alignItems: "stretch",
            }}
          >
            {/* LEFT: Text Content */}
            <Box>
              {/* About */}
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#2FA652",
                  mb: 1.5,
                }}
              >
                About This Event
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  lineHeight: 1.85,
                  color: "#333",
                  mb: 5,
                }}
              >
                {event.description}
              </Typography>

              <Box sx={{ width: "100%", height: "1px", bgcolor: "rgba(0,0,0,0.1)", mb: 5 }} />

              {/* Schedule */}
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#2FA652",
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Clock size={13} /> Event Schedule
              </Typography>

              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    left: 15,
                    top: 8,
                    bottom: 8,
                    width: "1px",
                    bgcolor: "rgba(0,0,0,0.1)",
                    display: { xs: "none", sm: "block" },
                  }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {event.itinerary.map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        gap: { xs: 2, sm: 3 },
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          flexShrink: 0,
                          mt: "3px",
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          bgcolor: "#fff",
                          border: "2px solid rgba(47,166,82,0.5)",
                          display: { xs: "none", sm: "flex" },
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          color: "#2FA652",
                          zIndex: 1,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          bgcolor: "#fff",
                          borderRadius: 2,
                          p: { xs: 2, md: 2.5 },
                          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 1, mb: 0.5 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: "#1a1a1a" }}>
                            {item.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: "#2FA652",
                              bgcolor: "rgba(47,166,82,0.08)",
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                            }}
                          >
                            {item.time}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: "0.875rem", color: "#555", lineHeight: 1.6 }}>
                          {item.detail}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>


              {/* Bottom CTA */}
              {event.formUrl && (
                <Box sx={{ pt: 4 }}>
                  <Button
                    href={event.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    fullWidth
                    endIcon={<ExternalLink size={16} />}
                    sx={{
                      bgcolor: "#2FA652",
                      color: "#fff",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      borderRadius: 2,
                      py: 1.4,
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#268a45", boxShadow: "none" },
                    }}
                  >
                    Register Now
                  </Button>
                </Box>
              )}
            </Box>

            {/* RIGHT: Image (Stretched to match left column height) */}
            <Box sx={{ width: "100%", height: "100%" }}>
              <Box
                component="img"
                src={event.heroImage}
                alt={event.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: { xs: 3, md: 4 },
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                }}
              />
            </Box>
          </Box>
          {/* ── Additional Information Section ────────────────────────── */}
          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "serif",
                fontSize: { xs: "1.75rem", md: "2rem" },
                color: "#1a1a1a",
                mb: 4,
                pb: 2,
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              Additional Information
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>

              {/* 1. Tournament Timeline */}
              {/* {event.itinerary && (
                  <Box sx={{ bgcolor: "#fff", borderRadius: 3, p: { xs: 3, md: 5 }, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: "#2FA652",
                        mb: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Calendar size={13} /> Tournament Timeline
                    </Typography>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 4 }}>
                      {event.itinerary.map((item, idx) => (
                        <Box key={idx} sx={{ borderLeft: "2px solid rgba(47,166,82,0.2)", pl: 2 }}>
                          <Typography sx={{ fontWeight: 700, color: "#2FA652", fontSize: "0.9rem", mb: 0.5 }}>
                            {item.time}
                          </Typography>
                          <Typography sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                            {item.title}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )} */}

              {/* 2. Registration & Pricing */}
              {event.registration && (
                <Box sx={{ bgcolor: "#fff", borderRadius: 3, p: { xs: 3, md: 5 }, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "#2FA652",
                      mb: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <ClipboardList size={13} /> Registration & Pricing
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={3}>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: "1rem", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                            <Users size={18} color="#2FA652" /> Players: {event.registration.pricePlayers}
                          </Typography>
                          <Typography sx={{ fontWeight: 700, fontSize: "1rem", display: "flex", alignItems: "center", gap: 1 }}>
                            <Info size={18} color="#2FA652" /> Spectators: {event.registration.priceSpectators}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>To Register:</Typography>
                          <ul style={{ paddingLeft: 20, margin: 0 }}>
                            {event.registration.rules.map((rule, i) => (
                              <li key={i}><Typography variant="body2" sx={{ color: "#555", mb: 0.5 }}>{rule}</Typography></li>
                            ))}
                          </ul>
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>Donation Only:</Typography>
                          <Typography variant="body2" sx={{ color: "#555" }}>{event.registration.donationOnly}</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ bgcolor: "rgba(47,166,82,0.04)", p: 3, borderRadius: 2, border: "1px dashed rgba(47,166,82,0.3)" }}>
                        <Typography sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                          <ExternalLink size={18} color="#2FA652" /> Required Waiver
                        </Typography>
                        <Button
                          href={event.registration.waiverUrl}
                          target="_blank"
                          sx={{
                            color: "#2FA652",
                            textTransform: "none",
                            fontWeight: 700,
                            textDecoration: "underline",
                            fontSize: "0.95rem",
                            p: 0,
                            mb: 2,
                            textAlign: "left",
                            justifyContent: "flex-start",
                            "&:hover": { bgcolor: "transparent", textDecoration: "underline" }
                          }}
                        >
                          {event.registration.waiverText}
                        </Button>
                        <Typography variant="body2" sx={{ color: "#666", fontStyle: "italic" }}>
                          Note: <strong>Every participant</strong> must submit a digital waiver via the link above.
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* 3. Divisions */}
              {event.divisions && (
                <Box sx={{ bgcolor: "#fff", borderRadius: 3, p: { xs: 3, md: 5 }, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "#2FA652",
                      mb: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Trophy size={13} /> Choose Your Division
                  </Typography>
                  <Grid container spacing={3}>
                    {event.divisions.map((div, i) => (
                      <Grid item xs={12} md={4} key={i}>
                        <Box sx={{ p: 3, height: "100%", borderRadius: 2, border: "1px solid rgba(0,0,0,0.06)", position: "relative" }}>
                          <Box sx={{
                            width: 12, height: 12, borderRadius: "50%", bgcolor: div.color,
                            position: "absolute", top: 16, right: 16
                          }} />
                          <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", mb: 0.5 }}>{div.level}</Typography>
                          <Typography sx={{ fontWeight: 600, color: "#2FA652", fontSize: "0.85rem", mb: 2 }}>{div.tag}</Typography>
                          <Typography variant="body2" sx={{ color: "#555", lineHeight: 1.6 }}>{div.description}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  {event.grandPrize && (
                    <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 1.5, bgcolor: "rgba(255,215,0,0.08)", p: 2, borderRadius: 2 }}>
                      <Coins size={20} color="#DAA520" />
                      <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                        <span style={{ color: "#DAA520" }}>The Grand Prize</span> -- {event.grandPrize}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              {/* 4. Know Before You Go */}
              {event.knowBeforeYouGo && (
                <Box sx={{ bgcolor: "#fff", borderRadius: 3, p: { xs: 3, md: 5 }, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "#2FA652",
                      mb: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Backpack size={13} /> Know Before You Go
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: { xs: 4, md: 6 },
                    }}
                  >
                    {event.knowBeforeYouGo.map((item, idx) => {
                      const Icon =
                        item.label.includes("Attire") ? Shirt :
                          item.label.includes("Hydrated") ? Droplets :
                            item.label.includes("Parking") ? Car :
                              item.label.includes("Extras") ? Gift : Backpack;

                      return (
                        <Box key={idx} sx={{ display: "flex", gap: 3 }}>
                          <Box
                            sx={{
                              flexShrink: 0,
                              width: 44,
                              height: 44,
                              borderRadius: 2,
                              bgcolor: "rgba(47,166,82,0.06)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#2FA652",
                            }}
                          >
                            <Icon size={20} />
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "1rem", color: "#1a1a1a", mb: 0.5 }}>
                              {item.label}
                            </Typography>
                            <Typography sx={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6 }}>
                              {item.detail}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              )}

              {/* 5. Tournament Awards */}
              {event.awards && (
                <Box sx={{ bgcolor: "#fff", borderRadius: 3, p: { xs: 3, md: 5 }, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "#2FA652",
                      mb: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Trophy size={13} /> The Extra Mile: Tournament Awards
                  </Typography>
                  <Typography sx={{ mb: 4, color: "#555" }}>
                    We aren’t just crowning the hardest throwers. Bring your A-game off the court for a chance to snag these titles:
                  </Typography>
                  <Stack spacing={4}>
                    {event.awards.map((award, i) => (
                      <Box key={i}>
                        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{award.title}</Typography>
                        <Typography variant="body2" sx={{ color: "#555", lineHeight: 1.6 }}>{award.description}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* 6. Stay Connected */}
              {event.stayConnected && (
                <Box
                  sx={{
                    mt: 2,
                    pt: 8,
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "40% 60%" },
                      gap: { xs: 6, md: 8 },
                      alignItems: "center",
                    }}
                  >
                    {/* Left: Contact Info */}
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: 3,
                          textTransform: "uppercase",
                          color: "#2FA652",
                          mb: 2,
                        }}
                      >
                        Get in Touch
                      </Typography>

                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: "serif",
                          fontSize: { xs: "1.75rem", md: "2.25rem" },
                          color: "#1a1a1a",
                          mb: 4,
                          lineHeight: 1.2,
                        }}
                      >
                        Have questions about the tournament? We're here to help.
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                          mb: 4,
                        }}
                      >
                        {/* Instagram */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                          <Box sx={{ color: "#2FA652", display: "flex" }}>
                            <Instagram size={22} strokeWidth={1.5} />
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a1a1a" }}>Instagram</Typography>
                            <Button
                              href="https://instagram.com/seanclark21foundation"
                              target="_blank"
                              sx={{
                                color: "#555",
                                textTransform: "none",
                                fontSize: "0.9rem",
                                p: 0,
                                minWidth: 0,
                                "&:hover": { color: "#2FA652", bgcolor: "transparent" },
                              }}
                            >
                              {event.stayConnected.instagram}
                            </Button>
                          </Box>
                        </Box>

                        {/* Email */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                          <Box sx={{ color: "#2FA652", display: "flex" }}>
                            <Mail size={22} strokeWidth={1.5} />
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a1a1a" }}>Email Us</Typography>
                            <Button
                              href={`mailto:${event.stayConnected.email}`}
                              sx={{
                                color: "#555",
                                textTransform: "none",
                                fontSize: "0.9rem",
                                p: 0,
                                minWidth: 0,
                                "&:hover": { color: "#2FA652", bgcolor: "transparent" },
                              }}
                            >
                              {event.stayConnected.email}
                            </Button>
                          </Box>
                        </Box>

                        {/* Phone */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                          <Box sx={{ color: "#2FA652", display: "flex" }}>
                            <Phone size={22} strokeWidth={1.5} />
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a1a1a" }}>Call / Text</Typography>
                            <Typography sx={{ color: "#555", fontSize: "0.9rem" }}>
                              {event.stayConnected.phone}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{ color: "#999", fontSize: "0.85rem" }}
                      >
                        Reach out to <strong>{event.stayConnected.contactName}</strong> for any specific tournament inquiries.
                      </Typography>
                    </Box>

                    {/* Right: Logo */}
                    <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                      <Box
                        component="img"
                        src="/logo2.png"
                        alt="Sean Clark 21 Foundation Logo"
                        sx={{
                          maxHeight: { xs: 120, md: 380 },
                          width: "auto",
                          opacity: 0.8,
                          transition: "all 0.3s ease",
                          "&:hover": { opacity: 1 }
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              )}

            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
