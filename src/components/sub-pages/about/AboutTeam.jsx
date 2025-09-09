// src/components/team/MeetTheExperts.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";

/* ---------------------- Demo data (replace with real) ---------------------- */
const TEAM = [
  { id: 1, name: "Bartosz Drobny", role: "Project Coordinator", photo: "/image29.JPG", linkedin: null },
  { id: 2, name: "Edyta Radłowska", role: "Office Manager", photo: "/image29.JPG", linkedin: null },
  { id: 3, name: "Krzysztof Wróbel", role: "Chief Development Officer", photo: "/image29.JPG", linkedin: null },
];

const COMMITTEE = [
  { id: "c1", name: "Alex Johnson", role: "Fundraising Committee", photo: "/image29.JPG", linkedin: null },
  { id: "c2", name: "Priya Desai", role: "Community Outreach", photo: "/image29.JPG", linkedin: null },
  { id: "c3", name: "Miguel Santos", role: "Events Committee", photo: "/image29.JPG", linkedin: null },
  { id: "c4", name: "Sofia Park", role: "Volunteer Coordination", photo: "/image29.JPG", linkedin: null },
];

/* --------------------------------- Styles --------------------------------- */
const PageWrap = styled(Box)({
  backgroundColor: "#E8E5DD",
});

const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  paddingBlock: theme.spacing(1.5),
}));

const DotBadge = styled("span")(({ theme }) => ({
  display: "inline-grid",
  gridTemplateColumns: "repeat(3, 8px)",
  gap: 4,
  marginTop: 2,
  "& > i": {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: theme.palette.text.primary,
    opacity: 0.9,
  },
}));

const TeamCard = styled(Card)(({ theme }) => ({
  borderRadius: 14,
  boxShadow: "none",
  background: "#fafafa",
  border: `1px solid ${alpha("#000", 0.08)}`,
  overflow: "hidden",
  height: "100%",
}));

// ---- Responsive grid with tunable column sizing via props ----
const CardsGrid = styled(Box, {
  shouldForwardProp: (prop) =>
    !["minPx", "vw", "maxPx"].includes(prop),
})(({ theme, minPx = 240, vw = "26vw", maxPx = 320 }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: `repeat(auto-fit, minmax(clamp(${minPx}px, ${vw}, ${maxPx}px), 1fr))`,
}));

// Prevent custom prop from hitting the DOM, and let aspect-ratio control height
const MediaWrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== "aspect",
})(({ aspect }) => ({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  aspectRatio: aspect || "3 / 4",
  minHeight: 200, // safety on very narrow screens
}));

const MediaImg = styled(motion.img)({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "grayscale(100%)",
  display: "block",
});

const Overlay = styled("div")(() => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: "42%",
  background: "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))",
  zIndex: 1,
}));

const OverlayText = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 12,
  left: 12,
  right: 12,
  color: "#fff",
  zIndex: 2,
  lineHeight: 1.2,
  display: "grid",
  gap: 2,
}));

const LinkedinBadge = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  width: 34,
  height: 34,
  borderRadius: 10,
  background: "#fff",
  color: "#0a66c2",
  border: `1px solid ${alpha("#000", 0.12)}`,
  boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
  zIndex: 3,
  "&:hover": { background: "#f7f7f7" },
}));

/* --------------------------- Reusable Section UI --------------------------- */
function TeamSection({
  heading,
  badgeLabel,
  people,
  aspectRatio = "3 / 4",
  // grid sizing knobs:
  columnMinPx = 240,
  columnVW = "26vw",
  columnMaxPx = 320,
  // spacing:
  topSpacing = { xs: 5, md: 8 },
  bottomSpacing = { xs: 4, md: 6 },
  // text sizing tweaks for dense layouts
  tightText = false,
}) {
  return (
    <Box sx={{ pt: topSpacing, pb: bottomSpacing }}>
      <HeaderRow>
        <DotBadge aria-hidden>
          <i />
          <i />
          <i />
        </DotBadge>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            letterSpacing: 0,
            mr: 1,
            fontSize: { xs: 24, sm: 28, md: 32 },
            lineHeight: 1.1,
          }}
        >
          {heading}
        </Typography>
        <Box sx={{ flex: 1 }} />
        {badgeLabel && (
          <Chip
            label={badgeLabel}
            sx={{
              borderRadius: 999,
              bgcolor: "#D9F97F",
              fontWeight: 600,
              height: 28,
            }}
          />
        )}
      </HeaderRow>


      <CardsGrid minPx={columnMinPx} vw={columnVW} maxPx={columnMaxPx}>
        {people.map((p) => (
          <TeamCard
            key={p.id}
            component={motion.div}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <MediaWrap aspect={p.aspect || aspectRatio}>
              <MediaImg
                src={p.photo}
                alt={p.name}
                loading="lazy"
                initial={{ scale: 1.02 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
              />
              {p.linkedin && (
                <LinkedinBadge
                  component="a"
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} LinkedIn`}
                >
                  <LinkedInIcon fontSize="small" />
                </LinkedinBadge>
              )}
              <Overlay />
              <OverlayText>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    fontSize: tightText ? { xs: 13, sm: 14 } : { xs: 14, sm: 15 },
                  }}
                >
                  {p.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.95,
                    fontSize: tightText ? { xs: 12, sm: 12.5 } : { xs: 12.5, sm: 13 },
                  }}
                >
                  {p.role}
                </Typography>
              </OverlayText>
            </MediaWrap>
          </TeamCard>
        ))}
      </CardsGrid>
    </Box>
  );
}

/* -------------------------------- Component -------------------------------- */
export default function MeetTheExperts({
  expertsTitle = "Meet the experts",
  experts = TEAM,
  committeeTitle = "Committee members",
  committee = COMMITTEE,
}) {
  return (
    <PageWrap>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {/* Experts: classic 3:4 cards, comfortable width */}
        <TeamSection
          heading={expertsTitle}
          people={experts}
          aspectRatio="3 / 4"
          columnMinPx={240}
          columnVW="26vw"
          columnMaxPx={320}
          topSpacing={{ xs: 2, md: 2 }}
          bottomSpacing={{ xs: 3.5, md: 5 }}
        />

        {/* Committee: VERTICAL (3:4) and NARROWER so more fit per row */}
        <TeamSection
          heading={committeeTitle}
          people={committee}
          aspectRatio="3 / 4"          // vertical ratio
          columnMinPx={170}            // narrower min width
          columnVW="17vw"              // tighter vw target
          columnMaxPx={220}            // smaller max width
          topSpacing={{ xs: 3, md: 4 }}
          bottomSpacing={{ xs: 0.5, md: 1 }}
          tightText                    // slightly smaller text to match density
        />
      </Container>
    </PageWrap>
  );
}
