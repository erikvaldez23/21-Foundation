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
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

/* ===================== Styled ===================== */
const Section = styled(Box)(({ theme }) => ({
  backgroundColor: "#E8E5DD",
  paddingTop: theme.spacing(7.5),
  paddingBottom: theme.spacing(7.5),
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}));

const RegisterBtn = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  padding: "12px 20px",
  textTransform: "none",
  fontWeight: 700,
  fontSize: 16,
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  backdropFilter: "blur(6px)",
  color: "#fff",
  background:
    "linear-gradient(135deg, rgba(47,166,82,0.95), rgba(26,132,58,0.95))",
  boxShadow:
    "0 8px 20px rgba(47,166,82,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
  border: "1px solid rgba(47,166,82,0.35)",
  transition: "transform .15s ease, box-shadow .2s ease, background .2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow:
      "0 12px 28px rgba(47,166,82,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
    background: "linear-gradient(135deg, rgba(39,150,72,1), rgba(22,118,52,1))",
  },
  "&:active": {
    transform: "translateY(0)",
  },
}));

const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(6.25),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(3.75),
  },
}));

const ViewAllBtn = styled(Button)({
  borderRadius: 50,
  padding: "12px 24px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: 16,
  border: "2px solid #333",
  color: "#333",
  "&:hover": { backgroundColor: "#333", color: "#fff", borderColor: "#333" },
});

const CarouselContainer = styled(Box)({
  position: "relative",
  overflow: "hidden",
  marginBottom: 40,
});

const CarouselTrack = styled(Box)(({ translateX }) => ({
  display: "flex",
  gap: 30,
  transition: "transform 0.5s ease",
  transform: `translateX(${translateX}px)`,
}));

/* ----- Image area (rounded + clipping) ----- */
const RADIUS = 16;

const ImageShell = styled(Box)({
  height: 300,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
  padding: "40px 20px",
  borderRadius: RADIUS,
  overflow: "hidden",
});

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
  background: "linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3))",
  zIndex: 2,
  borderRadius: RADIUS,
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

const BottomBar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 40,
});

