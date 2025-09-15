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
  paddingTop: theme.spacing(7.5),
  paddingBottom: theme.spacing(7.5),
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}));

const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(6.25),
  [theme.breakpoints.down("md")]: { flexDirection: "column", gap: theme.spacing(3.75) },
}));

const CarouselContainer = styled(Box)({
  position: "relative",
  overflowX: "auto",
  overflowY: "hidden",
  marginBottom: 40,
  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
});

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
  height: 300,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
  /* add extra bottom padding to create space above the buttons */
  padding: `40px 20px ${CTA_SPACE}px`,
  borderRadius: RADIUS,
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    padding: `32px 16px ${CTA_SPACE + 8}px`,
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

/* Base overlay for general contrast */
const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  background: "linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3))",
  zIndex: 2,
  borderRadius: RADIUS,
  pointerEvents: "none",
});

/* Extra bottom fade to help CTA readability */
const BottomFade = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: 110,
  borderBottomLeftRadius: RADIUS,
  borderBottomRightRadius: RADIUS,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.55) 100%)",
  zIndex: 2,
  pointerEvents: "none",
});

const ImageContent = styled(Box)({
  position: "relative",
  zIndex: 3,
});

/* ----- Text styles ----- */
const HeaderTag = styled(Typography)({
  fontSize: 12,
  fontWeight: 300,
  letterSpacing: 2,
  marginBottom: 20,
  textTransform: "uppercase",
});

const CourseH3 = styled(Typography)({
  fontSize: 42,
  fontWeight: 300,
  lineHeight: 1.1,
  marginBottom: 8,
});

const CourseH4 = styled(Typography)({
  fontSize: 42,
  fontWeight: 300,
  marginBottom: 20,
  lineHeight: 1.1,
});

const CourseSub = styled(Typography)({
  fontSize: 14,
  fontWeight: 300,
});

const NavBtn = styled(IconButton)({
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "2px solid #ddd",
  backgroundColor: "#fff",
  color: "#666",
  "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
});

/* ----- Transparent CTAs pinned to image bottom ----- */
const ImageCtaBar = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 16,
  right: 16,
  bottom: 24, // a bit more breathing room from the bottom edge
  zIndex: 4,
  display: "flex",
  justifyContent: "center",
  gap: 12,
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    left: 12,
    right: 12,
    bottom: 20,
    gap: 10,
  },
}));

const GhostBtn = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 700,
  fontSize: 14,
  /* taller buttons for more vertical padding inside the button */
  padding: "14px 18px",
  borderRadius: 999,
  color: "#fff",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
  transition:
    "background .2s ease, border-color .2s ease, box-shadow .2s ease, transform .15s ease",
  "&:hover": {
    background: "rgba(255,255,255,0.12)",
    borderColor: "rgba(255,255,255,0.9)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.24)",
    transform: "translateY(-1px)",
  },
  "&:active": { transform: "translateY(0)" },
  "&:focus-visible": {
    outline: "2px solid rgba(255,255,255,0.9)",
    outlineOffset: 2,
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
  const PEEK = isMobile ? 48 : 80;

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

  return (
    <Section>
      <Container maxWidth="xl">
        <HeaderRow>
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 36, sm: 48 },
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#333",
                mb: 1,
                letterSpacing: "-0.5px",
              }}
            >
              Get Involved Today
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 22, sm: 28 },
                fontWeight: 400,
                color: "#333",
                mb: 2,
                letterSpacing: "-0.3px",
              }}
            >
              Fill out the form to join us!
            </Typography>

            {/* Arrow controls under the header (left-aligned here) */}
            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1, mt: 1 }}>
              <NavBtn onClick={previousSlide} aria-label="previous" disabled={atStart}>
                <ChevronLeft size={16} />
              </NavBtn>
              <NavBtn onClick={nextSlide} aria-label="next" disabled={atEnd}>
                <ChevronRight size={16} />
              </NavBtn>
            </Box>
          </Box>
        </HeaderRow>
      </Container>

      {/* Limit carousel width to xl as well */}
      <Container maxWidth="xl">
        <CarouselContainer
          ref={containerRef}
          onWheel={onWheel}
          sx={{ overscrollBehaviorX: "contain" }}
        >
          <CarouselTrack>
            {courses.map((course) => {
              const signUpHref = course.formUrl || course.href || "#";
              const learnMoreHref = course.href || course.formUrl || "#";

              return (
                <Box key={course.key} sx={{ flex: `0 0 ${Math.max(cardW, 0)}px` }}>
                  <ImageShell>
                    {course.image ? (
                      <ImageBgImg src={course.image} alt={course.title} loading="lazy" />
                    ) : (
                      <ImageBg sx={course.bgStyle} />
                    )}
                    <Overlay />
                    <BottomFade />

                    <ImageContent>
                      {course.h3 ? (
                        <>
                          <HeaderTag>{course.headerTag}</HeaderTag>
                          <CourseH3>{course.h3}</CourseH3>
                          <CourseH4>{course.h4}</CourseH4>
                          <CourseSub>{course.sub}</CourseSub>
                        </>
                      ) : (
                        <>
                          <HeaderTag>{course.headerTag}</HeaderTag>
                          <CourseSub sx={{ mb: 2 }}>{course.subTop}</CourseSub>
                          <Typography
                            sx={{
                              fontSize: 48,
                              fontWeight: 400,
                              fontStyle: "italic",
                              color: "#2c5530",
                              mb: 1,
                              lineHeight: 1,
                            }}
                          >
                            {course.italic}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 56,
                              fontWeight: 800,
                              letterSpacing: "-2px",
                              color: "#000",
                              lineHeight: 1,
                            }}
                          >
                            {course.bold}
                          </Typography>
                        </>
                      )}
                    </ImageContent>

                    {/* Transparent CTAs on the image bottom */}
                    <ImageCtaBar>
                      {/* Sign Up: usually external form */}
                      <GhostBtn
                        component="a"
                        href={signUpHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Sign up for ${course.title}`}
                      >
                        Sign Up Now
                      </GhostBtn>

                      {/* Learn More: internal route => RouterLink; external => <a> */}
                      {isExternal(learnMoreHref) ? (
                        <GhostBtn
                          component="a"
                          href={learnMoreHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Learn more about ${course.title}`}
                          sx={{ borderColor: "rgba(255,255,255,0.6)" }}
                        >
                          Learn More
                        </GhostBtn>
                      ) : (
                        <GhostBtn
                          component={RouterLink}
                          to={learnMoreHref}
                          aria-label={`Learn more about ${course.title}`}
                          sx={{ borderColor: "rgba(255,255,255,0.6)" }}
                        >
                          Learn More
                        </GhostBtn>
                      )}
                    </ImageCtaBar>
                  </ImageShell>

                  {/* Content (no sign-up prompt below image anymore) */}
                  <Box sx={{ p: 3.75, display: "flex", flexDirection: "column" }}>
                    <Typography
                      component="h3"
                      sx={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: "#333",
                        mb: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {course.title}
                    </Typography>
                    <Typography sx={{ fontSize: 15, lineHeight: 1.6, color: "#666" }}>
                      {course.body}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </CarouselTrack>
        </CarouselContainer>
      </Container>
    </Section>
  );
}
