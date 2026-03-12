import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
  CircularProgress,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CTA from "../../key-components/CTA"
import CheckoutForm from "../give/CheckoutForm";

// Initialize Stripe (REPLACE WITH YOUR PUBLISHABLE KEY from Donations2.jsx)
const stripePromise = loadStripe("pk_test_51S5GVoJ4l6wcuQjqumKxBRRzSSA1MzkJOPBvQSaiamXz3efvVuuAcaqiScw7B4rEPc0yCIRbQGK3lZZz2RTIYsrz000Fg5ceCT");

const products = [
  {
    id: 1,
    title: "Black Live Like Sean Tee",
    price: 28,
    image: "/shop/black-shirt-front1.png",
    imageBack: "/shop/black-shirt-back.png",
    tag: "Apparel",
    slug: "live-like-sean-tee",
  },
  {
    id: 2,
    title: "Cream Live Like Sean Tee",
    price: 25,
    image: "/shop/cream-shirt-front.png",
    imageBack: "/shop/cream-shirt-back.png",
    tag: "Apparel",
    slug: "kelly-green-cap",
  },
  // {
  //   id: 3,
  //   title: "Live Like Sean Tee 3",
  //   price: 20,
  //   image: "/shirt.jpg",
  //   tag: "Accessories",
  //   slug: "foundation-tote",
  // },
  // {
  //   id: 4,
  //   title: "Live Like Sean Tee 4",
  //   price: 30,
  //   image: "/shirt.jpg",
  //   tag: "Accessories",
  //   slug: "insulated-bottle",
  // },
  // {
  //   id: 5,
  //   title: "Live Like Sean Tee 5",
  //   price: 55,
  //   image: "/shirt.jpg",
  //   tag: "Apparel",
  //   slug: "minimal-hoodie",
  // },
  // {
  //   id: 6,
  //   title: "Live Like Sean Tee 6",
  //   price: 8,
  //   image: "/shirt.jpg",
  //   tag: "Merch",
  //   slug: "sticker-pack",
  // },
];

