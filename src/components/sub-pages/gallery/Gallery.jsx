import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  ImageList,
  ImageListItem,
  Tooltip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PhotoCameraBackRoundedIcon from "@mui/icons-material/PhotoCameraBackRounded";

/* =========================
   Gallery Sub-Page
   - Masonry grid + filters
   - Lightbox w/ keyboard nav
   ========================= */

const Page = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  // background: `radial-gradient(1200px 600px at 10% -10%, ${alpha(
  //   theme.palette.primary.main, 0.22
  // )} 0%, transparent 60%), radial-gradient(900px 500px at 90% 110%, ${alpha(
  //   theme.palette.secondary.main, 0.18
  // )} 0%, transparent 60%), linear-gradient(180deg, ${alpha(
  //   theme.palette.background.default, 1
  // )}, ${alpha(theme.palette.background.default, 1)})`,
  background: "#E8E5DD",
  color: theme.palette.text.primary,
}));

const Glass = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  background: alpha("#fff", 0.05),
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha("#fff", 0.08)}`,
  boxShadow: "0 10px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
}));

const SectionHeader = ({ title, subtitle }) => (
  <Box sx={{ textAlign: { xs: "left", md: "center" }, mb: 4 }}>
    <Typography
      component={motion.h1}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      variant="h3"
      sx={{ fontWeight: 800, letterSpacing: -0.4 }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        variant="subtitle1"
        sx={{ opacity: 0.85, mt: 1 }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

// ---- Mock data (swap with your CMS / API) ----
const ALBUMS = ["All Photos", "Events", "Clinics", "Workshops", "Community", "Behind the Scenes"];
const TAGS = ["Youth", "Volunteers", "Coaches", "Family", "Highlights", "Awards", "Smiles"];

const PHOTOS = [
  // width/height help the masonry compute aspect ratio smoothly
  { id: "p1",  src: "/image1.JPG",  w: 1200, h: 1600, album: "Events",    tags: ["Highlights", "Youth"],       title: "5K Fundraiser" },
  { id: "p2",  src: "/image3.JPG",  w: 1600, h: 1066, album: "Clinics",   tags: ["Coaches", "Youth"],          title: "Skills Clinic" },
  { id: "p3",  src: "/image4.JPG",  w: 1600, h: 1200, album: "Community", tags: ["Volunteers", "Family"],      title: "Community Night" },
  { id: "p4",  src: "/image5.JPG",  w: 1200, h: 1200, album: "Workshops", tags: ["Highlights"],                 title: "Resilience Talk" },
  { id: "p5",  src: "/image6.JPG",  w: 1200, h: 900,  album: "Events",    tags: ["Youth", "Smiles"],           title: "Warm-Up Circle" },
  { id: "p6",  src: "/image7.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image8.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image9.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image10.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image11.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image12.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image13.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image14.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image15.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image16.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image17.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image18.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image19.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image20.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image21.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image22.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image23.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image24.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image25.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image26.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image27.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image28.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
  { id: "p6",  src: "/image29.JPG",  w: 1600, h: 900,  album: "Clinics",   tags: ["Coaches", "Awards"],         title: "Medal Moment" },
];

export default function Gallery() {
  const [album, setAlbum] = useState("All Photos");
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, index: 0, items: [] });

  const filtered = useMemo(() => {
    let list = PHOTOS;

    if (album !== "All Photos") list = list.filter((p) => p.album === album);

    if (activeTags.length > 0) {
      list = list.filter((p) => activeTags.every((t) => p.tags?.includes(t)));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.title?.toLowerCase().includes(q) || p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [album, activeTags, query]);

  // open lightbox on clicked photo
  const openAt = useCallback(
    (id) => {
      const idx = filtered.findIndex((p) => p.id === id);
      if (idx >= 0) setLightbox({ open: true, index: idx, items: filtered });
    },
    [filtered]
  );

  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));

  const goPrev = () =>
    setLightbox((s) => ({ ...s, index: (s.index - 1 + s.items.length) % s.items.length }));
  const goNext = () => setLightbox((s) => ({ ...s, index: (s.index + 1) % s.items.length }));

  // keyboard navigation
  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open]);

  const current = lightbox.items[lightbox.index];


  const downloadFile = (url, filename = "photo.jpg") => {
    fetch(url)
      .then((r) => r.blob())
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(a.href);
      })
      .catch(() => {});
  };

  return (
    <Page>
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <SectionHeader
          title="Gallery"
          subtitle="Moments that tell our story—clinics, workshops, and community in motion."
        />
        {/* Masonry Grid */}
        <ImageList
          variant="masonry"
          cols={getCols()}
          gap={12}
          sx={{
            m: 0,
            "& .MuiImageListItem-root": { borderRadius: 2, overflow: "hidden", position: "relative" },
          }}
          component={motion.div}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        >
          {filtered.map((item) => (
            <ImageListItem
              key={item.id}
              onClick={() => openAt(item.id)}
              sx={{ cursor: "zoom-in", outline: "none" }}
              component={motion.div}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${item.src}?w=800&fit=crop`}
                srcSet={`${item.src}?w=800&fit=crop&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <HoverOverlay>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhotoCameraBackRoundedIcon fontSize="small" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <SmallPill>{item.album}</SmallPill>
                  {(item.tags || []).slice(0, 2).map((t) => (
                    <SmallPill key={t}>{t}</SmallPill>
                  ))}
                </Box>
              </HoverOverlay>
            </ImageListItem>
          ))}
        </ImageList>
      </Container>

      {/* Lightbox */}
      <Dialog
        open={lightbox.open}
        onClose={closeLightbox}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: alpha("#000", 0.7),
            backdropFilter: "blur(8px)",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            {current?.title || "Photo"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Previous">
              <span>
                <IconButton onClick={goPrev} disabled={!current} size="small" sx={{ color: "#fff" }}>
                  <ArrowBackIosNewRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Next">
              <span>
                <IconButton onClick={goNext} disabled={!current} size="small" sx={{ color: "#fff" }}>
                  <ArrowForwardIosRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Open original">
              <span>
                <IconButton
                  onClick={() => current && window.open(current.src, "_blank", "noopener,noreferrer")}
                  disabled={!current}
                  size="small"
                  sx={{ color: "#fff" }}
                >
                  <OpenInNewRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Download">
              <span>
                <IconButton
                  onClick={() => current && downloadFile(current.src, `${current.title || "photo"}.jpg`)}
                  disabled={!current}
                  size="small"
                  sx={{ color: "#fff" }}
                >
                  <FileDownloadRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <IconButton onClick={closeLightbox} size="small" sx={{ color: "#fff" }}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            p: { xs: 1.5, md: 2 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
          }}
        >
          {current && (
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.src}
                alt={current.title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.2, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 12,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                }}
              />
            </AnimatePresence>
          )}
        </DialogContent>
        {current && (
          <DialogActions sx={{ px: 2, pb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
              <SmallPill>{current.album}</SmallPill>
              {(current.tags || []).map((t) => (
                <SmallPill key={t}>{t}</SmallPill>
              ))}
            </Box>
            <Button
              variant="contained"
              onClick={() => downloadFile(current.src, `${current.title || "photo"}.jpg`)}
              startIcon={<FileDownloadRoundedIcon />}
              sx={{ borderRadius: 2, fontWeight: 800 }}
            >
              Download
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Page>
  );
}

/* ============== Helpers & Small Components ============== */

const SmallPill = ({ children }) => (
  <Box
    sx={{
      px: 1,
      py: 0.25,
      fontSize: 12,
      borderRadius: 999,
      bgcolor: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      lineHeight: 1.6,
    }}
  >
    {children}
  </Box>
);

const HoverOverlay = ({ children }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
    sx={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
      p: 1.25,
      background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
      color: "#fff",
      pointerEvents: "none",
    }}
  >
    {children}
  </Box>
);

// responsive columns
function getCols() {
  if (typeof window === "undefined") return 2;
  const w = window.innerWidth;
  if (w >= 1400) return 4;
  if (w >= 1000) return 3;
  if (w >= 600) return 2;
  return 1;
}
