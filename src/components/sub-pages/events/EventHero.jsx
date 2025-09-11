import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#E8E5DD',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6, pt: 4 }}>
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
              maxWidth: '900px',
              mx: 'auto',
              fontFamily: 'serif'
            }}
          >
            EVENTS
            <br />
            {/* DESCRIPTION */}
            {/* <br /> */}
            -
          </Typography>
        </Box>

        {/* Cards Section */}
        <Grid 
          container 
          spacing={3} 
          sx={{ 
            mt: 4,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          {/* Left Card */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: 400,
                width: 650,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8]
                },
                transition: 'all 0.3s ease',
                mx: 'auto'
              }}
            >
              {/* Background image */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/image1.JPG)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  zIndex: 0
                }}
              />
              {/* Dark overlay for legibility */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)',
                  zIndex: 1
                }}
              />
              {/* Content */}
              <CardContent 
                sx={{ 
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  p: 4,
                  color: 'white',
                  zIndex: 2
                }}
              >
                <Typography 
                  variant="h3" 
                  component="h2" 
                  sx={{
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    fontWeight: 400,
                    lineHeight: 1.2,
                    mb: 2,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    fontFamily: 'serif',
                    textAlign: 'left'
                  }}
                >
                  REACH OUT WALK
                  <br />
                  9/14/25
                  <br />
                  LEAKWOOD, KS 66224 
                </Typography>
                <Box sx={{ width: 60, height: 2, bgcolor: 'white', mt: 2, opacity: 0.8 }} />
              </CardContent>

              {/* Bottom-right transparent button */}
              <Button
                component={RouterLink}
                to="/events/slow-mornings"
                aria-label="Learn more about Slow Mornings & Open Skies"
                variant="outlined"
                size={isMobile ? 'small' : 'medium'}
                sx={{
                  position: 'absolute',
                  right: 16,
                  bottom: 16,
                  zIndex: 2,
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.7)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(6px)',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    borderColor: '#fff'
                  }
                }}
              >
                Learn more
              </Button>
            </Card>
          </Grid>

          {/* Right Card */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: 400,
                width: 650,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8]
                },
                transition: 'all 0.3s ease',
                mx: 'auto'
              }}
            >
              {/* Background image */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url(/image2.JPG)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  zIndex: 0
                }}
              />
              {/* Dark overlay for legibility */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)',
                  zIndex: 1
                }}
              />
              {/* Content */}
              <CardContent 
                sx={{ 
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  p: 4,
                  color: 'white',
                  zIndex: 2
                }}
              >
                <Typography 
                  variant="h3" 
                  component="h2" 
                  sx={{
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    fontWeight: 400,
                    lineHeight: 1.2,
                    mb: 2,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    fontFamily: 'serif',
                    textAlign: 'left'
                  }}
                >
                  EVENT 2
                  <br />
                  DATE
                  <br />
                  LOCATION
                </Typography>
                <Box sx={{ width: 60, height: 2, bgcolor: 'white', mt: 2, opacity: 0.8 }} />
              </CardContent>

              {/* Bottom-right transparent button */}
              <Button
                component={RouterLink}
                to="/events/rhythm-movement-earth"
                aria-label="Learn more about Rhythm, Movement, and Earth"
                variant="outlined"
                size={isMobile ? 'small' : 'medium'}
                sx={{
                  position: 'absolute',
                  right: 16,
                  bottom: 16,
                  zIndex: 2,
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.7)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(6px)',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    borderColor: '#fff'
                  }
                }}
              >
                Learn more
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
