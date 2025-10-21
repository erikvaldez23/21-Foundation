// src/components/team/MeetTheTeamOneImage.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* --------------------------- Brand / Design Tokens --------------------------- */
const ACCENT = "#339c5e";   // Kelly green
const CANVAS = "#E8E5DD";   // Paper canvas

/* ------------------------------ Styled Wrappers ------------------------------ */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  paddingBlock: theme.spacing(10),
  // ✨ Your canvas + accent mist
  background: `
    /* soft accent glow top-right */
    radial-gradient(1100px 700px at 85% -10%, ${alpha(ACCENT, 0.08)} 0%, transparent 60%),
    /* soft accent glow bottom-left */
    radial-gradient(900px 600px at 12% 110%, ${alpha(ACCENT, 0.07)} 0%, transparent 60%),
    /* faint vertical lift so it feels layered */
    linear-gradient(180deg, ${alpha("#fff", 0.2)}, ${alpha("#000", 0.04)}),
    /* base canvas */
    ${CANVAS}
  `,
  color: alpha("#000", 0.9),
  overflow: "hidden",
  isolation: "isolate",
}));

const Shell = styled(Container)(({ theme }) => ({
  "--radius": "28px",
  position: "relative",
  display: "grid",
  gap: theme.spacing(6),
}));

/** 
 * A single hero image with a modern frame:
 * - Subtle gradient border using mask
 * - Soft shadow + glassy overlay on hover
 * - Preserves image aspect ratio
 */
const PhotoFrame = styled("figure")(({ theme }) => ({
  position: "relative",
  margin: 0,
  borderRadius: "28px",
  overflow: "hidden",
  boxShadow: `
    0 10px 30px ${alpha("#000", 0.20)},
    0 1px 0 ${alpha("#fff", 0.10)} inset
  `,
  // Gradient “ionic” edge
  background:
    `linear-gradient(135deg, ${alpha(ACCENT, 0.45)}, ${alpha("#fff", 0.4)}) border-box`,
  border: "1px solid transparent",
  mask:
    "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box",
  maskComposite: "exclude",
  WebkitMaskComposite: "xor",

  // Subtle interactive sheen
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      `linear-gradient(180deg, ${alpha("#000", 0.25)} 0%, ${alpha("#000", 0.15)} 55%, transparent 100%)`,
    pointerEvents: "none",
  },

  "& img": {
    display: "block",
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },

  // Hover micro-interaction
  transition: "transform .6s cubic-bezier(.2,.8,.2,1)",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const Caption = styled("figcaption")(({ theme }) => ({
  position: "absolute",
  left: 20,
  bottom: 14,
  padding: "8px 12px",
  borderRadius: 999,
  fontSize: 12,
  letterSpacing: 0.3,
  background: alpha("#000", 0.45),
  color: "#fff",
  backdropFilter: "blur(6px)",
  border: `1px solid ${alpha("#fff", 0.18)}`,
}));

/** Name chips — lightweight, elegant pills */
const NamesWrap = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1.25),
  flexWrap: "wrap",
  rowGap: theme.spacing(1.25),
}));

const NameChip = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  fontWeight: 500,
  letterSpacing: 0.15,
  backgroundColor: alpha("#fff", 0.6),
  color: alpha("#000", 0.85),
  border: `1px solid ${alpha("#000", 0.08)}`,
  backdropFilter: "blur(4px)",
  "&:hover": {
    backgroundColor: alpha("#fff", 0.8),
  },
  "& .MuiChip-label": {
    paddingInline: 12,
  },
}));

/* ------------------------------ Component ------------------------------ */
export default function MeetTheTeamOneImage({
  title = "Meet the Team",
  subtitle = "People behind the mission",
  photoSrc = "/about/team.JPG", // put your single full-team image here (public/ or proper import)
  photoAlt = "Our team",
  members = [
    "Bartosz Drobny",
    "Edyta Radłowska",
    "Avery Brooks",
    "Jordan Kim",
    "Riley Nguyen",
    "Taylor Chen",
    "Sam Patel",
    "Casey Morales",
  ],
}) {
  const theme = useTheme();

  return (
    <Section>
      <Shell maxWidth="lg">
        {/* Headline block */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 2,
              color: alpha("#000", 0.6),
            }}
          >
            {subtitle}
          </Typography>

          <Typography
            variant="h3"
            sx={{
              mt: 1,
              fontWeight: 800,
              lineHeight: 1.1,
              textWrap: "balance",
            }}
          >
            {title}
          </Typography>

          {/* Thin accent hairline */}
          <Box
            sx={{
              mt: 2.5,
              mx: "auto",
              height: 2,
              width: 88,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${alpha(
                ACCENT,
                0
              )}, ${ACCENT}, ${alpha(ACCENT, 0)})`,
              opacity: 0.9,
            }}
          />
        </Box>

        {/* Hero photo */}
        <PhotoFrame>
          <img src={photoSrc} alt={photoAlt} />
          <Caption>Team Photo</Caption>
        </PhotoFrame>

        {/* Names */}
        <Box>
          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 2, color: alpha("#000", 0.7), fontWeight: 700 }}
          >
            Our Team
          </Typography>

          <NamesWrap direction="row">
            {members.map((name) => (
              <NameChip key={name} label={name} />
            ))}
          </NamesWrap>
        </Box>
      </Shell>
    </Section>
  );
}
