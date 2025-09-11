// components/TopbarHero.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Link as MuiLink,
  useScrollTrigger,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Animated Topbar (subtle fade-to-black on scroll)
 */

const DEFAULT_LINKS = [
  { label: "Home", to: "/" },
  { label: "Give", to: "/give" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
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

const ActiveStyles = styled("span")(({ theme }) => ({
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

const SocialIcon = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(2.5),
  color: "inherit",
  borderRadius: 12,
  transition:
    "color 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease, background 0.3s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: `0 0 0 6px ${alpha("#339c5e", 0.22)}`,
    background: alpha("#339c5e", 0.14),
  },
}));

const MotionAppBar = motion(AppBar);
const MotionToolbar = motion(Toolbar);

export default function TopbarHero({
  links = DEFAULT_LINKS,
  position = "fixed",
  threshold = 24,
  blurPx = 10,
  sx,
  logoSrc = "/logo-2.png",
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

  // Animated background & color
  const bgOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const borderOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 0.18]);
  const blurAmount = useTransform(scrollYProgress, [0, 0.1], [0, blurPx]);
  const dropShadow = useTransform(scrollYProgress, [0, 0.1], [0, 0.25]);
  const barHeight = useTransform(scrollYProgress, [0, 0.1], [72, 64]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 0.35]);

  const isHome = location?.pathname === (homeTo || "/");

  // Subpages: animate text color black → white with scroll
  const textMotionColor = useTransform(scrollYProgress, [0, 0.12], ["#000", "#fff"]);

  const isActive = (link) => {
    if (!location) return !!link.current;
    if (!link?.to) return !!link.current;
    return location.pathname === link.to;
  };

  return (
    <MotionAppBar
      key={isHome ? "topbar-home" : "topbar-sub"} // force remount between home/subpages
      position={position}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        top: "calc(var(--headliner-h, 0px) + env(safe-area-inset-top))",
        background: "transparent", // animated layers handle bg
        boxShadow: scrolled ? "0 8px 28px rgba(0,0,0,0.25)" : "none",
        borderBottom: "1px solid transparent",
        zIndex: (theme) => theme.zIndex.appBar,
        p: 1,
        ...sx,
      }}
      style={{
        // Inline always wins; force white on Home, animate on subpages
        color: isHome ? "#fff" : textMotionColor,
        backdropFilter: scrolled ? `saturate(180%) blur(${blurAmount.get()}px)` : "none",
        WebkitBackdropFilter: scrolled ? `saturate(180%) blur(${blurAmount.get()}px)` : "none",
      }}
    >
      {/* Animated background layers */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,1)",
          opacity: bgOpacity, // fade in black
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
          opacity: vignetteOpacity, // soft top-edge sheen
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
          opacity: borderOpacity, // divider fades in with bg
          pointerEvents: "none",
        }}
      />

      <MotionToolbar
        sx={{ justifyContent: "space-between", minHeight: 0, py: 0.5, position: "relative" }}
        style={{
          height: barHeight,
          boxShadow: scrolled ? `0 8px 24px rgba(0,0,0,${dropShadow.get()})` : "none",
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
            style={{ height: 50, width: "auto", display: "block" }}
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

        {/* Right: Nav links + Instagram */}
        <Box component="nav" aria-label="Primary" sx={{ display: "flex", alignItems: "center" }}>
          {links.map((link, idx) => {
            const active = isActive(link);
            const focusStyles = {
              "&:focus-visible": {
                outline: "none",
                boxShadow: `0 0 0 3px ${alpha("#ffffff", 0.28)}`,
                borderRadius: 6,
              },
            };
            const LinkInner = active ? <ActiveStyles>{link.label}</ActiveStyles> : link.label;
            const baseProps = {
              key: link.label,
              underline: "none",
              sx: { fontWeight: active ? 700 : 500, ...focusStyles },
              component: motion(MuiLink),
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.45, delay: 0.18 + idx * 0.06, ease: "easeOut" },
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
            <Tooltip title="Instagram" arrow>
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
                    boxShadow: `0 0 0 6px ${alpha("#339c5e", 0.22)}`,
                    background: alpha("#339c5e", 0.14),
                  },
                  "&:focus-visible": {
                    outline: "none",
                    boxShadow: `0 0 0 3px ${alpha("#ffffff", 0.28)}`,
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </MotionToolbar>
    </MotionAppBar>
  );
}
