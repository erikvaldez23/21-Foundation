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

const GiveHero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      minHeight: '10vh',
      bgcolor: '#E8E5DD',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 0 ,md: 6 }, pt: { xs: 8 , md: 4 }}}>
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
              fontSize: { xs: '3rem', md: '3.5rem' },
              fontWeight: 400,
              color: '#333',
              lineHeight: 1.3,
              maxWidth: '900px',
              mx: 'auto',
              fontFamily: 'serif'
            }}
          >
            DONATIONS
            {/* <br /> */}
            {/* DESCRIPTION */}
            <br />
            -
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default GiveHero;