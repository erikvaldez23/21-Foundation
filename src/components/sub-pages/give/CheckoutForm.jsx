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
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Complete your purchase
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                    Enter your payment details below to purchase <strong>{amount}</strong>.
                </Typography>

                <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            </Box>

            {message && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                    onClick={onCancel}
                    disabled={isLoading}
                    sx={{ textTransform: "none", fontWeight: 600, color: "text.secondary" }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading || !stripe || !elements}
                    variant="contained"
                    disableElevation
                    sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        bgcolor: "#339c5e",
                        "&:hover": { bgcolor: alpha("#339c5e", 0.9) },
                        minWidth: 100,
                    }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : "Pay Now"}
                </Button>
            </Box>
        </form>
    );
};

export default CheckoutForm;
