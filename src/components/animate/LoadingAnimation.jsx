// src/components/LogoIntro.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";

const LogoIntro = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000); // Extended to 3s for better experience
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #339c5e 0%, #2d8a54 60%, #1f6f43 100%)",
            zIndex: 2000,
          }}
        >
          {/* Subtle floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, -20, 20, -10],
                opacity: [0, 0.6, 0.3, 0],
              }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Main logo container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.95,
              filter: "blur(4px)"
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth feel
            }}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px"
            }}
          >
            {/* Subtle glow effect behind logo */}
            <motion.div
              style={{
                position: "absolute",
                inset: "-20px",
                background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(20px)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Logo image */}
            <motion.img
              src="/logo.png"
              alt="Foundation Logo"
              style={{ 
                maxWidth: "280px", 
                width: "70%", 
                height: "auto",
                filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.2))",
                position: "relative",
                zIndex: 1,
              }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Subtle loading indicator */}
            <motion.div
              style={{
                width: "60px",
                height: "2px",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: "1px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "20px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "1px",
                }}
                animate={{
                  x: ["-20px", "60px"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Fade overlay for smooth exit */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "black",
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </Box>
      )}
    </AnimatePresence>
  );
};

export default LogoIntro;