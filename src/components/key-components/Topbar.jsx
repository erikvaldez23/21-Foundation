// components/TopbarHero.jsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Link as MuiLink,
  useScrollTrigger,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

/* ------------------------------- Defaults ------------------------------- */
const DEFAULT_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  // { label: "Shop", to: "/shop" },
  { label: "Give", to: "/give" },
  { label: "Contact", to: "/contact" },
];

const NavLink = styled(MuiLink)(({ theme }) => ({
  position: "relative",
  color: "inherit",
  textDecoration: "none",
  marginLeft: theme.spacing(3),
  fontWeight: 500,
  display: "inline-block",
  outline: "none",
  transition: "color 0.4s ease, transform 0.2s ease",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: -4,
    height: 2,
    width: "100%",
    transform: "scaleX(0)",
    transformOrigin: "left",
    background: "currentColor",
    opacity: 0.9,
    transition: "transform 240ms ease, background-color 0.4s ease",
  },
  "&:hover": { transform: "translateY(-1px)" },
  "&:hover::after": { transform: "scaleX(1)" },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    "&::after": { transition: "none" },
    "&:hover": { transform: "none" },
  },
}));

const ActiveStyles = styled("span")(() => ({
  position: "relative",
  display: "inline",
  fontWeight: 700,
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: -4,
    height: 2,
    width: "100%",
    background: "currentColor",
    opacity: 0.9,
  },
}));

const LogoLink = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1.2),
  textDecoration: "none",
  color: "inherit",
  transition: "color 0.4s ease, transform 0.2s ease, filter 0.3s ease",
  cursor: "pointer",
  "&:hover": { transform: "translateY(-1px)", filter: "brightness(1.05)" },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    "&:hover": { transform: "none", filter: "none" },
  },
}));

const MotionAppBar = motion(AppBar);
const MotionToolbar = motion(Toolbar);

/* --------------------------- Mobile drawer styles --------------------------- */
const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  paddingTop: `max(${theme.spacing(2)}, env(safe-area-inset-top))`,
}));

const DrawerFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: `max(${theme.spacing(2)}, env(safe-area-inset-bottom))`,
}));

/* ========================= Animated Drawer (Framer) ========================= */
function FancyDrawer({
  onClose,
  items,
  logoSrc,
  logoAlt,
  showWordmark,
  wordmark,
  instagramUrl,
  showInstagram,
}) {
  const backdrop = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25, delay: 0.1 } },
  };

  const list = {
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const listItem = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { y: 10, opacity: 0, transition: { duration: 0.2 } },
  };

  // ESC to close and Body scroll lock
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      key="drawer-backdrop"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={backdrop}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 11, 13, 0.95)", // sleek dark overlay
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        zIndex: 1400,
        display: "flex",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3, pt: `max(24px, env(safe-area-inset-top))` }}>
        <IconButton
          aria-label="Close menu"
          onClick={onClose}
          sx={{ color: "#fff", transition: 'transform 0.2s', '&:hover': { transform: 'rotate(90deg)' } }}
          size="large"
        >
          <CloseRoundedIcon fontSize="large" />
        </IconButton>
      </Box>
      {/* Nav items */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 4 }}>
        <motion.div
          variants={list}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {items.map((item) => {
            const Inner = (
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: item.active ? 800 : 400, 
                  fontFamily: 'serif',
                  opacity: item.active ? 1 : 0.7,
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 1 }
                }}
              >
                {item.label}
              </Typography>
            );
            return (
              <motion.div key={item.key} variants={listItem}>
                {item.to ? (
                  <MuiLink 
                    component={RouterLink} 
                    to={item.to} 
                    onClick={onClose} 
                    underline="none" 
                    color="inherit"
                  >
                    {Inner}
                  </MuiLink>
                ) : (
                  <MuiLink 
                    href={item.href || "#"} 
                    onClick={onClose} 
                    underline="none" 
                    color="inherit"
                  >
                    {Inner}
                  </MuiLink>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 4, pb: `max(32px, env(safe-area-inset-bottom))`, display: 'flex', justifyContent: 'center' }}>
        {showInstagram && (
          <IconButton
            component="a"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Instagram"
            sx={{
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "50%",
              p: 2,
              transition: 'all 0.3s',
              "&:hover": {
                background: "rgba(255,255,255,1)",
                color: "#111"
              },
            }}
          >
            <InstagramIcon fontSize="medium" />
          </IconButton>
        )}
      </Box>
    </motion.div>
  );
}

