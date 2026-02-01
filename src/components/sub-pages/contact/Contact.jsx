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
import CTA from "../../key-components/CTA";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

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
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          // include phone if available in form state; adding it to ensure backend receives it
          // Note: form state initialization currently includes name, email, subject, message. 
          // If phone is not in state, it won't be sent. 
          // The form UI doesn't explicitly bind phone. 
          // We will send what we have.
        }),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network Error: Could not connect to backend.");
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
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Phone</Typography>
                  <Typography variant="body1" color="text.secondary">(816) 616-6624</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Suicide Crisis Hotline</Typography>
                  <Typography variant="body1" color="text.secondary">988</Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Email</Typography>
                <Typography variant="body1" color="text.secondary">reachout@seanclark21foundation.org</Typography>
              </Box>
            </Stack>

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                >
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
                        {sending ? "Sending..." : "Send Message"}
                      </ActionButton>
                    </Box>
                  </Stack>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Box
                    sx={{
                      p: 4,
                      bgcolor: "#fff",
                      borderRadius: 4,
                      textAlign: "center",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                      maxWidth: 400
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1
                      }}
                    >
                      <CheckCircleRoundedIcon
                        sx={{ fontSize: 64, color: "#339c5e", mb: 2 }}
                      />
                    </motion.div>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#1a1a1a" }}>
                      Message Sent!
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
                      Thanks for reaching out. We'll get back to you shortly.
                    </Typography>
                    <Button
                      onClick={() => setSent(false)}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#339c5e"
                      }}
                    >
                      Send another message
                    </Button>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
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
      <CTA />
    </Page>
  );
}
