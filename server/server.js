const path = require("path");
// Explicitly load .env from the server directory
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");

// Verify Stripe key is loaded
if (process.env.STRIPE_SECRET_KEY) {
  console.log("Stripe key loaded successfully!");
} else {
  console.error("ERROR: STRIPE_SECRET_KEY is missing. Check your .env file at:", path.join(__dirname, ".env"));
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("21 Foundation API is running");
});

app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "usd", description, metadata } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Create a PaymentIntent with the order amount and currency
    // Note: Amount is expected in the smallest currency unit (e.g., cents)
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency,
      description: description,
      metadata: metadata,
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

app.post('/api/contact', async (req, res) => {
  const { name, phone, message, subject, email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Sending to yourself
    subject: subject || `New Contact Form Submission from ${name}`,
    html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
  };

    try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

// --- Newsletter Routes ---
const fs = require("fs");
const SUBSCRIBERS_FILE = path.join(__dirname, "subscribers.json");

// Helper to get subscribers
const getSubscribers = () => {
  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(SUBSCRIBERS_FILE);
  try {
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

app.get("/api/newsletter", (req, res) => {
  const subscribers = getSubscribers();
  res.json(subscribers);
});

app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const subscribers = getSubscribers();

  if (subscribers.includes(email)) {
    return res.status(200).json({ message: "Email already subscribed" });
  }

  subscribers.push(email);
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));

  console.log(`New subscriber: ${email}`);
  res.json({ message: "Successfully subscribed!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
