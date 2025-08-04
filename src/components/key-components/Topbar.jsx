import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Fade,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import logo from "/vite.svg";
import { motion } from "framer-motion";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Your nav items
const navItems = [
  { label: "Home", path: "/#/", mobileOnly: true },
  { label: "Ark Vision", path: "/#/ark-vision" },
  { label: "Ark OS", path: "/#/portfolio" },
  { label: "Ark Crypto", path: "/#/ark-crypto" },
  { label: "Our Story", path: "/#/about" },
  { label: "Get In Touch", path: "/#/contact" },
];

// The "pill" wrapper with enhanced styling
const NavWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: "50%",
  transform: "translateX(-50%)",
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(4),
  padding: theme.spacing(0.5, 4),
  backdropFilter: "blur(12px)",
  borderRadius: theme.shape.borderRadius * 6,
  boxShadow: "0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(201,180,154,0.15)",
  zIndex: theme.zIndex.appBar + 1,
  border: "1px solid rgba(201,180,154,0.2)",
  transition: "all 0.3s ease-in-out",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-1px",
    left: "-1px",
    right: "-1px",
    bottom: "-1px",
    borderRadius: "inherit",
    opacity: 0.3,
    pointerEvents: "none",
    zIndex: -1,
  },
}));

// NavItem with hover effects
const NavItem = styled(motion.div)(({ theme }) => ({
  position: "relative",
  color: "#fff",
  fontWeight: 500,
  fontSize: "5rem",
  cursor: "pointer",
  textTransform: "none",
  padding: "6px 12px",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: 0,
    height: "2px",
    background:
      "linear-gradient(90deg, rgba(76,187,23,0) 0%, rgba(76,187,23,1) 50%, rgba(76,187,23,0) 100%)",
    transition: "all 0.3s ease-in-out",
    transform: "translateX(-50%)",
  },
  "&:hover": {
    color: "#4CBB17",
    "&::after": {
      width: "80%",
    },
  },
}));

// Modern mobile menu button
const MenuButton = styled(IconButton)(({ theme }) => ({
  color: "#c9b49a",
  // background: 'rgba(0, 0, 0, 0.7)',
  // backdropFilter: 'blur(15px)',
  // border: '1px solid rgba(201,180,154,0.3)',
  // boxShadow: '0 8px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
  // borderRadius: '12px',
  // width: 48,
  // height: 48,
  "&:hover": {
    background: "rgba(201,180,154,0.1)",
    transform: "scale(1.05)",
    boxShadow: "0 12px 35px rgba(201,180,154,0.2)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
  transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
}));

const AnimatedLogo = ({ handleClick }) => {
  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: { xs: "40px", md: "50px" },
        width: "auto",
      }}
    >
      {/* Glowing background */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,180,154,0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* The actual logo */}
      <Box
        component="img"
        src={logo}
        alt="Green Ark"
        sx={{
          height: "100%",
          width: "auto",
          maxHeight: "100%",
          objectFit: "contain",
          cursor: "pointer",
          position: "relative",
          zIndex: 2,
          filter: "drop-shadow(0 0 5px rgba(201,180,154,0.3))",
        }}
      />
    </Box>
  );
};

