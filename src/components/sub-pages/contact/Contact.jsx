import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ContactHero from "./ContactHero";

/* ---------------------------- Styles ---------------------------- */
const Page = styled(Box)({
  background: "#E8E5DD",
  minHeight: "100vh",
  color: "#1a1a1a",
});

const SerifHeading = styled(Typography)({
  fontFamily: "serif",
  fontWeight: 400,
  color: "#1a1a1a",
});

const MinimalField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    backgroundColor: "transparent",
    "& fieldset": {
      border: "none",
      borderBottom: "1px solid rgba(0,0,0,0.2)",
    },
    "&:hover fieldset": {
      borderBottom: "1px solid rgba(0,0,0,0.5)",
    },
    "&.Mui-focused fieldset": {
      borderBottom: "2px solid #1a1a1a",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#666",
    "&.Mui-focused": {
      color: "#1a1a1a",
    },
  },
});

const ActionButton = styled(Button)({
  borderRadius: 999,
  textTransform: "none",
  padding: "12px 32px",
  fontSize: "1rem",
  fontWeight: 600,
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: "#000",
  },
});

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
    <Page>
      <ContactHero />
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 6, md: 8, lg: 12 },
            alignItems: "start",
          }}
        >
          {/* LEFT: Content & Form */}
          <Box>
            <Typography variant="overline" sx={{ letterSpacing: 2, color: "#666", display: "block", mb: 2 }}>
              Get in Touch
            </Typography>
            <SerifHeading variant="h2" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, mb: 3, lineHeight: 1.1 }}>
              We're here to help.
            </SerifHeading>
            <Typography sx={{ color: "#444", fontSize: "1.1rem", lineHeight: 1.6, mb: 6, maxWidth: 480 }}>
              Whether you have a question about services, need support, or just want to say hello—reach out. We’ll respond as soon as we can.
            </Typography>

            <Stack spacing={4} sx={{ mb: 8 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Phone</Typography>
                <Typography variant="body1" color="text.secondary">(123) 456-7890</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Email</Typography>
                <Typography variant="body1" color="text.secondary">reachout@seanclark21foundation.org</Typography>
              </Box>
            </Stack>

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
                  <MinimalField
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                  <MinimalField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Box>
                <MinimalField
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  fullWidth
                />
                <MinimalField
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  multiline
                  minRows={4}
                  fullWidth
                  required
                />
                <Box>
                  <ActionButton
                    type="submit"
                    variant="contained"
                    disabled={sending}
                    sx={{
                      bgcolor: "#1a1a1a",
                      color: "#fff",
                    }}
                  >
                    {sending ? "Sending..." : sent ? "Message Sent" : "Send Message"}
                  </ActionButton>
                </Box>
              </Stack>
            </form>
          </Box>

          {/* RIGHT: Vertical Image */}
          <Box
            sx={{
              position: "relative",
              height: { xs: 400, md: "100%" },
              minHeight: { md: 800 },
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src="/image13.JPG"
              alt="Contact us"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
