// src/components/team/MeetTheExperts.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";

/* --------------------------- Brand / Design Tokens --------------------------- */
const ACCENT = "#339c5e"; // Kelly green
const CANVAS = "#E8E5DD"; // Warm paper canvas
const INK = "#0e1113";    // Deep ink text

/* ---------------------- Demo data (replace with real) ---------------------- */
const TEAM = [
  { id: 1, name: "Isa Clark", role: "Role", linkedin: null },
  { id: 2, name: "John Clark", role: "Role", linkedin: null },
  { id: 3, name: "Tre' Clark", role: "Role", linkedin: null },
];

const COMMITTEE = [
  { id: "c1", name: "Christina Pfaff", role: "Role", linkedin: null },
  { id: "c2", name: "Michelle Hardgree", role: "Role", linkedin: null },
  { id: "c3", name: "Amber Hellwig", role: "Role", linkedin: null },
  { id: "c4", name: "Nayla Eid", role: "Role", linkedin: null },
  { id: "c5", name: "Julia Pfaff", role: "Role", linkedin: null },
  { id: "c6", name: "Christian Dubill", role: "Role", linkedin: null },
  { id: "c7", name: "Dean Wheeler", role: "Role", linkedin: null },
];

/* --------------------------------- Styles --------------------------------- */
const PageWrap = styled(Box)(({ theme }) => ({
  background: `radial-gradient(1200px 600px at 20% -10%, ${alpha(ACCENT, 0.14)} 0%, rgba(0,0,0,0) 38%),
               radial-gradient(1200px 600px at 80% 110%, ${alpha('#000', 0.08)} 0%, rgba(0,0,0,0) 42%), ${CANVAS}`,
}));

const SectionHeader = ({ overline, title, subtitle }) => (
  <Box sx={{ mb: { xs: 3, md: 4.5 } }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1 }}>
      <Box sx={{
        width: 46,
        height: 8,
        borderRadius: 999,
        bgcolor: ACCENT,
        boxShadow: `0 0 0 6px ${alpha(ACCENT, 0.12)}`,
      }} />
      {overline && (
        <Typography variant="overline" sx={{ letterSpacing: 1, color: alpha(INK, 0.55) }}>
          {overline}
        </Typography>
      )}
    </Box>
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          letterSpacing: -0.2,
          lineHeight: 1.05,
          fontSize: { xs: 28, sm: 36, md: 44 },
          color: INK,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ flex: 1, height: 1, bgcolor: alpha(INK, 0.12) }} />
    </Box>
    {subtitle && (
      <Typography sx={{ mt: 1.5, color: alpha(INK, 0.65), maxWidth: 880 }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

/* --------------------- Group Photo Frame + Unified Roster ------------------- */
const GroupFrame = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: 24,
  background: alpha("#fff", 0.6),
  border: `1px solid ${alpha('#000', 0.06)}`,
  boxShadow: `0 10px 30px ${alpha('#000', 0.12)}`,
  backdropFilter: "saturate(140%) blur(10px)",
}));

const GroupPhotoWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  // ▼ Make the hero image shorter (Apple-ish wide panorama)
  aspectRatio: "21 / 9",
  [theme.breakpoints.down('sm')]: { aspectRatio: "16 / 8" },
  overflow: "hidden",
}));

const GroupImg = styled(motion.img)({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  filter: "saturate(105%) contrast(102%)",
});

const GroupOverlay = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  background: `linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.00) 48%, rgba(0,0,0,0.12) 100%),
               radial-gradient(60% 60% at 50% 100%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 60%)`,
  pointerEvents: "none",
}));

const RosterShell = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2, 2.5, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 2.5, 3, 2.5),
  },
}));

const RosterToolbar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.25),
  padding: theme.spacing(1, 1.25),
}));

const AccentPill = styled(Box)(({ theme }) => ({
  height: 8,
  width: 40,
  borderRadius: 999,
  background: `linear-gradient(90deg, ${alpha(ACCENT, 0.35)} 0%, ${alpha(ACCENT, 0.15)} 100%)`,
  boxShadow: `0 0 0 6px ${alpha(ACCENT, 0.10)}`,
}));

const RosterGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.25),
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  [theme.breakpoints.down("lg")]: { gridTemplateColumns: "repeat(3, 1fr)" },
  [theme.breakpoints.down("md")]: { gridTemplateColumns: "repeat(2, 1fr)" },
  [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
}));

const RosterItem = styled(motion.div)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  background: `linear-gradient(180deg, ${alpha('#fff', 0.90)} 0%, ${alpha('#fff', 0.75)} 100%)`,
  border: `1px solid ${alpha('#000', 0.06)}`,
  borderRadius: 16,
  padding: "12px 14px",
  backdropFilter: "saturate(140%) blur(8px)",
  boxShadow: `0 2px 10px ${alpha('#000', 0.06)}`,
}));

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 15,
  letterSpacing: 0.1,
  lineHeight: 1.15,
  color: INK,
}));

const Role = styled(Typography)(({ theme }) => ({
  opacity: 0.8,
  fontSize: 13.25,
  lineHeight: 1.2,
  color: alpha(INK, 0.9),
}));

const RoleChip = styled(Chip)(({ theme }) => ({
  height: 22,
  borderRadius: 999,
  fontWeight: 600,
  letterSpacing: 0.2,
  background: alpha(ACCENT, 0.10),
  color: alpha(INK, 0.85),
  border: `1px solid ${alpha(ACCENT, 0.25)}`,
  ".MuiChip-label": { padding: "0 8px", fontSize: 12 },
}));

/* -------------------------------- Component -------------------------------- */
export default function MeetTheExperts({
  overline = "Our Team",
  title = "Meet the Team",
  subtitle = "The people who make our initiatives possible.",
  groupPhoto = "/about/team.JPG",
  experts = TEAM,
  committee = COMMITTEE,
}) {
  // Merge experts + committee into a single roster
  const roster = React.useMemo(() => {
    const combined = [...experts, ...committee];
    return combined.map((m, i) => ({ ...m, id: String(m.id ?? i) }));
  }, [experts, committee]);

  return (
    <PageWrap>
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        <SectionHeader overline={overline} title={title} subtitle={subtitle} />

        <GroupFrame
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {/* Big Group Photo (slightly smaller) */}
          <GroupPhotoWrap>
            <GroupImg
              src={groupPhoto}
              alt="Team group photo"
              loading="lazy"
              initial={{ scale: 1.005 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            />
            <GroupOverlay />
          </GroupPhotoWrap>

          {/* Unified Roster */}
          <RosterShell>
            <RosterToolbar>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.3, color: INK }}>
                Team Roster
              </Typography>
              <Box sx={{ flex: 1 }} />
              <AccentPill />
            </RosterToolbar>

            <Divider sx={{ borderColor: alpha('#000', 0.06), mb: 1.25 }} />

            <RosterGrid>
              {roster.map((m, idx) => (
                <RosterItem
                  key={m.id}
                  whileHover={{ y: -2, boxShadow: `0 10px 24px ${alpha('#000', 0.12)}` }}
                  transition={{ duration: 0.35 }}
                >
                  <Box sx={{ display: "grid", gap: 0.25 }}>
                    <Name>{m.name}</Name>
                    <Role>{m.role}</Role>
                  </Box>

                  <Box sx={{ flex: 1 }} />

                  {!!m.linkedin && (
                    <IconButton
                      size="small"
                      component="a"
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} LinkedIn`}
                      sx={{
                        borderRadius: 12,
                        border: `1px solid ${alpha('#000', 0.1)}`,
                        background: "#fff",
                        boxShadow: `0 2px 8px ${alpha('#000', 0.08)}`,
                        "&:hover": { background: alpha('#fff', 0.92) },
                      }}
                    >
                      <LinkedInIcon fontSize="small" htmlColor="#0a66c2" />
                    </IconButton>
                  )}

                  {/* Optional role chip (hide on xs for breathing room) */}
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <RoleChip label="Member" />
                  </Box>
                </RosterItem>
              ))}
            </RosterGrid>
          </RosterShell>
        </GroupFrame>
      </Container>
    </PageWrap>
  );
}
