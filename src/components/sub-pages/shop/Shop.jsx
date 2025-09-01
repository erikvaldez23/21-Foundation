import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// If your file is in /public, use "/image1.JPG" directly.
// If it's in src/assets, import it like:
// import teeImg from '../assets/image1.JPG';

const products = [
  {
    id: 1,
    title: 'Live Like Sean Tee',
    price: 28,
    image: '/image1.JPG', // <-- EXACT case if in /public
    tag: 'Apparel',
    slug: 'live-like-sean-tee',
  },
  {
    id: 2,
    title: 'Kelly Green Cap',
    price: 24,
    image: 'https://images.unsplash.com/photo-1516642499105-492ff3ac521b?q=80&w=1600&auto=format&fit=crop',
    tag: 'Apparel',
    slug: 'kelly-green-cap',
  },
  {
    id: 3,
    title: 'Foundation Tote',
    price: 20,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop',
    tag: 'Accessories',
    slug: 'foundation-tote',
  },
  {
    id: 4,
    title: 'Insulated Water Bottle',
    price: 30,
    image: 'https://images.unsplash.com/photo-1514053026555-49ce8886ae41?q=80&w=1600&auto=format&fit=crop',
    tag: 'Accessories',
    slug: 'insulated-bottle',
  },
  {
    id: 5,
    title: 'Minimal Hoodie',
    price: 55,
    image: 'https://images.unsplash.com/photo-1542326237-94b1c5a538d9?q=80&w=1600&auto=format&fit=crop',
    tag: 'Apparel',
    slug: 'minimal-hoodie',
  },
  {
    id: 6,
    title: 'Sticker Pack',
    price: 8,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    tag: 'Merch',
    slug: 'sticker-pack',
  },
];

const Shop = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#E8E5DD', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6, pt: 4 }}>
          <Typography
            variant="overline"
            sx={{ color: '#666', letterSpacing: 2, fontSize: '0.8rem', mb: 3, display: 'block' }}
          >
            FOUNDATION SHOP
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
            PURPOSEFUL GOODS
            <br />
            DESIGNED TO GIVE BACK
            <br />—
          </Typography>
        </Box>

        {/* Products grid - 1 / 2 / 3 per row */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {products.map((p) => (
            <Grid key={p.id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: 420,
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.shadows[8] },
                }}
              >
                {/* Image */}
                <CardMedia
                  component="img"
                  src={p.image}
                  alt={p.title}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop';
                  }}
                  sx={{
                    height: '100%',
                    filter: 'brightness(0.85)',
                    objectFit: 'cover',
                  }}
                />

                {/* Soft gradient overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.55) 100%)',
                  }}
                />

                {/* Tag */}
                <Chip
                  label={p.tag}
                  size="small"
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: 16,
                    bgcolor: 'rgba(255,255,255,0.85)',
                    color: '#222',
                    fontWeight: 600,
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                  }}
                />

                {/* Text + CTAs */}
                <CardContent
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    color: 'white',
                    textAlign: 'left',
                    p: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: 'serif',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.35)',
                      mb: 1,
                    }}
                  >
                    {p.title}
                  </Typography>

                  <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 2 }}>
                    ${p.price.toFixed(2)}
                  </Typography>

                  <Box sx={{ width: 60, height: 2, bgcolor: 'white', opacity: 0.85, mb: 2 }} />

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      component={RouterLink}
                      to={`/shop/${p.slug}`}
                      variant="outlined"
                      size={isMobile ? 'small' : 'medium'}
                      sx={{
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.7)',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(6px)',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)', borderColor: '#fff' },
                      }}
                    >
                      View details
                    </Button>

                    <Button
                      onClick={() => console.log('Add to cart:', p.slug)}
                      variant="contained"
                      size={isMobile ? 'small' : 'medium'}
                      sx={{
                        color: '#111',
                        bgcolor: 'rgba(255,255,255,0.92)',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                      }}
                    >
                      Add to cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Footer note */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="body2" sx={{ color: '#555', maxWidth: 680, mx: 'auto', lineHeight: 1.7 }}>
            100% of proceeds support our outreach and programs. Every purchase fuels the mission to carry Sean&apos;s spirit forward.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Shop;
