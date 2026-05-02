import { useRef, useEffect } from "react";
import iframeResize from "@iframe-resizer/parent";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* ---------------------------- Design Tokens ---------------------------- */
const ACCENT = "#339c5e";
const INK = "#0e1113";
const CANVAS = "#E8E5DD";
const HAIRLINE = "rgba(0,0,0,0.08)";

/* ----------------------------- Chrome --------------------------------- */
const SectionWrap = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  color: INK,
  background: CANVAS,
  overflow: "hidden",
}));

const Glow = styled("div")(() => ({
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
  subtitle = "Your support fuels outreach, mentorship, and counseling—advancing Sean's legacy of kindness and courage.",
}) => {
  const CAMPAIGN_URL = "https://givebutter.com/embed/c/the-seanclark-21-foundation";
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    // iframeResizer connects to the iFrameResizer child script that GiveButter
    // includes in their embed pages and handles height changes automatically.
    const resizers = iframeResize(
      {
        license: "GPLv3",
        checkOrigin: false,
        warningTimeout: 0,
      },
      iframeRef.current
    );

    return () => {
      resizers?.[0]?.disconnect?.();
    };
  }, []);

  return (
    <SectionWrap id="donate" sx={{ py: { xs: 8, md: 12 }, px: { xs: 0, md: 4 } }}>
      <Glow />
      <Container maxWidth="xl">
        {/* ---- Headers ---- */}
        <Box
          sx={{
            textAlign: { xs: "center", md: "left" },
            maxWidth: 720,
            mx: { xs: "auto", md: 0 },
            px: { xs: 0, md: 1 },
            mb: { xs: 4, md: 6 },
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
                opacity: 0.82,
                fontSize: { xs: "1rem", md: "1.05rem" },
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* ---- GRID: 60% form / 40% QR Code ---- */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "60% 40%" },
            gap: { xs: 3, md: 6 },
            alignItems: "flex-start",
          }}
        >
          {/* Left: GiveButter iframe */}
          <Box sx={{ px: { xs: 0, md: 1 } }}>
            <Box
              sx={{
                width: "100%",
                bgcolor: "#fff",
                borderRadius: 4,
                boxShadow: "0 24px 64px rgba(0,0,0,0.1)",
                border: `1px solid ${HAIRLINE}`,
                overflow: "hidden",
              }}
            >
              <iframe
                ref={iframeRef}
                src={CAMPAIGN_URL}
                title="GiveButter Donation Form"
                width="100%"
                style={{ border: "none", display: "block", minHeight: 500 }}
                allowPayment
              />
            </Box>
          </Box>

          {/* Right Column: QR Code Card */}
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              border: `1px solid ${HAIRLINE}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              textAlign: "center",
              minHeight: 500,
            }}
          >
            <Box
              component="img"
              src="/qr-code.jpeg"
              alt="Donate QR Code"
              sx={{
                width: { xs: 160, md: 200 },
                height: { xs: 160, md: 200 },
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: INK, letterSpacing: -0.5 }}>
                Scan to Donate
              </Typography>
              <Typography variant="body1" sx={{ color: alpha(INK, 0.7), lineHeight: 1.6, fontSize: "1.1rem" }}>
                You can also give directly by scanning this QR code with your phone's camera.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </SectionWrap>
  );
};

export default GiveButterWidget;
