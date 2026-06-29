import React, { useMemo, useState, useCallback, useEffect, useLayoutEffect, useRef } from "react";
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
    Pagination,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PhotoCameraBackRoundedIcon from "@mui/icons-material/PhotoCameraBackRounded";
import GalleryHero from "./GalleryHero";
import CTA from "../../key-components/CTA";
import { EVENTS, PHOTOS } from "./galleryData";
import { pickOptimalSrc, getContainedWidth } from "./imageUtils";

const Page = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    background: "#E8E5DD",
    color: theme.palette.text.primary,
}));



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


export default function EventGallery() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [lightbox, setLightbox] = useState({ open: false, index: 0, items: [] });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    // Tracks viewport + DPR so image source selection adapts to screen size
    // and orientation changes, not just a static mobile/desktop boolean.
    const [viewport, setViewport] = useState(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: window.devicePixelRatio || 1,
    }));

    useEffect(() => {
        let raf = null;
        const onResize = () => {
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                setViewport({
                    width: window.innerWidth,
                    height: window.innerHeight,
                    dpr: window.devicePixelRatio || 1,
                });
            });
        };
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    const event = useMemo(() => EVENTS.find((e) => e.id === slug), [slug]);
    const eventPhotos = useMemo(() => PHOTOS.filter((p) => p.eventId === slug), [slug]);

    // Reset page to 1 when slug changes
    useEffect(() => {
        setPage(1);
    }, [slug]);

    const totalPages = Math.ceil(eventPhotos.length / ITEMS_PER_PAGE);

    const currentPhotos = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return eventPhotos.slice(start, start + ITEMS_PER_PAGE);
    }, [eventPhotos, page]);

    const measured = currentPhotos;

    // CSS flex-wrap decides line breaks itself, so there's no selector for
    // "the only item on this wrapped line" — we pack rows ourselves (using
    // the same hypothetical-main-size rule the browser uses: sum flex-basis
    // + gaps, break once the next item would overflow) so we know exactly
    // which rows are sparse and can special-case them.
    const GRID_GAP = 16;
    const gridRef = useRef(null);
    const [gridWidth, setGridWidth] = useState(0);

    useLayoutEffect(() => {
        if (!gridRef.current) return;
        // Measure synchronously before paint so the grid doesn't flash
        // empty on first render while waiting for the observer callback.
        setGridWidth(gridRef.current.getBoundingClientRect().width);
        const ro = new ResizeObserver((entries) => {
            setGridWidth(entries[0].contentRect.width);
        });
        ro.observe(gridRef.current);
        return () => ro.disconnect();
    }, []);

    const targetHeight = isMobile ? 180 : 250;

    const rows = useMemo(() => {
        if (!gridWidth) return [];
        const result = [];
        let row = [];
        let rowWidth = 0;
        for (const item of measured) {
            const basisWidth = (item.w / item.h) * targetHeight;
            const addedWidth = row.length ? basisWidth + GRID_GAP : basisWidth;
            if (row.length && rowWidth + addedWidth > gridWidth) {
                result.push(row);
                row = [];
                rowWidth = 0;
            }
            row.push({ item, basisWidth });
            rowWidth += row.length === 1 ? basisWidth : basisWidth + GRID_GAP;
        }
        if (row.length) result.push(row);
        return result;
    }, [measured, gridWidth, targetHeight]);

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

    // Resolve the lightbox source against the box the image will actually
    // render in (90vw x 85vh, true aspect ratio), not just a mobile flag.
    const optimalSrc = useMemo(() => {
        if (!current) return null;
        const displayWidth = getContainedWidth(current.w, current.h, viewport);
        return pickOptimalSrc(current, displayWidth, viewport.dpr);
    }, [current, viewport]);

    // Show the (likely already-cached) thumbnail immediately, then swap to
    // the full-res source only once it's actually needed and loaded.
    const [fullLoaded, setFullLoaded] = useState(false);
    useEffect(() => {
        setFullLoaded(false);
        if (!current || !optimalSrc || optimalSrc === current.thumbSrc) return;
        const img = new Image();
        img.onload = () => setFullLoaded(true);
        img.src = optimalSrc;
        return () => {
            img.onload = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on current.id, not object identity
    }, [current?.id, optimalSrc]);

    const lightboxSrc = !current
        ? null
        : optimalSrc === current.thumbSrc || fullLoaded
            ? optimalSrc
            : current.thumbSrc || optimalSrc;

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

                <Box
                    ref={gridRef}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: `${GRID_GAP}px`,
                        width: '100%',
                        overflowAnchor: 'none',
                    }}
                >
                    {rows.map((row, rowIndex) => {
                        // A landscape photo left alone on a row (sparse last
                        // page, small album) gets to fill the row at its true
                        // aspect ratio instead of being cropped/stretched to
                        // the fixed row height.
                        const isSingleLandscape =
                            isMobile && row.length === 1 && row[0].item.w > row[0].item.h;

                        return (
                            <Box
                                key={rowIndex}
                                sx={{
                                    display: 'flex',
                                    gap: `${GRID_GAP}px`,
                                    justifyContent: isSingleLandscape ? 'center' : 'flex-start',
                                }}
                            >
                                {row.map(({ item, basisWidth }) => (
                                    <Tile
                                        key={item.id}
                                        style={
                                            isSingleLandscape
                                                ? {
                                                    width: '100%',
                                                    aspectRatio: `${item.w} / ${item.h}`,
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }
                                                : {
                                                    flexGrow: 1,
                                                    // Cap how far a tile can stretch to absorb
                                                    // leftover row space, so a sparse row leaves
                                                    // empty space at the end instead of blowing
                                                    // up + cropping the few photos present.
                                                    maxWidth: `${Math.round(basisWidth * 1.35)}px`,
                                                    height: `${targetHeight}px`,
                                                    flexBasis: `${basisWidth}px`,
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }
                                        }
                                        onClick={() => openAt(item.id)}
                                        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                                        whileHover={{ y: -2 }}
                                    >
                                        <ImageCover
                                            src={pickOptimalSrc(item, basisWidth, viewport.dpr)}
                                            alt={item.title}
                                            width={item.w}
                                            height={item.h}
                                            loading="lazy"
                                            decoding="async"
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
                                    </Tile>
                                ))}
                            </Box>
                        );
                    })}
                </Box>
                
                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 2 }}>
                        <Pagination 
                            count={totalPages} 
                            page={page} 
                            onChange={(e, value) => {
                                setPage(value);
                                // Wait a frame so the new page's grid (different row
                                // count/heights) actually commits before we measure it —
                                // measuring synchronously here races the DOM swap (all
                                // tiles remount, since their keys change with the page)
                                // against the in-flight smooth scroll, which intermittently
                                // got fought by the browser's scroll anchoring.
                                requestAnimationFrame(() => {
                                    // Scroll to the grid itself (where the new page's first
                                    // image lands), not the absolute page top — otherwise
                                    // the hero banner/back button push the images off-screen.
                                    // Offset accounts for the fixed top navbar.
                                    if (gridRef.current) {
                                        const top = gridRef.current.getBoundingClientRect().top + window.scrollY - 96;
                                        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
                                    } else {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                });
                            }}
                            color="primary" 
                            size={isMobile ? "medium" : "large"}
                        />
                    </Box>
                )}
            </Container>

            <Dialog
                open={lightbox.open}
                onClose={closeLightbox}
                fullScreen
                PaperProps={{
                    sx: {
                        background: "rgba(0,0,0,0.85)",
                        backdropFilter: "blur(16px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
            >
                <IconButton 
                    onClick={closeLightbox} 
                    sx={{ 
                        position: 'absolute', 
                        top: { xs: 16, sm: 24 }, 
                        right: { xs: 16, sm: 24 }, 
                        color: '#fff', 
                        bgcolor: 'rgba(255,255,255,0.1)', 
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                        zIndex: 10
                    }}
                >
                    <CloseRoundedIcon />
                </IconButton>

                <IconButton 
                    onClick={goPrev} 
                    disabled={!current}
                    sx={{ 
                        position: 'absolute', 
                        left: { xs: 8, sm: 32 }, 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        color: '#fff', 
                        bgcolor: 'rgba(255,255,255,0.1)', 
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                        zIndex: 10
                    }}
                >
                    <ArrowBackIosNewRoundedIcon />
                </IconButton>

                <IconButton 
                    onClick={goNext} 
                    disabled={!current}
                    sx={{ 
                        position: 'absolute', 
                        right: { xs: 8, sm: 32 }, 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        color: '#fff', 
                        bgcolor: 'rgba(255,255,255,0.1)', 
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                        zIndex: 10
                    }}
                >
                    <ArrowForwardIosRoundedIcon />
                </IconButton>

                {current && (
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={current.id}
                            src={lightboxSrc}
                            alt={current.title}
                            width={current.w}
                            height={current.h}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '85vh',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain',
                                borderRadius: '8px',
                                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                                filter: fullLoaded || optimalSrc === current.thumbSrc ? 'none' : 'blur(2px)',
                                transition: 'filter 0.25s ease-out',
                            }}
                        />
                    </AnimatePresence>
                )}
            </Dialog>
            <CTA />
        </Page>
    );
}
