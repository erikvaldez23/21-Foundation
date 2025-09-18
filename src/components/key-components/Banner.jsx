// src/components/banners/SC21ImageBanner.jsx
import React from "react";
import { Box } from "@mui/material";

/**
 * A simple responsive banner image with rounded corners
 *
 * Props:
 *   imageSrc?: string   // path to your banner image
 */
const SC21ImageBanner = ({ imageSrc = "/banner.JPG" }) => {
  return (
    <Box maxWidth='xl'
      component="img"
      src={imageSrc}
      alt="Sean Clark 21 Foundation Banner"
      sx={{
        width: "100%",
        display: "block",
        mx: "auto",
        boxShadow: "0 12px 32px rgba(0,0,0,0.25)", // subtle shadow
      }}
    />
  );
};

export default SC21ImageBanner;