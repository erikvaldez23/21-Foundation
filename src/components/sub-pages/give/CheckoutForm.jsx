import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { Box, Button, Typography, CircularProgress, Alert } from "@mui/material";
import { alpha } from "@mui/material/styles";

const CheckoutForm = ({ amount, onSuccess, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: window.location.origin,
            },
            redirect: "if_required", // Prevent redirect if not needed (e.g. for card payments)
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred.");
            }
            setIsLoading(false);
        } else {
            // Payment succeeded!
            onSuccess();
            setIsLoading(false);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
                <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            </Box>

            {message && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {message}
                </Alert>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Button
                    type="submit"
                    disabled={isLoading || !stripe || !elements}
                    variant="contained"
                    disableElevation
                    fullWidth
                    sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        height: 52,
                        borderRadius: 3,
                        bgcolor: "#339c5e",
                        boxShadow: "0 10px 20px rgba(51, 156, 94, 0.25)",
                        "&:hover": {
                            bgcolor: alpha("#339c5e", 0.9),
                            boxShadow: "0 10px 25px rgba(51, 156, 94, 0.35)",
                            transform: "translateY(-1px)"
                        },
                        transition: "all 0.2s ease",
                        color: "#fff"
                    }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : `Donate ${amount} `}
                </Button>

                <Button
                    onClick={onCancel}
                    disabled={isLoading}
                    fullWidth
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        color: "text.secondary",
                        height: 48,
                        borderRadius: 3,
                        "&:hover": { bgcolor: "rgba(0,0,0,0.04)" }
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </form>
    );
};

export default CheckoutForm;
