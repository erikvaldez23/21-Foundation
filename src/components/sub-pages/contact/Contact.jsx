import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ContactHero from "./ContactHero";

/* ---------------------------- Styles ---------------------------- */
const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
}));

const Label = styled(Typography)({
  fontSize: 12,
  letterSpacing: 2,
  color: "#666",
});

const SerifHeading = styled(Typography)({
  fontFamily: "serif",
  fontWeight: 400,
  color: "#222",
});

const Field = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 14,
    background: "#FAF9F6",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  textTransform: "none",
  padding: theme.spacing(1.2, 2),
}));

// CSS Grid wrapper: 1 col on mobile, 50/50 from md+
const SectionGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2),
  alignItems: "stretch",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
  },
}));

export default function ContactSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      // TODO: wire up to your backend endpoint
      await new Promise((res) => setTimeout(res, 800));
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#E8E5DD" }}>
      <ContactHero />
      <Container maxWidth="xl" sx={{ pb: { xs: 6, md: 8 } }}>
        {/* 50/50 CSS Grid */}
        <SectionGrid>
          {/* LEFT: Info Panel */}
          <GlassCard>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Label variant="overline">GET IN TOUCH</Label>
              <SerifHeading variant="h4" sx={{ mt: 1, mb: 2 }}>
                We’re here to help
              </SerifHeading>
              <Typography sx={{ color: "#555", mb: 3, lineHeight: 1.7 }}>
                Whether you have a question about services, need support, or just want to say
                hello—reach out. We’ll respond as soon as we can.
              </Typography>

              <Stack spacing={2.25}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <PhoneIphoneRoundedIcon sx={{ color: "#333" }} />
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: "#222" }}>
                      (123) 456-7890
                    </Typography>
                    <Typography sx={{ color: "#666", fontSize: 14 }}>
                      Call or text
                    </Typography>
                  </Box>
                  <Box flexGrow={1} />
                  <ActionButton
                    variant="contained"
                    href="tel:+1111111111"
                    sx={{ bgcolor: "#222", color: "#fff" }}
                    startIcon={<PhoneIphoneRoundedIcon />}
                  >
                    Call now
                  </ActionButton>
                </Stack>

                <Divider />

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <EmailRoundedIcon sx={{ color: "#333" }} />
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: "#222" }}>
                      reachout@seanclark21foundation.org
                    </Typography>
                    <Typography sx={{ color: "#666", fontSize: 14 }}>
                      General inquiries
                    </Typography>
                  </Box>
                  <Box flexGrow={1} />
                  <ActionButton
                    variant="outlined"
                    href="mailto:reachout@seanclark21foundation.org"
                    endIcon={<OpenInNewRoundedIcon />}
                    sx={{ borderColor: "#222", color: "#222" }}
                  >
                    Email us
                  </ActionButton>
                </Stack>

                <Divider />

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <PlaceRoundedIcon sx={{ color: "#333" }} />
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: "#222" }}>
                      City, ST
                    </Typography>
                    <Typography sx={{ color: "#666", fontSize: 14 }}>
                      By appointment
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <AccessTimeRoundedIcon sx={{ color: "#333" }} />
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: "#222" }}>
                      Hours
                    </Typography>
                    <Typography sx={{ color: "#666", fontSize: 14 }}>
                      Mon–Fri: 9:00a–5:00p · Sat: 10:00a–2:00p · Sun: Closed
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              <Box sx={{ mt: 3 }}>
                <Chip
                  label="Mental Health Outreach"
                  sx={{
                    bgcolor: "#F0EEE8",
                    borderRadius: 2,
                    color: "#333",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                />
              </Box>
            </CardContent>
          </GlassCard>

          {/* RIGHT: Form Panel */}
          <GlassCard component="form" onSubmit={handleSubmit}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <SerifHeading variant="h5" sx={{ mb: 1 }}>
                Send us a message
              </SerifHeading>
              <Typography sx={{ color: "#666", mb: 3 }}>
                We typically respond within one business day.
              </Typography>

              {/* form fields */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <Field
                  fullWidth
                  label="Full name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <Field
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <Field
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  sx={{ gridColumn: "1 / -1" }}
                />
                <Field
                  fullWidth
                  multiline
                  minRows={5}
                  label="How can we help?"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  sx={{ gridColumn: "1 / -1" }}
                />
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
                <ActionButton
                  type="submit"
                  variant="contained"
                  disabled={sending}
                  sx={{ bgcolor: "#222", color: "#fff" }}
                >
                  {sending ? "Sending…" : sent ? "Message sent ✓" : "Send message"}
                </ActionButton>

                <ActionButton
                  variant="text"
                  href="mailto:hello@clark21.org"
                  startIcon={<EmailRoundedIcon />}
                  sx={{ color: "#222" }}
                >
                  Or email directly
                </ActionButton>
              </Stack>

              {/* Optional map / image placeholder */}
              <Box
                sx={{
                  mt: 4,
                  height: 220,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.06)",
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))",
                  display: "grid",
                  placeItems: "center",
                  color: "#555",
                }}
              >
                <Typography sx={{ fontSize: 14 }}>
                  Map / image placeholder (optional)
                </Typography>
              </Box>
            </CardContent>
          </GlassCard>
        </SectionGrid>
      </Container>
    </Box>
  );
}
