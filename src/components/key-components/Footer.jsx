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

/* ----------------------------- Styles ----------------------------- */
const Wrapper = styled("footer")(({ theme }) => ({
  backgroundColor: "#E8E5DD",
  color: "#1a1a1a",
  borderTop: "1px solid #2c2c2c",
  paddingTop: `max(${theme.spacing(4)}, env(safe-area-inset-top))`,
  paddingBottom: `max(${theme.spacing(2.5)}, env(safe-area-inset-bottom))`,
  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
  },
  [theme.breakpoints.up("md")]: {
    // desktop unchanged
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  // fluid on mobile, original feel at md+
  fontSize: "clamp(1.1rem, 3.8vw, 1.4rem)",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.up("sm")]: {
    marginBottom: theme.spacing(2),
  },
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
  width: 44,
  height: 44,
  "&:hover": { backgroundColor: "#f7f7f7" },
  [theme.breakpoints.up("sm")]: {
    width: 48,
    height: 48,
  },
}));

export default function Footer({
  brand = "Clark21Foundation",
  onSubscribe,
  instagramUrl = "https://www.instagram.com/seanclark21foundation/",
  facebookUrl = "#",
  xUrl = "#",
  youtubeUrl = "#",
}) {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = () => {
    if (onSubscribe) onSubscribe(email);
    setEmail("");
  };

  return (
    <Wrapper>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: SITE_MAX_WIDTH,
          mx: "auto",
          // comfy edges on phones + safe areas
          px: {
            xs: "max(16px, env(safe-area-inset-left))",
            sm: 3,
          },
          pr: { xs: "max(16px, env(safe-area-inset-right))", sm: 3 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, sm: 4 }}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          {/* Brand + Short blurb */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: 0.75,
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "1.25rem", sm: "1.35rem", md: "1.5rem" },
                letterSpacing: { xs: 0.2, md: 0 },
              }}
            >
              {brand}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "0.95rem", sm: "1rem" },
              }}
            >
              Live Like Sean, A Friend To All
            </Typography>

            <Box
              display="flex"
              gap={1}
              sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
            >
              <SocialButton
                aria-label="Instagram"
                component="a"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </SocialButton>
              <SocialButton
                aria-label="Facebook"
                component="a"
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </SocialButton>
              <SocialButton
                aria-label="X / Twitter"
                component="a"
                href={xUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon />
              </SocialButton>
              <SocialButton
                aria-label="YouTube"
                component="a"
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTubeIcon />
              </SocialButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Heading variant="h6" sx={{ textAlign: { xs: "center", sm: "left" } }}>
              Quick Links
            </Heading>

            {/* 2-column on phones to reduce scrolling, single column at sm+ */}
            <Box
              sx={{
                display: "grid",
                gap: 1.1,
                gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr" },
                textAlign: { xs: "center", sm: "left" },
                justifyItems: { xs: "center", sm: "start" },
              }}
            >
              <Link href="#/about" underline="hover" color="inherit">
                About
              </Link>
              <Link href="#/events" underline="hover" color="inherit">
                Events
              </Link>
              <Link href="#/give" underline="hover" color="inherit">
                Give
              </Link>
              <Link href="#/shop" underline="hover" color="inherit">
                Shop
              </Link>
              <Link href="#/contact" underline="hover" color="inherit">
                Contact
              </Link>
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
              sx={{
                mb: { xs: 1.5, sm: 2 },
                textAlign: { xs: "center", sm: "left" },
              }}
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
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                gap: 1,
                maxWidth: 520,
                mx: { xs: "auto", sm: 0 },
              }}
            >
              <TextField
                fullWidth
                type="email"
                inputMode="email"
                autoComplete="email"
                size="small"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ backgroundColor: "#fff" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <PillButton
                type="submit"
                sx={{
                  minHeight: 40,
                  px: { xs: 2.25, sm: 2.5 },
                  mt: { xs: 0.5, sm: 0 },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Subscribe
              </PillButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 2, sm: 3 }, borderColor: "#2c2c2c" }} />

        {/* Bottom row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "wrap",
            alignItems: { xs: "center", sm: "center" },
            justifyContent: { xs: "center", sm: "space-between" },
            gap: { xs: 1, sm: 1.5 },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ order: { xs: 2, sm: 1 } }}
          >
            © {new Date().getFullYear()} {brand}. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mx: { xs: "auto", sm: 0 },
              order: { xs: 1, sm: 2 },
              mb: { xs: 0.5, sm: 0 },
            }}
          >
            <Link href="/#/privacy-policy" underline="hover" color="inherit" variant="body2">
              Privacy Policy
            </Link>
            <Link href="#/terms" underline="hover" color="inherit" variant="body2">
              Terms of Service
            </Link>
            <Link href="#/accessibility" underline="hover" color="inherit" variant="body2">
              Accessibility
            </Link>
          </Box>
        </Box>
      </Container>
    </Wrapper>
  );
}
