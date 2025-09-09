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

/**
 * Drop-in Topbar with:
 * - Logo (clickable to route home)
 * - React Router nav links with active state
 * - Smooth hover underline + subtle lift animation
 * - Glass/blur on scroll
 * - Instagram icon at far right (opens IG in new tab)
 * - Animated font color (black on subpages until scroll, white otherwise)
 */

// ---------- Defaults ----------
const DEFAULT_LINKS = [
  { label: "Home", to: "/" },
  { label: "Give", to: "/give" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

// ---------- Styled ----------
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

// ---------- Component ----------
export default function TopbarHero({
  links = DEFAULT_LINKS,
  position = "fixed",
  threshold = 24,
  blurPx = 10,
  sx,
  // Logo props
  logoSrc = "/logo-2.png",
  logoAlt = "Company Logo",
  homeTo = "/",
  showWordmark = false,
  wordmark = "",
  // Socials
  instagramUrl = "https://www.instagram.com/seanclark21foundation/",
  showInstagram = true,
}) {
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold });
  const location = useLocation();

  const isHome = location?.pathname === (homeTo || "/");
  // Subpages: black before scroll, white after. Home: always white.
  const textColor = !isHome && !scrolled ? "#000" : "#fff";

  const isActive = (link) => {
    if (!location) return !!link.current;
    if (!link?.to) return !!link.current;
    return location.pathname === link.to;
  };

  return (
    <AppBar
      position={position}
      sx={{
        transition: (theme) =>
          theme.transitions.create(
            [
              "background-color",
              "backdrop-filter",
              "box-shadow",
              "border-color",
              "color",
            ],
            { duration: 400, easing: theme.transitions.easing.easeInOut }
          ),
        background: scrolled ? "#000" : "transparent",
        color: textColor,
        boxShadow: scrolled ? "0 8px 28px rgba(0,0,0,0.25)" : "none",
        backdropFilter: scrolled ? `saturate(180%) blur(${blurPx}px)` : "none",
        WebkitBackdropFilter: scrolled ? `saturate(180%) blur(${blurPx}px)` : "none",
        borderBottom: `1px solid ${alpha(textColor, scrolled ? 0.18 : 0)}`,
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
          sx={{
            "&:focus-visible": {
              outline: "none",
              boxShadow: `0 0 0 3px ${alpha(textColor, 0.28)}`,
              borderRadius: 10,
            },
          }}
        >
          <Box
            component="img"
            src={logoSrc}
            alt={logoAlt}
            sx={{ height: 50, width: "auto", display: "block" }}
          />
          {showWordmark && (
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, display: { xs: "none", md: "inline" } }}
            >
              {wordmark}
            </Typography>
          )}
        </LogoLink>

        {/* Right: Nav links + Instagram */}
        <Box component="nav" aria-label="Primary" sx={{ display: "flex", alignItems: "center" }}>
          {links.map((link) => {
            const active = isActive(link);
            const commonFocus = {
              "&:focus-visible": {
                outline: "none",
                boxShadow: `0 0 0 3px ${alpha(textColor, 0.28)}`,
                borderRadius: 6,
              },
            };
            if (link.to) {
              return (
                <NavLink
                  key={link.label}
                  component={RouterLink}
                  to={link.to}
                  underline="none"
                  aria-current={active ? "page" : undefined}
                  sx={{ fontWeight: active ? 700 : 500, ...commonFocus }}
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
                sx={{ fontWeight: active ? 700 : 500, ...commonFocus }}
              >
                {active ? <ActiveStyles>{link.label}</ActiveStyles> : link.label}
              </NavLink>
            );
          })}

          {showInstagram && (
            <Tooltip title="Instagram" arrow>
              <SocialIcon
                component="a"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Instagram"
                size="large"
                sx={{
                  "&:focus-visible": {
                    outline: "none",
                    boxShadow: `0 0 0 3px ${alpha(textColor, 0.28)}`,
                  },
                }}
              >
                <InstagramIcon />
              </SocialIcon>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
