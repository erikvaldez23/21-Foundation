require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("21 Foundation API is running");
});

app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "usd" } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Create a PaymentIntent with the order amount and currency
    // Note: Amount is expected in the smallest currency unit (e.g., cents)
    // If the frontend sends dollars, we multiply by 100 here, or ensure frontend sends cents.
    // Let's assume frontend sends DOLLARS for simplicity in this example, so we convert to cents.
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
