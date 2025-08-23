// components/TopbarHero.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Link as MuiLink,
  useScrollTrigger,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";

/**
 * Drop-in Topbar with:
 * - Logo (clickable to route home)
 * - React Router nav links with active state
 * - Smooth hover underline + subtle lift animation
 * - Glass/blur on scroll
 */

// ---------- Defaults ----------
const DEFAULT_LINKS = [
  { label: "Home", to: "/" },
  { label: "Give", to: "/give" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
  { label: "Cart", to: "/cart" },
];

// ---------- Styled ----------
const NavLink = styled(MuiLink)(({ theme }) => ({
  position: "relative",
  color: "#fff",
  textDecoration: "none",
  marginLeft: theme.spacing(3),
  fontWeight: 500,
  display: "inline-block",
  outline: "none",
  transition: theme.transitions.create(["transform", "color"], { duration: 200 }),
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: -4,
    height: 2,
    width: "100%",
    transform: "scaleX(0)",
    transformOrigin: "left",
    background: alpha("#fff", 0.9),
    transition: "transform 240ms ease",
  },
  "&:hover": {
    transform: "translateY(-1px)",
  },
  "&:hover::after": {
    transform: "scaleX(1)",
  },
  "&:focus-visible": {
    boxShadow: `0 0 0 3px ${alpha("#fff", 0.28)}`,
    borderRadius: 6,
  },
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
    background: alpha("#fff", 0.9),
  },
}));

const LogoLink = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1.2),
  textDecoration: "none",
  color: "#fff",
  transition: theme.transitions.create(["transform", "filter"], { duration: 220 }),
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-1px)",
    filter: "brightness(1.05)",
  },
  "&:focus-visible": {
    boxShadow: `0 0 0 3px ${alpha("#fff", 0.28)}`,
    borderRadius: 10,
    outline: "none",
  },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    "&:hover": { transform: "none", filter: "none" },
  },
}));

// ---------- Component ----------
export default function TopbarHero({
  links = DEFAULT_LINKS,
  position = "fixed",
  threshold = 24,
  glassOpacity = 0.38,
  blurPx = 10,
  sx,
  // Logo props
  logoSrc = "/logo-2.png",
  logoAlt = "Company Logo",
  homeTo = "/",
  showWordmark = false, // set true to display brand text next to logo
  wordmark = "",
}) {
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold });
  const location = useLocation();

  const isActive = (link) => {
    if (!location) return !!link.current;
    if (!link?.to) return !!link.current;
    // Exact match; switch to startsWith for section highlighting:
    return location.pathname === link.to;
  };

  return (
    <AppBar
      position={position}
      sx={{
        transition: (theme) =>
          theme.transitions.create(
            ["background-color", "backdrop-filter", "box-shadow", "border-color"],
            { duration: 300 }
          ),
        backgroundColor: scrolled ? alpha("#0b0b0b", glassOpacity) : "transparent",
        color: "#fff",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
        backdropFilter: scrolled ? `saturate(160%) blur(${blurPx}px)` : "none",
        WebkitBackdropFilter: scrolled ? `saturate(160%) blur(${blurPx}px)` : "none",
        borderBottom: scrolled ? `1px solid ${alpha("#fff", 0.12)}` : "1px solid transparent",
        zIndex: (theme) => theme.zIndex.appBar,
        p: 1,
        ...sx,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left: Logo → routes home */}
        <LogoLink
          component={RouterLink}
          to={homeTo}
          aria-label="Go to home"
          title="Home"
        >
          <Box
            component="img"
            src={logoSrc}
            alt={logoAlt}
            sx={{ height: 50, width: "auto", display: "block" }}
          />
          {showWordmark && (
            <Typography variant="h6" sx={{ fontWeight: 700, display: { xs: "none", md: "inline" } }}>
              {wordmark}
            </Typography>
          )}
        </LogoLink>

        {/* Right: Nav links */}
        <Box component="nav" aria-label="Primary" sx={{ display: "flex", alignItems: "center" }}>
          {links.map((link) => {
            const active = isActive(link);

            // Prefer React Router when a 'to' is present; fallback to href
            if (link.to) {
              return (
                <NavLink
                  key={link.label}
                  component={RouterLink}
                  to={link.to}
                  underline="none"
                  aria-current={active ? "page" : undefined}
                  sx={{ fontWeight: active ? 700 : 500 }}
                >
                  {active ? <ActiveStyles>{link.label}</ActiveStyles> : link.label}
                </NavLink>
              );
            }
            return (
              <NavLink
                key={link.label}
                href={link.href || "#"}
                underline="none"
                sx={{ fontWeight: active ? 700 : 500 }}
              >
                {active ? <ActiveStyles>{link.label}</ActiveStyles> : link.label}
              </NavLink>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
