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
                                mb: 6,
                                maxWidth: "90%",
                                mx: { xs: "auto", md: 0 },
                            }}
                        >
                            {subtitle}
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                            {[
                                { label: "Venmo", value: "@SC21-Foundation", color: "#008CFF", icon: "V" },
                                { label: "Cash App", value: "$SC21Foundation", color: "#00D632", icon: "$" },
                                { label: "Zelle", value: "info@sc21foundation.org", color: "#6D1ED4", icon: "Z" },
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
                                                width: 48,
                                                height: 48,
                                                borderRadius: 3,
                                                bgcolor: alpha(item.color, 0.1),
                                                color: item.color,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontWeight: 800,
                                                fontSize: "1.25rem",
                                            }}
                                        >
                                            {item.icon}
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
                            <Box
                                sx={{
                                    mt: 2,
                                    p: 3,
                                    borderRadius: 4,
                                    bgcolor: alpha(ACCENT, 0.04),
                                    border: `1px dashed ${alpha(ACCENT, 0.3)}`,
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
                            </Box>
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
                onClose={() => setIsModalOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 4, p: 2 }
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