/* ================================ Topbar ================================= */
export default function TopbarHero({
  links = DEFAULT_LINKS,
  position = "fixed",
  threshold = 24,
  blurPx = 10,
  sx,
  // logoSrc = "/logo-2.png",
  logoSrc = "/alt-logo2.png",
  logoAlt = "Company Logo",
  homeTo = "/",
  showWordmark = false,
  wordmark = "",
  instagramUrl = "https://www.instagram.com/seanclark21foundation/",
  showInstagram = true,
}) {
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold });
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  // Animated background
  const bgOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const borderOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 0.18]);
  const blurAmount = useTransform(scrollYProgress, [0, 0.1], [0, blurPx]);
  const dropShadow = useTransform(scrollYProgress, [0, 0.1], [0, 0.25]);
  const barHeight = useTransform(scrollYProgress, [0, 0.1], [72, 64]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 0.35]);
  const textMotionColor = useTransform(
    scrollYProgress,
    [0, 0.12],
    ["#000", "#fff"]
  );

  const isHome = location?.pathname === (homeTo || "/");
  const isActive = useCallback(
    (link) => (link?.to ? location.pathname === link.to : !!link?.current),
    [location.pathname]
  );

  // Mobile drawer state
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(
    (next) => (event) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(next);
    },
    []
  );

  // Precompute nav items for drawer
  const drawerItems = useMemo(
    () =>
      links.map((link) => ({
        key: link.label,
        label: link.label,
        to: link.to,
        href: link.href,
        active: isActive(link),
      })),
    [links, isActive]
  );

  return (
    <>
      <MotionAppBar
        key={isHome ? "topbar-home" : "topbar-sub"}
        position={position}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        sx={{
          top: "calc(var(--headliner-h, 0px) + env(safe-area-inset-top))",
          background: "transparent",
          boxShadow: scrolled ? "0 8px 28px rgba(0,0,0,0.25)" : "none",
          borderBottom: "1px solid transparent",
          zIndex: (theme) => theme.zIndex.appBar,
          p: 1,
          ...sx,
        }}
        style={{
          color: isHome ? "#fff" : textMotionColor,
          backdropFilter: scrolled
            ? `saturate(180%) blur(${blurAmount.get()}px)`
            : "none",
          WebkitBackdropFilter: scrolled
            ? `saturate(180%) blur(${blurAmount.get()}px)`
            : "none",
        }}
      >
        {/* Animated background layers */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,1)",
            opacity: bgOpacity,
            pointerEvents: "none",
          }}
        />
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0))",
            opacity: vignetteOpacity,
            mixBlendMode: "overlay",
          }}
        />
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 1,
            backgroundColor: "currentColor",
            opacity: borderOpacity,
            pointerEvents: "none",
          }}
        />

        <MotionToolbar
          sx={{
            justifyContent: "space-between",
            minHeight: 0,
            py: 0.5,
            position: "relative",
          }}
          style={{
            height: barHeight,
            boxShadow: scrolled
              ? `0 8px 24px rgba(0,0,0,${dropShadow.get()})`
              : "none",
          }}
        >
          {/* Left: Logo */}
          <LogoLink
            component={RouterLink}
            to={homeTo}
            aria-label="Go to home"
            title="Home"
            sx={{
              "&:focus-visible": {
                outline: "none",
                boxShadow: `0 0 0 3px ${alpha("#ffffff", 0.28)}`,
                borderRadius: 10,
              },
            }}
          >
            <motion.img
              src={logoSrc}
              alt={logoAlt}
              style={{ height: 70, width: "auto", display: "block", filter: "brightness(2) contrast(1.2)" }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -1 }}
            />
            {showWordmark && (
              <Typography
                variant="h6"
                component={motion.span}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                sx={{ fontWeight: 700, display: { xs: "none", md: "inline" } }}
              >
                {wordmark}
              </Typography>
            )}
          </LogoLink>

          {/* Right: Desktop nav + Instagram */}
          <Box
            component="nav"
            aria-label="Primary"
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {links.map((link, idx) => {
              const active = isActive(link);
              const focusStyles = {
                "&:focus-visible": {
                  outline: "none",
                  boxShadow: `0 0 0 3px ${alpha("#ffffff", 0.28)}`,
                  borderRadius: 6,
                },
              };
              const LinkInner = active ? (
                <ActiveStyles>{link.label}</ActiveStyles>
              ) : (
                link.label
              );
              const baseProps = {
                key: link.label,
                underline: "none",
                sx: { fontWeight: active ? 700 : 500, ...focusStyles },
                component: motion(MuiLink),
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: {
                  duration: 0.45,
                  delay: 0.18 + idx * 0.06,
                  ease: "easeOut",
                },
              };
              return link.to ? (
                <NavLink {...baseProps} component={RouterLink} to={link.to}>
                  {LinkInner}
                </NavLink>
              ) : (
                <NavLink {...baseProps} href={link.href || "#"}>
                  {LinkInner}
                </NavLink>
              );
            })}

            {showInstagram && (
              <Tooltip arrow>
                <IconButton
                  component={motion.a}
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Instagram"
                  size="large"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  sx={{
                    marginLeft: 2.5,
                    color: "inherit",
                    borderRadius: 12,
                    "&:hover": {
                      color: "#339c5e",
                    },
                  }}
                >
                  <InstagramIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {/* Right: Mobile hamburger */}
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >

            <IconButton
              edge="end"
              aria-label="Open menu"
              onClick={toggleDrawer(true)}
              sx={{
                color: "inherit",
                borderRadius: 2,
                "&:focus-visible": {
                  outline: "none",
                  boxShadow: `0 0 0 3px ${alpha("#ffffff", 0.28)}`,
                },
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Box>
        </MotionToolbar>
      </MotionAppBar>

      {/* Animated mobile drawer */}
      <AnimatePresence>
        {open && (
          <FancyDrawer
            onClose={toggleDrawer(false)}
            items={drawerItems}
            logoSrc={logoSrc}
            logoAlt={logoAlt}
            showWordmark={showWordmark}
            wordmark={wordmark}
            instagramUrl={instagramUrl}
            showInstagram={showInstagram}
          />
        )}
      </AnimatePresence>
    </>
  );
}
