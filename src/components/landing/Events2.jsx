// src/components/EdutainmentCoursesMUI.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

/* ===================== Design Tokens ===================== */
const ACCENT = "#339c5e";

/* ===================== Styled ===================== */
const Section = styled(Box)(({ theme }) => ({
  backgroundColor: "#E8E5DD",
  // tighter vertical rhythm on phones, unchanged at md+
  paddingTop: `max(${theme.spacing(5)}, env(safe-area-inset-top))`,
  paddingBottom: `max(${theme.spacing(2)}, env(safe-area-inset-bottom))`,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.spacing(6.5),
    paddingBottom: theme.spacing(6.5),
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(7.5),
    paddingBottom: theme.spacing(7.5),
  },
}));

const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(5), // a bit tighter on mobile by default
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    marginBottom: theme.spacing(6),
    gap: theme.spacing(3),
  },
  [theme.breakpoints.up("md")]: {
    // desktop/tablet matches original
    marginBottom: theme.spacing(6.25),
    gap: 0,
    flexDirection: "row",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  overflowX: "auto",
  overflowY: "hidden",
  marginBottom: 40,
  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(0,0,0,0.2) transparent",
  paddingBottom: 16, // Move scrollbar down away from content
  "&::-webkit-scrollbar": {
    height: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 4,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.3)",
    },
  },
  [theme.breakpoints.down("md")]: {
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

const CarouselTrack = styled(Box)({
  display: "flex",
  gap: 30,
  "& > *": { scrollSnapAlign: "start" },
});

/* ----- Image area (rounded + clipping) ----- */
const RADIUS = 16;
/* Extra space to push content above the bottom CTAs */
const CTA_SPACE = 96;

const ImageShell = styled(Box)(({ theme }) => ({
  height: 400, // smaller default for phones
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start", // Left align
  justifyContent: "flex-end", // Bottom align
  color: "white",
  textAlign: "left", // Left align text
  padding: `24px`, // Standard padding
  borderRadius: RADIUS,
  overflow: "hidden",
  [theme.breakpoints.up("sm")]: {
    height: 400,
    padding: `32px`,
  },
  [theme.breakpoints.up("md")]: {
    height: 500,
    padding: `40px`,
  },
}));

const ImageBg = styled(Box)({
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: 1,
  borderRadius: RADIUS,
});

const ImageBgImg = styled("img")({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  zIndex: 1,
  borderRadius: RADIUS,
  display: "block",
});

const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)", // Darker bottom gradient
  zIndex: 2,
  borderRadius: RADIUS,
  pointerEvents: "none",
});

const BottomFade = styled(Box)({
  // Redundant with better Overlay gradient, but keeping for safety or removing if desired.
  // Let's remove content here as Overlay covers it, or make it subtle
  display: "none"
});

const ImageContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 3,
  width: "100%", // Full width
  paddingBottom: "60px", // Space for CTA
  [theme.breakpoints.up("sm")]: {
    width: "min(92%, 720px)",
    marginInline: "auto",
    paddingBottom: 0,
  },
}));

/* ----- Text styles ----- */
const HeaderTag = styled(Typography)({ display: 'none' });

const CourseH3 = styled(Typography)(({ theme }) => ({
  fontFamily: "'Playfair Display', serif",
  lineHeight: 1.1,
  marginBottom: 0,
  color: "#fff",
  fontSize: 36, // Mobile size
  flex: 1, // Allow text to take available space
  marginRight: 16, // Space between text and button
  [theme.breakpoints.up("sm")]: { fontSize: 32 },
  [theme.breakpoints.up("md")]: { fontSize: 40 },
}));

const CourseH4 = styled(Typography)({ display: 'none' });
const CourseSub = styled(Typography)({ display: 'none' });

const NavBtn = styled(IconButton)(({ theme }) => ({
  width: 30,
  height: 40,
  borderRadius: "50%",
  border: "2px solid #ddd",
  backgroundColor: "#fff",
  color: "#666",
  "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
  // on tiny phones, keep them tappable but not overpowering
  [theme.breakpoints.down("sm")]: {
    width: 36,
    height: 36,
  },
}));

/* ----- Transparent CTAs pinned to image bottom ----- */
const ImageCtaBar = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 24,
  right: 24,
  bottom: 24,
  zIndex: 4,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end", // Align to bottom
  gap: 12,
  [theme.breakpoints.up("sm")]: {
    left: 24,
    right: 24,
    bottom: 30, // consistent spacing
  },
  [theme.breakpoints.up("md")]: {
    left: 32,
    right: 32,
    bottom: 32,
  },
}));

