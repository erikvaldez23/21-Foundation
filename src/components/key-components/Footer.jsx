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
  paddingTop: `max(${theme.spacing(6)}, env(safe-area-inset-top))`,
  paddingBottom: `max(${theme.spacing(4)}, env(safe-area-inset-bottom))`,
  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  // fluid on mobile, original feel at md+
  fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
  marginBottom: theme.spacing(2),
}));

const PillButton = styled(Button)(({ theme }) => ({
  borderRadius: 9999,
  textTransform: "none",
  padding: "12px 24px",
  fontWeight: 600,
  fontSize: "1rem",
  backgroundColor: "#2FA652",
  color: "#fff",
  boxShadow: "none",
  "&:hover": { backgroundColor: "#268a45", boxShadow: "none" },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  backgroundColor: "#fff",
  width: 48,
  height: 48,
  color: "#1a1a1a",
  transition: "all 0.2s ease",
  "&:hover": { backgroundColor: "#1a1a1a", color: "#fff", transform: "translateY(-2px)" },
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
          px: {
            xs: "max(20px, env(safe-area-inset-left))",
            sm: 4,
          },
          pr: { xs: "max(20px, env(safe-area-inset-right))", sm: 4 },
        }}
      >
        <Grid
          container
          rowSpacing={{ xs: 6, sm: 4 }}
          columnSpacing={{ xs: 4, sm: 4 }}
          justifyContent="space-between"
        >
          {/* Brand + Short blurb */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 800,
                  mb: 1.5,
                  fontSize: { xs: "2rem", md: "2.25rem" },
                  letterSpacing: -0.5,
                  lineHeight: 1,
                }}
              >
                {brand}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: "rgba(0,0,0,0.7)",
                  fontSize: { xs: "1.05rem", sm: "1.1rem" },
                  maxWidth: { xs: "300px", md: "100%" },
                }}
              >
                Live Like Sean, A Friend To All
              </Typography>

              <Box
                display="flex"
                gap={1.5}
                sx={{
                  justifyContent: { xs: "center", md: "flex-start" },
                  mb: { xs: 1, md: 0 }
                }}
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
            </Box>
          </Grid>

          {/* Quick Links - Hidden on Mobile */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: { xs: "none", sm: "block" } }}>
            <Heading variant="h6">
              Quick Links
            </Heading>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {["About", "Events", "Give", "Shop", "Contact"].map((text) => (
                <Link
                  key={text}
                  href={`#/${text.toLowerCase()}`}
                  underline="none"
                  color="text.secondary"
                  sx={{
                    transition: "color 0.2s",
                    "&:hover": { color: "#2FA652" },
                    fontSize: "1.05rem"
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <Heading variant="h6">
                Stay in the loop
              </Heading>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 3,
                  fontSize: "1rem",
                  maxWidth: { xs: "300px", sm: "100%" },
                }}
              >
                Get updates on upcoming events and community programs directly to your inbox.
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
                  gap: 1.5,
                  width: { xs: "100%", sm: "auto" },
                  maxWidth: { xs: "400px", sm: "none" }
                }}
              >
                <TextField
                  fullWidth
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: "9999px",
                      pr: 1,
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(0,0,0,0.1)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2FA652",
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ pl: 1 }}>
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <PillButton
                  type="submit"
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    boxShadow: "0 4px 12px rgba(47, 166, 82, 0.2)",
                  }}
                >
                  Subscribe
                </PillButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 4, sm: 5 }, borderColor: "rgba(0,0,0,0.08)" }} />

        {/* Bottom row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              order: { xs: 2, sm: 1 },
              opacity: 0.7,
            }}
          >
            © {new Date().getFullYear()} {brand}, Inc. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // Force vertical stack on mobile
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 2, sm: 3 },
              order: { xs: 1, sm: 2 },
            }}
          >
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((text) => (
              <Link
                key={text}
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={{ opacity: 0.8 }}
              >
                {text}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Wrapper>
  );
}
