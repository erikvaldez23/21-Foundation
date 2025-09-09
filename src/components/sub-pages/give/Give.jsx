// src/pages/DonationsPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Divider,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GiveHero from "./GiveHero";
import GiveImpact from "./GiveImpact";
import GiveStory from "./GiveStory";
import CTA from "./CTA";
import GiveDonations from "./GivDonations"

const DonationsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#E8E5DD' }}>
      <Container maxWidth="xl">
        <GiveHero />
        {/* <GiveImpact /> */}
        <GiveDonations />
        <GiveStory />
        <CTA />
      </Container>
    </Box>
  );
};

export default DonationsPage;
