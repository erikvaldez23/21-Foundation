// components/FooterClark.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

// --- tweak this to match your site (e.g., 1200, 1280, 1440) ---
const SITE_MAX_WIDTH = 1200;

// ---- Styles ----
const Wrapper = styled("footer")(({ theme }) => ({
  backgroundColor: "#E8E5DD",
  color: "#1a1a1a",
  borderTop: "1px solid #2c2c2c",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(3),
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  fontSize: "1.4rem",
  marginBottom: theme.spacing(2),
}));

const PillButton = styled(Button)(({ theme }) => ({
  borderRadius: 9999,
  textTransform: "none",
  padding: "10px 20px",
  fontWeight: 600,
  backgroundColor: "#2FA652",
  color: "#fff",
  boxShadow: "none",
  "&:hover": { backgroundColor: "#268a45", boxShadow: "none" },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  backgroundColor: "#fff",
  "&:hover": { backgroundColor: "#f7f7f7" },
}));

export default function Footer({ brand = "Clark21Foundation", onSubscribe }) {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = () => {
    if (onSubscribe) onSubscribe(email);
    setEmail("");
  };

  return (
    <Wrapper>
      {/* Use a full-width Container, then constrain + center with maxWidth */}
      <Container
        maxWidth={false}
        sx={{
          maxWidth: SITE_MAX_WIDTH,
          mx: "auto",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          {/* Brand + Short blurb */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 1, textAlign: { xs: "center", md: "left" } }}
            >
              {brand}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, textAlign: { xs: "center", md: "left" } }}
            >
              Live Like Sean, A Friend To All
            </Typography>

            <Box
              display="flex"
              gap={1}
              sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
            >
              <SocialButton aria-label="Instagram"><InstagramIcon /></SocialButton>
              <SocialButton aria-label="Facebook"><FacebookIcon /></SocialButton>
              <SocialButton aria-label="X / Twitter"><XIcon /></SocialButton>
              <SocialButton aria-label="YouTube"><YouTubeIcon /></SocialButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Heading variant="h6" sx={{ textAlign: { xs: "center", sm: "left" } }}>
              Quick Links
            </Heading>
            <Box
              sx={{
                display: "grid",
                gap: 1.2,
                textAlign: { xs: "center", sm: "left" },
                justifyItems: { xs: "center", sm: "start" },
              }}
            >
              <Link href="#" underline="hover" color="inherit">About</Link>
              <Link href="#" underline="hover" color="inherit">Events</Link>
              <Link href="#" underline="hover" color="inherit">Give</Link>
              <Link href="#" underline="hover" color="inherit">Shop</Link>
              <Link href="#" underline="hover" color="inherit">Contact</Link>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={4}>
            <Heading variant="h6" sx={{ textAlign: { xs: "center", sm: "left" } }}>
              Stay in the loop
            </Heading>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}
            >
              Get updates on upcoming events and community programs.
            </Typography>

            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubscribe();
              }}
              sx={{
                display: "flex",
                gap: 1,
                maxWidth: 520,
                mx: { xs: "auto", sm: 0 },
              }}
            >
              <TextField
                fullWidth
                size="medium"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <PillButton type="submit">Subscribe</PillButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "#2c2c2c" }} />

        {/* Bottom row */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {brand}. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mx: { xs: "auto", sm: 0 } }}>
            <Link href="#" underline="hover" color="inherit" variant="body2">
              Privacy Policy
            </Link>
            <Link href="#" underline="hover" color="inherit" variant="body2">
              Terms of Service
            </Link>
            <Link href="#" underline="hover" color="inherit" variant="body2">
              Accessibility
            </Link>
          </Box>
        </Box>
      </Container>
    </Wrapper>
  );
}
