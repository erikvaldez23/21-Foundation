import React from "react";
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Button, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GalleryHero from "./GalleryHero";
import CTA from "../../key-components/CTA";
import { EVENTS } from "./galleryData";

const Page = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "#E8E5DD",
  color: theme.palette.text.primary,
}));

const FolderCard = ({ event, isMobile }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/gallery/${event.id}`)}
      sx={(theme) => ({
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        mx: "auto",
        aspectRatio: "16 / 10",
        minHeight: { xs: 260, md: 400 },
        width: "100%",
        transition: "transform .2s ease, box-shadow .2s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[8],
        },
      })}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${event.coverSrc})`, // Ensure event.coverSrc is matching galleryData schema
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
        role="img"
        aria-label={`${event.title} background`}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.55) 100%)",
          zIndex: 1,
        }}
      />
      <CardContent
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          p: { xs: 3, md: 4 },
          color: "white",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontSize: { xs: "1.6rem", md: "2.3rem" },
            fontWeight: 400,
            lineHeight: 1.2,
            mb: 2,
            textShadow: "1px 1px 2px rgba(0,0,0,0.35)",
            fontFamily: "serif",
            textAlign: "left",
          }}
        >
          {event.title}
          <br />
          {event.date}
        </Typography>
        <Box sx={{ width: 64, height: 2, bgcolor: "white", mt: 1, opacity: 0.85 }} />
      </CardContent>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/gallery/${event.id}`);
        }}
        aria-label={`View gallery for ${event.title}`}
        variant="outlined"
        size={isMobile ? "small" : "medium"}
        sx={{
          position: "absolute",
          right: 16,
          bottom: 16,
          zIndex: 2,
          color: "white",
          borderColor: "rgba(255,255,255,0.75)",
          backgroundColor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(6px)",
          textTransform: "none",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.14)",
            borderColor: "#fff",
          },
        }}
      >
        View gallery
      </Button>
    </Card>
  );
};

export default function Gallery() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page>
      <Container maxWidth="xl" sx={{ pb: 8 }}>
        <GalleryHero title="GALLERY" subtitle="MENTAL HEALTH OUTREACH" />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
            mt: 4,
            pb: 2,
            px: { xs: 2, md: 0 }
          }}
        >
          {EVENTS.map((event) => (
            <Box key={event.id} sx={{ width: "100%" }}>
              <FolderCard event={event} isMobile={isMobile} />
            </Box>
          ))}
        </Box>
      </Container>
      <CTA />
    </Page>
  );
}