const Shop = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Payment State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [currentStep, setCurrentStep] = useState(null); // 'size', 'shipping', 'payment'
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", apt: "", city: "", state: "", zip: "", note: ""
  });

  const handleShippingChange = (e) => {
    setShippingDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitShipping = (e) => {
    e.preventDefault();
    initializePayment(selectedProduct, size, shippingDetails);
  };

  // 2. Initialize Payment
  const initializePayment = async (product, size = null, shipping = {}) => {
    setLoadingConfig(true);

    try {
      // const response = await fetch("http://localhost:3001/api/create-payment-intent", {
      const response = await fetch("https://two1-foundation-server.onrender.com/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: product.price,
          currency: "usd",
          description: `Purchase: ${product.title} ${size ? `(Size: ${size})` : ""}`,
          receipt_email: shipping.email || undefined,
          shipping: shipping.firstName ? {
            name: `${shipping.firstName} ${shipping.lastName}`.trim(),
            address: {
              line1: shipping.address,
              line2: shipping.apt || undefined,
              city: shipping.city,
              state: shipping.state,
              postal_code: shipping.zip,
              country: "US"
            }
          } : undefined,
          metadata: {
            productId: product.id,
            productTitle: product.title,
            productSlug: product.slug,
            size: size || "N/A",
            customerName: `${shipping.firstName || ''} ${shipping.lastName || ''}`.trim(),
            customerEmail: shipping.email || "",
            customerPhone: shipping.phone || "",
            shippingAddress: shipping.address ? `${shipping.address} ${shipping.apt ? `Apt ${shipping.apt}` : ''}, ${shipping.city}, ${shipping.state} ${shipping.zip}` : "",
            orderNote: shipping.note || ""
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setClientSecret(data.clientSecret);
        setCurrentStep("payment");
        setIsModalOpen(true);
      } else {
        const errorData = await response.json();
        alert(`Backend Error: ${errorData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Network Error: Could not connect to backend (is it running on port 3001?)");
    } finally {
      setLoadingConfig(false);
    }
  };

  // 1. Handle Buy Now Click
  const handleBuy = (product) => {
    setSelectedProduct(product);
    setSize(null);
    setClientSecret(""); // Reset previous session
    setShippingDetails({
      firstName: "", lastName: "", email: "", phone: "",
      address: "", apt: "", city: "", state: "", zip: "", note: ""
    });

    if (product.tag === "Apparel") {
      // Open modal for Size Selection first
      setCurrentStep("size");
      setIsModalOpen(true);
    } else {
      // No size needed, go to shipping step directly
      setCurrentStep("shipping");
      setIsModalOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    setIsModalOpen(false);
    alert(`Payment successful! Thank you for purchasing the ${selectedProduct?.title}.`);
    // Optionally clear cart or redirect
  };

  // Stripe appearance
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#339c5e',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "#E8E5DD", py: 4 }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: { xs: 0, md: 6 }, pt: { xs: 8, md: 4 } }}>
            <Typography
              variant="overline"
              sx={{
                color: "#666",
                letterSpacing: 2,
                fontSize: "0.8rem",
                mb: 3,
                display: "block",
              }}
            >
              MENTAL HEALTH OUTREACH
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: "3rem", md: "3.5rem" },
                fontWeight: 400,
                color: "#333",
                lineHeight: 1.3,
                maxWidth: "900px",
                mx: "auto",
                fontFamily: "serif",
              }}
            >
              {/* PURPOSEFUL GOODS */}
              {/* <br /> */}
              SHOP
              <br />—
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 4,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",                          // 1 column on mobile
                md: products.length === 2 ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
              },
              gap: 3,
            }}
          >

            {products.map((p) => (
              <Box key={p.id}>
                <Card
                  sx={{
                    height: 420,
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  {/* Image */}
                  <CardMedia
                    component="img"
                    src={p.image}
                    alt={p.title}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop";
                    }}
                    sx={{
                      height: "100%",
                      filter: "brightness(0.85)",
                      objectFit: "contain",
                    }}
                  />

                  {/* Soft gradient overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />

                  {/* Tag */}
                  <Chip
                    label={p.tag}
                    size="small"
                    sx={{
                      position: "absolute",
                      left: 16,
                      top: 16,
                      bgcolor: "rgba(255,255,255,0.85)",
                      color: "#222",
                      fontWeight: 600,
                      letterSpacing: 0.4,
                      textTransform: "uppercase",
                    }}
                  />

                  {/* Text + CTAs */}
                  <CardContent
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      color: "white",
                      textAlign: "left",
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "serif",
                        fontWeight: 400,
                        lineHeight: 1.2,
                        textShadow: "1px 1px 2px rgba(0,0,0,0.35)",
                        mb: 1,
                      }}
                    >
                      {p.title}
                    </Typography>

                    <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 2 }}>
                      ${p.price.toFixed(2)}
                    </Typography>

                    <Box
                      sx={{
                        width: 60,
                        height: 2,
                        bgcolor: "white",
                        opacity: 0.85,
                        mb: 2,
                      }}
                    />

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Button
                        onClick={() => handleBuy(p)}
                        variant="contained"
                        size={isMobile ? "small" : "medium"}
                        disabled={loadingConfig}
                        sx={{
                          color: "#111",
                          bgcolor: "rgba(255,255,255,0.92)",
                          textTransform: "none",
                          fontWeight: 600,
                          "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                        }}
                      >
                        {loadingConfig && selectedProduct?.id === p.id ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "Buy Now"
                        )}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>


          {/* Footer note */}
          {/* <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography
              variant="body2"
              sx={{ color: "#555", maxWidth: 680, mx: "auto", lineHeight: 1.7 }}
            >
              100% of proceeds support our outreach and programs. Every purchase
              fuels the mission to carry Sean&apos;s spirit forward.
            </Typography>
          </Box> */}
        </Container>


        {/* Payment Modal */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 4, p: 2, position: "relative" }
          }}
        >
          <IconButton
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: "text.secondary",
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            {/* 1. Size Selection Step (for Apparel) */}
            {currentStep === "size" && selectedProduct && selectedProduct.tag === "Apparel" && (
              <Box sx={{ textAlign: "center", py: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
                  <Box
                    component="img"
                    src={selectedProduct.image}
                    alt={`${selectedProduct.title} Front`}
                    sx={{
                      width: { xs: 140, sm: 180 },
                      height: { xs: 140, sm: 180 },
                      objectFit: "contain",
                      borderRadius: 2,
                      mixBlendMode: "multiply"
                    }}
                  />
                  {selectedProduct.imageBack && (
                    <Box
                      component="img"
                      src={selectedProduct.imageBack}
                      alt={`${selectedProduct.title} Back`}
                      sx={{
                        width: { xs: 140, sm: 180 },
                        height: { xs: 140, sm: 180 },
                        objectFit: "contain",
                        borderRadius: 2,
                        mixBlendMode: "multiply"
                      }}
                    />
                  )}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Select Size
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                  For {selectedProduct.title}
                </Typography>

                <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
                  {["S", "M", "L", "XL", "2XL", "3XL"].map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      onClick={() => setSize(s)}
                      variant={size === s ? "filled" : "outlined"}
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "1rem",
                        transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        bgcolor: size === s ? "#339c5e" : "transparent",
                        color: size === s ? "#fff" : "text.primary",
                        borderColor: size === s ? "#339c5e" : "rgba(0,0,0,0.15)",
                        borderWidth: size === s ? 0 : 2,
                        "& .MuiChip-label": {
                          padding: 0,
                        },
                        "&:hover": {
                          bgcolor: size === s ? "#2d8a53" : "rgba(51, 156, 94, 0.08)",
                          borderColor: "#339c5e",
                          transform: "scale(1.1)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                        }
                      }}
                    />
                  ))}
                </Box>

                <Button
                  variant="contained"
                  disabled={!size}
                  onClick={() => setCurrentStep("shipping")}
                  fullWidth
                  sx={{
                    py: 1.5,
                    bgcolor: "#339c5e",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": { bgcolor: "#2d8a53" }
                  }}
                >
                  Continue
                </Button>
              </Box>
            )}

            {/* 1.5 Shipping & Contact Step */}
            {currentStep === "shipping" && selectedProduct && (
              <Box component="form" onSubmit={submitShipping} sx={{ py: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: "center", fontFamily: "serif" }}>
                  Delivery Details
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", mb: 4 }}>
                  Where should we send your {selectedProduct.title}?
                </Typography>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "text.secondary", mb: 2, borderBottom: "1px solid rgba(0,0,0,0.1)", pb: 1 }}>
                  Contact Info
                </Typography>
                <Grid container spacing={2.5} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="First Name" name="firstName" value={shippingDetails.firstName} onChange={handleShippingChange}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fafafa", "&.Mui-focused": { bgcolor: "#fff", boxShadow: "0 4px 12px rgba(51, 156, 94, 0.08)" }, "& fieldset": { borderColor: "rgba(0,0,0,0.1)" }, "&:hover fieldset": { borderColor: "rgba(0,0,0,0.2)" }, "&.Mui-focused fieldset": { borderColor: "#339c5e", borderWidth: 2 } },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#339c5e", fontWeight: 600 }
                      }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Last Name" name="lastName" value={shippingDetails.lastName} onChange={handleShippingChange}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fafafa", "&.Mui-focused": { bgcolor: "#fff", boxShadow: "0 4px 12px rgba(51, 156, 94, 0.08)" }, "& fieldset": { borderColor: "rgba(0,0,0,0.1)" }, "&:hover fieldset": { borderColor: "rgba(0,0,0,0.2)" }, "&.Mui-focused fieldset": { borderColor: "#339c5e", borderWidth: 2 } },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#339c5e", fontWeight: 600 }
                      }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Email" type="email" name="email" value={shippingDetails.email} onChange={handleShippingChange}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fafafa", "&.Mui-focused": { bgcolor: "#fff", boxShadow: "0 4px 12px rgba(51, 156, 94, 0.08)" }, "& fieldset": { borderColor: "rgba(0,0,0,0.1)" }, "&:hover fieldset": { borderColor: "rgba(0,0,0,0.2)" }, "&.Mui-focused fieldset": { borderColor: "#339c5e", borderWidth: 2 } },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#339c5e", fontWeight: 600 }
                      }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Phone" type="tel" name="phone" value={shippingDetails.phone} onChange={handleShippingChange}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fafafa", "&.Mui-focused": { bgcolor: "#fff", boxShadow: "0 4px 12px rgba(51, 156, 94, 0.08)" }, "& fieldset": { borderColor: "rgba(0,0,0,0.1)" }, "&:hover fieldset": { borderColor: "rgba(0,0,0,0.2)" }, "&.Mui-focused fieldset": { borderColor: "#339c5e", borderWidth: 2 } },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#339c5e", fontWeight: 600 }
                      }} />
                  </Grid>
                </Grid>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "text.secondary", mb: 2, borderBottom: "1px solid rgba(0,0,0,0.1)", pb: 1 }}>
                  Shipping Address
                </Typography>
                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField required fullWidth label="Address Line 1" name="address" value={shippingDetails.address} onChange={handleShippingChange}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fafafa", "&.Mui-focused": { bgcolor: "#fff", boxShadow: "0 4px 12px rgba(51, 156, 94, 0.08)" }, "& fieldset": { borderColor: "rgba(0,0,0,0.1)" }, "&:hover fieldset": { borderColor: "rgba(0,0,0,0.2)" }, "&.Mui-focused fieldset": { borderColor: "#339c5e", borderWidth: 2 } },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#339c5e", fontWeight: 600 }
                      }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Apt, Suite, etc. (Optional)" name="apt" value={shippingDetails.apt} onChange={handleShippingChange}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fafafa", "&.Mui-focused": { bgcolor: "#fff", boxShadow: "0 4px 12px rgba(51, 156, 94, 0.08)" }, "& fieldset": { borderColor: "rgba(0,0,0,0.1)" }, "&:hover fieldset": { borderColor: "rgba(0,0,0,0.2)" }, "&.Mui-focused fieldset": { borderColor: "#339c5e", borderWidth: 2 } },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#339c5e", fontWeight: 600 }
                      }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField required fullWidth label="City" name="city" value={shippingDetails.city} onChange={handleShippingChange}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fafafa", "&.Mui-focused": { bgcolor: "#fff", boxShadow: "0 4px 12px rgba(51, 156, 94, 0.08)" }, "& fieldset": { borderColor: "rgba(0,0,0,0.1)" }, "&:hover fieldset": { borderColor: "rgba(0,0,0,0.2)" }, "&.Mui-focused fieldset": { borderColor: "#339c5e", borderWidth: 2 } },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#339c5e", fontWeight: 600 }
                      }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField required fullWidth label="State" name="state" value={shippingDetails.state} onChange={handleShippingChange}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fafafa", "&.Mui-focused": { bgcolor: "#fff", boxShadow: "0 4px 12px rgba(51, 156, 94, 0.08)" }, "& fieldset": { borderColor: "rgba(0,0,0,0.1)" }, "&:hover fieldset": { borderColor: "rgba(0,0,0,0.2)" }, "&.Mui-focused fieldset": { borderColor: "#339c5e", borderWidth: 2 } },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#339c5e", fontWeight: 600 }
                      }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField required fullWidth label="ZIP Code" name="zip" value={shippingDetails.zip} onChange={handleShippingChange}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fafafa", "&.Mui-focused": { bgcolor: "#fff", boxShadow: "0 4px 12px rgba(51, 156, 94, 0.08)" }, "& fieldset": { borderColor: "rgba(0,0,0,0.1)" }, "&:hover fieldset": { borderColor: "rgba(0,0,0,0.2)" }, "&.Mui-focused fieldset": { borderColor: "#339c5e", borderWidth: 2 } },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#339c5e", fontWeight: 600 }
                      }} />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loadingConfig}
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.5,
                    bgcolor: "#339c5e",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": { bgcolor: "#2d8a53" }
                  }}
                >
                  {loadingConfig ? <CircularProgress size={24} color="inherit" /> : `Continue to Payment - $${selectedProduct.price.toFixed(2)}`}
                </Button>
              </Box>
            )}

            {/* 2. Payment Step */}
            {currentStep === "payment" && clientSecret && selectedProduct && (
              <>
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "rgba(0,0,0,0.03)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    border: "1px solid rgba(0,0,0,0.06)"
                  }}
                >
                  <Box
                    component="img"
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: "contain",
                      borderRadius: 1,
                      mixBlendMode: "multiply"
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                      {selectedProduct.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      ${selectedProduct.price.toFixed(2)} {size && `• Size: ${size}`}
                    </Typography>
                  </Box>
                </Box>
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm
                    amount={`$${selectedProduct.price.toFixed(2)}`}
                    submitLabel={`Confirm Purchase - $${selectedProduct.price.toFixed(2)}`}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setIsModalOpen(false)}
                  />
                </Elements>
              </>
            )}
          </DialogContent>
        </Dialog>

      </Box>

      <CTA />
    </>
  );
};

export default Shop;
