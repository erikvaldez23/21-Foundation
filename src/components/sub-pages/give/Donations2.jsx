// src/components/sections/DonationsSection.jsx
import React, { useMemo, useState } from "react";
import {
    Box,
    Container,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
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
import { styled, alpha } from "@mui/material/styles";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Initialize Stripe outside of component to avoid recreating stripe object on every render
// REPLACE WITH YOUR PUBLISHABLE KEY
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

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
    defaultFreq = "one-time",
    defaultAmount = 50,
    buttonLabel = "Donate",
    disclaimer = "Donations are tax-deductible where applicable. You’ll receive an email receipt.",
    image = "/image29.JPG",
    imageCaption = "Your generosity in action.",
    progress = { raised: 200, goal: 10000 }, // set to null to hide
    onDonate = (payload) => console.log("Donate payload:", payload),
}) => {
    const [freq, setFreq] = useState(defaultFreq);
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
        setIsModalOpen(false);
        setStatus("success");
        const finalAmount = Math.max(1, displayAmount);
        onDonate({ frequency: freq, amount: finalAmount, currency: "USD", method: "stripe" });
    };

    const handleReset = () => {
        setStatus("idle");
        setAmount(defaultAmount);
        setCustom("");
        setFreq(defaultFreq);
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
        <SectionWrap id="donate" sx={{ py: { xs: 8, md: 12 }, px: 4 }}>
            <Glow />
            <Container maxWidth="xl">
                {/* ---- GRID: 60% form / 40% image ---- */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "60% 40%" },
                        gap: { xs: 3, md: 6 },
                        alignItems: "stretch",
                    }}
                >
                    {/* Left: Form or Success Message */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            px: { xs: 2, md: 1 },
                            textAlign: { xs: "center", md: "left" },
                            maxWidth: 720,
                            mx: { xs: "auto", md: 0 },
                            minHeight: 400, // Prevent layout jump
                        }}
                    >
                        {status === "success" ? (
                            <Fade in>
                                <Box sx={{ textAlign: "center", py: 4 }}>
                                    <CheckCircleRoundedIcon
                                        sx={{ fontSize: 64, color: ACCENT, mb: 2 }}
                                    />
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                                        Thank You!
                                    </Typography>
                                    <Typography variant="body1" sx={{ opacity: 0.7, mb: 4 }}>
                                        Your donation of <strong>{pretty(Math.max(1, displayAmount))}</strong> has been received.
                                        <br />
                                        Your support means the world to us.
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={handleReset}
                                        sx={{
                                            borderRadius: 12,
                                            textTransform: "none",
                                            fontWeight: 700,
                                            borderColor: alpha(INK, 0.2),
                                            color: INK,
                                        }}
                                    >
                                        Make another donation
                                    </Button>
                                </Box>
                            </Fade>
                        ) : (
                            <>
                                <Typography
                                    variant="overline"
                                    sx={{
                                        display: "block",
                                        letterSpacing: 2,
                                        color: alpha(INK, 0.55),
                                        mb: 1,
                                        fontSize: { xs: 11, md: 12 },
                                    }}
                                >
                                    SUPPORT THE MISSION
                                </Typography>

                                <Typography
                                    component="h2"
                                    sx={{
                                        fontWeight: 800,
                                        letterSpacing: -0.4,
                                        lineHeight: 1.06,
                                        fontSize: { xs: "clamp(28px, 6vw, 40px)", md: 44 },
                                    }}
                                >
                                    {title}
                                </Typography>

                                {subtitle && (
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mt: 1.25,
                                            opacity: 0.82,
                                            fontSize: { xs: "1rem", md: "1.05rem" },
                                        }}
                                    >
                                        {subtitle}
                                    </Typography>
                                )}

                                {/* Hairline divider for rhythm */}
                                <Divider sx={{ my: { xs: 3, md: 3.5 }, borderColor: HAIRLINE }} />

                                {/* Other Ways to Give Section */}
                                <Box>
                                    <Box sx={{ textAlign: "left", mb: 4 }}>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 4
                                        }}
                                    >
                                        {/* Payment Apps List */}
                                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 3 }}>
                                            <Box sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", bgcolor: "#fff", display: "flex", alignItems: "center", gap: 2 }}>
                                                <Box sx={{ width: 40, height: 40, bgcolor: "#008CFF", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "0.9rem" }}>V</Box>
                                                <Box>
                                                    <Typography variant="caption" sx={{ color: alpha(INK, 0.6), display: "block", lineHeight: 1 }}>Venmo</Typography>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>@SC21-Foundation</Typography>
                                                </Box>
                                            </Box>

                                            <Box sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", bgcolor: "#fff", display: "flex", alignItems: "center", gap: 2 }}>
                                                <Box sx={{ width: 40, height: 40, bgcolor: "#00D632", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "0.9rem" }}>$</Box>
                                                <Box>
                                                    <Typography variant="caption" sx={{ color: alpha(INK, 0.6), display: "block", lineHeight: 1 }}>Cash App</Typography>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>$SC21Foundation</Typography>
                                                </Box>
                                            </Box>

                                            <Box sx={{ p: 2, borderRadius: 3, border: "1px solid rgba(0,0,0,0.06)", bgcolor: "#fff", display: "flex", alignItems: "center", gap: 2 }}>
                                                <Box sx={{ width: 40, height: 40, bgcolor: "#6D1ED4", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "0.9rem" }}>Z</Box>
                                                <Box>
                                                    <Typography variant="caption" sx={{ color: alpha(INK, 0.6), display: "block", lineHeight: 1 }}>Zelle</Typography>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>info@sc21foundation.org</Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        {/* QR Code */}
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 3, p: 3, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 4 }}>
                                            <Box
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    bgcolor: "#fff",
                                                    borderRadius: 2,
                                                    border: "1px solid rgba(0,0,0,0.05)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0
                                                }}
                                            >
                                                <Typography variant="caption" sx={{ color: "#999", fontSize: "0.6rem", textAlign: "center" }}>QR Code</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Scan to Pay</Typography>
                                                <Typography variant="caption" sx={{ color: alpha(INK, 0.6), lineHeight: 1.4, display: "block" }}>
                                                    Use your phone camera to scan and donate instantly.
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>

                    {/* Right: Vertical Image (40%) */}
                    <Box
                        sx={{
                            position: "relative",
                            minHeight: { xs: 300, md: 560 },
                            borderRadius: 3,
                            overflow: "hidden",
                            background: "#111",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
                            border: `1px solid ${alpha("#000", 0.06)} `,
                        }}
                    >
                        <Box
                            component="img"
                            src={image}
                            alt="Donation"
                            loading="lazy"
                            decoding="async"
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

            {/* Payment Modal */}
            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, p: 1 }
                }}
            >
                <DialogContent>
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm
                                amount={pretty(displayAmount)}
                                onSuccess={handlePaymentSuccess}
                                onCancel={() => setIsModalOpen(false)}
                            />
                        </Elements>
                    )}
                </DialogContent>
            </Dialog>
        </SectionWrap>
    );
};

export default DonationsSection;
