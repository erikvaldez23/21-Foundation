import React from 'react';
import { Box, Typography, Container, IconButton, Stack, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';

// Kelly Green: #339c5e
const ComingSoonWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#339c5e',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: "'Poppins', sans-serif",
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#E1306C', // Instagram pink
  marginTop: theme.spacing(3),
  '&:hover': {
    backgroundColor: '#c72d61',
  },
  width: 56,
  height: 56,
  borderRadius: '50%',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
}));

const ComingSoon = () => {
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ComingSoonWrapper>
      <Container maxWidth="sm">
        <Typography gutterBottom sx={{fontSize: isMobile ? "2rem" : "2rem", fontWeight:"700"}}>
          Coming Soon
        </Typography>
        <Typography sx={{fontSize: isMobile ? "1rem" : "1rem"}}>
          We're working hard to bring something amazing. Stay tuned!
        </Typography>

        {/* Instagram Button */}
        <Stack direction="row" justifyContent="center">
          <StyledIconButton
            aria-label="Visit our Instagram"
            onClick={() => window.open('https://www.instagram.com/seanclark21foundation', '_blank')}
          >
            <InstagramIcon fontSize="medium" />
          </StyledIconButton>
        </Stack>
      </Container>
    </ComingSoonWrapper>
  );
};

export default ComingSoon;
