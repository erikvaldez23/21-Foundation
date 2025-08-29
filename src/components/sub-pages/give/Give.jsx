import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  Paper,
  LinearProgress,
  Breadcrumbs,
  Link,
  InputAdornment,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  CreditCardOutlined,
  SecurityOutlined,
  HomeOutlined,
  ArrowForwardIos,
} from '@mui/icons-material';

/* ===================== Styled ===================== */
const PageWrap = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background:
    `radial-gradient(1200px 600px at 20% -10%, ${alpha('#2FA652', 0.12)} 0%, transparent 60%),
     radial-gradient(1000px 500px at 110% 10%, ${alpha('#2FA652', 0.10)} 0%, transparent 60%),
     linear-gradient(180deg, ${alpha('#0b1a11', 0.04)} 0%, transparent 30%)`,
}));

const GridPattern = styled('div')(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
  backgroundImage:
    `linear-gradient(${alpha('#2FA652', 0.06)} 1px, transparent 1px),
     linear-gradient(90deg, ${alpha('#2FA652', 0.06)} 1px, transparent 1px)`,
  backgroundSize: '40px 40px, 40px 40px',
  maskImage:
    'radial-gradient(ellipse at center, rgba(0,0,0,0.35), rgba(0,0,0,0.85))',
}));

const Hero = styled('section')(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
  color: '#fff',
  background:
    `linear-gradient(180deg, ${alpha('#2FA652', 0.85)}, ${alpha('#2FA652', 0.8)})`,
  overflow: 'hidden',
}));

