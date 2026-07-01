import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const CommunityOutreachHero = () => {
  return (
    <Box sx={{
      minHeight: '10vh',
      bgcolor: '#E8E5DD',
      py: 4
    }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: { xs: 0, md: 6 }, pt: { xs: 8, md: 4 } }}>
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
            MENTAL HEALTH REACH OUT
          </Typography>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '3rem', md: '3.5rem' },
              fontWeight: 400,
              color: '#333',
              lineHeight: 1.3,
              maxWidth: '900px',
              mx: 'auto',
              fontFamily: 'serif'
            }}
          >
            COMMUNITY OUTREACH
            <br />
            -
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CommunityOutreachHero;
