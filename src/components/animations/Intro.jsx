import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "../hero/ComingSoon";
import { Box, Typography } from "@mui/material";

const QuoteIntroAnimation = () => {
  const [showQuote, setShowQuote] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('enter');

  useEffect(() => {
    // Start exit animation after 3 seconds
    const exitTimer = setTimeout(() => {
      setAnimationPhase('exit');
    }, 3000);

    // Hide quote completely after exit animation
    const hideTimer = setTimeout(() => {
      setShowQuote(false);
    }, 4500); // 3s display + 1.5s exit animation

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Enhanced animation variants
  const quoteVariants = {
    enter: {
      opacity: 0,
      scale: 0.5,
      rotateX: -90,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1.2,
      }
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      rotateY: 180,
      y: -100,
      filter: "blur(10px)",
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1], // Custom cubic bezier for smooth exit
      }
    }
  };

  // Background animation variants
  const backgroundVariants = {
    enter: {
      background: "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #0a0a0a 100%)",
    },
    visible: {
      background: [
        "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #1a1a2e 100%)",
        "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #16213e 100%)",
        "radial-gradient(circle at 50% 50%, #16213e 0%, #0a0a0a 100%)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    },
    exit: {
      background: "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #0a0a0a 100%)",
      transition: { duration: 1.5 }
    }
  };

  // Text glow effect variants
  const textVariants = {
    enter: {
      textShadow: "0 0 0px rgba(255, 255, 255, 0)",
    },
    visible: {
      textShadow: [
        "0 0 10px rgba(255, 255, 255, 0.5)",
        "0 0 20px rgba(255, 255, 255, 0.8)",
        "0 0 30px rgba(255, 255, 255, 0.6)",
        "0 0 10px rgba(255, 255, 255, 0.5)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    },
    exit: {
      textShadow: "0 0 50px rgba(255, 255, 255, 0)",
      transition: { duration: 1.5 }
    }
  };

  return (
    <motion.div
      variants={backgroundVariants}
      initial="enter"
      animate={showQuote ? "visible" : "exit"}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <AnimatePresence mode="wait">
        {showQuote ? (
          <motion.div
            key="quote"
            variants={quoteVariants}
            initial="enter"
            animate={animationPhase === 'enter' ? 'visible' : 'exit'}
            exit="exit"
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white",
              padding: "0 2rem",
              position: "relative",
            }}
          >
            {/* Animated background particles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
                  radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px),
                  radial-gradient(circle at 60% 40%, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "100px 100px, 150px 150px, 200px 200px",
                animation: "float 6s ease-in-out infinite",
              }}
            />
            
            <motion.div
              variants={textVariants}
              initial="enter"
              animate={animationPhase === 'enter' ? 'visible' : 'exit'}
              style={{ position: "relative", zIndex: 1 }}
            >
              <Typography 
                variant="h2" 
                fontWeight="bold"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  letterSpacing: '0.1em',
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  background: 'linear-gradient(45deg, #ffffff, #e0e0e0)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                "Live Like Sean"
              </Typography>
              
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ 
                  width: animationPhase === 'enter' ? '100%' : 0, 
                  opacity: animationPhase === 'enter' ? 1 : 0 
                }}
                transition={{ 
                  delay: animationPhase === 'enter' ? 1.2 : 0,
                  duration: 0.8,
                  ease: "easeOut" 
                }}
                style={{
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, white, transparent)',
                  margin: '1rem auto 0',
                  borderRadius: '1px',
                }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
          >
            <Home />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default QuoteIntroAnimation;