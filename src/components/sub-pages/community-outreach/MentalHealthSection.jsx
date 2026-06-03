import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const Wrap = styled(Box)({ background: '#f4f2ec', color: '#1a1a1a' });
const SerifH = styled(Typography)({ fontFamily: 'serif', fontWeight: 400, color: '#1a1a1a' });

const schools = [
  'Bishop Miege High School',
  'St. James Academy',
  'St. Thomas Aquinas',
];

// Replace src with real paths when photos are available
const photos = [
  { src: null, alt: '988 awareness photo 1' },
  { src: null, alt: '988 awareness photo 2' },
  { src: null, alt: '988 awareness photo 3' },
];

export default function MentalHealthSection() {
  const hasPhotos = photos.some((p) => p.src);

  return (
    <Wrap>
      <Container maxWidth="xl" sx={{ py: { xs: 7, md: 11 } }}>

        {/* Section header */}
        <Typography
          variant="overline"
          sx={{ letterSpacing: 2, color: '#666', display: 'block', mb: 1.5, fontSize: '0.68rem' }}
        >
          MENTAL HEALTH AWARENESS
        </Typography>
        <SerifH variant="h3" sx={{ fontSize: { xs: '2.1rem', md: '2.9rem' }, mb: 3 }}>
          Spreading Awareness of 988
        </SerifH>
        <Divider sx={{ mb: { xs: 5, md: 7 }, borderColor: 'rgba(0,0,0,0.12)' }} />

        {/* Main content: text + 988 callout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'center',
            mb: hasPhotos ? { xs: 7, md: 10 } : 0,
          }}
        >
          {/* Left: body copy */}
          <Box>
            <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#444', mb: 4 }}>
              The Sean Clark 21 Foundation has been working on following its mission of spreading
              awareness of the number{' '}
              <Box component="span" sx={{ color: '#339c5e', fontWeight: 700, fontSize: '1.1rem' }}>
                988
              </Box>
              , the Suicide and Mental Health Crisis Hotline, amongst students.
            </Typography>

            <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#444', mb: 5 }}>
              We were able to implement the 988 number and Foundation logo on all student IDs
              beginning next fall semester of the 2026 school year.
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#666', mb: 3, fontStyle: 'italic' }}
            >
              Thank you to the following schools for helping us make this happen:
            </Typography>

            {schools.map((school, i) => (
              <Box
                key={school}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 1.75,
                  borderBottom: i < schools.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#339c5e', flexShrink: 0 }} />
                <Typography sx={{ fontSize: '0.95rem', color: '#444' }}>{school}</Typography>
              </Box>
            ))}
          </Box>

          {/* Right: 988 callout card */}
          <Box
            sx={{
              background: '#339c5e',
              borderRadius: '12px',
              p: { xs: 5, md: 7 },
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'serif',
                fontWeight: 700,
                fontSize: { xs: '5.5rem', md: '8rem' },
                lineHeight: 1,
                mb: 2,
                letterSpacing: '-0.02em',
              }}
            >
              988
            </Typography>
            <Box sx={{ width: 40, height: 2, bgcolor: 'rgba(255,255,255,0.5)', mx: 'auto', mb: 2.5 }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: 400, opacity: 0.95, mb: 2, fontSize: { xs: '1rem', md: '1.1rem' } }}
            >
              Suicide &amp; Mental Health Crisis Hotline
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: 260, mx: 'auto', lineHeight: 1.7 }}>
              Free, confidential support available 24/7 — call or text <strong>988</strong> anytime.
            </Typography>
          </Box>
        </Box>

        {/* Photo grid — only renders when photos are provided */}
        {hasPhotos && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 2,
            }}
          >
            {photos.filter((p) => p.src).map((photo, i) => (
              <Box
                key={i}
                sx={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '6px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              >
                <Box
                  component="img"
                  src={photo.src}
                  alt={photo.alt}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            ))}
          </Box>
        )}

      </Container>
    </Wrap>
  );
}
