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

// ✅ import the image (bulletproof across dev/prod & subpaths)
import vertImg from '/image1.JPG'; // make sure filename & case match exactly

const DonationsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // ---- donation state ----
  const [freq, setFreq] = useState('one-time');
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState('');
  const presetAmounts = [25, 50, 100, 250, 500];

  const handleSelectAmount = (val) => {
    setAmount(val);
    setCustom('');
  };

  const handleCustomChange = (e) => {
    const v = e.target.value.replace(/[^\d]/g, '');
    setCustom(v);
    setAmount(v ? Number(v) : '');
  };

  // ---- exact shared height for both columns ----
  const FIXED_HEIGHT = 520;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#E8E5DD', py: 4 }}>
      <Container maxWidth="xl">
        {/* HERO */}
        <Box sx={{ textAlign: 'center', mb: 6, pt: 4 }}>
          <Typography
            variant="overline"
            sx={{
              color: '#666',
              letterSpacing: 2,
              fontSize: '0.8rem',
              mb: 3,
              display: 'block',
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
              fontFamily: 'serif',
            }}
          >
            HEADER
            <br />
            DESCRIPTION
            <br />-
          </Typography>
        </Box>

        {/* BODY */}
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          {/* Left: Vertical image card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: { xs: 420, md: FIXED_HEIGHT },
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
              }}
            >
              {/* Using an <img> with the imported asset ensures correct pathing */}
              <Box sx={{ position: 'absolute', inset: 0 }}>
                <img
                  src={vertImg}
                  alt="Foundation outreach"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'contrast(1) brightness(0.95)',
                  }}
                />
              </Box>

              {/* Optional vignette */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(100% 100% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.25) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </Card>
          </Grid>

          {/* Right: Donation form */}
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Card
              sx={{
                height: { xs: 420, md: FIXED_HEIGHT },
                borderRadius: 2,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography
                  variant="h4"
                  sx={{ fontFamily: 'serif', color: '#333', fontWeight: 500 }}
                >
                  Make a Gift
                </Typography>
                <Typography sx={{ color: '#555', mb: 1 }}>
                  Your support advances outreach, education, and community programs.
                </Typography>

                <Divider />

                <Typography variant="overline" sx={{ color: '#666' }}>
                  Frequency
                </Typography>
                <ToggleButtonGroup
                  color="primary"
                  exclusive
                  value={freq}
                  onChange={(_, v) => v && setFreq(v)}
                  sx={{
                    borderRadius: 999,
                    width: 'fit-content',
                    bgcolor: '#F4F2EC',
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      px: 2.5,
                      border: 0,
                      '&.Mui-selected': { bgcolor: '#E8E5DD' },
                    },
                  }}
                >
                  <ToggleButton value="one-time">One-time</ToggleButton>
                  <ToggleButton value="monthly">Monthly</ToggleButton>
                </ToggleButtonGroup>

                <Typography variant="overline" sx={{ color: '#666', mt: 1 }}>
                  Amount
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {presetAmounts.map((a) => (
                    <Chip
                      key={a}
                      label={`$${a}`}
                      onClick={() => handleSelectAmount(a)}
                      color={amount === a && !custom ? 'primary' : 'default'}
                      variant={amount === a && !custom ? 'filled' : 'outlined'}
                      sx={{ borderRadius: 999 }}
                    />
                  ))}
                  <TextField
                    value={custom}
                    onChange={handleCustomChange}
                    placeholder="Custom"
                    inputMode="numeric"
                    sx={{ minWidth: 160 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button
                    component={RouterLink}
                    to="/donate/checkout"
                    size={isMobile ? 'medium' : 'large'}
                    disabled={!amount || Number.isNaN(Number(amount))}
                    sx={{
                      color: '#111',
                      bgcolor: '#fff',
                      px: 3,
                      py: 1.25,
                      borderRadius: 999,
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.06)' },
                    }}
                  >
                    Donate {freq === 'monthly' ? 'Monthly' : 'Now'}
                    {amount ? ` — $${amount}` : ''}
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/donate/ways-to-give"
                    variant="outlined"
                    sx={{ textTransform: 'none', borderRadius: 999, px: 3, py: 1.25 }}
                  >
                    Ways to Give
                  </Button>
                </Stack>

                <Box sx={{ flexGrow: 1 }} />

                <Typography variant="caption" sx={{ color: '#666' }}>
                  SC21 Foundation is a 501(c)(3). Contributions are tax-deductible as
                  allowed by law.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DonationsPage;
