import React from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* ---------------------------- Design Tokens ---------------------------- */
const ACCENT = "#339c5e";            // Kelly green
const INK = "#0e1113";
const CANVAS = "#E8E5DD";            // your site background
const HAIRLINE = "rgba(0,0,0,0.08)";

/* ----------------------------- Chrome --------------------------------- */
const SectionWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: INK,
  background: CANVAS,
  overflow: "hidden",
}));

const Glow = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: "auto -22% -40% -22%",
  height: 520,
  pointerEvents: "none",
  filter: "blur(80px)",
  background: `radial-gradient(60% 60% at 50% 50%, ${alpha(ACCENT, 0.22)} 0%, transparent 60%)`,
}));

/* ---------------------------- Component -------------------------------- */
const GiveButterWidget = ({
  title = "Make a Gift",
  subtitle = "Your support fuels outreach, mentorship, and counseling—advancing Sean’s legacy of kindness and courage.",
  image = "/events/spreading-awareness/thumbnails/awareness(40).jpg",
}) => {
  // ==========================================
  // GIVEBUTTER SETUP
  // Replace the placeholder below with your exact GiveButter Campaign Embed URL
  // You can find this in GiveButter -> Campaign -> Sharing -> Embed
  // ==========================================
  const CAMPAIGN_URL = "https://givebutter.com/embed/c/YOUR_CAMPAIGN_CODE";

  return (
    <SectionWrap id="donate" sx={{ py: { xs: 8, md: 12 }, px: 4 }}>
      <Glow />
      <Container maxWidth="xl">
        {/* ---- GRID: 60% form / 40% image ---- */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "60% 40%" },
            gap: { xs: 3, md: 6 },
            alignItems: "center",
          }}
        >
          {/* Left: Component Headers and GiveButter Widget */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              px: { xs: 2, md: 1 },
              textAlign: { xs: "center", md: "left" },
              maxWidth: 720,
              mx: { xs: "auto", md: 0 },
              minHeight: 600, // accommodate the iframe
            }}
          >
            <Typography
              variant="overline"
              sx={{
                display: "block",
                letterSpacing: 2,
                color: alpha(INK, 0.55),
                mb: 1,
                fontSize: { xs: 11, md: 12 },
              }}
            >
              SUPPORT THE MISSION
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontWeight: 800,
                letterSpacing: -0.4,
                lineHeight: 1.06,
                fontSize: { xs: "clamp(28px, 6vw, 40px)", md: 44 },
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="body1"
                sx={{
                  mt: 1.25,
                  mb: 4,
                  opacity: 0.82,
                  fontSize: { xs: "1rem", md: "1.05rem" },
                }}
              >
                {subtitle}
              </Typography>
            )}

            {/* GiveButter iframe Wrapper */}
            <Box
              sx={{
                width: '100%',
                bgcolor: '#fff',
                borderRadius: 4,
                boxShadow: '0 24px 64px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                minHeight: '650px',
                border: `1px solid ${HAIRLINE}`,
                mb: { xs: 4, md: 0 } // spacing underneath on mobile
              }}
            >
              <iframe
                src={CAMPAIGN_URL}
                width="100%"
                style={{ minHeight: '650px', border: 'none' }}
                name="givebutter"
                frameBorder="0"
                scrolling="no"
                seamless
                allowpaymentrequest="true"
                title="GiveButter Donation Form"
              />
            </Box>
          </Box>

          {/* Right: Vertical Image (40%) */}
          <Box
            sx={{
              position: "relative",
              borderRadius: 4, // Matched with left column
              overflow: "hidden",
              background: "#111",
              boxShadow: "0 24px 64px rgba(0,0,0,0.10)", // Matched with left column
              border: `1px solid ${alpha("#000", 0.05)}`,
            }}
          >
            <Box
              component="img"
              src={image}
              alt="Donation"
              loading="lazy"
              decoding="async"
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
            {/* Soft subtle gradient overlay to make the image look premium */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none'
              }}
            />
          </Box>
        </Box>
      </Container>
    </SectionWrap>
  );
};

export default GiveButterWidget;
