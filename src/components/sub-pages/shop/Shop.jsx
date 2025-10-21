import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CTA from "../../key-components/CTA"

const products = [
  {
    id: 1,
    title: "Live Like Sean Tee",
    price: 28,
    image: "/shop/black-shirt-front.png", 
    tag: "Apparel",
    slug: "live-like-sean-tee",
  },
  {
    id: 2,
    title: "Live Like Sean Tee",
    price: 24,
    image: "/shop/cream-shirt-front.png", 
    tag: "Apparel",
    slug: "kelly-green-cap",
  },
  {
    id: 3,
    title: "Live Like Sean Tee",
    price: 20,
    image: "/shirt.jpg", 
    tag: "Accessories",
    slug: "foundation-tote",
  },
  {
    id: 4,
    title: "Live Like Sean Tee",
    price: 30,
    image: "/shirt.jpg",
    tag: "Accessories",
    slug: "insulated-bottle",
  },
  {
    id: 5,
    title: "Live Like Sean Tee",
    price: 55,
    image: "/shirt.jpg", 
    tag: "Apparel",
    slug: "minimal-hoodie",
  },
  {
    id: 6,
    title: "Live Like Sean Tee",
    price: 8,
    image: "/shirt.jpg",
    tag: "Merch",
    slug: "sticker-pack",
  },
];

const Shop = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
    <Box sx={{ minHeight: "100vh", bgcolor: "#E8E5DD", py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 0 ,md: 6 }, pt: { xs: 8 , md: 4 }}}>
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
      md: "repeat(3, minmax(0, 1fr))",    // keep 3 columns on desktop
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
                      onClick={() => console.log("Add to cart:", p.slug)}
                      variant="contained"
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        color: "#111",
                        bgcolor: "rgba(255,255,255,0.92)",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                      }}
                    >
                      Add to cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>


        {/* Footer note */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography
            variant="body2"
            sx={{ color: "#555", maxWidth: 680, mx: "auto", lineHeight: 1.7 }}
          >
            100% of proceeds support our outreach and programs. Every purchase
            fuels the mission to carry Sean&apos;s spirit forward.
          </Typography>
        </Box>
      </Container>

    </Box>

        <CTA />
</>
  );
};

export default Shop;
