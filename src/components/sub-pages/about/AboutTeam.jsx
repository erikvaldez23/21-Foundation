// src/components/team/MeetTheExperts.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";

/* --------------------------- Brand / Design Tokens --------------------------- */
const ACCENT = "#339c5e";
const PAPER = "#fafafa";
const CANVAS = "#E8E5DD";

/* ------------------------ One photo for the whole team ----------------------- */
const GROUP_PHOTO = "/image29.JPG"; // ⬅️ your group picture (everyone together)

/* ---------------------- Demo data (add crop % as needed) --------------------- */
/** crop.x / crop.y are percentages inside the group image where each face sits.
 *  Start rough (e.g., 15/30, 40/32, 65/28...), tweak by eye. */
const TEAM = [
  { id: 1, name: "Bartosz Drobny", role: "Project Coordinator", linkedin: null, crop: { x: 16, y: 34 } },
  { id: 2, name: "Edyta Radłowska", role: "Office Manager", linkedin: null, crop: { x: 34, y: 36 } },
  { id: 3, name: "Krzysztof Wróbel", role: "Chief Development Officer", linkedin: null, crop: { x: 52, y: 33 } },
];

const COMMITTEE = [
  { id: "c1", name: "Alex Johnson", role: "Fundraising Committee", linkedin: null, crop: { x: 70, y: 40 } },
  { id: "c2", name: "Priya Desai", role: "Community Outreach", linkedin: null, crop: { x: 84, y: 42 } },
  { id: "c3", name: "Miguel Santos", role: "Events Committee", linkedin: null, crop: { x: 12, y: 58 } },
  { id: "c4", name: "Sofia Park", role: "Volunteer Coordination", linkedin: null, crop: { x: 28, y: 60 } },
  { id: "c5", name: "Jordan Lee", role: "Sponsorships", linkedin: null, crop: { x: 44, y: 58 } },
  { id: "c6", name: "Hannah Kim", role: "Logistics", linkedin: null, crop: { x: 60, y: 62 } },
  { id: "c7", name: "Omar Ali", role: "Marketing", linkedin: null, crop: { x: 76, y: 60 } },
  { id: "c8", name: "Grace Chen", role: "Volunteer Training", linkedin: null, crop: { x: 90, y: 60 } },
];

/* --------------------------------- Styles --------------------------------- */
const PageWrap = styled(Box)({
  backgroundColor: CANVAS,
});

/* -------------------------- Full-bleed group hero -------------------------- */
const FullBleed = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
  overflow: "hidden",
  isolation: "isolate",
  borderBlock: `1px solid ${alpha("#000", 0.08)}`,
  background:
    `radial-gradient(1200px 800px at 85% -10%, ${alpha("#fff", 0.12)} 0%, transparent 60%),
     radial-gradient(900px 600px at 10% 110%, ${alpha("#000", 0.20)} 0%, transparent 60%),
     linear-gradient(180deg, ${alpha(ACCENT, 0.25)}, ${alpha(ACCENT, 0.25)})`,
}));

const GroupImage = styled(motion.div)(({ src }) => ({
  position: "relative",
  width: "100%",
  minHeight: "44svh",
  backgroundImage: `url(${src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "saturate(1.02) contrast(1.03)",
}));

const HeroOverlay = styled("div")({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.35))",
});

/* ---------- Header: accent pill + rule + centered under the hero ---------- */
const SectionHeader = ({ overline, title, subtitle, align = "center" }) => (
  <Box sx={{ mb: { xs: 2.5, md: 3.5 }, textAlign: align }}>
    <Stack direction="row" spacing={1} alignItems="center" justifyContent={align === "center" ? "center" : "flex-start"} sx={{ mb: 1 }}>
      <Box
        sx={{
          width: 46,
          height: 8,
          borderRadius: 999,
          bgcolor: ACCENT,
          boxShadow: `0 0 0 6px ${alpha(ACCENT, 0.12)}`,
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
    </Stack>
    <Stack direction="row" spacing={2} alignItems="baseline" justifyContent={align === "center" ? "center" : "flex-start"}>
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
      <Box sx={{ flex: align === "center" ? "0 0 0" : 1, height: 1, bgcolor: alpha("#000", 0.15) }} />
    </Stack>
    {subtitle && (
      <Typography sx={{ mt: 1.25, color: alpha("#000", 0.65), maxWidth: 880, mx: align === "center" ? "auto" : 0 }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

/* ----------------------- Face-crop card (from one image) ------------------- */
const FaceCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "none",
  background: PAPER,
  border: `1px solid ${alpha("#000", 0.08)}`,
  overflow: "hidden",
  height: "100%",
  transition: "transform .25s ease, box-shadow .25s ease",
  willChange: "transform",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 14px 28px rgba(0,0,0,0.12)",
  },
}));

const FaceCrop = styled(motion.div, {
  shouldForwardProp: (prop) => !["x", "y", "shape"].includes(prop),
})(({ x = 50, y = 50, shape = "3 / 4" }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: shape, // default portrait
  backgroundImage: `url(${GROUP_PHOTO})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  /** Trick: oversize then reposition by backgroundPosition to “crop” the face zone. */
  backgroundPosition: `${x}% ${y}%`,
  filter: "saturate(1.02)",
}));

