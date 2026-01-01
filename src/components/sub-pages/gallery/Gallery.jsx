import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
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
import GalleryHero from "./GalleryHero";

const Page = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "#E8E5DD",
  color: theme.palette.text.primary,
}));

const Row = styled("div")({
  display: "flex",
  gap: 12,
  width: "100%",
});

const Tile = styled(motion.div)(({ h }) => ({
  position: "relative",
  height: h,
  overflow: "hidden",
  borderRadius: 8,
  // cursor: "zoom-in",
  outline: "none",
  flex: "0 0 auto",
}));

const ImageCover = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover", // row math matches real aspect, so cropping shouldn't occur
  display: "block",
});

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
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
      color: "#fff",
      pointerEvents: "none",
    }}
  >
    {children}
  </Box>
);

// ---- Sample data (swap with your CMS/API) ----
const PHOTOS = [
  { id: "p1", src: "/image1.JPG", w: 1200, h: 1600, album: "Events", tags: ["Highlights", "Youth"], title: "5K Fundraiser" },
  { id: "p2", src: "/image3.JPG", w: 1600, h: 1066, album: "Clinics", tags: ["Coaches", "Youth"], title: "Skills Clinic" },
  { id: "p3", src: "/image4.JPG", w: 1600, h: 1200, album: "Community", tags: ["Volunteers", "Family"], title: "Community Night" },
  { id: "p4", src: "/image5.JPG", w: 1200, h: 1200, album: "Workshops", tags: ["Highlights"], title: "Resilience Talk" },
  { id: "p5", src: "/image6.JPG", w: 1200, h: 900, album: "Events", tags: ["Youth", "Smiles"], title: "Warm-Up Circle" },
  { id: "p6", src: "/image7.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p7", src: "/image8.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p8", src: "/image9.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p9", src: "/image10.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p10", src: "/image11.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p11", src: "/image12.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p12", src: "/image13.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p13", src: "/image14.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p14", src: "/image15.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p15", src: "/image16.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p16", src: "/image17.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p17", src: "/image18.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p18", src: "/image19.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p19", src: "/image20.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p20", src: "/image21.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p21", src: "/image22.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p22", src: "/image23.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p23", src: "/image24.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p24", src: "/image25.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p25", src: "/image26.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p26", src: "/image27.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p27", src: "/image28.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p28", src: "/image29.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p28", src: "/image30.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p28", src: "/image31.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p28", src: "/image32.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
  { id: "p28", src: "/image33.JPG", w: 1600, h: 900, album: "Clinics", tags: ["Coaches", "Awards"], title: "Medal Moment" },
];

/* ===== Utils: container width + real (natural) image sizes ===== */

function useContainerWidth() {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setW(Math.floor(e.contentRect.width));
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

/** Load each image and record its natural width/height (after EXIF orientation).
 *  Falls back to provided w/h if loading fails. */
function useNaturalSizes(items) {
  const [sizes, setSizes] = useState({});
  useEffect(() => {
    let cancelled = false;
    const seen = new Set();

    items.forEach((it) => {
      if (!it?.src || seen.has(it.id)) return;
      seen.add(it.id);

      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        setSizes((s) => ({
          ...s,
          [it.id]: { w: img.naturalWidth || it.w || 1, h: img.naturalHeight || it.h || 1 },
        }));
      };
      img.onerror = () => {
        if (cancelled) return;
        setSizes((s) => ({
          ...s,
          [it.id]: { w: it.w || 1, h: it.h || 1 },
        }));
      };
      img.src = it.src;
    });

    return () => {
      cancelled = true;
    };
  }, [items]);

  // Return list with real (or fallback) sizes
  return useMemo(
    () =>
      items.map((it) => {
        const s = sizes[it.id];
        return { ...it, w: s?.w ?? it.w ?? 1, h: s?.h ?? it.h ?? 1 };
      }),
    [items, sizes]
  );
}

/** Build justified rows so total width (including gaps) == container width. */
function buildJustifiedRows(items, containerWidth, gap, targetRowHeight = 300) {
  if (!containerWidth || !items.length) return [];
  const rows = [];
  let current = [];
  let currentWidth = 0; // Width of images at targetHeight + gaps

  for (const it of items) {
    const aspect = it.w / it.h;
    const wAtTarget = aspect * targetRowHeight;

    current.push(it);
    currentWidth += wAtTarget + gap;

    // If adding this item makes the row wider than container (minus last gap adjustment), flush it
    // We check if we are "close enough" or over. 
    // Actually, justified layout usually adds items until it's over, then shrinks back, OR adds until just under and expands.
    // Let's add until > containerWidth, then decide whether to keep the last item or push to next row.
    // Simple approach: accumulate until > containerWidth.

    if (currentWidth - gap > containerWidth) {
      // Row is full. Calculate exact height to make it flush.
      // Total width needed = sum(aspect * h) + (n-1)*gap = containerWidth
      // h * sum(aspect) = containerWidth - (n-1)*gap
      // h = (containerWidth - (n-1)*gap) / sum(aspect)

      const gapsTotal = gap * (current.length - 1);
      const aspectSum = current.reduce((sum, img) => sum + img.w / img.h, 0);
      let rowH = (containerWidth - gapsTotal) / aspectSum;

      // If rowH is ridiculously small (e.g. < 150), maybe we should have pushed the last item to next row?
      // But for now, let's just stick to the standard algorithm: fill until full.

      const laid = current.map((img) => {
        const aspect = img.w / img.h;
        const w = Math.round(aspect * rowH);
        return { ...img, _w: w, _h: Math.round(rowH) };
      });

      // Fix rounding errors
      const currentTotalW = laid.reduce((s, i) => s + i._w, 0) + gapsTotal;
      let delta = containerWidth - currentTotalW;
      let i = 0;
      while (delta !== 0 && laid.length > 0) {
        const step = delta > 0 ? 1 : -1;
        laid[i % laid.length]._w += step;
        delta -= step;
        i++;
      }

      rows.push(laid);
      current = [];
      currentWidth = 0;
    }
  }

  // Last row: do not justify, just left align at target height
  if (current.length > 0) {
    const laid = current.map((img) => {
      const aspect = img.w / img.h;
      return { ...img, _w: Math.round(aspect * targetRowHeight), _h: targetRowHeight };
    });
    rows.push(laid);
  }

  return rows;
}

/* ============== Component ============== */

export default function Gallery() {
  const [album, setAlbum] = useState("All Photos");
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [lightbox, setLightbox] = useState({ open: false, index: 0, items: [] });

  // Filter
  const filtered = useMemo(() => {
    let list = PHOTOS;
    if (album !== "All Photos") list = list.filter((p) => p.album === album);
    if (activeTags.length > 0) list = list.filter((p) => activeTags.every((t) => p.tags?.includes(t)));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.title?.toLowerCase().includes(q) || p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [album, activeTags, query]);

  // Measure real image sizes (fixes wrong orientation/aspect)
  const measured = useNaturalSizes(filtered);

  // Lightbox
  const openAt = useCallback(
    (id) => {
      const idx = measured.findIndex((p) => p.id === id);
      if (idx >= 0) setLightbox({ open: true, index: idx, items: measured });
    },
    [measured]
  );
  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));
  const goPrev = () =>
    setLightbox((s) => ({ ...s, index: (s.index - 1 + s.items.length) % s.items.length }));
  const goNext = () =>
    setLightbox((s) => ({ ...s, index: (s.index + 1) % s.items.length }));

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
        const href = URL.createObjectURL(blob);
        a.href = href;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(href);
      })
      .catch(() => { });
  };

  // Build justified rows from REAL sizes
  const [wrapRef, width] = useContainerWidth();
  const rows = useMemo(() => buildJustifiedRows(measured, width, 12, 220, 340), [measured, width]);

  return (
    <Page>
      <Container maxWidth="xl" sx={{ pb: 8 }}>
        <GalleryHero />

        {/* Justified Gallery (real aspect ratios) */}
        <div ref={wrapRef} style={{ width: "100%" }}>
          {rows.map((row, rIdx) => (
            <Row key={`row-${rIdx}`} style={{ marginBottom: rIdx < rows.length - 1 ? 12 : 0 }}>
              {row.map((item) => (
                <Tile
                  key={item.id}
                  h={item._h}
                  style={{ width: item._w, height: item._h }}
                  onClick={() => openAt(item.id)}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -2 }}
                >
                  <ImageCover src={item.src} alt={item.title} loading="lazy" decoding="async" />
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
                </Tile>
              ))}
            </Row>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      {/* <Dialog
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
        <DialogTitle
          sx={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
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
          <DialogActions
            sx={{ px: 2, pb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
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
      </Dialog> */}
    </Page>
  );
}