const NavButtons = styled(Box)({
  display: "flex",
  gap: 12,
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

const EnrollmentBtn = styled(Button)({
  padding: "12px 24px",
  background: "transparent",
  border: "2px solid #333",
  borderRadius: 50,
  color: "#333",
  fontSize: 16,
  fontWeight: 600,
  textTransform: "none",
  "&:hover": { background: "#333", color: "#fff" },
});

/* ===================== Data ===================== */
const courses = [
  {
    key: "walkout",
    headerTag: "Mental Health Awareness",
    h3: "Mental Health Walkout",
    h4: "Community Event",
    sub: "Join Us for a Walkout to Raise Awareness",
    title: "Walkout for Mental Health Awareness",
    body: `"This walkout helped me realize that we're not alone in our struggles. It's empowering to see so many people come together to speak out." — Alex Johnson`,
    image: "/image1.JPG",
    bgStyle: {
      background:
        "linear-gradient(135deg, rgba(255,99,71,0.8), rgba(255,69,0,0.8))", // A red-orange gradient, symbolizing urgency and activism
    },
  },
  {
    key: "workshop",
    headerTag: "Empowering the Mind",
    h3: "Mindfulness Workshop",
    h4: "Workshop",
    sub: "Led by Mental Health Professionals",
    title: "Mindfulness Workshop for Stress Relief",
    body: '"This workshop helped me find calm amidst the chaos. The breathing exercises and mindfulness techniques have changed my perspective." — Jamie Lee',
    image: "/image2.JPG",
    bgStyle: {
      background:
        "linear-gradient(135deg, rgba(144,238,144,0.9), rgba(60,179,113,0.9))", // A calm green gradient, representing peace and mindfulness
    },
  },
  {
    key: "support",
    headerTag: "Mental Health Support",
    h3: "Group Therapy",
    h4: "Support Group",
    sub: "Facilitated by Certified Therapists",
    title: "Support Group for Mental Health Healing",
    body: "A safe space to connect with others and share experiences in order to heal together as a community.",
    image: "/image3.JPG",
    bgStyle: {
      background:
        "linear-gradient(135deg, rgba(70,130,180,0.85), rgba(100,149,237,0.85))", // A blue gradient, symbolizing trust and healing
    },
  },
  {
    key: "webinar",
    headerTag: "Mental Health Education",
    h3: "Resilience Webinar",
    h4: "Webinar",
    sub: "With Mental Health Experts",
    title: "Building Resilience Through Mental Health Education",
    body: "Join us for an insightful webinar to understand how resilience can positively impact mental health and well-being.",
    image: "/image4.JPG",
    bgStyle: {
      background:
        "linear-gradient(135deg, rgba(255,228,181,0.85), rgba(255,239,179,0.85))", // A soft yellow gradient to invoke positivity and hope
    },
  },
];


/* ===================== Component ===================== */
export default function EdutainmentCoursesMUI() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [containerW, setContainerW] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const GAP = 30;
  const PEEK = isMobile ? 48 : 80; // constant peeks (both sides)

  const containerRef = useRef(null);

  // Measure container width (full-bleed section)
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerW(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const visibleCount = isMobile ? 1 : 2;
  const maxSlide = Math.max(0, courses.length - visibleCount);

  // Fixed card width (does NOT change per slide)
  const cardW = useMemo(() => {
    if (!containerW) return 0;
    if (isMobile) return Math.max(0, containerW - 2 * PEEK);
    return Math.max(0, (containerW - 2 * PEEK - GAP) / 2);
  }, [containerW, isMobile, PEEK]);

  // Base translate from slide index
  const baseTranslate = useMemo(
    () => -(cardW + GAP) * currentSlide,
    [cardW, currentSlide, GAP]
  );

  // Edge adjustment: cancel container padding so first/last cards touch edges
  const edgeAdjust =
    currentSlide === 0 ? -PEEK : currentSlide === maxSlide ? PEEK : 0;

  const translateX = baseTranslate + edgeAdjust;

  // Adaptive mask (don’t fade the real edge on first/last)
  const maskBoth =
    "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0))";
  const maskLeft =
    "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 100%)";
  const maskRight =
    "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 90%, rgba(0,0,0,0))";
  const maskNone = "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,1))";

  const maskImage =
    currentSlide === 0 && currentSlide === maxSlide
      ? maskNone
      : currentSlide === 0
      ? maskRight
      : currentSlide === maxSlide
      ? maskLeft
      : maskBoth;

  const nextSlide = () => setCurrentSlide((p) => (p >= maxSlide ? 0 : p + 1));
  const previousSlide = () =>
    setCurrentSlide((p) => (p <= 0 ? maxSlide : p - 1));

  return (
    <Section>
      {/* Header in regular container */}
      <Container maxWidth="xl">
        <HeaderRow>
          <Box>
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
            <Typography sx={{ fontSize: 16, color: "#666", fontWeight: 500 }}>
              ★ Enroll today or join a waitlist for more info.
            </Typography>
          </Box>

          <ViewAllBtn variant="outlined">View all Events →</ViewAllBtn>
        </HeaderRow>
      </Container>

      {/* Full-bleed carousel (no x padding), constant card width */}
      <Container maxWidth={false} disableGutters>
        <CarouselContainer
          ref={containerRef}
          sx={{
            pl: `${PEEK}px`,
            pr: `${PEEK}px`,
          }}
        >
          <CarouselTrack translateX={translateX}>
            {courses.map((course) => (
              <Box
                key={course.key}
                sx={{ flex: `0 0 ${Math.max(cardW, 0)}px` }}
              >
                <ImageShell>
                  {course.image ? (
                    <ImageBgImg
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                    />
                  ) : (
                    <ImageBg sx={course.bgStyle} />
                  )}
                  <Overlay />
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
                </ImageShell>

                <Box sx={{ p: 3.75 }}>
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
                  <Typography
                    sx={{ fontSize: 15, lineHeight: 1.6, color: "#666" }}
                  >
                    {course.body}
                  </Typography>
                  {/* <RegisterBtn
                    onClick={() => console.log("Register:", course.key)}
                    href={`/events/${course.key}`} // or your form link
                  >
                    <CalendarDays size={18} />
                    Register Now
                  </RegisterBtn> */}
                </Box>
              </Box>
            ))}
          </CarouselTrack>
        </CarouselContainer>
      </Container>

      <Container maxWidth="xl">
        <BottomBar>
          <NavButtons>
            <NavBtn onClick={previousSlide} aria-label="previous">
              <ChevronLeft size={16} />
            </NavBtn>
            <NavBtn onClick={nextSlide} aria-label="next">
              <ChevronRight size={16} />
            </NavBtn>
          </NavButtons>

          <EnrollmentBtn>Enrollment Open</EnrollmentBtn>
        </BottomBar>
      </Container>
    </Section>
  );
}
