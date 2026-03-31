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
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '16px',
                        width: '100%',
                    }}
                >
                    {measured.map((item) => {
                        const targetHeight = isMobile ? 180 : 250;
                        const basisWidth = Math.round((item.w / item.h) * targetHeight);
                        return (
                            <Tile
                                key={item.id}
                                style={{
                                    flexGrow: 1,
                                    height: `${targetHeight}px`,
                                    flexBasis: `${basisWidth}px`,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                                onClick={() => openAt(item.id)}
                                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                                whileHover={{ y: -2 }}
                            >
                                <ImageCover 
                                    src={item.thumbSrc || item.src} 
                                    alt={item.title} 
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
                                window.scrollTo({ top: 0, behavior: 'smooth' });
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
                            src={current.src}
                            alt={current.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '85vh',
                                objectFit: 'contain',
                                borderRadius: '8px',
                                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                            }}
                        />
                    </AnimatePresence>
                )}
            </Dialog>
            <CTA />
        </Page>
    );
}
