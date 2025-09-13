// src/components/team/MeetTheExperts.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";

/* --------------------------- Brand / Design Tokens --------------------------- */
const ACCENT = "#339c5e";
const PAPER = "#fafafa";
const CANVAS = "#E8E5DD";

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
  { id: "c5", name: "Jordan Lee", role: "Sponsorships", photo: "/image29.JPG", linkedin: null },
  { id: "c6", name: "Hannah Kim", role: "Logistics", photo: "/image29.JPG", linkedin: null },
  { id: "c7", name: "Omar Ali", role: "Marketing", photo: "/image29.JPG", linkedin: null },
  { id: "c8", name: "Grace Chen", role: "Volunteer Training", photo: "/image29.JPG", linkedin: null },
];

/* --------------------------------- Styles --------------------------------- */
const PageWrap = styled(Box)({
  backgroundColor: CANVAS,
});

/* ---------- Header: subtle, professional (accent pill + overline + rule) --- */
const SectionHeader = ({ overline, title, subtitle }) => (
  <Box sx={{ mb: { xs: 2.5, md: 3.5 } }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <Box
        sx={{
          width: 46,
          height: 8,
          borderRadius: 999,
          bgcolor: ACCENT,
          boxShadow: `0 0 0 6px ${alpha(ACCENT, 0.10)}`,
        }}
      />
      {overline && (
        <Typography
          variant="overline"
          sx={{ letterSpacing: 1, color: alpha("#000", 0.6) }}
        >
          {overline}
        </Typography>
      )}
    </Box>
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          lineHeight: 1.05,
          fontSize: { xs: 28, sm: 34, md: 40 },
        }}
      >
        {title}
      </Typography>
      <Box sx={{ flex: 1, height: 1, bgcolor: alpha("#000", 0.15) }} />
    </Box>
    {subtitle && (
      <Typography sx={{ mt: 1.25, color: alpha("#000", 0.65), maxWidth: 880 }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

/* ------------------------------- Card Pieces ------------------------------- */
const TeamCard = styled(Card)(({ theme }) => ({
  borderRadius: 14,
  boxShadow: "none",
  background: PAPER,
  border: `1px solid ${alpha("#000", 0.08)}`,
  overflow: "hidden",
  height: "100%",
}));

// Media container uses aspect-ratio for consistent height; child overlays cover fully
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
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  zIndex: 0,
});

// Full-frame bottom fade (no % heights → reliable across browsers)
const BottomFade = styled("div")({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 1,
  background:
    "linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.28) 28%, rgba(0,0,0,0.12) 44%, rgba(0,0,0,0) 60%)",
});

const CaptionWrap = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 12,
  right: 12,
  bottom: 12,
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

/* ---------------------- Grids (auto-fit vs fixed 4×2) ---------------------- */
const AutoGrid = styled(Box, {
  shouldForwardProp: (prop) => !["minPx", "vw", "maxPx"].includes(prop),
})(({ theme, minPx = 240, vw = "26vw", maxPx = 320 }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: `repeat(auto-fit, minmax(clamp(${minPx}px, ${vw}, ${maxPx}px), 1fr))`,
}));

const CommitteeGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

/* ------------------------------- Subsections ------------------------------- */
function PeopleGrid({
  titleOverline,
  title,
  subtitle,
  people,
  aspectRatio = "3 / 4",
  variant = "auto", // 'auto' | 'committee'
  columnMinPx = 240,
  columnVW = "26vw",
  columnMaxPx = 320,
  tightText = false,
}) {
  const GridComp =
    variant === "committee"
      ? CommitteeGrid
      : (props) => (
          <AutoGrid {...props} minPx={columnMinPx} vw={columnVW} maxPx={columnMaxPx} />
        );

  const list = variant === "committee" ? people.slice(0, 8) : people;

  return (
    <Box sx={{ pt: { xs: 2, md: 2 }, pb: { xs: 3, md: 4 } }}>
      <SectionHeader overline={titleOverline} title={title} subtitle={subtitle} />
      <GridComp>
        {list.map((p, idx) => (
          <TeamCard
            key={p.id ?? idx}
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
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4 }}
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

              {/* Full-frame bottom fade to ensure caption readability */}
              <BottomFade />

              <CaptionWrap>
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
              </CaptionWrap>
            </MediaWrap>
          </TeamCard>
        ))}
      </GridComp>
    </Box>
  );
}

/* -------------------------------- Component -------------------------------- */
export default function MeetTheExperts({
  expertsTitleOverline = "Our Team",
  expertsTitle = "Meet the Experts",
  expertsSubtitle = null,
  experts = TEAM,

  committeeTitleOverline = "Our Team",
  committeeTitle = "Committee Members",
  committeeSubtitle = null,
  committee = COMMITTEE,
}) {
  return (
    <PageWrap>
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        {/* Experts — responsive auto-fit cards */}
        <PeopleGrid
          titleOverline={expertsTitleOverline}
          title={expertsTitle}
          subtitle={expertsSubtitle}
          people={experts}
          aspectRatio="3 / 4"
          variant="auto"
          columnMinPx={240}
          columnVW="26vw"
          columnMaxPx={320}
        />

        {/* Committee — exactly 4 columns × 2 rows on desktop, responsive below */}
        <PeopleGrid
          titleOverline={committeeTitleOverline}
          title={committeeTitle}
          subtitle={committeeSubtitle}
          people={committee}
          aspectRatio="3 / 4"
          variant="committee"
          tightText
        />
      </Container>
    </PageWrap>
  );
}
