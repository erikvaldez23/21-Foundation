// src/components/sections/DonationsSection.jsx
import React, { useMemo, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Chip,
    TextField,
    InputAdornment,
    Button,
    LinearProgress,
    Divider,
    CircularProgress,
    Fade,
    Dialog,
    DialogContent,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import { styled, alpha } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Initialize Stripe outside of component to avoid recreating stripe object on every render
// REPLACE WITH YOUR PUBLISHABLE KEY
const stripePromise = loadStripe("pk_test_51S5GVoJ4l6wcuQjqumKxBRRzSSA1MzkJOPBvQSaiamXz3efvVuuAcaqiScw7B4rEPc0yCIRbQGK3lZZz2RTIYsrz000Fg5ceCT");

/* ---------------------------- Design Tokens ---------------------------- */
const ACCENT = "#339c5e";            // Kelly green
const INK = "#0e1113";
const CANVAS = "#E8E5DD";            // your site background
const HAIRLINE = "rgba(0,0,0,0.08)";

/* ----------------------------- Chrome --------------------------------- */
const SectionWrap = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    color: INK,
    background: CANVAS,
    overflow: "hidden",
}));

const Glow = styled("div")(({ theme }) => ({
    position: "absolute",
    inset: "auto -22% -40% -22%",
    height: 520,
    pointerEvents: "none",
    filter: "blur(80px)",
    background: `radial - gradient(60 % 60 % at 50 % 50 %, ${alpha(ACCENT, 0.22)} 0 %, transparent 60 %)`,
}));

