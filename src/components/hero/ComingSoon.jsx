import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

// Kelly Green: #4CBB17
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

const ComingSoon = () => {
  return (
    <ComingSoonWrapper>
      <Container maxWidth="sm">
        <Typography variant="h2" fontWeight="700" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="h6">
          We're working hard to bring something amazing. Stay tuned!
        </Typography>
      </Container>
    </ComingSoonWrapper>
  );
};

export default ComingSoon;
