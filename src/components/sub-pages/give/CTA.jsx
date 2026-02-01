// src/components/sections/CTABanner.jsx
import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogContent,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
  IconButton
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Initialize Stripe
const stripePromise = loadStripe("pk_test_51S5GVoJ4l6wcuQjqumKxBRRzSSA1MzkJOPBvQSaiamXz3efvVuuAcaqiScw7B4rEPc0yCIRbQGK3lZZz2RTIYsrz000Fg5ceCT");

/* ----------------------------- Tokens ----------------------------- */
const KELLY = "#339c5e";
const INK = "#0e1113";

const Background = styled(Box)(({ theme }) => ({
  background: "#E8E5DD",
}));
/* Full-bleed wrapper */
const Wrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
  borderRadius: 22,
  color: "#fff",
  overflow: "hidden",
  background: `
radial - gradient(1200px 1200px at 90 % -20 %, ${alpha("#fff", 0.18)} 0 %, transparent 60 %),
  radial - gradient(900px 900px at - 10 % 110 %, ${alpha("#000", 0.25)} 0 %, transparent 60 %),
  linear - gradient(180deg, ${KELLY}, ${KELLY})
    `,
  borderTop: `1px solid ${alpha("#000", 0.08)} `,
  borderBottom: `1px solid ${alpha("#000", 0.08)} `,
}));

const Pattern = styled("div")(({ theme }) => ({
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
  backgroundImage: `
linear - gradient(0deg, ${alpha("#fff", 0.06)} 1px, transparent 1px),
  linear - gradient(90deg, ${alpha("#fff", 0.06)} 1px, transparent 1px)
    `,
  backgroundSize: "22px 22px, 22px 22px",
  mixBlendMode: "overlay",
  opacity: 0.35,
}));

const CTAButton = styled(Button)(({ theme }) => ({
  borderRadius: 14,
  textTransform: "none",
  fontWeight: 800,
  padding: "12px 18px",
  boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
}));

