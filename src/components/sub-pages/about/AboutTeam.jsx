// src/components/team/MeetTheExperts.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
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
  {
    id: 1,
    name: "Bartosz Drobny",
    role: "Project Coordinator",
    photo:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1200&auto=format&fit=crop",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: 2,
    name: "Edyta Radłowska",
    role: "Office Manager",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: 3,
    name: "Krzysztof Wróbel",
    role: "Chief Development Officer",
    photo:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",
    linkedin: "https://www.linkedin.com/",
  },
];

const COMMITTEE = [
  {
    id: "c1",
    name: "Alex Johnson",
    role: "Fundraising Committee",
    photo:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: "c2",
    name: "Priya Desai",
    role: "Community Outreach",
    photo:
      "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200&auto=format&fit=crop",
    linkedin: null,
  },
  {
    id: "c3",
    name: "Miguel Santos",
    role: "Events Committee",
    photo:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: "c4",
    name: "Sofia Park",
    role: "Volunteer Coordination",
    photo:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop",
    linkedin: null,
  },
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
  // keep a tight, consistent footprint
  height: "100%",
}));

const MediaWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  aspectRatio: "4 / 3",
  height: "clamp(200px, 24vw, 260px)",
}));

const MediaImg = styled(motion.img)(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "grayscale(100%)",
  display: "block",
}));

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
  topSpacing = { xs: 5, md: 8 },
  bottomSpacing = { xs: 4, md: 6 },
  gridSpacing = { xs: 2, md: 2.5 }, // slightly tighter by default
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

      {/* Subtle section underline to “anchor” the header without extra vertical gaps */}
      <Divider
        sx={{
          mb: { xs: 2.25, md: 3 },
          borderColor: alpha("#000", 0.08),
        }}
      />

      <Grid container spacing={gridSpacing}>
        {people.map((p) => (
          <Grid key={p.id} item xs={12} sm={6} md={4} lg={3}>
            <TeamCard
              component={motion.div}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
            >
              <MediaWrap>
                <MediaImg
                  src={p.photo}
                  alt={p.name}
                  loading="lazy"
                  initial={{ scale: 1.02 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
                />

                <Overlay />

                <OverlayText>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, fontSize: { xs: 14, sm: 15 } }}
                  >
                    {p.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.95, fontSize: { xs: 12.5, sm: 13 } }}
                  >
                    {p.role}
                  </Typography>
                </OverlayText>
              </MediaWrap>
            </TeamCard>
          </Grid>
        ))}
      </Grid>
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
      <Container
        maxWidth="lg"
        sx={{
          // tighten global vertical rhythm a touch
          py: { xs: 5, md: 8 },
        }}
      >
        {/* Experts Section */}
        <TeamSection
          heading={expertsTitle}
          people={experts}
          // slightly more presence for the first section
          topSpacing={{ xs: 2, md: 2 }}
          bottomSpacing={{ xs: 3.5, md: 5 }}
        />

        {/* Committee Section (same look, a bit tighter to reduce tall gaps) */}
        <TeamSection
          heading={committeeTitle}
          people={committee}
          topSpacing={{ xs: 3, md: 4 }}
          bottomSpacing={{ xs: 0.5, md: 1 }}
        />
      </Container>
    </PageWrap>
  );
}
