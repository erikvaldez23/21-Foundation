import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Chip,
  Divider,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Link as MuiLink,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

/* =========================
   Donations sub‑page for a Foundation (mental outreach)
   - One‑time / Monthly toggle, presets + custom amount
   - Tribute gifts, fee coverage, employer match prompt
   - Sidebar: impact stats, transparency, other ways to give
   - Replace the submit handler with your payment provider (Stripe / Pushpay)
   ========================= */

const Page = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(180deg, ${alpha(
    theme.palette.primary.light,
  0.18)}, ${alpha(theme.palette.background.default, 1)})`,
  color: theme.palette.text.primary,
}));

const Glass = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  background: alpha("#fff", 0.05),
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha("#fff", 0.1)}`,
  boxShadow: "0 10px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
}));

const SectionHeader = ({ title, subtitle }) => (
  <Box sx={{ textAlign: "center", mb: 4 }}>
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

export default function Donations() {
  const [interval, setInterval] = useState("one_time");
  const [amount, setAmount] = useState(50);
  const [coverFees, setCoverFees] = useState(true);
  const [tribute, setTribute] = useState(false);
  const [honoree, setHonoree] = useState({ name: "", email: "" });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [match, setMatch] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ open: false, msg: "", ok: true });

  const presets = interval === "monthly" ? [10, 25, 50, 100] : [25, 50, 100, 250];

  const fee = useMemo(() => {
    const a = Number(amount) || 0;
    // Example processing fee math (2.9% + $0.30). Adjust to your provider.
    const base = a * 0.029 + 0.3;
    return Math.round(base * 100) / 100;
  }, [amount]);

  const total = useMemo(() => {
    const a = Number(amount) || 0;
    return coverFees ? (Math.round((a + fee) * 100) / 100) : a;
  }, [amount, coverFees, fee]);

  const validAmount = Number(amount) >= 1;
  const emailValid = /\S+@\S+\.\S+/.test(email);

  const handleGive = async (e) => {
    e.preventDefault();
    if (!validAmount) return setToast({ open: true, msg: "Please enter at least $1", ok: false });
    if (!emailValid) return setToast({ open: true, msg: "Enter a valid email for your receipt", ok: false });

    setSubmitting(true);
    try {
      // \u26A0\uFE0F Replace with your payment flow (Stripe Checkout / Pushpay / etc.)
      // Example body you might send:
      // const res = await fetch("/api/donations/checkout", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ interval, amount: Number(amount), coverFees, tribute, honoree, email, name, match })
      // });
      // const { checkoutUrl } = await res.json();
      // window.location.href = checkoutUrl;
      await new Promise((r) => setTimeout(r, 1000));
      setToast({ open: true, msg: "Thanks for your generous gift!", ok: true });
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
          title="Give the Gift of Hope"
          subtitle="Your donation funds mental health outreach, peer mentoring, and youth programs. Every dollar moves someone closer to help."
        />

        <Grid container spacing={4}>
          {/* Left: Donation form */}
          <Grid item xs={12} md={7}>
            <Glass component={motion.form}
              onSubmit={handleGive}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              sx={{ p: { xs: 2.5, md: 4 } }}
            >
              <CardHeader
                title={<Typography variant="h5" sx={{ fontWeight: 800 }}>Choose your gift</Typography>}
                subheader={<Typography variant="body2" sx={{ opacity: 0.8 }}>Secure and tax‑deductible to the extent allowed by law.</Typography>}
              />

              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                  <ToggleButtonGroup
                    exclusive
                    value={interval}
                    onChange={(_, v) => v && setInterval(v)}
                    sx={{ borderRadius: 2 }}
                  >
                    <ToggleButton value="one_time">One‑time</ToggleButton>
                    <ToggleButton value="monthly">Monthly</ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25, mb: 2 }}>
                  {presets.map((p) => (
                    <Chip
                      key={p}
                      label={`$${p}`}
                      onClick={() => setAmount(p)}
                      variant={Number(amount) === p ? "filled" : "outlined"}
                      color={Number(amount) === p ? "primary" : "default"}
                      sx={{ borderRadius: 2, fontWeight: 700 }}
                    />
                  ))}
                  <Chip
                    label="Custom"
                    onClick={() => setAmount("")}
                    variant={isNaN(Number(amount)) ? "filled" : "outlined"}
                    sx={{ borderRadius: 2 }}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Donation amount"
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9.]/g, "");
                    setAmount(val);
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  helperText={!validAmount ? "Minimum $1" : ""}
                  error={!validAmount}
                  sx={{ mb: 2 }}
                />

                <FormControlLabel
                  control={<Checkbox checked={coverFees} onChange={(e) => setCoverFees(e.target.checked)} />}
                  label={`Add $${fee.toFixed(2)} to cover processing fees (new total $${total.toFixed(2)})`}
                />

                <Divider sx={{ my: 2, opacity: 0.1 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Receipt email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={!!email && !emailValid}
                      helperText={!!email && !emailValid ? "Enter a valid email" : "We'll send your tax receipt here"}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={<Checkbox checked={tribute} onChange={(e) => setTribute(e.target.checked)} />}
                    label="This gift is in honor or memory of someone"
                  />

                  {tribute && (
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                      <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Honoree name" value={honoree.name} onChange={(e) => setHonoree({ ...honoree, name: e.target.value })} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Notify by email (optional)" value={honoree.email} onChange={(e) => setHonoree({ ...honoree, email: e.target.value })} />
                      </Grid>
                    </Grid>
                  )}
                </Box>

                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={<Checkbox checked={match} onChange={(e) => setMatch(e.target.checked)} />}
                    label={
                      <Box sx={{ display: "inline" }}>
                        My employer matches donations <Typography component="span" sx={{ opacity: 0.6 }}>— we’ll email a reminder with next steps.</Typography>
                      </Box>
                    }
                  />
                </Box>

                <LoadingButton
                  type="submit"
                  loading={submitting}
                  variant="contained"
                  size="large"
                  startIcon={<FavoriteRoundedIcon />}
                  sx={{ mt: 2, borderRadius: 2, fontWeight: 800 }}
                >
                  {interval === "monthly" ? "Start Monthly Gift" : "Donate Now"}
                </LoadingButton>

                <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1, opacity: 0.8 }}>
                  <ShieldRoundedIcon fontSize="small" />
                  <Typography variant="caption">256‑bit SSL encryption • PCI‑compliant processing</Typography>
                </Box>
              </CardContent>
            </Glass>
          </Grid>

          {/* Right: Impact & Transparency */}
          <Grid item xs={12} md={5}>
            <Box component={motion.div} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Glass sx={{ p: { xs: 2.5, md: 3 }, mb: 3 }}>
                <CardHeader title={<Typography variant="h6" sx={{ fontWeight: 800 }}>Your impact</Typography>} />
                <CardContent sx={{ pt: 0 }}>
                  <ImpactRow amount={25} text="Covers a week of peer‑support check‑ins for a student" />
                  <ImpactRow amount={50} text="Funds a starter toolkit for youth mental health ambassadors" />
                  <ImpactRow amount={100} text="Provides a small group workshop at a local school" />
                  <ImpactRow amount={250} text="Sponsors community outreach and resources for families" />
                </CardContent>
              </Glass>

              <Glass sx={{ p: { xs: 2.5, md: 3 }, mb: 3 }}>
                <CardHeader title={<Typography variant="h6" sx={{ fontWeight: 800 }}>Transparency</Typography>} />
                <CardContent sx={{ pt: 0 }}>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>
                    We’re committed to stewarding every dollar wisely. View our latest annual report and Form 990.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextLink href="#">Annual Report 2024</TextLink>
                    <TextLink href="#">Form 990</TextLink>
                  </Box>
                </CardContent>
              </Glass>

              <Glass sx={{ p: { xs: 2.5, md: 3 } }}>
                <CardHeader title={<Typography variant="h6" sx={{ fontWeight: 800 }}>Other ways to give</Typography>} />
                <CardContent sx={{ pt: 0 }}>
                  <Bullet>Mail a check to: <strong>Your Foundation, PO Box 123, DFW, TX</strong></Bullet>
                  <Bullet>ACH / Wire: <strong>Request instructions</strong></Bullet>
                  <Bullet>Corporate gifts &amp; sponsorships</Bullet>
                  <Bullet>In‑kind donations for youth programs</Bullet>
                  <Divider sx={{ my: 2, opacity: 0.08 }} />
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center", opacity: 0.85 }}>
                    <VerifiedRoundedIcon fontSize="small" />
                    <Typography variant="caption">Gifts are tax‑deductible to the extent allowed by law. A receipt will be emailed to you.</Typography>
                  </Box>
                </CardContent>
              </Glass>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar open={toast.open} autoHideDuration={3800} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.ok ? "success" : "error"} variant="filled" sx={{ width: "100%" }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Page>
  );
}

/* ===== Small components ===== */
const ImpactRow = ({ amount, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.75 }}>
    <Chip label={`$${amount}`} color="primary" variant="outlined" sx={{ borderRadius: 2, fontWeight: 700 }} />
    <Typography variant="body2" sx={{ ml: 1.5, opacity: 0.9 }}>{text}</Typography>
  </Box>
);

const TextLink = ({ href, children }) => (
  <MuiLink href={href} target="_blank" rel="noopener" underline="hover" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, fontWeight: 700 }}>
    {children}
    <OpenInNewRoundedIcon sx={{ fontSize: 16, opacity: 0.7 }} />
  </MuiLink>
);

const Bullet = ({ children }) => (
  <Box sx={{ display: "flex", alignItems: "start", gap: 1, mb: 0.75 }}>
    <VolunteerActivismRoundedIcon sx={{ fontSize: 18, mt: 0.25, opacity: 0.75 }} />
    <Typography variant="body2">{children}</Typography>
  </Box>
);