export default function Topbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Enhanced scroll effect
  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle navigation
  const handleNavigation = (item) => {
    if (item.isAnchor) {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = item.path;
    }

    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  // Modern mobile drawer content
  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        background:
          "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0a0a0a 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        // Add subtle texture
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 20%, rgba(201,180,154,0.03) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      {/* Enhanced header with close button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          borderBottom: "1px solid rgba(201,180,154,0.1)",
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#c9b49a",
            fontWeight: 600,
            letterSpacing: "1px",
            fontSize: "1.1rem",
          }}
        >
          MENU
        </Typography>

        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: "#c9b49a",
            background: "rgba(201,180,154,0.1)",
            border: "1px solid rgba(201,180,154,0.2)",
            "&:hover": {
              background: "rgba(201,180,154,0.2)",
              transform: "rotate(90deg)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Logo section */}
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <AnimatedLogo handleClick={handleLogoClick} />
      </Box>

      {/* Modern menu items with micro-interactions */}
      <List sx={{ flex: 1, px: 2, py: 3 }}>
        {navItems
          .filter((item) => (isMobile ? true : !item.mobileOnly))
          .map((item, index) => (
            <ListItem
              key={item.label}
              onClick={() => handleNavigation(item)}
              sx={{
                mb: 1,
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  background:
                    "linear-gradient(180deg, #c9b49a, rgba(201,180,154,0.3))",
                  transform: "scaleY(0)",
                  transformOrigin: "bottom",
                  transition: "transform 0.3s ease",
                },
                "&:hover": {
                  background:
                    "linear-gradient(135deg, rgba(201,180,154,0.08) 0%, rgba(201,180,154,0.03) 100%)",
                  transform: "translateX(8px)",
                  "&::before": {
                    transform: "scaleY(1)",
                  },
                  "& .arrow-indicator": {
                    opacity: 1,
                  },
                },
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                // Staggered animation delay
                animation: `slideInLeft 0.6s ease forwards ${index * 0.1}s`,
                opacity: 0,
                transform: "translateX(-30px)",
                "@keyframes slideInLeft": {
                  to: {
                    opacity: 1,
                    transform: "translateX(0)",
                  },
                },
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  ".MuiTypography-root": {
                    color: "#ffffff",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    fontSize: "1.1rem",
                    transition: "color 0.3s ease",
                  },
                }}
              />

              {/* Arrow indicator */}
              <Box
                className="arrow-indicator"
                sx={{
                  width: 6,
                  height: 6,
                  borderTop: "2px solid #c9b49a",
                  borderRight: "2px solid #c9b49a",
                  transform: "rotate(45deg)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            </ListItem>
          ))}
      </List>

      {/* Modern footer with animated divider */}
      <Box
        sx={{
          p: 3,
          borderTop: "1px solid rgba(201,180,154,0.1)",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Animated divider */}
        <Box
          component={motion.div}
          animate={{
            width: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #c9b49a, transparent)",
            mb: 2,
            borderRadius: 1,
          }}
        />

        <Typography
          variant="caption"
          sx={{
            color: "rgba(201,180,154,0.7)",
            textAlign: "center",
            display: "block",
            letterSpacing: "1px",
            fontSize: "0.75rem",
          }}
        >
          © 2024 GREEN ARK
        </Typography>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "transparent",
        boxShadow: "none",
        padding: 0,
        transition: "all 0.4s ease",
      }}
    >
      <Toolbar sx={{ position: "relative" }}>
        {/* Desktop navigation */}
        {!isMobile ? (
          <Fade in={true} timeout={1000}>
            <NavWrapper>
              {/* Animated Logo */}
              <AnimatedLogo handleClick={handleLogoClick} />

              {/* Links with hover effects */}
              {navItems
                .filter((item) => (isMobile ? true : !item.mobileOnly))
                .map((item, index) => (
                  <NavItem
                    key={item.label}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    onClick={() => handleNavigation(item)}
                  >
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        fontSize: "1rem",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </NavItem>
                ))}
            </NavWrapper>
          </Fade>
        ) : (
          // Mobile view with enhanced menu button
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              pt: 1,
            }}
          >
            <MenuButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ fontSize: 50 }} />
            </MenuButton>
          </Box>
        )}

        {/* Enhanced mobile drawer with glass morphism */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 320,
              borderRight: "none",
              // Add glass morphism effect
              background: "rgba(0, 0, 0, 0.95)",
              backdropFilter: "blur(20px)",
              borderLeft: "1px solid rgba(201,180,154,0.1)",
            },
            "& .MuiBackdrop-root": {
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(4px)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