const HeroGlow = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: '-20% -10% auto -10%',
  height: 420,
  filter: 'blur(60px)',
  background:
    `radial-gradient(600px 280px at 20% 30%, rgba(255,255,255,0.18) 0%, transparent 60%),
     radial-gradient(500px 220px at 80% 10%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
  pointerEvents: 'none',
}));

const PageSection = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(10),
}));

const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  backgroundColor: alpha('#ffffff', 0.75),
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
}));

const SidePaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  backgroundColor: alpha('#ffffff', 0.9),
  backdropFilter: 'blur(6px)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
}));

const Sticky = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(12),
}));

const OutlineBtn = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 999,
}));

const CTAStrip = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(6),
  borderRadius: 16,
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background:
    `linear-gradient(180deg, ${alpha('#2FA652', 0.10)}, ${alpha('#2FA652', 0.06)})`,
  border: `1px solid ${alpha('#2FA652', 0.15)}`,
}));

/* ===================== Component ===================== */
const DonationPage = () => {
  const [donationType, setDonationType] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const predefinedAmounts = [25, 50, 100, 250, 500];
  const currentGoal = 75000;
  const currentRaised = 52340;
  const progressPercentage = (currentRaised / currentGoal) * 100;

  const displayAmount = useMemo(() => {
    const v = customAmount !== '' ? Number(customAmount) : selectedAmount || 0;
    return isNaN(v) ? 0 : v;
  }, [customAmount, selectedAmount]);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/[^\d.]/g, '');
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const handleInputChange = (field, value) => {
    setDonorInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <PageWrap>
      <GridPattern />

      {/* ===== Hero / Header ===== */}
      <Hero>
        <HeroGlow />
        <Container maxWidth="lg">
          <Breadcrumbs
            sx={{ color: alpha('#fff', 0.95), mb: 1 }}
            separator={<ArrowForwardIos sx={{ fontSize: 12, opacity: 0.9 }} />}
          >
            <Link color="inherit" underline="hover" href="/">
              <HomeOutlined sx={{ fontSize: 16, mr: 0.5, mb: -0.2 }} />
              Home
            </Link>
            <Typography color={alpha('#fff', 0.9)}>Get Involved</Typography>
            <Typography color="#fff" fontWeight={600}>Donate</Typography>
          </Breadcrumbs>

          <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
            Fuel Mental Resilience
          </Typography>
          <Typography variant="h6" sx={{ mt: 1.5, opacity: 0.95, maxWidth: 680, lineHeight: 1.5 }}>
            Your gift funds outreach, workshops, and resources that help youth build courage,
            kindness, and lifelong coping skills.
          </Typography>

          <Box sx={{ mt: 3, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <OutlineBtn variant="outlined" color="inherit" href="#give">
              Make a Gift
            </OutlineBtn>
            <OutlineBtn variant="outlined" color="inherit" href="#impact">
              See Your Impact
            </OutlineBtn>
          </Box>
        </Container>
      </Hero>

      {/* ===== Main Content ===== */}
      <PageSection id="give">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Left: Donation Form */}
            <Grid item xs={12} lg={8}>
              <GlassCard>
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    Make a Donation
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                    Every contribution—large or small—moves this mission forward.
                  </Typography>

                  {/* Donation Type */}
                  <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <FormLabel component="legend" sx={{ fontWeight: 700, color: 'text.primary', mb: 1.5 }}>
                      Donation Type
                    </FormLabel>
                    <RadioGroup
                      value={donationType}
                      onChange={(e) => setDonationType(e.target.value)}
                      row
                    >
                      <FormControlLabel
                        value="one-time"
                        control={<Radio sx={{ color: '#2FA652', '&.Mui-checked': { color: '#2FA652' } }} />}
                        label="One-time"
                      />
                      <FormControlLabel
                        value="monthly"
                        control={<Radio sx={{ color: '#2FA652', '&.Mui-checked': { color: '#2FA652' } }} />}
                        label="Monthly"
                      />
                    </RadioGroup>
                  </FormControl>

                  {/* Amount Selection */}
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Select Amount
                  </Typography>
                  <Grid container spacing={1.5} sx={{ mb: 3 }}>
                    {predefinedAmounts.map((amount) => {
                      const active = selectedAmount === amount && customAmount === '';
                      return (
                        <Grid item key={amount}>
                          <Chip
                            label={`$${amount.toLocaleString()}`}
                            onClick={() => handleAmountSelect(amount)}
                            sx={{
                              borderRadius: 2,
                              px: 2,
                              py: 1,
                              fontWeight: 700,
                              fontSize: '1rem',
                              cursor: 'pointer',
                              bgcolor: active ? '#2FA652' : '#fff',
                              color: active ? '#fff' : 'text.primary',
                              border: `1px solid ${active ? '#2FA652' : alpha('#000', 0.1)}`,
                              '&:hover': {
                                bgcolor: active ? '#2a9a4c' : alpha('#2FA652', 0.06)
                              }
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>

                  <TextField
                    fullWidth
                    label="Custom Amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter custom amount"
                    inputMode="decimal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography sx={{ color: 'text.secondary' }}>$</Typography>
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 4 }}
                  />

                  <Divider sx={{ my: 3 }} />

                  {/* Donor Information */}
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Your Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={donorInfo.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={donorInfo.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={donorInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number (Optional)"
                        value={donorInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      mt: 4,
                      py: 2,
                      backgroundColor: '#2FA652',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      textTransform: 'none',
                      borderRadius: 2,
                      boxShadow: '0 8px 20px rgba(47,166,82,0.35)',
                      '&:hover': { backgroundColor: '#29964a' }
                    }}
                    startIcon={<CreditCardOutlined />}
                  >
                    Donate ${displayAmount.toLocaleString()} {donationType === 'monthly' ? 'Monthly' : 'Today'}
                  </Button>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1.5, gap: 1 }}>
                    <SecurityOutlined sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      Secure donation processing
                    </Typography>
                  </Box>

                  {/* Trust strip */}
                  <CTAStrip>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Prefer to give by check or employer match?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <OutlineBtn variant="outlined" href="#other-ways">Other ways to give</OutlineBtn>
                      <OutlineBtn variant="outlined" href="#faq">FAQ</OutlineBtn>
                    </Box>
                  </CTAStrip>
                </CardContent>
              </GlassCard>
            </Grid>

            {/* Right: Sticky Sidebar */}
            <Grid item xs={12} lg={4}>
              <Sticky>
                <SidePaper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                    Campaign Progress
                  </Typography>
                  <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      ${currentRaised.toLocaleString()} raised
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${currentGoal.toLocaleString()} goal
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progressPercentage}
                    sx={{
                      height: 10,
                      borderRadius: 6,
                      backgroundColor: alpha('#2FA652', 0.15),
                      '& .MuiLinearProgress-bar': { backgroundColor: '#2FA652' }
                    }}
                  />
                  <Typography variant="body2" sx={{ mt: 1.2, textAlign: 'center' }} color="text.secondary">
                    {Math.round(progressPercentage)}% of goal reached
                  </Typography>
                </SidePaper>

                <SidePaper id="impact" sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
                    Your Impact
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>$25 can provide:</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    Mental health resources for one person for a month
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>$100 can provide:</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    Crisis intervention training for community volunteers
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>$250 can provide:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    A mental health workshop for an entire school
                  </Typography>
                </SidePaper>

                <SidePaper id="faq" sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                    Questions?
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    Need help with your donation or have questions about our mission?
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: '#2FA652',
                      borderColor: '#2FA652',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#29964a',
                        backgroundColor: alpha('#2FA652', 0.06)
                      }
                    }}
                  >
                    Contact Us
                  </Button>
                </SidePaper>
              </Sticky>
            </Grid>
          </Grid>
        </Container>
      </PageSection>

      {/* ===== Footer Band (optional) ===== */}
      <Box sx={{ py: 6, borderTop: `1px solid ${alpha('#000', 0.08)}` }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            Clark21 Foundation is a 501(c)(3) nonprofit. Donations are tax-deductible as allowed by law.
          </Typography>
        </Container>
      </Box>
    </PageWrap>
  );
};

export default DonationPage;
