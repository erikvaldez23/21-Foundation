import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import PsychologyAltOutlinedIcon from "@mui/icons-material/PsychologyAltOutlined";

/* ---------------------------- Styles ---------------------------- */
const SectionWrap = styled(Box)({
  background: "#E8E5DD",
  color: "#1a1a1a",
  overflow: "hidden",
});

const SerifHeading = styled(Typography)({
  fontFamily: "serif",
  fontWeight: 400,
  color: "#1a1a1a",
});

const ActionButton = styled(Button)({
  borderRadius: 999,
  textTransform: "none",
  padding: "12px 32px",
  fontSize: "1rem",
  fontWeight: 600,
  boxShadow: "none",
  backgroundColor: "#339c5e", // Kelly green accent
  color: "#fff",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: "#2d8a55",
  },
});

const PillarChip = styled(Chip)({
  backgroundColor: "transparent",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: 8,
  color: "#444",
  fontWeight: 600,
  "& .MuiChip-icon": {
    color: "#339c5e",
  },
});

/* --------------------------------- UI --------------------------------- */
const StoryMission = ({
  title = "About the Sean Clark 21 Foundation",
  ctaLabel = "Give in Sean’s Honor",
  onCta = () => { },
  image = "/about/about.JPG",
  pillars = [
    {
      label: "Sports + Mentorship",
      icon: <SportsBasketballOutlinedIcon fontSize="small" />,
    },
    {
      label: "Mental Resiliency",
      icon: <PsychologyAltOutlinedIcon fontSize="small" />,
    },
    {
      label: "Friendship + Family",
      icon: <Diversity3OutlinedIcon fontSize="small" />,
    },
    {
      label: "Faith & Compassion",
      icon: <FavoriteBorderRoundedIcon fontSize="small" />,
    },
  ],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <SectionWrap id="story">
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 6, md: 8, lg: 12 },
            alignItems: "center",
          }}
        >
          {/* LEFT: Image */}
          <Box
            sx={{
              position: "relative",
              height: { xs: 300, md: 800 },
              borderRadius: 4,
              overflow: "hidden",
              order: { xs: 2, md: 1 },
            }}
          >
            <Box
              component="img"
              src={image}
              alt="About the Sean Clark 21 Foundation"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>

          {/* RIGHT: Content */}
          <Box sx={{ order: { xs: 1, md: 2 } }}>
            <Typography variant="overline" sx={{ letterSpacing: 2, color: "#666", display: "block", mb: 2 }}>
              ABOUT US
            </Typography>
            <SerifHeading variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 3, lineHeight: 1.15 }}>
              {title}
            </SerifHeading>

            <Stack spacing={3} sx={{ mb: 4 }}>
              <Typography variant="body1" sx={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#444" }}>
                The Sean Clark 21 Foundation was created to promote mental health
                awareness following the devastating loss of our beloved son Sean
                Clark, age 14. Unfortunately, most people encounter bullying,
                anxiety, depression and feelings of distress at various points in
                their lives.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#444" }}>
                The foundation aims to stop the stigma and taboo related to
                speaking openly about mental health and suicide. We want to create
                open communication and encourage anyone struggling with their
                mental health to feel empowered to <strong>REACH OUT</strong> and
                seek help—either through friends and family or by utilizing{" "}
                <strong>#988</strong>, the number for the mental crisis hotline
                nationwide.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#444" }}>
                Mental health is not discriminatory; it affects all genders,
                religions, social statuses and ages. We focus our efforts on the
                younger population to try and target the problem at the root.
                Suicide has been reported in children as young as 7 years old. The
                Sean Clark 21 Foundation wants you to know you are never alone.
              </Typography>
            </Stack>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 5 }}>
              {pillars.map((p, i) => (
                <PillarChip
                  key={i}
                  icon={p.icon}
                  label={p.label}
                  variant="outlined"
                />
              ))}
            </Box>

            <ActionButton onClick={onCta}>
              {ctaLabel}
            </ActionButton>
          </Box>
        </Box>
      </Container>
    </SectionWrap>
  );
};

export default StoryMission;
