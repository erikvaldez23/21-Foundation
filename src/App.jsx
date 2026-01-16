// App.jsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import HeroClark from "./components/landing/hero";
import Events2 from "./components/landing/Events2";
import Footer from "./components/key-components/Footer";
import Quote from "./components/landing/Quote";
import Topbar from "./components/key-components/Topbar";
import AboutPage from "./components/sub-pages/about/About";
import Contact from "./components/sub-pages/contact/Contact";
import Give from "./components/sub-pages/give/Give";
import Shop from "./components/sub-pages/shop/Shop";
import Gallery from "./components/sub-pages/gallery/Gallery";
import ImpactPillars from "./components/landing/ImpactPillars";
import ImpactPillars2 from "./components/landing/ImpactPillars2";
import Headliner from "./components/key-components/Headlne";
import CTA from "./components/key-components/CTA";
import LoadingAnimation from "./components/animate/LoadingAnimation/";
import PrivacyPolicy from "./components/sub-pages/privacy-policy/PrivacyPolicy";
import ScrollToTop from "./components/animate/ScrollToTop";
import EventDetail from "./components/sub-pages/events/EventDetails";
import EventPage from "./components/sub-pages/events/EventPage";
import Banner from "./components/key-components/Banner"

const theme = createTheme({
  palette: {
    primary: { main: "#339c5e" },
  },
  typography: {
    fontFamily: "serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <Headliner /> */}
        <ScrollToTop behavior="auto" />
        <Topbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <LoadingAnimation /> */}
                <HeroClark />
                {/* <Banner /> */}
                <Quote />
                <Events2 />
                {/* <ImpactPillars /> */}
                <ImpactPillars2 />
                <CTA />
              </>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/give" element={<Give />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          {/* <Route path="/events/:slug" element={<EventDetailsPage />} /> */}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
