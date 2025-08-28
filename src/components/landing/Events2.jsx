// src/components/EdutainmentCoursesMUI.jsx
import React, { useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* ---------- Styled ---------- */
const Section = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  fontFamily: "system-ui, -apple-system, sans-serif",
}));

const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(5),
}));

const OutlineBtn = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  padding: "12px 24px",
  textTransform: "none",
  fontWeight: 600,
  borderColor: "#333",
  color: "#333",
  "&:hover": {
    backgroundColor: "#333",
    color: "#fff",
    borderColor: "#333",
  },
}));

const CourseCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  transition: "transform .3s ease, box-shadow .3s ease",
  height: "100%",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
  },
}));

const ImageShell = styled(Box)(({ theme }) => ({
  position: "relative",
  height: 300,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  textAlign: "center",
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  background: "linear-gradient(135deg, rgba(0,0,0,.25), rgba(0,0,0,.25))",
}));

const ImageBg = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const Tag = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 300,
  letterSpacing: "2px",
  marginBottom: theme.spacing(2.5),
  position: "relative",
  zIndex: 1,
}));

const CourseH3 = styled(Typography)(({ theme }) => ({
  fontSize: 42,
  fontWeight: 300,
  lineHeight: 1.2,
  marginBottom: 8,
  position: "relative",
  zIndex: 1,
}));

const CourseH4 = styled(Typography)(({ theme }) => ({
  fontSize: 42,
  fontWeight: 300,
  marginBottom: theme.spacing(2.5),
  position: "relative",
  zIndex: 1,
}));

const CourseSub = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 300,
  position: "relative",
  zIndex: 1,
}));

const BottomBar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(3.5),
}));

const RoundIconBtn = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "2px solid #ddd",
  backgroundColor: "#fff",
  color: "#666",
  "&:hover": {
    backgroundColor: alpha("#000", 0.04),
  },
}));

/* ---------- Sample data (add as many as you want) ---------- */
const courses = [
  {
    key: "video",
    headerTag: "ilovecreatives",
    h3: "Video Creator",
    h4: "Course",
    sub: "With Rachel Nguyen",
    title: "Video Creator Course with That’s Chic",
    body:
      "“I’ve developed my skills and am feeling more confident in my own creative process. I’m interviewing for new jobs that I never would have felt qualified for without taking the course!” — Andrea Miller",
    bg: "linear-gradient(135deg, rgba(139,69,19,.8), rgba(160,82,45,.8)), url(\"data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23654321'/%3E%3C/svg%3E\")",
  },
  {
    key: "graphic",
    headerTag: "Created & Taught by the Design Agency:",
    subTop: "ilovecreatives Studio",
    italic: "Graphic Design",
    bold: "COURSE",
    title: "Graphic Design Course",
    body:
      "“I have had so many people reaching out to work on projects and on brands from my portfolio.” — Sophie Dumon",
    bg: "linear-gradient(135deg, rgba(135,206,235,.9), rgba(176,224,230,.9)), url(\"data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%2387CEEB'/%3E%3C/svg%3E\")",
  },
  {
    key: "brand",
    headerTag: "ilovecreatives",
    h3: "Brand Strategy",
    h4: "Intensive",
    sub: "With Creative Coach Team",
    title: "Brand Strategy Intensive",
    body:
      "A guided sprint to clarify your story, audience, and offer — then turn it into a polished portfolio or landing page.",
    bg: "linear-gradient(135deg, rgba(52,152,219,.85), rgba(41,128,185,.85)), url(\"data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%233498db'/%3E%3C/svg%3E\")",
  },
  {
    key: "photo",
    headerTag: "ilovecreatives",
    h3: "Photography",
    h4: "Bootcamp",
    sub: "With Visiting Artists",
    title: "Photography Bootcamp",
    body:
      "Master lighting, composition, and editing with hands-on assignments and real-world critique.",
    bg: "linear-gradient(135deg, rgba(142,68,173,.85), rgba(155,89,182,.85)), url(\"data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%238e44ad'/%3E%3C/svg%3E\")",
  },
];

/* ---------- Component ---------- */
export default function EdutainmentCoursesMUI() {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: courses.length > 2,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "60px", // <- peek of next slide
    responsive: [
      {
        breakpoint: 900, // md down
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };


  return (
    <Section>
      <Container maxWidth="xl">
        {/* Header */}
        <HeaderRow>
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 36, sm: 48 },
                fontWeight: 300,
                lineHeight: 1.2,
                color: "#333",
                mb: 1,
              }}
            >
              Edutainment
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 22, sm: 28 },
                fontWeight: 300,
                color: "#333",
                mb: 2,
              }}
            >
              Online Courses for Digital Creatives
            </Typography>
            <Typography sx={{ fontSize: 16, color: "#666", fontWeight: 500 }}>
              ★ Enroll today or join a waitlist for more info.
            </Typography>
          </Box>

          <OutlineBtn variant="outlined">View all Courses →</OutlineBtn>
        </HeaderRow>

        {/* Carousel */}
        <Box sx={{ position: "relative" }}>
          <Slider ref={sliderRef} {...settings}>
            {courses.map((c) => (
              <Box key={c.key} sx={{ px: { xs: 1.5, md: 2 }, py: 0.5 }}>
                <CourseCard>
                  <ImageShell>
                    <ImageBg sx={{ background: c.bg }} />
                    <Overlay />
                    {c.headerTag && <Tag>{c.headerTag}</Tag>}
                    {/* Two possible hero styles based on course data */}
                    {c.h3 ? (
                      <>
                        <CourseH3 component="h3">{c.h3}</CourseH3>
                        <CourseH4 component="h4">{c.h4}</CourseH4>
                        <CourseSub>{c.sub}</CourseSub>
                      </>
                    ) : (
                      <>
                        <Tag sx={{ mb: 2 }}>{c.headerTag}</Tag>
                        {c.subTop && (
                          <CourseSub sx={{ mb: 2, zIndex: 1 }}>
                            {c.subTop}
                          </CourseSub>
                        )}
                        <Typography
                          sx={{
                            fontSize: 48,
                            fontWeight: 400,
                            fontStyle: "italic",
                            color: "#2c5530",
                            mb: 1,
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {c.italic}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 56,
                            fontWeight: 800,
                            letterSpacing: "-2px",
                            color: "#000",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {c.bold}
                        </Typography>
                      </>
                    )}
                  </ImageShell>

                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      component="h3"
                      sx={{ fontSize: 24, fontWeight: 600, color: "#333", mb: 2 }}
                    >
                      {c.title}
                    </Typography>
                    <Typography sx={{ fontSize: 15, lineHeight: 1.6, color: "#666" }}>
                      {c.body}
                    </Typography>
                  </CardContent>
                </CourseCard>
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Bottom Navigation */}
        <BottomBar>
          <Box sx={{ display: "flex", gap: 1.25 }}>
            <RoundIconBtn
              aria-label="previous"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </RoundIconBtn>
            <RoundIconBtn
              aria-label="next"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </RoundIconBtn>
          </Box>

          <OutlineBtn variant="outlined">Enrollment Open</OutlineBtn>
        </BottomBar>
      </Container>
    </Section>
  );
}