const GhostBtn = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: 13, // mobile size
  padding: "10px 20px",
  borderRadius: 999,
  color: "#1a1a1a",
  background: "#fff", // Solid white for pop
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  transition:
    "background .2s ease, border-color .2s ease, box-shadow .2s ease, transform .15s ease",
  "&:hover": {
    background: "#f0f0f0",
    transform: "translateY(-1px)",
  },
  "&:active": { transform: "translateY(0)" },
  [theme.breakpoints.up("sm")]: {
    fontSize: 14,
    padding: "12px 24px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 14,
    padding: "12px 24px",
  },
}));

/* ===================== Data ===================== */
const courses = [
  {
    key: "walkout",
    headerTag: "Mental Health Awareness",
    h3: "Mental Health Walkout",
    h4: "Community Event",
    sub: "Join Us for a Walkout to Raise Awareness",
    title: "Walkout for Mental Health Awareness",
    body:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet cumque consectetur recusandae nesciunt distinctio illum, similique, delectus libero nisi doloremque fuga ducimus, magnam aut deserunt fugit rerum? Commodi, odit delectus!",
    image: "/image1.JPG",
    href: "/events/walkout",
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSc1vprOU16Iufa50z8ZFiuAo2J8QKp-6xgbZVekXy-ez-u36w/viewform",
    bgStyle: {
      background:
        "linear-gradient(135deg, rgba(255,99,71,0.8), rgba(255,69,0,0.8))",
    },
  },
  {
    key: "workshop2",
    headerTag: "Empowering the Mind",
    h3: "Event 2",
    h4: "Event Type",
    sub: "Event Title",
    title: "Event 2 Header",
    body:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet cumque consectetur recusandae nesciunt distinctio illum, similique, delectus libero nisi doloremque fuga ducimus, magnam aut deserunt fugit rerum? Commodi, odit delectus!",
    image: "/image2.JPG",
    href: "/events/workshop2",
    formUrl: "https://forms.gle/EXAMPLE_WORKSHOP2",
    bgStyle: {
      background:
        "linear-gradient(135deg, rgba(144,238,144,0.9), rgba(60,179,113,0.9))",
    },
  },
  {
    key: "workshop3",
    headerTag: "Empowering the Mind",
    h3: "Event 3",
    h4: "Event Type",
    sub: "Event Title",
    title: "Event 3 Header",
    body:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet cumque consectetur recusandae nesciunt distinctio illum, similique, delectus libero nisi doloremque fuga ducimus, magnam aut deserunt fugit rerum? Commodi, odit delectus!",
    image: "/image3.JPG",
    href: "/events/workshop3",
    formUrl: "https://forms.gle/EXAMPLE_WORKSHOP3",
    bgStyle: {
      background:
        "linear-gradient(135deg, rgba(144,238,144,0.9), rgba(60,179,113,0.9))",
    },
  },
  {
    key: "workshop4",
    headerTag: "Empowering the Mind",
    h3: "Event 4",
    h4: "Event Type",
    sub: "Event Title",
    title: "Event 4 Header",
    body:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet cumque consectetur recusandae nesciunt distinctio illum, similique, delectus libero nisi doloremque fuga ducimus, magnam aut deserunt fugit rerum? Commodi, odit delectus!",
    image: "/image4.JPG",
    href: "/events/workshop4",
    formUrl: "https://forms.gle/EXAMPLE_WORKSHOP4",
    bgStyle: {
      background:
        "linear-gradient(135deg, rgba(144,238,144,0.9), rgba(60,179,113,0.9))",
    },
  },
];

/* ===================== Helpers ===================== */
const isExternal = (url = "") => /^https?:\/\//i.test(url);

