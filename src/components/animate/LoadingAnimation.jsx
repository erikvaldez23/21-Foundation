// src/components/LogoIntro.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";

const LogoIntro = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500); // Hide after 2.5s
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
            bgcolor: "#000", // black background
            zIndex: 2000,
          }}
        >
          <motion.img
            src="/logo.png"
            alt="Foundation Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1 }}
            style={{ maxWidth: "300px", width: "80%", height: "auto" }}
          />
        </Box>
      )}
    </AnimatePresence>
  );
};

export default LogoIntro;
