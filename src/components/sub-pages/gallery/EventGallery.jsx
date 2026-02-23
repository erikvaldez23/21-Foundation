import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import CTA from "../../key-components/CTA";
import { EVENTS, PHOTOS } from "./galleryData";

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
    cursor: "zoom-in",
    outline: "none",
    flex: "0 0 auto",
}));

const ImageCover = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
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

    return useMemo(
        () =>
            items.map((it) => {
                const s = sizes[it.id];
                return { ...it, w: s?.w ?? it.w ?? 1, h: s?.h ?? it.h ?? 1 };
            }),
        [items, sizes]
    );
}

function buildJustifiedRows(items, containerWidth, gap, targetRowHeight = 300) {
    if (!containerWidth || !items.length) return [];
    const rows = [];
    let current = [];
    let currentWidth = 0;

    for (const it of items) {
        const aspect = it.w / it.h;
        const wAtTarget = aspect * targetRowHeight;

        current.push(it);
        currentWidth += wAtTarget + gap;

        if (currentWidth - gap > containerWidth) {
            const gapsTotal = gap * (current.length - 1);
            const aspectSum = current.reduce((sum, img) => sum + img.w / img.h, 0);
            let rowH = (containerWidth - gapsTotal) / aspectSum;

            const laid = current.map((img) => {
                const aspect = img.w / img.h;
                const w = Math.round(aspect * rowH);
                return { ...img, _w: w, _h: Math.round(rowH) };
            });

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

    if (current.length > 0) {
        const laid = current.map((img) => {
            const aspect = img.w / img.h;
            return { ...img, _w: Math.round(aspect * targetRowHeight), _h: targetRowHeight };
        });
        rows.push(laid);
    }

    return rows;
}

export default function EventGallery() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [lightbox, setLightbox] = useState({ open: false, index: 0, items: [] });

    const event = useMemo(() => EVENTS.find((e) => e.id === slug), [slug]);
    const eventPhotos = useMemo(() => PHOTOS.filter((p) => p.eventId === slug), [slug]);

    const measured = useNaturalSizes(eventPhotos);

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

    const [wrapRef, width] = useContainerWidth();
    const rows = useMemo(() => buildJustifiedRows(measured, width, 12, 220, 340), [measured, width]);

    if (!event) {
        return (
            <Page sx={{ pt: 15, textAlign: "center" }}>
                <Typography variant="h3">Event Not Found</Typography>
                <Button onClick={() => navigate("/gallery")} sx={{ mt: 2 }} variant="contained">
                    Back to Galleries
                </Button>
            </Page>
        );
    }

    return (
        <Page>
            <Container maxWidth="xl" sx={{ pb: 8 }}>
                <GalleryHero title={event.title} subtitle={event.date.toUpperCase()} />

                <Button
                    startIcon={<ArrowBackIosNewRoundedIcon />}
                    onClick={() => navigate("/gallery")}
                    sx={{ mb: 4, color: "#339c5e" }}
                >
                    Back to Events
                </Button>

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
            </Dialog>
            <CTA />
        </Page>
    );
}