/* ===================== Component ===================== */
export default function EdutainmentCoursesMUI() {
  const [containerW, setContainerW] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const GAP = 30;
  const PEEK = isMobile ? 24 : 80;

  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerW(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const cardW = useMemo(() => {
    if (!containerW) return 0;
    if (isMobile) return Math.max(0, containerW - 2 * PEEK);
    return Math.max(0, (containerW - 2 * PEEK - GAP) / 2);
  }, [containerW, isMobile, PEEK]);

  const updateEdges = () => {
    const el = containerRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 1;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setAtStart(start);
    setAtEnd(end);
  };

  useEffect(() => {
    updateEdges();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    return () => el.removeEventListener("scroll", updateEdges);
  }, [containerW]);

  const onWheel = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const verticalDominant = Math.abs(e.deltaY) > Math.abs(e.deltaX);
    if (verticalDominant) {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  const scrollByAmount = cardW + GAP;
  const nextSlide = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };
  const previousSlide = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  /* ===================== Logic ===================== */
  // Duplicate courses for "repeating" effect on mobile
  // We use 5 sets to allow significant scrolling in both directions
  const displayCourses = useMemo(() => {
    if (!isMobile) return courses;
    return [...courses, ...courses, ...courses, ...courses, ...courses].map((c, i) => ({
      ...c,
      uniqueKey: `${c.key}-${i}`, // ensure unique keys
    }));
  }, [isMobile]);

  // Scroll to middle set on mount (mobile only)
  useEffect(() => {
    if (isMobile && containerRef.current && cardW > 0) {
      // Approximate middle: 2 sets in. 
      // Total 5 sets. Start at index = courses.length * 2
      const setLength = courses.length;
      const startIdx = setLength * 2;
      const spacing = cardW + GAP;
      // Calculate position: PEEK + (index * spacing) ? 
      // Actually standard scrollLeft logic
      // We want the startIdx item to be centered.
      // With snap-align:center and padding, simpler to just scroll to approximate location
      // But accurate position is needed for snap to settle nicely
      const scrollPos = startIdx * spacing;
      containerRef.current.scrollLeft = scrollPos;
    }
  }, [isMobile, cardW]); // Run when mobile or card width stabilizes

  return (
    <Section role="region" aria-label="Get involved carousel">
      <Container maxWidth="xl">
        <HeaderRow>
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "serif",
                fontWeight: 400,
                fontSize: { xs: "12vw", md: "4rem" },
                lineHeight: 1.2,
                color: "#1a1a1a",
                mb: 2
              }}
            >
              Get Involved Today
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: "800px",
                fontSize: "1.2rem",
                lineHeight: 1.6,
                mb: 3
              }}
            >
              Fill out the form to join us!
            </Typography>

            {/* Arrow controls under the header (left-aligned) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-start",
                gap: 1,
                mt: { xs: 0.5, sm: 1 },
              }}
            >
              <NavBtn onClick={previousSlide} aria-label="previous" disabled={atStart && !isMobile}>
                <ChevronLeft size={16} />
              </NavBtn>
              <NavBtn onClick={nextSlide} aria-label="next" disabled={atEnd && !isMobile}>
                <ChevronRight size={16} />
              </NavBtn>
            </Box>
          </Box>
        </HeaderRow>
      </Container>

      {/* Limit carousel width to xl as well */}
      <Container maxWidth="xl" disableGutters={isMobile}>
        <CarouselContainer
          ref={containerRef}
          onWheel={onWheel}
          sx={{
            overscrollBehaviorX: "contain",
            // Visual centering on mobile: add padding equal to peek
            paddingInline: isMobile ? `${PEEK}px` : 0
          }}
        >
          <CarouselTrack sx={{
            // Ensure centering
            "& > *": { scrollSnapAlign: isMobile ? "center" : "start" }
          }}>
            {displayCourses.map((course) => {
              const signUpHref = course.formUrl || course.href || "#";
              const uniqueKey = course.uniqueKey || course.key;

              return (
                <Box key={uniqueKey} sx={{ flex: `0 0 ${Math.max(cardW, 0)}px`, display: "flex", flexDirection: "column" }}>
                  <ImageShell>
                    {course.image ? (
                      <ImageBgImg
                        src={course.image}
                        alt={course.title}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <ImageBg sx={course.bgStyle} />
                    )}
                    <Overlay />
                    <BottomFade />

                    {/* Single Row: Title + Button */}
                    <ImageCtaBar>
                      <CourseH3>
                        {course.h3 || course.title}
                      </CourseH3>
                      <GhostBtn
                        component="a"
                        href={signUpHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Sign up for ${course.title}`}
                      >
                        Sign Up Now
                      </GhostBtn>
                    </ImageCtaBar>
                  </ImageShell>

                  {/* Content (unchanged at md+) */}
                  {/* <Box sx={{ p: { xs: 3, sm: 3.5, md: 3.75 }, display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
                    <Typography
                      component="h3"
                      sx={{
                        fontSize: { xs: 20, sm: 22, md: 24 }, // md=24 original
                        fontWeight: 600,
                        color: "#333",
                        mb: { xs: 1.25, sm: 1.5, md: 2 },
                        lineHeight: 1.3,
                      }}
                    >
                      {course.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: 14, sm: 15, md: 15 }, // md unchanged
                        lineHeight: 1.6,
                        color: "#666",
                      }}
                    >
                      {course.body}
                    </Typography>
                  </Box> */}
                </Box>
              );
            })}
          </CarouselTrack>
        </CarouselContainer>
      </Container>
    </Section >
  );
}
