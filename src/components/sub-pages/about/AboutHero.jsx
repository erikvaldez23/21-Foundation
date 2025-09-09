import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

const AboutHero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ bgcolor: '#E8E5DD', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, pt: 2 }}>
          <Typography
            variant="overline"
            sx={{
              color: '#666',
              letterSpacing: 2,
              fontSize: '0.8rem',
              mb: 3,
              display: 'block'
            }}
          >
            MENTAL HEALTH OUTREACH
          </Typography>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 400,
              color: '#333',
              lineHeight: 1.3,
              maxWidth: 900,
              mx: 'auto',
              fontFamily: 'serif'
            }}
          >
            ABOUT US
            <br />
            DESCRIPTION
            <br />–
          </Typography>
        </Box>

        {/* 50/50 Grid */}
        <Grid container spacing={6} alignItems="center">
          {/* Left: Vertical Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                // Keep it vertical and elegant
                aspectRatio: '3 / 4',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                backgroundImage: 'url(/image29.JPG)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // Subtle border to match your aesthetic
                border: '1px solid rgba(0,0,0,0.08)',
              }}
              aria-label="Foundation vertical feature"
              role="img"
            />
          </Grid>

          {/* Right: Text + Instagram CTA */}
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: 620, ml: { md: 2 } }}>
              <Typography
                variant="h4"
                sx={{ color: '#1f1f1f', fontWeight: 500, mb: 2, letterSpacing: 0.2 }}
              >
                Who We Are
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#333',
                  lineHeight: 1.7,
                  mb: 4
                }}
              >
                Inspired by Sean Clark’s spirit, our mission is to empower young people
                to thrive by fostering mental resiliency through the positive influence
                of sports, friendship, family, and faith—instilling a culture of
                kindness and the courage to advocate for themselves and others.
              </Typography>

              <Button
                component="a"
                href="https://instagram.com/yourfoundationhandle"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<InstagramIcon />}
                sx={{
                  px: 3,
                  py: 1.25,
                  borderRadius: 999,
                  textTransform: 'none',
                  fontWeight: 600,
                  letterSpacing: 0.3,
                  // Foundation accent (adjust to your brand green if desired)
                  backgroundColor: '#339c5e',
                  '&:hover': {
                    backgroundColor: '#2c8651'
                  }
                }}
              >
                Follow on Instagram
              </Button>

              {/* Optional: a subtle note below the button */}
              <Typography
                variant="caption"
                sx={{ display: 'block', mt: 1.5, color: '#666' }}
              >
                See real stories, events, and updates from our community.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutHero;
