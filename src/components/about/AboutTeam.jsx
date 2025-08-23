// src/components/about/TeamShowcase.jsx
import React from "react";
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";

/* ----------------------- In-file team data ----------------------- */
export const teamData = [
  {
    name: "Issa Clark",
    role: "Board Member",
    bio: "Leads programs and partnerships that expand our impact across the community.",
    photo: "/vert-image.JPG",
    links: { linkedin: "#", email: "mailto:alex@example.org" },
  },
  {
    name: "John Clark",
    role: "Board Member",
    bio: "Designs and runs our outreach initiatives with schools and local orgs.",
    photo: "/vert-image.JPG",
    links: { linkedin: "#", instagram: "#", email: "mailto:maya@example.org" },
  },
  {
    name: "Tre' Clark",
    role: "Board Member",
    bio: "Keeps our events on track and our volunteers supported.",
    photo: "/vert-image.JPG",
    links: { linkedin: "#", email: "mailto:jordan@example.org" },
  },
  {
    name: "Dean Wheeler",
    role: "Committee Member",
    bio: "Builds relationships with families, partners, and volunteers.",
    photo: "/vert-image.JPG",
    links: { linkedin: "#", email: "mailto:sam@example.org" },
  },
];

/* ----------------------- Styled components ----------------------- */
const Section = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
}));

const CardWrap = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  overflow: "hidden",
  border: `1px solid ${alpha("#000", 0.08)}`,
  background: "#f7f7f7",
  boxShadow: "0 6px 24px rgba(0,0,0,.06)",
  transform: "translateZ(0)",
  transition: "transform .25s ease, box-shadow .25s ease",
  willChange: "transform",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 10px 30px rgba(0,0,0,.10)",
  },
}));

const PhotoFrame = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  paddingTop: "125%", // 4:5 portrait
}));

const Img = styled("img")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform .6s cubic-bezier(.2,.6,.2,1)",
}));

const OverlayGrad = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.55) 100%)",
  pointerEvents: "none",
}));

const InfoBar = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 12,
  right: 12,
  bottom: 12,
  borderRadius: 16,
  padding: "14px 14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "#fff",
  background: alpha("#111", 0.18),
  border: "1px solid rgba(255,255,255,.35)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
}));

const NameRole = styled(Box)(({ theme }) => ({ minWidth: 0 }));

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: 0.2,
  fontSize: "1.125rem",
  color: "#fff",
}));

const Role = styled(Typography)(({ theme }) => ({
  fontSize: ".9rem",
  opacity: 0.9,
  color: "#fff",
}));

const Socials = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 6,
  "& .MuiIconButton-root": {
    color: "#fff",
    backdropFilter: "blur(2px)",
    border: "1px solid rgba(255,255,255,.35)",
    backgroundColor: alpha("#fff", 0.08),
    width: 34,
    height: 34,
  },
}));

const RoleChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: 12,
  left: 12,
  color: "#0e4c27",
  fontWeight: 700,
  background: "linear-gradient(135deg, #EAF6EF 0%, #DFF3E7 100%)",
  border: "1px solid rgba(0,0,0,.08)",
}));

/* ----------------------- Component ----------------------- */
export default function AboutTeam({
  title = "Meet the Team",
  subtitle = "The people guiding Reach, Include, and Support.",
  team = teamData,
}) {
  // Normalize once so the JSX has ZERO conditionals
  const normalized = team.map((m) => ({
    name: m.name || "",
    role: m.role || "",
    bio: m.bio || "",
    photo: m.photo || m.avatar || "/vert-image.JPG",
    links: {
      linkedin: (m.links && m.links.linkedin) || "#",
      instagram: (m.links && m.links.instagram) || "#",
      email: (m.links && m.links.email) || "#",
    },
  }));

  const placeholder =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 750'>
        <rect width='100%' height='100%' fill='#f1f1f1'/>
        <text x='50%' y='50%' text-anchor='middle' dy='.35em'
          font-family='system-ui, -apple-system, Segoe UI, Roboto'
          font-size='24' fill='#999'>Team Member</text>
      </svg>`
    );

  return (
    <Section>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 800,
            textAlign: "center",
            color: "#111",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", color: "rgba(0,0,0,.6)", mt: 1, mb: 6 }}
        >
          {subtitle}
        </Typography>

        <Grid container spacing={3}>
          {normalized.map((m) => (
            <Grid key={m.name} size={{ xs: 12, sm: 6, md: 4 }}>
              <CardWrap>
                <PhotoFrame>
                  <Img
                    src={m.photo}
                    alt={`${m.name} — ${m.role}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = placeholder;
                    }}
                  />
                  <OverlayGrad />
                  <RoleChip label={m.role} size="small" />
                  <InfoBar>
                    <NameRole>
                      <Name noWrap>{m.name}</Name>
                      {/* <Role noWrap title={m.bio}>{m.bio}</Role> */}
                    </NameRole>
                    <Socials>
                      <IconButton
                        aria-label={`${m.name} on LinkedIn`}
                        href={m.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                      >
                        <LinkedInIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label={`${m.name} on Instagram`}
                        href={m.links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                      >
                        <InstagramIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label={`Email ${m.name}`}
                        href={m.links.email}
                        size="small"
                      >
                        <EmailIcon fontSize="small" />
                      </IconButton>
                    </Socials>
                  </InfoBar>
                </PhotoFrame>
              </CardWrap>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
