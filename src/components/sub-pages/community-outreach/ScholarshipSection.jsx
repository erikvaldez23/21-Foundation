import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, Divider, Dialog, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Wrap = styled(Box)({ background: '#E8E5DD', color: '#1a1a1a' });
const SerifH = styled(Typography)({ fontFamily: 'serif', fontWeight: 400, color: '#1a1a1a' });

// Clickable photo tile
// objectFit defaults to 'cover'; pass objectFit="contain" for portrait images so nothing is cut off.
const Photo = ({ src, alt, onClick, objectFit = 'cover' }) => (
  <Box
    onClick={onClick}
    sx={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: '6px',
      cursor: onClick ? 'zoom-in' : 'default',
    }}
  >
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: '100%',
        height: '100%',
        objectFit,
        objectPosition: 'center',
        display: 'block',
        transition: 'transform 0.5s ease',
        '&:hover': onClick && objectFit === 'cover' ? { transform: 'scale(1.03)' } : {},
      }}
    />
  </Box>
);

// Full-screen lightbox
const Lightbox = ({ images, index, onClose, onNavigate }) => {
  const current = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(index - 1);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(index + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, hasPrev, hasNext, onClose, onNavigate]);

  return (
    <Dialog
      open
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      {/* Close */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute', top: { xs: 16, md: 24 }, right: { xs: 16, md: 24 },
          color: '#fff', bgcolor: 'rgba(255,255,255,0.1)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }, zIndex: 10,
        }}
      >
        <CloseRoundedIcon />
      </IconButton>

      {/* Prev */}
      {hasPrev && (
        <IconButton
          onClick={() => onNavigate(index - 1)}
          sx={{
            position: 'absolute', left: { xs: 8, md: 32 }, top: '50%', transform: 'translateY(-50%)',
            color: '#fff', bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }, zIndex: 10,
          }}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
      )}

      {/* Next */}
      {hasNext && (
        <IconButton
          onClick={() => onNavigate(index + 1)}
          sx={{
            position: 'absolute', right: { xs: 8, md: 32 }, top: '50%', transform: 'translateY(-50%)',
            color: '#fff', bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }, zIndex: 10,
          }}
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current.src}
          src={current.src}
          alt={current.alt}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            maxWidth: '90vw',
            maxHeight: '88vh',
            objectFit: 'contain',
            borderRadius: '6px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
          }}
        />
      </AnimatePresence>

      {/* Counter */}
      {images.length > 1 && (
        <Typography
          sx={{
            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', letterSpacing: 1,
          }}
        >
          {index + 1} / {images.length}
        </Typography>
      )}
    </Dialog>
  );
};

const schools = [
  'Benedictine College — Atchison, Kansas',
  'Bishop Miege High School — Shawnee Mission, Kansas',
  'St. James Academy — Lenexa, Kansas',
  'St. Thomas Aquinas — Overland Park, Kansas',
];

const recipients = [
  {
    name: 'Finnley Richlin',
    school: 'St. Thomas Aquinas',
    location: 'Overland Park, Kansas',
    photos: [
      { src: '/scholarships/st-thomas.jpeg', alt: 'Finnley Richlin — St. Thomas Aquinas' },
    ],
    check: { src: '/scholarships/st-thomas-check.jpeg', alt: 'Finnley Richlin receiving scholarship check' },
  },
  {
    name: 'Caroline Gibson',
    school: 'Bishop Miege',
    location: 'Shawnee Mission, Kansas',
    photos: [
      { src: '/scholarships/bishop-meige.jpeg', alt: 'Caroline Gibson — Bishop Miege' },
      { src: '/scholarships/bishop-meige2.jpeg', alt: 'Caroline Gibson — Bishop Miege' },
      { src: '/scholarships/bishop-meige3.jpeg', alt: 'Caroline Gibson — Bishop Miege' },
    ],
    check: { src: '/scholarships/bishop-meige-check.jpeg', alt: 'Caroline Gibson receiving scholarship check' },
  },
  {
    name: 'Matthew Wurtenberger',
    school: 'St. James Academy',
    location: 'Lenexa, Kansas',
    photos: [
      { src: '/scholarships/st-james.jpeg', alt: 'Matthew Wurtenberger — St. James Academy' },
    ],
    check: { src: '/scholarships/st-james-check.jpeg', alt: 'Matthew Wurtenberger receiving scholarship check' },
  },
];

// Build a flat ordered image list for a recipient: photos first, then check
const buildImageList = (r) => [...r.photos, r.check];

// 1 photo + check side by side
const PairLayout = ({ photo, check, onOpen }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: '12px' }}>
    <Box sx={{ aspectRatio: '4/3' }}>
      <Photo src={photo.src} alt={photo.alt} onClick={() => onOpen(0)} />
    </Box>
    <Box sx={{ aspectRatio: '4/3' }}>
      <Photo src={check.src} alt={check.alt} onClick={() => onOpen(1)} />
    </Box>
  </Box>
);