const BottomFade = styled("div")({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background:
    "linear-gradient(to top, rgba(0,0,0,0.46) 0%, rgba(0,0,0,0.28) 28%, rgba(0,0,0,0.12) 44%, rgba(0,0,0,0) 60%)",
});

const Caption = styled(Box)(({ theme }) => ({
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

/* ----------------------- Responsive, dense modern grid ---------------------- */
const AutoGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "repeat(auto-fit, minmax(clamp(220px, 24vw, 300px), 1fr))",
}));

/* -------------------------------- Subsection -------------------------------- */
function PeopleFromGroup({
  titleOverline,
  title,
  subtitle,
  people,
  shape = "3 / 4",
  chips = [],
}) {
  return (
    <Box sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 4, md: 6 } }}>
      <SectionHeader overline={titleOverline} title={title} subtitle={subtitle} align="center" />

      {/* Optional tags/filters row (looks modern, easy to repurpose later) */}
      {chips.length > 0 && (
        <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mb: 2 }}>
          {chips.map((c) => (
            <Chip key={c} label={c} variant="outlined" size="small" sx={{ borderColor: alpha("#000", 0.2) }} />
          ))}
        </Stack>
      )}

      <AutoGrid>
        {people.map((p, idx) => {
          const x = p.crop?.x ?? (10 + (idx % 8) * 10); // sensible defaults if crop missing
          const y = p.crop?.y ?? (30 + Math.floor(idx / 8) * 10);
          return (
            <FaceCard
              key={p.id ?? idx}
              component={motion.div}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
            >
              <Box sx={{ position: "relative" }}>
                <FaceCrop
                  x={x}
                  y={y}
                  shape={shape}
                  initial={{ scale: 1.02 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                />
                <BottomFade />
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
                <Caption>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, fontSize: { xs: 14, sm: 15 } }}
                  >
                    {p.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.95, fontSize: { xs: 12.5, sm: 13 } }}>
                    {p.role}
                  </Typography>
                </Caption>
              </Box>
            </FaceCard>
          );
        })}
      </AutoGrid>
    </Box>
  );
}

/* -------------------------------- Component -------------------------------- */
export default function MeetTheExperts({
  expertsTitleOverline = "Our Team",
  expertsTitle = "Meet the Experts",
  expertsSubtitle = "A tight-knit team united by mission and heart.",
  experts = TEAM,

  committeeTitleOverline = "Our Team",
  committeeTitle = "Committee Members",
  committeeSubtitle = "Community leaders supporting programs and outreach.",
  committee = COMMITTEE,
}) {
  return (
    <PageWrap>
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        {/* Experts — cropped from the group image */}
        <PeopleFromGroup
          titleOverline={expertsTitleOverline}
          title={expertsTitle}
          subtitle={expertsSubtitle}
          people={experts}
          shape="3 / 4"
        />

        {/* Committee — also cropped from the same image (or use another group if you like) */}
        <PeopleFromGroup
          titleOverline={committeeTitleOverline}
          title={committeeTitle}
          subtitle={committeeSubtitle}
          people={committee}
          shape="1 / 1" // try a square crop for variety
        />
      </Container>
    </PageWrap>
  );
}