/* ----------------------------- Component ----------------------------- */
const CTABanner = ({
  title = "Honor Sean’s Legacy—Give Hope Today",
  subtitle =
  "Your gift powers youth sports, counseling, and mentorship that build mental resiliency and community.",
  primaryLabel = "Donate Now",
  // Default behavior is overridden if no prop is passed, but we'll use a local handler if onPrimary is default
  onPrimary,
  secondaryLabel = "Learn More",
  onSecondary = () => window.location.assign("/#/about"),
  extra = null,
}) => {
  // Donation State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [status, setStatus] = useState("idle");
  const [clientSecret, setClientSecret] = useState("");

  const presets = [25, 50, 100, 250, 500];

  const displayAmount = useMemo(() => {
    const c = Number(custom.replace(/[^\d]/g, "")) || 0;
    return custom ? c : amount;
  }, [custom, amount]);

  const isValid = displayAmount >= 1;

  const handlePreset = (val) => {
    setAmount(val);
    setCustom("");
  };

  const handleDonateClick = () => {
    // If user passed a custom onPrimary, use it. Otherwise open modal.
    if (onPrimary) {
      onPrimary();
    } else {
      setIsModalOpen(true);
    }
  };

  const createPaymentIntent = async () => {
    if (status === "processing") return;
    setStatus("processing");

    try {
      // const response = await fetch("http://localhost:3001/api/create-payment-intent", {
      const response = await fetch("https://two1-foundation-server.onrender.com/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Ensure we send at least $1
        body: JSON.stringify({ amount: Math.max(1, displayAmount), currency: "usd" }),
      });

      if (response.ok) {
        const data = await response.json();
        setClientSecret(data.clientSecret);
        // Status remains 'processing' or we can switch to 'ready' to show the checkout form
        // But CheckoutForm is shown when clientSecret is present.
        setStatus("idle");
      } else {
        const errorData = await response.json();
        alert(`Backend Error: ${errorData.error || "Unknown error"} `);
        setStatus("idle");
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Network Error: Could not connect to backend.");
      setStatus("idle");
    }
  };

  const handlePaymentSuccess = () => {
    setStatus("success");
    // Close modal after a delay or let user close it? 
    // Usually we show a success message.
  };

  const handleClose = () => {
    setIsModalOpen(false);
    // Reset state after transition
    setTimeout(() => {
      setStatus("idle");
      setClientSecret("");
      setCustom("");
      setAmount(50);
    }, 300);
  };

  const pretty = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const stripeAppearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: KELLY,
      borderRadius: '12px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
  };

  return (
    <Background>
      <Wrap
        component={motion.section}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Pattern />

        {/* full-width container with comfy gutters */}
        <Container
          maxWidth={false}
          disableGutters
          sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}
        >
          {/* Centered column */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.55, ease: "easeOut" }}
            sx={{
              textAlign: "center",
              maxWidth: 900,
              mx: "auto",
            }}
          >
            <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.9 }}>
              MAKE AN IMPACT
            </Typography>

            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.5,
                mt: 0.5,
                lineHeight: 1.15,
              }}
            >
              {title}
            </Typography>

            <Typography variant="body1" sx={{ mt: 1.5, opacity: 0.92 }}>
              {subtitle}
            </Typography>

            {/* Buttons centered below subtitle */}
            <Stack
              direction="row"
              spacing={1.5}
              justifyContent="center"
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
              sx={{ mt: 3 }}
            >
              <CTAButton
                size="large"
                variant="contained"
                color="inherit"
                onClick={handleDonateClick}
                startIcon={<VolunteerActivismRoundedIcon />}
                sx={{
                  background: "#fff",
                  color: KELLY,
                  "&:hover": { background: alpha("#fff", 0.92) },
                }}
                aria-label={primaryLabel}
              >
                {primaryLabel}
              </CTAButton>

              <CTAButton
                size="large"
                variant="outlined"
                onClick={onSecondary}
                startIcon={<FavoriteRoundedIcon />}
                sx={{
                  borderColor: alpha("#fff", 0.9),
                  color: "#fff",
                  "&:hover": { borderColor: "#fff", background: alpha("#fff", 0.08) },
                }}
                aria-label={secondaryLabel}
              >
                {secondaryLabel}
              </CTAButton>
            </Stack>

            {/* Optional tiny line under buttons (centered) */}
            {extra && (
              <Box sx={{ mt: 1.5, opacity: 0.82 }}>
                {extra}
              </Box>
            )}
          </Box>
        </Container>
      </Wrap>

      {/* Donation Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        scroll="body"
        BackdropProps={{
          sx: {
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(14, 17, 19, 0.45)",
          },
        }}
        PaperProps={{
          elevation: 24,
          sx: {
            borderRadius: 6,
            p: 0,
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
          }
        }}
      >
        {/* Modal Header */}
        <Box sx={{
          px: 3, pt: 3, pb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: INK, fontSize: "1.1rem" }}>
            Make a Secure Gift
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              color: alpha(INK, 0.5),
              bgcolor: alpha(INK, 0.04),
              "&:hover": { bgcolor: alpha(INK, 0.08), color: INK }
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 4, pt: 2 }}>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                  >
                    <VolunteerActivismRoundedIcon
                      sx={{ fontSize: 80, color: KELLY, mb: 3 }}
                    />
                  </motion.div>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: INK, mb: 1.5 }}>
                    Thank You!
                  </Typography>
                  <Typography variant="body1" sx={{ color: alpha(INK, 0.6), mb: 5, maxWidth: 300, mx: "auto", lineHeight: 1.6 }}>
                    Your donation helps us extend our reach.
                  </Typography>
                  <Button
                    onClick={handleClose}
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: KELLY,
                      borderRadius: 3,
                      height: 54,
                      textTransform: "none",
                      fontWeight: 700
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </motion.div>
            ) : clientSecret ? (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Elements options={{ clientSecret, appearance: stripeAppearance }} stripe={stripePromise}>
                  <CheckoutForm
                    amount={pretty(displayAmount)}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setClientSecret("")} // Go back
                  />
                </Elements>
              </motion.div>
            ) : (
              <motion.div
                key="selection"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, color: alpha(INK, 0.5), mb: 2, textTransform: "uppercase", letterSpacing: 1, fontSize: "0.75rem", textAlign: "center" }}>
                  Choose Donation Amount
                </Typography>

                {/* Presets Grid */}
                <Box sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 1.5,
                  mb: 3
                }}>
                  {presets.map((p) => {
                    const active = !custom && amount === p;
                    return (
                      <Chip
                        key={p}
                        label={pretty(p)}
                        onClick={() => handlePreset(p)}
                        variant="filled" // Always filled for better click target
                        sx={{
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          height: 52,
                          borderRadius: 3,
                          width: "100%",
                          bgcolor: active ? KELLY : "#f2f4f7",
                          color: active ? "#fff" : INK,
                          "&:hover": {
                            bgcolor: active ? alpha(KELLY, 0.9) : "#e8ebf0",
                            color: active ? "#fff" : KELLY,
                          },
                          // Override default Chip label padding for centering
                          "& .MuiChip-label": { px: 1, width: "100%", textAlign: "center" }
                        }}
                      />
                    );
                  })}
                </Box>

                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    value={custom}
                    placeholder="Enter custom amount"
                    onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start" sx={{ mr: 1 }}><Typography sx={{ fontWeight: 700, fontSize: "1.1rem", color: INK }}>$</Typography></InputAdornment>,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 54,
                        borderRadius: 3,
                        bgcolor: "#fff",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        fieldset: { borderColor: alpha(INK, 0.15) },
                        "&:hover fieldset": { borderColor: alpha(INK, 0.3) },
                        "&.Mui-focused fieldset": { borderColor: KELLY, borderWidth: 2 }
                      }
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={!isValid || status === "processing"}
                  onClick={createPaymentIntent}
                  sx={{
                    bgcolor: KELLY,
                    color: "#fff",
                    borderRadius: 3,
                    height: 56,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 10px 20px rgba(51, 156, 94, 0.25)",
                    "&:hover": {
                      bgcolor: alpha(KELLY, 0.9),
                      boxShadow: "0 10px 25px rgba(51, 156, 94, 0.35)",
                      transform: "translateY(-1px)"
                    },
                    transition: "all 0.2s ease"
                  }}
                >
                  {status === "processing" ? <CircularProgress size={24} color="inherit" /> : `Donate ${pretty(displayAmount)} `}
                </Button>

                <Box sx={{ textAlign: "center", mt: 2.5 }}>
                  <Typography variant="caption" sx={{ color: alpha(INK, 0.45) }}>
                    Secure 256-bit encrypted payment
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </Background>
  );
};

export default CTABanner;