// 3 photos + check layout for Caroline Gibson.
// photos[0] is landscape (3390×2260) — shown full-width at its natural 3:2 ratio.
// photos[1] and photos[2] are portrait — shown side-by-side in 3/4 containers with
// objectFit:contain so the entire image is visible. The cream bgcolor (#E8E5DD) fills
// any letterbox gap and blends invisibly with the page background.
const MosaicLayout = ({ photos, check, onOpen }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {/* Feature landscape photo — full width at its natural ratio */}
    <Box sx={{ aspectRatio: '3/2', overflow: 'hidden', borderRadius: '6px' }}>
      <Photo src={photos[0].src} alt={photos[0].alt} onClick={() => onOpen(0)} />
    </Box>

    {/* Two portrait photos side by side — shown in full, no cropping */}
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      <Box sx={{ aspectRatio: '3/4', overflow: 'hidden', borderRadius: '6px', bgcolor: '#E8E5DD' }}>
        <Photo src={photos[1].src} alt={photos[1].alt} onClick={() => onOpen(1)} objectFit="contain" />
      </Box>
      <Box sx={{ aspectRatio: '3/4', overflow: 'hidden', borderRadius: '6px', bgcolor: '#E8E5DD' }}>
        <Photo src={photos[2].src} alt={photos[2].alt} onClick={() => onOpen(2)} objectFit="contain" />
      </Box>
    </Box>

    {/* Check photo — panoramic at a ratio close to the photo's natural 1.89:1 */}
    <Box sx={{ aspectRatio: { xs: '3/2', sm: '2/1' }, overflow: 'hidden', borderRadius: '6px' }}>
      <Photo src={check.src} alt={check.alt} onClick={() => onOpen(3)} />
    </Box>
  </Box>
);

const RecipientBlock = ({ r, onOpen }) => {
  const images = buildImageList(r);
  return (
    <Box>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="overline"
          sx={{ color: '#339c5e', letterSpacing: 2, display: 'block', mb: 0.5, fontSize: '0.68rem' }}
        >
          {r.school} — {r.location}
        </Typography>
        <SerifH variant="h4" sx={{ fontSize: { xs: '1.9rem', md: '2.4rem' } }}>
          {r.name}
        </SerifH>
      </Box>

      {r.photos.length === 1 ? (
        <PairLayout photo={r.photos[0]} check={r.check} onOpen={(i) => onOpen(images, i)} />
      ) : (
        <MosaicLayout photos={r.photos} check={r.check} onOpen={(i) => onOpen(images, i)} />
      )}
    </Box>
  );
};

export default function ScholarshipSection() {
  const [lightbox, setLightbox] = useState({ images: [], index: 0, open: false });

  const openLightbox = useCallback((images, index) => {
    setLightbox({ images, index, open: true });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((s) => ({ ...s, open: false }));
  }, []);

  const navigate = useCallback((index) => {
    setLightbox((s) => ({ ...s, index }));
  }, []);

  return (
    <Wrap>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 5 } }}>

        {/* Section header */}
        <Typography variant="overline" sx={{ letterSpacing: 2, color: '#666', display: 'block', mb: 1.5, fontSize: '0.68rem' }}>
          REACH OUT
        </Typography>
        <SerifH variant="h3" sx={{ fontSize: { xs: '2.1rem', md: '2.9rem' }, mb: 3 }}>
          Scholarship Program
        </SerifH>
        <Divider sx={{ mb: { xs: 5, md: 7 }, borderColor: 'rgba(0,0,0,0.12)' }} />

        {/* Intro + school list */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
            gap: { xs: 5, md: 10 },
            mb: { xs: 6, md: 9 },
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#444', mb: 3 }}>
              With the support of all our donors, community and fundraising events, The Sean Clark 21
              Foundation has been able to offer the following scholarships of{' '}
              <strong>$2,100</strong> each to high schools and colleges in the area.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#444', mb: 5 }}>
              For the year <strong>2026–2027</strong>, the schools participating in our program are:
            </Typography>
            <Box
              sx={{
                background: 'rgba(51,156,94,0.07)',
                border: '1px solid rgba(51,156,94,0.18)',
                borderLeft: '4px solid #339c5e',
                borderRadius: '0 8px 8px 0',
                p: { xs: 3, md: 4 },
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.9, color: '#333', fontStyle: 'italic' }}>
                This scholarship recognizes a student who embodies the same qualities as Sean Clark —
                someone who values <strong>inclusion</strong>, <strong>courage</strong>,{' '}
                <strong>compassion</strong>, and <strong>faith</strong>, and who strives to make a
                positive difference in the lives of others.
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="overline"
              sx={{ letterSpacing: 2, color: '#339c5e', display: 'block', mb: 3, fontSize: '0.68rem' }}
            >
              Participating Schools
            </Typography>
            {schools.map((school, i) => (
              <Box
                key={school}
                sx={{
                  display: 'flex', alignItems: 'flex-start', gap: 2, py: 2,
                  borderBottom: i < schools.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#339c5e', mt: '5px', flexShrink: 0 }} />
                <Typography sx={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.55 }}>
                  {school}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Banner — not clickable, it's a decorative header image */}
        <Box sx={{ aspectRatio: '16/7', overflow: 'hidden', borderRadius: '8px', mb: { xs: 7, md: 10 } }}>
          <Photo src="/scholarships/banner.png" alt="Scholarship program banner" />
        </Box>

        {/* Recipients heading */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <SerifH variant="h4" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 1 }}>
            2026–2027 Recipients
          </SerifH>
          <Typography sx={{ color: '#666', fontSize: '1rem' }}>
            Congratulations to all our recipients for the 2026–2027 school year.
          </Typography>
        </Box>

        {/* Per-recipient sections */}
        {recipients.map((r, idx) => (
          <Box key={r.name}>
            {idx > 0 && (
              <Divider sx={{ my: { xs: 7, md: 9 }, borderColor: 'rgba(0,0,0,0.1)' }} />
            )}
            <RecipientBlock r={r} onOpen={openLightbox} />
          </Box>
        ))}

      </Container>

      {/* Lightbox */}
      {lightbox.open && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={closeLightbox}
          onNavigate={navigate}
        />
      )}
    </Wrap>
  );
}
