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
          rowSpacing={{ xs: 8, sm: 4 }}
          columnSpacing={{ xs: 0, sm: 4, md: 6 }}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Brand + Social + Blurb */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, width: { xs: '100%', md: 'auto' } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
                width: "100%", // Explicitly force full width
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "2.25rem" },
                  letterSpacing: -0.5,
                  lineHeight: 1,
                }}
              >
                {brand}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "rgba(0,0,0,0.65)",
                  fontSize: { xs: "1.1rem", sm: "1.1rem" },
                  maxWidth: { xs: "90%", md: "100%" }, // Ensure this doesn't constrain it off-center
                  mx: { xs: "auto", md: 0 }, // Ensure margin auto handles centering if max-width kicks in
                  lineHeight: 1.6,
                }}
              >
                Live Like Sean, A Friend To All
              </Typography>

              <Box
                display="flex"
                gap={2}
                sx={{
                  justifyContent: { xs: "center", md: "flex-start" },
                  mb: { xs: 1, md: 0 },
                  width: "100%", // Force width 100% to ensure justifyContent center works effectively
                }}
              >
                <SocialButton
                  aria-label="Instagram"
                  component="a"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon fontSize="medium" />
                </SocialButton>
                <SocialButton
                  aria-label="Facebook"
                  component="a"
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon fontSize="medium" />
                </SocialButton>
                <SocialButton
                  aria-label="X / Twitter"
                  component="a"
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <XIcon fontSize="medium" />
                </SocialButton>
                <SocialButton
                  aria-label="YouTube"
                  component="a"
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTubeIcon fontSize="medium" />
                </SocialButton>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links (Ideally hidden or removed based on user request, keeping commented out if they want to restore) */}
          {/* 
          <Grid item xs={12} sm={6} md={3} sx={{ display: { xs: "none", sm: "block" } }}>
            <Heading variant="h6">Quick Links</Heading>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {["About", "Events", "Give", "Shop", "Contact"].map((text) => (
                <Link key={text} href={`#/${text.toLowerCase()}`} underline="none" color="text.secondary" sx={{ transition: "color 0.2s", "&:hover": { color: "#2FA652" }, fontSize: "1.05rem" }}>
                  {text}
                </Link>
              ))}
            </Box>
          </Grid> 
          */}

          {/* Newsletter */}
          <Grid item xs={12} md={6} lg={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-end" },
                textAlign: { xs: "center", md: "right" },
                mt: { xs: 2, md: 0 } // Extra spacing on mobile
              }}
            >
              <Heading variant="h6" sx={{ textAlign: { xs: "center", md: "right" }, width: "100%" }}>
                Stay in the loop
              </Heading>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 4,
                  fontSize: "1.05rem",
                  maxWidth: { xs: "90%", md: "80%" },
                  lineHeight: 1.6,
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
                  width: "100%",
                  justifyContent: { xs: "center", md: "flex-end" },
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
                    maxWidth: { xs: "100%", sm: "300px" },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      pr: 1,
                      height: "56px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                      "& fieldset": {
                        borderColor: "rgba(0,0,0,0.08)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(0,0,0,0.15)",
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
                    height: "56px",
                    px: 4,
                    fontSize: "1.05rem",
                    borderRadius: "12px",
                    boxShadow: "0 4px 14px rgba(47, 166, 82, 0.25)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(47, 166, 82, 0.35)",
                      transform: "translateY(-1px)",
                    }
                  }}
                >
                  Subscribe
                </PillButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 6, sm: 6 }, borderColor: "rgba(0,0,0,0.06)" }} />

        {/* Bottom row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            textAlign: "center",
            opacity: 0.8,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 500
            }}
          >
            © {new Date().getFullYear()} {brand}, Inc.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            {["Privacy Policy", "Terms", "Accessibility"].map((text) => (
              <Link
                key={text}
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={{ fontWeight: 500, transition: "color 0.2s", "&:hover": { color: "#1a1a1a" } }}
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
