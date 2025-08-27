import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Link as MuiLink,
  InputAdornment,
  Chip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";

/* =========================
   A compassionate outreach/contact page for a Foundation
   - MUI + Framer Motion, soft gradients
   - Validated form with loading + success state
   - Sidebar with direct contact, social links, and mental health resources
   ========================= */

const Page = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(180deg, ${alpha(
    theme.palette.primary.light,
    0.15
  )}, ${alpha(theme.palette.background.default, 1)})`,
  color: theme.palette.text.primary,
}));

const Glass = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  background: alpha("#fff", 0.05),
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha("#fff", 0.1)}`,
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const SectionHeader = ({ title, subtitle }) => (
  <Box sx={{ textAlign: "center", mb: 6 }}>
    <Typography
      component={motion.h1}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      variant="h3"
      sx={{ fontWeight: 700, letterSpacing: -0.4 }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        variant="subtitle1"
        sx={{ opacity: 0.8, mt: 1 }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

export default function ContactOutreach() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "Support Request",
    message: "",
    optIn: true,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ open: false, msg: "", ok: true });

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(values.email), [values.email]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name";
    if (!values.email.trim()) next.email = "We need an email to reply";
    if (values.email && !emailValid) next.email = "Enter a valid email";
    if (!values.message.trim()) next.message = "Please share your thoughts or concerns";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1000)); // mock
      setToast({ open: true, msg: "Thank you for reaching out. Our team will contact you soon.", ok: true });
      setValues((v) => ({ ...v, message: "" }));
    } catch (err) {
      setToast({ open: true, msg: "Something went wrong. Please try again.", ok: false });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page>
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeader
          title="We’re Here to Listen and Support"
          subtitle="Whether you’re seeking resources, sharing your story, or looking to collaborate, the Foundation welcomes you."
        />

        <Grid container spacing={4} alignItems="stretch">
          {/* Left: Form */}
          <Grid item xs={12} md={7} sx={{ display: "flex" }}>
            <Glass
              component={motion.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              sx={{ p: { xs: 2.5, md: 4 }, flexGrow: 1 }}
            >
              <CardHeader
                title={<Typography variant="h5" sx={{ fontWeight: 700 }}>Reach Out Confidentially</Typography>}
                subheader={<Typography variant="body2" sx={{ opacity: 0.8 }}>Your message is safe with us. We aim to respond within 24 hours.</Typography>}
              />
              <CardContent sx={{ pt: 0, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Full Name"
                      value={values.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      InputProps={{ startAdornment: (
                        <InputAdornment position="start">
                          <PersonRoundedIcon fontSize="small" />
                        </InputAdornment>
                      )}}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{ startAdornment: (
                        <InputAdornment position="start">
                          <EmailRoundedIcon fontSize="small" />
                        </InputAdornment>
                      )}}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      name="inquiry"
                      label="I’m reaching out for"
                      value={values.inquiry}
                      onChange={handleChange}
                    >
                      {["Support Request", "Volunteering", "Donations", "Partnership", "Other"].map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sx={{ flexGrow: 1, display: "flex" }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      name="message"
                      label="Your message"
                      placeholder="Please share what’s on your mind or how we can help."
                      value={values.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      sx={{ flexGrow: 1 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox name="optIn" checked={values.optIn} onChange={handleChange} />}
                      label={<Typography variant="body2">Keep me updated on programs and resources.</Typography>}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LoadingButton
                      type="submit"
                      loading={submitting}
                      variant="contained"
                      size="large"
                      endIcon={<SendRoundedIcon />}
                      sx={{ borderRadius: 2, fontWeight: 700 }}
                    >
                      Send Message
                    </LoadingButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Glass>
          </Grid>

          {/* Right: Support & Info */}
          <Grid item xs={12} md={5} sx={{ display: "flex" }}>
            <Glass sx={{ p: { xs: 2.5, md: 3 }, flexGrow: 1 }}>
              <CardHeader title={<Typography variant="h6" sx={{ fontWeight: 700 }}>Get Immediate Support</Typography>} />
              <CardContent sx={{ pt: 0, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  If you are in crisis or need urgent mental health support, please call 988 (U.S. Suicide & Crisis Lifeline) or your local emergency number.
                </Typography>

                <Divider sx={{ my: 2, opacity: 0.1 }} />

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Foundation Contact</Typography>
                <InfoRow icon={<EmailRoundedIcon />} label="Email" value="support@foundation.org" href="mailto:support@foundation.org" />
                <InfoRow icon={<PhoneIphoneRoundedIcon />} label="Phone" value="(555) 987-6543" href="tel:+15559876543" />
                <InfoRow icon={<VolunteerActivismRoundedIcon />} label="Volunteer" value="Join our outreach programs" href="#" />

                <Divider sx={{ my: 2, opacity: 0.1 }} />

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Follow & Share Hope</Typography>
                <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                  <Tooltip title="Twitter/X">
                    <IconButtonLink href="#" ariaLabel="Twitter"><TwitterIcon fontSize="small" /></IconButtonLink>
                  </Tooltip>
                  <Tooltip title="Instagram">
                    <IconButtonLink href="#" ariaLabel="Instagram"><InstagramIcon fontSize="small" /></IconButtonLink>
                  </Tooltip>
                  <Tooltip title="LinkedIn">
                    <IconButtonLink href="#" ariaLabel="LinkedIn"><LinkedInIcon fontSize="small" /></IconButtonLink>
                  </Tooltip>
                </Box>
              </CardContent>
            </Glass>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={3800}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.ok ? "success" : "error"} variant="filled" sx={{ width: "100%" }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Page>
  );
}

/* ===== Helpers ===== */
const IconButtonLink = ({ href, children, ariaLabel }) => (
  <IconButton
    component={MuiLink}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, bgcolor: "background.paper", '&:hover': { bgcolor: alpha('#fff', 0.08) } }}
  >
    {children}
  </IconButton>
);

const InfoRow = ({ icon, label, value, href }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
    <Box sx={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 2, bgcolor: alpha("#fff", 0.06), border: `1px solid ${alpha('#fff', 0.08)}` }}>{icon}</Box>
    <Box sx={{ display: "grid" }}>
      <Typography variant="caption" sx={{ opacity: 0.7 }}>{label}</Typography>
      {href ? (
        <MuiLink href={href} target="_blank" rel="noopener" underline="hover">
          <Typography variant="body1" sx={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>{value}<OpenInNewRoundedIcon sx={{ fontSize: 16, opacity: 0.7 }} /></Typography>
        </MuiLink>
      ) : (
        <Typography variant="body1" sx={{ fontWeight: 600 }}>{value}</Typography>
      )}
    </Box>
  </Box>
);