/* ---------------------------- Helpers --------------------------------- */
const pretty = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/* ---------------------------- Component -------------------------------- */
const DonationsSection = ({
    title = "Make a Gift",
    subtitle = "Your support fuels outreach, mentorship, and counseling—advancing Sean’s legacy of kindness and courage.",
    presets = [25, 50, 100, 250, 500],
    defaultAmount = 50,
    buttonLabel = "Donate",
    disclaimer = "Donations are tax-deductible where applicable. You’ll receive an email receipt.",
    image = "/image29.JPG",
    imageCaption = "Your generosity in action.",
    progress = { raised: 200, goal: 10000 }, // set to null to hide
    onDonate = (payload) => console.log("Donate payload:", payload),
}) => {
    const [amount, setAmount] = useState(defaultAmount);
    const [custom, setCustom] = useState("");
    const [status, setStatus] = useState("idle"); // idle, processing, success
    const [clientSecret, setClientSecret] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const displayAmount = useMemo(() => {
        const c = Number(custom.replace(/[^\d]/g, "")) || 0;
        return custom ? c : amount;
    }, [custom, amount]);

    const pct = useMemo(() => {
        if (!progress) return null;
        const p = Math.min(100, Math.round((progress.raised / progress.goal) * 100));
        return Number.isFinite(p) ? p : null;
    }, [progress]);

    const isValid = displayAmount >= 1;

    const handlePreset = (val) => {
        setAmount(val);
        setCustom("");
    };

    const handleDonate = async (method = "card") => {
        if (status === "processing" || status === "success") return;

        setStatus("processing");

        try {
            // 1. Create PaymentIntent on the backend
            const response = await fetch("http://localhost:3001/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: Math.max(1, displayAmount), currency: "usd" }),
            });

            if (response.ok) {
                const data = await response.json();
                setClientSecret(data.clientSecret);
                setIsModalOpen(true);
                setStatus("idle"); // Reset status so they can interact with the modal
            } else {
                const errorData = await response.json();
                console.error("Backend Error:", errorData);
                alert(`Backend Error: ${errorData.error || "Unknown error"} `);
                setStatus("idle");
            }
        } catch (err) {
            console.error("Network Error:", err);
            alert("Network Error: Could not connect to backend (is it running on port 3001?)");
            setStatus("idle");
        }
    };

    const handlePaymentSuccess = () => {
        // Keep modal open to show success message
        setStatus("success");
        const finalAmount = Math.max(1, displayAmount);
        onDonate({ frequency: "one-time", amount: finalAmount, currency: "USD", method: "stripe" });
    };

    const handleReset = () => {
        setStatus("idle");
        setAmount(defaultAmount);
        setCustom("");
        setClientSecret("");
    };

    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: ACCENT,
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <SectionWrap id="donate" sx={{ py: { xs: 4, md: 12 }, px: { xs: 1, md: 4 } }}>
            <Glow />
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: { xs: 6, md: 8 },
                        alignItems: "center",
                    }}
                >
                    {/* Left: Content & Payment Methods */}
                    <Box sx={{ maxWidth: 600, mx: { xs: "auto", md: 0 }, textAlign: { xs: "center", md: "left" } }}>
                        <Typography
                            variant="overline"
                            sx={{
                                display: "block",
                                letterSpacing: 3,
                                color: ACCENT,
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: 11, md: 12 },
                            }}
                        >
                            SUPPORT THE MISSION
                        </Typography>

                        <Typography
                            variant="h2"
                            sx={{
                                display: { xs: "none", md: "block" },
                                fontFamily: "'Playfair Display', serif",
                                fontWeight: 800,
                                letterSpacing: -0.5,
                                lineHeight: 1.1,
                                fontSize: { xs: "2.5rem", md: "3.5rem" },
                                mb: 3,
                                color: INK,
                            }}
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: alpha(INK, 0.7),
                                fontSize: { xs: "1.1rem", md: "1.25rem" },
                                lineHeight: 1.6,
                                mb: 4,
                                maxWidth: "90%",
                                mx: { xs: "auto", md: 0 },
                            }}
                        >
                            {subtitle}
                        </Typography>

                        {/* --- Stripe Donation Form --- */}
                        <Box sx={{ mb: 0, minHeight: 250 }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key="form-view"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Hairline divider for rhythm */}
                                    <Divider sx={{ my: 3, borderColor: HAIRLINE }} />

                                    {/* Presets */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            flexWrap: "wrap",
                                            justifyContent: { xs: "center", md: "flex-start" },
                                            mb: 2.25
                                        }}
                                    >
                                        {presets.map((p) => {
                                            const active = !custom && amount === p;
                                            return (
                                                <Chip
                                                    key={p}
                                                    label={pretty(p)}
                                                    onClick={() => handlePreset(p)}
                                                    clickable={status !== "processing"}
                                                    variant={active ? "filled" : "outlined"}
                                                    sx={{
                                                        fontWeight: 700,
                                                        borderRadius: 999,
                                                        borderColor: active
                                                            ? alpha(ACCENT, 0.35)
                                                            : alpha(INK, 0.18),
                                                        color: active ? "#fff" : INK,
                                                        bgcolor: active ? ACCENT : alpha(ACCENT, 0.06),
                                                        "&:hover": {
                                                            bgcolor: active
                                                                ? alpha(ACCENT, 0.92)
                                                                : alpha(ACCENT, 0.12),
                                                        },
                                                        opacity: status === "processing" ? 0.6 : 1,
                                                        pointerEvents: status === "processing" ? "none" : "auto",
                                                    }}
                                                />
                                            );
                                        })}
                                    </Box>

                                    {/* Custom amount */}
                                    <Box
                                        sx={{ mb: 3, maxWidth: 360, mx: { xs: "auto", md: 0 } }}
                                    >
                                        <TextField
                                            fullWidth
                                            inputMode="numeric"
                                            value={custom}
                                            placeholder="Custom amount"
                                            onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
                                            disabled={status === "processing"}
                                            aria-label="Custom donation amount"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">$</InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 14,
                                                    bgcolor: "#fff",
                                                    transition:
                                                        "box-shadow .2s ease, border-color .2s ease",
                                                    "& fieldset": { borderColor: alpha(INK, 0.16) },
                                                    "&:hover fieldset": {
                                                        borderColor: alpha(ACCENT, 0.45),
                                                    },
                                                    "&.Mui-focused": {
                                                        boxShadow: `0 0 0 3px ${alpha(ACCENT, 0.18)} `,
                                                    },
                                                    "&.Mui-focused fieldset": { borderColor: ACCENT },
                                                },
                                            }}
                                        />
                                    </Box>

                                    {/* Pay Button */}
                                    <Button
                                        size="large"
                                        disableElevation
                                        onClick={() => handleDonate("card")}
                                        disabled={!isValid || status === "processing"}
                                        sx={{
                                            px: 3,
                                            py: 1.5,
                                            fontWeight: 800,
                                            borderRadius: 12,
                                            textTransform: "none",
                                            bgcolor: isValid ? ACCENT : alpha(ACCENT, 0.35),
                                            color: "#fff",
                                            transition: "transform .06s ease, background .2s ease",
                                            width: "100%",
                                            maxWidth: 360,
                                            "&:hover": {
                                                bgcolor: isValid
                                                    ? alpha(ACCENT, 0.92)
                                                    : alpha(ACCENT, 0.35),
                                                transform: isValid ? "translateY(-1px)" : "none",
                                            },
                                            "&:active": { transform: "translateY(0)" },
                                        }}
                                    >
                                        {status === "processing" ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            <>
                                                Donate {pretty(displayAmount)} with Card
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                            </AnimatePresence>
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                            {[
                                { label: "Venmo", value: "@SC21-Foundation", color: "#008CFF", img: "/venmo-logo.png" },
                                { label: "Cash App", value: "$SC21Foundation", color: "#00D632", img: "/cashapp-logo.png" },
                                { label: "Zelle", value: "info@sc21foundation.org", color: "#6D1ED4", img: "/zelle-logo.png" },
                            ].map((item) => (
                                <Box
                                    key={item.label}
                                    sx={{
                                        p: 3,
                                        borderRadius: 4,
                                        bgcolor: "#fff",
                                        border: "1px solid",
                                        borderColor: "rgba(0,0,0,0.06)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 3,
                                        transition: "all 0.3s ease",
                                        cursor: "default",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                                        "&:hover": {
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                                            borderColor: alpha(item.color, 0.3),
                                        },
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 3,
                                                bgcolor: "#fff", // alpha(item.color, 0.05) if transparent images
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                p: 1,
                                                border: `1px solid ${alpha(INK, 0.06)}`
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={item.img}
                                                alt={item.label}
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ textAlign: "left" }}>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: alpha(INK, 0.5) }}>
                                                {item.label}
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: INK, fontSize: { xs: "1rem", sm: "1.1rem" } }}>
                                                {item.value}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}

                            {/* QR Code Section */}
                            {/* <Box
                                sx={{
                                    mt: 2,
                                    p: 3,
                                    borderRadius: 4,
                                    bgcolor: alpha(ACCENT, 0.04),
                                    border: `1px dashed ${ alpha(ACCENT, 0.3) } `,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 3,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        bgcolor: "#fff",
                                        borderRadius: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <Typography variant="caption" sx={{ color: alpha(INK, 0.4), fontWeight: 600, fontSize: "0.65rem" }}>
                                        QR Code
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "left" }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: INK }}>
                                        Scan to Pay
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: alpha(INK, 0.6) }}>
                                        Use your camera to donate instantly.
                                    </Typography>
                                </Box>
                            </Box> */}
                        </Box>
                    </Box>

                    {/* Right: Feature Image */}
                    <Box
                        sx={{
                            position: "relative",
                            height: { xs: 400, md: 700 },
                            width: "100%",
                            borderRadius: { xs: 4, md: 6 },
                            overflow: "hidden",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                        }}
                    >
                        <Box
                            component="img"
                            src={image}
                            alt="Donation Impact"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 1s ease",
                                "&:hover": { transform: "scale(1.03)" },
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)",
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                position: "absolute",
                                bottom: 24,
                                left: 24,
                                color: "rgba(255,255,255,0.9)",
                                fontWeight: 500,
                                bgcolor: "rgba(0,0,0,0.3)",
                                backdropFilter: "blur(10px)",
                                py: 1,
                                px: 2,
                                borderRadius: 99,
                            }}
                        >
                            {imageCaption}
                        </Typography>
                    </Box>
                </Box>
            </Container>

            {/* Payment Modal (Preserved logic even if not triggered currently) */}
            <Dialog
                open={isModalOpen}
                onClose={() => {
                    if (status === "success") {
                        handleReset();
                        setIsModalOpen(false);
                    } else {
                        setIsModalOpen(false);
                    }
                }}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 4, p: 2 }
                }}
            >
                <DialogContent>
                    {status === "success" ? (
                        <Box
                            sx={{
                                textAlign: "center",
                                py: 5,
                                px: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                background: `linear-gradient(to bottom, ${alpha(ACCENT, 0.05)} 0%, rgba(255,255,255,0) 100%)`,
                                borderRadius: 3,
                            }}
                        >
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
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 100,
                                        height: 100,
                                        borderRadius: "50%",
                                        bgcolor: alpha(ACCENT, 0.12),
                                        mb: 3,
                                        color: ACCENT,
                                        boxShadow: `0 8px 32px ${alpha(ACCENT, 0.2)}`,
                                    }}
                                >
                                    <VolunteerActivismRoundedIcon sx={{ fontSize: 48 }} />
                                </Box>
                            </motion.div>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontWeight: 800,
                                    color: INK,
                                    mb: 1.5,
                                    fontSize: { xs: "2rem", sm: "2.5rem" }
                                }}
                            >
                                Thank You!
                            </Typography>
                            <Typography variant="body1" sx={{ color: alpha(INK, 0.65), mb: 4, maxWidth: 360, lineHeight: 1.6 }}>
                                Your support allows us to continue our mission. We are incredibly grateful.
                            </Typography>
                            <Button
                                fullWidth
                                disableElevation
                                onClick={() => {
                                    handleReset();
                                    setIsModalOpen(false);
                                }}
                                sx={{
                                    py: 1.5,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    color: '#fff',
                                    fontSize: "1.05rem",
                                    bgcolor: ACCENT,
                                    borderRadius: 12,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        bgcolor: "#267a49", // Darker shade of Kelly Green
                                        transform: "translateY(-1px)",
                                        boxShadow: "0 8px 20px -4px rgba(51, 156, 94, 0.4)"
                                    },
                                    "&:active": {
                                        transform: "translateY(0)",
                                    }
                                }}
                            >
                                Close
                            </Button>
                        </Box>
                    ) : (
                        clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm
                                    amount={pretty(displayAmount)}
                                    onSuccess={handlePaymentSuccess}
                                    onCancel={() => setIsModalOpen(false)}
                                />
                            </Elements>
                        )
                    )}
                </DialogContent>
            </Dialog>
        </SectionWrap>
    );
};

export default DonationsSection;
