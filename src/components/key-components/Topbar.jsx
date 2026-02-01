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
    animate: { opacity: 1, transition: { duration: 0.22 } },
    exit: { opacity: 0, transition: { duration: 0.18 } },
  };

  const panel = {
    initial: { x: "8%", opacity: 0.6, filter: "blur(6px)" },
    animate: {
      x: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 380, damping: 32 },
    },
    exit: {
      x: "6%",
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.18, ease: "easeOut" },
    },
  };

  const list = {
    animate: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
  };
  const listItem = {
    initial: { x: 12, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.28, ease: "easeOut" },
    },
    exit: { x: 8, opacity: 0, transition: { duration: 0.16 } },
  };

  // ESC to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="drawer-backdrop"
        onClick={onClose}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={backdrop}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          zIndex: 1300,
        }}
      />

      {/* Panel */}
      <motion.aside
        key="drawer-panel"
        role="dialog"
        aria-modal="true"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={panel}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 80 || info.velocity.x > 600) onClose();
        }}
        style={{
          position: "fixed",
          top: "env(safe-area-inset-top)",
          right: 0,
          bottom: "env(safe-area-inset-bottom)",
          width: "min(86vw, 420px)",
          background: "#E8E5DD",
          color: "#000",
          borderLeft: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 1400,
          display: "flex",
          flexDirection: "column",
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30
        }}
      >
        {/* Header */}
        <DrawerHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={logoSrc}
              alt={logoAlt}
              style={{ height: 46, width: "auto" }}
            />
            {showWordmark && (
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {wordmark}
              </Typography>
            )}
          </Box>
          <IconButton
            aria-label="Close menu"
            onClick={onClose}
            sx={{ color: "inherit", borderRadius: 2 }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

        {/* Nav items */}
        <motion.div
          variants={list}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ padding: "8px 8px 12px 8px", overflowY: "auto" }}
        >
          {items.map((item) => {
            const Inner = (
              <>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 16 }}
                />
                <ChevronRightRoundedIcon />
              </>
            );
            return (
              <motion.div key={item.key} variants={listItem}>
                {item.to ? (
                  <ListItemButton
                    component={RouterLink}
                    to={item.to}
                    onClick={onClose}
                    sx={{
                      borderRadius: 2,
                      my: 0.5,
                      ...(item.active && {
                        backgroundColor: "rgba(51,156,94,0.18)",
                        "& .MuiListItemText-primary": { fontWeight: 700 },
                      }),
                    }}
                  >
                    {Inner}
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    component="a"
                    href={item.href || "#"}
                    onClick={onClose}
                    sx={{ borderRadius: 2, my: 0.5 }}
                  >
                    {Inner}
                  </ListItemButton>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <DrawerFooter>
          {showInstagram && (
            <>
              {/* Mobile: full-width gradient button */}
              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <IconButton
                  component="a"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Instagram"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    borderRadius: 2,
                    px: 1.5,
                    py: 1.5,
                    color: "#fff",
                    border: "none",
                    // Instagram gradient
                    background:
                      "linear-gradient(45deg, #F58529, #FEDA77, #DD2A7B, #8134AF, #515BD4)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                    "&:hover": {
                      filter: "brightness(1.05)",
                      boxShadow: "0 8px 22px rgba(0,0,0,0.3)",
                      background:
                        "linear-gradient(45deg, #F58529, #FEDA77, #DD2A7B, #8134AF, #515BD4)",
                    },
                    "&:focus-visible": {
                      outline: "2px solid rgba(255,255,255,0.8)",
                      outlineOffset: 2,
                    },
                  }}
                >
                  <InstagramIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Follow us on Instagram
                  </Typography>
                </IconButton>
              </Box>

              {/* Tablet/Desktop: keep your original compact button + tooltip */}
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Tooltip title="Instagram" arrow>
                  <IconButton
                    component="a"
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Instagram"
                    sx={{
                      color: "#fff",
                      borderRadius: 2,
                      border: "1px solid rgba(255,255,255,0.22)",
                      px: 1.5,
                    }}
                  >
                    <InstagramIcon sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Follow us
                    </Typography>
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </DrawerFooter>
      </motion.aside>
    </>
  );
}

/* ================================ Topbar ================================= */
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
            {showInstagram && (
              <IconButton
                component="a"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Instagram"
                sx={{ color: "inherit", mr: 0.5 }}
              >
                <InstagramIcon />
              </IconButton>
            )}
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
