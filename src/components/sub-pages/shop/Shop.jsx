import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  TextField,
  MenuItem,
  Chip,
  Divider,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

/* =========================
   Foundation Shop Sub-Page
   - Product grid with filters, search, sort
   - Cart drawer with quantity controls and order summary
   - "Proceeds support our mental health outreach" banner
   - Replace checkout handler with your payment provider
   ========================= */

const Page = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
 background: `linear-gradient(180deg, ${alpha(
    theme.palette.primary.light,
  0.18)}, ${alpha(theme.palette.background.default, 1)})`,
  color: theme.palette.text.primary,
}));

const Glass = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  background: alpha("#fff", 0.05),
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha("#fff", 0.1)}`,
  boxShadow: "0 10px 30px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
}));

const SectionHeader = ({ title, subtitle }) => (
  <Box sx={{ textAlign: { xs: "left", md: "center" }, mb: 4 }}>
    <Typography
      component={motion.h1}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      variant="h3"
      sx={{ fontWeight: 800, letterSpacing: -0.4 }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        variant="subtitle1"
        sx={{ opacity: 0.85, mt: 1 }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

// ---- Mock catalog ----
const CATEGORIES = ["Apparel", "Hats", "Accessories", "Stickers", "Bundles"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const PRODUCTS = [
  {
    id: "tee-hope",
    name: "HOPE Classic Tee",
    price: 28,
    category: "Apparel",
    sizes: SIZES,
    img: "/shop/tee1.jpg",
    tag: "Best Seller",
  },
  {
    id: "tee-comfort",
    name: "Comfort Tee – Foundation Blue",
    price: 32,
    category: "Apparel",
    sizes: SIZES,
    img: "/shop/tee2.jpg",
    tag: "New",
  },
  {
    id: "hat-dad",
    name: "Dad Hat – Embroidered Logo",
    price: 24,
    category: "Hats",
    sizes: [],
    img: "/shop/hat1.jpg",
  },
  {
    id: "hoodie-mid",
    name: "Midweight Hoodie – Be Kind",
    price: 48,
    category: "Apparel",
    sizes: SIZES,
    img: "/shop/hoodie1.jpg",
  },
  {
    id: "bracelet-set",
    name: "Support Bracelet Set (3pk)",
    price: 12,
    category: "Accessories",
    sizes: [],
    img: "/shop/bracelet1.jpg",
  },
  {
    id: "sticker-pack",
    name: "Sticker Pack – You Matter",
    price: 8,
    category: "Stickers",
    sizes: [],
    img: "/shop/stickers1.jpg",
  },
  {
    id: "bundle-warm",
    name: "Warmth Bundle (Hoodie + Beanie + Stickers)",
    price: 72,
    category: "Bundles",
    sizes: ["S", "M", "L", "XL", "XXL"],
    img: "/shop/bundle1.jpg",
    tag: "Save 15%",
  },
];

export default function Shop() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState({});
  const [openCart, setOpenCart] = useState(false);
  const [toast, setToast] = useState({ open: false, msg: "", ok: true });

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (size !== "All")
      list = list.filter((p) => !p.sizes.length || p.sizes.includes(size));
    if (query.trim())
      list = list.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    switch (sort) {
      case "price_asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      default:
        // featured: keep original order
        break;
    }
    return list;
  }, [query, category, size, sort]);

  const subtotal = useMemo(() => {
    return Object.entries(cart).reduce(
      (sum, [key, item]) => sum + item.price * item.qty,
      0
    );
  }, [cart]);

  const addToCart = (product, selSize = "") => {
    const key = selSize ? `${product.id}-${selSize}` : product.id;
    setCart((c) => {
      const prev = c[key];
      return {
        ...c,
        [key]: {
          id: key,
          name: product.name + (selSize ? ` / ${selSize}` : ""),
          price: product.price,
          qty: prev ? prev.qty + 1 : 1,
          img: product.img,
        },
      };
    });
    setOpenCart(true);
    setToast({ open: true, msg: `${product.name} added to cart`, ok: true });
  };

  const updateQty = (key, delta) => {
    setCart((c) => {
      const next = { ...c };
      if (!next[key]) return c;
      next[key].qty = Math.max(1, (next[key].qty || 1) + delta);
      return next;
    });
  };

  const removeItem = (key) =>
    setCart((c) => {
      const n = { ...c };
      delete n[key];
      return n;
    });

  const checkout = async () => {
    try {
      // TODO: replace with your payment provider (Stripe / Shopify / etc.)
      // Example payload:
      // const res = await fetch('/api/shop/checkout', { method: 'POST', body: JSON.stringify({ items: cart })})
      // const { url } = await res.json(); window.location.href = url;
      setToast({ open: true, msg: "Redirecting to secure checkout…", ok: true });
    } catch (e) {
      setToast({
        open: true,
        msg: "Checkout failed. Please try again.",
        ok: false,
      });
    }
  };

  return (
    <Page>
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <HeaderBar
          onCartClick={() => setOpenCart(true)}
          cartCount={Object.keys(cart).length}
        />
        <SectionHeader
          title="Foundation Shop"
          subtitle="Every purchase fuels youth programs and mental health outreach."
        />

        {/* Filters */}
        <Glass sx={{ p: 2.5, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                select
                fullWidth
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {["All", ...CATEGORIES].map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                select
                fullWidth
                label="Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {["All", ...SIZES].map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                select
                fullWidth
                label="Sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price_asc">Price: Low to High</MenuItem>
                <MenuItem value="price_desc">Price: High to Low</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Glass>

        {/* Product grid */}
        <Grid container spacing={3}>
          {filtered.map((p) => (
            <Grid item key={p.id} xs={12} sm={6} md={4} sx={{ display: "flex" }}>
              <ProductCard product={p} onAdd={(size) => addToCart(p, size)} />
            </Grid>
          ))}
          {filtered.length === 0 && (
            <Grid item xs={12}>
              <Glass sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No items found
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Try adjusting your filters or search.
                </Typography>
              </Glass>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={openCart} onClose={() => setOpenCart(false)}>
        <Box sx={{ width: { xs: 330, sm: 380 }, p: 2 }} role="presentation">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Your Cart
            </Typography>
            <IconButton onClick={() => setOpenCart(false)} aria-label="Close cart">
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <List>
            {Object.keys(cart).length === 0 && (
              <Typography variant="body2" sx={{ opacity: 0.7, p: 2 }}>
                Your cart is empty.
              </Typography>
            )}
            {Object.entries(cart).map(([key, item]) => (
              <ListItem key={key} sx={{ alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    overflow: "hidden",
                    mr: 1.5,
                    bgcolor: "action.hover",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>}
                  secondary={<Typography variant="body2">${item.price.toFixed(2)}</Typography>}
                />
                <ListItemSecondaryAction>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton onClick={() => updateQty(key, -1)} size="small">
                      <RemoveRoundedIcon fontSize="small" />
                    </IconButton>
                    <Typography>{item.qty}</Typography>
                    <IconButton onClick={() => updateQty(key, +1)} size="small">
                      <AddRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => removeItem(key)} size="small">
                      <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: "grid", gap: 0.75 }}>
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value="Calculated at checkout" />
            <Row label="Tax" value="Calculated at checkout" />
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2, borderRadius: 2, fontWeight: 800 }}
            onClick={checkout}
          >
            Checkout
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.25, opacity: 0.85 }}>
            <FavoriteRoundedIcon fontSize="small" />
            <Typography variant="caption">Proceeds support mental health outreach.</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5, opacity: 0.85 }}>
            <VerifiedRoundedIcon fontSize="small" />
            <Typography variant="caption">Secure payment • Easy returns</Typography>
          </Box>
        </Box>
      </Drawer>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.ok ? "success" : "error"}
          variant="filled"
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Page>
  );
}

/* ===== Small Components ===== */
const Row = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      py: 0.25,
    }}
  >
    <Typography variant="body2" sx={{ opacity: 0.8 }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 700 }}>
      {value}
    </Typography>
  </Box>
);

const HeaderBar = ({ onCartClick, cartCount }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mb: 2,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <LocalShippingRoundedIcon />
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        Free U.S. shipping on orders $75+
      </Typography>
    </Box>
    <IconButton onClick={onCartClick} aria-label="Open cart">
      <Badge badgeContent={cartCount} color="primary">
        <ShoppingBagRoundedIcon />
      </Badge>
    </IconButton>
  </Box>
);

/* ====== Updated for equal-height tiles ====== */
const ProductCard = ({ product, onAdd }) => {
  const [selSize, setSelSize] = useState("");
  const hasSizes = product.sizes && product.sizes.length > 0;

  return (
    <Glass
      component={motion.div}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",     // equal-height tiles
        overflow: "hidden",
        flex: 1,
        width: "100%",
      }}
    >
      <CardMedia
        sx={{ height: 220, bgcolor: "action.hover" }}
        image={product.img}
        title={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
          {product.category}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {product.name}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            ${product.price}
          </Typography>
        </Box>
        {product.tag && (
          <Chip
            size="small"
            label={product.tag}
            color="primary"
            variant="outlined"
            sx={{ mt: 1, borderRadius: 2 }}
          />
        )}
        {hasSizes && (
          <Box sx={{ mt: 1.25 }}>
            <Typography
              variant="caption"
              sx={{ display: "block", mb: 0.5, opacity: 0.7 }}
            >
              Select size
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={selSize}
              onChange={(_, v) => setSelSize(v)}
            >
              {product.sizes.map((s) => (
                <ToggleButton key={s} value={s} size="small">
                  {s}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onAdd(selSize)}
          disabled={hasSizes && !selSize}
          sx={{ borderRadius: 2, fontWeight: 800 }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Glass>
  );
};
